const ytdl = require('@distube/ytdl-core');
const utils = require('@distube/ytdl-core/lib/utils');

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
    const originalPlayError = utils.playError;
    utils.playError = () => null;

    const info = await ytdl.getInfo(videoId, {
      playerClients: ['ANDROID', 'IOS', 'TV', 'WEB_EMBEDDED'],
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
          'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
          'Origin': 'https://www.youtube.com',
          'Referer': 'https://www.youtube.com',
        }
      }
    });

    utils.playError = originalPlayError;

    let audioFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly', quality: 'lowestaudio' });

    if (!audioFormat) {
      audioFormat = info.formats
        .filter(f => f.hasAudio && f.url)
        .sort((a, b) => (a.bitrate || 0) - (b.bitrate || 0))[0];
    }

    if (!audioFormat) {
      return res.status(404).json({ error: 'No audio format found' });
    }

    const bestThumbnail = info.videoDetails.thumbnails?.reduce((best, t) =>
      (t.width || 0) > (best.width || 0) ? t : best
    , info.videoDetails.thumbnails?.[0] || {});

    res.status(200).json({
      title: info.videoDetails.title,
      duration: parseInt(info.videoDetails.lengthSeconds) || 0,
      audioUrl: audioFormat.url,
      cover: bestThumbnail?.url || null,
      videoId
    });
  } catch (err) {
    console.error('[ytstream] Error:', err.message);
    res.status(200).json({
      error: 'No se pudo obtener el audio: ' + err.message
    });
  }
};