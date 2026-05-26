/* ═══════════════════════════════════════════════════════════
   DROPLY — album.js  v2.0  (FIXED)
   Sistema completo de Álbumes
═══════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════
   ★ ÁLBUMES — edita aquí para añadir/quitar álbumes
══════════════════════════════════════════════════════ */
const albums = [














{
  id:     "reggaeton-hits",
  title:  "Reggaeton Hits",
  artist: "Various Artists",
  year:   "2026",
  genre:  "Reggaeton",
  cover:  "https://i.scdn.co/image/ab67616d0000b2735fa6dc9fc261344044c301a9",

  songs: [
    { title: "DÁKITI",                 file: "./Music/dakiti.mp3",                duration: "3:33" },
    { title: "Pepas",                  file: "./Music/pepas.mp3",                 duration: "4:54" },
    { title: "Classy 101",             file: "./Music/classy.mp3",                duration: "3:15" },
    { title: "Playa Del Inglés",       file: "./Music/playadelingles.mp3",       duration: "4:15" },
    { title: "Gata Only",              file: "./Music/gataonly.mp3",             duration: "3:42" },
    { title: "SI NO ES CONTIGO",       file: "./Music/si_no_es_contigo.mp3",     duration: "2:38" },
    { title: "LALA",                   file: "./Music/lala.mp3",                 duration: "3:17" },
    { title: "Luna",                   file: "./Music/luna.mp3",                 duration: "3:16" },
    { title: "LA INOCENTE",            file: "./Music/lainocente.mp3",           duration: "3:20" },
    { title: "Yandel 150",             file: "./Music/yandel150.mp3",            duration: "3:36" },
    { title: "Danza Kuduro",           file: "./Music/danzakuduro.mp3",          duration: "3:18" },
    { title: "Taki Taki",              file: "./Music/takitaki.mp3",             duration: "3:51" },
    { title: "China",                  file: "./Music/china.mp3",                duration: "4:55" },
    { title: "Mi Gente",               file: "./Music/migente.mp3",              duration: "3:07" },
    { title: "Con Altura",             file: "./Music/conaltura.mp3",            duration: "2:44" }
  ]
},

{
  id:     "electronic-energy",
  title:  "Electronic Energy",
  artist: "Various Artists",
  year:   "2026",
  genre:  "Electronic",
  cover:  "https://i.scdn.co/image/ab67616d0000b273c4a03dba6c420bda982b3f62",

  songs: [
    { title: "Animals",                file: "./Music/animals.mp3",              duration: "3:06" },
    { title: "FADE",                   file: "./Music/fade.mp3",                 duration: "3:03" },
    { title: "Atlantis",               file: "./Music/atlantis.mp3",             duration: "2:26" },
    { title: "Ecuador",                file: "./Music/ecuador.mp3",              duration: "5:25" },
    { title: "Blah Blah Blah",         file: "./Music/blahblahblah.mp3",         duration: "3:13" },
    { title: "Turn It Up",             file: "./Music/turnitup.mp3",             duration: "3:03" },
    { title: "Titanium [Live Edit]",   file: "./Music/titanium(liveedit).mp3",  duration: "3:16" },
    { title: "Outside",                file: "./Music/outside.mp3",              duration: "3:45" },
    { title: "Bad",                    file: "./Music/bad.mp3",                  duration: "2:50" },
    { title: "The Spectre",            file: "./Music/thespectre.mp3",           duration: "3:26" },
    { title: "Move Your Body",         file: "./Music/moveyourbodytimmyytumpet.mp3", duration: "2:50" },
    { title: "Thank You (Not So Bad)", file: "./Music/thankyounotsobad.mp3",    duration: "2:19" }
  ]
},

{
  id:     "90s-forever",
  title:  "90s Forever",
  artist: "Various Artists",
  year:   "2026",
  genre:  "90s",
  cover:  "https://cdn-images.dzcdn.net/images/cover/b3442cde5c53baa308dd569b5dbd46c1/1900x1900-000000-81-0-0.jpg",

  songs: [
    { title: "Freed from Desire",      file: "./Music/frefromdesier.mp3",        duration: "3:35" },
    { title: "Destination Calabria",   file: "./Music/destination.mp3",          duration: "3:03" },
    { title: "Better Off Alone",       file: "./Music/betteroffalone.mp3",       duration: "2:55" },
    { title: "The Rhythm of the Night",file: "./Music/therhythmoftthenight.mp3", duration: "3:46" },
    { title: "Stereo Love",            file: "./Music/stereolove.mp3",           duration: "3:06" },
    { title: "What Is Love",           file: "./Music/whatislove.mp3",           duration: "4:00" },
    { title: "Be My Lover",            file: "./Music/bemylover.mp3",            duration: "3:42" },
    { title: "L'Amour Toujours",       file: "./Music/l_amour_toujours.mp3",    duration: "4:01" },
    { title: "The Riddle",             file: "./Music/the_riddle.mp3",          duration: "3:24" },
    { title: "Another Way",            file: "./Music/another_way.mp3",         duration: "6:03" },
    { title: "Happy Nation",           file: "./Music/happynation.mp3",         duration: "3:31" },
    { title: "Barbie Girl",            file: "./Music/barbiegirl.mp3",          duration: "3:21" }
  ]
},

{
  id:     "coldplay-collection",
  title:  "Coldplay Collection",
  artist: "Coldplay",
  year:   "2026",
  genre:  "Dance-Pop",
  cover:  "https://m.media-amazon.com/images/I/9145yafeO2L._UF894,1000_QL80_.jpg",

  songs: [
    { title: "A Sky Full Of Stars",    file: "./Music/a_sky_full_of_stars.mp3", duration: "4:13" },
    { title: "Viva La Vida",           file: "./Music/viva_la_vida.mp3",         duration: "4:02" },
    { title: "Paradise",               file: "./Music/paradise.mp3",             duration: "4:20" },
    { title: "Clocks",                 file: "./Music/clocks.mp3",               duration: "4:15" },
    { title: "Adventure Of A Lifetime",file: "./Music/adventure_of_a_lifetime.mp3", duration: "4:24" },
    { title: "Fix You",                file: "./Music/fix_you.mp3",              duration: "4:53" },
    { title: "Hymn For The Weekend",   file: "./Music/hymn_for_the_weekend.mp3", duration: "4:20" }
  ]
},

{
  id:     "estopa-classics",
  title:  "Estopa Classics",
  artist: "Estopa",
  year:   "2026",
  genre:  "Pop",
  cover:  "https://m.media-amazon.com/images/I/41-8AcQWaIL._UXNaN_FMjpg_QL85_.jpg",

  songs: [
    { title: "Como Camaron",           file: "./Music/comocamaron.mp3",          duration: "3:27" },
    { title: "La Raja de Tu Falda",    file: "./Music/larajadetufalda.mp3",      duration: "3:22" },
    { title: "Partiendo la Pana",      file: "./Music/partiendolapana.mp3",      duration: "4:12" },
    { title: "Paseo",                  file: "./Music/paseo.mp3",                duration: "3:39" },
    { title: "Ojitos Rojos",           file: "./Music/ojitosrojos.mp3",          duration: "4:25" },
    { title: "Me Quedaré",             file: "./Music/mequedare.mp3",            duration: "3:17" },
    { title: "El del Medio de los Chichos", file: "./Music/eldelmediodeloschichos.mp3", duration: "3:47" }
  ]
}

];

