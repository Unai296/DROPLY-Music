const ytdl = require('@distube/ytdl-core');

module.exports = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const videoId = url.searchParams.get('videoId');
  const json = url.searchParams.get('json');

  if (!videoId) return res.status(400).json({ error: 'Falta videoId' });

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    return res.status(200).end();
  }

  try {
    const info = await ytdl.getInfo(videoId, {
      requestOptions: { headers: { 'Cookie': 'SOCS=CAI' } },
    });

    const format = info.formats
      .filter(f => f.hasAudio && f.url)
      .sort((a, b) => (a.bitrate || 0) - (b.bitrate || 0))[0];

    if (!format) return res.status(200).json({ error: 'Sin formato de audio' });

    if (json === '1') {
      const thumbs = info.videoDetails.thumbnails || [];
      const best = thumbs.reduce((a, b) => ((a.width||0) > (b.width||0) ? a : b), thumbs[0] || {});
      return res.json({
        title: info.videoDetails.title,
        duration: parseInt(info.videoDetails.lengthSeconds) || 0,
        cover: best?.url || null,
        videoId,
      });
    }

    res.writeHead(302, { Location: format.url });
    res.end();
  } catch (err) {
    console.error('[ytstream]', err.message);
    if (json === '1') res.status(200).json({ error: err.message });
    else res.status(500).end();
  }
};
