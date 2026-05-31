/* ═══════════════════════════════════════════════════════════
   DROPLY — api/yt-stream.js
   Extrae la URL de stream de audio de YouTube y la devuelve.

   GET /api/yt-stream?v=VIDEO_ID
   Responde: { url, mimeType, duration }
═══════════════════════════════════════════════════════════ */

const ytdl = require('@distube/ytdl-core');

const _cache = new Map();
const CACHE_TTL = 4 * 60 * 1000;

function _cacheGet(key) {
  const e = _cache.get(key);
  if (!e) return null;
  if (Date.now() - e.ts > CACHE_TTL) { _cache.delete(key); return null; }
  return e.data;
}
function _cacheSet(key, data) {
  if (_cache.size > 100) _cache.delete(_cache.keys().next().value);
  _cache.set(key, { data, ts: Date.now() });
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'GET') { res.status(405).end(); return; }

  const videoId = String(req.query.v || '').trim();
  if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    res.status(400).json({ error: 'INVALID_VIDEO_ID' });
    return;
  }

  const cached = _cacheGet(videoId);
  if (cached) {
    res.setHeader('Cache-Control', 's-maxage=180');
    return res.status(200).json(cached);
  }

  try {
    const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`, {
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 Chrome/113.0.0.0 Mobile Safari/537.36'
        }
      }
    });

    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    if (!audioFormats.length) { res.status(404).json({ error: 'NO_AUDIO_FORMAT' }); return; }

    const m4a  = audioFormats.filter(f => f.mimeType?.includes('mp4')).sort((a,b) => (b.audioBitrate||0)-(a.audioBitrate||0));
    const webm = audioFormats.filter(f => f.mimeType?.includes('webm')).sort((a,b) => (b.audioBitrate||0)-(a.audioBitrate||0));
    const best = m4a[0] || webm[0] || audioFormats[0];

    const result = {
      url:      best.url,
      mimeType: best.mimeType?.split(';')[0] || 'audio/mp4',
      bitrate:  best.audioBitrate || 0,
      duration: parseInt(info.videoDetails.lengthSeconds || '0', 10),
      videoId
    };

    _cacheSet(videoId, result);
    res.setHeader('Cache-Control', 's-maxage=180');
    res.status(200).json(result);

  } catch (err) {
    console.error('[yt-stream]', err.message);
    if (err.message?.includes('unavailable') || err.message?.includes('not available')) {
      res.status(404).json({ error: 'VIDEO_UNAVAILABLE' });
    } else if (err.message?.includes('private')) {
      res.status(403).json({ error: 'VIDEO_PRIVATE' });
    } else {
      res.status(500).json({ error: 'STREAM_FAILED', detail: err.message });
    }
  }
};
