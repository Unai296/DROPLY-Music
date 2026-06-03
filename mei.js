/* ═══════════════════════════════════════════════════════════
   MEI — AI DJ Assistant for DROPLY
   Powered by Mistral AI  |  v1.0
   
   Integra como capa inteligente sobre el reproductor existente.
   No modifica funciones core de Droply.
═══════════════════════════════════════════════════════════ */

'use strict';

const MEI = (() => {

  /* ────────────────────────────────────────────────────────
     CONFIG
  ──────────────────────────────────────────────────────── */
  const MISTRAL_API_KEY = '6457EoarfmBFsXEvCQV0XNFLVVrd1XFS';
  const MISTRAL_MODEL   = 'mistral-large-latest';
  const PREFS_KEY       = 'mei_user_prefs_v2';
  const DJ_INTERVAL_MS  = 20000;

  /* ────────────────────────────────────────────────────────
     STATE
  ──────────────────────────────────────────────────────── */
  let state = {
    djMode:      false,
    voiceOn:     false,
    isThinking:  false,
    djInterval:  null,
    currentMood: 'neutral',
    currentEnergy: 5,
    djPlaylist:  [],
    djIdx:       0,
    lastTrackFile: null,
  };

  /* ────────────────────────────────────────────────────────
     MEMORIA DE USUARIO (localStorage)
  ──────────────────────────────────────────────────────── */
  function loadPrefs() {
    try {
      return JSON.parse(localStorage.getItem(PREFS_KEY)) || {
        favorite_genres:  [],
        avg_energy:       5,
        liked_tracks:     [],
        disliked_tracks:  [],
        interaction_count: 0
      };
    } catch { return { favorite_genres:[], avg_energy:5, liked_tracks:[], disliked_tracks:[], interaction_count:0 }; }
  }
  function savePrefs(p) {
    try { localStorage.setItem(PREFS_KEY, JSON.stringify(p)); } catch {}
  }
  function updatePrefsFromResponse(apiResp) {
    const prefs = loadPrefs();
    prefs.interaction_count = (prefs.interaction_count || 0) + 1;
    if (apiResp.genres?.length) {
      apiResp.genres.forEach(g => {
        if (!prefs.favorite_genres.includes(g)) prefs.favorite_genres.push(g);
      });
      if (prefs.favorite_genres.length > 10) prefs.favorite_genres = prefs.favorite_genres.slice(-10);
    }
    if (typeof apiResp.energy === 'number') {
      prefs.avg_energy = Math.round((prefs.avg_energy * 0.8) + (apiResp.energy * 0.2));
    }
    savePrefs(prefs);
  }
  function trackLiked(trackFile) {
    const prefs = loadPrefs();
    if (!prefs.liked_tracks.includes(trackFile)) {
      prefs.liked_tracks.unshift(trackFile);
      if (prefs.liked_tracks.length > 50) prefs.liked_tracks = prefs.liked_tracks.slice(0, 50);
      savePrefs(prefs);
    }
  }
  function trackDisliked(trackFile) {
    const prefs = loadPrefs();
    if (!prefs.disliked_tracks.includes(trackFile)) {
      prefs.disliked_tracks.unshift(trackFile);
      if (prefs.disliked_tracks.length > 30) prefs.disliked_tracks = prefs.disliked_tracks.slice(0, 30);
      savePrefs(prefs);
    }
  }

  /* ────────────────────────────────────────────────────────
     MISTRAL API
  ──────────────────────────────────────────────────────── */
  async function callMistral(systemPrompt, userMessage) {
    const res = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: MISTRAL_MODEL,
        max_tokens: 600,
        temperature: 0.7,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: userMessage  }
        ]
      })
    });
    if (!res.ok) throw new Error(`Mistral ${res.status}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content || '';
  }

  /* Interpreta intención musical del usuario */
  async function interpretMusicRequest(userText, prefs) {
    const availCats = getAvailableCategories();
    const system = `Eres Mei, un DJ IA para la app Droply. Analiza lo que quiere escuchar el usuario.
Categorías disponibles en la app: ${availCats.join(', ')}.
Géneros favoritos del usuario: ${prefs.favorite_genres.join(', ') || 'sin datos aún'}.
Energía habitual del usuario (1-10): ${prefs.avg_energy}.

Responde SOLO con JSON válido, sin texto extra, sin markdown:
{
  "message": "respuesta amigable y breve en español (máx 60 palabras)",
  "mood": "happy|chill|energetic|sad|party|focus|romantic|aggressive|neutral",
  "genres": ["array","de","géneros","de","la","lista","disponible"],
  "energy": 7,
  "search_terms": ["término1","término2","término3"],
  "next_track_strategy": "same_artist|same_genre|similar_energy|contrast|user_fav"
}`;
    const raw = await callMistral(system, userText);
    const clean = raw.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  }

  /* Genera comentario DJ en tiempo real */
  async function getDJComment(currentTrack, nextTrack, prefs) {
    const system = `Eres Mei, un DJ IA. Genera un comentario breve y natural sobre la transición musical.
Responde SOLO con JSON:
{ "comment": "comentario corto en español (máx 30 palabras), estilo DJ radio FM, warm" }`;
    const msg = `Sonando: "${currentTrack?.title}" de ${currentTrack?.artist}. 
Siguiente: "${nextTrack?.title}" de ${nextTrack?.artist}.
Mood actual: ${state.currentMood}, Energía: ${state.currentEnergy}/10.`;
    try {
      const raw = await callMistral(system, msg);
      const clean = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      return parsed.comment || '';
    } catch { return ''; }
  }

  /* ────────────────────────────────────────────────────────
     UTILIDADES DE TRACKS
  ──────────────────────────────────────────────────────── */
  function getAvailableCategories() {
    if (typeof media === 'undefined') return [];
    return [...new Set(media.map(m => m.category))].filter(Boolean);
  }

  function searchTracks(terms, genres, energy, prefs) {
    if (typeof media === 'undefined') return [];
    const disliked = new Set(prefs.disliked_tracks || []);
    let pool = media.filter(m => m.type === 'music' && !disliked.has(m.file));

    // Filter by genres if provided
    if (genres?.length) {
      const genreFiltered = pool.filter(m =>
        genres.some(g => m.category?.toLowerCase().includes(g.toLowerCase()))
      );
      if (genreFiltered.length > 0) pool = genreFiltered;
    }

    // Score by search terms
    const scored = pool.map(m => {
      let score = 0;
      const searchable = `${m.title} ${m.artist} ${m.category}`.toLowerCase();
      (terms || []).forEach(t => {
        if (searchable.includes(t.toLowerCase())) score += 3;
      });
      // Boost liked tracks
      if (prefs.liked_tracks?.includes(m.file)) score += 2;
      // Slight random factor for variety
      score += Math.random() * 0.5;
      return { item: m, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .map(s => s.item)
      .slice(0, 12);
  }

  function pickNextDJTrack(currentTrack, strategy, prefs) {
    if (typeof media === 'undefined') return null;
    const disliked = new Set(prefs.disliked_tracks || []);
    const pool = media.filter(m => m.type === 'music' && !disliked.has(m.file) && m.file !== currentTrack?.file);

    switch (strategy) {
      case 'same_artist': {
        const artist = currentTrack?.artist?.split(/[,&]/)[0].trim();
        const sameArtist = pool.filter(m => m.artist.includes(artist));
        if (sameArtist.length > 0) return sameArtist[Math.floor(Math.random() * sameArtist.length)];
        break;
      }
      case 'same_genre': {
        const sameCat = pool.filter(m => m.category === currentTrack?.category);
        if (sameCat.length > 0) return sameCat[Math.floor(Math.random() * sameCat.length)];
        break;
      }
      case 'user_fav': {
        const favs = prefs.liked_tracks || [];
        const favTracks = pool.filter(m => favs.includes(m.file));
        if (favTracks.length > 0) return favTracks[Math.floor(Math.random() * favTracks.length)];
        break;
      }
    }
    // Fallback: random from same category
    const sameCat = pool.filter(m => m.category === currentTrack?.category);
    const candidates = sameCat.length >= 3 ? sameCat : pool;
    return candidates[Math.floor(Math.random() * candidates.length)] || null;
  }

  /* ────────────────────────────────────────────────────────
     TTS (Text-to-Speech)
  ──────────────────────────────────────────────────────── */
  function speak(text) {
    if (!state.voiceOn || !text) return;
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(text);
        utt.lang  = 'es-ES';
        utt.rate  = 1.0;
        utt.pitch = 1.1;
        // Pick a female voice if available
        const voices = window.speechSynthesis.getVoices();
        const femaleEs = voices.find(v => v.lang.startsWith('es') && v.name.toLowerCase().includes('female'))
          || voices.find(v => v.lang.startsWith('es') && (v.name.includes('Lucia') || v.name.includes('Monica') || v.name.includes('Jorge') ===false))
          || voices.find(v => v.lang.startsWith('es'));
        if (femaleEs) utt.voice = femaleEs;
        window.speechSynthesis.speak(utt);
      }
    } catch {}
  }

  /* ────────────────────────────────────────────────────────
     DOM HELPERS
  ──────────────────────────────────────────────────────── */
  function getMsgContainer() { return document.getElementById('meiMessages'); }

  function addMessage(role, html, animate = true) {
    const container = getMsgContainer();
    if (!container) return;

    // Remove empty state if present
    const empty = container.querySelector('.mei-empty');
    if (empty) empty.remove();

    const wrapper = document.createElement('div');
    wrapper.className = `mei-msg ${role}`;
    if (!animate) wrapper.style.animationDuration = '0s';

    if (role === 'mei') {
      wrapper.innerHTML = `
        <div class="mei-msg-avatar"><img src="mei-photo.jpg" alt="Mei" onerror="this.outerHTML='M'" /></div>
        <div class="mei-msg-bubble">${html}</div>`;
    } else {
      wrapper.innerHTML = `
        <div class="mei-msg-bubble">${escapeHtml(html)}</div>`;
    }
    container.appendChild(wrapper);
    scrollToBottom();
    return wrapper;
  }

  function showTyping() {
    const container = getMsgContainer();
    if (!container) return null;
    const el = document.createElement('div');
    el.className = 'mei-typing';
    el.id = 'meiTyping';
    el.innerHTML = `
      <div class="mei-msg-avatar"><img src="mei-photo.jpg" alt="Mei" onerror="this.outerHTML='M'" /></div>
      <div class="mei-typing-dots">
        <div class="mei-typing-dot"></div>
        <div class="mei-typing-dot"></div>
        <div class="mei-typing-dot"></div>
      </div>`;
    container.appendChild(el);
    scrollToBottom();
    return el;
  }

  function removeTyping() {
    document.getElementById('meiTyping')?.remove();
  }

  function scrollToBottom() {
    const container = getMsgContainer();
    if (container) setTimeout(() => { container.scrollTop = container.scrollHeight; }, 50);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }

  function setThinking(v) {
    state.isThinking = v;
    const btn = document.getElementById('meiSendBtn');
    const inp = document.getElementById('meiInput');
    if (btn) btn.disabled = v;
    if (inp) inp.disabled = v;
  }

  function updateDJBar() {
    const bar = document.getElementById('meiDjBar');
    if (!bar) return;
    bar.classList.toggle('active', state.djMode);
  }

  function updateVoiceBtn() {
    const btn = document.getElementById('meiVoiceToggle');
    if (btn) btn.classList.toggle('voice-active', state.voiceOn);
  }

  function updateDJQuickBtn() {
    const btn = document.getElementById('meiDjQuickBtn');
    if (btn) btn.classList.toggle('dj-active', state.djMode);
  }

  /* ────────────────────────────────────────────────────────
     TRACK CARDS HTML
  ──────────────────────────────────────────────────────── */
  function renderTrackCards(tracks, limit = 4) {
    return tracks.slice(0, limit).map(t => {
      const cover = t.cover || '';
      return `<div class="mei-track-suggestion" data-file="${escapeHtml(t.file)}">
        <img src="${escapeHtml(cover)}" alt="${escapeHtml(t.title)}" onerror="this.src=''">
        <div class="mei-track-suggestion-info">
          <div class="mei-track-suggestion-title">${escapeHtml(t.title)}</div>
          <div class="mei-track-suggestion-artist">${escapeHtml(t.artist)}</div>
        </div>
        <div class="mei-track-play-btn">
          <svg viewBox="0 0 24 24" fill="white" stroke="none" width="12" height="12"><polygon points="5,3 19,12 5,21"/></svg>
        </div>
      </div>`;
    }).join('');
  }

  function renderMoodTags(moods) {
    return moods.map(m => `<span class="mei-mood-tag">${m}</span>`).join('');
  }

  /* ────────────────────────────────────────────────────────
     CORE: PROCESS USER MESSAGE
  ──────────────────────────────────────────────────────── */
  async function processUserMessage(text) {
    if (!text.trim() || state.isThinking) return;
    setThinking(true);

    addMessage('user', text);
    const typing = showTyping();
    const prefs  = loadPrefs();

    try {
      const apiResp = await interpretMusicRequest(text, prefs);
      updatePrefsFromResponse(apiResp);
      state.currentMood   = apiResp.mood   || 'neutral';
      state.currentEnergy = apiResp.energy || 5;

      removeTyping();

      // Search tracks
      const tracks = searchTracks(apiResp.search_terms, apiResp.genres, apiResp.energy, prefs);

      // Build message HTML
      let msgHtml = `<div>${escapeHtml(apiResp.message)}</div>`;
      if (apiResp.mood) msgHtml += renderMoodTags([apiResp.mood]);
      if (tracks.length > 0) {
        msgHtml += `<div style="margin-top:.5rem;font-size:.72rem;color:var(--text-mid);font-weight:600;">
          ${tracks.length} canción${tracks.length!==1?'es':''} encontradas
        </div>`;
        msgHtml += renderTrackCards(tracks);
        if (tracks.length > 1) {
          msgHtml += `<div style="margin-top:.5rem">
            <button class="mei-quick-btn" style="font-size:.7rem;padding:.35rem .7rem" onclick="MEI.playAll()" >
              ▶ Reproducir todas
            </button>
          </div>`;
        }
      } else {
        msgHtml += `<div style="margin-top:.4rem;font-size:.75rem;color:var(--text-soft)">
          No encontré canciones exactas, pero activa el Modo DJ y busco algo parecido.
        </div>`;
      }

      const msgEl = addMessage('mei', msgHtml);

      // Wire up track card click events
      if (msgEl && tracks.length > 0) {
        msgEl.querySelectorAll('.mei-track-suggestion').forEach((card, i) => {
          card.addEventListener('click', () => {
            const track = tracks[i];
            if (track && typeof loadTrack === 'function') {
              loadTrack(track, false, tracks);
              state.djPlaylist = tracks;
              state.djIdx = i;
              if (typeof showToast === 'function') showToast(`Reproduciendo: ${track.title}`, 'success');
            }
          });
        });
      }

      // Speak response
      speak(apiResp.message);

    } catch (err) {
      removeTyping();
      console.warn('[MEI] Error:', err);
      const errMsg = err?.message?.includes('401') || err?.message?.includes('403')
        ? `Sin acceso a la IA ahora mismo. Prueba a recargar la página. 🔧`
        : `Algo falló conectando con la IA. ¿Lo intentamos de nuevo? 🎵`;
      addMessage('mei', errMsg);
    } finally {
      setThinking(false);
    }
  }

  /* ────────────────────────────────────────────────────────
     PLAY ALL
  ──────────────────────────────────────────────────────── */
  function playAll() {
    if (state.djPlaylist.length === 0) return;
    const track = state.djPlaylist[0];
    if (typeof loadTrack === 'function') {
      loadTrack(track, false, state.djPlaylist);
      if (typeof showToast === 'function') showToast('▶ Reproduciendo lista de Mei', 'success');
    }
  }

  /* ────────────────────────────────────────────────────────
     MODO DJ
  ──────────────────────────────────────────────────────── */
  function startDJMode() {
    if (state.djMode) return;
    state.djMode = true;
    updateDJBar();
    updateDJQuickBtn();

    // Start monitoring
    state.djInterval = setInterval(djTick, DJ_INTERVAL_MS);
    addMessage('mei', `
      <div>🎚️ <strong>Modo DJ activado.</strong> Voy a mezclar música sin parar para ti.</div>
      <div class="mei-dj-status">
        <span class="mei-dj-status-icon">🎧</span>
        <span class="mei-dj-status-text">Analizando y preparando el siguiente track...</span>
      </div>`);
    speak('Modo DJ activado. Voy a mezclar música sin parar.');
  }

  function stopDJMode() {
    state.djMode = false;
    if (state.djInterval) { clearInterval(state.djInterval); state.djInterval = null; }
    updateDJBar();
    updateDJQuickBtn();
    addMessage('mei', `DJ Mode apagado. Dime cuando quieras volver a mezclar 🎵`);
    speak('Modo DJ desactivado.');
  }

  function toggleDJMode() {
    state.djMode ? stopDJMode() : startDJMode();
  }

  async function djTick() {
    if (!state.djMode) return;
    if (typeof playlist === 'undefined' || typeof currentTrackIdx === 'undefined') return;

    const currentTrack = playlist?.[currentTrackIdx];
    if (!currentTrack) return;

    // Check if track changed
    if (state.lastTrackFile === currentTrack.file) {
      // Track hasn't changed, check if near end
      const audio = typeof activeAudio !== 'undefined' ? activeAudio : document.getElementById('mainAudio');
      if (!audio || !audio.duration) return;
      const remaining = audio.duration - audio.currentTime;
      if (remaining > 15) return; // Not near end, wait
    }
    state.lastTrackFile = currentTrack.file;

    const prefs    = loadPrefs();
    const strategy = 'same_genre';
    const nextTrack = pickNextDJTrack(currentTrack, strategy, prefs);

    if (!nextTrack) return;

    try {
      const comment = await getDJComment(currentTrack, nextTrack, prefs);
      if (comment) {
        addMessage('mei', `<span style="font-size:.75rem;color:var(--text-mid)">🎚️ DJ</span> ${escapeHtml(comment)}`);
        speak(comment);
      }
    } catch {}

    // Queue next track
    if (typeof addToQueue === 'function') {
      addToQueue(nextTrack);
    } else if (typeof queue !== 'undefined') {
      queue.push(nextTrack.file);
      if (typeof saveQueue === 'function') saveQueue();
    }
  }

  /* ────────────────────────────────────────────────────────
     QUICK ACTIONS
  ──────────────────────────────────────────────────────── */
  async function quickAction(type) {
    // Solo soportamos Modo DJ desde las acciones rápidas
    if (type === 'dj-mode') { toggleDJMode(); return; }
    // Ignorar otros tipos (limpiados del UI)
    return;
  }

  /* ────────────────────────────────────────────────────────
     TOGGLE VOICE
  ──────────────────────────────────────────────────────── */
  function toggleVoice() {
    state.voiceOn = !state.voiceOn;
    updateVoiceBtn();
    if (state.voiceOn) {
      // Load voices
      if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
      addMessage('mei', `🔊 Voz activada. ¡Ya puedes escucharme!`);
      speak('Hola, ya puedo hablar contigo.');
    } else {
      addMessage('mei', `🔇 Voz desactivada.`);
    }
  }

  /* ────────────────────────────────────────────────────────
     BUILD UI
  ──────────────────────────────────────────────────────── */
  function buildUI() {
    // Inject page into pages-container
    const pagesContainer = document.getElementById('pagesContainer');
    if (!pagesContainer || document.getElementById('pageMei')) return;

    const page = document.createElement('div');
    page.className = 'page';
    page.id = 'pageMei';
    page.innerHTML = `
      <!-- Full-screen photo section -->
      <div class="mei-photo-section">
        <div class="mei-photo-bg"></div>
        <img class="mei-photo-img" src="mei-photo.jpg" alt="Mei" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
        <div class="mei-photo-fallback">
          <span>M</span>
        </div>
        <div class="mei-photo-overlay"></div>

        <!-- Top bar inside photo -->
        <div class="mei-photo-topbar">
          <div class="mei-photo-identity">
            <div class="mei-status-dot"></div>
            <span class="mei-photo-name">Mei</span>
            <span class="mei-photo-role">· DJ IA</span>
          </div>
          <div class="mei-header-actions">
            <button class="mei-header-btn" id="meiVoiceToggle" title="Voz">🔊</button>
            <button class="mei-header-btn" id="meiClearChat" title="Limpiar">
              <svg viewBox="0 0 24 24" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
            </button>
          </div>
        </div>

        <!-- DJ Bar (visible cuando está activo) -->
        <div class="mei-dj-bar" id="meiDjBar">
          <div class="mei-dj-bar-dot"></div>
          <span class="mei-dj-bar-text">Modo DJ activo</span>
          <div class="mei-voice-wave" style="margin-right:.3rem">
            <div class="mei-voice-bar"></div><div class="mei-voice-bar"></div>
            <div class="mei-voice-bar"></div><div class="mei-voice-bar"></div>
            <div class="mei-voice-bar"></div>
          </div>
          <button class="mei-dj-stop-btn" id="meiDjStopBtn">Parar</button>
        </div>

        <!-- Quick Actions encima del chat -->
        <div class="mei-quick-row">
          <button class="mei-quick-btn dj-active" data-action="dj-mode" id="meiDjQuickBtn">DJ?</button>
        </div>
      </div>

      <!-- Chat section -->
      <div class="mei-chat-section">
        <!-- Messages -->
        <div class="mei-messages" id="meiMessages">
          <div class="mei-empty">
            <p>Cuéntame qué quieres escuchar hoy 🎧</p>
          </div>
        </div>

        <!-- Input -->
        <div class="mei-input-area">
          <div class="mei-input-wrap">
            <textarea
              class="mei-input"
              id="meiInput"
              placeholder="Habla con Mei…"
              rows="1"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
            ></textarea>
          </div>
          <button class="mei-send-btn" id="meiSendBtn" aria-label="Enviar">
            <svg viewBox="0 0 24 24" fill="white" stroke="none" width="18" height="18">
              <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
    `;
    pagesContainer.appendChild(page);

    // Add Mei button to bottom nav
    const nav = document.getElementById('bottomNav');
    if (nav) {
      const btn = document.createElement('button');
      btn.className = 'bnav-btn mei-nav-btn';
      btn.setAttribute('data-page', 'pageMei');
      btn.setAttribute('aria-label', 'Mei DJ');
      btn.innerHTML = `
        <div class="mei-orb"><div class="mei-orb-inner"></div></div>
        <span>Mei</span>`;
      btn.addEventListener('click', () => { if (typeof showPage === 'function') showPage('pageMei'); if (typeof updateBottomNavSlider === 'function') updateBottomNavSlider(); });
      nav.appendChild(btn);
      if (typeof updateBottomNavSlider === 'function') updateBottomNavSlider();
    }

    wireEvents();

    // First greeting after a short delay
    setTimeout(() => {
      addMessage('mei', `Hola, soy <strong>Mei</strong>. ¿Qué quieres escuchar hoy?`, true);
      speak('Hola, soy Mei. ¿Qué quieres escuchar hoy?');
    }, 500);
  }

  /* ────────────────────────────────────────────────────────
     WIRE EVENTS
  ──────────────────────────────────────────────────────── */
  function wireEvents() {
    const sendBtn  = document.getElementById('meiSendBtn');
    const input    = document.getElementById('meiInput');
    const clearBtn = document.getElementById('meiClearChat');
    const voiceBtn = document.getElementById('meiVoiceToggle');
    const djStop   = document.getElementById('meiDjStopBtn');

    // Send
    async function doSend() {
      if (!input) return;
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      input.style.height = '';
      await processUserMessage(text);
    }

    if (sendBtn) sendBtn.addEventListener('click', doSend);
    if (input) {
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doSend(); }
      });
      // Auto-resize textarea
      input.addEventListener('input', () => {
        input.style.height = 'auto';
        input.style.height = Math.min(input.scrollHeight, 100) + 'px';
      });
    }

    // Clear chat
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        const msgs = document.getElementById('meiMessages');
        if (msgs) {
          msgs.innerHTML = `<div class="mei-empty">
            <div class="mei-empty-orb">M</div>
            <h3>Chat limpiado</h3>
            <p>Listo para empezar de nuevo.</p>
          </div>`;
          setTimeout(() => {
            msgs.innerHTML = '';
            addMessage('mei', `Chat limpiado. ¿Qué ponemos ahora?`);
          }, 800);
        }
      });
    }

    // Voice toggle
    if (voiceBtn) voiceBtn.addEventListener('click', toggleVoice);

    // DJ stop
    if (djStop) djStop.addEventListener('click', stopDJMode);

    // Quick action buttons
    document.querySelectorAll('#pageMei .mei-quick-btn[data-action]').forEach(btn => {
      btn.addEventListener('click', () => quickAction(btn.dataset.action));
    });
  }

  /* ────────────────────────────────────────────────────────
     INIT
  ──────────────────────────────────────────────────────── */
  function init() {
    buildUI();
    // Hook into Droply's showPage to activate Mei nav highlight
    const origShowPage = window.showPage;
    if (typeof origShowPage === 'function') {
      window.showPage = function(pageId) {
        origShowPage(pageId);
        // Scroll voices on first visit to Mei
        if (pageId === 'pageMei' && 'speechSynthesis' in window) {
          window.speechSynthesis.getVoices();
        }
      };
    }
    console.info('[MEI] ✅ Cargada y lista');
  }

  /* ── Public API ── */
  return { init, playAll, toggleDJMode, toggleVoice, processUserMessage };

})();

/* ── Boot ── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => MEI.init());
} else {
  MEI.init();
}