/* ═══════════════════════════════════════════════════════════
   DROPLY — script.js
   ──────────────────────────────────────────────────────────
   CÓMO AÑADIR CONTENIDO:
   1. Añade tu archivo de audio en /music/
   2. Añade tu archivo de vídeo en /videos/
   3. Añade la portada en /covers/
   4. Añade un nuevo objeto al array `media` más abajo:
      {
        type:     "music" | "video"
        title:    "Nombre del tema",
        artist:   "Nombre del artista",
        cover:    "covers/mi-portada.jpg",
        file:     "music/mi-cancion.mp3",   ← audio
                  "videos/mi-video.mp4",     ← video
        category: "Jazz",
        duration: "3:42"   ← opcional
      }
   ──────────────────────────────────────────────────────────
   FORMATOS SOPORTADOS:
   Audio: mp3, ogg, wav, aac, flac
   Vídeo: mp4, webm, ogg
   Imágenes: jpg, jpeg, png, webp, gif
═══════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════
   1. DATA — Edita este array para añadir tu contenido
══════════════════════════════════════════════════════ */
const media = [
  {
    type:     "music",
    title:    "In Da Getto",
    artist:   "J. Balvin, Skrillex",
    cover:    "https://i.ytimg.com/vi/7aPzYlc2RY4/maxresdefault.jpg",
    file:     "./music/indagetto.mp3",
    category: "Reggaeton",
    duration: "2:10"
  },
  {
    type:     "music",
    title:    "I'm Good (Blue)",
    artist:   "David Guetta, Bebe Rexha",
    cover:    "https://m.media-amazon.com/images/I/51R8fS3ESYL._UXNaN_FMjpg_QL85_.jpg",
    file:     "./Music/imgood.mp3",
    category: "Electronic",
    duration: "2:57"
  },
  {
    type:     "music",
    title:    "FADE",
    artist:   "Alesso, Pendulum",
    cover:    "https://i.scdn.co/image/ab67616d0000b273dcbb69d4be6c29c0be851f32",
    file:     "./Music/fade.mp3",
    category: "Electronic",
    duration: "3:03"
  },
  {
    type:     "music",
    title:    "Enzaciao",
    artist:   "Clarent",
    cover:    "https://i.scdn.co/image/ab67616d0000b27386b1784848d2cc7ccd58e05e",
    file:     "./Music/enzaciao.mp3",
    category: "Reggaeton",
    duration: "2:05"
  },
  {
    type:     "music",
    title:    "Désenchantée",
    artist:   "Kate Ryan",
    cover:    "https://i.scdn.co/image/ab67616d00001e02b8faab714250452ae5ea2122",
    file:     "./Music/desenchante.mp3",
    category: "90s",
    duration: "3:40"
  },
  {
    type:     "music",
    title:    "Azukita",
    artist:   "Steve Aoki, Daddy Yankee, Play-N-Skillz & Elvis Crespo",
    cover:    "https://i.ytimg.com/vi/mGN3kfEk_P4/maxresdefault.jpg",
    file:     "./Music/azukita.mp3",
    category: "Reggaeton",
    duration: "3:46"
  },
  {
    type:     "music",
    title:    "Atlantis",
    artist:   "Netherworld",
    cover:    "https://m.media-amazon.com/images/I/51R59lHZtYL._UXNaN_FMjpg_QL85_.jpg",
    file:     "./Music/atlantis.mp3",
    category: "Electronic",
    duration: "2:26"
  },
  {
    type:     "music",
    title:    "Ecuador",
    artist:   "SASH",
    cover:    "https://m.media-amazon.com/images/I/71Vx2arL6vL._UF894,1000_QL80_.jpg",
    file:     "./Music/ecuador.mp3",
    category: "Electronic",
    duration: "5:25"
  },
  {
    type:     "music",
    title:    "Freed from desire",
    artist:   "GALA",
    cover:    "https://cdn-images.dzcdn.net/images/cover/ba8311a74318c401fb64d7594018f44d/0x1900-000000-80-0-0.jpg",
    file:     "./Music/frefromdesier.mp3",
    category: "90s",
    duration: "3:35"
  },
  {
    type:     "music",
    title:    "Que Calor (Remix)",
    artist:   "Major Lazer, J Balvin, El Alfa",
    cover:    "https://i.scdn.co/image/ab67616d0000b2739380d5f0cd2e17fdb7c1109c",
    file:     "./Music/quecalor.mp3",
    category: "Reggaeton",
    duration: "2:50"
  },
  {
    type:     "music",
    title:    "Classy 101",
    artist:   "FEID, YOUNG MIKO",
    cover:    "https://m.media-amazon.com/images/I/61vTly9zD+L._UXNaN_FMjpg_QL85_.jpg",
    file:     "./Music/classy.mp3",
    category: "Reggaeton",
    duration: "3:15"
  },
   {
    type:     "music",
    title:    "BADGYAL",
    artist:   "SAIKO, JC Reyes, Dei V",
    cover:    "https://i1.sndcdn.com/artworks-by0H8XlmcCvzkf5u-6bxytg-t1080x1080.jpg",
    file:     "./Music/badgyal.mp3",
    category: "Reggaeton",
    duration: "4:14"
  },
   {
    type:     "music",
    title:    "Playa Del Inglés",
    artist:   "Quevedo, Myke Towers",
    cover:    "https://media.emisorasmusicales.net/wp-content/uploads/2023/02/11013844/nnn.jpg",
    file:     "./Music/playadelingles.mp3",
    category: "Reggaeton",
    duration: "4:15"
  },
   {
    type:     "music",
    title:    "Se Fue",
    artist:   "Moncho Chavea, Morad",
    cover:    "https://i.scdn.co/image/ab67616d0000b273c7b6b68108ab221bb07f5aa6",
    file:     "./Music/sefue.mp3",
    category: "Reggaeton",
    duration: "2:55"
  },
   {
    type:     "music",
    title:    "RITMO",
    artist:   "Black Eyed Peas, J Balvin",
    cover:    "https://i.ytimg.com/vi/C9xrAJ_rmBw/maxresdefault.jpg",
    file:     "./Music/ritmo.mp3",
    category: "Reggaeton",
    duration: "3:38"
  },
   {
    type:     "music",
    title:    "International Love",
    artist:   "Pitbull, Chris Brown",
    cover:    "https://i.ytimg.com/vi/OLqaMYc9LFE/maxresdefault.jpg",
    file:     "./Music/internationallove.mp3",
    category: "Dance-Pop",
    duration: "4:08"
  },
   {
    type:     "music",
    title:    "Hey Baby",
    artist:   "Pitbull, T-Pain",
    cover:    "https://i1.sndcdn.com/artworks-000033071708-e6mxid-t500x500.jpg",
    file:     "./Music/heybaby.mp3",
    category: "Dance-Pop",
    duration: "3:24"
  },
    {
    type:     "music",
    title:    "Give Me Everything",
    artist:   "Pitbull, Ne-Yo, Afrojack, Nayer",
    cover:    "https://i1.sndcdn.com/artworks-haGUy7OWdKcoRgMH-Zglw6A-t1080x1080.jpg",
    file:     "./Music/givemeeverything.mp3",
    category: "Dance-Pop",
    duration: "4:26"
  },
    {
    type:     "music",
    title:    "On The Floor",
    artist:   "Jennifer Lopez, Pitbull",
    cover:    "https://i.scdn.co/image/ab67616d0000b2735c7fdd07d99c156401073aaa",
    file:     "./Music/onthefloor.mp3",
    category: "Dance-Pop",
    duration: "4:26"
  },
    {
    type:     "music",
    title:    "Feel This Moment",
    artist:   "Christina Aguilera, Pitbull",
    cover:    "https://m.media-amazon.com/images/I/9197wAEPZcL._UF894,1000_QL80_.jpg",
    file:     "./Music/feelthismoment.mp3",
    category: "Dance-Pop",
    duration: "3:46"
  },
    {
    type:     "music",
    title:    "Fireball",
    artist:   "John Ryan, Pitbull",
    cover:    "https://m.media-amazon.com/images/I/71aqqhM+cFL._UF894,1000_QL80_.jpg",
    file:     "./Music/fireball.mp3",
    category: "Dance-Pop",
    duration: "4:01"
  },
    {
    type:     "music",
    title:    "MUCHACHA",
    artist:   "AISSA, RVFV",
    cover:    "https://i.scdn.co/image/ab67616d0000b273bf3151af9c5e4d7c1de59ae9",
    file:     "./Music/muchacha.mp3",
    category: "Reggaeton",
    duration: "2:48"
  },





























 {
    type:     "music",
    title:    "Dema Ga Ge Gi Go Gu",
    artist:   "Bad Bunny, El Alfa",
    cover:    "https://i1.sndcdn.com/artworks-000287886533-fxhmn2-t500x500.jpg",
    file:     "./Music/demaga.mp3",
    category: "Reggaeton",
    duration: "3:38"
  },



















 {
    type:     "music",
    title:    "Happy Birthday",
    artist:   "Tempo, El Alfa",
    cover:    "https://i.scdn.co/image/ab67616d0000b2736e3e2d32da74925922b4976f",
    file:     "./Music/happy.mp3",
    category: "Reggaeton",
    duration: "2:37"
  },















 {
    type:     "music",
    title:    "Taki Taki",
    artist:   "DJ Snake, Selena Gomez, Ozuna, Cardi B",
    cover:    "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2018/09/28/15381371183299.jpg",
    file:     "./Music/takitaki.mp3",
    category: "Reggaeton",
    duration: "3:51"
  },
 {
    type:     "music",
    title:    "6 AM",
    artist:   "J Balvin, Farruko",
    cover:    "https://i1.sndcdn.com/artworks-000083532431-1yokz6-t1080x1080.jpg",
    file:     "./Music/6am.mp3",
    category: "Reggaeton",
    duration: "4:38"
  },
   {
    type:     "music",
    title:    "Pepas",
    artist:   "Farruko",
    cover:    "https://i.scdn.co/image/ab67616d0000b2733e3957dcca26c5f4ecf015ad",
    file:     "./Music/pepas.mp3",
    category: "Reggaeton",
    duration: "4:54"
  },
   {
    type:     "music",
    title:    "DÁKITI",
    artist:   "BAD BUNNY, JHAY CORTEZ",
    cover:    "https://i.ytimg.com/vi/2x9aY0QJR04/maxresdefault.jpg",
    file:     "./Music/dakiti.mp3",
    category: "Reggaeton",
    duration: "3:33"
  },
































  


  

];

