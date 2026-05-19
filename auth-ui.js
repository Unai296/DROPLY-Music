/* ═══════════════════════════════════════════════════════════════════
   DROPLY AUTH UI — auth-ui.js
   Beautiful premium authentication interface
   Glassmorphism · Smooth animations · Mobile-first
═══════════════════════════════════════════════════════════════════ */

window.DroplyAuthUI = (function() {
  'use strict';

  /* ── State ─────────────────────────────────────────── */
  let activeModal = null;

  /* ══════════════════════════════════════════════════════
     INJECT AUTH MODAL HTML
  ══════════════════════════════════════════════════════ */
  function injectAuthHTML() {
    const html = `
    <!-- AUTH OVERLAY -->
    <div class="auth-overlay" id="authOverlay">
      <div class="auth-modal" id="authModal">
        <!-- Brand -->
        <div class="auth-brand">
          <span class="auth-logo">DROPLY</span>
          <span class="auth-tagline">Tu música, en todas partes</span>
        </div>

        <!-- TAB SWITCHER -->
        <div class="auth-tabs" id="authTabs">
          <button class="auth-tab active" data-tab="login">Iniciar sesión</button>
          <button class="auth-tab" data-tab="register">Crear cuenta</button>
        </div>

        <!-- LOGIN FORM -->
        <div class="auth-form-wrap" id="formLogin">
          <div class="auth-field">
            <label class="auth-label">Email</label>
            <div class="auth-input-wrap">
              <svg class="auth-input-icon" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <input type="email" id="loginEmail" class="auth-input" placeholder="tu@email.com" autocomplete="email" />
            </div>
          </div>
          <div class="auth-field">
            <label class="auth-label">Contraseña</label>
            <div class="auth-input-wrap">
              <svg class="auth-input-icon" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input type="password" id="loginPassword" class="auth-input" placeholder="••••••••" autocomplete="current-password" />
              <button class="auth-toggle-pw" id="toggleLoginPw" type="button" aria-label="Mostrar contraseña">
                <svg viewBox="0 0 24 24" class="icon-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>
          <div class="auth-row">
            <label class="auth-check-wrap">
              <input type="checkbox" id="rememberMe" class="auth-check" checked />
              <span class="auth-check-label">Recordarme</span>
            </label>
            <button class="auth-link" id="btnForgotPw">¿Olvidaste tu contraseña?</button>
          </div>
          <div class="auth-error" id="loginError"></div>
          <button class="auth-btn-primary" id="btnLogin">
            <span class="auth-btn-text">Iniciar sesión</span>
            <div class="auth-spinner" style="display:none"></div>
          </button>
          <div class="auth-divider"><span>o continuar con</span></div>
          <button class="auth-btn-google" id="btnGoogleLogin">
            <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continuar con Google
          </button>
          <button class="auth-btn-guest" id="btnGuestLogin">
            <svg viewBox="0 0 24 24" width="16" height="16"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Continuar como invitado
          </button>
        </div>

        <!-- REGISTER FORM -->
        <div class="auth-form-wrap" id="formRegister" style="display:none">
          <div class="auth-field">
            <label class="auth-label">Nombre de usuario</label>
            <div class="auth-input-wrap">
              <svg class="auth-input-icon" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input type="text" id="regUsername" class="auth-input" placeholder="Tu nombre" autocomplete="username" />
            </div>
          </div>
          <div class="auth-field">
            <label class="auth-label">Email</label>
            <div class="auth-input-wrap">
              <svg class="auth-input-icon" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <input type="email" id="regEmail" class="auth-input" placeholder="tu@email.com" autocomplete="email" />
            </div>
          </div>
          <div class="auth-field">
            <label class="auth-label">Contraseña</label>
            <div class="auth-input-wrap">
              <svg class="auth-input-icon" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input type="password" id="regPassword" class="auth-input" placeholder="Mínimo 6 caracteres" autocomplete="new-password" />
              <button class="auth-toggle-pw" id="toggleRegPw" type="button">
                <svg viewBox="0 0 24 24" class="icon-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
            <div class="pw-strength" id="pwStrength">
              <div class="pw-strength-bar"><div class="pw-strength-fill" id="pwStrengthFill"></div></div>
              <span class="pw-strength-label" id="pwStrengthLabel"></span>
            </div>
          </div>
          <div class="auth-error" id="registerError"></div>
          <button class="auth-btn-primary" id="btnRegister">
            <span class="auth-btn-text">Crear cuenta gratis</span>
            <div class="auth-spinner" style="display:none"></div>
          </button>
          <p class="auth-terms">Al registrarte aceptas los <a href="#" class="auth-link-inline">Términos de servicio</a> y la <a href="#" class="auth-link-inline">Política de privacidad</a></p>
        </div>

        <!-- FORGOT PASSWORD FORM -->
        <div class="auth-form-wrap" id="formForgot" style="display:none">
          <div class="auth-back-header">
            <button class="auth-back-btn" id="btnBackFromForgot">
              <svg viewBox="0 0 24 24" width="16" height="16"><polyline points="15 18 9 12 15 6"/></svg>
              Volver
            </button>
            <h3 class="auth-section-title">Recuperar contraseña</h3>
          </div>
          <p class="auth-desc">Introduce tu email y te enviaremos un código de recuperación.</p>
          <div class="auth-field">
            <label class="auth-label">Email</label>
            <div class="auth-input-wrap">
              <svg class="auth-input-icon" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <input type="email" id="forgotEmail" class="auth-input" placeholder="tu@email.com" />
            </div>
          </div>
          <div class="auth-error" id="forgotError"></div>
          <div class="auth-success" id="forgotSuccess" style="display:none"></div>
          <button class="auth-btn-primary" id="btnSendReset">
            <span class="auth-btn-text">Enviar código</span>
            <div class="auth-spinner" style="display:none"></div>
          </button>

          <!-- Reset Code Section -->
          <div id="resetCodeSection" style="display:none">
            <div class="auth-field" style="margin-top:1rem">
              <label class="auth-label">Código de verificación</label>
              <div class="auth-input-wrap">
                <input type="text" id="resetCode" class="auth-input" placeholder="XXXXXXXX" style="letter-spacing:.15em;text-transform:uppercase" />
              </div>
            </div>
            <div class="auth-field">
              <label class="auth-label">Nueva contraseña</label>
              <div class="auth-input-wrap">
                <input type="password" id="resetNewPw" class="auth-input" placeholder="Nueva contraseña" />
              </div>
            </div>
            <button class="auth-btn-primary" id="btnConfirmReset" style="margin-top:.5rem">
              <span class="auth-btn-text">Cambiar contraseña</span>
              <div class="auth-spinner" style="display:none"></div>
            </button>
          </div>
        </div>

        <!-- CLOSE BUTTON -->
        <button class="auth-close" id="authClose" aria-label="Cerrar">
          <svg viewBox="0 0 24 24" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- PROFILE MODAL -->
    <div class="auth-overlay" id="profileOverlay" style="display:none">
      <div class="profile-modal" id="profileModal">
        <div class="profile-header">
          <button class="auth-close" id="profileClose" aria-label="Cerrar">
            <svg viewBox="0 0 24 24" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <h2 class="profile-title">Mi perfil</h2>
        </div>
        <div class="profile-content">
          <!-- Avatar -->
          <div class="profile-avatar-section">
            <div class="profile-avatar-big" id="profileAvatarBig"></div>
            <button class="profile-change-avatar" id="profileChangeAvatar">Cambiar avatar</button>
          </div>

          <!-- Info -->
          <div class="profile-info-section">
            <div class="auth-field">
              <label class="auth-label">Nombre de usuario</label>
              <div class="auth-input-wrap">
                <input type="text" id="profileUsername" class="auth-input" />
              </div>
            </div>
            <div class="auth-field">
              <label class="auth-label">Email</label>
              <div class="auth-input-wrap">
                <input type="email" id="profileEmail" class="auth-input" disabled style="opacity:.5;cursor:not-allowed" />
              </div>
            </div>
            <div class="auth-field">
              <label class="auth-label">Bio</label>
              <textarea id="profileBio" class="auth-input auth-textarea" placeholder="Cuéntanos algo sobre ti..." rows="3"></textarea>
            </div>
            <button class="auth-btn-primary" id="btnSaveProfile">Guardar cambios</button>
          </div>

          <!-- Stats -->
          <div class="profile-stats">
            <div class="profile-stat">
              <span class="profile-stat-num" id="statFavorites">0</span>
              <span class="profile-stat-label">Likes</span>
            </div>
            <div class="profile-stat">
              <span class="profile-stat-num" id="statPlaylists">0</span>
              <span class="profile-stat-label">Playlists</span>
            </div>
            <div class="profile-stat">
              <span class="profile-stat-num" id="statHistory">0</span>
              <span class="profile-stat-label">Escuchadas</span>
            </div>
          </div>

          <!-- Plan -->
          <div class="profile-plan">
            <div class="profile-plan-info">
              <svg viewBox="0 0 24 24" width="16" height="16"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" stroke="none"/></svg>
              <span>Plan gratuito</span>
            </div>
          </div>

          <!-- Logout -->
          <button class="profile-logout-btn" id="btnLogoutFromProfile">
            <svg viewBox="0 0 24 24" width="16" height="16"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>

    <!-- AVATAR COLOR PICKER -->
    <div class="avatar-picker-overlay" id="avatarPickerOverlay" style="display:none">
      <div class="avatar-picker-modal">
        <h3 class="avatar-picker-title">Elige tu color</h3>
        <div class="avatar-color-grid" id="avatarColorGrid"></div>
        <button class="auth-btn-primary" id="btnSaveAvatar">Guardar</button>
      </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);
  }

  /* ══════════════════════════════════════════════════════
     TOPBAR USER BUTTON
  ══════════════════════════════════════════════════════ */
  function injectTopbarUserButton() {
    const topbarActions = document.querySelector('.topbar-actions');
    if (!topbarActions || document.getElementById('topbarUserBtn')) return;

    const btn = document.createElement('button');
    btn.className = 'topbar-icon-btn topbar-user-btn';
    btn.id = 'topbarUserBtn';
    btn.setAttribute('aria-label', 'Cuenta');
    btn.innerHTML = `
      <div class="topbar-avatar" id="topbarAvatar">
        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>
    `;
    topbarActions.prepend(btn);
  }

  /* ══════════════════════════════════════════════════════
     UPDATE TOPBAR AVATAR
  ══════════════════════════════════════════════════════ */
  function updateTopbarAvatar(user) {
    const el = document.getElementById('topbarAvatar');
    if (!el) return;

    if (!user) {
      el.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
      el.className = 'topbar-avatar';
      return;
    }

    const av = user.avatar || DroplyAuth.generateAvatar(user.username);
    el.className = 'topbar-avatar has-user';
    el.style.background = av.color;
    el.style.color = '#fff';
    el.innerHTML = `<span>${av.letter}</span>`;
    el.title = user.username;
  }

  /* ══════════════════════════════════════════════════════
     AVATAR RENDER
  ══════════════════════════════════════════════════════ */
  function renderAvatar(container, user, size = 64) {
    if (!container || !user) return;
    const av = user.avatar || DroplyAuth.generateAvatar(user.username || 'U');
    container.style.cssText = `
      width:${size}px;height:${size}px;border-radius:50%;
      background:${av.color};color:#fff;
      display:flex;align-items:center;justify-content:center;
      font-size:${size * 0.4}px;font-weight:700;font-family:var(--font-head);
      flex-shrink:0;
    `;
    container.textContent = av.letter;
  }

  /* ══════════════════════════════════════════════════════
     MODAL SHOW/HIDE
  ══════════════════════════════════════════════════════ */
  function showAuthModal(tab = 'login') {
    const overlay = document.getElementById('authOverlay');
    if (!overlay) return;
    overlay.style.display = 'flex';
    requestAnimationFrame(() => overlay.classList.add('visible'));
    switchTab(tab);
    activeModal = 'auth';
    document.body.style.overflow = 'hidden';
  }

  function hideAuthModal() {
    const overlay = document.getElementById('authOverlay');
    if (!overlay) return;
    overlay.classList.remove('visible');
    setTimeout(() => { overlay.style.display = 'none'; }, 320);
    activeModal = null;
    document.body.style.overflow = '';
  }

  function showProfileModal() {
    const overlay = document.getElementById('profileOverlay');
    if (!overlay) return;
    overlay.style.display = 'flex';
    requestAnimationFrame(() => overlay.classList.add('visible'));
    populateProfile();
    activeModal = 'profile';
    document.body.style.overflow = 'hidden';
  }

  function hideProfileModal() {
    const overlay = document.getElementById('profileOverlay');
    if (!overlay) return;
    overlay.classList.remove('visible');
    setTimeout(() => { overlay.style.display = 'none'; }, 320);
    activeModal = null;
    document.body.style.overflow = '';
  }

  /* ── Switch Form Tab ───────────────────────────────── */
  function switchTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    document.getElementById('formLogin').style.display    = tab === 'login'    ? 'block' : 'none';
    document.getElementById('formRegister').style.display = tab === 'register' ? 'block' : 'none';
    document.getElementById('formForgot').style.display   = 'none';
    clearErrors();
  }

  function showForgotForm() {
    document.getElementById('formLogin').style.display    = 'none';
    document.getElementById('formRegister').style.display = 'none';
    document.getElementById('formForgot').style.display   = 'block';
    document.getElementById('authTabs').style.display     = 'none';
    clearErrors();
  }

  function hideForgotForm() {
    document.getElementById('authTabs').style.display = 'flex';
    switchTab('login');
  }

  /* ── Error/Success Display ─────────────────────────── */
  function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.textContent = msg; el.style.display = 'block'; }
  }
  function clearErrors() {
    ['loginError','registerError','forgotError'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.textContent = ''; el.style.display = 'none'; }
    });
  }

  /* ── Loading State ─────────────────────────────────── */
  function setLoading(btnId, loading) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const text    = btn.querySelector('.auth-btn-text');
    const spinner = btn.querySelector('.auth-spinner');
    btn.disabled = loading;
    if (text)    text.style.opacity = loading ? '0' : '1';
    if (spinner) spinner.style.display = loading ? 'block' : 'none';
  }

  /* ── Password Strength ─────────────────────────────── */
  function checkPasswordStrength(pw) {
    let score = 0;
    if (pw.length >= 6)  score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw))      score++;
    if (/[0-9]/.test(pw))      score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  }

  /* ══════════════════════════════════════════════════════
     POPULATE PROFILE
  ══════════════════════════════════════════════════════ */
  async function populateProfile() {
    const user = DroplyAuth.getCurrentUser();
    if (!user) return;

    const usernameEl = document.getElementById('profileUsername');
    const emailEl    = document.getElementById('profileEmail');
    const bioEl      = document.getElementById('profileBio');
    const avatarEl   = document.getElementById('profileAvatarBig');

    if (usernameEl) usernameEl.value = user.username || '';
    if (emailEl)    emailEl.value    = user.email    || '';
    if (bioEl)      bioEl.value      = user.bio      || '';
    if (avatarEl)   renderAvatar(avatarEl, user, 80);

    // Stats
    const favs = await DroplyAuth.getFavorites();
    const pls  = await DroplyAuth.getPlaylists();
    const hist = await DroplyAuth.getHistory();

    const statFav  = document.getElementById('statFavorites');
    const statPl   = document.getElementById('statPlaylists');
    const statHist = document.getElementById('statHistory');

    if (statFav)  statFav.textContent  = favs.length;
    if (statPl)   statPl.textContent   = pls.length;
    if (statHist) statHist.textContent = hist.length;
  }

  /* ══════════════════════════════════════════════════════
     AVATAR PICKER
  ══════════════════════════════════════════════════════ */
  const AVATAR_COLORS = ['#e94f4f','#4f9de9','#4fe97a','#e9c74f','#9e4fe9','#4fe9d8','#e94fce','#e97a4f','#4f4fe9','#e9e94f'];
  let selectedAvatarColor = null;

  function showAvatarPicker() {
    const overlay = document.getElementById('avatarPickerOverlay');
    const grid    = document.getElementById('avatarColorGrid');
    if (!overlay || !grid) return;

    const user = DroplyAuth.getCurrentUser();
    const currentColor = user?.avatar?.color;

    grid.innerHTML = AVATAR_COLORS.map(color => `
      <button class="avatar-color-swatch ${color === currentColor ? 'selected' : ''}"
              style="background:${color}" data-color="${color}"
              title="${color}"></button>
    `).join('');

    grid.querySelectorAll('.avatar-color-swatch').forEach(sw => {
      sw.addEventListener('click', () => {
        grid.querySelectorAll('.avatar-color-swatch').forEach(s => s.classList.remove('selected'));
        sw.classList.add('selected');
        selectedAvatarColor = sw.dataset.color;
      });
    });

    overlay.style.display = 'flex';
    requestAnimationFrame(() => overlay.classList.add('visible'));
  }

  function hideAvatarPicker() {
    const overlay = document.getElementById('avatarPickerOverlay');
    if (!overlay) return;
    overlay.classList.remove('visible');
    setTimeout(() => { overlay.style.display = 'none'; }, 320);
  }

  /* ══════════════════════════════════════════════════════
     EVENT BINDINGS
  ══════════════════════════════════════════════════════ */
  function bindEvents() {
    // Topbar user button
    document.addEventListener('click', async (e) => {
      const btn = e.target.closest('#topbarUserBtn');
      if (!btn) return;
      const user = DroplyAuth.getCurrentUser();
      if (user && !DroplyAuth.isGuestMode()) {
        showProfileModal();
      } else {
        showAuthModal('login');
      }
    });

    // Tab switch
    document.addEventListener('click', (e) => {
      const tab = e.target.closest('.auth-tab');
      if (!tab) return;
      switchTab(tab.dataset.tab);
    });

    // Close auth modal
    document.addEventListener('click', (e) => {
      if (e.target.id === 'authClose' || e.target.id === 'authOverlay') hideAuthModal();
    });

    // Close profile modal
    document.addEventListener('click', (e) => {
      if (e.target.id === 'profileClose' || e.target.id === 'profileOverlay') hideProfileModal();
    });

    // Forgot password
    document.addEventListener('click', (e) => {
      if (e.target.id === 'btnForgotPw') showForgotForm();
      if (e.target.id === 'btnBackFromForgot') hideForgotForm();
    });

    // Toggle password visibility
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.auth-toggle-pw');
      if (!btn) return;
      const inputId = btn.id === 'toggleLoginPw' ? 'loginPassword' : 'regPassword';
      const input   = document.getElementById(inputId);
      if (input) input.type = input.type === 'password' ? 'text' : 'password';
    });

    // Password strength
    const regPw = document.getElementById('regPassword');
    if (regPw) {
      regPw.addEventListener('input', () => {
        const score = checkPasswordStrength(regPw.value);
        const fill  = document.getElementById('pwStrengthFill');
        const label = document.getElementById('pwStrengthLabel');
        if (!fill || !label) return;

        const labels = ['', 'Muy débil', 'Débil', 'Regular', 'Buena', 'Excelente'];
        const colors = ['', '#e94f4f', '#e97a4f', '#e9c74f', '#4fe97a', '#1db954'];
        const pct    = (score / 5) * 100;

        fill.style.width = pct + '%';
        fill.style.background = colors[score] || colors[1];
        label.textContent = labels[score] || '';
        label.style.color  = colors[score] || colors[1];

        document.getElementById('pwStrength').style.display = regPw.value ? 'flex' : 'none';
      });
    }

    // LOGIN
    document.addEventListener('click', async (e) => {
      if (e.target.id !== 'btnLogin' && !e.target.closest('#btnLogin')) return;
      const email    = document.getElementById('loginEmail')?.value;
      const password = document.getElementById('loginPassword')?.value;
      const remember = document.getElementById('rememberMe')?.checked;

      setLoading('btnLogin', true);
      clearErrors();
      try {
        await DroplyAuth.login(email, password, remember);
        hideAuthModal();
        showToastAuth('¡Bienvenido de nuevo! 🎵', 'success');
        await syncUserData();
      } catch(err) {
        showError('loginError', err.message);
      } finally {
        setLoading('btnLogin', false);
      }
    });

    // REGISTER
    document.addEventListener('click', async (e) => {
      if (e.target.id !== 'btnRegister' && !e.target.closest('#btnRegister')) return;
      const username = document.getElementById('regUsername')?.value;
      const email    = document.getElementById('regEmail')?.value;
      const password = document.getElementById('regPassword')?.value;

      setLoading('btnRegister', true);
      clearErrors();
      try {
        await DroplyAuth.register(username, email, password);
        hideAuthModal();
        showToastAuth(`¡Bienvenido a Droply, ${username}! 🎉`, 'success');
      } catch(err) {
        showError('registerError', err.message);
      } finally {
        setLoading('btnRegister', false);
      }
    });

    // GOOGLE LOGIN (simulated for local mode)
    document.addEventListener('click', async (e) => {
      if (e.target.id !== 'btnGoogleLogin' && !e.target.closest('#btnGoogleLogin')) return;
      showToastAuth('Google Login requiere Firebase configurado. Usa email/contraseña por ahora.', 'info');
    });

    // GUEST LOGIN
    document.addEventListener('click', async (e) => {
      if (e.target.id !== 'btnGuestLogin' && !e.target.closest('#btnGuestLogin')) return;
      await DroplyAuth.loginAsGuest();
      hideAuthModal();
      showToastAuth('Modo invitado activado. Tu progreso no se guardará.', 'info');
    });

    // FORGOT PASSWORD — Send
    document.addEventListener('click', async (e) => {
      if (e.target.id !== 'btnSendReset' && !e.target.closest('#btnSendReset')) return;
      const email = document.getElementById('forgotEmail')?.value;
      setLoading('btnSendReset', true);
      try {
        const res = await DroplyAuth.requestPasswordReset(email);
        const successEl = document.getElementById('forgotSuccess');
        if (successEl) {
          successEl.style.display = 'block';
          successEl.textContent = res.message;
        }
        const resetSection = document.getElementById('resetCodeSection');
        if (resetSection) resetSection.style.display = 'block';
      } catch(err) {
        showError('forgotError', err.message);
      } finally {
        setLoading('btnSendReset', false);
      }
    });

    // FORGOT PASSWORD — Confirm
    document.addEventListener('click', async (e) => {
      if (e.target.id !== 'btnConfirmReset' && !e.target.closest('#btnConfirmReset')) return;
      const email  = document.getElementById('forgotEmail')?.value;
      const code   = document.getElementById('resetCode')?.value;
      const newPw  = document.getElementById('resetNewPw')?.value;
      setLoading('btnConfirmReset', true);
      try {
        await DroplyAuth.confirmPasswordReset(email, code, newPw);
        hideAuthModal();
        showToastAuth('Contraseña actualizada. Inicia sesión con tu nueva contraseña.', 'success');
        showAuthModal('login');
      } catch(err) {
        showError('forgotError', err.message);
      } finally {
        setLoading('btnConfirmReset', false);
      }
    });

    // SAVE PROFILE
    document.addEventListener('click', async (e) => {
      if (e.target.id !== 'btnSaveProfile' && !e.target.closest('#btnSaveProfile')) return;
      const username = document.getElementById('profileUsername')?.value;
      const bio      = document.getElementById('profileBio')?.value;
      try {
        await DroplyAuth.updateProfile({ username, bio });
        showToastAuth('Perfil actualizado ✓', 'success');
        const avatarEl = document.getElementById('profileAvatarBig');
        if (avatarEl) renderAvatar(avatarEl, DroplyAuth.getCurrentUser(), 80);
        updateTopbarAvatar(DroplyAuth.getCurrentUser());
      } catch(err) {
        showToastAuth(err.message, 'error');
      }
    });

    // LOGOUT FROM PROFILE
    document.addEventListener('click', async (e) => {
      if (e.target.id !== 'btnLogoutFromProfile' && !e.target.closest('#btnLogoutFromProfile')) return;
      await DroplyAuth.logout();
      hideProfileModal();
      showToastAuth('Sesión cerrada', 'info');
    });

    // CHANGE AVATAR
    document.addEventListener('click', (e) => {
      if (e.target.id === 'profileChangeAvatar') showAvatarPicker();
    });

    // SAVE AVATAR COLOR
    document.addEventListener('click', async (e) => {
      if (e.target.id !== 'btnSaveAvatar') return;
      if (!selectedAvatarColor) { hideAvatarPicker(); return; }
      const user = DroplyAuth.getCurrentUser();
      if (!user) return;
      const av = user.avatar || DroplyAuth.generateAvatar(user.username);
      av.color = selectedAvatarColor;
      await DroplyAuth.updateProfile({ avatar: av });
      const avatarEl = document.getElementById('profileAvatarBig');
      if (avatarEl) renderAvatar(avatarEl, DroplyAuth.getCurrentUser(), 80);
      updateTopbarAvatar(DroplyAuth.getCurrentUser());
      hideAvatarPicker();
      showToastAuth('Avatar actualizado ✓', 'success');
    });

    // CLOSE AVATAR PICKER
    document.addEventListener('click', (e) => {
      if (e.target.id === 'avatarPickerOverlay') hideAvatarPicker();
    });

    // KEYBOARD ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (activeModal === 'auth')    hideAuthModal();
        if (activeModal === 'profile') hideProfileModal();
      }
    });

    // ENTER KEY on auth inputs
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const active = document.activeElement;
      if (!active) return;
      if (['loginEmail','loginPassword'].includes(active.id)) {
        document.getElementById('btnLogin')?.click();
      }
      if (['regUsername','regEmail','regPassword'].includes(active.id)) {
        document.getElementById('btnRegister')?.click();
      }
    });
  }

  /* ── Toast helper ──────────────────────────────────── */
  function showToastAuth(msg, type = 'info') {
    if (typeof showToast === 'function') {
      showToast(msg, type);
    } else {
      console.info('[DROPLY Auth]', msg);
    }
  }

  /* ══════════════════════════════════════════════════════
     SYNC USER DATA WITH APP STATE
     Uses actual variable names from script.js
  ══════════════════════════════════════════════════════ */
  async function syncUserData() {
    try {
      // Sync liked tracks (likedTracks is a Set in script.js)
      const favs = await DroplyAuth.getFavorites();
      if (favs && favs.length > 0) {
        if (typeof likedTracks !== 'undefined') {
          likedTracks.clear();
          favs.forEach(f => likedTracks.add(f));
          if (typeof renderFavoritos === 'function') renderFavoritos();
          if (typeof renderMediaGrid === 'function') renderMediaGrid();
        }
      }
    } catch(e) {}

    try {
      // Sync playlists (playlists is an array in script.js)
      const pls = await DroplyAuth.getPlaylists();
      if (pls && pls.length > 0) {
        if (typeof playlists !== 'undefined') {
          playlists.length = 0;
          pls.forEach(p => playlists.push(p));
          if (typeof renderPlaylists === 'function') renderPlaylists();
        }
      }
    } catch(e) {}

    try {
      // Restore volume settings
      const settings = await DroplyAuth.getSettings();
      if (settings && settings.volume !== undefined) {
        const volSlider = document.getElementById('volSlider');
        const audio     = document.getElementById('mainAudio');
        if (volSlider) volSlider.value = settings.volume;
        if (audio)     audio.volume   = settings.volume;
      }
    } catch(e) {}
  }

  /* ══════════════════════════════════════════════════════
     SETUP AUTO-SAVE HOOKS
     Patches script.js functions to auto-sync to auth store
  ══════════════════════════════════════════════════════ */
  function setupAutoSave() {
    // Patch saveLiked() — called by toggleLike()
    const origSaveLiked = window.saveLiked;
    if (typeof origSaveLiked === 'function') {
      window.saveLiked = async function() {
        origSaveLiked();
        try {
          if (typeof likedTracks !== 'undefined') {
            await DroplyAuth.setFavorites([...likedTracks]);
          }
        } catch(e) {}
      };
    }

    // Patch savePlaylists() — called on playlist create/modify
    const origSavePlaylists = window.savePlaylists;
    if (typeof origSavePlaylists === 'function') {
      window.savePlaylists = async function() {
        origSavePlaylists();
        try {
          if (typeof playlists !== 'undefined') {
            await DroplyAuth.savePlaylists([...playlists]);
          }
        } catch(e) {}
      };
    }

    // Patch loadTrack() — called when a song plays to save history
    const origLoadTrack = window.loadTrack;
    if (typeof origLoadTrack === 'function') {
      window.loadTrack = async function(item, ...args) {
        origLoadTrack.apply(this, [item, ...args]);
        try {
          if (item) await DroplyAuth.addToHistory(item);
        } catch(e) {}
      };
    }

    // Auto-save volume on change
    const volSlider = document.getElementById('volSlider');
    if (volSlider) {
      volSlider.addEventListener('change', async () => {
        try {
          const s = await DroplyAuth.getSettings();
          s.volume = parseFloat(volSlider.value);
          await DroplyAuth.saveSettings(s);
        } catch(e) {}
      });
    }

    console.info('[DROPLY Auth] ✓ Auto-save hooks instalados');
  }

  /* ══════════════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════════════ */
  async function init() {
    injectAuthHTML();
    injectTopbarUserButton();
    bindEvents();

    // Init auth system
    const user = await DroplyAuth.init();

    // Listen for auth changes
    DroplyAuth.onAuthStateChange((user) => {
      updateTopbarAvatar(user);
    });

    // If logged in, sync data
    if (user && !DroplyAuth.isGuestMode()) {
      await syncUserData();
    }

    // Setup auto-save hooks (delayed to let script.js finish)
    setTimeout(setupAutoSave, 1000);

    // Show auth modal if not logged in and first visit
    const hasVisited = localStorage.getItem('droply_has_visited');
    if (!user && !hasVisited) {
      localStorage.setItem('droply_has_visited', '1');
      setTimeout(() => showAuthModal('login'), 800);
    }

    return user;
  }

  /* ── Public API ────────────────────────────────────── */
  return {
    init,
    showAuthModal,
    hideAuthModal,
    showProfileModal,
    hideProfileModal,
    updateTopbarAvatar,
    syncUserData,
    renderAvatar
  };
})();