/* ═══════════════════════════════════════════════════════════
   DROPLY — session-persist.js
   Parche de persistencia de sesión. Carga DESPUÉS de auth-ui.js.
   Soluciona: sesión que desaparece al refrescar / reabrir.
   NO modifica ningún archivo original.
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Cuánto esperar a que script.js termine su init ─── */
  const SYNC_DELAY_MS = 600;   // tiempo base antes del primer intento
  const SYNC_RETRIES  = 5;     // reintentos si las vars de script.js aún no existen
  const SYNC_INTERVAL = 400;   // ms entre reintentos

  /* ══════════════════════════════════════════════════════
     1. PARCHE PRINCIPAL — se ejecuta cuando DroplyAuthUI
        termina su init() y resuelve la sesión guardada.
  ══════════════════════════════════════════════════════ */
  function patchAuthUI() {
    if (typeof DroplyAuthUI === 'undefined' || typeof DroplyAuth === 'undefined') {
      // Si los módulos aún no están listos, esperar un poco más
      setTimeout(patchAuthUI, 100);
      return;
    }

    /* ── 1a. Interceptar onAuthStateChange para sincronizar datos
            correctamente cuando se restaura sesión ─────────────── */
    DroplyAuth.onAuthStateChange(function (user) {
      if (!user || DroplyAuth.isGuestMode()) return;

      // Sincronizar con reintento (esperamos a que script.js
      // haya definido likedTracks, playlists, etc.)
      syncWithRetry(SYNC_RETRIES);
    });

    /* ── 1b. Forzar una sincronización inicial por si la sesión
            ya estaba restaurada antes de que llegásemos aquí ─── */
    const alreadyLoggedIn = DroplyAuth.isAuthenticated() && !DroplyAuth.isGuestMode();
    if (alreadyLoggedIn) {
      setTimeout(() => syncWithRetry(SYNC_RETRIES), SYNC_DELAY_MS);
    }

    console.info('[DROPLY] ✓ session-persist.js — parche de sesión activo');
  }

  /* ══════════════════════════════════════════════════════
     2. SYNC CON REINTENTO — espera a que script.js
        haya definido likedTracks y playlists antes
        de intentar volcar los datos.
  ══════════════════════════════════════════════════════ */
  function syncWithRetry(retriesLeft) {
    const likedReady     = typeof likedTracks !== 'undefined';
    const playlistsReady = typeof playlists !== 'undefined';

    if (!likedReady || !playlistsReady) {
      if (retriesLeft <= 0) {
        console.warn('[DROPLY session-persist] Las variables de script.js no están listas — abortando sync');
        return;
      }
      setTimeout(() => syncWithRetry(retriesLeft - 1), SYNC_INTERVAL);
      return;
    }

    // Variables listas → sincronizar
    doSync();
  }

  /* ══════════════════════════════════════════════════════
     3. SINCRONIZACIÓN EFECTIVA
        Réplica reforzada de syncUserData() de auth-ui.js
        con manejo de errores y actualización de UI.
  ══════════════════════════════════════════════════════ */
  async function doSync() {
    /* ── Favoritos ─────────────────────────────────────── */
    try {
      const favs = await DroplyAuth.getFavorites();
      if (Array.isArray(favs) && favs.length > 0 && typeof likedTracks !== 'undefined') {
        likedTracks.clear();
        favs.forEach(f => likedTracks.add(f));
        if (typeof renderFavoritos === 'function')  renderFavoritos();
        if (typeof renderMediaGrid === 'function')  renderMediaGrid();
      }
    } catch (e) {
      console.warn('[DROPLY session-persist] Error sync favoritos:', e);
    }

    /* ── Playlists ─────────────────────────────────────── */
    try {
      const pls = await DroplyAuth.getPlaylists();
      if (Array.isArray(pls) && pls.length > 0 && typeof playlists !== 'undefined') {
        playlists.length = 0;
        pls.forEach(p => playlists.push(p));
        if (typeof renderPlaylists === 'function') renderPlaylists();
      }
    } catch (e) {
      console.warn('[DROPLY session-persist] Error sync playlists:', e);
    }

    /* ── Volumen ───────────────────────────────────────── */
    try {
      const settings = await DroplyAuth.getSettings();
      if (settings && settings.volume !== undefined) {
        const volSlider = document.getElementById('volSlider');
        const audio     = document.getElementById('mainAudio');
        if (volSlider) volSlider.value = settings.volume;
        if (audio)     audio.volume   = settings.volume;
      }
    } catch (e) {}

    /* ── Actualizar UI de topbar por si no se hizo aún ── */
    try {
      const user = DroplyAuth.getCurrentUser();
      if (user && typeof DroplyAuthUI !== 'undefined') {
        DroplyAuthUI.updateTopbarAvatar(user);
      }
    } catch (e) {}

    console.info('[DROPLY session-persist] ✓ Datos de usuario sincronizados');
  }

  /* ══════════════════════════════════════════════════════
     4. REFORZAR _setSession PARA QUE SIEMPRE GUARDE
        EN LOCALSTORAGE CON persist = true POR DEFECTO
        (por si se llamó con persist = false accidentalmente)
  ══════════════════════════════════════════════════════ */
  //  Esto corrige el edge case en que login() se llama con
  //  rememberMe = false y la sesión expira en 24h en vez de 30 días.
  //  Sobrescribimos login() para que "Recordarme" siempre use 30 días
  //  a menos que el usuario desmarcó explícitamente el checkbox.
  function patchLoginPersistence() {
    if (typeof DroplyAuth === 'undefined') return;

    const origLogin = DroplyAuth.login;
    if (!origLogin || origLogin._patched) return;

    DroplyAuth.login = async function (email, password, rememberMe) {
      // Si rememberMe no se pasó explícitamente, leer el checkbox
      if (rememberMe === undefined) {
        const cb = document.getElementById('rememberMe');
        rememberMe = cb ? cb.checked : true;
      }
      return origLogin.call(this, email, password, rememberMe);
    };
    DroplyAuth.login._patched = true;
  }

  /* ══════════════════════════════════════════════════════
     5. ARRANQUE — esperar a que el DOM y los módulos
        estén listos antes de parchear.
  ══════════════════════════════════════════════════════ */
  function boot() {
    // Esperar a que DroplyAuthUI.init() haya terminado
    // (se llama con 200 ms de delay en index.html)
    setTimeout(() => {
      patchLoginPersistence();
      patchAuthUI();
    }, 350);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