/* Usar datos inline si están disponibles (evita problemas de caché) */
if (typeof window !== 'undefined' && window.__droplyAlbums && window.__droplyAlbums.length > 0) {
  albums.length = 0;
  window.__droplyAlbums.forEach(function(a) { albums.push(a); });
}


/* ══════════════════════════════════════════════════════
   STORAGE KEYS
══════════════════════════════════════════════════════ */
const LIKED_KEY = 'droply_liked';
const HIST_KEY  = 'droply_history';
const PLAYS_KEY = 'droply_plays';

/* ══════════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════════ */
let audioEl        = null;
let currentAlbum   = null;
let currentSongIdx = 0;
let isPlaying      = false;
let shuffleActive  = false;
let repeatActive   = false;

/* ══════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════ */
function ensureAudio() {
  if (audioEl) return;
  audioEl = document.getElementById('mainAudio') || document.querySelector('audio');
  if (!audioEl) {
    audioEl = new Audio();
    audioEl.preload = 'metadata';
    document.body.appendChild(audioEl);
  }
  audioEl.addEventListener('ended',      onAudioEnded);
  audioEl.addEventListener('timeupdate', onTimeUpdate);
  audioEl.addEventListener('play',  function() { isPlaying = true;  updateMiniPlayer(true);  });
  audioEl.addEventListener('pause', function() { isPlaying = false; updateMiniPlayer(false); });
}

