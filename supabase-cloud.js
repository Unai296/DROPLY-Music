
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
      supabase = sdk.createClient(SUPABASE_URL, SUPABASE_KEY);
      checkUser();
      
      // Escuchar cambios de estado
      supabase.auth.onAuthStateChange((event, session) => {
        user = session?.user || null;
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
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
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