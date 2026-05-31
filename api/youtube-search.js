'use strict';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const MAX_RESULTS = 20;

function parseDuration(iso) {
  if (!iso) return { label: '0:00', seconds: 0 };
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return { label: '0:00', seconds: 0 };
  const h = parseInt(m[1] || 0, 10);
  const min = parseInt(m[2] || 0, 10);
  const sec = parseInt(m[3] || 0, 10);
  const seconds = h * 3600 + min * 60 + sec;
  return { label: `${h * 60 + min}:${String(sec).padStart(2, '0')}`, seconds };
}

function bestThumbnail(thumbnails) {
  if (!thumbnails) return '';
  return (thumbnails.maxres || thumbnails.high || thumbnails.medium || thumbnails.default || {}).url || '';
}

async function youtubeFetch(endpoint, params, apiKey) {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.set('key', apiKey);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const response = await fetch(url);
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const reason = body?.error?.errors?.[0]?.reason || 'unknown';
    const error = new Error(body?.error?.message || `YouTube HTTP ${response.status}`);
    error.status = response.status;
    error.reason = reason;
    throw error;
  }

  return body;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
    return;
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'YOUTUBE_NO_API_KEY' });
    return;
  }

  const query = String(req.query.q || '').trim();
  if (!query) {
    res.status(200).json({ items: [] });
    return;
  }

  try {
    const searchData = await youtubeFetch('search', {
      part: 'snippet',
      q: `${query} official`,
      type: 'video',
      videoEmbeddable: 'true',
      videoCategoryId: '10',
      maxResults: String(MAX_RESULTS),
      fields: 'items(id/videoId,snippet/title,snippet/channelTitle,snippet/thumbnails)'
    }, apiKey);

    const videoIds = (searchData.items || []).map(item => item.id?.videoId).filter(Boolean);
    if (videoIds.length === 0) {
      res.status(200).json({ items: [] });
      return;
    }

    const detailData = await youtubeFetch('videos', {
      part: 'contentDetails,snippet,status',
      id: videoIds.join(','),
      fields: 'items(id,contentDetails/duration,status/embeddable,snippet/title,snippet/channelTitle,snippet/thumbnails)'
    }, apiKey);

    const detailMap = {};
    (detailData.items || []).forEach(item => { detailMap[item.id] = item; });

    const items = (searchData.items || []).map(item => {
      const videoId = item.id?.videoId;
      const detail = detailMap[videoId];
      if (!videoId || !detail || detail.status?.embeddable === false) return null;

      const duration = parseDuration(detail.contentDetails?.duration || '');
      if (duration.seconds < 60 || duration.seconds > 720) return null;

      return {
        type: 'youtube',
        source: 'youtube',
        videoId,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        cover: bestThumbnail(item.snippet.thumbnails),
        duration: duration.label,
        durationSecs: duration.seconds,
        category: 'Online',
        file: `yt::${videoId}`
      };
    }).filter(Boolean);

    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=86400');
    res.status(200).json({ items });
  } catch (err) {
    const status = err.status || 500;
    const code = status === 403 && err.reason === 'quotaExceeded'
      ? 'YOUTUBE_QUOTA_EXCEEDED'
      : status === 403
        ? 'YOUTUBE_FORBIDDEN'
        : 'YOUTUBE_SEARCH_FAILED';
    res.status(status).json({ error: code });
  }
};
