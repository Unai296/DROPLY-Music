module.exports = async (req, res) => {
  const { q } = req.query;
  if (!q || !q.trim()) {
    return res.status(400).json({ error: 'Missing query parameter "q"' });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      error: 'YouTube API key not configured',
      hint: 'Add YOUTUBE_API_KEY to your Vercel environment variables'
    });
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&maxResults=15&q=${encodeURIComponent(q)}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return res.status(200).json({ error: data.error.message });
    }

    const results = (data.items || [])
      .filter(item => item.id?.kind === 'youtube#video')
      .map(item => ({
        youtubeId: item.id.videoId,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        cover: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
        category: 'YouTube',
        duration: null,
        type: 'music'
      }));

    res.status(200).json({ results });
  } catch (err) {
    res.status(200).json({ error: err.message });
  }
};
