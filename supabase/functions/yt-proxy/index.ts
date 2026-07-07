import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

interface CacheEntry {
  video_id: string;
  title: string;
  duration: number;
  cover: string;
  audio_url: string;
}

function extractJson(html: string, key: string): any {
  const re = new RegExp(`${key}\\s*=\\s*({.*?});`);
  const m = html.match(re);
  return m ? JSON.parse(m[1]) : null;
}

function findCandidateFunctions(script: string): string[] {
  const fns: string[] = [];
  let idx = 0;
  while ((idx = script.indexOf('.split("")', idx)) !== -1) {
    const before = script.substring(Math.max(0, idx - 300), idx);
    const fnMatch = before.match(/(?:function\s*\([a-zA-Z]\)\s*\{[^}]*)$/);
    if (fnMatch) fns.push(fnMatch[0] + script.substring(idx, idx + 600));
    idx++;
  }
  return fns;
}

function tryTransform(rawUrl: string): string | null {
  const u = new URL(rawUrl);
  const rawN = u.searchParams.get("n");
  if (!rawN) return rawUrl;

  // Simple known transforms based on current player patterns:
  // 1. If rawN starts with a known pattern, reverse and swap
  // 2. Try basic decoding

  return null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    const { videoId } = await req.json();
    if (!videoId) {
      return new Response(JSON.stringify({ error: "Missing videoId" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

    // 1. Check cache
    const cacheResp = await fetch(
      `${SUPABASE_URL}/rest/v1/cached_urls?video_id=eq.${videoId}&expires_at=gt.${new Date().toISOString()}`,
      { headers: { apikey: SUPABASE_ANON_KEY } },
    );
    if (cacheResp.ok) {
      const cached = await cacheResp.json();
      if (cached.length > 0) {
        return new Response(JSON.stringify({ source: "cache", ...cached[0] }), { headers });
      }
    }

    // 2. Scrape YouTube
    const html = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    }).then((r) => r.text());

    const pr = extractJson(html, "ytInitialPlayerResponse");
    if (!pr?.streamingData) {
      return new Response(JSON.stringify({ error: "No streaming data" }), { status: 500, headers });
    }

    const all = [...(pr.streamingData.formats || []), ...(pr.streamingData.adaptiveFormats || [])];
    const audio = all
      .filter((f: any) => f.mimeType?.startsWith("audio/"))
      .sort((a: any, b: any) => (b.bitrate || 0) - (a.bitrate || 0));

    const fmt = audio[0];
    if (!fmt?.url) {
      return new Response(JSON.stringify({ error: "No audio format with URL" }), { status: 500, headers });
    }

    let audioUrl = fmt.url;

    // 3. Try to transform n-parameter
    if (audioUrl.includes("&n=") || audioUrl.includes("?n=")) {
      const tx = tryTransform(audioUrl);
      if (tx) audioUrl = tx;
    }

    // 4. Validate the URL
    let works = false;
    try {
      const test = await fetch(audioUrl, { method: "HEAD", signal: AbortSignal.timeout(5000) });
      works = test.ok;
    } catch {
      // Proceed even if HEAD fails (maybe range request needed)
    }

    const entry: CacheEntry = {
      video_id: videoId,
      title: pr.videoDetails?.title || "",
      duration: parseInt(pr.videoDetails?.lengthSeconds || "0"),
      cover: pr.videoDetails?.thumbnail?.thumbnails?.slice(-1)[0]?.url || "",
      audio_url: audioUrl,
    };

    // 5. Cache result
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/cached_urls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Prefer: "resolution=merge-duplicates",
        },
        body: JSON.stringify(entry),
      });
    } catch {
      // non-fatal
    }

    return new Response(JSON.stringify({ ...entry, works }), { headers });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
});
