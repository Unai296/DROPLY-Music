const ytdl = require('@distube/ytdl-core');

module.exports = async (req, res) => {
  const { videoId } = req.query;
  if (!videoId) return res.status(400).json({ error: 'Missing videoId' });

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Range');
    return res.status(200).end();
  }

  try {
    const info = await ytdl.getInfo(videoId, {
      requestOptions: {
        headers: { 'Cookie': 'SOCS=CAI' },
      },
    });

    const format = info.formats
      .filter(f => f.hasAudio && f.url)
      .sort((a, b) => (a.bitrate || a.audioBitrate || 0) - (b.bitrate || b.audioBitrate || 0))[0];

    if (!format) return res.status(200).json({ error: 'No audio format found' });

    const thumbnails = info.videoDetails.thumbnails || [];
    const bestThumbnail = thumbnails.reduce((a, b) =>
      (a.width || 0) > (b.width || 0) ? a : b, thumbnails[0] || {});

    res.json({
      title: info.videoDetails.title,
      duration: parseInt(info.videoDetails.lengthSeconds) || 0,
      audioUrl: format.url,
      cover: bestThumbnail?.url || null,
      videoId,
    });
  } catch (err) {
    console.error('[ytstream] Error:', err.message);
    res.status(200).json({ error: err.message });
  }
};