function getLiked() {
  try { return JSON.parse(localStorage.getItem(LIKED_KEY) || '[]'); } catch(_) { return []; }
}

function calcTotalDuration(songs) {
  var total = 0;
  songs.forEach(function(s) {
    if (!s.duration) return;
    var parts = s.duration.split(':').map(Number);
    if (parts.length === 2) total += parts[0] * 60 + parts[1];
    else if (parts.length === 3) total += parts[0] * 3600 + parts[1] * 60 + parts[2];
  });
  if (!total) return '';
  var h = Math.floor(total / 3600);
  var m = Math.floor((total % 3600) / 60);
  var s = total % 60;
  if (h > 0) return h + ' h ' + m + ' min';
  if (m > 0) return s > 0 ? m + ' min ' + s + ' s' : m + ' min';
  return s + ' s';
}

function updateDebugPanel(msg) {
  try {
    var el = document.getElementById('albumDebugPanel');
    if (el) el.textContent = '[AlbumSystem] ' + msg;
  } catch(_) {}
}

/* ══════════════════════════════════════════════════════
   MINI PLAYER — solo en modo standalone (albums.html)
   En index.html se salta porque window._albumJsEmbedded = true
══════════════════════════════════════════════════════ */
function injectMiniPlayer() {
  if (document.getElementById('albumMiniPlayer')) return;
  var mp = document.createElement('div');
  mp.id = 'albumMiniPlayer';
  mp.style.cssText = [
    'position:fixed', 'bottom:0', 'left:0', 'right:0', 'height:64px',
    'background:rgba(8,8,8,.96)',
    'backdrop-filter:blur(24px) saturate(180%)',
    '-webkit-backdrop-filter:blur(24px) saturate(180%)',
    'border-top:1px solid rgba(255,255,255,.08)',
    'display:none', 'align-items:center', 'padding:0 1rem',
    'gap:.75rem', 'z-index:800', 'cursor:pointer',
    'user-select:none', '-webkit-user-select:none'
  ].join(';');
  mp.innerHTML = '<img id="mpCover" src="" alt="" style="width:44px;height:44px;border-radius:8px;object-fit:cover;background:#1e1e26;flex-shrink:0" />'
    + '<div style="flex:1;overflow:hidden">'
    + '<div id="mpTitle" style="font-size:.88rem;font-weight:600;color:#f8f8f8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"></div>'
    + '<div id="mpArtist" style="font-size:.75rem;color:#a1a1aa;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px"></div>'
    + '</div>'
    + '<div style="display:flex;align-items:center;gap:.5rem">'
    + '<button id="mpPrev" aria-label="Anterior" style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:none;border:none;color:#a1a1aa;cursor:pointer;flex-shrink:0">'
    + '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="19,20 9,12 19,4" fill="currentColor" stroke="none"/><line x1="5" y1="19" x2="5" y2="5"/></svg></button>'
    + '<button id="mpPlay" aria-label="Play/Pausa" style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#8b5cf6;border:none;color:#fff;cursor:pointer;box-shadow:0 4px 16px rgba(139,92,246,.4);flex-shrink:0">'
    + '<svg id="mpIconPlay" viewBox="0 0 24 24" width="18" height="18" style="fill:#fff;stroke:none"><polygon points="5,3 19,12 5,21"/></svg>'
    + '<svg id="mpIconPause" viewBox="0 0 24 24" width="18" height="18" style="fill:#fff;stroke:none;display:none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
    + '</button>'
    + '<button id="mpNext" aria-label="Siguiente" style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:none;border:none;color:#a1a1aa;cursor:pointer;flex-shrink:0">'
    + '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="5,4 15,12 5,20" fill="currentColor" stroke="none"/><line x1="19" y1="5" x2="19" y2="19"/></svg></button>'
    + '</div>'
    + '<div id="mpProgressBar" style="position:absolute;bottom:0;left:0;right:0;height:2px;background:rgba(255,255,255,.08)">'
    + '<div id="mpProgressFill" style="height:100%;width:0%;background:#8b5cf6;transition:width .5s linear"></div></div>';
  document.body.appendChild(mp);
  document.getElementById('mpPlay').addEventListener('click', function(e) { e.stopPropagation(); togglePlay(); });
  document.getElementById('mpNext').addEventListener('click', function(e) { e.stopPropagation(); playNext(); });
  document.getElementById('mpPrev').addEventListener('click', function(e) { e.stopPropagation(); playPrev(); });
}

