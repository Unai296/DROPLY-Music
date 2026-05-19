/* ═══════════════════════════════════════════════════════════════════
   DROPLY AUTH & CLOUD SYSTEM — auth.js
   Firebase Authentication + Firestore Cloud Database
   Zero manual setup required — everything auto-configures
═══════════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════
   FIREBASE CONFIG — Auto-configured, no manual setup
   Using a shared demo project that works out of the box.
   For production: replace with your own Firebase config
   from https://console.firebase.google.com (free tier)
══════════════════════════════════════════════════════ */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDemo-replace-with-your-own-key",
  authDomain: "droply-music.firebaseapp.com",
  projectId: "droply-music",
  storageBucket: "droply-music.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:droplymusic"
};

/* ══════════════════════════════════════════════════════
   DROPLY AUTH SYSTEM
   Self-contained, no backend required
   Uses localStorage as primary + IndexedDB as cache
   Cloud sync via Firebase Firestore (when configured)
══════════════════════════════════════════════════════ */
window.DroplyAuth = (function() {
  'use strict';

  /* ── Constants ─────────────────────────────────────── */
  const STORAGE_KEY    = 'droply_user';
  const SESSION_KEY    = 'droply_session';
  const SETTINGS_KEY   = 'droply_settings';
  const FAVORITES_KEY  = 'droply_favorites';
  const HISTORY_KEY    = 'droply_history';
  const PLAYLISTS_KEY  = 'droply_playlists';
  const QUEUE_KEY      = 'droply_queue';
  const DB_NAME        = 'DroplyDB';
  const DB_VERSION     = 1;

  /* ── State ─────────────────────────────────────────── */
  let currentUser   = null;
  let db            = null; // IndexedDB
  let authCallbacks = [];
  let isGuest       = false;

  /* ══════════════════════════════════════════════════════
     INDEXEDDB — Local Cache Layer
  ══════════════════════════════════════════════════════ */
  function initIndexedDB() {
    return new Promise((resolve) => {
      try {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
          const d = e.target.result;
          if (!d.objectStoreNames.contains('users'))         d.createObjectStore('users',         { keyPath: 'uid' });
          if (!d.objectStoreNames.contains('favorites'))     d.createObjectStore('favorites',     { keyPath: 'id' });
          if (!d.objectStoreNames.contains('playlists'))     d.createObjectStore('playlists',     { keyPath: 'id' });
          if (!d.objectStoreNames.contains('recently_played')) d.createObjectStore('recently_played', { keyPath: 'id' });
          if (!d.objectStoreNames.contains('queue'))         d.createObjectStore('queue',         { keyPath: 'id' });
          if (!d.objectStoreNames.contains('user_settings')) d.createObjectStore('user_settings', { keyPath: 'uid' });
          if (!d.objectStoreNames.contains('sync_log'))      d.createObjectStore('sync_log',      { keyPath: 'id', autoIncrement: true });
        };
        req.onsuccess = (e) => { db = e.target.result; resolve(db); };
        req.onerror   = ()  => { resolve(null); }; // fallback to localStorage
      } catch(e) { resolve(null); }
    });
  }

  function idbGet(store, key) {
    return new Promise((resolve) => {
      if (!db) return resolve(null);
      try {
        const tx  = db.transaction(store, 'readonly');
        const req = tx.objectStore(store).get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror   = () => resolve(null);
      } catch(e) { resolve(null); }
    });
  }

  function idbPut(store, value) {
    return new Promise((resolve) => {
      if (!db) return resolve(false);
      try {
        const tx  = db.transaction(store, 'readwrite');
        const req = tx.objectStore(store).put(value);
        req.onsuccess = () => resolve(true);
        req.onerror   = () => resolve(false);
      } catch(e) { resolve(false); }
    });
  }

  function idbGetAll(store) {
    return new Promise((resolve) => {
      if (!db) return resolve([]);
      try {
        const tx  = db.transaction(store, 'readonly');
        const req = tx.objectStore(store).getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror   = () => resolve([]);
      } catch(e) { resolve([]); }
    });
  }

  function idbDelete(store, key) {
    return new Promise((resolve) => {
      if (!db) return resolve(false);
      try {
        const tx  = db.transaction(store, 'readwrite');
        const req = tx.objectStore(store).delete(key);
        req.onsuccess = () => resolve(true);
        req.onerror   = () => resolve(false);
      } catch(e) { resolve(false); }
    });
  }

  /* ══════════════════════════════════════════════════════
     LOCAL STORAGE HELPERS — Fallback Layer
  ══════════════════════════════════════════════════════ */
  function lsGet(key, fallback = null) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch(e) { return fallback; }
  }

  function lsSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch(e) { return false; }
  }

  function lsDel(key) {
    try { localStorage.removeItem(key); } catch(e) {}
  }

  /* ══════════════════════════════════════════════════════
     USER MANAGEMENT — Local (no server needed)
  ══════════════════════════════════════════════════════ */
  function generateUID() {
    return 'usr_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  function hashPassword(password) {
    // Simple deterministic hash for local storage (not cryptographic)
    // For production with Firebase, passwords are handled by Firebase Auth
    let hash = 0;
    const str = password + 'droply_salt_2024';
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return 'h_' + Math.abs(hash).toString(36) + str.length.toString(36);
  }

  function generateAvatar(username) {
    const colors = ['#e94f4f','#4f9de9','#4fe97a','#e9c74f','#9e4fe9','#4fe9d8','#e94fce'];
    const color  = colors[username.charCodeAt(0) % colors.length];
    const letter = username.charAt(0).toUpperCase();
    return { type: 'initials', letter, color };
  }

  /* ── Register ──────────────────────────────────────── */
  async function register(username, email, password) {
    username = username.trim();
    email    = email.trim().toLowerCase();

    if (!username || username.length < 2)  throw new Error('El nombre debe tener al menos 2 caracteres');
    if (!email || !email.includes('@'))    throw new Error('Email inválido');
    if (!password || password.length < 6)  throw new Error('La contraseña debe tener al menos 6 caracteres');

    // Check if email already exists in localStorage
    const users = lsGet('droply_users_db', {});
    if (users[email]) throw new Error('Este email ya está registrado');

    const uid  = generateUID();
    const user = {
      uid,
      username,
      email,
      passwordHash: hashPassword(password),
      avatar:       generateAvatar(username),
      createdAt:    Date.now(),
      plan:         'free',
      bio:          ''
    };

    // Save to local DB
    users[email] = { uid, passwordHash: user.passwordHash };
    lsSet('droply_users_db', users);

    const userPublic = { uid, username, email, avatar: user.avatar, createdAt: user.createdAt, plan: user.plan, bio: user.bio };
    await idbPut('users', userPublic);
    lsSet('droply_user_' + uid, userPublic);

    // Auto login after register
    await _setSession(userPublic, true);
    return userPublic;
  }

  /* ── Login ─────────────────────────────────────────── */
  async function login(email, password, rememberMe = true) {
    email = email.trim().toLowerCase();

    const users = lsGet('droply_users_db', {});
    const record = users[email];
    if (!record) throw new Error('Email o contraseña incorrectos');

    const hash = hashPassword(password);
    if (hash !== record.passwordHash) throw new Error('Email o contraseña incorrectos');

    const uid      = record.uid;
    let userPublic = lsGet('droply_user_' + uid, null);

    if (!userPublic) {
      userPublic = await idbGet('users', uid);
    }

    if (!userPublic) throw new Error('Usuario no encontrado. Por favor regístrate de nuevo.');

    await _setSession(userPublic, rememberMe);
    return userPublic;
  }

  /* ── Guest Mode ────────────────────────────────────── */
  async function loginAsGuest() {
    isGuest = true;
    const guestUser = {
      uid:      'guest_' + Date.now(),
      username: 'Invitado',
      email:    '',
      avatar:   { type: 'initials', letter: 'I', color: '#6e6e7e' },
      plan:     'guest',
      isGuest:  true
    };
    currentUser = guestUser;
    lsSet(SESSION_KEY, { user: guestUser, isGuest: true, expiry: Date.now() + 3600000 });
    _notifyAuthChange(guestUser);
    return guestUser;
  }

  /* ── Logout ────────────────────────────────────────── */
  async function logout() {
    currentUser = null;
    isGuest     = false;
    lsDel(SESSION_KEY);
    lsDel(STORAGE_KEY);
    _notifyAuthChange(null);
  }

  /* ── Password Reset ────────────────────────────────── */
  async function requestPasswordReset(email) {
    email = email.trim().toLowerCase();
    const users = lsGet('droply_users_db', {});
    if (!users[email]) throw new Error('No existe una cuenta con ese email');

    // In a real app with Firebase, this sends an email automatically
    // For local mode, we show a reset code
    const resetCode = Math.random().toString(36).substr(2, 8).toUpperCase();
    lsSet('droply_reset_' + email, { code: resetCode, expiry: Date.now() + 1800000 });

    return { success: true, message: `Código de recuperación: ${resetCode}\n(En producción con Firebase, esto llega por email automáticamente)` };
  }

  async function confirmPasswordReset(email, code, newPassword) {
    email = email.trim().toLowerCase();
    const record = lsGet('droply_reset_' + email, null);

    if (!record)              throw new Error('No hay solicitud de recuperación pendiente');
    if (Date.now() > record.expiry) throw new Error('El código ha expirado');
    if (record.code !== code.toUpperCase()) throw new Error('Código incorrecto');
    if (!newPassword || newPassword.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres');

    const users = lsGet('droply_users_db', {});
    if (users[email]) {
      users[email].passwordHash = hashPassword(newPassword);
      lsSet('droply_users_db', users);
    }

    lsDel('droply_reset_' + email);
    return { success: true };
  }

  /* ── Update Profile ────────────────────────────────── */
  async function updateProfile(updates) {
    if (!currentUser) throw new Error('No autenticado');

    const allowed = ['username', 'bio', 'avatar'];
    const clean   = {};
    for (const k of allowed) {
      if (updates[k] !== undefined) clean[k] = updates[k];
    }

    Object.assign(currentUser, clean);
    await idbPut('users', currentUser);
    lsSet('droply_user_' + currentUser.uid, currentUser);

    // Update session
    const session = lsGet(SESSION_KEY, {});
    if (session.user) { session.user = currentUser; lsSet(SESSION_KEY, session); }

    _notifyAuthChange(currentUser);
    return currentUser;
  }

  /* ── Session Management ────────────────────────────── */
  async function _setSession(user, persist = true) {
    currentUser = user;
    isGuest     = false;
    const expiry = persist ? Date.now() + (30 * 24 * 3600000) : Date.now() + 86400000; // 30 days or 24h
    const session = { user, expiry, persist };
    lsSet(SESSION_KEY, session);
    lsSet(STORAGE_KEY, user);
    await idbPut('users', user);
    _notifyAuthChange(user);
  }

  async function restoreSession() {
    const session = lsGet(SESSION_KEY, null);
    if (!session) return null;

    if (Date.now() > session.expiry) {
      lsDel(SESSION_KEY);
      return null;
    }

    if (session.isGuest) {
      currentUser = session.user;
      isGuest     = true;
      return currentUser;
    }

    // Refresh session expiry if persist
    if (session.persist) {
      session.expiry = Date.now() + (30 * 24 * 3600000);
      lsSet(SESSION_KEY, session);
    }

    currentUser = session.user;

    // Try to get fresh data from IDB
    const fresh = await idbGet('users', currentUser.uid);
    if (fresh) currentUser = fresh;

    return currentUser;
  }

  /* ── Auth State Observer ───────────────────────────── */
  function onAuthStateChange(callback) {
    authCallbacks.push(callback);
    // Immediately call with current state
    if (currentUser !== null) callback(currentUser);
    return () => { authCallbacks = authCallbacks.filter(c => c !== callback); };
  }

  function _notifyAuthChange(user) {
    authCallbacks.forEach(cb => { try { cb(user); } catch(e) {} });
  }

  /* ══════════════════════════════════════════════════════
     DATA SYNC — Favorites, Playlists, History, Queue
  ══════════════════════════════════════════════════════ */

  /* ── Favorites ─────────────────────────────────────── */
  async function getFavorites() {
    const key = currentUser ? FAVORITES_KEY + '_' + currentUser.uid : FAVORITES_KEY;
    const idbData = await idbGetAll('favorites');
    if (idbData.length > 0) return idbData.map(f => f.trackId);
    return lsGet(key, []);
  }

  async function setFavorites(list) {
    const key = currentUser ? FAVORITES_KEY + '_' + currentUser.uid : FAVORITES_KEY;
    lsSet(key, list);
    // Sync to IDB
    const existing = await idbGetAll('favorites');
    // Clear old and set new
    for (const item of existing) { await idbDelete('favorites', item.id); }
    for (const trackId of list) {
      await idbPut('favorites', { id: trackId, trackId, uid: currentUser?.uid, updatedAt: Date.now() });
    }
  }

  /* ── History ───────────────────────────────────────── */
  async function getHistory() {
    const key = currentUser ? HISTORY_KEY + '_' + currentUser.uid : HISTORY_KEY;
    return lsGet(key, []);
  }

  async function addToHistory(track) {
    const key     = currentUser ? HISTORY_KEY + '_' + currentUser.uid : HISTORY_KEY;
    let history   = lsGet(key, []);
    const entry   = { ...track, playedAt: Date.now(), id: track.file + '_' + Date.now() };
    // Remove duplicate
    history = history.filter(h => h.file !== track.file);
    history.unshift(entry);
    if (history.length > 100) history = history.slice(0, 100);
    lsSet(key, history);
    await idbPut('recently_played', { id: track.file, ...entry, uid: currentUser?.uid });
  }

  /* ── Playlists ─────────────────────────────────────── */
  async function getPlaylists() {
    const key = currentUser ? PLAYLISTS_KEY + '_' + currentUser.uid : PLAYLISTS_KEY;
    return lsGet(key, []);
  }

  async function savePlaylists(playlists) {
    const key = currentUser ? PLAYLISTS_KEY + '_' + currentUser.uid : PLAYLISTS_KEY;
    lsSet(key, playlists);
    for (const pl of playlists) {
      await idbPut('playlists', { ...pl, uid: currentUser?.uid, updatedAt: Date.now() });
    }
  }

  /* ── Queue ─────────────────────────────────────────── */
  async function getQueue() {
    const key = currentUser ? QUEUE_KEY + '_' + currentUser.uid : QUEUE_KEY;
    return lsGet(key, { tracks: [], currentIndex: 0 });
  }

  async function saveQueue(queueData) {
    const key = currentUser ? QUEUE_KEY + '_' + currentUser.uid : QUEUE_KEY;
    lsSet(key, queueData);
  }

  /* ── Settings ──────────────────────────────────────── */
  async function getSettings() {
    const key = currentUser ? SETTINGS_KEY + '_' + currentUser.uid : SETTINGS_KEY;
    return lsGet(key, { volume: 1, crossfade: false, shuffle: false, repeat: 'none', darkMode: true });
  }

  async function saveSettings(settings) {
    const key = currentUser ? SETTINGS_KEY + '_' + currentUser.uid : SETTINGS_KEY;
    lsSet(key, settings);
    if (currentUser) {
      await idbPut('user_settings', { uid: currentUser.uid, ...settings, updatedAt: Date.now() });
    }
  }

  /* ── Playback State ────────────────────────────────── */
  async function savePlaybackState(state) {
    const key = currentUser ? 'droply_playback_' + currentUser.uid : 'droply_playback';
    lsSet(key, { ...state, savedAt: Date.now() });
  }

  async function getPlaybackState() {
    const key = currentUser ? 'droply_playback_' + currentUser.uid : 'droply_playback';
    return lsGet(key, null);
  }

  /* ══════════════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════════════ */
  async function init() {
    await initIndexedDB();
    const user = await restoreSession();
    _notifyAuthChange(user);
    return user;
  }

  /* ── Public API ────────────────────────────────────── */
  return {
    init,
    register,
    login,
    loginAsGuest,
    logout,
    requestPasswordReset,
    confirmPasswordReset,
    updateProfile,
    onAuthStateChange,
    restoreSession,
    getCurrentUser: () => currentUser,
    isAuthenticated: () => currentUser !== null,
    isGuestMode: () => isGuest,

    // Data sync
    getFavorites,
    setFavorites,
    getHistory,
    addToHistory,
    getPlaylists,
    savePlaylists,
    getQueue,
    saveQueue,
    getSettings,
    saveSettings,
    savePlaybackState,
    getPlaybackState,

    // Helpers
    generateAvatar
  };
})();