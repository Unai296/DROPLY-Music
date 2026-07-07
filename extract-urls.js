/**
 * DROPLY — extract-urls.js
 *
 * Script de escritorio: extrae URLs de audio de YouTube usando yt-dlp
 * y las guarda en Supabase para que iOS las use en background playback.
 *
 * Requisitos:
 *   - Node.js 18+
 *   - yt-dlp instalado y en PATH (o en ./yt-dlp)
 *   - Un archivo .env en la raíz con SUPABASE_URL y SUPABASE_ANON_KEY
 *
 * Uso:
 *   node extract-urls.js dQw4w9WgXcQ               # Un video
 *   node extract-urls.js dQw4w9WgXcQ kJQP7kiw5Fk   # Varios
 *   node extract-urls.js --all-cached              # Refresca TODAS las URLs expiradas
 *   node extract-urls.js --watch 300               # Modo vigilante: c/300s refresca
 *
 * El flujo:
 *   1. Ejecuta yt-dlp para conseguir la metadata + URL directa de audio
 *   2. Valida que la URL responda 200
 *   3. Guarda en Supabase (tabla cached_urls) con expiración ~6h
 */

const { execFileSync } = require("child_process");
const { join } = require("path");
const { readFileSync, existsSync } = require("fs");

// ── Config ──
const YTDLP = existsSync(join(__dirname, "yt-dlp.exe"))
  ? join(__dirname, "yt-dlp.exe")
  : existsSync(join(__dirname, "yt-dlp"))
    ? join(__dirname, "yt-dlp")
    : "yt-dlp";

// Cargar .env
const envPath = join(__dirname, ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*(\w+)\s*=\s*(.+)\s*$/);
    if (m) process.env[m[1]] = m[2];
  }
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌  SUPABASE_URL y SUPABASE_ANON_KEY deben estar en .env");
  process.exit(1);
}

// ── Helpers ──
function extractUrl(videoId) {
  const url = `https://youtube.com/watch?v=${videoId}`;

  // Metadata
  const metaOut = execFileSync(YTDLP, ["-j", "--no-download", url], {
    timeout: 30000,
    encoding: "utf8",
  });
  const meta = JSON.parse(metaOut);

  // Audio URL directa
  const urlOut = execFileSync(YTDLP, [
    "-g",
    "-f",
    "bestaudio[ext=m4a]/bestaudio",
    url,
  ], { timeout: 30000, encoding: "utf8" });

  return {
    video_id: videoId,
    title: meta.title || "",
    duration: meta.duration || 0,
    cover: meta.thumbnail || "",
    audio_url: urlOut.trim(),
  };
}

async function validateUrl(url) {
  try {
    const resp = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(10000) });
    return resp.ok;
  } catch {
    return false;
  }
}

async function saveToSupabase(entry) {
  const resp = await fetch(`${SUPABASE_URL}/rest/v1/cached_urls`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify(entry),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Supabase error ${resp.status}: ${text}`);
  }
  return true;
}

async function refreshAllCached() {
  console.log("🔍  Buscando URLs expiradas...");
  const resp = await fetch(
    `${SUPABASE_URL}/rest/v1/cached_urls?expires_at=lte.${new Date().toISOString()}&order=created_at.asc`,
    { headers: { apikey: SUPABASE_ANON_KEY } },
  );
  if (!resp.ok) {
    console.error("❌  Error al leer caché:", resp.status);
    return;
  }
  const expired = await resp.json();
  console.log(`📦  ${expired.length} URLs expiradas para refrescar`);
  for (const entry of expired) {
    await processVideo(entry.video_id);
  }
}

async function processVideo(videoId) {
  console.log(`\n🎬  ${videoId}`);
  try {
    const entry = extractUrl(videoId);
    console.log(`    ${entry.title?.substring(0, 50)}`);
    console.log(`    Duración: ${entry.duration}s`);

    const valid = await validateUrl(entry.audio_url);
    console.log(`    URL: ${valid ? "✅ VÁLIDA" : "⚠️  no responde"} (${entry.audio_url.substring(0, 60)}…)`);

    await saveToSupabase(entry);
    console.log(`    ✅ Guardado en Supabase`);
  } catch (e) {
    console.error(`    ❌  Error: ${e.message}`);
  }
}

// ── Main ──
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Uso:
  node extract-urls.js <videoId> [videoId...]    Extraer URLs específicas
  node extract-urls.js --all-cached               Refrescar todas las expiradas
  node extract-urls.js --watch <segundos>         Modo vigilante
    `);
    return;
  }

  if (args[0] === "--all-cached") {
    await refreshAllCached();
  } else if (args[0] === "--watch") {
    const interval = parseInt(args[1]) || 300;
    console.log(`👀  Modo vigilante: cada ${interval}s`);
    await refreshAllCached();
    setInterval(refreshAllCached, interval * 1000);
  } else {
    for (const id of args) {
      await processVideo(id);
    }
  }
}

main().catch(console.error);
