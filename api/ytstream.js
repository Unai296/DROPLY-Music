const ytdl = require('@distube/ytdl-core');

async function fetchAndroidInfo(videoId) {
  const payload = {
    videoId,
    cpn: 'ABCDEFGHIJKLMNOP',
    contentCheckOk: true,
    racyCheckOk: true,
    context: {
      client: {
        clientName: 'ANDROID',
        clientVersion: '19.29.36',
        platform: 'MOBILE',
        osName: 'Android',
        osVersion: '14',
        androidSdkVersion: '34',
        hl: 'en',
        gl: 'US',
        utcOffsetMinutes: 0,
      },
      request: { internalExperimentFlags: [], useSsl: true },
      user: { lockedSafetyMode: false },
    },
  };

  const response = await fetch('https://www.youtube.com/youtubei/v1/player?prettyPrint=false', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'com.google.android.youtube/19.29.36 (Linux; U; Android 14) gzip',
      'Accept-Language': 'es-ES,es;q=0.9',
      'Origin': 'https://www.youtube.com',
      'Referer': 'https://www.youtube.com',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.playabilityStatus?.status === 'LOGIN_REQUIRED' || data.playabilityStatus?.status === 'ERROR') {
    throw new Error(data.playabilityStatus?.reason || 'Video no disponible');
  }

  const formats = [
    ...(data.streamingData?.formats || []),
    ...(data.streamingData?.adaptiveFormats || []),
  ].filter(f => f.url);

  if (formats.length === 0) {
    throw new Error('No se encontraron formatos de audio');
  }

  const audioFormat = formats
    .filter(f => f.mimeType?.startsWith('audio/'))
    .sort((a, b) => (a.bitrate || 0) - (b.bitrate || 0))[0];

  const videoDetails = data.videoDetails || {};
  const thumbnails = videoDetails.thumbnail?.thumbnails || [];
  const bestThumbnail = thumbnails.reduce((best, t) =>
    (t.width || 0) > (best.width || 0) ? t : best, thumbnails[0] || {});

  return {
    title: videoDetails.title || 'Unknown',
    duration: parseInt(videoDetails.lengthSeconds) || 0,
    audioUrl: audioFormat?.url || formats[0]?.url,
    cover: bestThumbnail?.url || null,
    videoId,
  };
}

module.exports = async (req, res) => {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'Missing "videoId" query parameter' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Range');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const result = await fetchAndroidInfo(videoId);
    res.status(200).json(result);
  } catch (err) {
    console.error('[ytstream] Error:', err.message);
    res.status(200).json({
      error: 'No se pudo obtener el audio: ' + err.message
    });
  }
};