function showMiniPlayer(song) {
  const mp = document.getElementById("albumMiniPlayer");
  if (!mp) return;
  document.getElementById("mpCover").src  = song.cover  || "";
  document.getElementById("mpTitle").textContent  = song.title;
  document.getElementById("mpArtist").textContent = song.artist || (currentAlbum?.artist || "");
  mp.style.display = "flex";
}

function hideMiniPlayer() {
  const mp = document.getElementById("albumMiniPlayer");
  if (mp) mp.style.display = "none";
}

function updateMiniPlayer(playing) {
  const iconPlay  = document.getElementById("mpIconPlay");
  const iconPause = document.getElementById("mpIconPause");
  if (!iconPlay || !iconPause) return;
  iconPlay.style.display  = playing ? "none" : "";
  iconPause.style.display = playing ? "" : "none";
}

function onTimeUpdate() {
  if (!audioEl || !audioEl.duration || isNaN(audioEl.duration)) return;
  const pct = (audioEl.currentTime / audioEl.duration) * 100;
  const fill = document.getElementById("mpProgressFill");
  if (fill) fill.style.width = pct + "%";
}

/* ══════════════════════════════════════════════════════
   PLAYBACK CORE
══════════════════════════════════════════════════════ */

/**
 * Play a song from a given album.
 * Sets currentAlbum as the active queue context.
 */
function playSong(album, songIndex, fromAutoplay = false) {
  ensureAudio();
  currentAlbum   = album;
  currentSongIdx = songIndex;

  const song = album.songs[songIndex];
  if (!song) return;

  // History tracking
  try {
    let hist = JSON.parse(localStorage.getItem(HIST_KEY) || "[]");
    hist.unshift({ file: song.file, timestamp: Date.now() });
    hist = hist.slice(0, 100);
    localStorage.setItem(HIST_KEY, JSON.stringify(hist));
  } catch(_) {}

  // Play counts
  try {
    let pc = JSON.parse(localStorage.getItem(PLAYS_KEY) || "{}");
    pc[song.file] = (pc[song.file] || 0) + 1;
    localStorage.setItem(PLAYS_KEY, JSON.stringify(pc));
  } catch(_) {}

  // Set audio source
  audioEl.pause();
  audioEl.src = "";
  audioEl.removeAttribute("src");
  audioEl.src = song.file;

  // Setup Media Session
  if ("mediaSession" in navigator) {
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title:  song.title,
        artist: album.artist,
        album:  album.title,
        artwork: [
          { src: song.cover || album.cover, sizes: "512x512", type: "image/jpeg" }
        ]
      });
      navigator.mediaSession.setActionHandler("nexttrack",     () => playNext());
      navigator.mediaSession.setActionHandler("previoustrack", () => playPrev());
      navigator.mediaSession.setActionHandler("play",  () => { audioEl.play().catch(() => {}); });
      navigator.mediaSession.setActionHandler("pause", () => audioEl.pause());
    } catch(_) {}
  }

  const playPromise = audioEl.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isPlaying = true;
      updateMiniPlayer(true);
    }).catch(err => {
      isPlaying = false;
      updateMiniPlayer(false);
      if (err.name !== "NotAllowedError") {
        console.warn("[DROPLY Albums] Error al reproducir:", song.file, err);
      }
    });
  }

  // Update mini player
  showMiniPlayer({ ...song, cover: song.cover || album.cover, artist: album.artist });

  // Update tracklist visual
  updateTracklistHighlight(songIndex);

  // Update album card in list page
  updateAlbumCardHighlight(album.id);
}

