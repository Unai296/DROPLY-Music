/* ═══════════════════════════════════════════════════════════
   DROPLY — api/yt-stream.js
   Vercel Serverless Function
   Extrae la URL de stream de audio de un video de YouTube
   y la devuelve al cliente para reproducción nativa.

   GET /api/yt-stream?v=VIDEO_ID
   Responde: { url, mimeType, duration, expires }
═══════════════════════════════════════════════════════════ */

const ytdl = require('@distube/ytdl-core');
/* Cache en memoria (vida útil: ~5 min, las URLs de YT expiran en ~6h) */
const _cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

function _cacheGet(key) {
  const entry = _cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) { _cache.delete(key); return null; }
  return entry.data;
}
function _cacheSet(key, data) {
  if (_cache.size > 200) {
    // Evict oldest
    const oldest = _cache.keys().next().value;
    _cache.delete(oldest);
  }
  _cache.set(key, { data, ts: Date.now() });
}

module.exports = async function handler(req, res) {
  /* CORS */
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'GET') { res.status(405).json({ error: 'METHOD_NOT_ALLOWED' }); return; }

  const videoId = String(req.query.v || '').trim();
  if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    res.status(400).json({ error: 'INVALID_VIDEO_ID' });
    return;
  }

  /* Cache hit */
  const cached = _cacheGet(videoId);
  if (cached) {
    res.setHeader('Cache-Control', 's-maxage=240, stale-while-revalidate=60');
    res.status(200).json(cached);
    return;
  }

  try {
    const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`, {
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 Chrome/113.0.0.0 Mobile Safari/537.36'
        }
      }
    });

    /* Seleccionar el mejor formato de solo-audio */
    /* Preferencia: opus/webm > mp4a/m4a > cualquier audio */
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

    if (!audioFormats.length) {
      res.status(404).json({ error: 'NO_AUDIO_FORMAT' });
      return;
    }

    /* Ordenar: máxima calidad de audio, preferir m4a (más compatible con iOS/Safari) */
    const m4a = audioFormats
      .filter(f => f.mimeType && f.mimeType.includes('mp4'))
      .sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0));

    const webm = audioFormats
      .filter(f => f.mimeType && f.mimeType.includes('webm'))
      .sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0));

    /* m4a primero (mejor soporte móvil), luego webm */
    const best = m4a[0] || webm[0] || audioFormats[0];

    const videoDetails = info.videoDetails;
    const result = {
      url:        best.url,
      mimeType:   best.mimeType || 'audio/mp4',
      bitrate:    best.audioBitrate || 0,
      duration:   parseInt(videoDetails.lengthSeconds || '0', 10),
      title:      videoDetails.title || '',
      author:     videoDetails.author?.name || '',
      thumbnail:  videoDetails.thumbnails?.slice(-1)[0]?.url || '',
      videoId
    };

    _cacheSet(videoId, result);

    res.setHeader('Cache-Control', 's-maxage=240, stale-while-revalidate=60');
    res.status(200).json(result);

  } catch (err) {
    console.error('[yt-stream] Error:', err.message);

    if (err.message?.includes('Video unavailable') || err.message?.includes('not available')) {
      res.status(404).json({ error: 'VIDEO_UNAVAILABLE' });
      return;
    }
    if (err.message?.includes('private')) {
      res.status(403).json({ error: 'VIDEO_PRIVATE' });
      return;
    }
    if (err.message?.includes('age')) {
      res.status(403).json({ error: 'VIDEO_AGE_RESTRICTED' });
      return;
    }

    res.status(500).json({ error: 'STREAM_EXTRACT_FAILED', detail: err.message });
  }
};