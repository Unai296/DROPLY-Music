const ytdl = require('@distube/ytdl-core');
const utils = require('@distube/ytdl-core/lib/utils');

async function tryYtdlGetInfo(videoId) {
  const originalPlayError = utils.playError;
  utils.playError = () => null;
  try {
    return await ytdl.getInfo(videoId, {
      playerClients: ['ANDROID', 'IOS', 'TV', 'WEB_EMBEDDED'],
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
          'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        },
      },
    });
  } finally {
    utils.playError = originalPlayError;
  }
}

async function tryDirectAndroid(videoId) {
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

  const res = await fetch('https://www.youtube.com/youtubei/v1/player?prettyPrint=false', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'com.google.android.youtube/19.29.36 (Linux; U; Android 14) gzip',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (data.playabilityStatus?.status === 'UNPLAYABLE' || data.playabilityStatus?.status === 'LOGIN_REQUIRED') {
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
    .sort((a, b) => (a.bitrate || a.averageBitrate || 0) - (b.bitrate || b.averageBitrate || 0))[0];

  const thumbnails = data.videoDetails?.thumbnail?.thumbnails || [];
  const bestThumbnail = thumbnails.reduce((best, t) =>
    (t.width || 0) > (best.width || 0) ? t : best, thumbnails[0] || {});

  return {
    title: data.videoDetails?.title || 'Unknown',
    duration: parseInt(data.videoDetails?.lengthSeconds) || 0,
    audioUrl: (audioFormat || formats[0]).url,
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
    let title, duration, audioUrl, cover;

    try {
      const info = await tryYtdlGetInfo(videoId);

      let format = ytdl.chooseFormat(info.formats, { filter: 'audioonly', quality: 'lowestaudio' });
      if (!format) {
        format = info.formats
          .filter(f => f.hasAudio && f.url)
          .sort((a, b) => (a.bitrate || 0) - (b.bitrate || 0))[0];
      }

      if (!format) {
        throw new Error('No audio format found');
      }

      title = info.videoDetails?.title || 'Unknown';
      duration = parseInt(info.videoDetails?.lengthSeconds) || 0;
      audioUrl = format.url;
      cover = (info.videoDetails?.thumbnails || []).reduce((best, t) =>
        (t.width || 0) > (best.width || 0) ? t : best, { url: null }).url;
    } catch (ytdlErr) {
      console.warn('[ytstream] ytdl failed, trying direct API:', ytdlErr.message);
      const result = await tryDirectAndroid(videoId);
      title = result.title;
      duration = result.duration;
      audioUrl = result.audioUrl;
      cover = result.cover;
    }

    res.status(200).json({ title, duration, audioUrl, cover, videoId });
  } catch (err) {
    console.error('[ytstream] Error:', err.message);
    res.status(200).json({
      error: 'No se pudo obtener el audio: ' + err.message,
    });
  }
};