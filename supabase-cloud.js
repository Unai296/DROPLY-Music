/* ══════════════════════════════════════════════════════
   DROPLY — supabase-cloud.js
   Backend en la nube (Supabase): autenticación + sincronización
   de playlists, Likes e historial.

   DISEÑO: 100% aditivo y con fallback total.
   - Si no hay variables de entorno configuradas, si /api/config
     falla, si el SDK no carga, o si el usuario no ha iniciado
     sesión, este módulo no hace nada y la app sigue funcionando
     exactamente igual que antes, basada en localStorage.
   - Nunca bloquea ni sustituye la ruta local: localStorage sigue
     siendo la fuente de verdad inmediata; este módulo solo añade
     una copia en la nube por encima, igual que CloudSync añade
     una copia "entre pestañas" por encima de la persistencia local.
   - Se engancha al mismo patrón ya usado por CloudSync / OfflineManager
     en script.js (módulo IIFE + init() llamado desde bootPremium()).
══════════════════════════════════════════════════════ */
const SupabaseCloud = (() => {

  let sb          = null;   // cliente Supabase (null si no disponible)
  let ready        = false; // true cuando el cliente está listo para usarse
  let currentUser  = null;  // usuario de la sesión actual, o null
  let dirtyTimer   = null;
  let pushing      = false;

  /* ── Acceso seguro al estado global de la app (definido en script.js) ── */
  function getPlaylists()  { return typeof playlists     !== "undefined" ? playlists     : []; }
  function getLiked()      { return typeof likedTracks   !== "undefined" ? likedTracks   : new Set(); }
  function getHistory()    { return typeof historyTracks !== "undefined" ? historyTracks : []; }
  function getPlayCounts() { return typeof playCounts    !== "undefined" ? playCounts    : {}; }
  function toast(msg, type) { if (typeof showToast === "function") showToast(msg, type); }

  /* ══════════════════════════════════════════════════════
     1. INICIALIZACIÓN DEL CLIENTE
  ══════════════════════════════════════════════════════ */
  async function loadConfig() {
    try {
      const res = await fetch("/api/config", { cache: "no-store" });
      if (!res.ok) throw new Error("http " + res.status);
      const cfg = await res.json();
      if (!cfg?.supabaseUrl || !cfg?.supabaseAnonKey) throw new Error("config incompleta");
      return cfg;
    } catch (e) {
      console.warn("[DROPLY Cloud] Configuración no disponible — sincronización en la nube desactivada.", e);
      return null;
    }
  }

  async function initClient() {
    if (typeof window.supabase === "undefined" || typeof window.supabase.createClient !== "function") {
      console.warn("[DROPLY Cloud] SDK de Supabase no cargado — sincronización en la nube desactivada.");
      return false;
    }
    const cfg = await loadConfig();
    if (!cfg) return false;
    try {
      sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      });
      ready = true;
      return true;
    } catch (e) {
      console.warn("[DROPLY Cloud] Error creando el cliente de Supabase.", e);
      sb = null;
      ready = false;
      return false;
    }
  }

  function watchAuthState() {
    sb.auth.onAuthStateChange((_event, session) => {
      const newUser   = session?.user || null;
      const isNewLogin = !!newUser && (!currentUser || currentUser.id !== newUser.id);
      const wasLoggedIn = !!currentUser && !newUser;
      currentUser = newUser;
      updateAccountButton();
      if (isNewLogin) pullAndMerge();
      if (wasLoggedIn) toast("Sesión cerrada", "default");
    });
  }

  /* ══════════════════════════════════════════════════════
     2. PUSH — local → nube (debounced, solo si hay sesión)
  ══════════════════════════════════════════════════════ */
  function markDirty() {
    if (!ready || !currentUser) return; // sin sesión: nada que subir, comportamiento intacto
    clearTimeout(dirtyTimer);
    dirtyTimer = setTimeout(() => { pushAll(); }, 2000);
  }

  async function pushAll() {
    if (!ready || !sb || !currentUser || pushing) return;
    pushing = true;
    try {
      await pushPlaylists();
      await pushLiked();
      await pushHistory();
    } catch (e) {
      // Nunca propagamos el error hacia la UI: la copia local sigue intacta
      // y se reintentará en el siguiente cambio.
      console.warn("[DROPLY Cloud] Error sincronizando con la nube (datos locales intactos).", e);
    } finally {
      pushing = false;
    }
  }

  async function pushPlaylists() {
    const uid = currentUser.id;
    const local = getPlaylists();
    // Reemplazo completo: borra las playlists de este usuario en la nube
    // (el ON DELETE CASCADE se lleva también playlist_songs) y vuelve a
    // subir el estado local actual. Sencillo y robusto a esta escala.
    const { error: delErr } = await sb.from("playlists").delete().eq("user_id", uid);
    if (delErr) throw delErr;
    if (!local.length) return;

    const plRows = local.map(p => ({ user_id: uid, id: String(p.id), name: p.name }));
    const { error: plErr } = await sb.from("playlists").insert(plRows);
    if (plErr) throw plErr;

    const songRows = [];
    local.forEach(p => {
      (p.tracks || []).forEach((file, idx) => {
        songRows.push({ user_id: uid, playlist_id: String(p.id), track_file: file, position: idx });
      });
    });
    if (songRows.length) {
      const { error: songErr } = await sb.from("playlist_songs").insert(songRows);
      if (songErr) throw songErr;
    }
  }

  async function pushLiked() {
    const uid = currentUser.id;
    const { error: delErr } = await sb.from("liked_songs").delete().eq("user_id", uid);
    if (delErr) throw delErr;
    const files = [...getLiked()];
    if (!files.length) return;
    const rows = files.map(f => ({ user_id: uid, track_file: f }));
    const { error } = await sb.from("liked_songs").insert(rows);
    if (error) throw error;
  }

  async function pushHistory() {
    const uid = currentUser.id;
    const { error: delErr } = await sb.from("history").delete().eq("user_id", uid);
    if (delErr) throw delErr;
    const hist   = getHistory();
    const counts = getPlayCounts();
    if (!hist.length) return;
    const rows = hist.map(h => ({
      user_id:      uid,
      track_file:   h.file,
      played_at_ms: h.timestamp,
      play_count:   counts[h.file] || 1,
    }));
    const { error } = await sb.from("history").insert(rows);
    if (error) throw error;
  }

  /* ══════════════════════════════════════════════════════
     3. PULL + MERGE — nube → local (al iniciar sesión)
     Estrategia: unión sin pérdida. Nunca se borra nada local;
     solo se añade lo que falte y se actualiza el historial con
     el dato más reciente. Al final se sube el resultado fusionado
     para que la nube quede igualada en ambos sentidos.
  ══════════════════════════════════════════════════════ */
  async function pullAndMerge() {
    if (!ready || !sb || !currentUser) return;
    try {
      const uid = currentUser.id;
      const [plRes, songsRes, likedRes, histRes] = await Promise.all([
        sb.from("playlists").select("id,name").eq("user_id", uid),
        sb.from("playlist_songs").select("playlist_id,track_file,position").eq("user_id", uid).order("position"),
        sb.from("liked_songs").select("track_file").eq("user_id", uid),
        sb.from("history").select("track_file,played_at_ms,play_count").eq("user_id", uid),
      ]);

      // -- Playlists: añade las de la nube que no existan ya localmente --
      if (!plRes.error && Array.isArray(plRes.data)) {
        const localPl  = getPlaylists();
        const localIds = new Set(localPl.map(p => String(p.id)));
        const songsByPl = {};
        (songsRes.data || []).forEach(s => {
          (songsByPl[s.playlist_id] = songsByPl[s.playlist_id] || []).push(s.track_file);
        });
        let added = false;
        plRes.data.forEach(p => {
          if (!localIds.has(String(p.id))) {
            localPl.push({ id: String(p.id), name: p.name, tracks: songsByPl[p.id] || [] });
            added = true;
          }
        });
        if (added) {
          if (typeof savePlaylists === "function") savePlaylists();
          if (typeof renderPlaylists === "function") renderPlaylists();
        }
      }

      // -- Likes: unión local ∪ nube --
      if (!likedRes.error && Array.isArray(likedRes.data)) {
        const localLiked = getLiked();
        let added = false;
        likedRes.data.forEach(r => {
          if (!localLiked.has(r.track_file)) { localLiked.add(r.track_file); added = true; }
        });
        if (added) {
          if (typeof saveLiked === "function") saveLiked();
          if (typeof renderFavoritos === "function" &&
              document.getElementById("pageFavoritos")?.classList.contains("active")) {
            renderFavoritos();
          }
        }
      }

      // -- Historial: combina por pista, conserva el timestamp más reciente
      //    y el play_count más alto entre local y nube --
      if (!histRes.error && Array.isArray(histRes.data) && histRes.data.length) {
        const localHist   = getHistory();
        const localCounts = getPlayCounts();
        const byFile = new Map(localHist.map(h => [h.file, h]));
        histRes.data.forEach(r => {
          const existing = byFile.get(r.track_file);
          if (!existing || r.played_at_ms > existing.timestamp) {
            byFile.set(r.track_file, { file: r.track_file, timestamp: r.played_at_ms });
          }
          localCounts[r.track_file] = Math.max(localCounts[r.track_file] || 0, r.play_count || 0);
        });
        const merged = [...byFile.values()].sort((a, b) => b.timestamp - a.timestamp).slice(0, 100);
        localHist.length = 0;
        localHist.push(...merged);
        if (typeof saveHistory === "function") saveHistory();
        if (typeof savePlayCounts === "function") savePlayCounts();
      }

      // Iguala la nube con el resultado fusionado (sube lo que faltara subir)
      await pushAll();
      toast("Tu cuenta está sincronizada", "success");
    } catch (e) {
      console.warn("[DROPLY Cloud] Error fusionando datos de la nube (datos locales intactos).", e);
    }
  }

  /* ══════════════════════════════════════════════════════
     4. AUTENTICACIÓN
  ══════════════════════════════════════════════════════ */
  async function signUp(email, password) {
    if (!ready) return { error: { message: "Sincronización en la nube no disponible" } };
    return sb.auth.signUp({ email, password });
  }
  async function signIn(email, password) {
    if (!ready) return { error: { message: "Sincronización en la nube no disponible" } };
    return sb.auth.signInWithPassword({ email, password });
  }
  async function signInMagicLink(email) {
    if (!ready) return { error: { message: "Sincronización en la nube no disponible" } };
    return sb.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } });
  }
  async function signOut() {
    if (!ready) return;
    try { await sb.auth.signOut(); } catch (_) {}
  }

  /* ══════════════════════════════════════════════════════
     5. UI — botón de cuenta + modal de acceso
     Reutiliza por completo clases ya existentes en style.css
     (modal-overlay, modal-card, btn-hero, topbar-icon-btn,
     playlist-name-input…) — no se añade CSS nuevo.
  ══════════════════════════════════════════════════════ */
  function injectAuthUI() {
    const topbarActions = document.querySelector(".topbar-actions");
    if (topbarActions && !document.getElementById("cloudAccountBtn")) {
      topbarActions.insertAdjacentHTML("beforeend", `
        <button class="topbar-icon-btn" id="cloudAccountBtn" aria-label="Cuenta">
          <svg viewBox="0 0 24 24" width="20" height="20"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </button>`);
    }

    if (!document.getElementById("cloudAuthModal")) {
      document.body.insertAdjacentHTML("beforeend", `
        <div class="modal-overlay" id="cloudAuthModal">
          <div class="modal-card" style="max-width:380px">
            <button class="modal-close" id="cloudAuthClose" aria-label="Cerrar">✕</button>
            <div class="modal-inner" id="cloudAuthInner"></div>
          </div>
        </div>`);
      document.getElementById("cloudAuthClose")?.addEventListener("click", closeAuthModal);
      document.getElementById("cloudAuthModal")?.addEventListener("click", e => {
        if (e.target.id === "cloudAuthModal") closeAuthModal();
      });
    }

    document.getElementById("cloudAccountBtn")?.addEventListener("click", () => {
      currentUser ? renderAccountPanel() : renderAuthForm("signin");
      openAuthModal();
    });
  }

  function openAuthModal()  { document.getElementById("cloudAuthModal")?.classList.add("open"); }
  function closeAuthModal() { document.getElementById("cloudAuthModal")?.classList.remove("open"); }

  function updateAccountButton() {
    const btn = document.getElementById("cloudAccountBtn");
    if (!btn) return;
    btn.style.color = currentUser ? "var(--accent)" : "";
    btn.title = currentUser ? (currentUser.email || "Cuenta") : "Iniciar sesión";
  }

  function renderAuthForm(mode) {
    const inner = document.getElementById("cloudAuthInner");
    if (!inner) return;

    if (!ready) {
      inner.innerHTML = `
        <h3 class="modal-title" style="margin-bottom:.8rem">Sincronización en la nube</h3>
        <p style="color:var(--text-mid);font-size:.85rem;line-height:1.55">
          No está disponible en este momento. DROPLY sigue funcionando con normalidad usando los datos guardados en este dispositivo.
        </p>`;
      return;
    }

    const titles = { signin: "Iniciar sesión", signup: "Crear cuenta", magic: "Enlace mágico" };
    const cta    = { signin: "Entrar", signup: "Registrarme", magic: "Enviar enlace" };

    inner.innerHTML = `
      <h3 class="modal-title" style="margin-bottom:1rem">${titles[mode]}</h3>
      <input type="email" id="cloudAuthEmail" placeholder="Correo electrónico" class="playlist-name-input" style="margin-bottom:.6rem" autocomplete="email" />
      ${mode !== "magic" ? `<input type="password" id="cloudAuthPass" placeholder="Contraseña" class="playlist-name-input" style="margin-bottom:.6rem" autocomplete="${mode === "signup" ? "new-password" : "current-password"}" />` : ""}
      <button class="btn-hero" id="cloudAuthSubmit" style="width:100%;justify-content:center;margin-top:.4rem">${cta[mode]}</button>
      <div style="display:flex;justify-content:space-between;margin-top:1.1rem;font-size:.78rem">
        ${mode === "signin"
          ? `<a href="#" id="cloudAuthGoSignup" style="color:var(--accent)">Crear cuenta</a>`
          : `<a href="#" id="cloudAuthGoSignin" style="color:var(--accent)">Ya tengo cuenta</a>`}
        ${mode === "magic"
          ? `<a href="#" id="cloudAuthGoSignin" style="color:var(--accent)">Volver</a>`
          : `<a href="#" id="cloudAuthGoMagic" style="color:var(--accent)">Enlace mágico</a>`}
      </div>`;

    document.getElementById("cloudAuthGoSignin")?.addEventListener("click", e => { e.preventDefault(); renderAuthForm("signin"); });
    document.getElementById("cloudAuthGoSignup")?.addEventListener("click", e => { e.preventDefault(); renderAuthForm("signup"); });
    document.getElementById("cloudAuthGoMagic")?.addEventListener("click",  e => { e.preventDefault(); renderAuthForm("magic");  });

    document.getElementById("cloudAuthSubmit")?.addEventListener("click", async () => {
      const email = (document.getElementById("cloudAuthEmail")?.value || "").trim();
      const pass  = document.getElementById("cloudAuthPass")?.value || "";
      if (!email) { toast("Introduce un correo válido", "error"); return; }
      if (mode !== "magic" && !pass) { toast("Introduce una contraseña", "error"); return; }

      try {
        if (mode === "signin") {
          const { error } = await signIn(email, pass);
          if (error) throw error;
          closeAuthModal();
        } else if (mode === "signup") {
          const { data, error } = await signUp(email, pass);
          if (error) throw error;
          if (!data?.session) {
            toast("Revisa tu correo para confirmar la cuenta", "success");
            renderAuthForm("signin");
          } else {
            closeAuthModal();
          }
        } else {
          const { error } = await signInMagicLink(email);
          if (error) throw error;
          toast("Te hemos enviado un enlace de acceso por correo", "success");
        }
      } catch (e) {
        toast(e?.message || "Error de autenticación", "error");
      }
    });
  }

  function renderAccountPanel() {
    const inner = document.getElementById("cloudAuthInner");
    if (!inner || !currentUser) return;
    inner.innerHTML = `
      <h3 class="modal-title" style="margin-bottom:.4rem">Tu cuenta</h3>
      <p style="color:var(--text-mid);font-size:.85rem;margin-bottom:1.3rem;word-break:break-all">${currentUser.email || ""}</p>
      <button class="btn-create-playlist" id="cloudAuthSignout" style="width:100%;justify-content:center">Cerrar sesión</button>`;
    document.getElementById("cloudAuthSignout")?.addEventListener("click", async () => {
      await signOut();
      closeAuthModal();
    });
  }

  /* ══════════════════════════════════════════════════════
     6. INIT — llamado desde bootPremium() en script.js
  ══════════════════════════════════════════════════════ */
  return {
    async init() {
      injectAuthUI();
      const ok = await initClient();
      updateAccountButton();
      if (!ok) return; // app sigue 100% funcional en modo solo-local
      try {
        watchAuthState();
      } catch (e) {
        console.warn("[DROPLY Cloud] Error inicializando autenticación.", e);
      }
    },
    markDirty,
    signUp,
    signIn,
    signInMagicLink,
    signOut,
    isAuthenticated: () => !!currentUser,
    getUser: () => currentUser,
  };
})();