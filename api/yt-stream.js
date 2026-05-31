/* ═══════════════════════════════════════════════════════════
   DROPLY — api/yt-stream.js
   Proxy de stream de audio de YouTube.
   En lugar de devolver la URL (que el móvil bloquea en background),
   hace pipe del audio directamente al cliente.

   GET /api/yt-stream?v=VIDEO_ID
═══════════════════════════════════════════════════════════ */

const ytdl = require('@distube/ytdl-core');

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

  try {
    const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`, {
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 Chrome/113.0.0.0 Mobile Safari/537.36'
        }
      }
    });

    /* Elegir formato: m4a primero (mejor soporte iOS/Android), luego webm */
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    if (!audioFormats.length) { res.status(404).json({ error: 'NO_AUDIO_FORMAT' }); return; }

    const m4a  = audioFormats.filter(f => f.mimeType?.includes('mp4')).sort((a,b) => (b.audioBitrate||0)-(a.audioBitrate||0));
    const webm = audioFormats.filter(f => f.mimeType?.includes('webm')).sort((a,b) => (b.audioBitrate||0)-(a.audioBitrate||0));
    const best = m4a[0] || webm[0] || audioFormats[0];

    const duration = parseInt(info.videoDetails.lengthSeconds || '0', 10);

    /* Cabeceras para que el <audio> nativo funcione bien en móvil */
    res.setHeader('Content-Type', best.mimeType?.split(';')[0] || 'audio/mp4');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', 'no-cache');
    if (duration > 0) {
      res.setHeader('X-Duration', String(duration));
    }

    /* Soporte de Range requests (necesario para seek en iOS/Safari) */
    const rangeHeader = req.headers['range'];
    const streamOptions = {};
    if (rangeHeader) {
      const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
      if (match) {
        streamOptions.begin = parseInt(match[1], 10);
        if (match[2]) streamOptions.end = parseInt(match[2], 10);
        res.status(206);
      }
    } else {
      res.status(200);
    }

    /* Pipe del stream de ytdl directamente a la respuesta */
    const stream = ytdl.downloadFromInfo(info, {
      format: best,
      ...streamOptions
    });

    stream.on('error', (err) => {
      console.error('[yt-stream] stream error:', err.message);
      if (!res.headersSent) res.status(500).end();
      else res.end();
    });

    req.on('close', () => stream.destroy());

    stream.pipe(res);

  } catch (err) {
    console.error('[yt-stream] Error:', err.message);
    if (!res.headersSent) {
      if (err.message?.includes('unavailable') || err.message?.includes('not available')) {
        res.status(404).json({ error: 'VIDEO_UNAVAILABLE' });
      } else if (err.message?.includes('private')) {
        res.status(403).json({ error: 'VIDEO_PRIVATE' });
      } else {
        res.status(500).json({ error: 'STREAM_FAILED' });
      }
    }
  }
};