function togglePlay() {
  if (!audioEl || !audioEl.src) return;
  if (audioEl.paused) {
    audioEl.play().catch(() => {});
  } else {
    audioEl.pause();
  }
}

function playNext() {
  if (!currentAlbum) return;
  const songs  = currentAlbum.songs;
  const len    = songs.length;
  let next;
  if (shuffleActive) {
    do { next = Math.floor(Math.random() * len); }
    while (len > 1 && next === currentSongIdx);
  } else {
    next = (currentSongIdx + 1) % len;
  }
  playSong(currentAlbum, next, true);
}

function playPrev() {
  if (!currentAlbum) return;
  if (audioEl && audioEl.currentTime > 3) {
    audioEl.currentTime = 0;
    return;
  }
  const len  = currentAlbum.songs.length;
  const prev = (currentSongIdx - 1 + len) % len;
  playSong(currentAlbum, prev, true);
}

function onAudioEnded() {
  if (repeatActive) {
    audioEl.currentTime = 0;
    audioEl.play().catch(() => {});
    return;
  }
  if (!currentAlbum) return;
  const songs = currentAlbum.songs;
  if (currentSongIdx < songs.length - 1) {
    playNext();
  } else if (shuffleActive) {
    playNext();
  } else {
    // End of album — replay from start (or stop based on your preference)
    // Default: restart album
    playSong(currentAlbum, 0, true);
  }
}

function playAlbumFromStart(album) {
  playSong(album, 0);
}

function playAlbumShuffle(album) {
  const idx = Math.floor(Math.random() * album.songs.length);
  shuffleActive = true;
  const btn = document.getElementById("btnShuffleAlbum");
  if (btn) btn.classList.add("active");
  playSong(album, idx);
}

/* ══════════════════════════════════════════════════════
   TRACKLIST UI UPDATES
══════════════════════════════════════════════════════ */
function updateTracklistHighlight(activeIdx) {
  document.querySelectorAll(".album-track-row").forEach((row, i) => {
    row.classList.toggle("is-playing", i === activeIdx);
  });
}

function updateAlbumCardHighlight(albumId) {
  document.querySelectorAll(".album-card").forEach(card => {
    const isActive = card.dataset.albumId === albumId;
    card.classList.toggle("is-active", isActive);
  });
}

