/* ═══════════════════════════════════════════════════════════
   DROPLY — youtube-provider.js
   Adaptador del YouTube IFrame Player API
   Responsabilidades:
     · searchSongs(query)
     · play(videoId) · pause() · resume() · stop()
     · seek(seconds) · getCurrentTime() · getDuration()
     · Integración con los controles existentes de Droply
═══════════════════════════════════════════════════════════ */

'use strict';

const YouTubeProvider = (() => {

  /* ── Estado interno ────────────────────────────────────── */
  let _player       = null;     // instancia de YT.Player
  let _ready        = false;    // player inicializado
  let _loading      = false;    // cargando API
  let _apiLoaded    = false;    // IFrame API cargada
  let _currentVideoId = null;
  let _isPlaying    = false;
  let _progressRaf  = null;

  /* ── Callbacks hacia Droply ────────────────────────────── */
  let _onPlay    = null;
  let _onPause   = null;
  let _onEnded   = null;
  let _onProgress = null;  // (currentTime, duration)
  let _onError   = null;

  /* ── Contenedor del player ─────────────────────────────── */
  const CONTAINER_ID = 'ytPlayerContainer';
  const PLAYER_ID    = 'ytPlayer';

  function _ensureContainer() {
    if (document.getElementById(CONTAINER_ID)) return;

    const container = document.createElement('div');
    container.id    = CONTAINER_ID;
    container.setAttribute('aria-hidden', 'true');
    container.style.cssText = [
      'position:fixed',
      'left:-9999px',
      'top:-9999px',
      'width:360px',
      'height:203px',
      'overflow:hidden',
      'opacity:0',
      'pointer-events:none',
      'z-index:-1'
    ].join(';');

    const playerDiv = document.createElement('div');
    playerDiv.id = PLAYER_ID;
    container.appendChild(playerDiv);
    document.body.appendChild(container);
  }

  /* ── Cargar YouTube IFrame API ─────────────────────────── */
  function _loadAPI() {
    return new Promise((resolve, reject) => {
      if (_apiLoaded) { resolve(); return; }
      if (_loading) {
        // Ya está cargando, esperar a que termine
        const check = setInterval(() => {
          if (_apiLoaded) { clearInterval(check); resolve(); }
        }, 100);
        return;
      }

      _loading = true;

      // Callback global que llama YouTube cuando la API está lista
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        _apiLoaded = true;
        _loading   = false;
        if (prevCallback) prevCallback();
        resolve();
      };

      const script = document.createElement('script');
      script.src   = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.onerror = () => {
        _loading = false;
        reject(new Error('YOUTUBE_IFRAME_API_LOAD_FAILED'));
      };
      document.head.appendChild(script);
    });
  }

  /* ── Crear instancia del player ────────────────────────── */
  function _createPlayer(videoId, startSec) {
    return new Promise((resolve, reject) => {
      _ensureContainer();

      // Si ya existe un player, destruirlo
      if (_player) {
        try { _player.destroy(); } catch (_) {}
        _player = null;
        _ready  = false;
      }

      // Recrear el div que YouTube reemplaza
      const old = document.getElementById(PLAYER_ID);
      if (old) old.remove();
      const newDiv = document.createElement('div');
      newDiv.id = PLAYER_ID;
      document.getElementById(CONTAINER_ID).appendChild(newDiv);

      _player = new YT.Player(PLAYER_ID, {
        height:  '203',
        width:   '360',
        videoId: videoId,
        playerVars: {
          autoplay:       1,
          controls:       0,
          disablekb:      1,
          enablejsapi:    1,
          fs:             0,
          iv_load_policy: 3,   // sin anotaciones
          modestbranding: 1,
          rel:            0,
          showinfo:       0,
          start:          Math.floor(startSec || 0),
          playsinline:    1,   // iOS: sin pantalla completa
          origin:         window.location.origin
        },
        events: {
          onReady: e => {
            _ready = true;
            try { e.target.playVideo(); } catch (_) {}
            resolve(e);
          },
          onStateChange: _onStateChange,
          onError:       _onYTError
        }
      });
    });
  }

  /* ── Manejador de estados del player ──────────────────── */
  function _onStateChange(event) {
    const state = event.data;

    switch (state) {
      case YT.PlayerState.PLAYING:
        _isPlaying = true;
        _startProgressLoop();
        if (_onPlay) _onPlay();
        break;

      case YT.PlayerState.PAUSED:
        _isPlaying = false;
        _stopProgressLoop();
        if (_onPause) _onPause();
        break;

      case YT.PlayerState.ENDED:
        _isPlaying = false;
        _stopProgressLoop();
        if (_onEnded) _onEnded();
        break;

      case YT.PlayerState.BUFFERING:
        // No hacer nada especial
        break;

      case YT.PlayerState.UNSTARTED:
      case YT.PlayerState.CUED:
        _isPlaying = false;
        _stopProgressLoop();
        break;
    }
  }

  /* ── Manejador de errores del player ──────────────────── */
  function _onYTError(event) {
    const errCodes = {
      2:   'YOUTUBE_INVALID_PARAM',
      5:   'YOUTUBE_HTML5_ERROR',
      100: 'YOUTUBE_VIDEO_NOT_FOUND',
      101: 'YOUTUBE_EMBED_NOT_ALLOWED',
      150: 'YOUTUBE_EMBED_NOT_ALLOWED'
    };
    const code = errCodes[event.data] || `YOUTUBE_ERROR_${event.data}`;
    console.warn('[DROPLY YT] Player error:', code);
    if (_onError) _onError(code);
  }

  /* ── Loop de progreso vía RAF ──────────────────────────── */
  function _startProgressLoop() {
    _stopProgressLoop();
    function loop() {
      if (!_isPlaying || !_player || !_ready) return;
      try {
        const cur = _player.getCurrentTime?.() || 0;
        const dur = _player.getDuration?.()    || 0;
        if (_onProgress && dur > 0) _onProgress(cur, dur);
      } catch (_) {}
      _progressRaf = requestAnimationFrame(loop);
    }
    _progressRaf = requestAnimationFrame(loop);
  }

  function _stopProgressLoop() {
    if (_progressRaf) { cancelAnimationFrame(_progressRaf); _progressRaf = null; }
  }

  /* ════════════════════════════════════════════════════════
     API PÚBLICA
  ════════════════════════════════════════════════════════ */

  /* ── Inicializar (llama una sola vez) ─────────────────── */
  async function init(callbacks = {}) {
    _onPlay     = callbacks.onPlay     || null;
    _onPause    = callbacks.onPause    || null;
    _onEnded    = callbacks.onEnded    || null;
    _onProgress = callbacks.onProgress || null;
    _onError    = callbacks.onError    || null;

    _ensureContainer();

    try {
      await _loadAPI();
    } catch (err) {
      console.warn('[DROPLY YT] No se pudo cargar la IFrame API:', err);
    }
  }

  /* ── Buscar canciones ─────────────────────────────────── */
  async function searchSongs(query) {
    return YouTubeAPI.search(query);
  }

  /* ── Reproducir por videoId ───────────────────────────── */
  async function play(videoId, startSec = 0) {
    try {
      await _loadAPI();

      if (_player && _ready && _currentVideoId !== videoId) {
        // Player existe → cargar nuevo video
        _currentVideoId = videoId;
        _player.loadVideoById({ videoId, startSeconds: startSec });
      } else if (_player && _ready && _currentVideoId === videoId) {
        // Mismo video → reanudar
        _player.playVideo();
      } else {
        // Crear player nuevo
        _currentVideoId = videoId;
        await _createPlayer(videoId, startSec);
      }
    } catch (err) {
      console.warn('[DROPLY YT] play error:', err);
      if (_onError) _onError(err.message || 'YOUTUBE_PLAY_ERROR');
    }
  }

  /* ── Pausar ──────────────────────────────────────────── */
  function pause() {
    if (!_player || !_ready) return;
    try { _player.pauseVideo(); } catch (_) {}
  }

  /* ── Reanudar ────────────────────────────────────────── */
  function resume() {
    if (!_player || !_ready) return;
    try { _player.playVideo(); } catch (_) {}
  }

  /* ── Detener y limpiar ────────────────────────────────── */
  function stop() {
    _stopProgressLoop();
    _isPlaying = false;
    _currentVideoId = null;
    if (!_player || !_ready) return;
    try { _player.stopVideo(); } catch (_) {}
  }

  /* ── Seek a posición (segundos) ──────────────────────── */
  function seek(seconds) {
    if (!_player || !_ready) return;
    try { _player.seekTo(seconds, true); } catch (_) {}
  }

  /* ── Obtener tiempo actual ────────────────────────────── */
  function getCurrentTime() {
    if (!_player || !_ready) return 0;
    try { return _player.getCurrentTime() || 0; } catch (_) { return 0; }
  }

  /* ── Obtener duración total ───────────────────────────── */
  function getDuration() {
    if (!_player || !_ready) return 0;
    try { return _player.getDuration() || 0; } catch (_) { return 0; }
  }

  /* ── ¿Está reproduciendo? ─────────────────────────────── */
  function isPlaying() {
    return _isPlaying;
  }

  /* ── Extraer videoId de un track objeto de Droply ─────── */
  function getVideoId(track) {
    if (!track) return null;
    if (track.videoId) return track.videoId;
    if (track.file && track.file.startsWith('yt::')) return track.file.slice(4);
    return null;
  }

  /* ── ¿Es un track de YouTube? ─────────────────────────── */
  function isYouTubeTrack(track) {
    if (!track) return false;
    return track.source === 'youtube' ||
           track.type   === 'youtube' ||
           (typeof track.file === 'string' && track.file.startsWith('yt::'));
  }

  return {
    init,
    searchSongs,
    play,
    pause,
    resume,
    stop,
    seek,
    getCurrentTime,
    getDuration,
    isPlaying,
    getVideoId,
    isYouTubeTrack
  };

})();

window.YouTubeProvider = YouTubeProvider;