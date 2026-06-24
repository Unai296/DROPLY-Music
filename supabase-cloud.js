/* ══════════════════════════════════════════════════════
   SUPABASE CLOUD — Auth & Sync Module
══════════════════════════════════════════════════════ */
const SupabaseCloud = (() => {
  let supabase = null;
  let user = null;
  let _initialized = false;

  const SUPABASE_URL = 'https://fphbqbmibrtxesjlbydr.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_AUGdgqLUfXEvA7c-E9aL9Q_gHRay8bN';

  function init() {
    if (_initialized) return;

    const sdk = window.supabase;
    if (!sdk || typeof sdk.createClient !== 'function') {
      console.warn('[SUPABASE] SDK no encontrado. Reintentando en 500 ms…');
      setTimeout(init, 500);
      return;
    }

    // Validación mínima: solo rechazar si está vacía
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

      // Escuchar cambios de auth PRIMERO
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
        }
      });

      // Recuperar sesión existente
      supabase.auth.getSession().then(({ data: { session }, error }) => {
        if (error) console.warn('[SUPABASE] getSession error:', error.message);
        user = session?.user || null;
        if (typeof window.updateSupabaseUI === 'function') {
          window.updateSupabaseUI(user);
        }
      });

    } catch (e) {
      console.error('[SUPABASE] Error al inicializar:', e);
    }
  }

  async function loginWithGoogle() {
    if (!supabase) {
      console.warn('[SUPABASE] No inicializado.');
      if (typeof showToast === 'function') showToast('Supabase no configurado', 'error');
      return;
    }
    const redirectTo = window.location.origin + '/';
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: { prompt: 'select_account' }
      }
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
    if (typeof window.updateSupabaseUI === 'function') {
      window.updateSupabaseUI(null);
    }
  }

  return {
    init,
    loginWithGoogle,
    logout,
    getUser: () => user,
    isReady: () => _initialized,
    markDirty: () => {
      if (user && typeof CloudSync !== 'undefined') {
        console.info('[SUPABASE] Sincronizando datos…');
      }
    }
  };
})();