/* ══════════════════════════════════════════════════════
   PAGE: ALBUMS LIST
══════════════════════════════════════════════════════ */
function renderAlbumsList() {
  const grid = document.getElementById("albumsGrid");
  const countEl = document.getElementById("albumsCount");
  console.info('[AlbumSystem] renderAlbumsList called — albums.length=', albums.length, 'gridFound=', !!grid);
  if (!grid) {
    console.warn('[AlbumSystem] albumsGrid element no encontrado');
    return;
  }

  // Update count badge
  if (countEl) countEl.textContent = `${Array.isArray(albums) ? albums.length : 0} álbum${(Array.isArray(albums) && albums.length !== 1) ? "es" : ""}`;
  updateDebugPanel(`renderAlbumsList — albums.length=${Array.isArray(albums) ? albums.length : 'n/a'}`);

  // Defensive rendering: if albums is not an array or is empty, show helpful message
  try {
    if (!Array.isArray(albums) || albums.length === 0) {
      grid.innerHTML = `
        <div class="albums-empty" style="grid-column:1/-1">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <h3>Sin álbumes</h3>
          <p>Añade álbumes en el array <code>albums</code> de album.js</p>
          <div style="margin-top:.7rem;font-size:.8rem;color:#9ca3af">Debug: albums tipo: ${typeof albums}</div>
        </div>`;
      return;
    }

    // Render all album cards immediately (avoid relying on timeouts)
    grid.innerHTML = "";
    const fragment = document.createDocumentFragment();
    albums.forEach(album => {
      const card = buildAlbumCard(album);
      fragment.appendChild(card);
    });
    grid.appendChild(fragment);
    // If after rendering there are no cards, inject a visible fallback with debug info
    setTimeout(() => {
      if (!grid.querySelector('.album-card')) {
        const fallback = document.createElement('div');
        fallback.className = 'album-card album-card-glass';
        fallback.style.padding = '1rem';
        fallback.innerHTML = `
          <div style="font-weight:700;margin-bottom:.4rem">Debug fallback — No se pudieron renderizar álbumes</div>
          <div style="font-size:.9rem;color:#9ca3af;margin-bottom:.6rem">Comprueba la consola o revisa el array <code>albums</code> en <strong>album.js</strong>.</div>
          <pre style="white-space:pre-wrap;font-size:.75rem;color:#f3f4f6;background:rgba(0,0,0,.3);padding:.5rem;border-radius:8px;max-height:140px;overflow:auto">${String(JSON.stringify(albums, null, 2)).substring(0,2000)}</pre>
        `;
        grid.appendChild(fallback);
        updateDebugPanel('fallback injected — no .album-card found');
      }
    }, 80);
  } catch (err) {
    console.error('[AlbumSystem] renderAlbumsList error:', err);
    updateDebugPanel('render error: ' + String(err));
    grid.innerHTML = `<div class="albums-empty" style="grid-column:1/-1"><h3>Error al renderizar álbumes</h3><p style="color:#f87171">${String(err)}</p></div>`;
  }
}

function buildAlbumCard(album) {
  const card = document.createElement("div");
  card.className = "album-card album-card-glass";
  card.dataset.albumId = album.id;

  // Check if this album is currently active
  if (currentAlbum?.id === album.id) {
    card.classList.add("is-active");
  }

  const songCount = album.songs?.length || 0;
  const totalDur  = calcTotalDuration(album.songs || []);

  card.innerHTML = `
    <div class="album-card-cover">
      <img
        src="${album.cover}"
        alt="${album.title}"
        loading="lazy"
        onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1 1%22><rect fill=%22%2317171d%22/></svg>'"
      />
      <div class="album-card-overlay">
        <div class="album-card-play-circle">
          <svg viewBox="0 0 24 24" width="20" height="20"><polygon points="5,3 19,12 5,21"/></svg>
        </div>
      </div>
      <div class="album-card-playing-badge">
        <div class="playing-bars">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
    </div>
    <div class="album-card-body">
      <div class="album-card-title">${album.title}</div>
      <div class="album-card-artist">${album.artist}</div>
      <div class="album-card-meta">
        <span>${songCount} canción${songCount !== 1 ? "es" : ""}</span>
        ${totalDur ? `<span class="album-card-dot"></span><span>${totalDur}</span>` : ""}
        ${album.year ? `<span class="album-card-dot"></span><span>${album.year}</span>` : ""}
      </div>
    </div>
  `;

  card.addEventListener("click", () => openAlbumDetail(album));
  return card;
}

/* ══════════════════════════════════════════════════════
   PAGE: ALBUM DETAIL
══════════════════════════════════════════════════════ */
function openAlbumDetail(album) {
  // Update URL param
  const url = new URL(window.location.href);
  url.searchParams.set("id", album.id);
  window.history.pushState({ albumId: album.id }, "", url);

  document.getElementById("pageAlbumsList").style.display  = "none";
  document.getElementById("pageAlbumDetail").style.display = "";
  const topbarTitleEl = document.getElementById("topbarTitle");
  if (topbarTitleEl) topbarTitleEl.textContent = album.title;

  renderAlbumDetail(album);
}

function closeAlbumDetail() {
  const url = new URL(window.location.href);
  url.searchParams.delete("id");
  window.history.pushState({}, "", url);

  document.getElementById("pageAlbumsList").style.display  = "";
  document.getElementById("pageAlbumDetail").style.display = "none";
  const topbarTitleEl = document.getElementById("topbarTitle");
  if (topbarTitleEl) topbarTitleEl.textContent = "Álbumes";
  document.getElementById("albumDetailBg").style.display = "none";

  // Re-render to update active states
  renderAlbumsList();
}

