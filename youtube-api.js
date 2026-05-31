/* ═══════════════════════════════════════════════════════════
   DROPLY — youtube-api.js
   Servicio de comunicación con YouTube Data API v3
   Gestiona: API key · caché local · rate limiting · errores
═══════════════════════════════════════════════════════════ */

'use strict';

const YouTubeAPI = (() => {

  /* ── Configuración ────────────────────────────────────── */
  // ⚠️  IMPORTANTE: Introduce aquí tu YouTube Data API v3 key.
  // Obtén una gratis en: https://console.cloud.google.com/
  // Activa "YouTube Data API v3" y crea credenciales → API Key
  const API_KEY = 'AIzaSyCzC3R5cZKXgFw6r4EumwIgM05bA3kKppY';

  const BASE_URL = 'https://www.googleapis.com/youtube/v3';
  const CACHE_TTL_MS  = 10 * 60 * 1000; // 10 minutos
  const CACHE_MAX     = 80;              // máx entradas en caché
  const RATE_WINDOW   = 1000;            // ms entre llamadas
  const MAX_RESULTS   = 20;

  /* ── Caché en memoria ─────────────────────────────────── */
  const _cache = new Map();
  let _lastCall = 0;

  function _cacheKey(type, query) {
    return `${type}::${query.toLowerCase().trim()}`;
  }

  function _cacheGet(key) {
    const entry = _cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.ts > CACHE_TTL_MS) { _cache.delete(key); return null; }
    return entry.data;
  }

  function _cacheSet(key, data) {
    if (_cache.size >= CACHE_MAX) {
      // Eliminar la entrada más antigua
      const oldestKey = _cache.keys().next().value;
      _cache.delete(oldestKey);
    }
    _cache.set(key, { data, ts: Date.now() });
  }

  /* ── Rate limiting simple ─────────────────────────────── */
  async function _rateLimit() {
    const now = Date.now();
    const wait = _lastCall + RATE_WINDOW - now;
    if (wait > 0) await new Promise(r => setTimeout(r, wait));
    _lastCall = Date.now();
  }

  /* ── Parsear duración ISO 8601 (PT1M30S) → "1:30" ─────── */
  function _parseDuration(iso) {
    if (!iso) return '0:00';
    const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!m) return '0:00';
    const h = parseInt(m[1] || 0);
    const min = parseInt(m[2] || 0);
    const sec = parseInt(m[3] || 0);
    const totalMin = h * 60 + min;
    return `${totalMin}:${sec.toString().padStart(2, '0')}`;
  }

  /* ── Parsear segundos totales desde ISO 8601 ───────────── */
  function _parseDurationSeconds(iso) {
    if (!iso) return 0;
    const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!m) return 0;
    const h = parseInt(m[1] || 0);
    const min = parseInt(m[2] || 0);
    const sec = parseInt(m[3] || 0);
    return h * 3600 + min * 60 + sec;
  }

  /* ── Obtener mejor miniatura disponible ────────────────── */
  function _getBestThumbnail(thumbnails) {
    if (!thumbnails) return '';
    return (thumbnails.maxres || thumbnails.high || thumbnails.medium || thumbnails.default || {}).url || '';
  }

  /* ── Llamada a la API ─────────────────────────────────── */
  async function _fetchProxySearch(query) {
    if (!location.protocol.startsWith('http')) return null;

    const response = await fetch(`/api/youtube-search?q=${encodeURIComponent(query)}`);
    if (response.status === 404) return null;

    const body = await response.json().catch(() => ({}));
    if (response.status === 500 && body?.error === 'YOUTUBE_NO_API_KEY') return null;
    if (!response.ok) {
      throw new Error(body?.error || `YOUTUBE_HTTP_${response.status}`);
    }

    return Array.isArray(body.items) ? body.items : [];
  }

  async function _fetch(endpoint, params) {
    if (!API_KEY || API_KEY === 'TU_API_KEY_AQUI') {
      throw new Error('YOUTUBE_NO_API_KEY');
    }

    await _rateLimit();

    const url = new URL(`${BASE_URL}/${endpoint}`);
    url.searchParams.set('key', API_KEY);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

    const response = await fetch(url.toString());

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const reason = body?.error?.errors?.[0]?.reason || 'unknown';
      const msg = body?.error?.message || `HTTP ${response.status}`;

      if (response.status === 403) {
        if (reason === 'quotaExceeded') throw new Error('YOUTUBE_QUOTA_EXCEEDED');
        throw new Error('YOUTUBE_FORBIDDEN');
      }
      if (response.status === 400) throw new Error('YOUTUBE_BAD_REQUEST');
      throw new Error(`YOUTUBE_HTTP_${response.status}`);
    }

    return response.json();
  }

  /* ── Buscar videos ────────────────────────────────────── */
  async function search(query) {
    if (!query || !query.trim()) return [];

    const cacheKey = _cacheKey('search', query);
    const cached = _cacheGet(cacheKey);
    if (cached) return cached;

    const proxyResults = await _fetchProxySearch(query);
    if (proxyResults) {
      _cacheSet(cacheKey, proxyResults);
      return proxyResults;
    }

    // 1. Búsqueda: obtener videoIds
    const searchData = await _fetch('search', {
      part:       'snippet',
      q:          `${query} official`,
      type:       'video',
      videoEmbeddable: 'true',
      videoCategoryId: '10', // Music
      maxResults: MAX_RESULTS,
      fields:     'items(id/videoId,snippet/title,snippet/channelTitle,snippet/thumbnails)'
    });

    if (!searchData.items || searchData.items.length === 0) {
      _cacheSet(cacheKey, []);
      return [];
    }

    const videoIds = searchData.items.map(i => i.id.videoId).join(',');

    // 2. Detalles: obtener duración
    const detailData = await _fetch('videos', {
      part:   'contentDetails,snippet,status',
      id:     videoIds,
      fields: 'items(id,contentDetails/duration,status/embeddable,snippet/title,snippet/channelTitle,snippet/thumbnails)'
    });

    // 3. Combinar resultados
    const detailMap = {};
    (detailData.items || []).forEach(item => {
      detailMap[item.id] = item;
    });

    const results = searchData.items
      .filter(item => detailMap[item.id.videoId])
      .map(item => {
        const detail = detailMap[item.id.videoId];
        if (detail.status?.embeddable === false) return null;
        const durationIso = detail.contentDetails?.duration || '';
        const durationSecs = _parseDurationSeconds(durationIso);

        // Filtrar videos demasiado cortos (<60s) o muy largos (>12min = probablemente no es una canción)
        if (durationSecs < 60 || durationSecs > 720) return null;

        return {
          type:       'youtube',
          videoId:    item.id.videoId,
          title:      item.snippet.title,
          artist:     item.snippet.channelTitle,
          cover:      _getBestThumbnail(item.snippet.thumbnails),
          duration:   _parseDuration(durationIso),
          durationSecs,
          category:   'Online',
          // file se usa como identificador único en Droply
          file:       `yt::${item.id.videoId}`,
          source:     'youtube'
        };
      })
      .filter(Boolean);

    _cacheSet(cacheKey, results);
    return results;
  }

  /* ── Obtener detalles de un video ─────────────────────── */
  async function getVideoDetails(videoId) {
    const cacheKey = _cacheKey('video', videoId);
    const cached = _cacheGet(cacheKey);
    if (cached) return cached;

    const data = await _fetch('videos', {
      part:   'snippet,contentDetails,status',
      id:     videoId,
      fields: 'items(id,snippet/title,snippet/channelTitle,snippet/thumbnails,contentDetails/duration,status/embeddable)'
    });

    const item = data.items?.[0];
    if (!item) return null;
    if (item.status?.embeddable === false) return null;

    const result = {
      type:        'youtube',
      videoId:     item.id,
      title:       item.snippet.title,
      artist:      item.snippet.channelTitle,
      cover:       _getBestThumbnail(item.snippet.thumbnails),
      duration:    _parseDuration(item.contentDetails?.duration || ''),
      durationSecs: _parseDurationSeconds(item.contentDetails?.duration || ''),
      category:    'Online',
      file:        `yt::${item.id}`,
      source:      'youtube'
    };

    _cacheSet(cacheKey, result);
    return result;
  }

  /* ── Limpiar caché ────────────────────────────────────── */
  function clearCache() {
    _cache.clear();
  }

  /* ── Estado del servicio ──────────────────────────────── */
  function isConfigured() {
    return !!API_KEY && API_KEY !== 'TU_API_KEY_AQUI';
  }

  return { search, getVideoDetails, clearCache, isConfigured };

})();

window.YouTubeAPI = YouTubeAPI;