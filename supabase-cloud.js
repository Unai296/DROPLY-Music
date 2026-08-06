/* ══════════════════════════════════════════════════════
   SUPABASE CLOUD — Auth & Sync Module
   v2 — Sync real a BD (liked, playlists, history)
══════════════════════════════════════════════════════ */
const SupabaseCloud = (() => {
  let supabase = null;
  let user = null;
  let _initialized = false;

  /* Debounce timers por tipo de dato */
  let _syncTimers = {};
  const SYNC_DELAY = 3000; // ms tras el último cambio antes de pushear

  const SUPABASE_URL = 'https://fphbqbmibrtxesjlbydr.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_AUGdgqLUfXEvA7c-E9aL9Q_gHRay8bN';

  /* ─── INIT ─────────────────────────────────────── */
  function init() {
    if (_initialized) return;

    const sdk = window.supabase;
    if (!sdk || typeof sdk.createClient !== 'function') {
      console.warn('[SUPABASE] SDK no encontrado. Reintentando en 500 ms…');
      setTimeout(init, 500);
      return;
    }

    if (!SUPABASE_KEY) {
      console.warn('[SUPABASE] Falta SUPABASE_KEY.');
      if (typeof window.updateSupabaseUI === 'function') window.updateSupabaseUI(null);
      return;
    }

    try {
      supabase = sdk.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: {
          persistSession: true,
          storageKey: 'droply-auth',
          storage: window.localStorage,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          flowType: 'pkce'
        }
      });

      _initialized = true;

      supabase.auth.onAuthStateChange((event, session) => {
        user = session?.user || null;
        console.info('[SUPABASE] Auth event:', event, user?.email ?? 'no user');
        if (typeof window.updateSupabaseUI === 'function') {
          window.updateSupabaseUI(user);
        }
        // Limpiar URL tras OAuth redirect
        if (event === 'SIGNED_IN' && (
          window.location.hash.includes('access_token') ||
          window.location.search.includes('code=')
        )) {
          history.replaceState(null, '', window.location.pathname);
          // Pull desde la nube al hacer login (datos de otros dispositivos)
          setTimeout(pullFromCloud, 1200);
        }
      });

      supabase.auth.getSession().then(({ data: { session }, error }) => {
        if (error) console.warn('[SUPABASE] getSession error:', error.message);
        user = session?.user || null;
        if (typeof window.updateSupabaseUI === 'function') {
          window.updateSupabaseUI(user);
        }
        // Pull inicial si ya había sesión activa
        if (user) setTimeout(pullFromCloud, 1500);
      });

    } catch (e) {
      console.error('[SUPABASE] Error al inicializar:', e);
    }
  }

  /* ─── AUTH ─────────────────────────────────────── */
  async function loginWithGoogle() {
    if (!supabase) {
      if (typeof showToast === 'function') showToast('Supabase no configurado', 'error');
      return;
    }
    const redirectTo = window.location.origin + '/';
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo, queryParams: { prompt: 'select_account' } }
    });
    if (error) {
      console.error('[SUPABASE] OAuth error:', error.message);
      if (typeof showToast === 'function') showToast('Error al conectar con Google', 'error');
    }
  }

  async function logout() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) console.warn('[SUPABASE] Logout error:', error.message);
    user = null;
    if (typeof window.updateSupabaseUI === 'function') window.updateSupabaseUI(null);
  }

  /* ─── SYNC HELPERS ──────────────────────────────── */

  /* Encola un sync con debounce por tipo */
  function schedulSync(type) {
    if (!user || !supabase) return;
    clearTimeout(_syncTimers[type]);
    _syncTimers[type] = setTimeout(() => pushType(type), SYNC_DELAY);
  }

  /* Push selectivo por tipo de dato */
  async function pushType(type) {
    if (!user || !supabase) return;
    try {
      if (type === 'liked')     await pushLiked();
      if (type === 'playlists') await pushPlaylists();
      if (type === 'history')   await pushHistory();
    } catch (e) {
      console.warn(`[SUPABASE] Error sync ${type}:`, e.message);
    }
  }

  /* ─── PUSH: LIKED SONGS ─────────────────────────── */
  async function pushLiked() {
    if (typeof likedTracks === 'undefined') return;
    const uid = user.id;
    const files = [...likedTracks];

    // Obtener los likes actuales en BD para hacer diff
    const { data: existing } = await supabase
      .from('liked_songs')
      .select('track_file')
      .eq('user_id', uid);

    const inDB    = new Set((existing || []).map(r => r.track_file));
    const inLocal = new Set(files);

    // Insertar los que no están en BD
    const toInsert = files.filter(f => !inDB.has(f));
    if (toInsert.length > 0) {
      await supabase.from('liked_songs').insert(
        toInsert.map(f => ({ user_id: uid, track_file: f }))
      );
    }

    // Borrar los que ya no están en local
    const toDelete = [...inDB].filter(f => !inLocal.has(f));
    if (toDelete.length > 0) {
      await supabase.from('liked_songs')
        .delete()
        .eq('user_id', uid)
        .in('track_file', toDelete);
    }

    if (toInsert.length || toDelete.length) {
      console.info(`[SUPABASE] liked_songs sync: +${toInsert.length} -${toDelete.length}`);
    }
  }

  /* ─── PUSH: PLAYLISTS ───────────────────────────── */
  async function pushPlaylists() {
    if (typeof playlists === 'undefined') return;
    const uid = user.id;

    // Obtener IDs existentes en BD
    const { data: existingPL } = await supabase
      .from('playlists')
      .select('id')
      .eq('user_id', uid);

    const inDB    = new Set((existingPL || []).map(r => r.id));
    const inLocal = new Set(playlists.map(p => p.id));

    // Upsert todas las playlists locales
    if (playlists.length > 0) {
      await supabase.from('playlists').upsert(
        playlists.map(p => ({ user_id: uid, id: p.id, name: p.name })),
        { onConflict: 'user_id,id' }
      );
    }

    // Borrar playlists eliminadas localmente
    const toDelete = [...inDB].filter(id => !inLocal.has(id));
    if (toDelete.length > 0) {
      await supabase.from('playlists')
        .delete()
        .eq('user_id', uid)
        .in('id', toDelete);
    }

    // Sync canciones de cada playlist
    for (const pl of playlists) {
      const { data: existingSongs } = await supabase
        .from('playlist_songs')
        .select('track_file')
        .eq('user_id', uid)
        .eq('playlist_id', pl.id);

      const inDBSongs    = new Set((existingSongs || []).map(r => r.track_file));
      const inLocalSongs = new Set(pl.tracks || []);

      const toInsertSongs = (pl.tracks || []).filter(f => !inDBSongs.has(f));
      if (toInsertSongs.length > 0) {
        await supabase.from('playlist_songs').insert(
          toInsertSongs.map((f, i) => ({
            user_id: uid,
            playlist_id: pl.id,
            track_file: f,
            position: (pl.tracks.indexOf(f))
          }))
        );
      }

      const toDeleteSongs = [...inDBSongs].filter(f => !inLocalSongs.has(f));
      if (toDeleteSongs.length > 0) {
        await supabase.from('playlist_songs')
          .delete()
          .eq('user_id', uid)
          .eq('playlist_id', pl.id)
          .in('track_file', toDeleteSongs);
      }
    }

    console.info(`[SUPABASE] playlists sync: ${playlists.length} playlists`);
  }

  /* ─── PUSH: HISTORY + PLAY COUNTS ──────────────── */
  async function pushHistory() {
    if (typeof historyTracks === 'undefined') return;
    const uid = user.id;

    // Upsert historial (primary key: user_id + track_file — la BD guarda el más reciente)
    const rows = historyTracks.slice(0, 100).map(h => ({
      user_id:      uid,
      track_file:   h.file,
      played_at_ms: h.timestamp || Date.now(),
      play_count:   (typeof playCounts !== 'undefined' ? (playCounts[h.file] || 1) : 1)
    }));

    if (rows.length > 0) {
      await supabase.from('history').upsert(rows, { onConflict: 'user_id,track_file' });
      console.info(`[SUPABASE] history sync: ${rows.length} tracks`);
    }
  }

  /* ─── PULL: CARGAR DATOS DE LA NUBE ────────────── */
  async function pullFromCloud() {
    if (!user || !supabase) return;
    const uid = user.id;

    try {
      // Pull liked songs
      const { data: likedData } = await supabase
        .from('liked_songs')
        .select('track_file')
        .eq('user_id', uid);

      if (likedData && likedData.length > 0 && typeof likedTracks !== 'undefined') {
        const cloudLiked = new Set(likedData.map(r => r.track_file));
        // Merge: unión de local + cloud
        cloudLiked.forEach(f => likedTracks.add(f));
        if (typeof saveLiked === 'function') saveLiked();
        console.info(`[SUPABASE] pull liked: ${cloudLiked.size} tracks`);
      }

      // Pull playlists
      const { data: plData } = await supabase
        .from('playlists')
        .select('id, name')
        .eq('user_id', uid)
        .order('created_at', { ascending: true });

      if (plData && plData.length > 0 && typeof playlists !== 'undefined') {
        for (const pl of plData) {
          // Solo añadir las que no existan localmente (no sobreescribir)
          const exists = playlists.find(p => p.id === pl.id);
          if (!exists) {
            // Pull songs de esta playlist
            const { data: songs } = await supabase
              .from('playlist_songs')
              .select('track_file, position')
              .eq('user_id', uid)
              .eq('playlist_id', pl.id)
              .order('position', { ascending: true });

            playlists.push({
              id: pl.id,
              name: pl.name,
              tracks: (songs || []).map(s => s.track_file)
            });
          }
        }
        if (typeof savePlaylists === 'function') savePlaylists();
        if (typeof renderPlaylists === 'function') renderPlaylists();
        console.info(`[SUPABASE] pull playlists: ${plData.length} playlists`);
      }

      // Pull history
      const { data: histData } = await supabase
        .from('history')
        .select('track_file, played_at_ms, play_count')
        .eq('user_id', uid)
        .order('played_at_ms', { ascending: false })
        .limit(100);

      if (histData && histData.length > 0 && typeof historyTracks !== 'undefined') {
        const localFiles = new Set(historyTracks.map(h => h.file));
        histData.forEach(r => {
          if (!localFiles.has(r.track_file)) {
            historyTracks.push({ file: r.track_file, timestamp: r.played_at_ms });
          }
          // Merge play counts
          if (typeof playCounts !== 'undefined') {
            playCounts[r.track_file] = Math.max(
              playCounts[r.track_file] || 0,
              r.play_count || 0
            );
          }
        });
        // Re-sort por timestamp desc
        historyTracks.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        if (typeof saveHistory === 'function') saveHistory();
        if (typeof savePlayCounts === 'function') savePlayCounts();
        console.info(`[SUPABASE] pull history: ${histData.length} tracks`);
      }

      if (typeof showToast === 'function') showToast('Datos sincronizados desde la nube ☁️', 'success');

    } catch (e) {
      console.warn('[SUPABASE] pullFromCloud error:', e.message);
    }
  }

  /* ─── PUBLIC API ────────────────────────────────── */
  return {
    init,
    loginWithGoogle,
    logout,
    getUser:    () => user,
    isReady:    () => _initialized,
    pullFromCloud,

    /* Llamado desde saveLiked(), savePlaylists(), saveHistory(), savePlayCounts() */
    markDirty(type) {
      if (!user || !supabase) return;
      // Detectar qué datos han cambiado según quién llama
      // (las save* functions llaman sin argumento, inferimos por callsite)
      // Para simplificar: push todo con debounce individual
      schedulSync('liked');
      schedulSync('playlists');
      schedulSync('history');
    },

    /* Versión granular — para uso futuro si se quiere optimizar */
    markLikedDirty()     { schedulSync('liked');     },
    markPlaylistsDirty() { schedulSync('playlists'); },
    markHistoryDirty()   { schedulSync('history');   },
  };
})();