/* ══════════════════════════════════════════════════════
   2. STATE
══════════════════════════════════════════════════════ */
let currentFilter   = "all";
let currentSearch   = "";
let currentTrackIdx = -1;
let isPlaying       = false;
let playlist        = [];  // audio-only items for prev/next

const audioEl = document.getElementById("mainAudio");

/* ══════════════════════════════════════════════════════
   3. DOM REFS
══════════════════════════════════════════════════════ */
const mediaGrid     = document.getElementById("mediaGrid");
const catInner      = document.querySelector(".cat-inner");
const sectionTitle  = document.getElementById("sectionTitle");
const countBadge    = document.getElementById("countBadge");
const searchInput   = document.getElementById("searchInput");
const modalOverlay  = document.getElementById("modalOverlay");
const modalInner    = document.getElementById("modalInner");
const modalClose    = document.getElementById("modalClose");
const bottomPlayer  = document.getElementById("bottomPlayer");
const bpPlay        = document.getElementById("bpPlay");
const bpPrev        = document.getElementById("bpPrev");
const bpNext        = document.getElementById("bpNext");
const bpClose       = document.getElementById("bpClose");
const bpCover       = document.getElementById("bpCover");
const bpTitle       = document.getElementById("bpTitle");
const bpArtist      = document.getElementById("bpArtist");
const bpBar         = document.getElementById("bpBar");
const bpFill        = document.getElementById("bpFill");
const bpThumb       = document.getElementById("bpThumb");
const bpCurrent     = document.getElementById("bpCurrent");
const bpDuration    = document.getElementById("bpDuration");
const navbar        = document.getElementById("navbar");
const hamburger     = document.getElementById("hamburger");
const navLinks      = document.getElementById("navLinks");
const heroExplore   = document.getElementById("heroExplore");
const gridSection   = document.getElementById("gridSection");

