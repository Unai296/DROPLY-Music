/* ═══════════════════════════════════════════════════════════
   DROPLY — youtube-integration.js
   Integra YouTubeProvider con todos los sistemas existentes:
   · Reemplaza loadTrack para soportar tracks de YouTube
   · Conecta la barra de progreso, seek, controles
   · Conecta searchInput para buscar en YouTube
   · Mantiene compatibilidad total con la biblioteca local
═══════════════════════════════════════════════════════════ */

'use strict';

/* ════════════════════════════════════════════════════════
   ESPERAR A QUE DROPLY ESTÉ LISTO
   script.js carga de forma síncrona pero MixesManager y
   el resto se inicializan en DOMContentLoaded / setTimeout.
   Usamos un pequeño delay para garantizar el orden.
════════════════════════════════════════════════════════ */
(function bootstrap() {
  function _ready() {
    // Comprobar que las funciones core de Droply existen
    if (typeof loadTrack !== 'function' || typeof showToast !== 'function') {
      setTimeout(_ready, 80);
      return;
    }
    initYouTubeIntegration();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(_ready, 100));
  } else {
    setTimeout(_ready, 100);
  }
})();

/* ════════════════════════════════════════════════════════
   INICIALIZACIÓN PRINCIPAL
════════════════════════════════════════════════════════ */
function initYouTubeIntegration() {

  /* ── Verificar que las APIs de YouTube están disponibles ── */
  if (typeof YouTubeProvider === 'undefined' || typeof YouTubeAPI === 'undefined') {
    console.warn('[DROPLY YT] youtube-provider.js o youtube-api.js no cargados.');
    return;
  }

  /* ── Referencias a los elementos del reproductor ─────────
     Todos estos IDs existen en index.html original de Droply */
  const sheetFill        = document.getElementById('sheetFill');
  const sheetThumb       = document.getElementById('sheetThumb');
  const sheetCurrent     = document.getElementById('sheetCurrent');
  const sheetDuration    = document.getElementById('sheetDuration');
  const miniProgressFill = document.getElementById('miniProgressFill');
  const sheetBar         = document.getElementById('sheetBar');
  const audioEl          = document.getElementById('mainAudio');

  /* ── Estado YouTube integration ────────────────────────── */
  let _ytActive   = false;  // ¿hay un track de YouTube activo?
  let _ytDuration = 0;
  let _ytCurrent  = 0;
  let _searchDebounce = null;
  let _lastYtSearch   = '';
  const YT_TRACKS_KEY = 'droply_youtube_tracks_v1';
  const ONLINE_LIB_KEY = 'droply_online_library_v1';

  function _loadStoredTracks() {
    try {
      const data = JSON.parse(localStorage.getItem(YT_TRACKS_KEY) || '{}');
      return data && typeof data === 'object' ? data : {};
    } catch (_) {
      return {};
    }
  }

  function _saveStoredTracks(data) {
    try { localStorage.setItem(YT_TRACKS_KEY, JSON.stringify(data)); } catch (_) {}
  }

  function _rememberYtTrack(item) {
    if (!YouTubeProvider.isYouTubeTrack(item) || !item.file) return item;
    const normalized = {
      type: 'youtube',
      source: 'youtube',
      videoId: YouTubeProvider.getVideoId(item),
      title: item.title || 'Droply Online',
      artist: item.artist || 'Droply',
      cover: item.cover || '',
      duration: item.duration || '0:00',
      durationSecs: item.durationSecs || 0,
      category: item.category || 'Online',
      file: item.file
    };
    _ytTrackCache.set(normalized.file, normalized);
    const stored = _loadStoredTracks();
    stored[normalized.file] = normalized;
    _saveStoredTracks(stored);
    return normalized;
  }

  function _allYtTracks() {
    const stored = _loadStoredTracks();
    return Object.values(stored).filter(t => t?.file);
  }

  function _onlineLibraryFiles() {
    try { return JSON.parse(localStorage.getItem(ONLINE_LIB_KEY) || '[]'); } catch (_) { return []; }
  }

  function _saveOnlineLibraryFiles(files) {
    try { localStorage.setItem(ONLINE_LIB_KEY, JSON.stringify([...new Set(files)])); } catch (_) {}
  }

  function _saveOnlineTrack(item) {
    item = _rememberYtTrack(item);
    const files = _onlineLibraryFiles();
    if (!files.includes(item.file)) {
      files.unshift(item.file);
      _saveOnlineLibraryFiles(files.slice(0, 300));
    }
    _refreshDiscoverySurfaces();
    return item;
  }

  function _onlineLibraryTracks() {
    const stored = _loadStoredTracks();
    return _onlineLibraryFiles().map(file => stored[file]).filter(Boolean);
  }

  /* ════════════════════════════════════════════════════════
     1. INICIALIZAR YOUTUBE PROVIDER
  ════════════════════════════════════════════════════════ */
  YouTubeProvider.init({
    onPlay() {
      if (!_ytActive) return;
      if (typeof isPlaying !== 'undefined') isPlaying = true;
      if (typeof updatePlayIcons === 'function') updatePlayIcons(true);
      try { if (navigator.mediaSession) navigator.mediaSession.playbackState = 'playing'; } catch(_) {}
    },

    onPause() {
      if (!_ytActive) return;
      if (typeof isPlaying !== 'undefined') isPlaying = false;
      if (typeof updatePlayIcons === 'function') updatePlayIcons(false);
      try { if (navigator.mediaSession) navigator.mediaSession.playbackState = 'paused'; } catch(_) {}
    },

    onEnded() {
      if (!_ytActive) return;
      if (typeof isPlaying !== 'undefined') isPlaying = false;
      if (typeof updatePlayIcons === 'function') updatePlayIcons(false);
      // Respetar repeatMode
      if (typeof repeatMode !== 'undefined' && repeatMode) {
        const cur = typeof playlist !== 'undefined' ? playlist?.[currentTrackIdx] : null;
        if (cur && YouTubeProvider.isYouTubeTrack(cur)) {
          YouTubeProvider.seek(0);
          YouTubeProvider.resume();
          return;
        }
      }
      if (typeof playNext === 'function') playNext();
    },

    onProgress(currentTime, duration) {
      if (!_ytActive) return;
      _ytCurrent  = currentTime;
      _ytDuration = duration;
      _updateProgressUI(currentTime, duration);
      _updateMediaSessionPosition(currentTime, duration);
    },

    onError(code) {
      console.warn('[DROPLY YT] Error en reproducción:', code);
      let msg = 'Error al reproducir';
      if (code === 'YOUTUBE_VIDEO_NOT_FOUND')   msg = 'Canción no disponible';
      if (code === 'YOUTUBE_EMBED_NOT_ALLOWED')  msg = 'Esta canción no permite reproducción aquí';
      if (code === 'YOUTUBE_NO_API_KEY')         msg = 'Búsqueda online no configurada';
      if (code === 'YOUTUBE_QUOTA_EXCEEDED')     msg = 'Búsqueda online agotada hoy';
      if (typeof showToast === 'function') showToast(msg);
      // Intentar pasar al siguiente
      setTimeout(() => { if (typeof playNext === 'function') playNext(); }, 1500);
    }
  });

  /* ════════════════════════════════════════════════════════
     2. PATCH DE loadTrack PARA SOPORTAR YOUTUBE
  ════════════════════════════════════════════════════════ */
  const _originalLoadTrack = window.loadTrack;

  window.loadTrack = function(item, fromQueue = false, newPlaylistContext = null) {

    /* ── Track local: delegar al original ──────────────── */
    if (!YouTubeProvider.isYouTubeTrack(item)) {
      // Si había un track de YouTube activo, detenerlo
      if (_ytActive) {
        _ytActive = false;
        _setYouTubeBadge(false);
        YouTubeProvider.stop();
        if (audioEl) audioEl.style.display = '';
      }
      return _originalLoadTrack.call(this, item, fromQueue, newPlaylistContext);
    }

    /* ── Track de YouTube ──────────────────────────────── */
    item = _rememberYtTrack(item);
    const videoId = YouTubeProvider.getVideoId(item);
    if (!videoId) {
      if (typeof showToast === 'function') showToast('Canción online no válida');
      return;
    }

    // Pausar audio nativo (por si está sonando algo local)
    if (audioEl && !audioEl.paused) {
      audioEl.pause();
      audioEl.src = '';
    }

    /* -- History -- */
    if (typeof historyTracks !== 'undefined') {
      historyTracks.unshift({ file: item.file, timestamp: Date.now() });
      historyTracks = historyTracks
        .filter((v, i, arr) => arr.findIndex(x => x.file === v.file) === i)
        .slice(0, 100);
      if (typeof saveHistory === 'function') saveHistory();
    }

    /* -- Play counts -- */
    if (typeof playCounts !== 'undefined') {
      playCounts[item.file] = (playCounts[item.file] || 0) + 1;
      if (typeof savePlayCounts === 'function') savePlayCounts();
    }

    /* -- Playlist context -- */
    if (!fromQueue) {
      if (typeof playlist !== 'undefined') {
        if (newPlaylistContext) playlist = newPlaylistContext;
        else if (!playlist || !playlist.find(p => p.file === item.file)) {
          playlist = [item];
        }
        currentTrackIdx = playlist.findIndex(p => p.file === item.file);
      }
    } else {
      const idx = typeof playlist !== 'undefined' ? playlist?.findIndex(p => p.file === item.file) : -1;
      if (idx >= 0) currentTrackIdx = idx;
    }

    /* -- UI del reproductor -- */
    const cover    = item.cover || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="%23e94f4f" width="400" height="400"/><text x="50%25" y="50%25" font-size="80" text-anchor="middle" dominant-baseline="middle" fill="white" opacity=".35">▶</text></svg>';
    const miniCover  = document.getElementById('miniCover');
    const miniTitle  = document.getElementById('miniTitle');
    const miniArtist = document.getElementById('miniArtist');
    const miniPlayer = document.getElementById('miniPlayer');

    if (miniCover)  miniCover.src = cover;
    if (miniTitle)  miniTitle.textContent  = item.title;
    if (miniArtist) miniArtist.textContent = item.artist;
    if (miniPlayer) miniPlayer.classList.add('visible');

    const sheetCover    = document.getElementById('sheetCover');
    const sheetCategory = document.getElementById('sheetCategory');
    const sheetTitle    = document.getElementById('sheetTitle');
    const sheetArtist   = document.getElementById('sheetArtist');
    const sheetHeart    = document.getElementById('sheetHeart');
    const sheetBgBlur   = document.getElementById('sheetBgBlur');

    if (sheetCover)    sheetCover.src = cover;
    if (sheetCategory) sheetCategory.textContent = item.album || item.category || '';
    if (sheetTitle)    sheetTitle.textContent = item.title;
    if (sheetArtist)   sheetArtist.textContent = item.artist;


    // Fondo del now-playing sheet
    if (sheetBgBlur) {
      sheetBgBlur.style.transition = 'opacity .4s ease';
      sheetBgBlur.style.opacity = '0';
      setTimeout(() => {
        sheetBgBlur.style.backgroundImage = `url(${cover})`;
        sheetBgBlur.style.opacity = '1';
      }, 200);
    }

    // Like state
    if (sheetHeart && typeof likedTracks !== 'undefined') {
      sheetHeart.classList.toggle('liked', likedTracks.has(item.file));
    }

    // Reset progreso
    if (sheetFill)        sheetFill.style.width        = '0%';
    if (sheetThumb)       sheetThumb.style.left        = '0%';
    if (sheetCurrent)     sheetCurrent.textContent     = '0:00';
    if (sheetDuration)    sheetDuration.textContent    = item.duration || '0:00';
    if (miniProgressFill) miniProgressFill.style.width = '0%';

    // Now playing en queue
    if (typeof renderQueueNowPlaying === 'function') renderQueueNowPlaying(item);

    // Resaltar card activa
    document.querySelectorAll('.media-card').forEach(c => c.classList.remove('is-playing'));
    document.querySelectorAll(`.media-card[data-file="${CSS.escape(item.file)}"]`)
      .forEach(c => c.classList.add('is-playing'));

    // Home "continuar escuchando"
    _updateHomeContinueCard(item, cover);
    _saveOnlineTrack(item);

    // MediaSession
    if (typeof setupMediaSession === 'function') setupMediaSession(item);

    /* -- Reproducir en YouTube -- */
    _rememberYtTrack(item);
    _ytActive   = true;
    _ytDuration = 0;
    _ytCurrent  = 0;

    YouTubeProvider.play(videoId)
      .catch(err => {
        console.warn('[DROPLY YT] Error al iniciar playback:', err);
        if (typeof showToast === 'function') showToast('No se pudo reproducir');
      });
  };

  /* ════════════════════════════════════════════════════════
     3. PATCH DE togglePlay
  ════════════════════════════════════════════════════════ */
  const _originalTogglePlay = window.togglePlay;

  window.togglePlay = function() {
    if (!_ytActive) {
      return _originalTogglePlay.call(this);
    }
    // Track de YouTube activo
    if (YouTubeProvider.isPlaying()) {
      YouTubeProvider.pause();
    } else {
      YouTubeProvider.resume();
    }
  };

  /* ════════════════════════════════════════════════════════
     4. PATCH DE seekToPercent (barra de progreso)
  ════════════════════════════════════════════════════════ */
  const _originalSeekToPercent = window.seekToPercent;

  window.seekToPercent = function(pct) {
    if (!_ytActive) {
      if (_originalSeekToPercent) return _originalSeekToPercent(pct);
      const audio = window.activeAudio || document.getElementById('mainAudio');
      if (audio?.duration && isFinite(audio.duration))
        audio.currentTime = Math.max(0, Math.min(1, pct)) * audio.duration;
      return;
    }
    const dur = YouTubeProvider.getDuration();
    if (dur > 0) YouTubeProvider.seek(Math.max(0, Math.min(1, pct)) * dur);
  };

  /* ════════════════════════════════════════════════════════
     5. ACTUALIZAR UI DE PROGRESO
  ════════════════════════════════════════════════════════ */
  function _updateProgressUI(cur, dur) {
    if (!dur || dur <= 0) return;
    const pct = Math.max(0, Math.min(100, (cur / dur) * 100));

    if (sheetFill)        sheetFill.style.width        = pct + '%';
    if (sheetThumb)       sheetThumb.style.left        = pct + '%';
    if (sheetCurrent)     sheetCurrent.textContent     = _formatTime(cur);
    if (sheetDuration)    sheetDuration.textContent    = _formatTime(dur);
    if (miniProgressFill) miniProgressFill.style.width = pct + '%';

    // Home continue card
    const hccFill = document.getElementById('hccProgressFill');
    if (hccFill && typeof isPlaying !== 'undefined' && isPlaying) {
      hccFill.style.width = pct + '%';
    }
  }

  function _updateMediaSessionPosition(cur, dur) {
    if (!('mediaSession' in navigator)) return;
    try {
      if (!dur || !isFinite(dur) || dur <= 0) return;
      navigator.mediaSession.setPositionState({
        duration:     dur,
        playbackRate: 1,
        position:     Math.max(0, Math.min(cur, dur))
      });
    } catch(_) {}
  }

  function _formatTime(sec) {
    if (isNaN(sec) || !isFinite(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  /* ════════════════════════════════════════════════════════
     6. BADGE YOUTUBE EN EL NOW-PLAYING SHEET
  ════════════════════════════════════════════════════════ */
  function _setYouTubeBadge(show) {
    // sin badge de plataforma
  }

  /* ════════════════════════════════════════════════════════
     7. HOME "CONTINUAR ESCUCHANDO" CARD
  ════════════════════════════════════════════════════════ */
  function _updateHomeContinueCard(item, cover) {
    const hccCoverEl  = document.getElementById('hccCover');
    const hccTitleEl  = document.getElementById('hccTitle');
    const hccArtistEl = document.getElementById('hccArtist');
    const hccGlowEl   = document.getElementById('hccGlow');
    const contSec     = document.getElementById('homeContinueSection');
    const hccBtn      = document.getElementById('hccPlayBtn');

    if (hccCoverEl)  hccCoverEl.src = cover;
    if (hccTitleEl)  hccTitleEl.textContent  = item.title;
    if (hccArtistEl) hccArtistEl.textContent = item.artist;
    if (hccGlowEl)   hccGlowEl.style.backgroundImage = `url(${cover})`;
    if (contSec)     contSec.style.display = '';

    if (hccBtn) {
      hccBtn.onclick = () => {
        const cur = typeof playlist !== 'undefined' ? playlist?.[currentTrackIdx] : null;
        if (cur?.file === item.file) {
          if (typeof togglePlay === 'function') togglePlay();
        } else {
          if (typeof loadTrack === 'function') loadTrack(item);
        }
      };
    }
  }

  /* ════════════════════════════════════════════════════════
     8. INTEGRACIÓN DE BÚSQUEDA — añadir resultados de YouTube
        al panel de búsqueda existente
  ════════════════════════════════════════════════════════ */

  const searchInput   = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchBrowse  = document.getElementById('searchBrowse');
  const searchClear   = document.getElementById('searchClear');

  if (searchInput && searchResults) {
    _patchSearchInput();
  }

  function _patchSearchInput() {
    // Clonar el input para eliminar los listeners originales
    // Nota: No podemos eliminar los originales directamente, así que
    // escuchamos en la fase de captura y añadimos nuestra lógica
    // SIN eliminar el comportamiento original.

    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim();
      clearTimeout(_searchDebounce);

      if (!q) {
        _lastYtSearch = '';
        _clearYtResults();
        return;
      }

      // Debounce de 400ms para YT (el original usa 220ms para local)
      _searchDebounce = setTimeout(() => {
        if (q !== _lastYtSearch) {
          _lastYtSearch = q;
          _runYouTubeSearch(q);
        }
      }, 450);
    });
  }

  async function _runYouTubeSearch(query) {
    if (!YouTubeAPI.isConfigured()) {
      // Mostrar mensaje de configuración
      _showYtConfigMessage();
      return;
    }

    // Mostrar skeleton de carga
    _showYtLoadingState();

    try {
      const results = await YouTubeAPI.search(query);
      _renderYouTubeResults(results, query);
    } catch (err) {
      console.warn('[DROPLY YT] Error buscando:', err);
      _showYtError(err.message);
    }
  }

  function _showYtLoadingState() {
    let ytSection = document.getElementById('ytSearchSection');
    if (!ytSection) {
      ytSection = _createYtSection();
    }
    const list = ytSection.querySelector('.yt-results-list');
    if (list) {
      list.innerHTML = Array(4).fill(0).map(() => `
        <div class="yt-skeleton-row">
          <div class="yt-skeleton-thumb"></div>
          <div class="yt-skeleton-info">
            <div class="yt-skeleton-title"></div>
            <div class="yt-skeleton-artist"></div>
          </div>
        </div>
      `).join('');
    }
  }

  function _renderYouTubeResults(results, query) {
    let ytSection = document.getElementById('ytSearchSection');
    if (!ytSection) {
      ytSection = _createYtSection();
    }

    const list = ytSection.querySelector('.yt-results-list');
    if (!list) return;

    list.innerHTML = '';

    if (!results || results.length === 0) {
      list.innerHTML = `<p class="yt-no-results">Sin resultados para "<em>${_escHtml(query)}</em>"</p>`;
      return;
    }

    results.forEach(item => {
      item = _rememberYtTrack(item);
      const row = document.createElement('div');
      row.className = 'search-result-row yt-result-row';
      row.innerHTML = `
        <div class="yt-thumb-wrap">
          <img src="${_escHtml(item.cover)}" alt="${_escHtml(item.title)}" loading="lazy"
               onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22><rect fill=%22%23e94f4f%22 width=%22400%22 height=%22300%22/></svg>'" />
          <div class="yt-thumb-play">
            <svg viewBox="0 0 24 24" fill="white" stroke="none" width="16" height="16"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>
        <div class="search-result-info">
          <span class="search-result-title">${_escHtml(item.title)}</span>
          <span class="search-result-artist">${_escHtml(item.artist)}</span>
        </div>
        <div class="search-result-actions">
          <span class="yt-duration-tag">${_escHtml(item.duration)}</span>
          <button class="search-result-more-btn library-action-more" title="Más opciones" aria-label="Más opciones">
            <svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none"/></svg>
          </button>
        </div>`;

      row.addEventListener('click', e => {
        if (e.target.closest('.search-result-more-btn')) return;
        if (typeof loadTrack === 'function') {
          _saveOnlineTrack(item);
          loadTrack(item, false, results);
          if (typeof showPage === 'function') showPage('pageHome');
        }
      });

      row.querySelector('.search-result-more-btn').addEventListener('click', e => {
        e.stopPropagation();
        _rememberYtTrack(item);
        if (typeof openContextMenu === 'function') openContextMenu(item);
      });

      list.appendChild(row);
    });
  }

  function _createYtSection() {
    // Eliminar si ya existe
    const old = document.getElementById('ytSearchSection');
    if (old) old.remove();

    const section = document.createElement('div');
    section.id = 'ytSearchSection';
    section.className = 'yt-search-section';
    section.innerHTML = `
      <div class="yt-section-header">
        <span class="yt-section-title">Resultados</span>
      </div>
      <div class="yt-results-list"></div>`;

    // Insertar ANTES o DESPUÉS de los resultados locales dentro del searchResults
    // Primero asegurarse de que searchResults es visible
    if (searchResults) {
      searchResults.style.display = '';
      searchResults.appendChild(section);
    }

    return section;
  }

  function _clearYtResults() {
    const section = document.getElementById('ytSearchSection');
    if (section) section.remove();
  }

  function _showYtError(code) {
    let ytSection = document.getElementById('ytSearchSection');
    if (!ytSection) ytSection = _createYtSection();
    const list = ytSection.querySelector('.yt-results-list');
    if (!list) return;

    let msg = 'Error al buscar';
    if (code === 'YOUTUBE_NO_API_KEY')       msg = 'Búsqueda online no disponible ahora.';
    if (code === 'YOUTUBE_QUOTA_EXCEEDED')   msg = 'Búsqueda online agotada hoy. Inténtalo mañana.';
    if (code === 'YOUTUBE_FORBIDDEN')        msg = '🔒 Acceso denegado. Verifica tu API Key.';

    list.innerHTML = `<p class="yt-error-msg">${msg}</p>`;
  }

  function _showYtConfigMessage() {
    let ytSection = document.getElementById('ytSearchSection');
    if (!ytSection) ytSection = _createYtSection();
    const list = ytSection.querySelector('.yt-results-list');
    if (!list) return;
    list.innerHTML = `
      <div class="yt-config-notice">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="margin:0 auto .5rem;display:block;color:var(--accent)">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
          <path d="M9.5 8.5v7l6-3.5-6-3.5Z" fill="currentColor"/>
        </svg>
        <p>Servicio de búsqueda online no disponible.</p>
      </div>`;
  }

  function _ensureOnlineLibraryHome() {
    if (document.getElementById('homeOnlineSection')) return;
    const anchor = document.getElementById('homeRecentSection') || document.getElementById('homeFeaturedSection');
    if (!anchor?.parentNode) return;
    const section = document.createElement('section');
    section.className = 'home-section';
    section.id = 'homeOnlineSection';
    section.style.display = 'none';
    section.innerHTML = `
      <div class="home-section-header">
        <h2 class="home-section-title">Online guardadas</h2>
        <button class="home-section-link" id="homeOnlineSearchBtn">Buscar</button>
      </div>
      <div class="home-hscroll-wrap">
        <div class="home-hscroll" id="homeOnlineGrid"></div>
      </div>`;
    anchor.parentNode.insertBefore(section, anchor);
    section.querySelector('#homeOnlineSearchBtn')?.addEventListener('click', () => {
      if (typeof showPage === 'function') showPage('pageSearch');
    });
  }

  function _makeHomeTrackCard(item, context) {
    const card = document.createElement('div');
    card.className = 'home-track-card';
    const cover = item.cover || '';
    card.innerHTML = `
      <div class="home-track-cover">
        <img src="${_escHtml(cover)}" alt="${_escHtml(item.title)}" loading="lazy">
        <div class="home-track-play-overlay">
          <svg viewBox="0 0 24 24" fill="white" stroke="none" width="18" height="18"><polygon points="5,3 19,12 5,21"/></svg>
        </div>
        <button class="home-track-more-btn" aria-label="Más opciones">
          <svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="5" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.3" fill="currentColor" stroke="none"/></svg>
        </button>
      </div>
      <p class="home-track-title">${_escHtml(item.title)}</p>
      <p class="home-track-artist">${_escHtml(item.artist)}</p>`;
    card.addEventListener('click', e => {
      if (e.target.closest('.home-track-more-btn')) return;
      if (typeof loadTrack === 'function') loadTrack(item, false, context || [item]);
    });
    card.querySelector('.home-track-more-btn')?.addEventListener('click', e => {
      e.stopPropagation();
      if (typeof openContextMenu === 'function') openContextMenu(item);
    });
    return card;
  }

  function _renderOnlineLibraryHome() {
    _ensureOnlineLibraryHome();
    const section = document.getElementById('homeOnlineSection');
    const grid = document.getElementById('homeOnlineGrid');
    if (!section || !grid) return;
    const tracks = _onlineLibraryTracks();
    if (!tracks.length) {
      section.style.display = 'none';
      return;
    }
    section.style.display = '';
    grid.innerHTML = '';
    tracks.slice(0, 18).forEach(track => grid.appendChild(_makeHomeTrackCard(track, tracks)));
  }

  function _splitArtists(name) {
    return String(name || '').split(/,|&| x | feat\.| ft\./i).map(v => v.trim()).filter(Boolean);
  }

  function _localTracks() {
    return Array.isArray(media) ? media.filter(t => t.type === 'music') : [];
  }

  function _allKnownTracks() {
    const seen = new Set();
    return [..._localTracks(), ..._allYtTracks()].filter(track => {
      if (!track?.file || seen.has(track.file)) return false;
      seen.add(track.file);
      return true;
    });
  }

  function _artistData() {
    const map = {};
    _allKnownTracks().forEach(track => {
      _splitArtists(track.artist).forEach(name => {
        if (!map[name]) map[name] = { name, tracks: [], count: 0, cover: track.cover, category: track.category };
        map[name].tracks.push(track);
        map[name].count += (typeof playCounts !== 'undefined' ? (playCounts[track.file] || 0) : 0) + (track.source === 'youtube' ? 1 : 0);
        if (!map[name].cover && track.cover) map[name].cover = track.cover;
      });
    });
    return Object.values(map).sort((a, b) => b.count - a.count || b.tracks.length - a.tracks.length);
  }

  function _ensureArtistModal() {
    if (document.getElementById('artistDetailModal')) return;
    document.body.insertAdjacentHTML('beforeend', `
      <div class="playlist-page" id="artistDetailModal">
        <div class="playlist-page-bg" id="artistDetailBg"></div>
        <div class="playlist-page-topbar">
          <button class="playlist-page-back" id="artistDetailClose" aria-label="Volver">
            <svg viewBox="0 0 24 24" width="22" height="22"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span class="playlist-page-topbar-title" id="artistDetailTopTitle"></span>
          <div style="width:36px"></div>
        </div>
        <div class="playlist-page-scroll">
          <div class="playlist-page-hero">
            <div class="playlist-detail-cover single mix-detail-cover" id="artistDetailCover"></div>
            <div class="playlist-page-meta">
              <p class="playlist-detail-label mix-detail-type-label">ARTISTA</p>
              <h1 class="playlist-detail-name" id="artistDetailName">-</h1>
              <p class="playlist-detail-count" id="artistDetailCount">0 canciones</p>
            </div>
          </div>
          <div class="playlist-page-actions">
            <button class="playlist-page-shuffle-btn" id="btnShuffleArtist" aria-label="Aleatorio">
              <svg viewBox="0 0 24 24" width="20" height="20"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
            </button>
            <button class="playlist-page-play-btn" id="btnPlayArtist" aria-label="Reproducir todo">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" stroke="none"><polygon points="5,3 19,12 5,21"/></svg>
            </button>
          </div>
          <div class="playlist-detail-list" id="artistDetailList"></div>
        </div>
      </div>`);
    document.getElementById('artistDetailClose')?.addEventListener('click', () => {
      document.getElementById('artistDetailModal')?.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  function _openArtistDetail(name) {
    _ensureArtistModal();
    const data = _artistData().find(a => a.name.toLowerCase() === String(name).toLowerCase());
    if (!data) return;
    const cover = data.cover || '';
    const modal = document.getElementById('artistDetailModal');
    document.getElementById('artistDetailBg').style.backgroundImage = cover ? `url('${cover}')` : '';
    document.getElementById('artistDetailTopTitle').textContent = data.name;
    document.getElementById('artistDetailName').textContent = data.name;
    document.getElementById('artistDetailCount').textContent = `${data.tracks.length} canciones`;
    const coverEl = document.getElementById('artistDetailCover');
    coverEl.innerHTML = cover ? `<img src="${_escHtml(cover)}" alt="${_escHtml(data.name)}" style="width:100%;height:100%;object-fit:cover;display:block">` : '';
    const list = document.getElementById('artistDetailList');
    list.innerHTML = '';
    data.tracks.forEach((track, idx) => {
      const row = document.createElement('div');
      row.className = 'playlist-detail-item';
      row.innerHTML = `
        <span class="playlist-detail-num">${idx + 1}</span>
        <img class="playlist-detail-thumb" src="${_escHtml(track.cover || '')}" alt="${_escHtml(track.title)}" loading="lazy" onerror="this.style.opacity='.3'">
        <div class="playlist-detail-info">
          <div class="playlist-detail-track">${_escHtml(track.title)}</div>
          <div class="playlist-detail-artist">${_escHtml(track.artist || '')}</div>
        </div>
        <span class="playlist-detail-dur">${_escHtml(track.duration || '')}</span>`;
      row.addEventListener('click', () => loadTrack(track, false, data.tracks));
      row.addEventListener('contextmenu', e => { e.preventDefault(); openContextMenu(track); });
      list.appendChild(row);
    });
    document.getElementById('btnPlayArtist').onclick = () => data.tracks[0] && loadTrack(data.tracks[0], false, data.tracks);
    document.getElementById('btnShuffleArtist').onclick = () => {
      const shuffled = [...data.tracks].sort(() => Math.random() - .5);
      if (shuffled[0]) loadTrack(shuffled[0], false, shuffled);
    };
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function _renderArtistHome() {
    const section = document.getElementById('homeArtistsSection');
    const grid = document.getElementById('homeArtistsGrid');
    if (!section || !grid) return;
    const artists = _artistData().slice(0, 12);
    if (!artists.length) return;
    grid.innerHTML = '';
    artists.forEach(artist => {
      const card = document.createElement('div');
      card.className = 'home-artist-card';
      card.innerHTML = `
        <div class="home-artist-img-wrap">
          <img src="${_escHtml(artist.cover || '')}" alt="${_escHtml(artist.name)}" loading="lazy">
        </div>
        <p class="home-artist-name">${_escHtml(artist.name)}</p>`;
      card.addEventListener('click', () => _openArtistDetail(artist.name));
      grid.appendChild(card);
    });
    section.style.display = '';
  }

  function _trackScore(track) {
    const plays = typeof playCounts !== 'undefined' ? (playCounts[track.file] || 0) : 0;
    const liked = typeof likedTracks !== 'undefined' && likedTracks.has(track.file) ? 5 : 0;
    return plays + liked + (track.source === 'youtube' ? 1 : 0);
  }

  function _autoMixes() {
    const tracks = _allKnownTracks();
    const liked = tracks.filter(t => typeof likedTracks !== 'undefined' && likedTracks.has(t.file));
    const online = _onlineLibraryTracks();
    const recent = (typeof historyTracks !== 'undefined' ? historyTracks : []).map(h => getTrackByFile(h.file)).filter(Boolean);
    const top = [...tracks].sort((a, b) => _trackScore(b) - _trackScore(a));
    const byCat = {};
    tracks.forEach(track => {
      const cat = track.category || 'Online';
      if (!byCat[cat]) byCat[cat] = [];
      byCat[cat].push(track);
    });
    return [
      { id: 'auto-for-you', name: 'Para ti', desc: 'Tus likes, escuchas y descubrimientos online.', tracks: top.slice(0, 30) },
      { id: 'auto-recent', name: 'Últimas escuchadas', desc: 'Lo que has puesto más cerca.', tracks: recent.slice(0, 30) },
      { id: 'auto-liked', name: 'Favoritas recientes', desc: 'Todas tus favoritas, locales y online.', tracks: liked.slice(0, 30) },
      { id: 'auto-online', name: 'Online guardadas', desc: 'Tu biblioteca online de Droply.', tracks: online.slice(0, 30) },
      ...Object.entries(byCat).filter(([, list]) => list.length >= 3).slice(0, 8).map(([cat, list]) => ({
        id: `auto-cat-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        name: `${cat} Mix`,
        desc: `Selección automática de ${cat}.`,
        tracks: list.slice(0, 30)
      }))
    ].filter(m => m.tracks.length);
  }

  function _installAutoMixes() {
    if (typeof MIXES === 'undefined' || !Array.isArray(MIXES)) return;
    const existingManual = MIXES.filter(m => !String(m.id).startsWith('auto-'));
    const existingIds = new Set(existingManual.map(m => m.id));
    const autos = _autoMixes().filter(m => !existingIds.has(m.id));
    MIXES.splice(0, MIXES.length, ...autos, ...existingManual);
    if (typeof MixesManager !== 'undefined') {
      MixesManager.renderHome?.();
      const mixesPage = document.getElementById('pageMixes');
      if (mixesPage?.classList.contains('active')) MixesManager.renderGrid?.();
    }
  }

  function _refreshDiscoverySurfaces() {
    _renderOnlineLibraryHome();
    _renderArtistHome();
    _installAutoMixes();
  }

  /* ════════════════════════════════════════════════════════
     9. COMPATIBILIDAD CON EL SISTEMA DE LIKES
        likedTracks usa item.file como clave, los tracks de YT
        usan "yt::<videoId>" — funciona igual que los locales.
  ════════════════════════════════════════════════════════ */

  /* ════════════════════════════════════════════════════════
     10. COMPATIBILIDAD CON PLAYLISTS
         addTrackToPlaylist usa item.file como clave.
         Los tracks de YT también tienen file="yt::<videoId>"
         → funciona sin modificaciones.
         
         Al abrir una playlist, getTrackByFile busca en "media".
         Los tracks de YouTube no están en media, por eso
         necesitamos un lookup extendido.
  ════════════════════════════════════════════════════════ */

  /* Extender getTrackByFile para tracks de YouTube guardados en playlists */
  const _originalGetTrackByFile = window.getTrackByFile;
  const _ytTrackCache = new Map(); // file → track

  Object.values(_loadStoredTracks()).forEach(track => {
    if (track?.file) _ytTrackCache.set(track.file, track);
  });

  function _setYouTubeOfflineMenuState(isYouTube) {
    const btn = document.getElementById('ctxSheetOffline');
    const label = document.getElementById('ctxSheetOfflineLabel');
    const icon = document.getElementById('ctxSheetOfflineIcon');
    if (!btn) return;

    btn.classList.toggle('disabled', !!isYouTube);
    btn.setAttribute('aria-disabled', isYouTube ? 'true' : 'false');
    btn.style.opacity = isYouTube ? '.45' : '';

    if (isYouTube) {
      if (label) label.textContent = 'Offline no disponible';
      if (icon) {
        icon.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20"><path d="M10.5 20H5a2 2 0 0 1-2-2v-4"/><path d="M21 14v4a2 2 0 0 1-2 2h-3.5"/><polyline points="7 9 12 14 14.5 11.5"/><line x1="3" y1="3" x2="21" y2="21"/></svg>`;
      }
    }
  }

  window.DroplyYouTubeIntegration = {
    isYouTubeTrack: item => YouTubeProvider.isYouTubeTrack(item),
    isActive: () => _ytActive,
    isPlaying: () => _ytActive && YouTubeProvider.isPlaying(),
    loadTrack: (...args) => window.loadTrack(...args),
    togglePlay: () => {
      if (!_ytActive) return false;
      if (YouTubeProvider.isPlaying()) YouTubeProvider.pause();
      else YouTubeProvider.resume();
      return true;
    },
    seekToPercent: pct => {
      if (!_ytActive) return false;
      const dur = YouTubeProvider.getDuration() || _ytDuration;
      if (dur > 0) YouTubeProvider.seek(Math.max(0, Math.min(1, pct)) * dur);
      return true;
    },
    seek: seconds => {
      if (!_ytActive) return false;
      YouTubeProvider.seek(Math.max(0, seconds || 0));
      return true;
    },
    getCurrentTime: () => _ytActive ? (YouTubeProvider.getCurrentTime() || _ytCurrent || 0) : 0,
    getDuration: () => _ytActive ? (YouTubeProvider.getDuration() || _ytDuration || 0) : 0,
    saveOnlineTrack: item => _saveOnlineTrack(item),
    getOnlineLibraryTracks: () => _onlineLibraryTracks(),
    refreshDiscoverySurfaces: () => _refreshDiscoverySurfaces(),
    openArtistDetail: name => _openArtistDetail(name),
    stop: () => {
      if (!_ytActive) return false;
      _ytActive = false;
      YouTubeProvider.stop();
      return true;
    },
    getTrackByFile: file => {
      if (typeof file === 'string' && file.startsWith('yt::')) {
        return _ytTrackCache.get(file) || _loadStoredTracks()[file] || null;
      }
      return null;
    }
  };

  const _originalOpenContextMenu = window.openContextMenu;
  if (_originalOpenContextMenu) {
    window.openContextMenu = function(item) {
      const isYouTube = YouTubeProvider.isYouTubeTrack(item);
      if (isYouTube) item = _rememberYtTrack(item);
      const result = _originalOpenContextMenu.call(this, item);
      _setYouTubeOfflineMenuState(isYouTube);
      return result;
    };
  }

  const _originalOpenAddToPlaylist = window.openAddToPlaylist;
  if (_originalOpenAddToPlaylist) {
    window.openAddToPlaylist = function(item) {
      if (YouTubeProvider.isYouTubeTrack(item)) item = _rememberYtTrack(item);
      return _originalOpenAddToPlaylist.call(this, item);
    };
  }

  const _originalAddToQueue = window.addToQueue;
  if (_originalAddToQueue) {
    window.addToQueue = function(item) {
      if (YouTubeProvider.isYouTubeTrack(item)) item = _rememberYtTrack(item);
      return _originalAddToQueue.call(this, item);
    };
  }

  const _originalAddTrackToPlaylist = window.addTrackToPlaylist;
  if (_originalAddTrackToPlaylist) {
    window.addTrackToPlaylist = function(playlistId, trackFile) {
      const track = _ytTrackCache.get(trackFile);
      if (track) _rememberYtTrack(track);
      return _originalAddTrackToPlaylist.call(this, playlistId, trackFile);
    };
  }

  window.getTrackByFile = function(file) {
    if (typeof file === 'string' && file.startsWith('yt::')) {
      return _ytTrackCache.get(file) || _loadStoredTracks()[file] || null;
    }
    return _originalGetTrackByFile ? _originalGetTrackByFile(file) : null;
  };

  if (typeof OfflineManager !== 'undefined' && OfflineManager.downloadTrack) {
    const _originalDownloadTrack = OfflineManager.downloadTrack;
    OfflineManager.downloadTrack = function(item, onProgress) {
      if (YouTubeProvider.isYouTubeTrack(item)) {
        _setYouTubeOfflineMenuState(true);
        if (typeof showToast === 'function') {
          showToast('Esta canción online no se puede guardar offline', 'default');
        }
        return Promise.resolve(false);
      }
      return _originalDownloadTrack.call(this, item, onProgress);
    };
  }

  /* ════════════════════════════════════════════════════════
     11. RESTAURAR BADGE CUANDO SE VUELVE A UN TRACK LOCAL
  ════════════════════════════════════════════════════════ */
  // Limpieza de estado YT gestionada dentro del loadTrack principal

  /* ════════════════════════════════════════════════════════
     12. SEEK DESDE LA BARRA DE PROGRESO DEL SHEET
         Los event listeners en sheetBar ya llaman a seekToPercent,
         que hemos patcheado arriba → funciona sin cambios.
  ════════════════════════════════════════════════════════ */

  /* ════════════════════════════════════════════════════════
     13. MEDIA SESSION para tracks de YouTube
  ════════════════════════════════════════════════════════ */
  const _originalSetupMediaSession = window.setupMediaSession;
  window.setupMediaSession = function(item) {
    if (!('mediaSession' in navigator)) return;
    if (!YouTubeProvider.isYouTubeTrack(item)) {
      if (_originalSetupMediaSession) return _originalSetupMediaSession.call(this, item);
      return;
    }
    try {
      const cover = item.cover || '';
      const imgType = cover.startsWith('data:image/svg') ? 'image/svg+xml' : 'image/jpeg';

      navigator.mediaSession.metadata = new MediaMetadata({
        title:  item.title,
        artist: item.artist,
        album:  item.category || '',
        artwork: cover ? [
          { src: cover, sizes: '96x96',   type: imgType },
          { src: cover, sizes: '192x192', type: imgType },
          { src: cover, sizes: '512x512', type: imgType }
        ] : []
      });

      navigator.mediaSession.setActionHandler('play', () => {
        if (!YouTubeProvider.isPlaying() && typeof togglePlay === 'function') togglePlay();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        if (YouTubeProvider.isPlaying() && typeof togglePlay === 'function') togglePlay();
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => typeof playPrev === 'function' && playPrev());
      navigator.mediaSession.setActionHandler('nexttrack',     () => typeof playNext === 'function' && playNext());

      try {
        navigator.mediaSession.setActionHandler('seekbackward', ({ seekOffset = 10 } = {}) => {
          if (YouTubeProvider.isYouTubeTrack(item)) {
            YouTubeProvider.seek(Math.max(0, (YouTubeProvider.getCurrentTime() || _ytCurrent || 0) - seekOffset));
          }
        });
      } catch(_) {}
      try {
        navigator.mediaSession.setActionHandler('seekforward', ({ seekOffset = 10 } = {}) => {
          if (YouTubeProvider.isYouTubeTrack(item)) {
            const cur = YouTubeProvider.getCurrentTime() || _ytCurrent || 0;
            const dur = YouTubeProvider.getDuration() || _ytDuration || 0;
            YouTubeProvider.seek(dur ? Math.min(dur, cur + seekOffset) : cur + seekOffset);
          }
        });
      } catch(_) {}

      try {
        navigator.mediaSession.setActionHandler('seekto', ({ seekTime }) => {
          if (YouTubeProvider.isYouTubeTrack(item)) {
            YouTubeProvider.seek(seekTime || 0);
          } else if (_originalSetupMediaSession) {
            // El original ya maneja esto
          }
        });
      } catch(_) {}

    } catch(err) {
      console.warn('[DROPLY YT] MediaSession error:', err);
    }
  };

  /* ════════════════════════════════════════════════════════
     14. INYECTAR CSS DE YOUTUBE EN EL DOCUMENTO
  ════════════════════════════════════════════════════════ */
  _injectStyles();
  setTimeout(_refreshDiscoverySurfaces, 0);

  function _injectStyles() {
    if (document.getElementById('droply-yt-styles')) return;
    const style = document.createElement('style');
    style.id = 'droply-yt-styles';
    style.textContent = `

/* ── YouTube Search Section ─────────────────────── */
.yt-search-section {
  margin-top: 1.5rem;
  border-top: 1px solid var(--border);
  padding-top: 1rem;
}

.yt-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem .6rem;
}

.yt-section-title {
  font-size: .8rem;
  font-weight: 600;
  color: var(--text-mid);
  letter-spacing: .04em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
}

/* ── YouTube result row ─────────────────────────── */
.yt-result-row {
  display: grid;
  grid-template-columns: 72px 1fr auto;
  gap: .75rem;
  align-items: center;
  padding: .55rem 1rem;
  cursor: pointer;
  transition: background var(--t) var(--ease);
  border-radius: var(--r-sm);
  margin: 0 .25rem;
}
.yt-result-row:hover,
.yt-result-row:active {
  background: var(--surface);
}

.yt-thumb-wrap {
  position: relative;
  width: 72px;
  height: 48px;
  border-radius: var(--r-xs);
  overflow: hidden;
  flex-shrink: 0;
  background: var(--bg3);
}
.yt-thumb-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.yt-thumb-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.45);
  opacity: 0;
  transition: opacity .15s;
}
.yt-result-row:hover .yt-thumb-play,
.yt-result-row:active .yt-thumb-play {
  opacity: 1;
}
.yt-badge-small {
  position: absolute;
  bottom: 3px;
  right: 3px;
  line-height: 0;
}

/* ── Duration tag ─────────────────────────────── */
.yt-duration-tag {
  font-size: .72rem;
  color: var(--text-soft);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

/* ── Loading skeleton ─────────────────────────── */
.yt-skeleton-row {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: .75rem;
  align-items: center;
  padding: .55rem 1rem;
}
.yt-skeleton-thumb {
  width: 72px;
  height: 48px;
  border-radius: var(--r-xs);
  background: var(--bg3);
  animation: yt-pulse 1.4s ease-in-out infinite;
}
.yt-skeleton-info {
  display: flex;
  flex-direction: column;
  gap: .4rem;
}
.yt-skeleton-title {
  height: .75rem;
  border-radius: 4px;
  background: var(--bg3);
  width: 70%;
  animation: yt-pulse 1.4s ease-in-out infinite;
}
.yt-skeleton-artist {
  height: .65rem;
  border-radius: 4px;
  background: var(--bg3);
  width: 45%;
  animation: yt-pulse 1.4s ease-in-out infinite .2s;
}
@keyframes yt-pulse {
  0%, 100% { opacity: .4; }
  50%       { opacity: .75; }
}

/* ── Messages ─────────────────────────────────── */
.yt-no-results {
  font-size: .84rem;
  color: var(--text-soft);
  text-align: center;
  padding: 1rem;
}
.yt-error-msg {
  font-size: .82rem;
  color: #e94f4f;
  text-align: center;
  padding: 1rem;
  line-height: 1.5;
}
.yt-config-notice {
  text-align: center;
  padding: 1.5rem 1rem;
  color: var(--text-mid);
  font-size: .82rem;
  line-height: 1.7;
}
.yt-config-notice code {
  background: var(--bg3);
  padding: .1em .4em;
  border-radius: 4px;
  font-size: .8rem;
  color: var(--accent-lt);
}

/* ── YouTube badge en el now-playing sheet ─────── */
#ytSheetBadge {
  align-self: flex-start;
}

/* ── Resultados de YouTube + separador visual ──── */
.yt-results-list .search-result-row:first-child {
  margin-top: .25rem;
}

/* ── Animación de entrada ─────────────────────── */
.yt-result-row {
  animation: fadeInUp .2s var(--ease) both;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.yt-result-row:nth-child(1) { animation-delay: .03s; }
.yt-result-row:nth-child(2) { animation-delay: .06s; }
.yt-result-row:nth-child(3) { animation-delay: .09s; }
.yt-result-row:nth-child(4) { animation-delay: .12s; }
.yt-result-row:nth-child(5) { animation-delay: .15s; }

    `;
    document.head.appendChild(style);
  }

  /* ── Utilidad: escapar HTML ────────────────────────────── */
  function _escHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ════════════════════════════════════════════════════════
     FIX: REPRODUCCIÓN EN BACKGROUND (pantalla apagada)
     Tres mecanismos combinados:
       1. visibilitychange  → reanuda si estaba sonando al volver
       2. WakeLock API      → pide bloqueo de pantalla mientras suena
       3. Audio silencioso  → mantiene el hilo de audio activo en iOS/Android
  ════════════════════════════════════════════════════════ */

  /* ── 3. Audio silencioso: 1 segundo de silencio en loop ── */
  /* iOS y algunos Android paran el IFrame si no hay un elemento
     <audio> nativo activo. Creamos uno con un mp3 de silencio
     en base64 (100 bytes, 1 s a 8 kHz mono) y lo dejamos en loop.
     Solo se activa cuando hay un track de YouTube reproduciendo. */
  let _silentAudio = null;

  function _ensureSilentAudio() {
    if (_silentAudio) return;
    // PCM silencioso mínimo codificado en base64 (~1 s, 8 kHz, mono)
    const silentMp3 =
      'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA' +
      '//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADIADMzMzMzMzMzMzM' +
      'zMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM//sQZAAP8AAAaQAAAAgAAA0g' +
      'AAABExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
    _silentAudio = new Audio(silentMp3);
    _silentAudio.loop   = true;
    _silentAudio.volume = 0.001;  // prácticamente inaudible
    _silentAudio.setAttribute('playsinline', '');
  }

  function _startSilentAudio() {
    _ensureSilentAudio();
    if (_silentAudio.paused) {
      _silentAudio.play().catch(() => {});
    }
  }

  function _stopSilentAudio() {
    if (_silentAudio && !_silentAudio.paused) {
      _silentAudio.pause();
    }
  }

  /* ── 2. WakeLock: pedir/liberar bloqueo de pantalla ────── */
  let _wakeLock = null;

  async function _requestWakeLock() {
    if (!('wakeLock' in navigator)) return;
    try {
      if (_wakeLock) return; // ya tenemos uno
      _wakeLock = await navigator.wakeLock.request('screen');
      _wakeLock.addEventListener('release', () => { _wakeLock = null; });
    } catch (_) {
      // El sistema puede denegar el wake lock (batería baja, etc.) — no pasa nada
    }
  }

  async function _releaseWakeLock() {
    if (!_wakeLock) return;
    try { await _wakeLock.release(); } catch (_) {}
    _wakeLock = null;
  }

  /* ── 1. visibilitychange: reanudar si la pantalla vuelve ── */
  document.addEventListener('visibilitychange', () => {
    if (!_ytActive) return;

    if (document.hidden) {
      /* Pantalla apagada / app en background:
         El IFrame puede haberse pausado solo — recordar que estábamos sonando */
      window._droplyYtWasPlaying = YouTubeProvider.isPlaying();
    } else {
      /* Pantalla encendida de nuevo */
      if (window._droplyYtWasPlaying) {
        // Pequeño delay para que el IFrame termine de "despertar"
        setTimeout(() => {
          if (_ytActive && !YouTubeProvider.isPlaying()) {
            YouTubeProvider.resume();
          }
        }, 300);
        window._droplyYtWasPlaying = false;
      }
      // Re-pedir wake lock si se liberó automáticamente
      _requestWakeLock();
    }
  });

  /* También capturar el evento 'freeze' (background tab en Chrome) */
  document.addEventListener('freeze', () => {
    if (_ytActive) window._droplyYtWasPlaying = YouTubeProvider.isPlaying();
  });
  document.addEventListener('resume', () => {
    if (_ytActive && window._droplyYtWasPlaying) {
      setTimeout(() => {
        if (!YouTubeProvider.isPlaying()) YouTubeProvider.resume();
        window._droplyYtWasPlaying = false;
      }, 300);
    }
  });

  /* ── Enganchar los callbacks de play/pause para activar los fixes ── */
  /* Wrapeamos onPlay / onPause del provider ya inicializado */
  const _origInit = YouTubeProvider.init.bind(YouTubeProvider);
  // Como el provider ya está inicializado arriba, accedemos a los callbacks
  // a través del estado interno vía los eventos de estado del player.
  // Más sencillo: parchear directamente los callbacks que pasamos arriba.
  // Para eso añadimos listeners en los eventos que ya dispara el provider.

  /* Usamos el hecho de que onPlay/onPause ya actualizan isPlaying y updatePlayIcons.
     Extendemos con un MutationObserver-free approach: sobrescribir window.updatePlayIcons */
  const _origUpdatePlayIcons = window.updatePlayIcons;
  window.updatePlayIcons = function(playing) {
    if (typeof _origUpdatePlayIcons === 'function') _origUpdatePlayIcons(playing);
    if (!_ytActive) return;
    if (playing) {
      _startSilentAudio();
      _requestWakeLock();
    } else {
      _stopSilentAudio();
      _releaseWakeLock();
    }
  };

  console.info('[DROPLY YT] Integración de YouTube inicializada correctamente ✓');
}