function renderAlbumDetail(album) {
  // Atmospheric background
  const bg     = document.getElementById("albumDetailBg");
  const bgBlur = document.getElementById("albumDetailBgBlur");
  bg.style.display = "";
  bgBlur.style.backgroundImage = `url(${album.cover})`;

  // Hero cover
  const heroImg        = document.getElementById("albumHeroImg");
  const heroReflection = document.getElementById("albumHeroReflection");
  heroImg.src        = album.cover;
  heroImg.alt        = album.title;
  heroReflection.src = album.cover;

  // Hero info
  document.getElementById("albumHeroTitle").textContent  = album.title;
  document.getElementById("albumHeroArtist").textContent = album.artist;

  // Meta
  const meta = document.getElementById("albumHeroMeta");
  const parts = [];
  if (album.year)  parts.push(album.year);
  if (album.genre) parts.push(album.genre);
  const songCount = album.songs?.length || 0;
  parts.push(`${songCount} canción${songCount !== 1 ? "es" : ""}`);
  const totalDur = calcTotalDuration(album.songs || []);
  if (totalDur) parts.push(totalDur);

  meta.innerHTML = parts.map((p, i) => `
    ${i > 0 ? '<span class="album-hero-meta-dot"></span>' : ""}
    <span>${p}</span>
  `).join("");

  // Shuffle button state
  const btnShuffle = document.getElementById("btnShuffleAlbum");
  btnShuffle.classList.toggle("active", shuffleActive);

  // Play album button
  document.getElementById("btnPlayAlbum").onclick = () => {
    shuffleActive = false;
    btnShuffle.classList.remove("active");
    playAlbumFromStart(album);
  };

  // Shuffle button
  btnShuffle.onclick = () => {
    shuffleActive = !shuffleActive;
    btnShuffle.classList.toggle("active", shuffleActive);
    playAlbumShuffle(album);
  };

  // Tracklist
  renderTracklist(album);
}

