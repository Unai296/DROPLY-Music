/* ══════════════════════════════════════════════════════
   SUPABASE CLOUD — Auth & Sync Module
══════════════════════════════════════════════════════ */
const SupabaseCloud = (() => {
  let supabase = null;
  let user = null;

  // Reemplazar con tus credenciales reales si las tienes
  const SUPABASE_URL = 'https://fphbqbmibrtxesjlbydr.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_AUGdgqLUfXEvA7c-E9aL9Q_gHRay8bN';

  function init() {
    // En la v2 de supabase-js cargada vía CDN, el objeto global suele ser 'supabase'
    const sdk = window.supabase;
    if (!sdk) {
      console.warn('[SUPABASE] SDK no encontrado en window.supabase');
      return;
    }

    try {
      supabase = sdk.createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: {
          persistSession: true,
          storageKey: 'droply-auth',
          storage: window.localStorage,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });

      // Procesar sesión desde URL hash tras redirect OAuth (PWA vuelve como web tab)
      if (window.location.hash.includes('access_token') || window.location.search.includes('code=')) {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session) {
            user = session.user;
            if (typeof window.updateSupabaseUI === 'function') {
              window.updateSupabaseUI(user);
            }
            // Limpiar hash/params de la URL sin recargar
            history.replaceState(null, '', window.location.pathname);
          }
        });
      } else {
        checkUser();
      }

      // Escuchar cambios de estado
      supabase.auth.onAuthStateChange((event, session) => {
        user = session?.user || null;
        console.info('[SUPABASE] Auth event:', event, user?.email);
        if (typeof window.updateSupabaseUI === 'function') {
          window.updateSupabaseUI(user);
        }
      });
    } catch (e) {
      console.error('[SUPABASE] Error al inicializar:', e);
    }
  }

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    user = session?.user || null;
    if (typeof window.updateSupabaseUI === 'function') {
      window.updateSupabaseUI(user);
    }
  }

  async function loginWithGoogle() {
    if (!supabase) return;
    // Usar origin + pathname para que el redirect vuelva a la raíz exacta
    // Esto es clave en PWA: el browser tab que abre Google debe volver a la misma URL
    const redirectTo = window.location.origin + '/';
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: {
          prompt: 'select_account'
        }
      }
    });
    if (error) showToast("Error al conectar con Google", "error");
  }

  async function logout() {
    if (!supabase) return;
    await supabase.auth.signOut();
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
    markDirty: () => {
      if (user && typeof CloudSync !== 'undefined') {
        // Aquí iría la lógica para subir datos a Supabase DB
        console.info('[SUPABASE] Sincronizando datos...');
      }
    }
  };
})();