/* ══════════════════════════════════════════════════════
   4. HELPERS
══════════════════════════════════════════════════════ */
function getCategories() {
  const cats = [...new Set(media.map(m => m.category))].sort();
  return cats;
}

function filteredMedia() {
  return media.filter(item => {
    const matchFilter =
      currentFilter === "all"        ? true :
      currentFilter === "music"      ? item.type === "music" :
      currentFilter === "video"      ? item.type === "video" :
      currentFilter === "categories" ? true :
      item.category.toLowerCase() === currentFilter.toLowerCase();

    const q = currentSearch.toLowerCase().trim();
    const matchSearch = q === "" || [item.title, item.artist, item.category].some(s =>
      s.toLowerCase().includes(q)
    );

    return matchFilter && matchSearch;
  });
}

function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2,"0")}`;
}

function svgPlay() {
  return `<svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>`;
}
function svgPause() {
  return `<svg viewBox="0 0 24 24"><rect x="6" y="3" width="4" height="18"/><rect x="14" y="3" width="4" height="18"/></svg>`;
}
function svgPlayLg() {
  return `<svg viewBox="0 0 24 24" style="fill:currentColor;stroke:none"><polygon points="5,3 19,12 5,21"/></svg>`;
}
function svgVideo() {
  return `<svg viewBox="0 0 24 24"><polygon points="23,7 16,12 23,17"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`;
}

function getPlaceholderCover(category = "music") {
  const colors = {
    Synthwave: "#ff006e", Ambient: "#1f77b4", Jazz: "#d62728",
    "Lo-Fi": "#2ca02c", Acción: "#ff7f0e", "Sci-Fi": "#9467bd",
    Indie: "#e94f4f", Electrónico: "#17becf", Clásico: "#bcbd22",
    Documental: "#7f7f7f", Naturaleza: "#2ecc71", "Hip-Hop": "#1a1a1a",
    House: "#ff1493", Teaser: "#00bfff"
  };
  const bg = colors[category] || "#e94f4f";
  const icon = category === "Acción" || category === "Sci-Fi" || category === "Teaser" ? "▶" : "♪";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="${bg}" width="400" height="400"/><text x="50%" y="50%" font-size="80" text-anchor="middle" dominant-baseline="middle" fill="white" opacity=".4">${icon}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/* ══════════════════════════════════════════════════════
   5. BUILD UI
══════════════════════════════════════════════════════ */
function buildCategoryPills() {
  // Remove old dynamic pills
  catInner.querySelectorAll(".cat-pill:not([data-cat='all']):not([data-cat='music']):not([data-cat='video'])").forEach(p => p.remove());

  const existing = [...catInner.querySelectorAll(".cat-pill")].map(p => p.dataset.cat);
  if (!existing.includes("music")) addPill("Música", "music");
  if (!existing.includes("video")) addPill("Vídeos", "video");

  getCategories().forEach(cat => {
    if (!catInner.querySelector(`[data-cat="${cat}"]`)) {
      addPill(cat, cat);
    }
  });

  catInner.querySelectorAll(".cat-pill").forEach(p => {
    p.addEventListener("click", () => {
      currentFilter = p.dataset.cat;
      catInner.querySelectorAll(".cat-pill").forEach(x => x.classList.remove("active"));
      p.classList.add("active");
      renderGrid();
      updateNavLinks();
    });
  });
}

function addPill(label, value) {
  const btn = document.createElement("button");
  btn.className = "cat-pill";
  btn.dataset.cat = value;
  btn.textContent = label;
  catInner.appendChild(btn);
}

function updateNavLinks() {
  navLinks.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
  const map = { all:"all", music:"music", video:"video", categories:"categories" };
  navLinks.querySelectorAll(".nav-link").forEach(l => {
    if ((l.dataset.filter || "all") === currentFilter ||
        (currentFilter === "all" && l.dataset.filter === "all") ||
        (l.dataset.filter === "categories" && !["all","music","video"].includes(currentFilter))
    ) {
      l.classList.add("active");
    }
  });
}

function renderGrid() {
  const items = filteredMedia();
  mediaGrid.innerHTML = "";
  playlist = media.filter(m => m.type === "music");

  // Section title
  const labels = {
    all: "Todo el contenido",
    music: "Música",
    video: "Vídeos",
    categories: "Por Categorías"
  };
  sectionTitle.textContent = labels[currentFilter] || currentFilter;
  countBadge.textContent = `${items.length} item${items.length !== 1 ? "s" : ""}`;

  if (items.length === 0) {
    mediaGrid.innerHTML = `
      <div class="no-results fade-in">
        <h3>Sin resultados</h3>
        <p>Prueba con otro término o categoría.</p>
      </div>`;
    return;
  }

  items.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "media-card fade-in";
    card.dataset.idx = media.indexOf(item);
    const cover = item.cover || getPlaceholderCover(item.category);

    card.innerHTML = `
      <div class="card-cover">
        <img src="${cover}" alt="${item.title}" loading="lazy"
          onerror="this.src='${getPlaceholderCover(item.category)}'" />
        <span class="card-type-badge ${item.type === "music" ? "badge-music" : "badge-video"}">
          ${item.type === "music" ? "♪ Música" : "▶ Vídeo"}
        </span>
        <div class="card-play-overlay">
          <div class="play-circle">${svgPlayLg()}</div>
        </div>
      </div>
      <div class="card-body">
        <p class="card-category">${item.category}</p>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-artist">${item.artist}</p>
      </div>
      <div class="card-footer">
        <button class="card-play-btn" data-idx="${media.indexOf(item)}">
          ${item.type === "music" ? svgPlayLg() : svgVideo()}
          ${item.type === "music" ? "Escuchar" : "Ver vídeo"}
        </button>
        ${item.duration ? `<span class="card-dur">${item.duration}</span>` : ""}
      </div>`;

    card.querySelector(".card-play-btn").addEventListener("click", e => {
      e.stopPropagation();
      const idx = parseInt(e.currentTarget.dataset.idx);
      openModal(media[idx]);
    });

    card.addEventListener("click", () => openModal(item));
    mediaGrid.appendChild(card);
  });
}

/* ══════════════════════════════════════════════════════
   6. MODAL
══════════════════════════════════════════════════════ */
function openModal(item) {
  const cover = item.cover || getPlaceholderCover(item.category);

  if (item.type === "music") {
    modalInner.innerHTML = `
      <div class="modal-music">
        <img class="modal-cover" src="${cover}" alt="${item.title}"
          onerror="this.src='${getPlaceholderCover(item.category)}'" />
        <div class="modal-info">
          <p class="modal-category-tag">${item.category}</p>
          <h2 class="modal-title">${item.title}</h2>
          <p class="modal-artist">${item.artist}</p>
        </div>
        <div class="modal-player-controls">
          <button class="modal-control-btn" id="modalPrev" title="Anterior">&#9664;&#9664;</button>
          <button class="modal-control-btn modal-play-btn" id="modalPlay" title="Play/Pause">&#9654;</button>
          <button class="modal-control-btn" id="modalNext" title="Siguiente">&#9654;&#9654;</button>
        </div>
        <div class="modal-progress">
          <span class="modal-time" id="modalCurrent">0:00</span>
          <div class="modal-bar" id="modalBar">
            <div class="modal-fill" id="modalFill"></div>
          </div>
          <span class="modal-time" id="modalDuration">0:00</span>
        </div>
        <p class="modal-file-hint">📁 Archivo: <code>${item.file}</code></p>
      </div>`;

    // Setup modal controls
    setupModalControls();

    // Load in bottom player
    loadBottomPlayer(item);
  } else {
    modalInner.innerHTML = `
      <div class="modal-music">
        <div class="modal-video-wrap">
          <video controls src="${item.file}" poster="${cover}">
            Tu navegador no soporta vídeo HTML5.
          </video>
        </div>
        <p class="modal-file-hint">📁 Archivo: <code>${item.file}</code></p>
        <div class="modal-info">
          <p class="modal-category-tag">${item.category}</p>
          <h2 class="modal-title">${item.title}</h2>
          <p class="modal-artist">${item.artist}</p>
        </div>
      </div>`;

    const modalVideo = modalInner.querySelector('video');
    modalVideo.addEventListener('error', () => {
      modalVideo.insertAdjacentHTML('afterend', `<p class="modal-error">No se pudo cargar el vídeo. Revisa la ruta o usa una URL válida.</p>`);
    });
  }

  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
  // Pause any modal media
  const v = modalInner.querySelector("video");
  const a = modalInner.querySelector("audio");
  if (v) v.pause();
  if (a) a.pause();
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", e => { if (e.target === modalOverlay) closeModal(); });

/* ══════════════════════════════════════════════════════
   7. BOTTOM PLAYER
══════════════════════════════════════════════════════ */
function loadBottomPlayer(item) {
  if (item.type !== "music") return;

  const cover = item.cover || getPlaceholderCover(item.category);
  bpCover.src = cover;
  bpTitle.textContent = item.title;
  bpArtist.textContent = item.artist;

  currentTrackIdx = playlist.findIndex(p =>
    p.title === item.title && p.artist === item.artist
  );

  audioEl.src = item.file;
  audioEl.load();
  audioEl.play().then(() => {
    isPlaying = true;
    bpPlay.innerHTML = "&#10074;&#10074;";
    setupMediaSession(item);
  }).catch((err) => {
    // File not found or blocked – still show player UI
    isPlaying = false;
    bpPlay.innerHTML = "&#9654;";
    console.warn(`[DROPLY] No se pudo reproducir: "${item.file}". Asegúrate de que el archivo está en la carpeta correcta junto al index.html.`, err);
  });

  bottomPlayer.classList.add("visible");
  
  // Update modal if it's open
  updateModalContent(item);
}

bpPlay.addEventListener("click", () => {
  if (audioEl.paused) {
    audioEl.play();
    isPlaying = true;
    bpPlay.innerHTML = "&#10074;&#10074;";
  } else {
    audioEl.pause();
    isPlaying = false;
    bpPlay.innerHTML = "&#9654;";
  }
});

bpPrev.addEventListener("click", () => {
  if (playlist.length === 0) return;
  currentTrackIdx = (currentTrackIdx - 1 + playlist.length) % playlist.length;
  loadBottomPlayer(playlist[currentTrackIdx]);
});

bpNext.addEventListener("click", () => {
  if (playlist.length === 0) return;
  currentTrackIdx = (currentTrackIdx + 1) % playlist.length;
  loadBottomPlayer(playlist[currentTrackIdx]);
});

bpClose.addEventListener("click", () => {
  audioEl.pause();
  audioEl.src = "";
  isPlaying = false;
  bottomPlayer.classList.remove("visible");
  bpPlay.innerHTML = "&#9654;";
});

// Progress bar
audioEl.addEventListener("timeupdate", () => {
  if (!audioEl.duration) return;
  const pct = (audioEl.currentTime / audioEl.duration) * 100;
  bpFill.style.width = pct + "%";
  bpThumb.style.left  = pct + "%";
  bpCurrent.textContent  = formatTime(audioEl.currentTime);
  bpDuration.textContent = formatTime(audioEl.duration);
});

audioEl.addEventListener("ended", () => {
  if (playlist.length > 0) {
    currentTrackIdx = (currentTrackIdx + 1) % playlist.length;
    loadBottomPlayer(playlist[currentTrackIdx]);
  }
});

bpBar.addEventListener("click", e => {
  const rect = bpBar.getBoundingClientRect();
  const pct  = (e.clientX - rect.left) / rect.width;
  if (audioEl.duration) {
    audioEl.currentTime = pct * audioEl.duration;
  }
});

/* ══════════════════════════════════════════════════════
   8. SEARCH
══════════════════════════════════════════════════════ */
let searchTimeout;
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentSearch = searchInput.value;
    renderGrid();
  }, 220);
});

/* ══════════════════════════════════════════════════════
   9. NAV FILTER LINKS
══════════════════════════════════════════════════════ */
navLinks.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const filter = link.dataset.filter || "all";
    currentFilter = filter;

    navLinks.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    // Sync category pills
    catInner.querySelectorAll(".cat-pill").forEach(p => {
      p.classList.toggle("active", p.dataset.cat === filter);
    });

    renderGrid();
    gridSection.scrollIntoView({ behavior: "smooth", block: "start" });

    // Close mobile menu
    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
  });
});

/* ══════════════════════════════════════════════════════
   10. HAMBURGER
══════════════════════════════════════════════════════ */
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

/* ══════════════════════════════════════════════════════
   11. HERO BUTTON
══════════════════════════════════════════════════════ */
heroExplore.addEventListener("click", () => {
  gridSection.scrollIntoView({ behavior: "smooth" });
});

/* ══════════════════════════════════════════════════════
   12. NAVBAR SCROLL EFFECT
══════════════════════════════════════════════════════ */
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

/* ══════════════════════════════════════════════════════
   13. KEYBOARD
══════════════════════════════════════════════════════ */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
  if (e.key === " " && document.activeElement.tagName !== "INPUT") {
    e.preventDefault();
    bpPlay.click();
  }
});

/* ══════════════════════════════════════════════════════
   14. ANIMATED WAVEFORM (hero decoration)
══════════════════════════════════════════════════════ */
function animateWaveform() {
  const bars = document.querySelectorAll(".hc1 .hc-bar");
  if (bars.length === 0) {
    setTimeout(animateWaveform, 600 + Math.random() * 400);
    return;
  }
  bars.forEach(bar => {
    const h = 20 + Math.random() * 50;
    bar.style.height = h + "px";
  });
  setTimeout(animateWaveform, 600 + Math.random() * 400);
}

/* ══════════════════════════════════════════════════════
   16. MEDIA SESSION (para reproducción con pantalla apagada)
══════════════════════════════════════════════════════ */
function setupMediaSession(item) {
  if ('mediaSession' in navigator) {
    const cover = item.cover || getPlaceholderCover(item.category);
    
    navigator.mediaSession.metadata = new MediaMetadata({
      title: item.title,
      artist: item.artist,
      album: item.category,
      artwork: [
        { src: cover, sizes: '96x96', type: 'image/jpeg' },
        { src: cover, sizes: '128x128', type: 'image/jpeg' },
        { src: cover, sizes: '192x192', type: 'image/jpeg' },
        { src: cover, sizes: '256x256', type: 'image/jpeg' },
        { src: cover, sizes: '384x384', type: 'image/jpeg' },
        { src: cover, sizes: '512x512', type: 'image/jpeg' },
      ]
    });

    navigator.mediaSession.setActionHandler('play', () => bpPlay.click());
    navigator.mediaSession.setActionHandler('pause', () => bpPlay.click());
    navigator.mediaSession.setActionHandler('previoustrack', () => bpPrev.click());
    navigator.mediaSession.setActionHandler('nexttrack', () => bpNext.click());
  }
}

/* ══════════════════════════════════════════════════════
   17. UPDATE MODAL CONTENT
══════════════════════════════════════════════════════ */
function updateModalContent(item) {
  const modalCover = modalInner.querySelector('.modal-cover');
  const modalTitle = modalInner.querySelector('.modal-title');
  const modalArtist = modalInner.querySelector('.modal-artist');
  const modalCategory = modalInner.querySelector('.modal-category-tag');
  
  if (modalCover) modalCover.src = item.cover || getPlaceholderCover(item.category);
  if (modalTitle) modalTitle.textContent = item.title;
  if (modalArtist) modalArtist.textContent = item.artist;
  if (modalCategory) modalCategory.textContent = item.category;
}

/* ══════════════════════════════════════════════════════
   18. MODAL CONTROLS
══════════════════════════════════════════════════════ */
function setupModalControls() {
  const modalPlay = document.getElementById('modalPlay');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');
  const modalBar = document.getElementById('modalBar');
  const modalFill = document.getElementById('modalFill');
  const modalCurrent = document.getElementById('modalCurrent');
  const modalDuration = document.getElementById('modalDuration');
  
  if (!modalPlay) return;
  
  // Sync play/pause button with main audio
  const updatePlayButton = () => {
    modalPlay.innerHTML = audioEl.paused ? '&#9654;' : '&#10074;&#10074;';
  };
  
  audioEl.addEventListener('play', updatePlayButton);
  audioEl.addEventListener('pause', updatePlayButton);
  audioEl.addEventListener('timeupdate', () => {
    if (audioEl.duration) {
      const pct = (audioEl.currentTime / audioEl.duration) * 100;
      modalFill.style.width = pct + '%';
      modalCurrent.textContent = formatTime(audioEl.currentTime);
      modalDuration.textContent = formatTime(audioEl.duration);
    }
  });
  
  modalPlay.addEventListener('click', () => {
    bpPlay.click();
  });
  
  modalPrev.addEventListener('click', () => {
    bpPrev.click();
  });
  
  modalNext.addEventListener('click', () => {
    bpNext.click();
  });
  
  modalBar.addEventListener('click', e => {
    const rect = modalBar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (audioEl.duration) {
      audioEl.currentTime = pct * audioEl.duration;
    }
  });
  
  updatePlayButton();
}

/* ══════════════════════════════════════════════════════
   19. INIT
══════════════════════════════════════════════════════ */
(function init() {
  buildCategoryPills();
  renderGrid();
  animateWaveform();
  playlist = media.filter(m => m.type === "music");
})();