function renderTracklist(album) {
  const container = document.getElementById("tracklistRows");
  if (!container) return;

  const liked = getLiked();

  container.innerHTML = album.songs.map((song, i) => {
    const isActive = currentAlbum?.id === album.id && currentSongIdx === i;
    const rowCover = song.cover || album.cover;
    return `
      <div class="album-track-row ${isActive ? "is-playing" : ""}" data-idx="${i}" tabindex="0" role="button" aria-label="Reproducir ${song.title}">
        <div class="album-track-num-wrap">
          <span class="album-track-num">${i + 1}</span>
          <div class="album-track-play-icon">
            <svg viewBox="0 0 24 24" width="16" height="16"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
          <div class="album-track-bars">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </div>
        <div class="album-track-info">
          <div class="album-track-title">${song.title}</div>
          ${album.artist ? `<div class="album-track-subtitle">${album.artist}</div>` : ""}
        </div>
        <div class="album-track-right">
          <span class="album-track-dur">${song.duration || ""}</span>
          <button class="album-track-more-btn" data-idx="${i}" aria-label="Más opciones" tabindex="-1">
            <svg viewBox="0 0 24 24" width="14" height="14">
              <circle cx="12" cy="5"  r="1.2" fill="currentColor" stroke="none"/>
              <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>
              <circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }).join("");

  // Attach click events
  container.querySelectorAll(".album-track-row").forEach(row => {
    row.addEventListener("click", e => {
      if (e.target.closest(".album-track-more-btn")) return;
      const idx = parseInt(row.dataset.idx);
      playSong(album, idx);
    });
    row.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!e.target.closest(".album-track-more-btn")) {
          playSong(album, parseInt(row.dataset.idx));
        }
      }
    });
  });

  container.querySelectorAll(".album-track-more-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const idx  = parseInt(btn.dataset.idx);
      const song = album.songs[idx];
      showToast(`${song.title} — opciones próximamente`, "default");
    });
  });
}

/* ══════════════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════════════ */
function initNavigation() {
  // Topbar back button (only in albums.html standalone, not in embedded index.html)
  const topbarBackEl = document.getElementById("topbarBack");
  if (topbarBackEl) {
    topbarBackEl.addEventListener("click", () => {
      if (document.getElementById("pageAlbumDetail").style.display !== "none") {
        closeAlbumDetail();
      } else {
        window.history.back();
      }
    });
  }

  // Back to albums link
  const backToAlbumsEl = document.getElementById("backToAlbums");
  if (backToAlbumsEl) {
    backToAlbumsEl.addEventListener("click", e => {
      e.preventDefault();
      closeAlbumDetail();
    });
  }

  // Browser back/forward
  window.addEventListener("popstate", () => {
    const params  = new URLSearchParams(window.location.search);
    const albumId = params.get("id");
    if (albumId) {
      const album = albums.find(a => a.id === albumId);
      if (album) {
        document.getElementById("pageAlbumsList").style.display = "none";
        document.getElementById("pageAlbumDetail").style.display = "";
        const titleEl = document.getElementById("topbarTitle");
        if (titleEl) titleEl.textContent = album.title;
        renderAlbumDetail(album);
      }
    } else {
      document.getElementById("pageAlbumsList").style.display = "";
      document.getElementById("pageAlbumDetail").style.display = "none";
      const titleEl = document.getElementById("topbarTitle");
      if (titleEl) titleEl.textContent = "Álbumes";
      document.getElementById("albumDetailBg").style.display = "none";
      renderAlbumsList();
    }
  });
}

/* ══════════════════════════════════════════════════════
   BOOT
══════════════════════════════════════════════════════ */
function boot() {
  ensureAudio();
  // Skip injecting the album mini player when embedded in index.html
  // (index.html has its own mini player via script.js)
  if (!window._albumJsEmbedded) {
    injectMiniPlayer();
  }
  initNavigation();

  // Update visible debug panel
  try { updateDebugPanel('boot() running — embedded=' + !!window._albumJsEmbedded); } catch(e) {}

  // Check URL params — might be a direct deep link
  const params  = new URLSearchParams(window.location.search);
  const albumId = params.get("id");

  if (albumId) {
    const album = albums.find(a => a.id === albumId);
    if (album) {
      document.getElementById("pageAlbumsList").style.display = "none";
      document.getElementById("pageAlbumDetail").style.display = "";
      const titleEl = document.getElementById("topbarTitle");
      if (titleEl) titleEl.textContent = album.title;
      renderAlbumDetail(album);
    } else {
      // Album not found
      document.getElementById("pageAlbumDetail").style.display = "";
      document.getElementById("pageAlbumsList").style.display = "none";
      const albumTracklist = document.getElementById("albumTracklist");
      if (albumTracklist) albumTracklist.innerHTML = `
        <div class="album-not-found">
          <h2>Álbum no encontrado</h2>
          <p>El álbum <em>${albumId}</em> no existe.</p>
          <a href="albums.html">← Volver a álbumes</a>
        </div>`;
    }
  } else {
    console.info('[AlbumSystem] boot -> no albumId, rendering list');
    renderAlbumsList();
    // Second attempt after a short delay to avoid race with other scripts
    setTimeout(() => {
      try { renderAlbumsList(); updateDebugPanel('renderAlbumsList re-invoked after delay'); }
      catch(e) { console.warn('[AlbumSystem] delayed render error', e); }
    }, 120);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

/* ══════════════════════════════════════════════════════
   PUBLIC API — accesible desde index.html / script.js
   Llamar window.AlbumSystem.openAlbum("id") desde la app principal
══════════════════════════════════════════════════════ */
window.AlbumSystem = {
  albums,
  openAlbum(id) {
    const album = albums.find(a => a.id === id);
    if (album) openAlbumDetail(album);
  },
  playSong,
  playAlbumFromStart,
  playAlbumShuffle,
  renderAlbumsList,
  getCurrentAlbum: () => currentAlbum,
  getCurrentSongIdx: () => currentSongIdx,
  isPlaying: () => isPlaying
};