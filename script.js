/* ═══════════════════════════════════════════════════════════
   DROPLY — script.js  v4 ENHANCED
   Funciones: Cola · Playlists · Historial · Crossfade
              Toasts · Context Menu · Favorites · Shuffle/Repeat
═══════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════
   iOS / Safari AudioContext Unlock  ← FIX #2
   iOS bloquea todo audio hasta el primer gesto real.
   Este bloque lo desbloquea con el primer tap/click,
   y también reanuda cualquier track pendiente por autoplay bloqueado.
══════════════════════════════════════════════════════ */
(function iosAudioUnlock() {
  let _unlocked = false;

  function _unlock() {
    if (_unlocked) return;

    // 1. Crear y resumir un AudioContext silencioso — desbloquea la pipa de audio de iOS
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) {
        const ctx = new Ctx();
        const buf = ctx.createBuffer(1, 1, 22050);
        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.connect(ctx.destination);
        src.start(0);
        ctx.resume().catch(() => {});
      }
    } catch (e) {}

    // 2. Si había un track pendiente por autoplay bloqueado, intentar reproducirlo ahora
    const mainAudio = document.getElementById('mainAudio');
    if (mainAudio && mainAudio.src && mainAudio.paused && window._droplyPendingTrack) {
      mainAudio.play()
        .then(() => { _unlocked = true; window._droplyPendingTrack = null; })
        .catch(() => {});
    } else {
      _unlocked = true;
    }

    if (_unlocked) {
      ['touchstart', 'touchend', 'mousedown', 'keydown', 'click'].forEach(ev =>
        document.removeEventListener(ev, _unlock, true)
      );
    }
  }

  ['touchstart', 'touchend', 'mousedown', 'keydown', 'click'].forEach(ev =>
    document.addEventListener(ev, _unlock, { capture: true, passive: true })
  );
})();









/* ══════════════════════════════════════════════════════
   0. CHANGELOG — Edita este array para gestionar las
      pantallas de novedades que se muestran al abrir la app.
      Añade, edita o elimina entradas libremente.
      Se muestra la última versión no vista por el usuario.
   
   Campos:
     version  → identificador único (string)
     date     → fecha mostrada al usuario
     title    → título grande del modal
     emoji    → emoji decorativo (opcional)
     changes  → array de objetos { icon, text }
                icon puede ser: "🎵" "🎨" "🔧" "⚡" "❤️" "📱" "🆕" etc.
══════════════════════════════════════════════════════ */
const CHANGELOG = [













  {
    version: "v5.4",
    date:    "26 de Mayo 2026",
    title:   "Novedades Droply",
    emoji:   "🎶",
    changes: [
      { icon: "🎵", text: "Introducido canciones de Fito y Estopa." },
      { icon: "⚡", text: "Mejoras de rendimiento en la navegación entre páginas." },
      { icon: "🔧", text: "Varias correcciones tanto visuales como funcionales en el reproductor." }
    ]
  },
































{
  version: "v5.2",
  date:    "25 de Mayo 2026",
  title:   "Droply Redesign",
  emoji:   "✨",
  changes: [
    { 
      icon: "🎨", 
      text: "Rediseño completo de la interfaz con estilo mucho más limpio, moderno y premium." 
    },

    { 
      icon: "🫧", 
      text: "Añadido nuevo efecto glassmorphism en botones, menús y reproductor." 
    },

    { 
      icon: "📱", 
      text: "Mejorado el soporte PWA para instalación como app en móvil y escritorio." 
    },

    { 
      icon: "⚡", 
      text: "Animaciones y transiciones rehechas para una experiencia más fluida y natural." 
    },

    { 
      icon: "🎵", 
      text: "Nuevo reproductor con controles modernizados y mejor integración visual del audio." 
    },

    { 
      icon: "📚", 
      text: "Añadido sistema de biblioteca con música propia cargada por el usuario." 
    },

    { 
      icon: "💾", 
      text: "Mejorado el guardado local para que la música añadida no se pierda al recargar la app." 
    },

    { 
      icon: "🌌", 
      text: "Mejorado el fondo dinámico y la iluminación ambiental de toda la app." 
    },

    { 
      icon: "🛠️", 
      text: "Corregidos múltiples bugs visuales y problemas de reproducción en dispositivos móviles." 
    }
  ]
},

























{
  version: "v5.0",
  date:    "23 de Mayo 2026",
  title:   "Droply Redesign",
  emoji:   "✨",
  changes: [
    { 
      icon: "🎨", 
      text: "Rediseño completo de la interfaz con estilo mucho más limpio, moderno y premium." 
    },

    { 
      icon: "🫧", 
      text: "Añadido nuevo efecto glassmorphism en botones, menús y reproductor." 
    },

    { 
      icon: "📱", 
      text: "Droply ahora puede instalarse como app gracias al nuevo soporte PWA." 
    },

    { 
      icon: "⚡", 
      text: "Animaciones y transiciones rehechas para que todo se sienta más fluido." 
    },

    { 
      icon: "🎵", 
      text: "Nuevo reproductor con visuales mejorados y controles más modernos." 
    },

    { 
      icon: "🌌", 
      text: "Mejorado el fondo dinámico y la iluminación ambiental de toda la app." 
    },

    { 
      icon: "🛠️", 
      text: "Corregidos múltiples bugs visuales y pequeños errores del reproductor." 
    }
  ]
},













  {
    version: "v4.3",
    date:    "20 de Mayo 2026",
    title:   "Novedades Droply",
    emoji:   "🎶",
    changes: [
      { icon: "🎵", text: "Arreglado la reproduccion de Playlists (me costo un huevo cago en to)." },
      { icon: "⚡", text: "Mejoras de rendimiento en la navegación entre páginas." },
      { icon: "🔧", text: "Varias correcciones tanto visuales como funcionales en el reproductor." }
    ]
  },
























  /* ── Añade más versiones arriba (las más nuevas primero) ── */
  // {
  //   version: "v4.1",
  //   date:    "Abril 2026",
  //   title:   "Novedades",
  //   emoji:   "🚀",
  //   changes: [
  //     { icon: "🆕", text: "Ejemplo de cambio anterior." }
  //   ]
  // }
];

/* ─── Mostrar changelog si hay versión no vista ─────── */
const CHANGELOG_SEEN_KEY = "droply_changelog_seen";
function getSeenVersion()  { return localStorage.getItem(CHANGELOG_SEEN_KEY) || ""; }
function markVersionSeen(v){ localStorage.setItem(CHANGELOG_SEEN_KEY, v); }

function initChangelog() {
  if (!CHANGELOG || CHANGELOG.length === 0) return;
  const latest = CHANGELOG[0];

  // Renderizar en el perfil (siempre visible)
  const profileVersion = document.getElementById("profileClVersion");
  const profileList = document.getElementById("profileClList");

  if (profileVersion) profileVersion.textContent = latest.version;
  if (profileList) {
    profileList.innerHTML = (latest.changes || []).map(c =>
      `<li class="cl-item"><span class="cl-icon">${c.icon || "•"}</span><span class="cl-text">${c.text}</span></li>`
    ).join("");
  }

  // Si no se ha visto la versión, podemos destacar la sección o mostrar un aviso
  if (getSeenVersion() !== latest.version) {
    // Podríamos añadir una clase 'new' para resaltar
    const section = document.getElementById("profileChangelogSection");
    if (section) section.classList.add("has-update");
    
    // Al entrar a la página de perfil, marcar como visto
    // Esto se manejará en showPage('pageProfile')
  }
}



/* ══════════════════════════════════════════════════════
   1. DATA
══════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────
   FOTOS DE ARTISTAS
   Añade aquí la URL de la foto de cada artista.
   La clave es el nombre del artista TAL COMO aparece
   en el campo "artist" de las canciones (o la parte
   principal antes de la coma si tiene varios artistas).
   Si un artista no tiene foto aquí se usará la portada
   de una de sus canciones como hasta ahora.

   Ejemplos:
     "J Balvin":     "https://...",
     "Bad Bunny":    "https://...",
     "Morad":        "https://...",
─────────────────────────────────────────────────────── */
const ARTIST_PHOTOS = {
  // ── Añade aquí las fotos de los artistas ──────────
  // "Nombre del artista": "https://url-de-la-foto.jpg",

  "Coldplay":    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Coldplay_-_Rock_in_Rio_2022.jpg/400px-Coldplay_-_Rock_in_Rio_2022.jpg",




"A Touch Of Class":     "https://cdn-images.dzcdn.net/images/cover/1cbc3fe3abdbcbb88ca5cc50f6845b0d/1900x1900-000000-81-0-0.jpg",

"ABBA":     "https://cdn-images.dzcdn.net/images/cover/065db5953bf46f833dc6b3ca5dba2a51/1900x1900-000000-80-0-0.jpg",

"Ace of Base":     "https://cdn-images.dzcdn.net/images/artist/038b073fec58dc1783f64f96ba2ef14d/1900x1900-000000-80-0-0.jpg",

"Afrojack":     "https://i.scdn.co/image/ab6761610000517456591d5d8219e6e506096c41",

"AKDO":     "https://i.scdn.co/image/ab67616100005174e4c142124c270d224eea148f",

"Alex Gaudino":     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvPuV507QliAcax0C2jj6OTc0Z9-VFemNnQQ&s",


"Alesso":     "https://i.scdn.co/image/ab6761610000e5eb42b3fb34e3451c79c55cbe73",

"Alice Deejay":     "https://artist99.cdn107.com/420/42012b0680c71a11d9c30584a5185f78_xl.jpg",

"Anitta":     "https://cdn0.celebritax.com/sites/default/files/styles/square_700x700/public/1648142414-anitta-celebra-exito-su-hit-envolver-spotify-haciendo-su-popular-paso-baile-palabras.jpg",



"Anuel AA":     "https://cdn-images.dzcdn.net/images/artist/d128822eb60817b362b9d6e8c696e933/1900x1900-000000-81-0-0.jpg",


"Aqua":     "https://egebotiga.com/wp-content/uploads/2024/02/aqua-aquarium-25-annuversary-COMPRAR-VINILO.jpg",


"Arcángel":     "https://i.scdn.co/image/ffaac96035a6cba4a0d19cab070bd3cd4f5fe287",


"AISSA":     "https://conciertos.club/doc/a/2023/a_aissa.jpg",


"Bad Bunny":     "https://i.scdn.co/image/ab6761610000517481f47f44084e0a09b5f0fa13",


"Bebe Rexha":     "https://bi.org/wp-content/uploads/2021/10/featured-famous-bi-bebe-rexha-1-1024x1024.jpg",




















"Becky G":           "https://cdn-images.dzcdn.net/images/cover/b6d13738038b285630370f5be059380f/0x1900-000000-80-0-0.jpg",
  "Bee Gees":          "https://m.media-amazon.com/images/M/MV5BZmU5M2E3M2MtM2M5My00YTI2LThkNDktNjk5MGE2NzAxNTZlXkEyXkFqcGc@._V1_.jpg",
  "Beny Jr":           "https://i.scdn.co/image/ab67616d0000b27345e6bba1ac0c5b54a9ee8121",
  "Black Eyed Peas":   "https://i.ytimg.com/vi/C9xrAJ_rmBw/maxresdefault.jpg",
  "Blessd":            "https://m.media-amazon.com/images/I/31P5CYOaluL._UXNaN_FMjpg_QL85_.jpg",
  "Cardi B":           "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2018/09/28/15381371183299.jpg",
  "Carlos Vives":      "https://i.scdn.co/image/ab67616d0000b273e588b4129b0afd8595ac55b0",
  "Chencho Corleone":  "https://i.scdn.co/image/ab67616d0000b273c32233e3541a756a90880fb1",
  "Chris Brown":       "https://i.ytimg.com/vi/OLqaMYc9LFE/maxresdefault.jpg",
  "Christina Aguilera": "https://m.media-amazon.com/images/I/9197wAEPZcL._UF894,1000_QL80_.jpg",
  "Clarent":           "https://i.scdn.co/image/ab67616d0000b27386b1784848d2cc7ccd58e05e",
  "Corona":            "https://cdn-images.dzcdn.net/images/cover/b3442cde5c53baa308dd569b5dbd46c1/1900x1900-000000-81-0-0.jpg",
  "Cris MJ":           "https://i.scdn.co/image/ab67616d0000b273c4583f3ad76630879a75450a",
  "Crystal Waters":    "https://cdn-images.dzcdn.net/images/cover/3cd44e7420b88ced60beb8daea52b11a/0x1900-000000-80-0-0.jpg",
  "Cyril Kamer":       "https://i.scdn.co/image/ab67616d0000b2733e242bdd9632c6a49a693b1b",
  "Daddy Yankee":      "https://i.ytimg.com/vi/mGN3kfEk_P4/maxresdefault.jpg",
  "Danny Ocean":       "https://cdn-images.dzcdn.net/images/cover/2312f5f5d53b0fb5238a4bc58d2f6cf6/1900x1900-000000-81-0-0.jpg",
  "Darell":            "https://m.media-amazon.com/images/I/41H6GkRuYiL._UXNaN_FMjpg_QL85_.jpg",
  "David Guetta":      "https://m.media-amazon.com/images/I/51R8fS3ESYL._UXNaN_FMjpg_QL85_.jpg",
  "De La Rose":        "https://images.genius.com/9b4acd648c12aa172b1b4ec9f8eaf4da.1000x1000x1.png",
  "Dei V":             "https://i1.sndcdn.com/artworks-by0H8XlmcCvzkf5u-6bxytg-t1080x1080.jpg",
  "DELLAFUENTE":       "https://i.scdn.co/image/ab67616d0000b2731a176de75067ededc26ad96d",
  "Dennis DJ":         "https://s.mxmcdn.net/images-storage/albums2/4/7/9/3/2/5/87523974_500_500.jpg",
  "DJ Snake":          "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2018/09/28/15381371183299.jpg",
  "Don Miguelo":       "https://i.ytimg.com/vi/16nZ6K7sim4/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgWyhLMA8=&rs=AOn4CLAm5BKIjd4rwtUHQHFpRU5wZArpbA",
  "Edward Maya":       "https://i.scdn.co/image/ab67616d0000b273edd7dc7bf5f7c39d3e132490",
  "El Alfa":           "https://i.scdn.co/image/ab67616d0000b2739380d5f0cd2e17fdb7c1109c",
  "El Bobe":           "https://i.scdn.co/image/ab67616d0000b273412a45f6d65252ae3d1fac4c",
  "El Bogueto":        "https://cdn-images.dzcdn.net/images/cover/e62f70e7b366e618da1cbf0eed47de8c/0x1900-000000-80-0-0.jpg",
  "El Guincho":        "https://images.genius.com/a8b0efd41e6a43091837da78850cf312.1000x1000x1.png",
  "Eloy":              "https://i.scdn.co/image/ab67616d0000b273da7076e371c7859fbb2e18fd",
  "Elton John":        "https://i.scdn.co/image/ab67616d0000b27373fd9802ec887972ecdacac2",
  "Emilia":            "https://s.mxmcdn.net/images-storage/albums2/4/7/9/3/2/5/87523974_500_500.jpg",
  "Farruko":           "https://i1.sndcdn.com/artworks-000083532431-1yokz6-t1080x1080.jpg",
  "FEID":              "https://m.media-amazon.com/images/I/61vTly9zD+L._UXNaN_FMjpg_QL85_.jpg",
  "FloyyMenor":        "https://i.scdn.co/image/ab67616d0000b273c4583f3ad76630879a75450a",
  "Fuerza Regida":     "https://cdn-images.dzcdn.net/images/cover/e62f70e7b366e618da1cbf0eed47de8c/0x1900-000000-80-0-0.jpg",
  "Fronti":            "https://akamai.sscdn.co/uploadfile/letras/albuns/b/3/4/0/4332821765558369.jpg",
  "GALA":              "https://cdn-images.dzcdn.net/images/cover/ba8311a74318c401fb64d7594018f44d/0x1900-000000-80-0-0.jpg",
  "Gente De Zona":     "https://images.genius.com/cf43fd45336758c065537970f6a79f96.1000x1000x1.jpg",
  "GIMS":              "https://m.media-amazon.com/images/M/MV5BZDI1NzIxMTctZTUxMi00NmY4LWEzODAtYWQ1NWEwMGE0MWFhXkEyXkFqcGc@._V1_QL75_UY190_CR31,0,190,190_.jpg",
  "GONZY":             "https://i.scdn.co/image/ab67616d0000b2735327757614a832374e491778",
  "Gote":              "https://i.scdn.co/image/ab67616d00001e02fb1041333d9a712a182acfa0",
  "Haddaway":          "https://upload.wikimedia.org/wikipedia/en/a/a8/HaddawayWhatIsLoveMaxiCDCover.jpg",
  "Hades66":           "https://i.scdn.co/image/ab67616d0000b2735cc8552f86ba4cc528968d2d",
  "Hanzel La H":       "https://akamai.sscdn.co/uploadfile/letras/albuns/b/3/4/0/4332821765558369.jpg",
  "Heuss L'enfoiré":   "https://m.media-amazon.com/images/I/51QolFGPe7L._UXNaN_FMjpg_QL85_.jpg",
  "JC Reyes":          "https://i1.sndcdn.com/artworks-by0H8XlmcCvzkf5u-6bxytg-t1080x1080.jpg",
  "Jedis":             "https://i.scdn.co/image/ab67616d00001e02fb1041333d9a712a182acfa0",
  "Jennifer Lopez":    "https://i.scdn.co/image/ab67616d0000b2735c7fdd07d99c156401073aaa",
  "Jhay Cortez":       "https://i.scdn.co/image/ab67616d00001e02005ee342f4eef2cc6e8436ab",
  "John Ryan":         "https://m.media-amazon.com/images/I/71aqqhM+cFL._UF894,1000_QL80_.jpg",
  "Jowell & Randy":    "https://i.scdn.co/image/ab67616d0000b273da7076e371c7859fbb2e18fd",
  "JuL":               "https://m.media-amazon.com/images/I/51QolFGPe7L._UXNaN_FMjpg_QL85_.jpg",
  "Justin Quiles":     "https://i.scdn.co/image/ab67616d0000b273c32233e3541a756a90880fb1",
  "Karol G":           "https://i.scdn.co/image/ab67616d0000b2735fa6dc9fc261344044c301a9",
  "Kate Ryan":         "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Kate_Ryan_-_2007.jpg/400px-Kate_Ryan_-_2007.jpg",
  "Kidd Voodoo":       "https://m.media-amazon.com/images/I/511UiqJjmZL._UXNaN_FMjpg_QL85_.jpg",
  "Kiss":              "https://i.discogs.com/ZDR0sVMA4m0HNMH-M1w8qfzxOX_9HL_t76I8QjohXcQ/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM2Njg0/NzEtMTMzOTYwMDc2/MS0zNDU2LmpwZWc.jpeg",
  "Kreamly":           "https://m.media-amazon.com/images/I/51qThLr9dIL._SX354_SY354_BL0_QL100__UXNaN_FMjpg_QL85_.jpg",
  "Kris R":            "https://m.media-amazon.com/images/I/31P5CYOaluL._UXNaN_FMjpg_QL85_.jpg",
  "La Bouche":         "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/La_Bouche_at_Rave_2011.jpg/400px-La_Bouche_at_Rave_2011.jpg",
  "Lady Gaga":         "https://i.scdn.co/image/ab67616d0000b2739ff8dea75219ec13530d97f1",
  "Las Ketchup":       "https://cdn-images.dzcdn.net/images/cover/be45674dc35c8f974a934dc3779c7b59/0x1900-000000-80-0-0.jpg",
  "Lenny Tavarez":     "https://i1.sndcdn.com/artworks-000384998541-nkcy6u-t500x500.jpg",
  "Luar La L":         "https://i.ytimg.com/vi/awbt4MRXuck/maxresdefault.jpg",
  "Luísa Sonza":       "https://s.mxmcdn.net/images-storage/albums2/4/7/9/3/2/5/87523974_500_500.jpg",
  "LVBEL C5":          "https://i.scdn.co/image/ab67616d0000b2738e675f63b19c17334f7d62d9",
  "Lunay":             "https://i.scdn.co/image/ab67616d0000b27358e34ee7bc215e1b03ff78d4",
  "Madonna":           "https://m.media-amazon.com/images/I/81Iv8WsxUwL._UF894,1000_QL80_.jpg",
  "Major Lazer":       "https://i.scdn.co/image/ab67616d0000b2739380d5f0cd2e17fdb7c1109c",
  "Maluma":            "https://i.scdn.co/image/ab67616d0000b2738e17b8d0bf76a205bba297bd",
  "Marc Anthony":      "https://images.genius.com/cf43fd45336758c065537970f6a79f96.1000x1000x1.jpg",
  "Mau":               "https://i.scdn.co/image/ab67616d0000b273f89d8cc59e29c9d2f846e903",
  "MC Menor JP":       "https://images.genius.com/60b39231e971719e4c609413d5bcc851.1000x1000x1.png",
  "Moncho Chavea":     "https://i.scdn.co/image/ab67616d0000b273c7b6b68108ab221bb07f5aa6",
  "Mora":              "https://images.genius.com/9b4acd648c12aa172b1b4ec9f8eaf4da.1000x1000x1.png",
  "Myke Towers":       "https://media.emisorasmusicales.net/wp-content/uploads/2023/02/11013844/nnn.jpg",
  "Natti Natasha":     "https://i.scdn.co/image/ab67616d0000b273d7ce6f9b0a15181635a933d9",
  "Nayer":             "https://i1.sndcdn.com/artworks-haGUy7OWdKcoRgMH-Zglw6A-t1080x1080.jpg",
  "Netherworld":       "https://m.media-amazon.com/images/I/51R59lHZtYL._UXNaN_FMjpg_QL85_.jpg",
  "Ne-Yo":             "https://i1.sndcdn.com/artworks-haGUy7OWdKcoRgMH-Zglw6A-t1080x1080.jpg",
  "Nicky Jam":         "https://i.scdn.co/image/ab67616d0000b2738e17b8d0bf76a205bba297bd",
  "Nolep":             "https://i.scdn.co/image/ab67616d00001e02fb1041333d9a712a182acfa0",
  "Noriel":            "https://m.media-amazon.com/images/I/41H6GkRuYiL._UXNaN_FMjpg_QL85_.jpg",
  "Ñengo Flow":        "https://i.scdn.co/image/ab67616d0000b2735cc8552f86ba4cc528968d2d",
  "Omar Courtz":       "https://cdn-images.dzcdn.net/images/cover/1ef9489b58a25622c2e3d2aa0473dde0/0x1900-000000-80-0-0.jpg",
  "Omar Montes":       "https://i.scdn.co/image/ab67616d0000b273412a45f6d65252ae3d1fac4c",
  "Ozuna":             "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2018/09/28/15381371183299.jpg",
  "Pendulum":          "https://i.scdn.co/image/ab67616d0000b273dcbb69d4be6c29c0be851f32",
  "Pitbull":           "https://i.ytimg.com/vi/OLqaMYc9LFE/maxresdefault.jpg",
  "Play-N-Skillz & Elvis Crespo": "https://i.ytimg.com/vi/mGN3kfEk_P4/maxresdefault.jpg",
  "Polimá Westcoast":  "https://i.scdn.co/image/ab67616d0000b2733e242bdd9632c6a49a693b1b",
  "Quevedo":           "https://media.emisorasmusicales.net/wp-content/uploads/2023/02/11013844/nnn.jpg",
  "Rafa Pabon":        "https://i1.sndcdn.com/artworks-000384998541-nkcy6u-t500x500.jpg",
  "Rauw Alejandro":    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMVwbetQqCv73bf6t9mP31J9CucAlGW_k8YA&s",
  "Ricky":             "https://i.scdn.co/image/ab67616d0000b273f89d8cc59e29c9d2f846e903",
  "Rihanna":           "https://i.scdn.co/image/ab67616d0000b273f9f27162ab1ed45b8d7a7e98",
  "Roa":               "https://i.ytimg.com/vi/awbt4MRXuck/maxresdefault.jpg",
  "ROSALÍA":           "https://images.genius.com/a8b0efd41e6a43091837da78850cf312.1000x1000x1.png",
  "Rvfv":              "https://i.scdn.co/image/ab67616d0000b273bf3151af9c5e4d7c1de59ae9",
  "SAIKO":             "https://i1.sndcdn.com/artworks-by0H8XlmcCvzkf5u-6bxytg-t1080x1080.jpg",
  "Sammy":             "https://i1.sndcdn.com/artworks-000384998541-nkcy6u-t500x500.jpg",
  "SASH":              "https://m.media-amazon.com/images/I/71Vx2arL6vL._UF894,1000_QL80_.jpg",
  "Sebastián Yatra":   "https://i.scdn.co/image/ab67616d0000b273f89d8cc59e29c9d2f846e903",
  "Sech":              "https://images.genius.com/eb6adbb6247e85fca2cc94fb9388fd3a.1000x1000x1.png",
  "Shakira":           "https://i.scdn.co/image/ab67616d0000b273e588b4129b0afd8595ac55b0",
  "Skrillex":          "https://i.ytimg.com/vi/7aPzYlc2RY4/maxresdefault.jpg",
  "SLAYTER":           "https://m.media-amazon.com/images/I/61KjgepxdwL._UXNaN_FMjpg_QL85_.jpg",
  "Steve Aoki":        "https://i.ytimg.com/vi/mGN3kfEk_P4/maxresdefault.jpg",
  "Super Yei":         "https://i1.sndcdn.com/artworks-000384998541-nkcy6u-t500x500.jpg",
  "T-Pain":            "https://i1.sndcdn.com/artworks-00033071708-e6mxid-t500x500.jpg",
  "Tempo":             "https://i.scdn.co/image/ab67616d0000b2736e3e2d32da74925922b4976f",
  "Tito El Bambino":   "https://akamai.sscdn.co/uploadfile/letras/albuns/b/3/4/0/4332821765558369.jpg",
  "Vika Jigulina":     "https://i.scdn.co/image/ab67616d0000b273edd7dc7bf5f7c39d3e132490",
  "Willy William":     "https://i1.sndcdn.com/artworks-000283629944-3i7bfp-t500x500.jpg",
  "Wisin":             "https://akamai.sscdn.co/uploadfile/letras/albuns/b/3/4/0/4332821765558369.jpg",
  "Yan Block":         "https://i.scdn.co/image/ab67616d0000b2735cc8552f86ba4cc528968d2d",
  "Yandel":            "https://i.scdn.co/image/ab67616d0000b273c4e2ae0d7a6ba307bdd3cc0d",
  "Young Cister":      "https://m.media-amazon.com/images/I/51qThLr9dIL._SX354_SY354_BL0_QL100__UXNaN_FMjpg_QL85_.jpg",
  "YOUNG MIKO":        "https://m.media-amazon.com/images/I/61vTly9zD+L._UXNaN_FMjpg_QL85_.jpg",
  "YOVNGCHIMI":        "https://i.scdn.co/image/ab67616d0000b2732a5c6164e8743597f44b645e",
  "Yung Beef":         "https://cdn-images.dzcdn.net/images/cover/e62f70e7b366e618da1cbf0eed47de8c/0x1900-000000-80-0-0.jpg",
  "Zion":              "https://i.scdn.co/image/ab67616d0000b273da7076e371c7859fbb2e18fd"




















};

/* Helper: devuelve la foto del artista o null */
function getArtistPhoto(artistName) {
  if (!artistName) return null;
  // Buscar coincidencia exacta primero
  if (ARTIST_PHOTOS[artistName]) return ARTIST_PHOTOS[artistName];
  // Buscar por primer nombre (antes de la coma/barra)
  const firstName = artistName.split(/[,&\/]/)[0].trim();
  if (ARTIST_PHOTOS[firstName]) return ARTIST_PHOTOS[firstName];
  // Búsqueda parcial (el nombre del artista empieza igual)
  const found = Object.keys(ARTIST_PHOTOS).find(k =>
    artistName.toLowerCase().includes(k.toLowerCase()) ||
    k.toLowerCase().includes(artistName.toLowerCase().split(/[,&\/]/)[0].trim())
  );
  return found ? ARTIST_PHOTOS[found] : null;
}

/* Cache de fotos cargadas desde Wikipedia para no repetir peticiones */
const _wikiPhotoCache = {};

/**
 * Intenta obtener la foto del artista desde la Wikipedia API.
 * Actualiza el elemento <img> directamente cuando la obtiene.
 */
async function fetchArtistPhotoFromWiki(artistName, imgElement, fallbackSrc) {
  const key = artistName.split(/[,&\/]/)[0].trim();
  if (_wikiPhotoCache[key] !== undefined) {
    imgElement.src = _wikiPhotoCache[key] || fallbackSrc;
    return;
  }
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(key)}&prop=pageimages&format=json&pithumbsize=400&origin=*`;
    const res = await fetch(url);
    const data = await res.json();
    const pages = data?.query?.pages || {};
    const page = Object.values(pages)[0];
    const thumb = page?.thumbnail?.source;
    if (thumb) {
      _wikiPhotoCache[key] = thumb;
      imgElement.src = thumb;
    } else {
      _wikiPhotoCache[key] = null;
      imgElement.src = fallbackSrc;
    }
  } catch {
    _wikiPhotoCache[key] = null;
    imgElement.src = fallbackSrc;
  }
}

const media = [];

/* ══════════════════════════════════════════════════════
   2. STATE
══════════════════════════════════════════════════════ */
let currentFilter   = "all";
let currentSearch   = "";
let currentTrackIdx = -1;
let isPlaying       = false;
let playlist        = [];        // current PLAYBACK context (playlist, favorites, etc.)
let playlistSource  = "library"; // "library" | "playlist:<id>" | "favorites" | "history"
let shuffleMode     = false;
let repeatMode      = loadRepeatMode(); // 'off' | 'one' | 'all'

// ── PERSISTENCE KEYS ──
const LIKED_KEY    = "droply_liked_v2";
const QUEUE_KEY    = "droply_queue_v2";
const PL_KEY       = "droply_playlists_v2";
const HIST_KEY     = "droply_history_v2";
const PLAYS_KEY    = "droply_plays_v2";
const REPEAT_KEY   = "droply_repeat_v1";

function loadRepeatMode() {
  try {
    const v = localStorage.getItem(REPEAT_KEY);
    if (v === "off" || v === "one" || v === "all") return v;
    return "off";
  } catch (_) { return "off"; }
}
function saveRepeatMode() {
  try { localStorage.setItem(REPEAT_KEY, repeatMode); } catch (_) {}
}
function updateRepeatUI() {
  if (!sheetRepeat) return;
  sheetRepeat.classList.toggle("active", repeatMode !== "off");
  sheetRepeat.classList.toggle("repeat-one", repeatMode === "one");
  sheetRepeat.classList.toggle("repeat-all", repeatMode === "all");
  const labels = { off: "Repetir", one: "Repetir canción", all: "Repetir playlist" };
  sheetRepeat.setAttribute("aria-label", labels[repeatMode] || labels.off);
}
function cycleRepeatMode() {
  repeatMode = repeatMode === "off" ? "one" : repeatMode === "one" ? "all" : "off";
  saveRepeatMode();
  updateRepeatUI();
  const msgs = { off: "Repetición desactivada", one: "Repetir canción", all: "Repetir playlist" };
  showToast(msgs[repeatMode]);
  if (typeof CloudSync !== "undefined") CloudSync.markDirty();
}

// Live events catalog (extend as needed)
const events = [];

// ── LIKED ──
function loadLiked() { try { return new Set(JSON.parse(localStorage.getItem(LIKED_KEY) || "[]")); } catch(_) { return new Set(); } }
function saveLiked() { try { localStorage.setItem(LIKED_KEY, JSON.stringify([...likedTracks])); } catch(_) {} if (typeof SupabaseCloud !== "undefined") SupabaseCloud.markLikedDirty(); }
let likedTracks = loadLiked();

// ── QUEUE ──
function loadQueue() { try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]"); } catch(_) { return []; } }
function saveQueue() { try { localStorage.setItem(QUEUE_KEY, JSON.stringify(queue)); } catch(_) {} }
let queue = loadQueue();

// ── PLAYLISTS ──
function loadPlaylists() { try { return JSON.parse(localStorage.getItem(PL_KEY) || "[]"); } catch(_) { return []; } }
function savePlaylists() { try { localStorage.setItem(PL_KEY, JSON.stringify(playlists)); } catch(_) {} if (typeof SupabaseCloud !== "undefined") SupabaseCloud.markPlaylistsDirty(); }
let playlists = loadPlaylists();

// ── HISTORY ──
function loadHistory() { try { return JSON.parse(localStorage.getItem(HIST_KEY) || "[]"); } catch(_) { return []; } }
function saveHistory() { try { localStorage.setItem(HIST_KEY, JSON.stringify(historyTracks.slice(0, 100))); } catch(_) {} if (typeof SupabaseCloud !== "undefined") SupabaseCloud.markHistoryDirty(); }
let historyTracks = loadHistory(); // [{file, timestamp}]

// ── PLAY COUNTS ──
function loadPlayCounts() { try { return JSON.parse(localStorage.getItem(PLAYS_KEY) || "{}"); } catch(_) { return {}; } }
function savePlayCounts() { try { localStorage.setItem(PLAYS_KEY, JSON.stringify(playCounts)); } catch(_) {} if (typeof SupabaseCloud !== "undefined") SupabaseCloud.markHistoryDirty(); }
let playCounts = loadPlayCounts();

// ── Context target ──
let contextTarget = null;

/* ══════════════════════════════════════════════════════
   3. DOM REFS
══════════════════════════════════════════════════════ */
const audioEl          = document.getElementById("mainAudio");
const mediaGrid        = document.getElementById("mediaGrid");
const catInner         = document.getElementById("catInner");
const sectionTitle     = document.getElementById("sectionTitle");
const countBadge       = document.getElementById("countBadge");
const heroExplore      = document.getElementById("heroExplore");
const gridSection      = document.getElementById("gridSection");
const nowPlayingSheet  = document.getElementById("nowPlayingSheet");
const sheetBgBlur      = document.getElementById("sheetBgBlur");
const sheetClose       = document.getElementById("sheetClose");
const sheetCover       = document.getElementById("sheetCover");
const sheetCategory    = document.getElementById("sheetCategory");
const sheetTitle       = document.getElementById("sheetTitle");
const sheetArtist      = document.getElementById("sheetArtist");
const sheetHeart       = document.getElementById("sheetHeart");
const sheetAddMenu     = document.getElementById("sheetAddMenu");
const sheetPlay        = document.getElementById("sheetPlay");
const sheetPrev        = document.getElementById("sheetPrev");
const sheetNext        = document.getElementById("sheetNext");
const sheetShuffle     = document.getElementById("sheetShuffle");
const sheetRepeat      = document.getElementById("sheetRepeat");
const sheetQueueBtn    = document.getElementById("sheetQueueBtn");
const sheetBar         = document.getElementById("sheetBar");
const sheetFill        = document.getElementById("sheetFill");
const sheetThumb       = document.getElementById("sheetThumb");
const sheetCurrent     = document.getElementById("sheetCurrent");
const sheetDuration    = document.getElementById("sheetDuration");
const volSlider        = document.getElementById("volSlider");
const miniPlayer       = document.getElementById("miniPlayer");
const miniPlayerExpand = document.getElementById("miniPlayerExpand");
const miniCover        = document.getElementById("miniCover");
const miniTitle        = document.getElementById("miniTitle");
const miniArtist       = document.getElementById("miniArtist");
const miniPlay         = document.getElementById("miniPlay");
const miniNext         = document.getElementById("miniNext");
const miniProgressFill = document.getElementById("miniProgressFill");
const searchInput      = document.getElementById("searchInput");
const searchClear      = document.getElementById("searchClear");
const searchBrowse     = document.getElementById("searchBrowse");
const searchResults    = document.getElementById("searchResults");
const genreGrid        = document.getElementById("genreGrid");
const favoritosList    = document.getElementById("favoritosList");
const bottomNav        = document.getElementById("bottomNav");
const topbarSearchBtn  = document.getElementById("topbarSearchBtn");
const toastContainer   = document.getElementById("toastContainer");
const queuePanel       = document.getElementById("queuePanel");
const queueOverlay     = document.getElementById("queueOverlay");
const queueList        = document.getElementById("queueList");
const queueNowPlaying  = document.getElementById("queueNowPlaying");
const queueNextLabel   = document.getElementById("queueNextLabel");
const queueClearBtn    = document.getElementById("queueClearBtn");
const queueCloseBtn    = document.getElementById("queueCloseBtn");
const contextMenu      = document.getElementById("contextMenu");
const ctxPlayNow       = document.getElementById("ctxPlayNow");
const ctxAddQueue      = document.getElementById("ctxAddQueue");
const ctxAddPlaylist   = document.getElementById("ctxAddPlaylist");
const ctxLike          = document.getElementById("ctxLike");
const playlistsGrid    = document.getElementById("playlistsGrid");
const btnCreatePlaylist= document.getElementById("btnCreatePlaylist");
const createPlaylistModal = document.getElementById("createPlaylistModal");
const createPlaylistClose = document.getElementById("createPlaylistClose");
const confirmCreatePlaylist = document.getElementById("confirmCreatePlaylist");
const playlistNameInput= document.getElementById("playlistNameInput");
const addToPlaylistModal= document.getElementById("addToPlaylistModal");
const addToPlaylistClose= document.getElementById("addToPlaylistClose");
const addToPlaylistList= document.getElementById("addToPlaylistList");
const addNewPlaylistBtn= document.getElementById("addNewPlaylistBtn");
const playlistDetailModal= document.getElementById("playlistDetailModal");
const playlistDetailClose= document.getElementById("playlistDetailClose");
const playlistDetailCover= document.getElementById("playlistDetailCover");
const playlistDetailName= document.getElementById("playlistDetailName");
const playlistDetailCount= document.getElementById("playlistDetailCount");
const playlistDetailList= document.getElementById("playlistDetailList");
const btnPlayPlaylist  = document.getElementById("btnPlayPlaylist");
const btnDeletePlaylist= document.getElementById("btnDeletePlaylist");

let openPlaylistId = null;

/* ══════════════════════════════════════════════════════
   4. HELPERS
══════════════════════════════════════════════════════ */
function getCategories() { return [...new Set(media.map(m => m.category))].sort(); }

function filteredMedia() {
  return media.filter(item => {
    const matchFilter =
      currentFilter === "all"   ? true :
      currentFilter === "music" ? item.type === "music" :
      item.category.toLowerCase() === currentFilter.toLowerCase();
    const q = currentSearch.toLowerCase().trim();
    const matchSearch = q === "" || [item.title, item.artist, item.category].some(s => s.toLowerCase().includes(q));
    return matchFilter && matchSearch;
  });
}

function formatTime(sec) {
  if (isNaN(sec) || !isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getPlaceholderCover(category = "music") {
  const colors = { Reggaeton:"#e94f4f", Electronic:"#1db954", "Dance-Pop":"#1f77b4", "90s":"#d62728", Jazz:"#9467bd", "Lo-Fi":"#2ca02c", House:"#ff1493", "Hip-Hop":"#1a1a2e" };
  const bg = colors[category] || "#e94f4f";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="${bg}" width="400" height="400"/><text x="50%" y="50%" font-size="80" text-anchor="middle" dominant-baseline="middle" fill="white" opacity=".35">♪</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function updatePlayIcons(playing) {
  [sheetPlay, miniPlay].forEach(btn => {
    btn.querySelector(".icon-play").style.display  = playing ? "none" : "";
    btn.querySelector(".icon-pause").style.display = playing ? "" : "none";
  });
  sheetCover.classList.toggle("playing", playing);

  // Sync "Continuar escuchando" button
  const hccBtn = document.getElementById("hccPlayBtn");
  if (hccBtn) {
    const hccIconPlay  = hccBtn.querySelector(".hcc-icon-play");
    const hccIconPause = hccBtn.querySelector(".hcc-icon-pause");
    if (hccIconPlay)  hccIconPlay.style.display  = playing ? "none" : "";
    if (hccIconPause) hccIconPause.style.display = playing ? "" : "none";
  }
}

let _ytLibrary = [];
function loadYtLibrary() { try { return JSON.parse(localStorage.getItem('droply_ytlib') || '[]'); } catch(_) { return []; } }
function saveYtLibrary() { try { localStorage.setItem('droply_ytlib', JSON.stringify(_ytLibrary)); } catch(_) {} }
_ytLibrary = loadYtLibrary();

function getTrackByFile(file) {
  return media.find(m => m.file === file) || _ytLibrary.find(m => m.file === file) || null;
}

function downloadedEmojiHtml(isDownloaded) {
  return isDownloaded ? '<span class="track-dl-emoji" title="Descargada"><svg viewBox="0 0 8 8" width="8" height="8"><circle cx="4" cy="4" r="4" fill="#22c55e"/></svg></span>' : '';
}

function syncDownloadedEmoji(file, isDownloaded) {
  document.querySelectorAll(`[data-file="${CSS.escape(file)}"]`).forEach(el => {
    const titleSel = '.card-title, .library-track-title, .playlist-detail-track, .home-track-title, .search-result-title';
    const titleEl = el.matches(titleSel) ? el : el.querySelector(titleSel);
    if (!titleEl) return;
    let emoji = titleEl.querySelector('.track-dl-emoji');
    if (isDownloaded) {
      if (!emoji) {
        emoji = document.createElement('span');
        emoji.className = 'track-dl-emoji';
        emoji.title = 'Descargada';
        emoji.innerHTML = '<svg viewBox="0 0 8 8" width="8" height="8"><circle cx="4" cy="4" r="4" fill="#22c55e"/></svg>';
        titleEl.appendChild(emoji);
      }
    } else if (emoji) {
      emoji.remove();
    }
  });
}

/* ══════════════════════════════════════════════════════
   5. TOAST NOTIFICATIONS
══════════════════════════════════════════════════════ */
const TOAST_DURATION = 2800;
function showToast(msg, type = "default") {
  const el = document.createElement("div");
  el.className = `toast toast-${type}`;

  // Icono dentro de círculo de color
  const iconMap = {
    success: `<div class="toast-icon-wrap"><svg viewBox="0 0 24 24" width="12" height="12" style="stroke:#22c55e;stroke-width:2.8;fill:none;flex-shrink:0"><polyline points="20 6 9 17 4 12"/></svg></div>`,
    error:   `<div class="toast-icon-wrap"><svg viewBox="0 0 24 24" width="12" height="12" style="stroke:#ef4444;stroke-width:2.8;fill:none;flex-shrink:0"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>`,
    warn:    `<div class="toast-icon-wrap"><svg viewBox="0 0 24 24" width="12" height="12" style="stroke:#fabd00;stroke-width:2.8;fill:none;flex-shrink:0"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>`,
    default: `<span class="toast-dot"></span>`
  };
  const icon = iconMap[type] || iconMap.default;

  el.innerHTML = `<div class="toast-content">${icon}<span>${msg}</span></div>`;

  toastContainer.appendChild(el);

  const timer = setTimeout(() => {
    el.classList.add("toast-out");
    el.addEventListener("animationend", () => el.remove(), { once: true });
  }, TOAST_DURATION);

  el.addEventListener("click", () => {
    clearTimeout(timer);
    el.classList.add("toast-out");
    el.addEventListener("animationend", () => el.remove(), { once: true });
  });
}

/* ══════════════════════════════════════════════════════
   6. PAGES NAVIGATION
══════════════════════════════════════════════════════ */
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById(pageId);
  if (!target) return;
  target.classList.add("active");
  bottomNav.querySelectorAll(".bnav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.page === pageId);
  });
  if (pageId === "pageLibrary") { renderLibraryHub(); }
  if (pageId === "pageFeed") { if (typeof Feed !== "undefined") Feed.init(); }
  if (pageId === "pageProfile") {
    renderProfile();
  }
  if (pageId === "pageEventos" && typeof EventosManager !== "undefined") EventosManager.render();
  if (pageId === "pageMixes") { /* Mixes removed */ }
  closeContextMenu();
  updateBottomNavSlider();
  try {
    const hashMap = { pageHome: "", pageSearch: "search", pageLibrary: "library", pageFeed: "feed", pageProfile: "profile" };
    const hash = hashMap[pageId];
    if (hash !== undefined && location.hash !== "#" + hash) {
      history.replaceState(null, "", hash ? "#" + hash : location.pathname + location.search);
    }
  } catch (_) {}
}

function handleHashRoute() {
  const route = (location.hash || "").slice(1).toLowerCase();
  const map = { search: "pageSearch", library: "pageLibrary", playlists: "pageLibrary", feed: "pageFeed", profile: "pageProfile", home: "pageHome", "": "pageHome" };
  const pageId = map[route];
  if (pageId) showPage(pageId);
}

function updateBottomNavSlider() {
  const slider = document.getElementById("bnavGlassSlider");
  const activeBtn = bottomNav.querySelector(".bnav-btn.active");
  if (!slider || !activeBtn) return;
  const width = Math.max(activeBtn.offsetWidth, 56);
  slider.style.width = `${width}px`;
  slider.style.left = `0px`;
  slider.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
}

bottomNav.querySelectorAll(".bnav-btn").forEach(btn => {
  btn.addEventListener("click", () => showPage(btn.dataset.page));
});
topbarSearchBtn.addEventListener("click", () => showPage("pageSearch"));
const topbarProfileBtn = document.getElementById("topbarProfileBtn");
if (topbarProfileBtn) {
  topbarProfileBtn.addEventListener("click", () => showPage("pageProfile"));
}
window.addEventListener("resize", updateBottomNavSlider);
window.addEventListener("hashchange", handleHashRoute);

/* ══════════════════════════════════════════════════════
   7. CONTEXT MENU — Bottom Sheet (mobile-first)
══════════════════════════════════════════════════════ */
const ctxSheet        = document.getElementById("ctxSheet");
const ctxSheetOverlay = document.getElementById("ctxSheetOverlay");
const ctxSheetCover   = document.getElementById("ctxSheetCover");
const ctxSheetTitle   = document.getElementById("ctxSheetTitle");
const ctxSheetArtist  = document.getElementById("ctxSheetArtist");
const ctxSheetPlayNow = document.getElementById("ctxSheetPlayNow");
const ctxSheetAddQueue   = document.getElementById("ctxSheetAddQueue");
const ctxSheetAddPlaylist= document.getElementById("ctxSheetAddPlaylist");
const ctxSheetLike    = document.getElementById("ctxSheetLike");
const ctxSheetLikeIcon = document.getElementById("ctxSheetLikeIcon");
const ctxSheetLikeLabel= document.getElementById("ctxSheetLikeLabel");
const ctxSheetOffline  = document.getElementById("ctxSheetOffline");
const ctxSheetOfflineIcon  = document.getElementById("ctxSheetOfflineIcon");
const ctxSheetOfflineLabel = document.getElementById("ctxSheetOfflineLabel");
const ctxSheetCancel  = document.getElementById("ctxSheetCancel");

// Touch-drag-to-dismiss state
let _ctxDragStartY = 0;
let _ctxDragCurrentY = 0;
let _ctxDragging = false;

function openContextMenu(item) {
  contextTarget = item;
  const liked = likedTracks.has(item.file);
  const cover = item.cover || getPlaceholderCover(item.category);

  // Fill track info
  ctxSheetCover.src = cover;
  ctxSheetCover.onerror = () => { ctxSheetCover.src = getPlaceholderCover(item.category); };
  ctxSheetTitle.textContent  = item.title;
  ctxSheetArtist.textContent = item.artist;

  // Like state
  _updateCtxLikeState(liked);

  // Offline state — check async and update button
  _updateCtxOfflineState(false); // reset first
  if (typeof OfflineManager !== 'undefined' && ctxSheetOffline) {
    const isAlreadyDownloaded = OfflineManager.isDownloaded(item.file);
    _updateCtxOfflineState(isAlreadyDownloaded);
  }

  // Open
  ctxSheet.classList.add("open");
  ctxSheetOverlay.classList.add("open");
  document.body.style.overflow = "hidden";

  // Reset drag
  ctxSheet.style.transform = "";
  ctxSheet.style.transition = "";
}

function _updateCtxOfflineState(isDownloaded) {
  if (!ctxSheetOffline) return;
  ctxSheetOffline.classList.toggle("downloaded", isDownloaded);
  if (ctxSheetOfflineLabel) {
    ctxSheetOfflineLabel.textContent = isDownloaded ? "Eliminar descarga" : "Guardar sin conexión";
  }
  if (ctxSheetOfflineIcon) {
    ctxSheetOfflineIcon.innerHTML = isDownloaded
      ? `<svg viewBox="0 0 24 24" width="20" height="20" style="color:var(--green)"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>`
      : `<svg viewBox="0 0 24 24" width="20" height="20"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
  }
}

function _updateCtxLikeState(liked) {
  ctxSheetLike.classList.toggle("liked", liked);
  ctxSheetLikeLabel.textContent = liked ? "Quitar de likes" : "Me gusta";
  ctxSheetLikeIcon.innerHTML = liked
    ? `<svg viewBox="0 0 24 24" width="20" height="20" style="fill:#e94f4f;stroke:#e94f4f"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
    : `<svg viewBox="0 0 24 24" width="20" height="20"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
}

function closeContextMenu() {
  ctxSheet.classList.remove("open");
  ctxSheetOverlay.classList.remove("open");
  document.body.style.overflow = "";
  ctxSheet.style.transform = "";
  ctxSheet.style.transition = "";
  contextTarget = null;
}

// Close on overlay tap
ctxSheetOverlay.addEventListener("click", closeContextMenu);
ctxSheetCancel.addEventListener("click",  closeContextMenu);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeContextMenu(); });

// ── Swipe-down to dismiss ──────────────────────────
const _ctxHandle = ctxSheet.querySelector(".ctx-sheet-handle-wrap");
if (_ctxHandle) {
  _ctxHandle.addEventListener("touchstart", e => {
    _ctxDragStartY = e.touches[0].clientY;
    _ctxDragging = true;
    ctxSheet.style.transition = "none";
  }, { passive: true });
}

document.addEventListener("touchmove", e => {
  if (!_ctxDragging) return;
  const dy = Math.max(0, e.touches[0].clientY - _ctxDragStartY);
  _ctxDragCurrentY = dy;
  if (_ctxHandle) ctxSheet.style.transform = `translateX(-50%) translateY(calc(-50% + ${dy}px))`;
}, { passive: true });

document.addEventListener("touchend", () => {
  if (!_ctxDragging) return;
  _ctxDragging = false;
  if (_ctxHandle) ctxSheet.style.transition = "";
  if (_ctxDragCurrentY > 100) {
    closeContextMenu();
  } else {
    if (_ctxHandle) ctxSheet.style.transform = "";
  }
  _ctxDragCurrentY = 0;
}, { passive: true });

// ── Sheet action handlers ──────────────────────────
ctxSheetPlayNow.addEventListener("click", () => {
  if (contextTarget) { loadTrack(contextTarget); closeContextMenu(); }
});
ctxSheetAddQueue.addEventListener("click", () => {
  if (contextTarget) { addToQueue(contextTarget); closeContextMenu(); }
});
ctxSheetAddPlaylist.addEventListener("click", () => {
  if (contextTarget) { openAddToPlaylist(contextTarget); closeContextMenu(); }
});
ctxSheetLike.addEventListener("click", () => {
  if (contextTarget) {
    toggleLike(contextTarget);
    // Update like state in sheet without closing
    const nowLiked = likedTracks.has(contextTarget.file);
    _updateCtxLikeState(nowLiked);
    // Small delay then close
    setTimeout(closeContextMenu, 280);
  }
});

if (ctxSheetOffline) {
  ctxSheetOffline.addEventListener("click", async () => {
    if (!contextTarget || typeof OfflineManager === 'undefined') return;
    // Guardar referencia ANTES de cerrar el menú (closeContextMenu pone contextTarget a null)
    const trackToProcess = contextTarget;
    const isDownloaded = OfflineManager.isDownloaded(trackToProcess.file);
    if (isDownloaded) {
      closeContextMenu();
      await OfflineManager.deleteDownload(trackToProcess.file);
      if (typeof showToast === 'function') showToast(`"${trackToProcess.title}" eliminada de offline`);
    } else {
      closeContextMenu();
      // downloadTrack muestra el toast de éxito y actualiza la lista offline automáticamente
      await OfflineManager.downloadTrack(trackToProcess);
    }
  });
}

/* ══════════════════════════════════════════════════════
   8. HOME GRID
══════════════════════════════════════════════════════ */
function buildCategoryPills() {
  catInner.querySelectorAll(".cat-pill:not([data-cat='all'])").forEach(p => p.remove());
  getCategories().forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "cat-pill";
    btn.dataset.cat = cat;
    btn.textContent = cat;
    catInner.appendChild(btn);
  });
  catInner.querySelectorAll(".cat-pill").forEach(p => {
    p.addEventListener("click", () => {
      currentFilter = p.dataset.cat;
      catInner.querySelectorAll(".cat-pill").forEach(x => x.classList.remove("active"));
      p.classList.add("active");
      renderGrid();
    });
  });
}

const HOME_RANDOM_COUNT = 12;
let homeRandomSeed = [];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderGrid() {
  let items = filteredMedia();
  if (mediaGrid) mediaGrid.innerHTML = "";
  // Do NOT overwrite playlist here — playback context is managed by loadTrack
  const labels = { all:"Destacados para ti", music:"Música" };
  if (sectionTitle) sectionTitle.textContent = labels[currentFilter] || currentFilter;

  const isHome = currentFilter === "all" && currentSearch === "";

  // Show/hide home explore section
  const exploreSection = document.getElementById("homeExploreSection");
  if (exploreSection) {
    exploreSection.style.display = isHome ? "none" : "";
  }

  if (isHome) {
    if (homeRandomSeed.length === 0) homeRandomSeed = shuffleArray(items).slice(0, HOME_RANDOM_COUNT);
    items = homeRandomSeed;
    if (countBadge) countBadge.textContent = `${HOME_RANDOM_COUNT} de ${filteredMedia().length}`;
  } else {
    homeRandomSeed = [];
    if (countBadge) countBadge.textContent = `${items.length} item${items.length !== 1 ? "s" : ""}`;
  }

  if (items.length === 0) {
    if (mediaGrid) mediaGrid.innerHTML = `<div class="no-results fade-in"><h3>Sin resultados</h3><p>Prueba con otro término o categoría.</p></div>`;
    return;
  }

  const currentFile = playlist[currentTrackIdx]?.file;

  items.forEach(item => {
    const cover = item.cover || getPlaceholderCover(item.category);
    const card = document.createElement("div");
    card.className = "media-card fade-in";
    card.dataset.file = item.file;
    if (item.file === currentFile) card.classList.add("is-playing");
    const liked = likedTracks.has(item.file);
    const isDownloaded = (typeof OfflineManager !== 'undefined') && OfflineManager.isDownloaded(item.file);

    card.innerHTML = `
      <div class="card-cover">
        <img src="${cover}" alt="${item.title}" loading="lazy" onerror="this.src='${getPlaceholderCover(item.category)}'" />
        <div class="card-play-overlay">
          <div class="play-circle">
            <svg viewBox="0 0 24 24" style="fill:currentColor;stroke:none"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>
        <div class="card-liked-dot ${liked ? 'visible' : ''}">
          <svg viewBox="0 0 24 24"><path fill="#fff" stroke="none" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </div>
      </div>
      <div class="card-body">
        <p class="card-category">${item.category}</p>
        <h3 class="card-title">${item.title}${downloadedEmojiHtml(isDownloaded)}</h3>
        <p class="card-artist">${item.artist}</p>
      </div>
      <div class="card-footer">
        <button class="card-play-btn">
          <svg viewBox="0 0 24 24" style="fill:currentColor;stroke:none"><polygon points="5,3 19,12 5,21"/></svg>
          Escuchar
        </button>
        <div class="card-footer-right">
          ${item.duration ? `<span class="card-dur">${item.duration}</span>` : ""}
          <button class="card-more-btn card-more-btn--footer" aria-label="Más opciones">
            <svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="5" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.4" fill="currentColor" stroke="none"/></svg>
          </button>
        </div>
      </div>`;

    card.querySelector(".card-play-btn").addEventListener("click", e => { e.stopPropagation(); loadTrack(item); });
    card.addEventListener("click", e => { if (!e.target.closest(".card-more-btn--footer")) loadTrack(item); });
    card.querySelector(".card-more-btn--footer").addEventListener("click", e => {
      e.stopPropagation();
      e.preventDefault();
      openContextMenu(item);
    });
    if (mediaGrid) mediaGrid.appendChild(card);
  });
}








/* ══════════════════════════════════════════════════════
   DROPLY AUDIO ENGINE v4 — HARD SWITCH (sin crossfade)
   · Un solo elemento de audio (mainAudio del DOM)
   · Hard switch limpio: pause → src → play
   · Sin AbortError: se cancela la promise pendiente
     antes de cambiar de src
══════════════════════════════════════════════════════ */

const activeAudio = audioEl;   // mainAudio del DOM — único elemento
window.audioEl = activeAudio;

/* ── Audio events ────────────────────────────────────── */
let _rafPending = false;
activeAudio.addEventListener("timeupdate", function () {
  if (_rafPending) return;
  _rafPending = true;
  requestAnimationFrame(() => {
    _rafPending = false;
    const dur = activeAudio.duration, cur = activeAudio.currentTime;
    if (!dur || isNaN(dur) || !isFinite(dur) || dur <= 0) return;
    const pct = Math.max(0, Math.min(100, (cur / dur) * 100));
    sheetFill.style.width        = pct + "%";
    sheetThumb.style.left        = pct + "%";
    sheetCurrent.textContent     = formatTime(cur);
    sheetDuration.textContent    = formatTime(dur);
    miniProgressFill.style.width = pct + "%";
    _updateMediaSessionPosition();
  });
}, { passive: true });

activeAudio.addEventListener("ended", function () {
  isPlaying = false;
  if (repeatMode === "one") {
    this.currentTime = 0;
    this.play()
      .then(() => { isPlaying = true; updatePlayIcons(true); })
      .catch(err => { updatePlayIcons(false); console.warn("[DROPLY] repeat:", err); });
  } else {
    updatePlayIcons(false);
    // Marcar que venimos del ended handler — iOS aún tiene el contexto de audio
    // vivo en este momento, así que _doPlay debe saltar load()+canplay y llamar
    // play() directamente para no perder ese contexto (de lo contrario el track
    // siguiente carga pero no suena con pantalla bloqueada).
    window._droplyFromEnded = true;
    _playNextImmediate();
    // Limpiar la marca tras el tick para que plays manuales vayan por el flujo normal
    setTimeout(() => { window._droplyFromEnded = false; }, 0);
  }
}, { passive: true });

activeAudio.addEventListener("play", function () {
  isPlaying = true;
  updatePlayIcons(true);
  if ("mediaSession" in navigator) {
    try { navigator.mediaSession.playbackState = "playing"; } catch(_) {}
    // Re-assert handlers on every play (some browsers drop them)
    try {
      navigator.mediaSession.setActionHandler("play", () => {
        _resumeWithWatchdog();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        activeAudio.pause();
        isPlaying = false;
        updatePlayIcons(false);
      });
    } catch(_) {}
  }
}, { passive: true });

/* ── loadedmetadata: actualiza posición en cuanto se conoce la duración real ── */
/* Esto arregla la barra de la pantalla de bloqueo que mostraba 0:00/0:00      */
activeAudio.addEventListener("loadedmetadata", function () {
  _updateMediaSessionPosition();
  // También actualiza la duración en el reproductor inmediatamente
  const dur = this.duration;
  if (dur && isFinite(dur) && dur > 0) {
    if (sheetDuration) sheetDuration.textContent = formatTime(dur);
  }
}, { passive: true });

/* ── playing: se dispara cuando el audio empieza a reproducirse de verdad ──── */
/* En iOS/Safari loadedmetadata llega tarde; 'playing' es más fiable           */
activeAudio.addEventListener("playing", function () {
  _updateMediaSessionPosition();
  if (_watchdogTimer) { clearTimeout(_watchdogTimer); _watchdogTimer = null; }
  if ("mediaSession" in navigator) {
    try { navigator.mediaSession.playbackState = "playing"; } catch(_) {}
  }
  // Quitar estado de carga
  _setAudioLoadingState(false);
  // Precargar el siguiente track en segundo plano (ver bloque PREFETCH más abajo)
  if (typeof _prefetchNextTrack === 'function') _prefetchNextTrack();
}, { passive: true });

activeAudio.addEventListener("pause", function () {
  // Solo actualiza si el audio está realmente pausado
  // (evita falsos positivos por cambio de src)
  if (!this.paused) return;
  isPlaying = false;
  updatePlayIcons(false);
  _setAudioLoadingState(false);
  if ("mediaSession" in navigator) {
    try { navigator.mediaSession.playbackState = "paused"; } catch(_) {}
  }
}, { passive: true });

/* ── Estado de carga: spinner cuando el buffer está vacío ─────────────────
   Se muestra automáticamente entre el play() y el primer chunk de audio.
   Se quita en cuanto el audio empieza a sonar de verdad ("playing").       */
function _setAudioLoadingState(loading) {
  [miniPlay, sheetPlay].forEach(btn => {
    if (!btn) return;
    btn.classList.toggle('audio-loading', loading);
  });
}

activeAudio.addEventListener("waiting", function () {
  if (isPlaying) _setAudioLoadingState(true);
}, { passive: true });

activeAudio.addEventListener("canplay", function () {
  _setAudioLoadingState(false);
}, { passive: true });

/* ── Lock compartido para que el handler "error" y el watchdog nunca
   reintenten carga al mismo tiempo sobre el mismo track. Sin esto, los
   dos disparaban load()+play() en paralelo y el resultado era audio
   mudo/roto justo al pasar de canción.                                    ── */
let _retryInFlight = false;

/* ── error / stalled: el audio no pudo cargar (típico en 2º plano / lockscreen) ──
   IMPORTANTE: el propio motor de audio dispara "error" de forma espuria
   cuando hacemos src = "" o interrumpimos una carga al cambiar de track
   (load() abortado). Si reaccionábamos a CUALQUIER evento "error" sin
   comprobar si hay un MediaError real, acabábamos reintentando sobre el
   track viejo justo cuando ya estaba cargando el nuevo, rompiendo el
   cambio de canción. Ahora solo actuamos si activeAudio.error existe de
   verdad y sigue correspondiendo al mismo src que falló.                  ── */
activeAudio.addEventListener("error", function () {
  const myToken = _playToken;
  const failedSrc = activeAudio.currentSrc || activeAudio.src;

  // Sin código de error real (MediaError) => evento espurio por cambio de
  // src/abort, no un fallo de carga. Ignorar.
  if (!activeAudio.error) return;

  isPlaying = false;
  updatePlayIcons(false);
  if ("mediaSession" in navigator) {
    try { navigator.mediaSession.playbackState = "none"; } catch(_) {}
  }

  if (_retryInFlight) return; // el watchdog u otro reintento ya está en curso
  _retryInFlight = true;

  // Reintento único tras un pequeño respiro (la red puede tardar en
  // "despertar" cuando Android reanuda la app desde la pantalla bloqueada)
  setTimeout(() => {
    if (myToken !== _playToken) { _retryInFlight = false; return; } // ya se cargó otra cosa, no interferir
    if (!activeAudio.src || (activeAudio.currentSrc || activeAudio.src) !== failedSrc) { _retryInFlight = false; return; }
    try { activeAudio.load(); } catch(_) {}
    setTimeout(() => {
      _retryInFlight = false;
      if (myToken !== _playToken) return;
      activeAudio.play().catch(() => {});
    }, 100);
  }, 800);
}, { passive: true });

/* Vigila que, tras pedir reproducir (sobre todo desde nexttrack/previoustrack
   en background), el audio realmente empiece a sonar en un tiempo razonable.
   Si no lo hace, fuerza un reintento real de carga (re-set del mismo src)
   en vez de dejar la Media Session "colgada" en estado playing.

   v2 — IMPORTANTE: la versión anterior reseteaba la carga a los 4s en CIEGO,
   sin comprobar si en realidad seguía progresando con normalidad (solo que
   le faltaba un pelín más de tiempo, típico en redes algo lentas o en
   background/pantalla bloqueada). Eso provocaba un bucle: carga 4s → se
   resetea (tirando el progreso ya descargado) → vuelve a cargar otros 4s →
   se resetea de nuevo... y la canción podía no llegar a arrancar nunca.
   Ahora comparamos dos checkpoints (a los 4s y a los 8s): solo forzamos el
   reinicio destructivo si entre ambos NO hubo ningún progreso real (ni en
   readyState ni en bytes bufferizados). Si está progresando, aunque sea
   lento, le damos más margen sin tocar nada.                              */
let _watchdogTimer      = null;
let _watchdogCheckpoint = null;

function _bufferedEndSeconds(audio) {
  try {
    if (audio.buffered && audio.buffered.length) return audio.buffered.end(audio.buffered.length - 1);
  } catch (_) {}
  return 0;
}

function _armPlaybackWatchdog() {
  if (_watchdogTimer) { clearTimeout(_watchdogTimer); _watchdogTimer = null; }
  _watchdogCheckpoint = null;
  const myToken     = _playToken;
  const expectedSrc = activeAudio.src;

  function check(isFirstCheck) {
    _watchdogTimer = null;
    if (myToken !== _playToken) return;                              // se cambió de canción mientras tanto
    if (!expectedSrc || activeAudio.src !== expectedSrc) return;
    if (_retryInFlight) return;                                       // el handler de error ya está reintentando

    const ready = activeAudio.readyState;
    if (ready >= 2) return;                                           // ya tiene datos reproducibles, todo bien

    const bEnd = _bufferedEndSeconds(activeAudio);

    if (isFirstCheck) {
      // Primer chequeo (4s): aún sin datos, pero puede estar simplemente
      // tardando un poco más de lo normal. Guardamos el progreso actual
      // y le damos otro margen ANTES de hacer nada destructivo.
      _watchdogCheckpoint = { ready, bEnd };
      _watchdogTimer = setTimeout(() => check(false), 4000);
      return;
    }

    // Segundo chequeo (8s): ¿hubo progreso real desde el primer checkpoint?
    const madeProgress = _watchdogCheckpoint &&
      (ready > _watchdogCheckpoint.ready || bEnd > _watchdogCheckpoint.bEnd + 0.5);

    if (madeProgress) {
      // Sigue avanzando, aunque vaya lento — seguimos esperando sin resetear.
      _watchdogCheckpoint = { ready, bEnd };
      _watchdogTimer = setTimeout(() => check(false), 4000);
      return;
    }

    // Cero progreso en ~8s → ahora sí está realmente atascado. Reintento real.
    _retryInFlight = true;
    try { activeAudio.load(); } catch (_) {}
    setTimeout(() => {
      _retryInFlight = false;
      if (myToken !== _playToken) return;
      activeAudio.play()
        .then(() => { if (myToken !== _playToken) return; isPlaying = true; updatePlayIcons(true); })
        .catch(() => {
          isPlaying = false;
          updatePlayIcons(false);
          if ("mediaSession" in navigator) {
            try { navigator.mediaSession.playbackState = "paused"; } catch (_) {}
          }
        });
    }, 100);
  }

  _watchdogTimer = setTimeout(() => check(true), 4000);
}

/* ── Reanudar reproducción (resume) con vigilancia de watchdog ──────────────
   BUG QUE ARREGLA: al pulsar "play" desde pantalla bloqueada / Control
   Center / mini-player tras una pausa, antes solo se llamaba a
   activeAudio.play() "a pelo". Si el navegador había descartado el buffer
   de audio durante la pausa en segundo plano (frecuente en iOS/Android tras
   minutos con la pantalla bloqueada), play() se quedaba colgado esperando
   datos que nunca llegaban — y como _armPlaybackWatchdog() SOLO se activaba
   al cargar una pista nueva (loadTrack), nadie detectaba ni arreglaba ese
   atasco. Resultado: pausas la canción y al darle a play ya no sigue.
   Esta función centraliza TODO reanudado (togglePlay, MediaSession "play",
   visibilitychange) y arma el watchdog también aquí, para que un resume
   atascado se detecte y se reintente igual que una carga inicial atascada. */
async function _resumeWithWatchdog() {
  const audio = activeAudio;
  if (!audio) return;
  if (!audio.src && !audio.currentSrc) return;

  audio.muted = false;
  if (audio.volume === 0) audio.volume = 1;

  const myToken = _playToken; // detecta si el usuario cambia de pista mientras esperamos

  // Si el buffer se vació durante la pausa (típico tras un buen rato en
  // segundo plano/pantalla bloqueada), readyState cae a 0 y hace falta un
  // load() explícito para poder reproducir. OJO: load() resetea
  // currentTime a 0, así que hay que guardar la posición y restaurarla
  // tras recargar metadatos — si no, "reanudar" sonaba como "reiniciar".
  if (audio.readyState === 0) {
    const resumeAt = audio.currentTime || 0;
    try { audio.load(); } catch (_) {}
    _armPlaybackWatchdog(); // por si el propio load() se queda colgado sin red
    await new Promise(resolve => {
      const onReady = () => {
        audio.removeEventListener("loadedmetadata", onReady);
        resolve();
      };
      audio.addEventListener("loadedmetadata", onReady, { once: true });
    });
    if (myToken !== _playToken) return; // cambió de pista mientras cargaba
    try { audio.currentTime = resumeAt; } catch (_) {}
  }

  try {
    await audio.play();
    if (myToken !== _playToken) return;
    isPlaying = true;
    updatePlayIcons(true);
    if ("mediaSession" in navigator) {
      try { navigator.mediaSession.playbackState = "playing"; } catch (_) {}
    }
  } catch (err) {
    if (myToken !== _playToken) return;
    if (err && err.name === "NotAllowedError") {
      window._droplyPendingTrack = true;
    } else {
      console.warn("[DROPLY] resume error:", err && err.name, err && err.message);
    }
    isPlaying = false;
    updatePlayIcons(false);
    if ("mediaSession" in navigator) {
      try { navigator.mediaSession.playbackState = "paused"; } catch (_) {}
    }
  } finally {
    // Vigila que el resume realmente progrese; si se queda atascado sin
    // buffer (típico tras una pausa larga en background/lockscreen),
    // fuerza un reintento real en vez de dejarlo colgado para siempre.
    if (myToken === _playToken) _armPlaybackWatchdog();
  }
}


/* ══════════════════════════════════════════════════════
   PREFETCH DEL SIGUIENTE TRACK (v2 — ligero y seguro)
   La v1 descargaba el archivo COMPLETO del siguiente track en cuanto
   arrancaba el actual. Eso competía por ancho de banda con la canción
   que estaba sonando (y con el resto de la PWA) y, si el usuario
   saltaba de canción varias veces seguidas, se apilaban varias
   descargas completas en paralelo → la app entera se volvía lenta.

   v2 corrige eso:
   · Solo descarga un FRAGMENTO inicial (~700KB, unos 20-30s de audio)
     con Range request — suficiente para que el siguiente track
     arranque al instante, sin acaparar toda la conexión.
   · Espera unos segundos tras empezar la canción actual, y solo si
     ya está bien bufferizada (no compite con su propia carga).
   · Una única petición en vuelo: cualquier prefetch anterior se
     aborta en cuanto cambia la pista (o se inicia uno nuevo).
══════════════════════════════════════════════════════ */
const _prefetchedFiles      = new Set();
const PREFETCH_BYTES        = 1536 * 1024;  // ~1.5MB, ~10s a 128kbps — suficiente para arrancar sin espera
let   _prefetchController   = null;
let   _prefetchTimer        = null;

function _peekNextTrackFile() {
  // 1) Si hay cola, el siguiente es el primero de la cola
  if (queue.length > 0) return queue[0];
  if (!playlist.length) return null;

  // En shuffle no se puede predecir con certeza el siguiente índice
  // (se calcula aleatoriamente en el momento), así que no prefetcheamos.
  if (shuffleMode) return null;

  // Fin de playlist sin repeat-all → no hay siguiente que precargar
  if (repeatMode !== "all" && currentTrackIdx >= playlist.length - 1) return null;

  const nextIdx = (currentTrackIdx + 1) % playlist.length;
  return playlist[nextIdx]?.file || null;
}

function _shouldSkipPrefetch() {
  if (!navigator.onLine) return true;
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn) {
    if (conn.saveData) return true;                              // modo ahorro de datos activo
    if (conn.effectiveType && /2g/.test(conn.effectiveType)) return true; // red muy lenta
  }
  return false;
}

/* Cancela cualquier prefetch programado o en curso. Se llama siempre que
   cambia la pista (loadTrack) para que saltar canciones rápido no apile
   descargas paralelas compitiendo por la conexión.                       */
function _cancelPrefetch() {
  if (_prefetchTimer) { clearTimeout(_prefetchTimer); _prefetchTimer = null; }
  if (_prefetchController) { try { _prefetchController.abort(); } catch(_) {} _prefetchController = null; }
}

function _prefetchNextTrack() {
  _cancelPrefetch();
  const myToken = _playToken; // token de la pista que está sonando AHORA
  // Esperamos a que la pista actual lleve un rato sonando bien antes de
  // gastar ancho de banda en precargar la siguiente.
  _prefetchTimer = setTimeout(() => {
    _prefetchTimer = null;
    if (myToken !== _playToken) return;            // ya cambió de pista, abortar
    if (_shouldSkipPrefetch()) return;
    if (activeAudio.readyState < 3) return;          // la actual aún no está bien bufferizada, no competir

    const nextFile = _peekNextTrackFile();
    if (!nextFile) return;
    if (_prefetchedFiles.has(nextFile)) return;
    // Si ya está descargada offline, no hace falta red — ya está disponible.
    if (typeof OfflineManager !== 'undefined' && OfflineManager.isDownloaded(nextFile)) return;

    _prefetchedFiles.add(nextFile);
    _prefetchController = new AbortController();
    fetch(nextFile, {
      credentials: "same-origin",
      signal: _prefetchController.signal,
      priority: "low",                               // no competir con recursos críticos (Chrome/Edge)
      headers: { "Range": `bytes=0-${PREFETCH_BYTES - 1}` }
    })
      .then(r => { if (r.ok || r.status === 206) return r.blob(); })
      .catch(() => { _prefetchedFiles.delete(nextFile); })
      .finally(() => { if (myToken === _playToken) _prefetchController = null; });
  }, 2000); // margen de 2s para no pisar el arranque de la pista actual
}


/* Detección de iOS reutilizable fuera de _doPlay (Safari/PWA standalone en
   iPhone/iPad, incluido iPadOS que se identifica como Mac con touch).      */
function isIOSForOfflineCheck() {
  return /iP(hone|ad|od)/.test(navigator.userAgent) ||
         (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

/* Cancela cualquier watchdog/retry pendiente del track anterior. Se llama
   al arrancar loadTrack() para garantizar que ningún timer fantasma del
   track viejo pueda interferir con el nuevo (causa real de los "errores
   al cambiar de canción": dos reintentos compitiendo por el mismo audioEl). */
function _clearPendingAudioWatchers() {
  if (_watchdogTimer) { clearTimeout(_watchdogTimer); _watchdogTimer = null; }
  _retryInFlight = false;
}

/* ── Background blur transition (visual only) ─────── */
function animateBackgroundTransition(newCover) {
  const bg = sheetBgBlur;
  bg.style.transition = "opacity .4s ease";
  bg.style.opacity = "0";
  setTimeout(() => {
    bg.style.backgroundImage = "url(" + newCover + ")";
    bg.style.opacity = "1";
  }, 200);
}

/* ══════════════════════════════════════════════════════
   CONTROLADOR ÚNICO DE VISTA DEL SHEET (Portada / Letra / Cola)
   Antes había dos sistemas independientes pisándose entre sí
   (uno para portada↔letra, otro para portada↔cola), lo que
   provocaba transiciones rotas al alternar rápido entre las tres.
   Ahora todo pasa por aquí: una sola fuente de verdad + un único
   timer de "ocultar tras animar" que se cancela si cambia la vista
   antes de que termine.
══════════════════════════════════════════════════════ */
let _sheetView = 'cover'; // 'cover' | 'lyrics' | 'queue'
let _sheetViewHideTimer = null;

function setSheetView(view) {
  const coverArea  = document.getElementById('sheetCoverArea');
  const lyricsArea = document.getElementById('sheetLyricsArea');
  const queueArea  = document.getElementById('sheetQueueArea');
  const lyricsBtnEl = document.getElementById('sheetLyricsBtn');
  const queueBtnEl  = document.getElementById('sheetQueueBtn');

  if (view === _sheetView) return;
  _sheetView = view;

  // Cancela cualquier "ocultar tras animar" pendiente de la transición anterior
  if (_sheetViewHideTimer) { clearTimeout(_sheetViewHideTimer); _sheetViewHideTimer = null; }

  if (lyricsBtnEl) lyricsBtnEl.classList.toggle('active', view === 'lyrics');
  if (queueBtnEl)  queueBtnEl.classList.toggle('active',  view === 'queue');

  // -- Portada --
  if (coverArea) {
    if (view === 'cover') {
      coverArea.style.display = '';
      requestAnimationFrame(() => coverArea.classList.remove('slide-out'));
    } else {
      coverArea.classList.add('slide-out');
    }
  }

  // -- Letra --
  if (lyricsArea) {
    if (view === 'lyrics') {
      lyricsArea.style.transition = 'opacity .28s ease, transform .32s cubic-bezier(.4,0,.2,1)';
      lyricsArea.style.display = '';
      lyricsArea.classList.add('slide-in-start');
      lyricsArea.classList.remove('slide-in-ready');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        lyricsArea.classList.remove('slide-in-start');
        lyricsArea.classList.add('slide-in-ready');
      }));
      if (typeof lyricsReady !== 'undefined' && lyricsReady && typeof activeLine !== 'undefined' && activeLine >= 0 && typeof scrollToActive === 'function') {
        scrollToActive(activeLine, true);
      }
      const audio = document.getElementById('mainAudio');
      if (audio && !audio.paused && typeof startTick === 'function' && !rafId) startTick();
    } else {
      lyricsArea.style.transition = 'opacity .2s ease';
      lyricsArea.classList.add('slide-in-start');
      lyricsArea.classList.remove('slide-in-ready');
    }
  }

  // -- Cola --
  if (queueArea) {
    if (view === 'queue') {
      if (typeof renderSheetQueue === 'function') renderSheetQueue();
      queueArea.classList.add('visible');
      requestAnimationFrame(() => requestAnimationFrame(() => queueArea.classList.add('active')));
    } else {
      queueArea.classList.remove('active');
    }
  }

  // Tras la animación más larga, oculta del todo lo que ya no es la vista activa
  _sheetViewHideTimer = setTimeout(() => {
    if (coverArea  && view !== 'cover')  coverArea.style.display  = 'none';
    if (lyricsArea && view !== 'lyrics') lyricsArea.style.display = 'none';
    if (queueArea  && view !== 'queue')  queueArea.classList.remove('visible');
    _sheetViewHideTimer = null;
  }, 360);
}

function resetSheetViewToCover() {
  // Fuerza estado limpio sin animación (usado al cargar una canción nueva
  // o al cerrar el sheet) para que la próxima apertura empiece consistente
  if (_sheetViewHideTimer) { clearTimeout(_sheetViewHideTimer); _sheetViewHideTimer = null; }
  _sheetView = 'cover';
  const coverArea  = document.getElementById('sheetCoverArea');
  const lyricsArea = document.getElementById('sheetLyricsArea');
  const queueArea  = document.getElementById('sheetQueueArea');
  const lyricsBtnEl = document.getElementById('sheetLyricsBtn');
  const queueBtnEl  = document.getElementById('sheetQueueBtn');
  if (coverArea)  { coverArea.style.display = ''; coverArea.classList.remove('slide-out'); }
  if (lyricsArea) { lyricsArea.style.display = 'none'; lyricsArea.classList.add('slide-in-start'); lyricsArea.classList.remove('slide-in-ready'); }
  if (queueArea)  { queueArea.classList.remove('active', 'visible'); }
  if (lyricsBtnEl) lyricsBtnEl.classList.remove('active');
  if (queueBtnEl)  queueBtnEl.classList.remove('active');
}
window._droplyResetSheetView = resetSheetViewToCover;

/* ══════════════════════════════════════════════════════
   LOAD TRACK
══════════════════════════════════════════════════════ */
// Token para cancelar plays pendientes si llega otro loadTrack antes
let _playToken = 0;
let _currentBlobUrl = null;

function _revokeBlobUrl() {
  if (_currentBlobUrl) {
    try { URL.revokeObjectURL(_currentBlobUrl); } catch (_) {}
    _currentBlobUrl = null;
  }
}

function loadTrack(item, fromQueue = false, newPlaylistContext = null, options = {}) {
  if (item.type !== "music") return;
  const { autoPlay = true, silent = false } = options;

  // ── Comprobación offline ──────────────────────────────────────────────────
  // Si no hay conexión y la canción no está descargada, avisar y salir
  // Saltar para YouTube items (requieren conexión)
  if (!item.youtubeId && !navigator.onLine && typeof OfflineManager !== 'undefined' && !OfflineManager.isDownloaded(item.file)) {
    if (typeof showToast === 'function') {
      showToast(`"${item.title}" no está descargada — sin conexión`, 'default');
    }
    return;
  }

  const cover = item.cover || getPlaceholderCover(item.category);

  /* -- History & stats (skip on silent session restore) -- */
  if (!silent) {
    historyTracks.unshift({ file: item.file, timestamp: Date.now() });
    historyTracks = historyTracks
      .filter((v, i, arr) => arr.findIndex(x => x.file === v.file) === i)
      .slice(0, 100);
    saveHistory();
    playCounts[item.file] = (playCounts[item.file] || 0) + 1;
    savePlayCounts();
    // Actualizar racha al reproducir (una vez por día)
    tickStreak();
    updateStreakUI();
    // Actualizar género favorito en perfil si está visible
    const genreEl = document.getElementById('statGenre');
    if (genreEl) { const g = getFavoriteGenre(); if (g) genreEl.textContent = g; }
    try { document.dispatchEvent(new CustomEvent("droply:trackchange", { detail: item })); } catch(_) {}
  }

  /* -- Playlist context -- */
  if (!fromQueue) {
    if (newPlaylistContext) {
      playlist = newPlaylistContext;
    } else {
      // Preserve the current playlist context if the track exists in it;
      // only fall back to all-media if it's not found in the current context.
      const idxInCurrent = playlist.findIndex(p => p.file === item.file);
      if (idxInCurrent < 0) playlist = media.filter(m => m.type === "music");
    }
    currentTrackIdx = playlist.findIndex(p => p.file === item.file);
  } else {
    const idx = playlist.findIndex(p => p.file === item.file);
    if (idx >= 0) currentTrackIdx = idx;
  }

  /* -- UI -- */
  miniCover.src = cover;
  miniTitle.textContent  = item.title;
  miniArtist.textContent = item.artist;
  miniPlayer.classList.add("visible");

  sheetCover.src = cover;
  sheetCategory.textContent = item.category;
  sheetTitle.textContent    = item.title;
  sheetArtist.textContent   = item.artist;
  animateBackgroundTransition(cover);

  const liked = likedTracks.has(item.file);
  sheetHeart.classList.toggle("liked", liked);

  document.querySelectorAll(".media-card").forEach(c => c.classList.remove("is-playing"));
  document.querySelectorAll(`.media-card[data-file="${CSS.escape(item.file)}"]`)
    .forEach(c => c.classList.add("is-playing"));

  renderQueueNowPlaying(item);
  setupMediaSession(item);

  /* -- Trigger lyrics pre-fetch + reset to cover view -- */
  if (typeof window._droplyLoadLyrics === 'function') window._droplyLoadLyrics(item);

  /* -- Home continue card -- */
  const hccCoverEl = document.getElementById("hccCover");
  if (hccCoverEl) {
    hccCoverEl.src = cover;
    const hccTitleEl  = document.getElementById("hccTitle");
    const hccArtistEl = document.getElementById("hccArtist");
    const hccGlowEl   = document.getElementById("hccGlow");
    const contSec     = document.getElementById("homeContinueSection");
    if (hccTitleEl)  hccTitleEl.textContent  = item.title;
    if (hccArtistEl) hccArtistEl.textContent = item.artist;
    if (hccGlowEl)   hccGlowEl.style.backgroundImage = `url(${cover})`;
    if (contSec)     contSec.style.display = "";
    const hccBtn = document.getElementById("hccPlayBtn");
    if (hccBtn) hccBtn.onclick = () => {
      const currentFile = playlist[currentTrackIdx]?.file;
      if (currentFile === item.file) {
        togglePlay();
      } else {
        loadTrack(item);
      }
    };
  }

  /* -- Audio: hard switch limpio -- */
  // Cancela cualquier watchdog/reintento de error que aún estuviera pendiente
  // del track anterior. Si no se hace, ese reintento fantasma podía disparar
  // su propio load()/play() justo cuando ya estábamos cargando la canción
  // nueva, chocando con ella (la causa más frecuente de "falla al pasar
  // canción" tanto en la PWA en primer plano como con pantalla bloqueada).
  if (typeof _clearPendingAudioWatchers === 'function') _clearPendingAudioWatchers();
  if (typeof _cancelPrefetch === 'function') _cancelPrefetch();
  const myToken = ++_playToken;

  // Reset UI a estado "cargando"
  sheetFill.style.width        = "0%";
  sheetThumb.style.left        = "0%";
  sheetCurrent.textContent     = "0:00";
  sheetDuration.textContent    = "0:00";
  miniProgressFill.style.width = "0%";

  // Reset posición en pantalla de bloqueo ANTES de cambiar src
  // (evita que se muestre el tiempo del track anterior mientras carga el nuevo)
  if ("mediaSession" in navigator) {
    try {
      navigator.mediaSession.setPositionState({
        duration: 0,
        playbackRate: 1,
        position: 0
      });
    } catch(_) {}
  }

  // El cambio de src a continuación abortará automáticamente el playback anterior
  // sin destruir el contexto de MediaSession, lo cual es crítico para Android en background.

  function _doPlay(audioSrc) {
    if (myToken !== _playToken) return;
    _ytTrackActive = false;
    _stopYtKeepAlive();
    _stopYtProgressPoll();
    _revokeBlobUrl();
    if (audioSrc && audioSrc.startsWith("blob:")) _currentBlobUrl = audioSrc;

    activeAudio.src = audioSrc;
    activeAudio.muted = false;
    if (activeAudio.volume === 0) activeAudio.volume = 1;

    if (!autoPlay) {
      isPlaying = false;
      updatePlayIcons(false);
      return;
    }

    window._droplyFromLockscreen = false;

    // Mostrar spinner de carga inmediatamente — se quitará en el evento "playing"
    if (typeof _setAudioLoadingState === 'function') _setAudioLoadingState(true);

    // iOS: cuando venimos del evento "ended", el elemento de audio aún tiene el
    // contexto de gesto activo. Si llamamos load() primero lo destruimos y el
    // play() siguiente se deniega en silencio (el track "cambia" en la pantalla
    // de bloqueo pero no suena). Solución: llamar play() inmediatamente sin load().
    // En cualquier otro caso (tap manual, etc.) usamos el flujo normal con
    // load() + espera de canplay para minimizar el delay de buffering.
    if (window._droplyFromEnded) {
      activeAudio.play()
        .then(() => {
          if (myToken !== _playToken) return;
          isPlaying = true;
          updatePlayIcons(true);
        })
        .catch(err => {
          if (myToken !== _playToken) return;
          console.warn("[DROPLY] play (from ended) error:", err.name, err.message);
          isPlaying = false;
          updatePlayIcons(false);
          if (typeof _setAudioLoadingState === 'function') _setAudioLoadingState(false);
        });
      _armPlaybackWatchdog();
      return;
    }

    // En móvil el navegador no buffea hasta que se llama play(). Pero play()
    // sin buffer causa un delay de 1-4s. Estrategia: load() arranca la descarga,
    // esperamos "canplay" (readyState >= 3) antes de play(). Si tarda >800ms
    // reproducimos igualmente para no frustrar al usuario. En escritorio "canplay"
    // llega casi inmediato ya que preload="metadata" + red rápida.
    try { activeAudio.load(); } catch(_) {}

    let _canplayFired = false;
    const _canplayTimeout = setTimeout(() => {
      if (_canplayFired) return;
      _canplayFired = true;
      activeAudio.removeEventListener('canplay', _onCanPlay);
      _triggerPlay();
    }, 800);

    function _onCanPlay() {
      if (_canplayFired) return;
      _canplayFired = true;
      clearTimeout(_canplayTimeout);
      activeAudio.removeEventListener('canplay', _onCanPlay);
      _triggerPlay();
    }

    function _triggerPlay() {
      if (myToken !== _playToken) return;
      activeAudio.play()
        .then(() => {
          if (myToken !== _playToken) return;
          isPlaying = true;
          updatePlayIcons(true);
        })
        .catch(err => {
          if (myToken !== _playToken) return;
          console.warn("[DROPLY] play error:", err.name, err.message);
          isPlaying = false;
          updatePlayIcons(false);
          if (typeof _setAudioLoadingState === 'function') _setAudioLoadingState(false);
        });
    }

    activeAudio.addEventListener('canplay', _onCanPlay, { once: true });

    _armPlaybackWatchdog();
  }

  if (item.youtubeId) {
    _playYouTubeTrack(item, myToken);
    return;
  }

  if (item._offlineSrc) {
    _doPlay(item._offlineSrc);
  } else if (typeof OfflineManager !== 'undefined' && OfflineManager.isDownloaded(item.file)) {
    // En iOS NO podemos esperar a IndexedDB antes de play(): getOfflineSrc()
    // es una operación async real (no microtask), y esperarla aquí rompe la
    // cadena de gesto de usuario en Safari — el play() que llega después ya
    // no cuenta como gesto válido y el audio se deniega en silencio. Por eso
    // en iOS arrancamos YA con la URL de red (sigue siendo el mismo archivo,
    // simplemente no se sirve desde el blob cacheado) y, si existe blob
    // offline, lo intercambiamos en caliente sin perder la reproducción.
    if (isIOSForOfflineCheck() && navigator.onLine) {
      // Solo usamos el atajo de "red primero, blob después" si HAY conexión.
      // Si no hay red, item.file fallaría igualmente, así que es mejor
      // esperar el blob offline (la única opción real) aunque eso implique
      // pasar por una promesa async antes de play().
      _doPlay(item.file);
      OfflineManager.getOfflineSrc(item.file).then(blobUrl => {
        if (!blobUrl) return;
        if (myToken !== _playToken) return; // ya se cambió de canción
        const wasPlaying = !activeAudio.paused;
        const resumeAt = activeAudio.currentTime || 0;
        _revokeBlobUrl();
        _currentBlobUrl = blobUrl;
        activeAudio.src = blobUrl;
        try { activeAudio.load(); } catch(_) {}
        activeAudio.addEventListener("loadedmetadata", function _onReady() {
          activeAudio.removeEventListener("loadedmetadata", _onReady);
          if (myToken !== _playToken) return;
          try { activeAudio.currentTime = resumeAt; } catch(_) {}
          if (wasPlaying) activeAudio.play().catch(() => {});
        }, { once: true });
      }).catch(() => {});
    } else {
      OfflineManager.getOfflineSrc(item.file).then(blobUrl => {
        _doPlay(blobUrl || item.file);
      }).catch(() => _doPlay(item.file));
    }
  } else {
    _doPlay(item.file);
  }
}



/* ══════════════════════════════════════════════════════
   YOUTUBE IFRAME PLAYER API + RENDER BACKGROUND PLAYBACK
   Foreground:  YT iframe.  Background (<audio>) via Render/yt-dlp proxy.
══════════════════════════════════════════════════════ */
const RENDER_SERVER = 'https://droply-music.onrender.com';
let _ytPlayer = null;
let _ytReady = false;
let _ytTrackActive = false;
let _ytPollId = null;
let _ytState = -1;
let _ytKeepAliveId = null;
let _ytAudioUrl = null;
let _ytBgFallback = false;
let _ytAudioPollId = null;
let _ytPendingVideoId = null;

window.onYouTubeIframeAPIReady = function () {
  _ytPlayer = new YT.Player('yt-player', {
    height: 1, width: 1,
    playerVars: {
      controls: 0, disablekb: 1, fs: 0, iv_load_policy: 3,
      modestbranding: 1, playsinline: 1, rel: 0, autoplay: 0, enablejsapi: 1,
    },
    events: {
      onReady: () => {
        _ytReady = true;
        if (_ytPendingVideoId && _ytTrackActive) {
          _ytPlayer.loadVideoById(_ytPendingVideoId);
          _ytPendingVideoId = null;
        }
      },
      onStateChange: _onYtStateChange,
      onError: _onYtError,
    }
  });
};

function _onYtStateChange(event) {
  _ytState = event.data;
  if (!_ytTrackActive && event.data !== 5) return;
  switch (event.data) {
    case 1:
      isPlaying = true; updatePlayIcons(true); _startYtProgressPoll();
      break;
    case 2:
      isPlaying = false; updatePlayIcons(false); _stopYtProgressPoll();
      break;
    case 0:
      isPlaying = false; updatePlayIcons(false); _stopYtProgressPoll(); _stopYtKeepAlive();
      if (repeatMode === 'one') { _ytPlayer?.seekTo(0, true); _ytPlayer?.playVideo(); _startYtKeepAlive(); }
      else _playNextImmediate();
      break;
  }
}

function _onYtError(event) {
  _stopYtProgressPoll();
  if (_ytTrackActive && typeof showToast === 'function')
    showToast(event.data === 150 || event.data === 2 ? 'Video no disponible' : 'Error al reproducir', 'default');
}

function _startYtProgressPoll() {
  _stopYtProgressPoll(); _stopAudioProgressPoll();
  _ytPollId = setInterval(() => {
    if (!_ytTrackActive || !_ytPlayer || !_ytReady || _ytBgFallback) return;
    const dur = _ytPlayer.getDuration();
    const cur = _ytPlayer.getCurrentTime();
    if (dur && isFinite(dur) && dur > 0) {
      const pct = Math.max(0, Math.min(100, (cur / dur) * 100));
      sheetFill.style.width = pct + '%';
      sheetThumb.style.left = pct + '%';
      sheetCurrent.textContent = formatTime(cur);
      sheetDuration.textContent = formatTime(dur);
      miniProgressFill.style.width = pct + '%';
      _updateMediaSessionPosition();
    }
  }, 250);
}

function _stopYtProgressPoll() {
  if (_ytPollId) { clearInterval(_ytPollId); _ytPollId = null; }
}

function _startAudioProgressPoll() {
  _stopAudioProgressPoll(); _stopYtProgressPoll();
  _ytAudioPollId = setInterval(() => {
    if (!_ytTrackActive || !_ytBgFallback) { _stopAudioProgressPoll(); return; }
    const dur = activeAudio.duration;
    const cur = activeAudio.currentTime;
    if (dur && isFinite(dur) && dur > 0) {
      const pct = Math.max(0, Math.min(100, (cur / dur) * 100));
      sheetFill.style.width = pct + '%';
      sheetThumb.style.left = pct + '%';
      sheetCurrent.textContent = formatTime(cur);
      sheetDuration.textContent = formatTime(dur);
      miniProgressFill.style.width = pct + '%';
      _updateMediaSessionPosition();
    }
  }, 250);
}

function _stopAudioProgressPoll() {
  if (_ytAudioPollId) { clearInterval(_ytAudioPollId); _ytAudioPollId = null; }
}

function _startYtKeepAlive() {
  _stopYtKeepAlive();
  _ytKeepAliveId = setInterval(() => {
    if (!_ytTrackActive || !_ytPlayer || !_ytReady || !document.hidden || _ytBgFallback) return;
    if (_ytState === 2) {
      const dur = _ytPlayer.getDuration();
      const cur = _ytPlayer.getCurrentTime();
      if (dur && cur < dur - 0.5) _ytPlayer.playVideo();
    }
  }, 500);
}

function _stopYtKeepAlive() {
  if (_ytKeepAliveId) { clearInterval(_ytKeepAliveId); _ytKeepAliveId = null; }
}

async function _playYouTubeTrack(item, token) {
  if (token !== _playToken) return;
  try { activeAudio.pause(); } catch(_) {}
  activeAudio.removeAttribute('src');
  try { activeAudio.load(); } catch(_) {}

  sheetFill.style.width = '0%';
  sheetThumb.style.left = '0%';
  sheetCurrent.textContent = '0:00';
  sheetDuration.textContent = '0:00';
  miniProgressFill.style.width = '0%';

  _ytTrackActive = true;
  _ytBgFallback = false;
  _ytAudioUrl = null;

  if (item.cover) {
    miniCover.src = item.cover;
    sheetCover.src = item.cover;
  }

  if (item.youtubeId && RENDER_SERVER) {
    fetch(`${RENDER_SERVER}/info?videoId=${item.youtubeId}`)
      .then(r => r.json())
      .then(data => {
        if (token !== _playToken) return;
        if (!data.error && data.audioUrl) {
          _ytAudioUrl = data.audioUrl;
          if (data.cover && (!item.cover || item.cover.startsWith('data:'))) {
            item.cover = data.cover;
            miniCover.src = data.cover;
            sheetCover.src = data.cover;
          }
        }
      })
      .catch(() => {});
  }

  if (_ytPlayer && _ytReady) {
    _ytPlayer.loadVideoById(item.youtubeId);
    _startYtKeepAlive();
  } else {
    _ytPendingVideoId = item.youtubeId;
    if (typeof showToast === 'function') showToast('Iniciando reproductor YouTube...', 'default');
    const check = setInterval(() => {
      if (token !== _playToken) { clearInterval(check); return; }
      if (_ytPlayer && _ytReady) {
        clearInterval(check);
        if (_ytPendingVideoId) {
          _ytPlayer.loadVideoById(_ytPendingVideoId);
          _ytPendingVideoId = null;
        }
        _startYtKeepAlive();
      }
    }, 300);
    setTimeout(() => clearInterval(check), 15000);
  }
}

function _makeYtTrack(item) {
  return {
    type: 'music',
    title: item.title,
    artist: item.artist,
    cover: item.cover || getPlaceholderCover('music'),
    youtubeId: item.youtubeId,
    file: 'yt:' + item.youtubeId,
    category: item.category || '',
    duration: item.duration || null
  };
}

window.playYouTubeTrack = function(item) {
  const track = _makeYtTrack(item);
  if (!_ytLibrary.find(t => t.file === track.file)) {
    _ytLibrary.push(track);
    saveYtLibrary();
  }
  loadTrack(track);
};

/* ── Background playback via <audio> + Render proxy ──── */
document.addEventListener('visibilitychange', () => {
  if (!_ytTrackActive) return;

  if (document.hidden && _ytAudioUrl && !_ytBgFallback) {
    _ytBgFallback = true;
    _stopYtKeepAlive();
    if (_ytPlayer && _ytReady) try { _ytPlayer.pauseVideo(); } catch(_) {}
    _stopYtProgressPoll();

    activeAudio.src = _ytAudioUrl;
    activeAudio.muted = false;
    if (activeAudio.volume === 0) activeAudio.volume = 1;
    try { activeAudio.load(); } catch(_) {}
    activeAudio.play()
      .then(() => {
        isPlaying = true;
        updatePlayIcons(true);
        _startAudioProgressPoll();
      })
      .catch(() => { _ytBgFallback = false; });

  } else if (!document.hidden && _ytBgFallback) {
    _ytBgFallback = false;
    _stopAudioProgressPoll();
    try { activeAudio.pause(); } catch(_) {}
    activeAudio.removeAttribute('src');
    try { activeAudio.load(); } catch(_) {}

    if (_ytPlayer && _ytReady) {
      _ytPlayer.playVideo();
      _startYtKeepAlive();
    }
  }
});

/* ── Seek / Volume (always on active audio) ──────────── */
// Volume
volSlider.addEventListener("input", () => {
  activeAudio.volume = parseFloat(volSlider.value);
});

function seekToPercent(pct) {
  if (_ytTrackActive && _ytPlayer && _ytReady) {
    const dur = _ytPlayer.getDuration();
    if (dur && isFinite(dur) && dur > 0) {
      _ytPlayer.seekTo(Math.max(0, Math.min(1, pct)) * dur, true);
    }
    return;
  }
  const audio = activeAudio;
  if (audio.duration && isFinite(audio.duration))
    audio.currentTime = Math.max(0, Math.min(1, pct)) * audio.duration;
}
sheetBar.addEventListener("click", e => {
  const rect = sheetBar.getBoundingClientRect();
  seekToPercent((e.clientX - rect.left) / rect.width);
});
let barDragging = false;
sheetBar.addEventListener("touchstart", e => { barDragging = true; const r = sheetBar.getBoundingClientRect(); seekToPercent((e.touches[0].clientX - r.left) / r.width); }, { passive:true });
sheetBar.addEventListener("touchmove",  e => { if (!barDragging) return; const r = sheetBar.getBoundingClientRect(); seekToPercent((e.touches[0].clientX - r.left) / r.width); }, { passive:true });
sheetBar.addEventListener("touchend",   () => { barDragging = false; }, { passive:true });

/* ── Swipe-down-to-close: drag sheet with finger ─────── */
(function sheetSwipeDismiss() {
  const sheet = nowPlayingSheet;
  const THRESHOLD    = 120;
  const VELOCITY_MIN = 0.5;
  let startY = 0, startX = 0, dy = 0, startTime = 0;
  let dragging = false, locked = false;

  sheet.addEventListener('touchstart', e => {
    const lyricsScroll = document.getElementById('sheetLyricsScroll');
    const atTop = !lyricsScroll || lyricsScroll.scrollTop < 4;
    const touchY = e.touches[0].clientY;
    const touchX = e.touches[0].clientX;
    const relY = touchY - sheet.getBoundingClientRect().top;
    const inTopZone = relY < sheet.clientHeight * 0.25;
    if (!inTopZone && !atTop) return;
    startY = touchY; startX = touchX;
    startTime = Date.now(); dy = 0;
    dragging = false; locked = false;
    sheet.style.transition = 'none';
  }, { passive: true });

  sheet.addEventListener('touchmove', e => {
    if (locked) return;
    const curY = e.touches[0].clientY;
    const curX = e.touches[0].clientX;
    const ddx  = Math.abs(curX - startX);
    const ddy  = curY - startY;
    if (!dragging) {
      if (Math.abs(ddy) < 6 && ddx < 6) return;
      if (ddx > Math.abs(ddy)) { locked = true; return; }
      if (ddy < 0) { locked = true; return; }
      dragging = true;
    }
    dy = Math.max(0, ddy);
    const t = dy < THRESHOLD ? dy : THRESHOLD + (dy - THRESHOLD) * 0.25;
    sheet.style.transform = `translateY(${t}px)`;
    sheet.style.opacity   = String(1 - Math.min(1, dy / (THRESHOLD * 2)) * 0.28);
    if (dy > 10) e.preventDefault();
  }, { passive: false });

  sheet.addEventListener('touchend', () => {
    if (!dragging) {
      sheet.style.transition = '';
      sheet.style.transform  = '';
      sheet.style.opacity    = '';
      return;
    }
    const velocity = dy / Math.max(1, Date.now() - startTime);
    sheet.style.transition = 'transform .38s cubic-bezier(.32,0,.67,0), opacity .32s ease';
    if (dy > THRESHOLD || velocity > VELOCITY_MIN) {
      sheet.style.transform = 'translateY(100%)';
      sheet.style.opacity   = '0';
      setTimeout(() => {
        sheet.classList.remove('open');
        sheet.style.transition = '';
        sheet.style.transform  = '';
        sheet.style.opacity    = '';
        if (typeof window._droplyResetSheetView === 'function') window._droplyResetSheetView();
      }, 380);
    } else {
      sheet.style.transform = '';
      sheet.style.opacity   = '';
      setTimeout(() => { sheet.style.transition = ''; }, 380);
    }
    dragging = false; locked = false; dy = 0;
  }, { passive: true });
})();

/* ══════════════════════════════════════════════════════
   13. LIKES
══════════════════════════════════════════════════════ */
function toggleLike(item) {
  const key = item.file;
  const wasLiked = likedTracks.has(key);
  if (wasLiked) {
    likedTracks.delete(key);
    showToast(`"${item.title}" eliminada de Likes`);
  } else {
    likedTracks.add(key);
    showToast(`"${item.title}" añadida a Likes`, "success");
  }
  saveLiked();
  // Update heart state in sheet if current track
  const cur = playlist[currentTrackIdx];
  if (cur?.file === key) sheetHeart.classList.toggle("liked", !wasLiked);
  // Update card liked dot
  document.querySelectorAll(".media-card").forEach(card => {
    const title = card.querySelector(".card-title")?.textContent;
    if (title === item.title) {
      const dot = card.querySelector(".card-liked-dot");
      if (dot) dot.classList.toggle("visible", !wasLiked);
    }
  });
  if (document.getElementById("pageFavoritos").classList.contains("active")) renderFavoritos();
}

/* ══════════════════════════════════════════════════════
   14. FAVORITOS PAGE
══════════════════════════════════════════════════════ */
function renderFavoritos() {
  favoritosList.innerHTML = "";
  const likedItems = [...media, ..._ytLibrary].filter(m => m.type === "music" && likedTracks.has(m.file));
  if (likedItems.length === 0) {
    favoritosList.innerHTML = `<div class="fav-empty"><svg viewBox="0 0 24 24" width="48" height="48" style="margin:0 auto 1rem;display:block;color:#e94f4f;opacity:.4"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><p style="color:#b3b3b3;text-align:center;font-size:.9rem">Aún no tienes canciones favoritas.<br>Pulsa el ❤ en cualquier canción.</p></div>`;
    return;
  }
  likedItems.forEach((item, idx) => {
    const cover = item.cover || getPlaceholderCover(item.category);
    const row = buildLibraryRow(item, idx + 1, cover, () => {
      loadTrack(item, false, likedItems);
    }, item);
    favoritosList.appendChild(row);
  });
}

function buildLibraryRow(item, num, cover, onClick, itemForCtx) {
  const row = document.createElement("div");
  row.className = "library-item fade-in";
  row.dataset.file = item.file;
  const isCurrentTrack = playlist[currentTrackIdx]?.file === item.file;
  if (isCurrentTrack) row.classList.add("playing");
  row.innerHTML = `
    <span class="library-item-num">${num}</span>
    <div class="library-thumb"><img src="${cover}" alt="${item.title}" onerror="this.src='${getPlaceholderCover(item.category)}'" /></div>
    <div class="library-info">
      <span class="library-track-title">${item.title}${downloadedEmojiHtml((typeof OfflineManager !== 'undefined') && OfflineManager.isDownloaded(item.file))}</span>
      <span class="library-track-artist">${item.artist}</span>
    </div>
    <div class="library-item-actions">
      <button class="library-action-btn library-action-more" data-action="more" title="Más opciones" aria-label="Más opciones">
        <svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none"/></svg>
      </button>
    </div>
    <span class="library-item-dur">${item.duration || ""}</span>`;
  row.addEventListener("click", e => { if (!e.target.closest(".library-item-actions")) onClick(); });
  row.querySelector('[data-action="more"]').addEventListener("click", e => { e.stopPropagation(); openContextMenu(itemForCtx || item); });
  return row;
}

/* ══════════════════════════════════════════════════════
   15. PLAYLISTS
══════════════════════════════════════════════════════ */
function createPlaylist(name) {
  const pl = { id: Date.now().toString(), name: name.trim(), tracks: [] };
  playlists.push(pl);
  savePlaylists();
  renderPlaylists();
  showToast(`Playlist "${pl.name}" creada`, "success");
  return pl;
}

function deletePlaylist(id) {
  playlists = playlists.filter(p => p.id !== id);
  savePlaylists();
  renderPlaylists();
  showToast("Playlist eliminada");
}

function addTrackToPlaylist(playlistId, trackFile) {
  const pl = playlists.find(p => p.id === playlistId);
  if (!pl) return;
  if (pl.tracks.includes(trackFile)) { showToast("Ya está en la playlist"); return; }
  pl.tracks.push(trackFile);
  savePlaylists();
  showToast(`Añadida a "${pl.name}"`, "success");
}

function removeTrackFromPlaylist(playlistId, trackFile) {
  const pl = playlists.find(p => p.id === playlistId);
  if (!pl) return;
  pl.tracks = pl.tracks.filter(f => f !== trackFile);
  savePlaylists();
  openPlaylistDetail(playlistId); // refresh
  showToast("Eliminada de la playlist");
}

function renderPlaylists() {
  playlistsGrid.innerHTML = "";
  if (playlists.length === 0) {
    playlistsGrid.innerHTML = `<div class="playlists-empty" style="grid-column:1/-1"><p>No tienes playlists aún.<br>Crea una con el botón de arriba.</p></div>`;
    return;
  }
  playlists.forEach(pl => {
    const card = document.createElement("div");
    card.className = "playlist-card fade-in";
    const trackImgs = pl.tracks.slice(0, 4).map(f => getTrackByFile(f)?.cover || "").filter(Boolean);
    const coverHTML = buildPlaylistCoverHTML(trackImgs, "playlist-card-cover");
    const allDownloaded = pl.tracks.length > 0 && (typeof OfflineManager !== 'undefined') &&
      pl.tracks.every(f => OfflineManager.isDownloaded(f));
    card.innerHTML = `
      ${coverHTML}
      <div class="playlist-card-body">
        <div class="playlist-card-name">${pl.name}${allDownloaded ? ' <span class="track-dl-emoji" title="Playlist descargada"><svg viewBox="0 0 8 8" width="8" height="8"><circle cx="4" cy="4" r="4" fill="#22c55e"/></svg></span>' : ''}</div>
        <div class="playlist-card-count">${pl.tracks.length} cancion${pl.tracks.length !== 1 ? "es" : ""}</div>
      </div>`;
    card.addEventListener("click", () => openPlaylistDetail(pl.id));
    playlistsGrid.appendChild(card);
  });
}

function buildPlaylistCoverHTML(trackImgs, className) {
  if (trackImgs.length === 0) {
    return `<div class="${className} single"><div class="playlist-card-cover-placeholder"><svg viewBox="0 0 24 24" width="60" height="60" style="opacity:.25;color:#b3b3b3"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg></div></div>`;
  }
  if (trackImgs.length === 1) {
    return `<div class="${className} single"><img src="${trackImgs[0]}" alt="cover" /></div>`;
  }
  const imgs = trackImgs.slice(0, 4).map(src => `<img src="${src}" alt="cover" />`).join("");
  return `<div class="${className}">${imgs}</div>`;
}

function openPlaylistDetail(id) {
  const pl = playlists.find(p => p.id === id);
  if (!pl) return;
  openPlaylistId = id;

  // Top bar title (hidden initially, shown on scroll)
  const topTitle = document.getElementById("playlistPageTopTitle");
  if (topTitle) { topTitle.textContent = pl.name; topTitle.classList.remove("visible"); }

  playlistDetailName.textContent = pl.name;
  playlistDetailCount.textContent = `${pl.tracks.length} cancion${pl.tracks.length !== 1 ? "es" : ""}`;

  // Cover
  const trackImgs = pl.tracks.slice(0, 4).map(f => getTrackByFile(f)?.cover || "").filter(Boolean);
  playlistDetailCover.innerHTML = "";
  playlistDetailCover.className = "playlist-detail-cover";
  if (trackImgs.length === 0) {
    playlistDetailCover.innerHTML = `<div class="playlist-detail-cover-empty"><svg viewBox="0 0 24 24" width="40" height="40"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg></div>`;
  } else if (trackImgs.length === 1) {
    playlistDetailCover.classList.add("single");
    playlistDetailCover.innerHTML = `<img src="${trackImgs[0]}" alt="cover" />`;
  } else {
    trackImgs.slice(0, 4).forEach(src => {
      const img = document.createElement("img");
      img.src = src; img.alt = "cover";
      playlistDetailCover.appendChild(img);
    });
  }

  // Blurred bg from first cover
  const bgEl = document.getElementById("playlistPageBg");
  if (bgEl && trackImgs[0]) bgEl.style.backgroundImage = `url(${trackImgs[0]})`;

  // Track list
  playlistDetailList.innerHTML = "";
  const currentFile = playlist[currentTrackIdx]?.file;
  if (pl.tracks.length === 0) {
    playlistDetailList.innerHTML = `<p style="color:var(--text-soft);text-align:center;padding:2.5rem 1rem">No hay canciones aún.<br><span style="font-size:.8rem">Añade canciones usando el menú ⋯ en cualquier pista.</span></p>`;
  } else {
    pl.tracks.forEach((file, trackIdx) => {
      const item = getTrackByFile(file);
      if (!item) return;
      const cover = item.cover || getPlaceholderCover(item.category);
      const isPlaying = file === currentFile;

      // Outer wrapper for swipe reveal
      const wrap = document.createElement("div");
      wrap.className = "playlist-detail-item-wrap";

      // Red delete background
      const deleteBg = document.createElement("div");
      deleteBg.className = "playlist-detail-item-delete-bg";
      deleteBg.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/></svg><span>BORRAR</span>`;
      wrap.appendChild(deleteBg);

      const div = document.createElement("div");
      div.className = "playlist-detail-item" + (isPlaying ? " playing" : "");
      div.dataset.file = item.file;
      const isDownloaded = (typeof OfflineManager !== 'undefined') && OfflineManager.isDownloaded(item.file);
      div.innerHTML = `
        <img src="${cover}" alt="${item.title}" onerror="this.src='${getPlaceholderCover(item.category)}'">
        <div class="playlist-detail-info">
          <div class="playlist-detail-track">${item.title}${isDownloaded ? ' <span class="track-dl-emoji" title="Descargada"><svg viewBox="0 0 8 8" width="8" height="8"><circle cx="4" cy="4" r="4" fill="#22c55e"/></svg></span>' : ''}</div>
          <div class="playlist-detail-artist">${item.artist} · <span style="color:var(--accent);font-size:.68rem">${item.category}</span></div>
        </div>
        <span style="font-size:.72rem;color:var(--text-soft);flex-shrink:0;font-variant-numeric:tabular-nums">${item.duration || ""}</span>
        <button class="library-action-more playlist-more-btn" title="Más opciones" aria-label="Más opciones" style="flex-shrink:0;width:32px;height:32px;border-radius:50%;background:transparent;border:none;color:var(--text-soft);cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:1">
          <svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none"/></svg>
        </button>
        <button class="playlist-detail-remove" title="Eliminar de playlist">
          <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>`;

      div.addEventListener("click", e => {
        if (e.target.closest(".playlist-detail-remove")) return;
        if (e.target.closest(".playlist-more-btn")) return;
        const plItems = pl.tracks.map(f => getTrackByFile(f)).filter(Boolean);
        loadTrack(item, false, plItems);
        playlistDetailList.querySelectorAll(".playlist-detail-item").forEach(r => r.classList.remove("playing"));
        div.classList.add("playing");
      });
      div.querySelector(".playlist-more-btn").addEventListener("click", e => {
        e.stopPropagation();
        openContextMenu(item);
      });
      div.querySelector(".playlist-detail-remove").addEventListener("click", e => {
        e.stopPropagation();
        removeTrackFromPlaylist(id, file);
      });

      // ── Swipe-to-delete (touch) ─────────────────────────────
      const SWIPE_THRESHOLD = 72; // px to trigger delete
      let _swipeStartX = 0, _swipeStartY = 0, _swipeDx = 0, _swiping = false, _swipeLocked = false;

      div.addEventListener("touchstart", e => {
        _swipeStartX = e.touches[0].clientX;
        _swipeStartY = e.touches[0].clientY;
        _swipeDx = 0;
        _swiping = false;
        _swipeLocked = false;
        div.classList.remove("snap-back");
      }, { passive: true });

      div.addEventListener("touchmove", e => {
        const dx = e.touches[0].clientX - _swipeStartX;
        const dy = e.touches[0].clientY - _swipeStartY;

        // Lock direction after first clear movement
        if (!_swipeLocked) {
          if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            _swipeLocked = true;
            if (Math.abs(dy) > Math.abs(dx)) return; // vertical scroll wins
            _swiping = true;
          } else return;
        }
        if (!_swiping) return;

        _swipeDx = Math.min(0, dx); // only left
        div.style.transform = `translateX(${_swipeDx}px)`;
        div.classList.add("swiping");
        wrap.classList.add("swiping");

        // Colour intensity hint
        const ratio = Math.min(1, Math.abs(_swipeDx) / SWIPE_THRESHOLD);
        deleteBg.style.opacity = ratio;
        deleteBg.style.background = ratio >= 1 ? "#c0392b" : "#e94f4f";
      }, { passive: true });

      div.addEventListener("touchend", () => {
        div.classList.remove("swiping");
        wrap.classList.remove("swiping");
        deleteBg.style.opacity = "";
        deleteBg.style.background = "";

        if (!_swiping) return;
        _swiping = false;

        if (Math.abs(_swipeDx) >= SWIPE_THRESHOLD) {
          // Fly out and delete
          div.classList.add("fly-out");
          hapticFeedback("medium");
          setTimeout(() => {
            wrap.style.maxHeight = wrap.offsetHeight + "px";
            wrap.style.transition = "max-height .28s ease, opacity .28s";
            wrap.style.overflow = "hidden";
            requestAnimationFrame(() => { wrap.style.maxHeight = "0"; wrap.style.opacity = "0"; });
            setTimeout(() => {
              removeTrackFromPlaylist(id, file);
            }, 280);
          }, 60);
        } else {
          // Snap back
          div.classList.add("snap-back");
          div.style.transform = "";
          setTimeout(() => div.classList.remove("snap-back"), 350);
        }
        _swipeDx = 0;
      }, { passive: true });

      wrap.appendChild(div);
      playlistDetailList.appendChild(wrap);
    });
  }

  // Scroll-triggered topbar title
  const scrollEl = playlistDetailModal.querySelector(".playlist-page-scroll");
  if (scrollEl) {
    const onScroll = () => {
      const hero = playlistDetailModal.querySelector(".playlist-page-hero");
      if (!hero || !topTitle) return;
      const threshold = hero.offsetHeight - 60;
      topTitle.classList.toggle("visible", scrollEl.scrollTop > threshold);
    };
    scrollEl.removeEventListener("scroll", scrollEl._plScroll || (() => {}));
    scrollEl._plScroll = onScroll;
    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    scrollEl.scrollTop = 0;
  }

  playlistDetailModal.classList.add("open");
  document.body.style.overflow = "hidden";
}

// Play all playlist
btnPlayPlaylist.addEventListener("click", () => {
  if (!openPlaylistId) return;
  const pl = playlists.find(p => p.id === openPlaylistId);
  if (!pl || pl.tracks.length === 0) { showToast("La playlist está vacía"); return; }
  const plItems = pl.tracks.map(f => getTrackByFile(f)).filter(Boolean);
  loadTrack(plItems[0], false, plItems);
  // keep page open so user can browse while listening
  showToast(`Reproduciendo "${pl.name}"`, "success");
});

// Shuffle playlist
const btnShufflePlaylist = document.getElementById("btnShufflePlaylist");
if (btnShufflePlaylist) {
  btnShufflePlaylist.addEventListener("click", () => {
    if (!openPlaylistId) return;
    const pl = playlists.find(p => p.id === openPlaylistId);
    if (!pl || pl.tracks.length === 0) { showToast("La playlist está vacía"); return; }
    const plItems = shuffleArray(pl.tracks.map(f => getTrackByFile(f)).filter(Boolean));
    loadTrack(plItems[0], false, plItems);
    btnShufflePlaylist.classList.add("active");
    showToast("Reproducción aleatoria activada", "success");
  });
}

// Download all playlist tracks
const btnDownloadPlaylist = document.getElementById("btnDownloadPlaylist");
if (btnDownloadPlaylist) {
  btnDownloadPlaylist.addEventListener("click", async () => {
    if (!openPlaylistId) return;
    const pl = playlists.find(p => p.id === openPlaylistId);
    if (!pl || pl.tracks.length === 0) { showToast("La playlist está vacía"); return; }

    if (typeof OfflineManager === 'undefined') {
      showToast("Descarga offline no disponible", "default");
      return;
    }

    const plItems = pl.tracks.map(f => getTrackByFile(f)).filter(Boolean);
    const toDownload = plItems.filter(item => !OfflineManager.isDownloaded(item.file));

    if (toDownload.length === 0) {
      showToast("Todas las canciones ya están descargadas ✓", "success");
      return;
    }

    showToast(`Descargando ${toDownload.length} canciones…`, "default");
    btnDownloadPlaylist.disabled = true;

    let done = 0;
    for (const item of toDownload) {
      try {
        await OfflineManager.downloadTrack(item);
        done++;
      } catch (_) {}
    }

    btnDownloadPlaylist.disabled = false;
    showToast(`${done} de ${toDownload.length} canciones descargadas ✓`, "success");
    if (openPlaylistId) openPlaylistDetail(openPlaylistId);
    renderPlaylists();
    if (typeof renderHomeScreen === 'function') renderHomeScreen();
  });
}

btnDeletePlaylist.addEventListener("click", () => {
  if (!openPlaylistId) return;
  deletePlaylist(openPlaylistId);
  playlistDetailModal.classList.remove("open");
  document.body.style.overflow = "";
  openPlaylistId = null;
});

playlistDetailClose.addEventListener("click", () => {
  playlistDetailModal.classList.remove("open");
  document.body.style.overflow = "";
});
playlistDetailModal.addEventListener("click", e => { /* full-screen page — no overlay dismiss */ });

// Create playlist modal
btnCreatePlaylist.addEventListener("click", () => {
  playlistNameInput.value = "";
  createPlaylistModal.classList.add("open");
  setTimeout(() => playlistNameInput.focus(), 100);
});
createPlaylistClose.addEventListener("click", () => createPlaylistModal.classList.remove("open"));
createPlaylistModal.addEventListener("click", e => { if (e.target === createPlaylistModal) createPlaylistModal.classList.remove("open"); });
confirmCreatePlaylist.addEventListener("click", () => {
  const name = playlistNameInput.value.trim();
  if (!name) { playlistNameInput.focus(); return; }
  createPlaylist(name);
  createPlaylistModal.classList.remove("open");
});
playlistNameInput.addEventListener("keydown", e => { if (e.key === "Enter") confirmCreatePlaylist.click(); });

// Add to playlist modal
function openAddToPlaylist(item) {
  addToPlaylistList.innerHTML = "";
  if (playlists.length === 0) {
    addToPlaylistList.innerHTML = `<p style="color:var(--text-soft);font-size:.85rem;padding:.5rem">No tienes playlists aún.</p>`;
  } else {
    playlists.forEach(pl => {
      const trackImgs = pl.tracks.slice(0, 4).map(f => getTrackByFile(f)?.cover || "").filter(Boolean);
      const div = document.createElement("div");
      div.className = "add-pl-item";
      div.innerHTML = `
        ${buildAddPlCoverHTML(trackImgs)}
        <div class="add-pl-info">
          <div class="add-pl-name">${pl.name}</div>
          <div class="add-pl-count">${pl.tracks.length} canciones</div>
        </div>`;
      div.addEventListener("click", () => {
        addTrackToPlaylist(pl.id, item.file);
        addToPlaylistModal.classList.remove("open");
      });
      addToPlaylistList.appendChild(div);
    });
  }
  addToPlaylistModal.classList.add("open");
}

function buildAddPlCoverHTML(trackImgs) {
  if (trackImgs.length === 0)
    return `<div class="add-pl-cover single"><div class="add-pl-cover-empty"><svg viewBox="0 0 24 24" width="16" height="16" style="opacity:.3"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/></svg></div></div>`;
  if (trackImgs.length === 1)
    return `<div class="add-pl-cover single"><img src="${trackImgs[0]}" alt=""></div>`;
  return `<div class="add-pl-cover">${trackImgs.slice(0,4).map(s=>`<img src="${s}" alt="">`).join("")}</div>`;
}

addToPlaylistClose.addEventListener("click", () => addToPlaylistModal.classList.remove("open"));
addToPlaylistModal.addEventListener("click", e => { if (e.target === addToPlaylistModal) addToPlaylistModal.classList.remove("open"); });
addNewPlaylistBtn.addEventListener("click", () => {
  addToPlaylistModal.classList.remove("open");
  playlistNameInput.value = "";
  createPlaylistModal.classList.add("open");
  setTimeout(() => playlistNameInput.focus(), 100);
});

/* ══════════════════════════════════════════════════════
   16. HISTORIAL
══════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════
   17. SEARCH PAGE
══════════════════════════════════════════════════════ */
function buildGenreGrid() {
  const colors = ["#e94f4f","#1db954","#1f77b4","#d62728","#9467bd","#ff7f0e","#2ca02c","#ff1493"];
  getCategories().forEach((cat, i) => {
    const btn = document.createElement("button");
    btn.className = "genre-pill";
    btn.style.background = colors[i % colors.length];
    btn.innerHTML = `<span>${cat}</span>`;
    btn.addEventListener("click", () => openGenreDetail(cat));
    genreGrid.appendChild(btn);
  });
}

/* ══════════════════════════════════════════════════════
   GENRE DETAIL MODAL
══════════════════════════════════════════════════════ */
(function setupGenreDetail() {
  const modal        = document.getElementById("genreDetailModal");
  const closeBtn     = document.getElementById("genreDetailClose");
  const bgEl         = document.getElementById("genrePageBg");
  const coverEl      = document.getElementById("genreDetailCover");
  const nameEl       = document.getElementById("genreDetailName");
  const countEl      = document.getElementById("genreDetailCount");
  const listEl       = document.getElementById("genreDetailList");
  const topTitleEl   = document.getElementById("genrePageTopTitle");
  const playBtn      = document.getElementById("btnPlayGenre");
  const shuffleBtn   = document.getElementById("btnShuffleGenre");

  let currentGenreTracks = [];

  window.openGenreDetail = function(cat) {
    const items = media.filter(m => m.category === cat);
    currentGenreTracks = items;

    // Title
    if (nameEl) nameEl.textContent = cat;
    if (countEl) countEl.textContent = `${items.length} cancion${items.length !== 1 ? "es" : ""}`;
    if (topTitleEl) { topTitleEl.textContent = cat; topTitleEl.classList.remove("visible"); }

    // Cover (collage from first 4 tracks)
    const imgs = items.slice(0, 4).map(m => m.cover || "").filter(Boolean);
    if (coverEl) {
      coverEl.innerHTML = "";
      coverEl.className = "playlist-detail-cover";
      if (imgs.length === 0) {
        coverEl.innerHTML = `<div class="playlist-detail-cover-empty"><svg viewBox="0 0 24 24" width="40" height="40"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg></div>`;
      } else if (imgs.length === 1) {
        coverEl.classList.add("single");
        coverEl.innerHTML = `<img src="${imgs[0]}" alt="cover" />`;
      } else {
        imgs.slice(0, 4).forEach(src => {
          const img = document.createElement("img");
          img.src = src; img.alt = "cover";
          coverEl.appendChild(img);
        });
      }
    }

    // Blurred bg
    if (bgEl && imgs[0]) bgEl.style.backgroundImage = `url(${imgs[0]})`;

    // Track list
    if (listEl) {
      listEl.innerHTML = "";
      const currentFile = playlist[currentTrackIdx]?.file;
      if (items.length === 0) {
        listEl.innerHTML = `<p style="color:var(--text-soft);text-align:center;padding:2.5rem 1rem">Sin canciones en esta categoría.</p>`;
      } else {
        const SWIPE_THRESHOLD = 72;
        items.forEach(item => {
          const cover = item.cover || getPlaceholderCover(item.category);
          const isPlaying = item.file === currentFile;
          const isDl = (typeof OfflineManager !== 'undefined') && OfflineManager.isDownloaded(item.file);

          // Wrapper swipe
          const wrap = document.createElement("div");
          wrap.className = "search-result-row-wrap";

          // Fondo verde izquierda -> playlist
          const addBg = document.createElement("div");
          addBg.className = "search-result-add-bg";
          addBg.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg><span>PLAYLIST</span>`;
          wrap.appendChild(addBg);

          // Fondo morado derecha -> cola
          const queueBg = document.createElement("div");
          queueBg.className = "search-result-queue-bg";
          queueBg.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="15" y2="18"/><path d="M3 16l3 3 3-3"/></svg><span>EN COLA</span>`;
          wrap.appendChild(queueBg);

          const div = document.createElement("div");
          div.className = "playlist-detail-item" + (isPlaying ? " playing" : "");
          div.innerHTML = `
            <img src="${cover}" alt="${item.title}" onerror="this.src='${getPlaceholderCover(item.category)}'">
            <div class="playlist-detail-info">
              <div class="playlist-detail-track">${item.title}${downloadedEmojiHtml(isDl)}</div>
              <div class="playlist-detail-artist">${item.artist}${item.duration ? ` · <span style="color:var(--text-soft);font-size:.68rem">${item.duration}</span>` : ""}</div>
            </div>
            <button class="library-action-more" aria-label="Mas opciones" style="flex-shrink:0;width:32px;height:32px;border-radius:50%;background:transparent;border:none;color:var(--text-soft);cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:1">
              <svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none"/></svg>
            </button>`;
          div.addEventListener("click", e => {
            if (e.target.closest(".library-action-more")) return;
            loadTrack(item, false, currentGenreTracks);
            listEl.querySelectorAll(".playlist-detail-item").forEach(r => r.classList.remove("playing"));
            div.classList.add("playing");
          });
          div.querySelector(".library-action-more").addEventListener("click", e => {
            e.stopPropagation();
            openContextMenu(item);
          });

          // Swipe gestures
          let _swipeStartX = 0, _swipeStartY = 0, _swipeDx = 0, _swiping = false, _swipeLocked = false;
          div.addEventListener("touchstart", e => {
            _swipeStartX = e.touches[0].clientX;
            _swipeStartY = e.touches[0].clientY;
            _swipeDx = 0; _swiping = false; _swipeLocked = false;
            div.classList.remove("snap-back");
          }, { passive: true });
          div.addEventListener("touchmove", e => {
            const dx = e.touches[0].clientX - _swipeStartX;
            const dy = e.touches[0].clientY - _swipeStartY;
            if (!_swipeLocked) {
              if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                _swipeLocked = true;
                if (Math.abs(dy) > Math.abs(dx)) return;
                _swiping = true;
              } else return;
            }
            if (!_swiping) return;
            _swipeDx = dx;
            div.style.transform = `translateX(${_swipeDx}px)`;
            div.classList.add("swiping");
            wrap.classList.add("swiping");
            const ratio = Math.min(1, Math.abs(_swipeDx) / SWIPE_THRESHOLD);
            if (_swipeDx < 0) {
              addBg.style.opacity = ratio;
              addBg.style.background = ratio >= 1 ? "#16a34a" : "#22c55e";
              queueBg.style.opacity = 0;
            } else {
              queueBg.style.opacity = ratio;
              queueBg.style.background = ratio >= 1 ? "#7c3aed" : "#8b5cf6";
              addBg.style.opacity = 0;
            }
          }, { passive: true });
          div.addEventListener("touchend", () => {
            div.classList.remove("swiping");
            wrap.classList.remove("swiping");
            addBg.style.opacity = ""; addBg.style.background = "";
            queueBg.style.opacity = ""; queueBg.style.background = "";
            if (!_swiping) return;
            _swiping = false;
            div.classList.add("snap-back");
            div.style.transform = "";
            setTimeout(() => div.classList.remove("snap-back"), 350);
            if (Math.abs(_swipeDx) >= SWIPE_THRESHOLD) {
              hapticFeedback("medium");
              if (_swipeDx < 0) openAddToPlaylist(item);
              else addToQueue(item);
            }
            _swipeDx = 0;
          }, { passive: true });

          wrap.appendChild(div);
          listEl.appendChild(wrap);
        });
      }
    }

    // Scroll-triggered topbar title
    const scrollEl = modal && modal.querySelector(".playlist-page-scroll");
    if (scrollEl) {
      scrollEl.removeEventListener("scroll", scrollEl._genreScroll || (() => {}));
      scrollEl._genreScroll = () => {
        const hero = modal.querySelector(".playlist-page-hero");
        if (!hero || !topTitleEl) return;
        topTitleEl.classList.toggle("visible", scrollEl.scrollTop > hero.offsetHeight - 60);
      };
      scrollEl.addEventListener("scroll", scrollEl._genreScroll, { passive: true });
      scrollEl.scrollTop = 0;
    }

    if (modal) { modal.classList.add("open"); document.body.style.overflow = "hidden"; }
  };

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (modal) modal.classList.remove("open");
      document.body.style.overflow = "";
    });
  }

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      if (!currentGenreTracks.length) return;
      loadTrack(currentGenreTracks[0], false, currentGenreTracks);
      if (typeof showToast === "function") showToast(`Reproduciendo ${nameEl?.textContent || ""}`, "success");
    });
  }

  if (shuffleBtn) {
    shuffleBtn.addEventListener("click", () => {
      if (!currentGenreTracks.length) return;
      const shuffled = shuffleArray([...currentGenreTracks]);
      shuffleMode = true;
      if (sheetShuffle) sheetShuffle.classList.add("active");
      loadTrack(shuffled[0], false, shuffled);
      if (typeof showToast === "function") showToast("Reproducción aleatoria activada", "success");
    });
  }
})();

let searchTimeout;
searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim();
  searchClear.style.display = q ? "" : "none";
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    if (!q) { searchBrowse.style.display = ""; searchResults.style.display = "none"; searchResults.innerHTML = ""; return; }
    searchBrowse.style.display = "none";
    searchResults.style.display = "";
    const localCatalog = [...media, ..._ytLibrary.filter(yt => yt.file && !media.find(m => m.file === yt.file))];
    const results = localCatalog.filter(item =>
      [item.title, item.artist, item.category].some(s => s.toLowerCase().includes(q.toLowerCase()))
    );
    if (results.length === 0) {
      searchResults.innerHTML = `<div class="no-results"><p>Sin resultados para "<strong>${q}</strong>"</p></div>`;
      return;
    }
    searchResults.innerHTML = "";

    // ── Artist header card ──────────────────────────────────
    const qLow = q.toLowerCase();
    // Find if query matches a specific artist name
    const artistMatch = [...new Set(results.map(r => r.artist.split(/[,&]/)[0].trim()))]
      .find(name => name.toLowerCase().includes(qLow) || qLow.includes(name.toLowerCase()));
    if (artistMatch) {
      const artistTracks = results.filter(r => r.artist.toLowerCase().includes(artistMatch.toLowerCase()));
      const artistPhoto = getArtistPhoto(artistMatch);
      const coverSrc = artistPhoto || artistTracks[0]?.cover || getPlaceholderCover("music");
      const placeholder = getPlaceholderCover("music");

      const header = document.createElement("div");
      header.className = "search-artist-header";
      header.innerHTML = `
        <div class="search-artist-photo-wrap">
          <img class="search-artist-photo" src="${coverSrc}" alt="${artistMatch}">
        </div>
        <div class="search-artist-meta">
          <span class="search-artist-label">Artista</span>
          <h2 class="search-artist-name">${artistMatch}</h2>
          <span class="search-artist-count">${artistTracks.length} canción${artistTracks.length !== 1 ? 'es' : ''}</span>
        </div>`;

      const img = header.querySelector(".search-artist-photo");
      img.onerror = () => { img.onerror = null; fetchArtistPhotoFromWiki(artistMatch, img, placeholder); };
      if (!artistPhoto) fetchArtistPhotoFromWiki(artistMatch, img, coverSrc);

      header.addEventListener("click", () => {
        if (artistTracks.length > 0) loadTrack(artistTracks[0], false, artistTracks);
      });
      searchResults.appendChild(header);

      // Section label for tracks
      const tracksLabel = document.createElement("p");
      tracksLabel.className = "search-section-label";
      tracksLabel.textContent = "Canciones";
      searchResults.appendChild(tracksLabel);
    }
    // ────────────────────────────────────────────────────────

    results.forEach(item => {
      const cover = item.cover || getPlaceholderCover(item.category);

      // Outer wrapper for swipe reveal (same pattern as playlist-detail)
      const wrap = document.createElement("div");
      wrap.className = "search-result-row-wrap";

      // Green add-to-playlist background (revealed on left swipe)
      const addBg = document.createElement("div");
      addBg.className = "search-result-add-bg";
      addBg.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg><span>AÑADIR</span>`;
      wrap.appendChild(addBg);

      // Purple add-to-queue background (revealed on right swipe)
      const queueBg = document.createElement("div");
      queueBg.className = "search-result-queue-bg";
      queueBg.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="15" y2="18"/><path d="M3 16l3 3 3-3"/></svg><span>EN COLA</span>`;
      wrap.appendChild(queueBg);

      const row = document.createElement("div");
      row.className = "search-result-row";
      row.dataset.file = item.file;
      const isDl = (typeof OfflineManager !== 'undefined') && OfflineManager.isDownloaded(item.file);
      row.innerHTML = `
        <img src="${cover}" alt="${item.title}" onerror="this.src='${getPlaceholderCover(item.category)}'" />
        <div class="search-result-info">
          <span class="search-result-title">${item.title}${downloadedEmojiHtml(isDl)}</span>
          <span class="search-result-artist">${item.artist}</span>
        </div>
        <div class="search-result-actions">
          <button class="search-result-add-btn" title="Añadir a playlist" aria-label="Añadir a playlist">
            <svg viewBox="0 0 24 24" width="18" height="18"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <button class="search-result-more-btn library-action-more" title="Más opciones" aria-label="Más opciones">
            <svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none"/></svg>
          </button>
        </div>
        <span class="search-result-cat">${item.category}</span>`;
      row.addEventListener("click", e => {
        if (e.target.closest(".search-result-more-btn")) return;
        if (e.target.closest(".search-result-add-btn")) return;
        loadTrack(item); showPage("pageHome");
      });
      row.querySelector(".search-result-add-btn").addEventListener("click", e => { e.stopPropagation(); openAddToPlaylist(item); });
      row.querySelector(".search-result-more-btn").addEventListener("click", e => { e.stopPropagation(); openContextMenu(item); });

      // ── Swipe-to-add-to-playlist (touch) ──────────────────────
      const SWIPE_THRESHOLD = 72;
      let _swipeStartX = 0, _swipeStartY = 0, _swipeDx = 0, _swiping = false, _swipeLocked = false;

      row.addEventListener("touchstart", e => {
        _swipeStartX = e.touches[0].clientX;
        _swipeStartY = e.touches[0].clientY;
        _swipeDx = 0;
        _swiping = false;
        _swipeLocked = false;
        row.classList.remove("snap-back");
      }, { passive: true });

      row.addEventListener("touchmove", e => {
        const dx = e.touches[0].clientX - _swipeStartX;
        const dy = e.touches[0].clientY - _swipeStartY;

        if (!_swipeLocked) {
          if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            _swipeLocked = true;
            if (Math.abs(dy) > Math.abs(dx)) return; // vertical scroll wins
            _swiping = true;
          } else return;
        }
        if (!_swiping) return;

        _swipeDx = dx; // both directions now
        row.style.transform = `translateX(${_swipeDx}px)`;
        row.classList.add("swiping");
        wrap.classList.add("swiping");

        const ratio = Math.min(1, Math.abs(_swipeDx) / SWIPE_THRESHOLD);
        if (_swipeDx < 0) {
          // Izquierda → añadir a playlist
          addBg.style.opacity = ratio;
          addBg.style.background = ratio >= 1 ? "#16a34a" : "#22c55e";
          queueBg.style.opacity = 0;
        } else if (_swipeDx > 0) {
          // Derecha → añadir a cola
          queueBg.style.opacity = ratio;
          queueBg.style.background = ratio >= 1 ? "#7c3aed" : "#8b5cf6";
          addBg.style.opacity = 0;
        }
      }, { passive: true });

      row.addEventListener("touchend", () => {
        row.classList.remove("swiping");
        wrap.classList.remove("swiping");
        addBg.style.opacity = "";
        addBg.style.background = "";
        queueBg.style.opacity = "";
        queueBg.style.background = "";

        if (!_swiping) return;
        _swiping = false;

        if (Math.abs(_swipeDx) >= SWIPE_THRESHOLD) {
          row.classList.add("snap-back");
          row.style.transform = "";
          setTimeout(() => row.classList.remove("snap-back"), 350);
          hapticFeedback("medium");
          if (_swipeDx < 0) {
            // Izquierda → añadir a playlist
            openAddToPlaylist(item);
          } else {
            // Derecha → añadir a cola
            addToQueue(item);
          }
        } else {
          // Snap back
          row.classList.add("snap-back");
          row.style.transform = "";
          setTimeout(() => row.classList.remove("snap-back"), 350);
        }
        _swipeDx = 0;
      }, { passive: true });

      wrap.appendChild(row);
      searchResults.appendChild(wrap);
    });
  }, 220);
});
searchClear.addEventListener("click", () => {
  searchInput.value = ""; searchClear.style.display = "none";
  searchBrowse.style.display = ""; searchResults.style.display = "none"; searchResults.innerHTML = "";
});

/* ── YouTube Search ────────────────────────────── */
let _ytSearchAbort = null;
async function fetchYouTubeResults(query) {
  if (_ytSearchAbort) { _ytSearchAbort.abort(); _ytSearchAbort = null; }
  if (query.length < 2) return;

  const existingSection = document.getElementById('ytSearchSection');
  if (existingSection) existingSection.remove();

  _ytSearchAbort = new AbortController();
  try {
    const res = await fetch(`/api/ytsearch?q=${encodeURIComponent(query)}`, {
      signal: _ytSearchAbort.signal
    });
    const data = await res.json();
    if (data.error) return;
    if (!data.results || data.results.length === 0) return;

    const section = document.createElement('div');
    section.id = 'ytSearchSection';
    section.style.marginTop = '.75rem';

    const label = document.createElement('p');
    label.className = 'search-section-label';
    label.innerHTML = '<span style="font-weight:400;color:#71717a;font-size:.7rem">resultados de búsqueda</span>';
    section.appendChild(label);

    data.results.forEach(item => {
      const wrap = document.createElement('div');
      wrap.className = 'search-result-row-wrap';

      const queueBg = document.createElement('div');
      queueBg.className = 'search-result-queue-bg';
      queueBg.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="15" y2="18"/><path d="M3 16l3 3 3-3"/></svg><span>EN COLA</span>`;
      wrap.appendChild(queueBg);

      const row = document.createElement('div');
      row.className = 'search-result-row';
      row.dataset.file = 'yt:' + item.youtubeId;
      row.innerHTML = `
        <img src="${item.cover || getPlaceholderCover('music')}" alt="${item.title}" onerror="this.src='${getPlaceholderCover('music')}'" />
        <div class="search-result-info">
          <span class="search-result-title">${item.title}</span>
          <span class="search-result-artist">${item.artist}</span>
        </div>
        <div class="search-result-actions">
          <button class="search-result-add-btn" title="Añadir a playlist" aria-label="Añadir a playlist">
            <svg viewBox="0 0 24 24" width="18" height="18"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <button class="search-result-more-btn library-action-more" title="Más opciones" aria-label="Más opciones">
            <svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none"/></svg>
          </button>
        </div>`;

      row.addEventListener('click', e => {
        if (e.target.closest('.search-result-more-btn') || e.target.closest('.search-result-add-btn')) return;
        playYouTubeTrack(item);
        showPage('pageHome');
      });

      row.querySelector('.search-result-add-btn').addEventListener('click', e => {
        e.stopPropagation();
        const track = _makeYtTrack(item);
        openAddToPlaylist(track);
      });

      row.querySelector('.search-result-more-btn').addEventListener('click', e => {
        e.stopPropagation();
        const track = _makeYtTrack(item);
        openContextMenu(track);
      });

      wrap.appendChild(row);
      section.appendChild(wrap);
    });

    searchResults.appendChild(section);
  } catch (e) {
    if (e.name === 'AbortError') return;
  }
}

let _ytSearchTimeout = null;
searchInput.addEventListener('input', () => {
  clearTimeout(_ytSearchTimeout);
  _ytSearchTimeout = setTimeout(() => {
    const q = searchInput.value.trim();
    if (q.length >= 2) {
      fetchYouTubeResults(q);
    }
  }, 400);
});

/* ══════════════════════════════════════════════════════
   18. MEDIA SESSION
══════════════════════════════════════════════════════ */
function setupMediaSession(item) {
  if (!("mediaSession" in navigator)) return;

  const cover = item.cover || getPlaceholderCover(item.category);

  // Determinar el tipo MIME real de la imagen para mayor compatibilidad
  const imgType = cover.startsWith("data:image/svg") ? "image/svg+xml" : "image/jpeg";

  navigator.mediaSession.metadata = new MediaMetadata({
    title:  item.title,
    artist: item.artist,
    album:  item.category,
    artwork: [
      { src: cover, sizes: "96x96",   type: imgType },
      { src: cover, sizes: "128x128", type: imgType },
      { src: cover, sizes: "192x192", type: imgType },
      { src: cover, sizes: "256x256", type: imgType },
      { src: cover, sizes: "384x384", type: imgType },
      { src: cover, sizes: "512x512", type: imgType },
    ]
  });

  // play — también actualiza la UI para que los iconos sean coherentes.
  // Usa _resumeWithWatchdog() en vez de play() a pelo: si el buffer se
  // vació durante la pausa en segundo plano/pantalla bloqueada, esto
  // detecta el atasco y reintenta en vez de quedarse colgado sin sonar.
  navigator.mediaSession.setActionHandler("play", () => {
    if (_ytTrackActive && _ytPlayer && _ytReady) { _ytPlayer.playVideo(); return; }
    _resumeWithWatchdog();
  });

  navigator.mediaSession.setActionHandler("pause", () => {
    if (_ytTrackActive && _ytPlayer && _ytReady) { _ytPlayer.pauseVideo(); return; }
    const audio = activeAudio;
    if (!audio) return;
    audio.pause();
    isPlaying = false;
    updatePlayIcons(false);
  });

  // Controles de pista — cuando vienen del lockscreen, document.hidden === true
  // normalmente, PERO en iOS (PWA standalone añadida a pantalla de inicio)
  // document.hidden no siempre refleja el estado real al pulsar desde la
  // pantalla bloqueada o desde Control Center. Si nos fiamos solo de
  // document.hidden, _doPlay cae al setTimeout() en vez de llamar a play()
  // de forma síncrona, y en iOS eso basta para que Safari deniegue el
  // audio en silencio (la app cambia de título/portada pero no suena).
  // Por eso en iOS SIEMPRE tratamos los handlers de MediaSession como
  // "llamada crítica de gesto" — cuesta cero en Android/desktop y evita
  // el silencio en iOS.
  const _isIOSDevice = /iP(hone|ad|od)/.test(navigator.userAgent) ||
                        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  navigator.mediaSession.setActionHandler("previoustrack", () => {
    const audio = activeAudio;
    if (audio) {
      audio.muted = false;
      if (audio.volume === 0) audio.volume = 1;
    }
    window._droplyFromLockscreen = _isIOSDevice ? true : document.hidden;
    playPrev();
  });
  navigator.mediaSession.setActionHandler("nexttrack", () => {
    const audio = activeAudio;
    if (audio) {
      audio.muted = false;
      if (audio.volume === 0) audio.volume = 1;
    }
    window._droplyFromLockscreen = _isIOSDevice ? true : document.hidden;
    playNext();
  });

  // Desregistrar seekbackward/seekforward para que Android muestre flechas prev/next
  try { navigator.mediaSession.setActionHandler("seekbackward", null); } catch(_) {}
  try { navigator.mediaSession.setActionHandler("seekforward",  null); } catch(_) {}

  // seekto — barra de progreso en pantalla bloqueada
  try {
    navigator.mediaSession.setActionHandler("seekto", ({ seekTime }) => {
      if (_ytTrackActive && _ytPlayer && _ytReady) {
        const dur = _ytPlayer.getDuration();
        if (dur && isFinite(dur) && dur > 0) {
          _ytPlayer.seekTo(Math.max(0, Math.min(dur, seekTime)), true);
        }
        return;
      }
      const audio = activeAudio;
      if (!audio) return;
      const dur = audio.duration;
      if (!dur || !isFinite(dur)) return;
      audio.currentTime = Math.max(0, Math.min(dur, seekTime));
    });
  } catch(_) {}

  // Sincronizar posición inicial para la barra de la pantalla bloqueada
  _updateMediaSessionPosition();
}

/* Actualiza el estado de posición en la Media Session de forma segura */
function _updateMediaSessionPosition() {
  if (!("mediaSession" in navigator)) return;
  try {
    let dur, cur;
    if (_ytTrackActive && _ytPlayer && _ytReady) {
      dur = _ytPlayer.getDuration();
      cur = _ytPlayer.getCurrentTime();
    } else {
      const audio = activeAudio;
      if (!audio) return;
      dur = audio.duration;
      cur = audio.currentTime;
    }
    if (!dur || !isFinite(dur) || dur <= 0) return;
    const safePos = Math.max(0, Math.min(cur, dur - 0.01));
    navigator.mediaSession.setPositionState({
      duration: dur,
      playbackRate: 1,
      position: safePos
    });
  } catch(_) {}
}

/* ══════════════════════════════════════════════════════
   19. KEYBOARD + SCROLL
══════════════════════════════════════════════════════ */

document.addEventListener("keydown", e => {
  if (document.activeElement.tagName === "INPUT") return;
  if (e.key === " ")          { e.preventDefault(); togglePlay(); }
  if (e.key === "Escape")     { nowPlayingSheet.classList.remove("open"); closeContextMenu(); closeQueuePanel(); }
  if (e.key === "ArrowRight") playNext();
  if (e.key === "ArrowLeft")  playPrev();
});

window.addEventListener("scroll", () => {
  document.getElementById("topbar").classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

/* ── Scroll-hide bottom nav — collapsed pill (Apple Music style) ── */
(function() {
  const nav        = document.getElementById("bottomNav");
  const mini       = document.getElementById("miniPlayer");
  const homeBtn    = document.getElementById("miniHomeBtn");
  const searchBtn  = document.getElementById("miniSearchBtn");
  if (!nav) return;

  let lastY      = window.scrollY;
  let hideTimer  = null;
  let isHidden   = false;

  /* Expose for external callers */
  window._droplyShowNav = showNav;
  window._droplyHideNav = hideNav;

  function showNav() {
    if (!isHidden) return;
    isHidden = false;
    nav.classList.remove("nav-hidden");
    if (mini) mini.classList.remove("nav-hidden");
  }

  function hideNav() {
    if (isHidden) return;
    isHidden = true;
    nav.classList.add("nav-hidden");
    if (mini) mini.classList.add("nav-hidden");
  }

  /* Home button → spring nav back */
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      showNav();
      /* also navigate home */
      if (typeof showPage === "function") showPage("pageHome");
    });
  }

  /* Search button → go to search */
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      if (typeof showPage === "function") showPage("pageSearch");
    });
  }

  /* When mini player becomes visible while nav is already hidden → enter collapsed */
  if (mini) {
    let miniWasVisible = mini.classList.contains("visible");
    new MutationObserver(() => {
      const nowVisible = mini.classList.contains("visible");
      if (nowVisible === miniWasVisible) return;
      miniWasVisible = nowVisible;
      if (isHidden && nowVisible) mini.classList.add("nav-hidden");
      if (!nowVisible && isHidden) mini.classList.remove("nav-hidden");
    }).observe(mini, { attributes: true, attributeFilter: ["class"] });
  }

  window.addEventListener("scroll", () => {
    const y  = window.scrollY;
    const dy = y - lastY;
    lastY    = y;

    clearTimeout(hideTimer);

    if (dy > 4) {
      /* Scrolling down → show nav */
      showNav();
    } else if (dy < -4) {
      /* Scrolling up → collapse to pill */
      hideNav();
    }

    /* After 5s idle → restore nav */
    hideTimer = setTimeout(showNav, 5000);
  }, { passive: true });
})();

/* ══════════════════════════════════════════════════════
   19b. HERO EXPLORE fix (heroExplore now optional)
══════════════════════════════════════════════════════ */
if (typeof heroExplore !== 'undefined' && heroExplore) {
  heroExplore.addEventListener("click", () => {
    const gs = document.getElementById("gridSection");
    if (gs) gs.scrollIntoView({ behavior: "smooth" });
  });
}

/* ══════════════════════════════════════════════════════
   HOME SCREEN v2 — Premium redesign
══════════════════════════════════════════════════════ */
function renderHomeScreen() {
  /* ── 1. Continue listening ── */
  const continueSection = document.getElementById("homeContinueSection");
  const hccCover   = document.getElementById("hccCover");
  const hccTitle   = document.getElementById("hccTitle");
  const hccArtist  = document.getElementById("hccArtist");
  const hccGlow    = document.getElementById("hccGlow");
  const hccPlayBtn = document.getElementById("hccPlayBtn");
  const hccFill    = document.getElementById("hccProgressFill");

  if (historyTracks.length > 0) {
    const lastTrack = getTrackByFile(historyTracks[0].file);
    if (lastTrack) {
      const cover = lastTrack.cover || getPlaceholderCover(lastTrack.category);
      hccCover.src = cover;
      hccCover.onerror = () => { hccCover.src = getPlaceholderCover(lastTrack.category); };
      hccTitle.textContent = lastTrack.title;
      hccArtist.textContent = lastTrack.artist;
      if (hccGlow) hccGlow.style.backgroundImage = `url(${cover})`;
      // Show progress if this is the current track
      const isCurrentTrack = playlist[currentTrackIdx]?.file === lastTrack.file;
      if (isCurrentTrack && activeAudio.duration) {
        const pct = (activeAudio.currentTime / activeAudio.duration) * 100;
        if (hccFill) hccFill.style.width = pct + "%";
      }
      if (hccPlayBtn) {
        hccPlayBtn.onclick = () => {
          const currentFile = playlist[currentTrackIdx]?.file;
          if (currentFile === lastTrack.file) {
            togglePlay();
          } else {
            loadTrack(lastTrack);
          }
        };
      }
      continueSection.style.display = "";
    }
  }

  /* ── 3. User playlists ── */
  const plSection = document.getElementById("homePlSection");
  const plGrid    = document.getElementById("homePlGrid");
  if (plGrid && playlists.length > 0) {
    plGrid.innerHTML = "";
    playlists.slice(0, 10).forEach(pl => {
      const trackImgs = pl.tracks.slice(0, 4).map(f => getTrackByFile(f)?.cover || "").filter(Boolean);
      const card = document.createElement("div");
      card.className = "home-pl-card";
      const allDownloaded = pl.tracks.length > 0 && typeof OfflineManager !== 'undefined' &&
        pl.tracks.every(f => OfflineManager.isDownloaded(f));
      const dlBadge = allDownloaded ? `<span class="track-dl-emoji" title="Playlist descargada"><svg viewBox="0 0 8 8" width="8" height="8"><circle cx="4" cy="4" r="4" fill="#22c55e"/></svg></span>` : '';
      const coverHTML = trackImgs.length === 0
        ? `<div class="home-pl-cover home-pl-cover--empty"><svg viewBox="0 0 24 24" width="24" height="24" style="opacity:.25"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg></div>`
        : trackImgs.length === 1
          ? `<div class="home-pl-cover"><img src="${trackImgs[0]}" alt=""></div>`
          : `<div class="home-pl-cover home-pl-cover--grid">${trackImgs.slice(0,4).map(s=>`<img src="${s}" alt="">`).join("")}</div>`;
      card.innerHTML = `${coverHTML}<p class="home-pl-name">${pl.name}${dlBadge}</p><p class="home-pl-count">${pl.tracks.length} canciones</p>`;
      card.addEventListener("click", () => openPlaylistDetail(pl.id));
      plGrid.appendChild(card);
    });
    if (plSection) plSection.style.display = "";
  }

  /* ── 4. Recently played ── */
  const recentSection = document.getElementById("homeRecentSection");
  const recentGrid    = document.getElementById("homeRecentGrid");
  if (recentGrid && historyTracks.length > 0) {
    recentGrid.innerHTML = "";
    const shown = historyTracks.slice(0, 7);
    shown.forEach(entry => {
      const item = getTrackByFile(entry.file);
      if (!item) return;
      const cover = item.cover || getPlaceholderCover(item.category);
      const card = document.createElement("div");
      card.className = "home-track-card";
      card.innerHTML = `
        <div class="home-track-cover">
          <img src="${cover}" alt="${item.title}" onerror="this.src='${getPlaceholderCover(item.category)}'">
          <div class="home-track-play-overlay">
            <svg viewBox="0 0 24 24" fill="white" stroke="none" width="18" height="18"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
          <button class="home-track-more-btn" aria-label="Más opciones">
            <svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="5" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.3" fill="currentColor" stroke="none"/></svg>
          </button>
        </div>
        <p class="home-track-title">${item.title}</p>
        <p class="home-track-artist">${item.artist}</p>`;
      card.addEventListener("click", e => { if (!e.target.closest(".home-track-more-btn")) loadTrack(item); });
      card.querySelector(".home-track-more-btn").addEventListener("click", e => { e.stopPropagation(); openContextMenu(item); });
      recentGrid.appendChild(card);
    });
    if (recentSection) recentSection.style.display = "";
  }

  /* ── 5. Top artists ── */
  const artistsSection = document.getElementById("homeArtistsSection");
  const artistsGrid    = document.getElementById("homeArtistsGrid");
  if (artistsGrid) {
    // Build artist map from play counts
    const artistMap = {};
    media.forEach(item => {
      const cnt = playCounts[item.file] || 0;
      if (!artistMap[item.artist]) artistMap[item.artist] = { name: item.artist, count: 0, cover: item.cover, category: item.category };
      artistMap[item.artist].count += cnt;
    });

    let artists = Object.values(artistMap);
    // Show top played, or if no plays yet, sample from media
    const topArtists = artists.filter(a => a.count > 0).sort((a, b) => b.count - a.count).slice(0, 5);
    const displayArtists = topArtists.length >= 4 ? topArtists : shuffleArray(artists).slice(0, 5);

    if (displayArtists.length > 0) {
      artistsGrid.innerHTML = "";
      displayArtists.forEach(artist => {
        const artistPhoto = getArtistPhoto(artist.name);
        const cover = artistPhoto || artist.cover || getPlaceholderCover(artist.category);
        const placeholder = getPlaceholderCover(artist.category);
        const card = document.createElement("div");
        card.className = "home-artist-card";
        card.innerHTML = `
          <div class="home-artist-img-wrap">
            <img src="${cover}" alt="${artist.name}">
          </div>
          <p class="home-artist-name">${artist.name.split(',')[0].trim()}</p>`;
        const img = card.querySelector('img');
        img.onerror = () => {
          img.onerror = null; // Prevent loop
          fetchArtistPhotoFromWiki(artist.name, img, placeholder);
        };
        // If no dedicated artist photo, proactively try Wikipedia
        if (!artistPhoto) {
          fetchArtistPhotoFromWiki(artist.name, img, cover);
        }
        card.addEventListener("click", () => {
          // Navigate to search with artist name
          const si = document.getElementById("searchInput");
          if (si) { si.value = artist.name.split(',')[0].trim(); si.dispatchEvent(new Event('input')); }
          showPage("pageSearch");
        });
        artistsGrid.appendChild(card);
      });
      if (artistsSection) artistsSection.style.display = "";
    }
  }

  /* ── 6. Featured tracks (always visible) ── */
  const featuredGrid = document.getElementById("homeFeaturedGrid");
  if (featuredGrid && featuredGrid.innerHTML === "") {
    featuredGrid.innerHTML = Array.from({ length: 6 }, () =>
      `<div class="home-track-card home-track-skeleton" aria-hidden="true">
        <div class="home-track-cover skeleton" style="aspect-ratio:1;border-radius:12px"></div>
        <div class="skeleton" style="height:.75rem;width:75%;margin-top:.55rem;border-radius:4px"></div>
        <div class="skeleton" style="height:.65rem;width:50%;margin-top:.35rem;border-radius:4px"></div>
      </div>`
    ).join("");
    requestAnimationFrame(() => {
      const allMusic = media.filter(m => m.type === "music");
      const picks = shuffleArray(allMusic).slice(0, 12);
      featuredGrid.innerHTML = "";
      picks.forEach(item => {
      const cover = item.cover || getPlaceholderCover(item.category);
      const isDl = (typeof OfflineManager !== 'undefined') && OfflineManager.isDownloaded(item.file);
      const card = document.createElement("div");
      card.className = "home-track-card";
      card.innerHTML = `
        <div class="home-track-cover">
          <img src="${cover}" alt="${item.title}" onerror="this.src='${getPlaceholderCover(item.category)}'">
          <div class="home-track-play-overlay">
            <svg viewBox="0 0 24 24" fill="white" stroke="none" width="18" height="18"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
          <button class="home-track-more-btn" aria-label="Más opciones">
            <svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="5" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.3" fill="currentColor" stroke="none"/></svg>
          </button>
        </div>
        <p class="home-track-title">${item.title}${isDl ? downloadedEmojiHtml(true) : ''}</p>
        <p class="home-track-artist">${item.artist}</p>`;
      card.addEventListener("click", e => { if (!e.target.closest(".home-track-more-btn")) loadTrack(item, false, allMusic); }); // featured: queue = all music
      card.querySelector(".home-track-more-btn").addEventListener("click", e => { e.stopPropagation(); openContextMenu(item); });
      featuredGrid.appendChild(card);
    });
    });
  }

  /* ── 7. Genre pills in home (always visible) ── */
  const homeGenreGrid = document.getElementById("homeGenreGrid");
  if (homeGenreGrid && homeGenreGrid.innerHTML === "") {
    const colors = ["#e94f4f","#1db954","#1f77b4","#d62728","#9467bd","#ff7f0e","#2ca02c","#ff1493"];
    getCategories().forEach((cat, i) => {
      const btn = document.createElement("button");
      btn.className = "genre-pill";
      btn.style.background = colors[i % colors.length];
      btn.innerHTML = `<span>${cat}</span>`;
      btn.addEventListener("click", () => openGenreDetail(cat));
      homeGenreGrid.appendChild(btn);
    });
  }

  /* ── Quick access buttons ── */
  document.querySelectorAll(".home-quick-item[data-page]").forEach(btn => {
    btn.addEventListener("click", () => showPage(btn.dataset.page));
  });
  const quickDownloads = document.getElementById("quickDownloads");
  if (quickDownloads) {
    quickDownloads.addEventListener("click", () => {
      if (typeof showPage === 'function') showPage('pageDownloads');
      if (typeof OfflineManager !== 'undefined') OfflineManager.renderDownloadsList();
      if (typeof renderOfflinePlaylist === 'function') renderOfflinePlaylist();
      if (typeof updateOfflineStatusBanner === 'function') updateOfflineStatusBanner();
    });
  }
  const quickHistory = document.getElementById("quickHistory");
  if (quickHistory) {
    quickHistory.addEventListener("click", () => {
      showPage("pageSearch");
    });
  }

  /* ── Section "Ver todo" links ── */
  document.querySelectorAll(".home-section-link[data-page]").forEach(btn => {
    btn.addEventListener("click", () => showPage(btn.dataset.page));
  });
}

/* ── Update continue card progress while playing ── */
let _hccRafPending = false;
function updateHomeContinueProgress() {
  if (_hccRafPending) return;
  _hccRafPending = true;
  requestAnimationFrame(() => {
    _hccRafPending = false;
    const fill = document.getElementById("hccProgressFill");
    if (!fill) return;
    const audio = activeAudio;
    if (audio && audio.duration && isPlaying) {
      fill.style.width = ((audio.currentTime / audio.duration) * 100) + "%";
    }
  });
}

/* ── PROFILE STATS HELPERS ── */

// ── Minutos este mes (key con año-mes, se resetea sola cada mes) ──
function _monthKey() {
  const d = new Date();
  return `droply_minutes_${d.getFullYear()}_${String(d.getMonth() + 1).padStart(2, '0')}`;
}
function getMonthMinutes() {
  return parseInt(localStorage.getItem(_monthKey()) || '0');
}
function addMonthMinute() {
  const key = _monthKey();
  const v = parseInt(localStorage.getItem(key) || '0') + 1;
  localStorage.setItem(key, v);
  return v;
}

// ── Racha de días ──
function _todayStr() {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}
function getStreakData() {
  try {
    return JSON.parse(localStorage.getItem('droply_streak') || '{"count":0,"lastDate":""}');
  } catch(_) { return { count: 0, lastDate: '' }; }
}
function saveStreakData(data) {
  localStorage.setItem('droply_streak', JSON.stringify(data));
}
function tickStreak() {
  const today = _todayStr();
  const data  = getStreakData();
  if (data.lastDate === today) return data.count; // ya contado hoy
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (data.lastDate === yesterday) {
    data.count += 1; // día consecutivo
  } else if (data.lastDate === '') {
    data.count = 1;  // primera vez
  } else {
    data.count = 1;  // racha rota, reiniciar
  }
  data.lastDate = today;
  saveStreakData(data);
  return data.count;
}
function updateStreakUI() {
  const el = document.getElementById('streakCount');
  if (el) el.textContent = getStreakData().count;
}

// ── Género favorito (basado en playCounts + campo category) ──
function getFavoriteGenre() {
  const genreScores = {};
  const tracks = media.filter(m => m.type === 'music' && m.category);
  tracks.forEach(m => {
    const plays = playCounts[m.file] || 0;
    if (plays === 0) return;
    const g = m.category;
    genreScores[g] = (genreScores[g] || 0) + plays;
  });
  const entries = Object.entries(genreScores);
  if (entries.length === 0) return null;
  return entries.sort((a, b) => b[1] - a[1])[0][0];
}

// ── Top 4 artistas por playCounts ──
function getTopArtists(limit = 4) {
  const artistScore = {};
  const artistTrack = {};
  media.filter(m => m.type === 'music').forEach(m => {
    if (!m.artist) return;
    const primary = m.artist.split(',')[0].trim();
    const plays = playCounts[m.file] || 0;
    artistScore[primary] = (artistScore[primary] || 0) + plays;
    if (!artistTrack[primary]) artistTrack[primary] = m;
  });

  // Artistas con reproducciones reales, ordenados
  let topList = Object.entries(artistScore)
    .filter(([, s]) => s > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name]) => ({ name, track: artistTrack[name] }));

  // Si hay menos de 4 con plays, rellenar con artistas únicos del catálogo
  if (topList.length < limit) {
    const used = new Set(topList.map(a => a.name));
    const fallback = [];
    media.filter(m => m.type === 'music').forEach(m => {
      if (!m.artist) return;
      const primary = m.artist.split(',')[0].trim();
      if (!used.has(primary)) {
        used.add(primary);
        fallback.push({ name: primary, track: m });
      }
    });
    topList = [...topList, ...fallback].slice(0, limit);
  }

  return topList;
}

/* ── PROFILE RENDER ── */
function renderProfile() {
  const grid = document.getElementById("profileArtistsGrid");
  if (!grid) return;

  // Artistas top (4, ordenados por reproducciones reales)
  const topArtists = getTopArtists(4);
  grid.innerHTML = "";
  topArtists.forEach(({ name, track }) => {
    const photo = ARTIST_PHOTOS[name] || track.cover;
    const el = document.createElement("div");
    el.className = "home-artist-card";
    el.innerHTML = `
      <div class="home-artist-photo">
        <img src="${photo}" alt="${name}" loading="lazy" />
      </div>
      <p class="home-artist-name">${name}</p>
    `;
    el.onclick = () => {
      const artistTracks = media.filter(s => s.artist && s.artist.includes(name));
      if (artistTracks.length > 0) {
        playlist = artistTracks;
        currentTrackIdx = 0;
        loadTrack(playlist[0]);
      }
    };
    grid.appendChild(el);
  });

  // Género favorito real
  const favGenre = getFavoriteGenre();
  const genreEl = document.getElementById('statGenre');
  if (genreEl) genreEl.textContent = favGenre || '—';

  // Minutos este mes reales
  const statMinutes = document.getElementById('statMinutes');
  if (statMinutes) statMinutes.textContent = getMonthMinutes().toLocaleString('es');

  // Racha
  updateStreakUI();
}

// ── Lógica Real de Ajustes y Personalización ──

// Cargar ajustes guardados
function loadSavedSettings() {
  const theme = localStorage.getItem('droply_theme') || 'dark';
  const accent = localStorage.getItem('droply_accent') || '#8b5cf6';
  const liquid = localStorage.getItem('droply_liquid') !== 'false';

  // Aplicar Tema
  if (theme === 'light') {
    document.body.classList.add('light-mode');
    document.getElementById('themeToggle')?.classList.remove('active');
  }

  // Aplicar Acento
  document.documentElement.style.setProperty('--accent', accent);
  document.querySelectorAll('.accent-dot').forEach(dot => {
    dot.classList.toggle('active', dot.dataset.color === accent);
  });

  // Aplicar Liquid Glass
  document.body.classList.toggle('liquid-enabled', liquid);
  document.getElementById('liquidToggle')?.classList.toggle('active', liquid);

  // Aplicar Estadísticas (minutos reales del mes, no el valor antiguo)
  const statMinutes = document.getElementById('statMinutes');
  if (statMinutes) statMinutes.textContent = getMonthMinutes().toLocaleString('es');
}

// Escuchar cambios en los ajustes
document.addEventListener("click", e => {
  // Toggle Tema
  const themeBtn = e.target.closest("#btnToggleTheme");
  if (themeBtn) {
    const isDark = document.body.classList.toggle('light-mode');
    const newTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('droply_theme', newTheme);
    document.getElementById('themeToggle')?.classList.toggle('active', newTheme === 'dark');
    showToast(`Modo ${newTheme === 'dark' ? 'Oscuro' : 'Claro'} activado`, "info");
    return;
  }

  // Toggle Liquid Glass
  const liquidBtn = e.target.closest("#btnToggleLiquid");
  if (liquidBtn) {
    const isEnabled = document.body.classList.toggle('liquid-enabled');
    localStorage.setItem('droply_liquid', isEnabled);
    document.getElementById('liquidToggle')?.classList.toggle('active', isEnabled);
    showToast(`Liquid Glass ${isEnabled ? 'Activado' : 'Desactivado'}`, "info");
    return;
  }

  // Picker de Acento
  const accentDot = e.target.closest(".accent-dot");
  if (accentDot) {
    const color = accentDot.dataset.color;
    document.documentElement.style.setProperty('--accent', color);
    localStorage.setItem('droply_accent', color);
    document.querySelectorAll('.accent-dot').forEach(d => d.classList.remove('active'));
    accentDot.classList.add('active');
    showToast(`Color de acento actualizado`, "info");
    return;
  }

  // Otros Toggles (Genéricos)
  const toggle = e.target.closest(".setting-toggle");
  if (toggle && !toggle.id) {
    toggle.classList.toggle("active");
    const isActive = toggle.classList.contains("active");
    const label = toggle.closest(".setting-item").querySelector(".setting-label").textContent;
    showToast(`${label}: ${isActive ? 'Activado' : 'Desactivado'}`, "info");
    return;
  }
});

// Lógica de Estadísticas Reales (Minutos escuchados este mes + racha)
let lastMinuteUpdate = Date.now();
setInterval(() => {
  if (isPlaying && !document.hidden) {
    const now = Date.now();
    if (now - lastMinuteUpdate >= 60000) { // Cada minuto real
      const total = addMonthMinute();
      const statMinutes = document.getElementById('statMinutes');
      if (statMinutes) statMinutes.textContent = total.toLocaleString('es');
      // Actualizar racha (tick diario al escuchar)
      const streak = tickStreak();
      updateStreakUI();
      lastMinuteUpdate = now;
    }
  } else {
    lastMinuteUpdate = Date.now();
  }
}, 10000); // Chequear cada 10 segundos

// Inicializar ajustes al cargar
document.addEventListener('DOMContentLoaded', () => { loadSavedSettings(); updateStreakUI(); });
// Forzar carga inmediata por si el evento ya pasó
loadSavedSettings();
updateStreakUI();
// También llamar después de renderizar el perfil por si acaso
const originalRenderProfile = renderProfile;
renderProfile = function() {
  originalRenderProfile();
  loadSavedSettings();
};

/* ══════════════════════════════════════════════════════
   20b. MISSING CORE FUNCTIONS
   togglePlay · playNext · playPrev · queue · haptic
══════════════════════════════════════════════════════ */

/* ── Haptic feedback (best-effort) ─────────────────── */
function hapticFeedback(style) {
  try {
    if (navigator.vibrate) {
      const pattern = style === 'medium' ? 20 : style === 'heavy' ? 40 : 10;
      navigator.vibrate(pattern);
    }
  } catch(_) {}
}

/* ── Toggle play / pause ────────────────────────────── */
function togglePlay() {
  if (_ytTrackActive && _ytPlayer && _ytReady) {
    if (_ytState === 1) {
      _ytPlayer.pauseVideo();
    } else {
      _ytPlayer.playVideo();
    }
    return;
  }
  const audio = activeAudio;
  if (!audio) return;
  if (!audio.src && !audio.currentSrc) return;
  if (audio.paused) {
    _resumeWithWatchdog();
  } else {
    audio.pause();
    isPlaying = false;
    updatePlayIcons(false);
    if ("mediaSession" in navigator) {
      try { navigator.mediaSession.playbackState = "paused"; } catch(_) {}
    }
  }
}

/* ── Debounce para next/prev ──────────────────────────
   Pulsar "siguiente"/"anterior" varias veces seguidas muy rápido
   (común en mini-player y swipe) lanzaba un loadTrack() completo
   por cada pulsación. Aunque el _playToken cancela el resultado de
   las cargas viejas, cada una ya había empezado una petición de red
   real — varias en paralelo saturaban la conexión y la canción
   final tardaba mucho más en sonar.

   IMPORTANTE: no podemos retrasar la llamada con un setTimeout,
   porque eso rompería la cadena de gesto de usuario que iOS exige
   para permitir audio.play() (crítico para los controles de la
   pantalla de bloqueo). En su lugar, simplemente IGNORAMOS pulsaciones
   que llegan demasiado pegadas a la anterior — la primera pulsación
   sigue ejecutándose al instante, igual que antes.                */
let _lastSkipAt = 0;
const SKIP_DEBOUNCE_MS = 220;
function _skipAllowed() {
  const now = Date.now();
  if (now - _lastSkipAt < SKIP_DEBOUNCE_MS) return false;
  _lastSkipAt = now;
  return true;
}

function playNext() {
  if (!_skipAllowed()) return;
  _playNextImmediate();
}

function playPrev() {
  if (!_skipAllowed()) return;
  _playPrevImmediate();
}

/* ── Play next track ────────────────────────────────── */
function _playNextImmediate() {
  // Check queue first
  if (queue.length > 0) {
    const nextFile = queue.shift();
    saveQueue();
    const item = getTrackByFile(nextFile);
    if (item) {
      const audio = activeAudio;
      if (audio) {
        audio.muted = false;
        if (audio.volume === 0) audio.volume = 1;
      }
      // Si estamos offline y la canción no está descargada, vaciamos la cola y buscamos la siguiente disponible
      if (!navigator.onLine && typeof OfflineManager !== 'undefined' && !OfflineManager.isDownloaded(item.file)) {
        saveQueue();
        renderQueueList();
        // Fall through to playlist
      } else {
        loadTrack(item, true);
        renderQueueList();
        return;
      }
    }
  }
  if (playlist.length === 0) return;

  const isOffline = !navigator.onLine;
  const maxTries  = playlist.length;
  let   tries     = 0;

  // Stop at end of playlist unless repeat-all or queue has items
  if (!shuffleMode && repeatMode !== "all" && queue.length === 0 && currentTrackIdx >= playlist.length - 1) {
    isPlaying = false;
    updatePlayIcons(false);
    return;
  }

  let nextIdx = currentTrackIdx;
  do {
    if (shuffleMode) {
      if (playlist.length > 1) {
        do { nextIdx = Math.floor(Math.random() * playlist.length); }
        while (nextIdx === currentTrackIdx && tries++ < maxTries * 2);
      } else {
        nextIdx = 0;
      }
    } else {
      nextIdx = (nextIdx + 1) % playlist.length;
      if (repeatMode !== "all" && queue.length === 0 && currentTrackIdx === playlist.length - 1 && nextIdx === 0) {
        isPlaying = false;
        updatePlayIcons(false);
        return;
      }
    }
    tries++;
    const candidate = playlist[nextIdx];
    // En modo offline solo reproducir si está descargada (o si no hay OfflineManager)
    if (!isOffline || typeof OfflineManager === 'undefined' || OfflineManager.isDownloaded(candidate.file)) {
      currentTrackIdx = nextIdx;
      const audio = activeAudio;
      if (audio) {
        audio.muted = false;
        if (audio.volume === 0) audio.volume = 1;
      }
      loadTrack(candidate, true);
      return;
    }
  } while (tries < maxTries);

  // Ningún track disponible offline
  if (isOffline && typeof showToast === 'function') {
    showToast('Sin canciones descargadas disponibles', 'default');
  }
}

/* ── Play previous track ────────────────────────────── */
function _playPrevImmediate() {
  const audio = activeAudio || audioEl;
  // If more than 3s in, restart current track
  if (audio && audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  if (playlist.length === 0) return;

  const isOffline = !navigator.onLine;
  const maxTries  = playlist.length;
  let   tries     = 0;
  let   prevIdx   = currentTrackIdx;

  do {
    prevIdx = (prevIdx - 1 + playlist.length) % playlist.length;
    tries++;
    const candidate = playlist[prevIdx];
    if (!isOffline || typeof OfflineManager === 'undefined' || OfflineManager.isDownloaded(candidate.file)) {
      currentTrackIdx = prevIdx;
      const audio = activeAudio;
      if (audio) {
        audio.muted = false;
        if (audio.volume === 0) audio.volume = 1;
      }
      loadTrack(candidate, true);
      return;
    }
  } while (tries < maxTries);

  if (isOffline && typeof showToast === 'function') {
    showToast('Sin canciones descargadas disponibles', 'default');
  }
}

/* ── Add to queue ───────────────────────────────────── */
function addToQueue(item) {
  if (!item?.file) return;
  queue.push(item.file);
  saveQueue();
  renderQueueList();
  showToast(`"${item.title}" añadida a la cola`, 'success');
}

/* ── Render queue now playing ───────────────────────── */
function renderQueueNowPlaying(item) {
  if (!queueNowPlaying) return;
  const cover = item.cover || getPlaceholderCover(item.category);
  queueNowPlaying.innerHTML = `
    <p class="queue-now-label">Reproduciendo ahora</p>
    <div class="queue-now-card">
      <div class="queue-now-cover-wrap">
        <img class="queue-now-img" src="${cover}" alt="${item.title}" />
        <div class="queue-now-bars">
          <div class="queue-now-bar"></div>
          <div class="queue-now-bar"></div>
          <div class="queue-now-bar"></div>
        </div>
      </div>
      <div class="queue-now-info">
        <div class="queue-now-title">${item.title}</div>
        <div class="queue-now-artist">${item.artist}</div>
        <div class="queue-now-progress">
          <div class="queue-now-progress-fill" id="queueProgressFill"></div>
        </div>
      </div>
    </div>`;
  // Update ambient glow with cover color
  const ambient = document.getElementById('queueAmbient');
  if (ambient) {
    ambient.style.background = `radial-gradient(ellipse 90% 45% at 50% -5%, rgba(139,92,246,.22) 0%, transparent 70%)`;
  }
  // Sync progress bar
  _syncQueueProgress();
}

function _syncQueueProgress() {
  const fill = document.getElementById('queueProgressFill');
  if (!fill) return;
  const audio = document.getElementById('mainAudio');
  if (!audio || !audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  fill.style.width = pct + '%';
}

// Tick progress bar while queue is open
setInterval(() => {
  if (document.getElementById('queuePanel')?.classList.contains('open')) {
    _syncQueueProgress();
  }
}, 500);

/* ── Smart Infinite Queue ───────────────────────────── */
const INFINITE_QUEUE_MIN = 3; // refill when fewer than this many tracks remain
const INFINITE_QUEUE_MAX = 12; // keep at most this many auto-added tracks

function _getRecentFiles(n = 20) {
  const recent = new Set();
  // current track
  const cur = playlist[currentTrackIdx];
  if (cur) recent.add(cur.file);
  // queue items
  queue.forEach(f => recent.add(f));
  // history
  if (typeof historyTracks !== 'undefined') {
    historyTracks.slice(0, n).forEach(h => recent.add(h.file));
  }
  return recent;
}

function _getSimilarTracks(seedItem, count = 3) {
  if (!seedItem) return [];
  const musicTracks = media.filter(m => m.type === 'music');
  const recent = _getRecentFiles(15);

  // Score each track by similarity
  const scored = musicTracks
    .filter(m => !recent.has(m.file))
    .map(m => {
      let score = 0;
      if (m.category === seedItem.category) score += 3;
      if (m.artist === seedItem.artist) score += 2;
      // same genre keyword in artist name
      const seedWords = (seedItem.artist || '').toLowerCase().split(/[\s,&]+/);
      const mWords    = (m.artist || '').toLowerCase().split(/[\s,&]+/);
      const overlap   = seedWords.filter(w => w.length > 2 && mWords.includes(w)).length;
      score += overlap;
      // add randomness for discovery
      score += Math.random() * 1.5;
      return { track: m, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(s => s.track);

  return scored;
}

function _autoFillQueue() {
  if (queue.length >= INFINITE_QUEUE_MIN) return;
  const hint = document.getElementById('queueInfiniteHint');
  const seed = playlist[currentTrackIdx] ||
               (queue.length > 0 ? getTrackByFile(queue[queue.length - 1]) : null);
  if (!seed) return;

  const needed = INFINITE_QUEUE_MIN + 2 - queue.length;
  const similar = _getSimilarTracks(seed, needed);
  if (similar.length === 0) return;

  similar.forEach(t => {
    if (queue.length < INFINITE_QUEUE_MAX) {
      queue.push(t.file);
    }
  });
  saveQueue();
  renderQueueList();
  if (hint) {
    hint.style.display = 'flex';
    setTimeout(() => { if (hint) hint.style.display = 'none'; }, 3500);
  }
}

/* ── Render queue list ──────────────────────────────── */
function renderQueueList() {
  if (!queueList) return;
  const countBadge = document.getElementById('queueCountBadge');

  if (queue.length === 0) {
    if (queueNextLabel) queueNextLabel.style.display = 'none';
    queueList.innerHTML = `
      <div class="queue-empty">
        <div class="queue-empty-icon">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
            <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
          </svg>
        </div>
        <p><strong>La cola está vacía</strong><br>Añade canciones desde la biblioteca o<br>activa la cola infinita</p>
      </div>`;
    return;
  }

  if (queueNextLabel) queueNextLabel.style.display = '';
  if (countBadge) countBadge.textContent = queue.length;

  const prevItems = new Set([...queueList.querySelectorAll('.queue-item')].map(el => el.dataset.file));
  queueList.innerHTML = '';

  queue.forEach((file, i) => {
    const item = getTrackByFile(file);
    if (!item) return;
    const cover = item.cover || getPlaceholderCover(item.category);
    const isNew = !prevItems.has(file);

    // ── Wrapper for swipe-to-delete ──
    const wrap = document.createElement('div');
    wrap.className = 'queue-item-wrap';
    wrap.style.cssText = 'position:relative;border-radius:12px;margin-bottom:2px;';

    // Red delete bg revealed on left swipe
    const delBg = document.createElement('div');
    delBg.className = 'queue-item-del-bg';
    delBg.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>
      <span style="font-size:.68rem;font-weight:700;letter-spacing:.04em;">Quitar</span>`;
    delBg.style.cssText = `
      position:absolute;top:0;bottom:0;right:0;width:90px;
      display:flex;align-items:center;justify-content:center;gap:.35rem;
      background:#e94f4f;color:#fff;border-radius:12px;
      pointer-events:none;opacity:0;transition:opacity .1s;`;

    const row = document.createElement('div');
    row.className = 'queue-item' + (isNew ? ' queue-item-new' : '');
    row.dataset.file = file;
    row.dataset.index = i;
    if (isNew) row.style.animationDelay = (i * 30) + 'ms';
    row.draggable = true;
    row.style.cssText = 'position:relative;z-index:1;will-change:transform;touch-action:pan-y;';
    row.innerHTML = `
      <div class="queue-item-drag" title="Arrastrar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="18" x2="16" y2="18"/></svg>
      </div>
      <div class="queue-item-cover">
        <img src="${cover}" alt="${item.title}" loading="lazy" />
        <div class="queue-item-num">${i + 1}</div>
      </div>
      <div class="queue-item-info">
        <div class="queue-item-title">${item.title}</div>
        <div class="queue-item-artist">${item.artist}</div>
      </div>
      <div class="queue-item-actions">
        <button class="queue-item-btn" data-action="remove" title="Quitar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>`;

    const SWIPE_THRESHOLD = 80;
    let _sx = 0, _sy = 0, _dx = 0, _swiping = false, _locked = false;

    function _removeItem() {
      if (typeof navigator.vibrate === 'function') navigator.vibrate(30);
      row.style.transition = 'transform .28s cubic-bezier(.4,0,1,1), opacity .28s';
      row.style.transform = 'translateX(-110%)';
      row.style.opacity = '0';
      setTimeout(() => {
        const idx = queue.indexOf(file);
        if (idx !== -1) { queue.splice(idx, 1); saveQueue(); renderQueueList(); }
      }, 280);
    }

    row.addEventListener('touchstart', e => {
      _sx = e.touches[0].clientX; _sy = e.touches[0].clientY;
      _dx = 0; _swiping = false; _locked = false;
      row.style.transition = 'none';
    }, { passive: false });

    row.addEventListener('touchmove', e => {
      const dx = e.touches[0].clientX - _sx;
      const dy = e.touches[0].clientY - _sy;
      if (!_locked) {
        if (Math.abs(dy) > Math.abs(dx) + 4) { _locked = true; return; }
        if (Math.abs(dx) > 6) { _swiping = true; _locked = true; }
      }
      if (!_swiping) return;
      e.preventDefault();
      e.stopPropagation();
      _dx = Math.min(0, dx);
      row.style.transform = `translateX(${_dx}px)`;
      const ratio = Math.min(1, Math.abs(_dx) / SWIPE_THRESHOLD);
      delBg.style.opacity = ratio > 0.1 ? String(ratio) : '0';
    }, { passive: false });

    row.addEventListener('touchend', () => {
      if (!_swiping) return;
      if (Math.abs(_dx) >= SWIPE_THRESHOLD) {
        _removeItem();
      } else {
        row.style.transition = 'transform .35s cubic-bezier(.34,1.56,.64,1)';
        row.style.transform = 'translateX(0)';
        delBg.style.opacity = '0';
      }
      _dx = 0; _swiping = false;
    });

    // Click to play
    row.addEventListener('click', e => {
      if (e.target.closest('[data-action="remove"]')) { _removeItem(); return; }
      if (Math.abs(_dx) > 5) return;
      const qIdx = queue.indexOf(file);
      if (qIdx >= 0) {
        queue.splice(0, qIdx + 1);
        saveQueue();
      }
      loadTrack(item, true);
      renderQueueList();
    });

    // Drag & Drop
    row.addEventListener('dragstart', e => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', i);
      row.classList.add('dragging');
      if (typeof navigator.vibrate === 'function') navigator.vibrate([10, 20, 10]);
    });
    row.addEventListener('dragend', () => row.classList.remove('dragging'));
    row.addEventListener('dragover', e => {
      e.preventDefault();
      document.querySelectorAll('.queue-item.drag-over').forEach(el => el.classList.remove('drag-over'));
      row.classList.add('drag-over');
    });
    row.addEventListener('dragleave', () => row.classList.remove('drag-over'));
    row.addEventListener('drop', e => {
      e.preventDefault();
      row.classList.remove('drag-over');
      const from = parseInt(e.dataTransfer.getData('text/plain'));
      const to   = parseInt(row.dataset.index);
      if (from === to || isNaN(from) || isNaN(to)) return;
      const [moved] = queue.splice(from, 1);
      queue.splice(to, 0, moved);
      saveQueue();
      renderQueueList();
      if (typeof navigator.vibrate === 'function') navigator.vibrate(20);
    });

    wrap.appendChild(delBg);
    wrap.appendChild(row);
    queueList.appendChild(wrap);
  });

  // Trigger auto-fill if queue is running low
  setTimeout(_autoFillQueue, 200);
}

/* ── Render queue list inside the now-playing sheet ── */
function renderSheetQueue() {
  const listEl   = document.getElementById('sheetQueueList');
  const countEl  = document.getElementById('sheetQueueAreaCount');
  if (!listEl) return;

  if (countEl) countEl.textContent = queue.length ? `${queue.length} canciones` : '';

  if (queue.length === 0) {
    listEl.innerHTML = `
      <div style="padding:2.5rem 1rem;text-align:center;color:rgba(255,255,255,.3);font-size:.82rem;line-height:1.6">
        La cola está vacía
      </div>`;
    return;
  }

  listEl.innerHTML = '';
  queue.forEach((file, i) => {
    const item = getTrackByFile(file);
    if (!item) return;
    const cover = item.cover || getPlaceholderCover(item.category);

    // ── Wrapper para swipe-to-delete ──
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative;border-radius:10px;margin-bottom:2px;overflow:hidden;';

    // Fondo rojo revelado al deslizar izquierda
    const delBg = document.createElement('div');
    delBg.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>
      <span style="font-size:.62rem;font-weight:700;letter-spacing:.04em;">Quitar</span>`;
    delBg.style.cssText = `
      position:absolute;top:0;bottom:0;right:0;width:80px;
      display:flex;align-items:center;justify-content:center;gap:.3rem;
      background:#e94f4f;color:#fff;border-radius:10px;
      pointer-events:none;opacity:0;transition:opacity .1s;`;

    const row = document.createElement('div');
    row.className = 'sq-item';
    row.style.cssText = 'position:relative;z-index:1;will-change:transform;touch-action:pan-y;';
    row.innerHTML = `
      <div class="sq-item-cover">
        <img src="${cover}" alt="${item.title}" loading="lazy" />
      </div>
      <div class="sq-item-info">
        <div class="sq-item-title">${item.title}</div>
        <div class="sq-item-artist">${item.artist}</div>
      </div>
      <div class="sq-item-drag">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="17" x2="16" y2="17"/>
        </svg>
      </div>`;

    const SWIPE_THRESHOLD = 80;
    let _sx = 0, _sy = 0, _dx = 0, _swiping = false, _locked = false;

    function _removeSqItem() {
      if (typeof navigator.vibrate === 'function') navigator.vibrate(30);
      row.style.transition = 'transform .26s cubic-bezier(.4,0,1,1), opacity .26s';
      row.style.transform = 'translateX(-110%)';
      row.style.opacity = '0';
      setTimeout(() => {
        const idx = queue.indexOf(file);
        if (idx !== -1) { queue.splice(idx, 1); saveQueue(); renderSheetQueue(); }
      }, 260);
    }

    row.addEventListener('touchstart', e => {
      _sx = e.touches[0].clientX; _sy = e.touches[0].clientY;
      _dx = 0; _swiping = false; _locked = false;
      row.style.transition = 'none';
    }, { passive: false });

    row.addEventListener('touchmove', e => {
      const dx = e.touches[0].clientX - _sx;
      const dy = e.touches[0].clientY - _sy;
      if (!_locked) {
        if (Math.abs(dy) > Math.abs(dx) + 4) { _locked = true; return; }
        if (Math.abs(dx) > 6) { _swiping = true; _locked = true; }
      }
      if (!_swiping) return;
      e.preventDefault();
      e.stopPropagation();
      _dx = Math.min(0, dx);
      row.style.transform = `translateX(${_dx}px)`;
      const ratio = Math.min(1, Math.abs(_dx) / SWIPE_THRESHOLD);
      delBg.style.opacity = ratio > 0.1 ? String(ratio) : '0';
    }, { passive: false });

    row.addEventListener('touchend', () => {
      if (!_swiping) return;
      if (Math.abs(_dx) >= SWIPE_THRESHOLD) {
        _removeSqItem();
      } else {
        row.style.transition = 'transform .32s cubic-bezier(.34,1.56,.64,1)';
        row.style.transform = 'translateX(0)';
        delBg.style.opacity = '0';
      }
      _dx = 0; _swiping = false;
    });

    row.addEventListener('click', () => {
      if (Math.abs(_dx) > 5) return;
      const qIdx = queue.indexOf(file);
      if (qIdx >= 0) { queue.splice(0, qIdx + 1); saveQueue(); }
      loadTrack(item, true);
      renderSheetQueue();
    });

    wrap.appendChild(delBg);
    wrap.appendChild(row);
    listEl.appendChild(wrap);
  });
}

/* ── Open / close queue panel ───────────────────────── */
function openQueuePanel() {
  if (!queuePanel) return;
  queuePanel.classList.add('open');
  if (queueOverlay) queueOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQueuePanel() {
  if (!queuePanel) return;
  queuePanel.classList.remove('open');
  if (queueOverlay) queueOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Wire up player buttons (sheet + mini) ──────────── */
(function wirePlayerButtons() {
  if (sheetPlay) sheetPlay.addEventListener('click', togglePlay);
  if (sheetNext) sheetNext.addEventListener('click', playNext);
  if (sheetPrev) sheetPrev.addEventListener('click', playPrev);
  if (miniPlay)  miniPlay.addEventListener('click',  togglePlay);
  if (miniNext)  miniNext.addEventListener('click',  playNext);

  if (miniPlayerExpand) {
    miniPlayerExpand.addEventListener('click', () => {
      nowPlayingSheet.classList.add('open');
    });
  }
  if (sheetClose) {
    sheetClose.addEventListener('click', () => {
      nowPlayingSheet.classList.remove('open');
      if (typeof window._droplyResetSheetView === 'function') window._droplyResetSheetView();
    });
  }
  const sheetDragHandle = document.getElementById('sheetDragHandle');
  if (sheetDragHandle) {
    sheetDragHandle.addEventListener('click', () => {
      nowPlayingSheet.classList.remove('open');
      if (typeof window._droplyResetSheetView === 'function') window._droplyResetSheetView();
    });
  }
  if (sheetHeart) {
    sheetHeart.addEventListener('click', () => {
      const cur = playlist[currentTrackIdx];
      if (cur) toggleLike(cur);
    });
  }
  if (sheetAddMenu) {
    sheetAddMenu.addEventListener('click', () => {
      const cur = playlist[currentTrackIdx];
      if (cur) openContextMenu(cur);
    });
  }
  if (sheetShuffle) {
    sheetShuffle.addEventListener('click', () => {
      shuffleMode = !shuffleMode;
      sheetShuffle.classList.toggle('active', shuffleMode);
      hapticFeedback('light');
      showToast(shuffleMode ? 'Aleatorio activado' : 'Aleatorio desactivado');
      if (typeof CloudSync !== 'undefined') CloudSync.markDirty();
    });
  }
  if (sheetRepeat) {
    sheetRepeat.addEventListener('click', () => {
      cycleRepeatMode();
      hapticFeedback('light');
    });
  }
  if (sheetQueueBtn) sheetQueueBtn.addEventListener('click', () => {
    setSheetView(_sheetView === 'queue' ? 'cover' : 'queue');
  });
  if (queueCloseBtn) queueCloseBtn.addEventListener('click', closeQueuePanel);
  if (queueOverlay)  queueOverlay.addEventListener('click', closeQueuePanel);
  const queueDragHandle = document.getElementById('queueDragHandle');
  if (queueDragHandle) queueDragHandle.addEventListener('click', closeQueuePanel);
  if (queueClearBtn) {
    queueClearBtn.addEventListener('click', () => {
      queue = [];
      saveQueue();
      renderQueueList();
      showToast('Cola vaciada');
    });
  }

  // Context menu legacy buttons (desktop fallback)
  if (ctxPlayNow) ctxPlayNow.addEventListener('click', () => { if (contextTarget) { loadTrack(contextTarget); closeContextMenu(); } });
  if (ctxAddQueue) ctxAddQueue.addEventListener('click', () => { if (contextTarget) { addToQueue(contextTarget); closeContextMenu(); } });
  if (ctxAddPlaylist) ctxAddPlaylist.addEventListener('click', () => { if (contextTarget) { openAddToPlaylist(contextTarget); closeContextMenu(); } });
  if (ctxLike) ctxLike.addEventListener('click', () => { if (contextTarget) { toggleLike(contextTarget); closeContextMenu(); } });
})();

/* ═══════════════════════════════════════════════════════════
   DROPLY — premium.js  v1.0
   Módulos: Offline/Descargas · Modo Coche · Transferencia · Cloud Sync
   
   IMPORTANTE: Este fichero se carga DESPUÉS de script.js.
   Extiende sin modificar el código original.
═══════════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════════════
   MÓDULO 1 — GESTIÓN OFFLINE / DESCARGAS (IndexedDB)
══════════════════════════════════════════════════════ */
const OfflineManager = (() => {
  const DB_NAME    = 'droply_offline_v1';
  const DB_VERSION = 1;
  const STORE_AUDIO  = 'audio';
  const STORE_COVERS = 'covers';
  const STORE_META   = 'meta';

  let db = null;

  /* ─── Open DB ─────────────────────────────────── */
  async function openDB() {
    if (db) return db;
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = e => {
        const d = e.target.result;
        if (!d.objectStoreNames.contains(STORE_AUDIO))  d.createObjectStore(STORE_AUDIO);
        if (!d.objectStoreNames.contains(STORE_COVERS)) d.createObjectStore(STORE_COVERS);
        if (!d.objectStoreNames.contains(STORE_META))   d.createObjectStore(STORE_META);
      };
      req.onsuccess = e => { db = e.target.result; resolve(db); };
      req.onerror   = () => reject(req.error);
    });
  }

  /* ─── Generic IDB helpers ─────────────────────── */
  async function idbSet(store, key, value) {
    const d = await openDB();
    return new Promise((res, rej) => {
      const tx = d.transaction(store, 'readwrite');
      tx.objectStore(store).put(value, key);
      tx.oncomplete = () => res(true);
      tx.onerror    = () => rej(tx.error);
    });
  }
  async function idbGet(store, key) {
    const d = await openDB();
    return new Promise((res, rej) => {
      const req = d.transaction(store, 'readonly').objectStore(store).get(key);
      req.onsuccess = () => res(req.result || null);
      req.onerror   = () => rej(req.error);
    });
  }
  async function idbDel(store, key) {
    const d = await openDB();
    return new Promise((res, rej) => {
      const tx = d.transaction(store, 'readwrite');
      tx.objectStore(store).delete(key);
      tx.oncomplete = () => res(true);
      tx.onerror    = () => rej(tx.error);
    });
  }
  async function idbKeys(store) {
    const d = await openDB();
    return new Promise((res, rej) => {
      const req = d.transaction(store, 'readonly').objectStore(store).getAllKeys();
      req.onsuccess = () => res(req.result || []);
      req.onerror   = () => rej(req.error);
    });
  }

  /* ─── State ───────────────────────────────────── */
  const downloadStates = new Map(); // file -> 'pending'|'downloading'|'done'|'error'
  let downloadedKeys   = new Set();
  let downloadQueue    = [];
  let isDownloading    = false;

  /* ─── Init ────────────────────────────────────── */
  async function init() {
    try {
      await openDB();
      const keys = await idbKeys(STORE_META);
      downloadedKeys = new Set(keys);
      keys.forEach(k => downloadStates.set(k, 'done'));
      updateAllCardDownloadButtons();
      updateDownloadsBadge();
    } catch(e) {
      console.warn('[DROPLY Offline] IndexedDB no disponible:', e);
    }
  }

  /* ─── Download a track ────────────────────────── */
  async function downloadTrack(item, onProgress) {
    if (!item?.file) return;
    const key = item.file;
    if (downloadStates.get(key) === 'done') return;
    if (downloadStates.get(key) === 'downloading') return;

    downloadStates.set(key, 'downloading');
    updateCardDownloadBtn(key, 'downloading');

    try {
      // Fetch audio — cache:'reload' evita interferencia del SW
      // Usa blob() como fallback para iOS Safari (no soporta ReadableStream)
      const audioResp = await fetch(key, { cache: 'reload' });
      if (!audioResp.ok) throw new Error(`HTTP ${audioResp.status}`);

      let audioBlob;
      if (audioResp.body && typeof audioResp.body.getReader === 'function') {
        const total  = parseInt(audioResp.headers.get('content-length') || '0');
        const reader = audioResp.body.getReader();
        const chunks = [];
        let loaded   = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          loaded += value.byteLength;
          if (total > 0 && onProgress) onProgress(loaded / total);
        }
        audioBlob = new Blob(chunks, { type: 'audio/mpeg' });
      } else {
        // Fallback Safari
        audioBlob = await audioResp.blob();
      }

      // Fetch cover (best-effort)
      let coverBlob = null;
      try {
        const coverResp = await fetch(item.cover, { cache: 'reload' });
        if (coverResp.ok) coverBlob = await coverResp.blob();
      } catch(_) {}

      // Save to IDB
      await idbSet(STORE_AUDIO,  key, audioBlob);
      await idbSet(STORE_META,   key, { title: item.title, artist: item.artist, category: item.category, duration: item.duration, cover: item.cover, file: item.file, downloadedAt: Date.now() });
      if (coverBlob) await idbSet(STORE_COVERS, key, coverBlob);

      downloadStates.set(key, 'done');
      downloadedKeys.add(key);
      updateCardDownloadBtn(key, 'done');
      updateDownloadsBadge();
      if (typeof renderOfflinePlaylist === 'function') renderOfflinePlaylist();
      if (typeof showToast === 'function') showToast(`"${item.title}" guardada offline ✓`, 'success');
    } catch(err) {
      downloadStates.set(key, 'error');
      updateCardDownloadBtn(key, 'error');
      console.warn('[DROPLY Offline] Error al descargar:', key, err);
      if (typeof showToast === 'function') showToast(`Error al descargar "${item.title}"`, 'error');
    }
  }

  /* ─── Get offline audio src ───────────────────── */
  async function getOfflineSrc(file) {
    if (!downloadedKeys.has(file)) return null;
    try {
      const blob = await idbGet(STORE_AUDIO, file);
      if (!blob) return null;
      return URL.createObjectURL(blob);
    } catch(_) { return null; }
  }

  /* ─── Delete a download ───────────────────────── */
  async function deleteDownload(key) {
    await idbDel(STORE_AUDIO,  key);
    await idbDel(STORE_COVERS, key);
    await idbDel(STORE_META,   key);
    downloadStates.delete(key);
    downloadedKeys.delete(key);
    updateCardDownloadBtn(key, 'none');
    updateDownloadsBadge();
    if (typeof renderOfflinePlaylist === 'function') renderOfflinePlaylist();
  }

  /* ─── Get all downloaded meta ─────────────────── */
  async function getAllDownloads() {
    const d = await openDB();
    return new Promise((res, rej) => {
      const req = d.transaction(STORE_META, 'readonly').objectStore(STORE_META).getAll();
      req.onsuccess = () => res(req.result || []);
      req.onerror   = () => rej(req.error);
    });
  }

  /* ─── Estimate storage ────────────────────────── */
  async function getStorageEstimate() {
    try {
      if (navigator.storage?.estimate) {
        const { usage, quota } = await navigator.storage.estimate();
        return { usage, quota };
      }
    } catch(_) {}
    return { usage: 0, quota: 0 };
  }

  /* ─── UI helpers ──────────────────────────────── */
  function getCardDownloadBtn(file) {
    // Legacy: returns null since card-download-btn no longer exists
    return null;
  }

  function updateCardDownloadBtn(file, state) {
    syncDownloadedEmoji(file, state === 'done');
  }

  function updateAllCardDownloadButtons() {
    document.querySelectorAll('.media-card').forEach(card => {
      const file = card.dataset.file;
      if (!file) return;
      syncDownloadedEmoji(file, downloadedKeys.has(file));
    });
  }

  function updateDownloadsBadge() {
    /* Sin pestaña Offline en la barra inferior */
  }

  /* ─── Render downloads page ───────────────────── */
  async function renderDownloadsList() {
    const container = document.getElementById('downloadsListContainer');
    if (!container) return;
    const bar    = document.getElementById('offlineStorageFill');
    const barLbl = document.getElementById('offlineStorageSize');

    const { usage, quota } = await getStorageEstimate();
    if (bar && quota > 0) {
      bar.style.width = Math.min(100, (usage / quota) * 100) + '%';
    }
    if (barLbl) {
      const usedMB  = (usage / 1024 / 1024).toFixed(1);
      const totalGB = quota > 0 ? (quota / 1024 / 1024 / 1024).toFixed(1) : '—';
      barLbl.textContent = `${usedMB} MB / ${totalGB} GB`;
    }

    const items = await getAllDownloads();
    if (items.length === 0) {
      container.innerHTML = `<div class="offline-empty">
        <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        <h3>Sin descargas</h3>
        <p>Pulsa el ícono ↓ en cualquier canción para guardarla y escucharla sin internet.</p>
      </div>`;
      return;
    }

    const fragment = document.createDocumentFragment();
    items.sort((a,b) => (b.downloadedAt||0) - (a.downloadedAt||0)).forEach(item => {
      // Wrap for swipe-to-delete
      const wrap = document.createElement('div');
      wrap.className = 'playlist-detail-item-wrap';
      wrap.style.borderRadius = '10px';
      wrap.style.marginBottom = '2px';

      const deleteBg = document.createElement('div');
      deleteBg.className = 'playlist-detail-item-delete-bg';
      deleteBg.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/></svg><span>BORRAR</span>`;
      wrap.appendChild(deleteBg);

      const row = document.createElement('div');
      row.className = 'library-item fade-in playlist-detail-item';
      row.style.margin = '0';
      const cover = item.cover || (typeof getPlaceholderCover === 'function' ? getPlaceholderCover(item.category) : '');
      row.innerHTML = `
        <div class="library-thumb"><img src="${cover}" alt="${item.title}" /></div>
        <div class="library-info">
          <span class="library-track-title">${item.title}</span>
          <span class="library-track-artist">${item.artist} · <span style="color:var(--green);font-size:.7rem">✓ Offline</span></span>
        </div>
        <div class="library-item-actions">
          <button class="library-action-btn" data-action="delete" title="Eliminar descarga" style="color:var(--text-soft)">
            <svg viewBox="0 0 24 24" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </div>
        <span class="library-item-dur">${item.duration || ''}</span>`;
      row.addEventListener('click', async e => {
        if (e.target.closest('[data-action="delete"]')) {
          e.stopPropagation();
          await deleteDownload(item.file);
          return;
        }
        if (typeof hapticFeedback === 'function') hapticFeedback('light');
        const trackItem = { ...item };
        const offlineSrc = await getOfflineSrc(item.file);
        if (offlineSrc && typeof loadTrack === 'function') {
          const patchedItem = { ...trackItem, _offlineSrc: offlineSrc };
          loadTrack(patchedItem);
        } else if (typeof loadTrack === 'function') {
          loadTrack(trackItem);
        }
      });

      // Swipe-to-delete touch handler
      const SWIPE_THRESHOLD = 72;
      let _sx = 0, _sy = 0, _dx = 0, _sw = false, _locked = false;
      row.addEventListener('touchstart', e => {
        _sx = e.touches[0].clientX; _sy = e.touches[0].clientY;
        _dx = 0; _sw = false; _locked = false;
        row.classList.remove('snap-back');
      }, { passive: true });
      row.addEventListener('touchmove', e => {
        const dx = e.touches[0].clientX - _sx;
        const dy = e.touches[0].clientY - _sy;
        if (!_locked) {
          if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            _locked = true;
            if (Math.abs(dy) > Math.abs(dx)) return;
            _sw = true;
          } else return;
        }
        if (!_sw) return;
        _dx = Math.min(0, dx);
        row.style.transform = `translateX(${_dx}px)`;
        row.classList.add('swiping'); wrap.classList.add('swiping');
        const ratio = Math.min(1, Math.abs(_dx) / SWIPE_THRESHOLD);
        deleteBg.style.opacity = ratio;
        deleteBg.style.background = ratio >= 1 ? '#c0392b' : '#e94f4f';
      }, { passive: true });
      row.addEventListener('touchend', () => {
        row.classList.remove('swiping'); wrap.classList.remove('swiping');
        deleteBg.style.opacity = ''; deleteBg.style.background = '';
        if (!_sw) return; _sw = false;
        if (Math.abs(_dx) >= SWIPE_THRESHOLD) {
          row.classList.add('fly-out');
          if (typeof hapticFeedback === 'function') hapticFeedback('medium');
          setTimeout(async () => {
            wrap.style.maxHeight = wrap.offsetHeight + 'px';
            wrap.style.transition = 'max-height .28s ease, opacity .28s';
            wrap.style.overflow = 'hidden';
            requestAnimationFrame(() => { wrap.style.maxHeight = '0'; wrap.style.opacity = '0'; });
            setTimeout(async () => { await deleteDownload(item.file); }, 280);
          }, 60);
        } else {
          row.classList.add('snap-back');
          row.style.transform = '';
          setTimeout(() => row.classList.remove('snap-back'), 350);
        }
        _dx = 0;
      }, { passive: true });

      wrap.appendChild(row);
      fragment.appendChild(wrap);
    });
    container.innerHTML = '';
    container.appendChild(fragment);
  }

  /* ─── Offline detection ───────────────────────── */
  function setupOfflineDetection() {
    const badge = document.getElementById('offlineStatusBadge');
    if (!badge) return;

    function updateStatus() {
      const online = navigator.onLine;
      badge.classList.toggle('is-offline', !online);
      badge.classList.toggle('is-online', online);
      badge.querySelector('.badge-text').textContent = online ? 'Conexión restaurada' : 'Sin conexión — modo offline';
      badge.classList.add('visible');
      clearTimeout(badge._hideTimer);
      badge._hideTimer = setTimeout(() => badge.classList.remove('visible'), online ? 2800 : 999999);
      if (!online && typeof showToast === 'function') {
        showToast('Sin internet — reproduciendo desde caché', 'default');
      }
    }

    window.addEventListener('online',  updateStatus);
    window.addEventListener('offline', updateStatus);

    if (!navigator.onLine) updateStatus();
  }

  return { init, downloadTrack, getOfflineSrc, deleteDownload, renderDownloadsList, getAllDownloads, getStorageEstimate, isDownloaded: k => downloadedKeys.has(k), updateAllCardDownloadButtons, setupOfflineDetection };
})();


/* ══════════════════════════════════════════════════════
   MÓDULO 2 — MODO COCHE
══════════════════════════════════════════════════════ */
const CarMode = (() => {
  let active = false;
  let clockTimer = null;
  let swipeStartX = 0;
  let swipeStartY = 0;
  let suggestDismissed = false;

  function formatTimeClock() {
    const now = new Date();
    return now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
  }

  function activate() {
    const panel = document.getElementById('carModePanel');
    if (!panel) return;
    active = true;
    panel.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (typeof hapticFeedback === 'function') hapticFeedback('medium');
    syncCarModeToPlayer();
    startClock();
    document.getElementById('carModeTopbarBtn')?.classList.add('active');
    hideSuggest();
    if (typeof showToast === 'function') showToast('Modo Coche activado', 'success');
  }

  function deactivate() {
    const panel = document.getElementById('carModePanel');
    if (!panel) return;
    active = false;
    panel.classList.remove('active');
    document.body.style.overflow = '';
    stopClock();
    document.getElementById('carModeTopbarBtn')?.classList.remove('active');
    if (typeof hapticFeedback === 'function') hapticFeedback('light');
  }

  function toggle() { active ? deactivate() : activate(); }

  function startClock() {
    const el = document.getElementById('carModeTime');
    if (!el) return;
    el.textContent = formatTimeClock();
    clockTimer = setInterval(() => { el.textContent = formatTimeClock(); }, 15000);
  }
  function stopClock() {
    clearInterval(clockTimer); clockTimer = null;
  }

  function syncCarModeToPlayer() {
    // Pull current state from main player globals
    const title  = (typeof sheetTitle  !== 'undefined' && sheetTitle.textContent)  || '—';
    const artist = (typeof sheetArtist !== 'undefined' && sheetArtist.textContent) || '—';
    const src    = (typeof sheetCover  !== 'undefined' && sheetCover.src)          || '';

    const cTitle  = document.getElementById('carModeTitle');
    const cArtist = document.getElementById('carModeArtist');
    const cCover  = document.getElementById('carModeCoverImg');
    const cBgImg  = document.getElementById('carModeBgImg');

    if (cTitle)  cTitle.textContent  = title;
    if (cArtist) cArtist.textContent = artist;
    if (cCover && src)  { cCover.src = src; }
    if (cBgImg && src)  { cBgImg.src = src; }

    updateCarPlayState();
    updateCarProgress();
  }

  function updateCarPlayState() {
    const playBtn   = document.getElementById('carPlayBtn');
    const coverEl   = document.getElementById('carModeCover');
    const playing   = typeof isPlaying !== 'undefined' ? isPlaying : false;
    if (playBtn) {
      playBtn.innerHTML = playing
        ? `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="3" width="4" height="18"/><rect x="14" y="3" width="4" height="18"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5,3 19,12 5,21"/></svg>`;
    }
    coverEl?.classList.toggle('playing', playing);
  }

  function updateCarProgress() {
    if (!active) return;
    const audio    = typeof audioEl !== 'undefined' ? audioEl : null;
    const fill     = document.getElementById('carModeBarFill');
    const current  = document.getElementById('carModeCurrent');
    const durEl    = document.getElementById('carModeDuration');
    if (!audio || !fill) return;
    const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    fill.style.width = pct + '%';
    if (current && typeof formatTime === 'function') current.textContent = formatTime(audio.currentTime);
    if (durEl   && typeof formatTime === 'function') durEl.textContent   = formatTime(audio.duration || 0);
  }

  function setupSwipeGestures(panel) {
    panel.addEventListener('touchstart', e => {
      swipeStartX = e.touches[0].clientX;
      swipeStartY = e.touches[0].clientY;
    }, { passive: true });

    panel.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - swipeStartX;
      const dy = e.changedTouches[0].clientY - swipeStartY;
      if (Math.abs(dx) < Math.abs(dy)) return; // vertical swipe — ignore
      if (Math.abs(dx) < 60) return; // too short
      if (typeof hapticFeedback === 'function') hapticFeedback('medium');
      if (dx < 0 && typeof playNext === 'function') playNext();
      if (dx > 0 && typeof playPrev === 'function') playPrev();
    }, { passive: true });
  }

  function showSuggest() {
    if (suggestDismissed || active) return;
    const toast = document.getElementById('carSuggestToast');
    if (toast) toast.classList.add('visible');
  }
  function hideSuggest() {
    document.getElementById('carSuggestToast')?.classList.remove('visible');
  }

  function setupBluetoothDetect() {
    // Detect headset/car bluetooth via audio output change
    navigator.mediaDevices?.addEventListener?.('devicechange', async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasHeadset = devices.some(d => d.kind === 'audiooutput' && d.label.toLowerCase().match(/bluetooth|hands.free|car|auto/i));
        if (hasHeadset && !active && !suggestDismissed) {
          setTimeout(showSuggest, 1500);
        }
      } catch(_) {}
    });
  }

  return {
    activate, deactivate, toggle, active: () => active, isActive: () => active,
    syncToPlayer: syncCarModeToPlayer,
    updatePlayState: updateCarPlayState,
    updateProgress: updateCarProgress,
    setup(panel) {
      setupSwipeGestures(panel);
      setupBluetoothDetect();
      // Progress bar click
      const bar = panel.querySelector('#carModeBar');
      if (bar) {
        bar.addEventListener('click', e => {
          const audio = typeof audioEl !== 'undefined' ? audioEl : null;
          if (!audio?.duration) return;
          const rect = bar.getBoundingClientRect();
          const pct  = (e.clientX - rect.left) / rect.width;
          audio.currentTime = pct * audio.duration;
        });
      }
    },
    showSuggest, hideSuggest,
    setSuggestDismissed: () => { suggestDismissed = true; }
  };
})();


/* ══════════════════════════════════════════════════════
   MÓDULO 3 — TRANSFERENCIA ENTRE DISPOSITIVOS (desactivado)
══════════════════════════════════════════════════════ */
const TransferManager = (() => {
  const SESSION_KEY = 'droply_transfer_session';
  let channel = null;
  let sessionId = null;
  let knownDevices = new Map(); // id -> { name, lastSeen, platform }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function getSessionId() {
    if (sessionId) return sessionId;
    sessionId = sessionStorage.getItem(SESSION_KEY) || generateId();
    sessionStorage.setItem(SESSION_KEY, sessionId);
    return sessionId;
  }

  function getPlatformName() {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua)) return 'iPhone/iPad';
    if (/Android/.test(ua)) return 'Android';
    if (/Mac/.test(ua)) return 'Mac';
    if (/Windows/.test(ua)) return 'Windows';
    return 'Dispositivo';
  }

  function getDeviceLabel() {
    return getPlatformName() + ' — ' + getSessionId().slice(-4).toUpperCase();
  }

  /* ─── BroadcastChannel (same-origin tabs/windows) */
  function setupBroadcast() {
    if (!('BroadcastChannel' in window)) return;
    try {
      channel = new BroadcastChannel('droply_transfer');
      channel.onmessage = e => handleIncomingMessage(e.data);
      // Announce presence
      broadcastMessage({ type: 'ANNOUNCE', id: getSessionId(), label: getDeviceLabel(), platform: getPlatformName() });
      // Ping every 15s to keep alive
      setInterval(() => broadcastMessage({ type: 'PING', id: getSessionId(), label: getDeviceLabel() }), 15000);
    } catch(_) {}
  }

  function broadcastMessage(data) {
    try { channel?.postMessage(data); } catch(_) {}
  }

  function handleIncomingMessage(data) {
    if (!data?.type || data.id === getSessionId()) return;
    switch (data.type) {
      case 'ANNOUNCE':
      case 'PING':
        knownDevices.set(data.id, { name: data.label || data.id, platform: data.platform || '?', lastSeen: Date.now() });
        refreshDevicesList();
        // Reply with our presence
        broadcastMessage({ type: 'PING', id: getSessionId(), label: getDeviceLabel() });
        break;
      case 'TRANSFER_REQUEST': {
        // Another tab wants to receive playback
        const state = getCurrentState();
        broadcastMessage({ type: 'TRANSFER_RESPONSE', to: data.id, from: getSessionId(), state });
        break;
      }
      case 'TRANSFER_RESPONSE': {
        if (data.to !== getSessionId()) return;
        applyState(data.state);
        showTransferSuccess();
        break;
      }
      case 'TRANSFER_PUSH': {
        // Someone is pushing state to us
        applyState(data.state);
        showTransferSuccess();
        break;
      }
    }
  }

  function getCurrentState() {
    const audio = typeof audioEl !== 'undefined' ? audioEl : null;
    const track = typeof playlist !== 'undefined' && typeof currentTrackIdx !== 'undefined'
      ? playlist[currentTrackIdx] : null;
    return {
      file:        track?.file || null,
      title:       track?.title || '',
      artist:      track?.artist || '',
      cover:       track?.cover || '',
      category:    track?.category || '',
      currentTime: audio?.currentTime || 0,
      isPlaying:   typeof isPlaying !== 'undefined' ? isPlaying : false,
      volume:      audio?.volume ?? 1,
      shuffleMode: typeof shuffleMode !== 'undefined' ? shuffleMode : false,
      repeatMode:  typeof repeatMode  !== 'undefined' ? repeatMode  : 'off',
      queue:       typeof queue !== 'undefined' ? [...queue] : [],
    };
  }

  async function applyState(state) {
    if (!state?.file) return;
    const track = typeof media !== 'undefined' ? media.find(m => m.file === state.file) : null;
    if (!track) return;

    if (typeof loadTrack === 'function') {
      loadTrack(track);
      // Seek to exact position after audio loads
      const audio = typeof audioEl !== 'undefined' ? audioEl : null;
      if (audio) {
        const trySeek = () => {
          if (audio.readyState >= 2) {
            audio.currentTime = state.currentTime || 0;
            audio.volume = state.volume ?? 1;
            if (!state.isPlaying) audio.pause();
          } else {
            audio.addEventListener('canplay', () => {
              audio.currentTime = state.currentTime || 0;
              audio.volume = state.volume ?? 1;
              if (!state.isPlaying) audio.pause();
            }, { once: true });
          }
        };
        setTimeout(trySeek, 300);
      }
    }
    if (typeof showToast === 'function') showToast('Reproducción recibida de otro dispositivo', 'success');
  }

  function transferTo(deviceId) {
    const state = getCurrentState();
    broadcastMessage({ type: 'TRANSFER_PUSH', to: deviceId, from: getSessionId(), state });
    if (typeof showToast === 'function') showToast('Reproducción enviada', 'success');
    closePanel();
  }

  function requestFrom(deviceId) {
    broadcastMessage({ type: 'TRANSFER_REQUEST', to: deviceId, from: getSessionId() });
  }

  function showTransferSuccess() {
    const panel = document.getElementById('transferPanel');
    if (panel) panel.classList.add('transfer-success-flash');
    setTimeout(() => panel?.classList.remove('transfer-success-flash'), 500);
    closePanel();
  }

  /* ─── QR fallback ─────────────────────────────── */
  function generateQRData() {
    const state = getCurrentState();
    return JSON.stringify({ v: 1, id: getSessionId(), state });
  }

  function drawQRCode(canvas, text) {
    // Simple QR-like visual using canvas (actual QR lib not loaded — display session info)
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    // Draw a simple data matrix representation
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#000';
    const bytes = [...text].map(c => c.charCodeAt(0));
    const cell  = size / 10;
    bytes.slice(0, 100).forEach((b, i) => {
      if (b % 2 === 0) {
        const x = (i % 10) * cell;
        const y = Math.floor(i / 10) * cell;
        ctx.fillRect(x, y, cell - 1, cell - 1);
      }
    });
    // Finder patterns
    ctx.fillRect(0, 0, cell * 3, cell);
    ctx.fillRect(0, 0, cell, cell * 3);
    ctx.fillRect(cell * 2, 0, cell, cell * 3);
    ctx.fillRect(0, cell * 2, cell * 3, cell);
    ctx.fillRect(cell * 7, 0, cell * 3, cell);
    ctx.fillRect(cell * 9, 0, cell, cell * 3);
    ctx.fillRect(cell * 7, cell * 2, cell * 3, cell);
  }

  /* ─── Panel UI ────────────────────────────────── */
  function openPanel() {
    document.getElementById('transferPanel')?.classList.add('open');
    document.getElementById('transferOverlay')?.classList.add('open');
    refreshDevicesList();
    updateTransferCurrentCard();
    // Draw QR
    const canvas = document.getElementById('transferQRCanvas');
    if (canvas) drawQRCode(canvas, getSessionId());
    document.getElementById('transferSessionId').textContent = getSessionId();
  }

  function closePanel() {
    document.getElementById('transferPanel')?.classList.remove('open');
    document.getElementById('transferOverlay')?.classList.remove('open');
  }

  function updateTransferCurrentCard() {
    const audio = typeof audioEl !== 'undefined' ? audioEl : null;
    const track = typeof playlist !== 'undefined' && typeof currentTrackIdx !== 'undefined'
      ? playlist[currentTrackIdx] : null;
    if (!track) return;

    const titleEl  = document.getElementById('transferCurrentTitle');
    const artistEl = document.getElementById('transferCurrentArtist');
    const coverEl  = document.getElementById('transferCurrentCover');
    const timeEl   = document.getElementById('transferCurrentTime');

    if (titleEl)  titleEl.textContent  = track.title  || '—';
    if (artistEl) artistEl.textContent = track.artist || '—';
    if (coverEl)  coverEl.src  = track.cover || '';
    if (timeEl && audio && typeof formatTime === 'function') {
      timeEl.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration || 0);
    }
  }

  function refreshDevicesList() {
    const container = document.getElementById('transferDevicesList');
    if (!container) return;

    // Clean stale devices (>30s)
    const now = Date.now();
    knownDevices.forEach((d, id) => { if (now - d.lastSeen > 30000) knownDevices.delete(id); });

    if (knownDevices.size === 0) {
      container.innerHTML = `<div style="text-align:center;padding:1.5rem;color:var(--text-soft);font-size:.82rem">
        <div style="font-size:2rem;margin-bottom:.5rem">📱</div>
        Abre DROPLY en otro dispositivo o pestaña para ver dispositivos disponibles.
      </div>`;
      return;
    }

    container.innerHTML = '';
    knownDevices.forEach((device, id) => {
      const el = document.createElement('div');
      el.className = 'transfer-device-item';
      const icon = device.platform?.includes('iPhone') || device.platform?.includes('iPad') ? '📱'
        : device.platform?.includes('Android') ? '📱'
        : device.platform?.includes('Mac') ? '💻' : '🖥';
      el.innerHTML = `
        <div class="transfer-device-icon"><span style="font-size:1.3rem">${icon}</span></div>
        <div class="transfer-device-info">
          <div class="transfer-device-name">${device.name}</div>
          <div class="transfer-device-status online">Disponible</div>
        </div>
        <button class="transfer-device-btn" data-action="send" data-id="${id}">Enviar</button>`;
      el.querySelector('[data-action="send"]').addEventListener('click', e => {
        e.stopPropagation();
        transferTo(id);
      });
      container.appendChild(el);
    });
  }

  return {
    init() { setupBroadcast(); },
    open: openPanel,
    close: closePanel,
    getDeviceLabel,
    getSessionId,
  };
})();


/* ══════════════════════════════════════════════════════
   MÓDULO 4 — SINCRONIZACIÓN CLOUD (localStorage + BroadcastChannel)
   Nota: Para sync real entre dispositivos distintos se necesita
   backend. Esta implementación sincroniza tabs del mismo navegador
   + persiste estado para "continuar donde lo dejé" en el mismo device.
══════════════════════════════════════════════════════ */
const CloudSync = (() => {
  const STATE_KEY = 'droply_cloud_state_v1';
  let syncChannel = null;
  let syncTimer   = null;
  let dirty       = false;
  let indicator   = null;

  function getState() {
    const audio = typeof audioEl !== 'undefined' ? audioEl : null;
    const track = typeof playlist !== 'undefined' && typeof currentTrackIdx !== 'undefined'
      ? playlist[currentTrackIdx] : null;
    return {
      file:        track?.file || null,
      currentTime: audio?.currentTime || 0,
      isPlaying:   typeof isPlaying !== 'undefined' ? isPlaying : false,
      volume:      audio?.volume ?? 1,
      shuffleMode: typeof shuffleMode !== 'undefined' ? shuffleMode : false,
      repeatMode:  typeof repeatMode  !== 'undefined' ? repeatMode  : 'off',
      queue:       typeof queue !== 'undefined' ? [...queue] : [],
      playlists:   typeof playlists !== 'undefined' ? playlists : [],
      liked:       typeof likedTracks !== 'undefined' ? [...likedTracks] : [],
      history:     typeof historyTracks !== 'undefined' ? historyTracks.slice(0, 50) : [],
      playCounts:  typeof playCounts !== 'undefined' ? playCounts : {},
      ts:          Date.now(),
    };
  }

  function saveState() {
    try {
      const state = getState();
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
      // Broadcast to other tabs
      syncChannel?.postMessage({ type: 'STATE_UPDATE', state });
      showSynced();
    } catch(e) {
      showError();
    }
  }

  function loadSavedState() {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch(_) { return null; }
  }

  async function restoreLastSession() {
    const state = loadSavedState();
    if (!state?.file) return;
    if (Date.now() - (state.ts || 0) > 7 * 24 * 3600 * 1000) return;
    const track = typeof media !== 'undefined' ? media.find(m => m.file === state.file) : null;
    if (!track) return;

    const audio = typeof audioEl !== 'undefined' ? audioEl : null;
    if (audio && state.volume != null) audio.volume = state.volume;
    if (typeof volSlider !== 'undefined') volSlider.value = state.volume ?? 1;

    if (state.shuffleMode != null) shuffleMode = !!state.shuffleMode;
    if (state.repeatMode === true) repeatMode = 'one';
    else if (state.repeatMode === 'one' || state.repeatMode === 'all' || state.repeatMode === 'off') repeatMode = state.repeatMode;
    if (typeof sheetShuffle !== 'undefined' && sheetShuffle) sheetShuffle.classList.toggle('active', shuffleMode);
    if (typeof updateRepeatUI === 'function') updateRepeatUI();

    if (Array.isArray(state.queue) && typeof queue !== 'undefined') {
      queue.length = 0;
      queue.push(...state.queue);
      if (typeof saveQueue === 'function') saveQueue();
      if (typeof renderQueueList === 'function') renderQueueList();
    }

    if (typeof loadTrack === 'function') {
      loadTrack(track, false, null, { autoPlay: false, silent: true });
      if (audio) {
        const seekTo = state.currentTime || 0;
        // BUG QUE ARREGLA: antes esta función SIEMPRE forzaba audio.pause()
        // al restaurar, ignorando si state.isPlaying era true. Como una PWA
        // en pantalla bloqueada se recarga sola en segundo plano en cuanto
        // el sistema operativo mata la pestaña (algo normal en iOS/Android
        // cuando el audio está pausado y no hay nada "vivo" que justifique
        // mantener el proceso), cada vez que el usuario volvía a pulsar play
        // —ya fuera desde dentro de la app o desde la pantalla bloqueada—
        // se encontraba con la sesión recién restaurada y forzada a pausa,
        // sin seguir nunca. Ahora respetamos la intención guardada.
        const wasPlaying = !!state.isPlaying;
        const afterSeek = () => {
          if (wasPlaying) {
            // Reanudar de verdad. Si el navegador bloquea el autoplay por
            // falta de gesto reciente, _resumeWithWatchdog deja el track
            // cargado y posicionado, con MediaSession ya registrado — así
            // un solo toque en Play (in-app o en pantalla bloqueada)
            // completa la reanudación al instante.
            if (typeof _resumeWithWatchdog === 'function') {
              _resumeWithWatchdog();
            } else {
              audio.play()
                .then(() => { isPlaying = true; updatePlayIcons(true); })
                .catch(() => { isPlaying = false; updatePlayIcons(false); });
            }
          } else {
            audio.pause();
            isPlaying = false;
            updatePlayIcons(false);
          }
        };
        const trySeek = () => {
          if (audio.readyState >= 1) {
            audio.currentTime = seekTo;
            afterSeek();
          } else {
            audio.addEventListener('loadedmetadata', () => {
              audio.currentTime = seekTo;
              afterSeek();
            }, { once: true });
          }
        };
        setTimeout(trySeek, 500);
      }
    }
  }

  function setDirty() {
    dirty = true;
    showSyncing();
    clearTimeout(syncTimer);
    syncTimer = setTimeout(() => { if (dirty) { saveState(); dirty = false; } }, 2500);
  }

  function showSyncing() { setIndicatorState('syncing'); }
  function showSynced()  { setIndicatorState('synced');  setTimeout(() => setIndicatorState(''), 2000); }
  function showError()   { setIndicatorState('error');  }

  function setIndicatorState(state) {
    if (!indicator) indicator = document.getElementById('cloudSyncIndicator');
    if (!indicator) return;
    indicator.classList.remove('syncing', 'synced', 'error');
    if (state) indicator.classList.add(state);
    const txt = indicator.querySelector('.sync-text');
    if (txt) {
      txt.textContent = state === 'syncing' ? 'Guardando…' : state === 'synced' ? 'Guardado' : state === 'error' ? 'Error' : '';
    }
  }

  function setupChannel() {
    if (!('BroadcastChannel' in window)) return;
    try {
      syncChannel = new BroadcastChannel('droply_cloud_sync');
      syncChannel.onmessage = e => {
        const { type, state } = e.data || {};
        if (type !== 'STATE_UPDATE' || !state) return;
        // Sync playlists, liked from other tab
        if (state.playlists && typeof playlists !== 'undefined') {
          playlists.length = 0;
          playlists.push(...state.playlists);
          if (typeof savePlaylists === 'function') savePlaylists();
        }
        if (state.liked && typeof likedTracks !== 'undefined') {
          likedTracks.clear();
          state.liked.forEach(f => likedTracks.add(f));
          if (typeof saveLiked === 'function') saveLiked();
        }
      };
    } catch(_) {}
  }

  /* ─── Hook into existing audio events ────────── */
  function hookPlayerEvents() {
    const audio = typeof audioEl !== 'undefined' ? audioEl : null;
    if (!audio) return;

    // Save state on meaningful events
    audio.addEventListener('play',     setDirty, { passive: true });
    audio.addEventListener('pause',    setDirty, { passive: true });
    audio.addEventListener('seeked',   setDirty, { passive: true });
    audio.addEventListener('ended',    setDirty, { passive: true });

    // Throttled timeupdate save (every 10s)
    let lastTimeSave = 0;
    audio.addEventListener('timeupdate', () => {
      const now = Date.now();
      if (now - lastTimeSave > 10000) {
        lastTimeSave = now;
        setDirty();
      }
    }, { passive: true });
  }

  return {
    init() {
      setupChannel();
      hookPlayerEvents();
      // Restore after a small delay (player must be ready)
      setTimeout(restoreLastSession, 800);
    },
    markDirty: setDirty,
    save: saveState,
  };
})();


/* ══════════════════════════════════════════════════════
   MÓDULO 5 — SERVICE WORKER (PWA offline)
══════════════════════════════════════════════════════ */
function registerServiceWorker() {
  // El SW ya está registrado en index.html con /sw.js
  // Esta función solo verifica que está activo y no hace nada más
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.ready.then(reg => {
    console.info('[DROPLY Premium] SW activo:', reg.scope);
  }).catch(() => {});
}


/* ══════════════════════════════════════════════════════
   DOM INJECTION — Inyectar elementos HTML en la página
══════════════════════════════════════════════════════ */
function injectPremiumDOM() {

  /* ── Offline status badge ─────────────────────── */
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="offline-badge" id="offlineStatusBadge">
      <span class="badge-dot"></span>
      <span class="badge-text">Sin conexión — modo offline</span>
    </div>`);

  /* ── Transfer panel (removed) ─────────────────── */

  /* ── Cloud sync indicator (Removed from topbar) ── */

  /* ── Transfer button in now-playing sheet ─────── */
  const sheetVolumeWrap = document.querySelector('.sheet-volume-wrap');
  if (sheetVolumeWrap) {
    sheetVolumeWrap.insertAdjacentHTML('afterend', `
      <div class="sheet-extra-row">
        <button class="sheet-transfer-btn" id="sheetTransferBtn">
          <svg viewBox="0 0 24 24" width="15" height="15"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m13 0h-3a2 2 0 0 0-2 2v3"/><circle cx="12" cy="12" r="3"/></svg>
          Transferir a otro dispositivo
        </button>
      </div>`);
  }

}



/* ══════════════════════════════════════════════════════
   PATCH EXISTING FUNCTIONS — Extender sin modificar
══════════════════════════════════════════════════════ */
function patchExistingFunctions() {

  /* ── Patch loadTrack — car mode sync removed; just cloud sync ── */
  const origLoadTrack = typeof loadTrack === 'function' ? loadTrack : null;
  if (origLoadTrack) {
    window.loadTrack = function(item, fromQueue, newPlaylistContext, options) {
      origLoadTrack.call(this, item, fromQueue, newPlaylistContext, options);
    };
  }

  /* ── Patch togglePlay, playNext, playPrev to sync cloud ── */
  ['togglePlay', 'playNext', 'playPrev'].forEach(fn => {
    const orig = typeof window[fn] === 'function' ? window[fn] : null;
    if (!orig) return;
    window[fn] = function(...args) {
      const result = orig.apply(this, args);
      setTimeout(() => { CloudSync.markDirty(); }, 100);
      return result;
    };
  });
}


/* ══════════════════════════════════════════════════════
   EVENT LISTENERS — Downloads
══════════════════════════════════════════════════════ */
function setupPremiumEvents() {

  /* ── Transfer panel (removed) ─────────────────────── */

  /* ── Downloads / offline page ──────────────────── */
  document.getElementById('offlineClearAllBtn')?.addEventListener('click', async () => {
    if (!confirm('¿Eliminar todas las descargas?')) return;
    // Clear IDB — reopen page
    try {
      indexedDB.deleteDatabase('droply_offline_v1');
      location.reload();
    } catch(e) {
      if (typeof showToast === 'function') showToast('Error al liberar espacio', 'error');
    }
  });

}


/* ══════════════════════════════════════════════════════
   OFFLINE PLAYLIST — Render downloaded tracks as playable list
══════════════════════════════════════════════════════ */
function renderOfflinePlaylist() {
  const container = document.getElementById('offlineTrackList');
  const countEl   = document.getElementById('offlinePlaylistCount');
  if (!container) return;

  // Get all tracks from the global media array that are downloaded
  const allTracks = typeof media !== 'undefined' ? media : [];
  const downloaded = allTracks.filter(t => OfflineManager.isDownloaded(t.file));

  if (countEl) countEl.textContent = downloaded.length === 1
    ? '1 canción'
    : `${downloaded.length} canciones`;

  // Show / hide play-all & shuffle buttons
  const playAllBtn    = document.getElementById('offlinePlayAllBtn');
  const shuffleBtn    = document.getElementById('offlineShuffleBtn');
  const hasTracks     = downloaded.length > 0;
  if (playAllBtn)  playAllBtn.style.display  = hasTracks ? '' : 'none';
  if (shuffleBtn)  shuffleBtn.style.display  = hasTracks ? '' : 'none';

  if (downloaded.length === 0) {
    container.innerHTML = `
      <div class="offline-empty-playlist">
        <strong>Sin canciones guardadas</strong>
        <p>Descarga canciones pulsando el botón
          <svg viewBox="0 0 24 24" width="13" height="13" style="display:inline;vertical-align:middle">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          en cualquier canción para escucharlas sin conexión.</p>
      </div>`;
    return;
  }

  const currentFile = playlist[currentTrackIdx]?.file;

  container.innerHTML = downloaded.map((track, i) => {
    const trackPlaying = track.file === currentFile && isPlaying;
    return `
      <div class="offline-track-row${trackPlaying ? ' playing' : ''}"
           data-file="${track.file}" data-index="${i}" role="button" tabindex="0"
           aria-label="Reproducir ${track.title}">
        <span class="offline-track-num">${trackPlaying
          ? `<svg viewBox="0 0 24 24" width="12" height="12" style="color:var(--accent)"><polygon points="5,3 19,12 5,21" fill="currentColor" stroke="none"/></svg>`
          : i + 1}</span>
        <div class="offline-track-thumb">
          <img src="${track.cover}" alt="" loading="lazy" />
          <div class="offline-now-playing-eq">
            <div class="offline-eq-bars">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
        <div class="offline-track-info">
          <div class="offline-track-title">${track.title}</div>
          <div class="offline-track-artist">${track.artist}</div>
        </div>
        <div class="offline-track-meta">
          <span class="offline-track-dur">${track.duration || ''}</span>
          <button class="offline-track-delete-btn" data-file="${track.file}" title="Eliminar descarga" aria-label="Eliminar descarga">
            <svg viewBox="0 0 24 24" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </div>
      </div>`;
  }).join('');

  // Click on a track to play it (using offline src if possible)
  container.querySelectorAll('.offline-track-row').forEach((row, i) => {
    const play = async () => {
      const track = downloaded[i];
      if (!track) return;
      const offlineQueue = [...downloaded.slice(i), ...downloaded.slice(0, i)];
      if (typeof loadTrack === 'function') {
        loadTrack(track, false, offlineQueue);
      }
      setTimeout(() => renderOfflinePlaylist(), 300);
    };
    row.addEventListener('click', e => {
      if (e.target.closest('.offline-track-delete-btn')) return;
      play();
    });
    row.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } });

    // Delete button
    const delBtn = row.querySelector('.offline-track-delete-btn');
    if (delBtn) {
      delBtn.addEventListener('click', async e => {
        e.stopPropagation();
        const file = delBtn.dataset.file;
        await OfflineManager.deleteDownload(file);
        // renderOfflinePlaylist is called inside deleteDownload already
      });
    }
  });

  // Play all button
  if (playAllBtn) {
    playAllBtn.onclick = () => {
      if (downloaded.length === 0) return;
      if (typeof loadTrack === 'function') {
        loadTrack(downloaded[0], false, [...downloaded]);
      }
      setTimeout(() => renderOfflinePlaylist(), 300);
    };
  }

  // Shuffle button
  if (shuffleBtn) {
    shuffleBtn.onclick = () => {
      if (downloaded.length === 0) return;
      const shuffled = shuffleArray([...downloaded]);
      shuffleMode = true;
      if (sheetShuffle) sheetShuffle.classList.add('active');
      if (typeof loadTrack === 'function') {
        loadTrack(shuffled[0], false, shuffled);
      }
      showToast('Aleatorio activado', 'success');
      setTimeout(() => renderOfflinePlaylist(), 300);
    };
  }
}

function updateOfflineStatusBanner() {
  const banner = document.getElementById('offlineStatusBanner');
  const text   = document.getElementById('offlineStatusText');
  if (!banner || !text) return;
  if (navigator.onLine) {
    banner.classList.add('is-online');
    text.textContent = 'Conectado — escucha también sin internet';
  } else {
    banner.classList.remove('is-online');
    text.textContent = 'Sin conexión — reproduciendo desde caché local';
  }
}

// Auto-refresh offline playlist when downloads page is shown
(function watchOfflinePage() {
  // Also re-render when connectivity changes
  window.addEventListener('online',  () => { updateOfflineStatusBanner(); renderOfflinePlaylist(); });
  window.addEventListener('offline', () => { updateOfflineStatusBanner(); renderOfflinePlaylist(); });
})();


/* ══════════════════════════════════════════════════════
   EVENTOS MANAGER — Sistema dinámico de eventos en vivo
   Gestiona todo desde el array `events` en script.js
══════════════════════════════════════════════════════ */
const EventosManager = (() => {

  /* ── State ─────────────────────────────── */
  let evFilter      = "all";
  let evSearch      = "";
  let evSavedEvents = new Set(JSON.parse(localStorage.getItem("droply_saved_events") || "[]"));
  let countdownTimers = [];
  let rendered      = false;

  /* ── Save state ────────────────────────── */
  function saveSaved() {
    try { localStorage.setItem("droply_saved_events", JSON.stringify([...evSavedEvents])); } catch(_) {}
  }
  function isSaved(ev) { return evSavedEvents.has(ev.title + ev.date); }
  function toggleSaved(ev) {
    const key = ev.title + ev.date;
    if (evSavedEvents.has(key)) { evSavedEvents.delete(key); showToast("Evento eliminado de guardados", "default"); }
    else                        { evSavedEvents.add(key);    showToast("Evento guardado ✓", "success"); }
    saveSaved();
    // Update bookmark icons in DOM without full re-render
    document.querySelectorAll(`[data-evkey="${CSS.escape(key)}"] .ev-card-save`).forEach(btn => {
      btn.classList.toggle("saved", evSavedEvents.has(key));
      btn.setAttribute("aria-label", evSavedEvents.has(key) ? "Quitar guardado" : "Guardar evento");
    });
  }

  /* ── Helpers ───────────────────────────── */
  function sortedEvents() {
    if (!Array.isArray(events) || events.length === 0) return [];
    return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  function filteredEvents() {
    const q = evSearch.toLowerCase().trim();
    return sortedEvents().filter(ev => {
      const matchFilter =
        evFilter === "all"          ? true :
        evFilter.startsWith("c:")   ? ev.city.toLowerCase()  === evFilter.slice(2) :
        evFilter.startsWith("g:")   ? ev.genre.toLowerCase() === evFilter.slice(2) :
        evFilter === "featured"     ? ev.featured :
        evFilter === "saved"        ? isSaved(ev) : true;
      const matchSearch = q === "" || [ev.title, ev.artist, ev.city, ev.venue, ev.genre].some(s => s.toLowerCase().includes(q));
      return matchFilter && matchSearch;
    });
  }

  function isPast(ev) {
    return new Date(ev.date + "T" + ev.time) < new Date();
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr + "T00:00:00");
    const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
    const days   = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  function formatCountdown(dateStr, timeStr) {
    const target = new Date(dateStr + "T" + timeStr);
    const now    = new Date();
    const diff   = target - now;
    if (diff <= 0) return { text: "Hoy", urgent: true };
    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    if (days > 0)  return { text: `${days}d ${hours}h`, urgent: days < 7 };
    if (hours > 0) return { text: `${hours}h ${mins}m`, urgent: true };
    return { text: `${mins}m`, urgent: true };
  }

  function getCities()  { return [...new Set(events.map(e => e.city))].sort(); }
  function getGenres()  { return [...new Set(events.map(e => e.genre))].sort(); }

  /* ── Start countdown intervals ─────────── */
  function startCountdowns() {
    countdownTimers.forEach(clearInterval);
    countdownTimers = [];
    document.querySelectorAll(".ev-countdown[data-date]").forEach(el => {
      const dateStr = el.dataset.date;
      const timeStr = el.dataset.time || "00:00";
      const update = () => {
        const cd = formatCountdown(dateStr, timeStr);
        el.textContent = cd.text;
        el.classList.toggle("urgent", cd.urgent);
      };
      update();
      countdownTimers.push(setInterval(update, 30000));
    });
  }

  /* ── Build filter pills ────────────────── */
  function buildFilters() {
    const bar = document.getElementById("evDynamicPills");
    if (!bar) return;
    const pills = [];

    // Featured pill
    if (events.some(e => e.featured)) {
      pills.push({ label: "⚡ Destacados", val: "featured" });
    }
    // Saved pill
    pills.push({ label: "🔖 Guardados", val: "saved" });
    // Separator cities
    getCities().forEach(c  => pills.push({ label: `📍 ${c}`,  val: `c:${c.toLowerCase()}`  }));
    // Separator genres
    getGenres().forEach(g  => pills.push({ label: g,          val: `g:${g.toLowerCase()}`   }));

    bar.innerHTML = pills.map(p =>
      `<button class="ev-filter-pill${evFilter === p.val ? " active" : ""}" data-evfilter="${p.val}">${p.label}</button>`
    ).join("");

    document.querySelectorAll(".ev-filter-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        evFilter = btn.dataset.evfilter;
        document.querySelectorAll(".ev-filter-pill").forEach(x => x.classList.remove("active"));
        btn.classList.add("active");
        renderContent();
      });
    });
  }

  /* ── Card HTML ─────────────────────────── */
  function cardHTML(ev, size = "normal") {
    const past    = isPast(ev);
    const saved   = isSaved(ev);
    const cd      = formatCountdown(ev.date, ev.time);
    const dateStr = formatDate(ev.date);
    const key     = ev.title + ev.date;
    const imgSrc  = ev.image || ev.banner || "";

    if (size === "featured") {
      return `
        <div class="ev-featured-card ${past ? "ev-past" : ""}" data-evkey="${key}">
          <div class="ev-fc-banner">
            <img class="ev-fc-img" src="${imgSrc}" alt="${ev.artist}" loading="lazy" />
            <div class="ev-fc-overlay"></div>
            ${ev.featured ? '<span class="ev-featured-badge">DESTACADO</span>' : ""}
            ${past ? '<span class="ev-past-badge">FINALIZADO</span>' : ""}
            <div class="ev-fc-bottom">
              <div class="ev-fc-countdown-wrap">
                <span class="ev-countdown-label">Faltan</span>
                <span class="ev-countdown ${cd.urgent ? "urgent" : ""}" data-date="${ev.date}" data-time="${ev.time}">${cd.text}</span>
              </div>
            </div>
          </div>
          <div class="ev-fc-info">
            <div class="ev-fc-meta-row">
              <span class="ev-genre-pill">${ev.genre}</span>
              <span class="ev-city-tag">📍 ${ev.city}</span>
            </div>
            <h3 class="ev-fc-title">${ev.title}</h3>
            <p class="ev-fc-artist">${ev.artist}</p>
            <div class="ev-fc-details">
              <div class="ev-detail-item">
                <svg viewBox="0 0 24 24" width="13" height="13"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                ${dateStr}
              </div>
              <div class="ev-detail-item">
                <svg viewBox="0 0 24 24" width="13" height="13"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ${ev.time}
              </div>
              <div class="ev-detail-item">
                <svg viewBox="0 0 24 24" width="13" height="13"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                ${ev.venue}
              </div>
            </div>
            <p class="ev-fc-desc">${ev.description}</p>
            <div class="ev-fc-actions">
              <a class="ev-btn-buy ${past ? "ev-btn-disabled" : ""}" href="${ev.tickets}" target="_blank" rel="noopener" ${past ? 'aria-disabled="true"' : ""}>
                <svg viewBox="0 0 24 24" width="14" height="14"><path d="M2 9a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2a2 2 0 0 0 0 4v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a2 2 0 0 0 0-4V9z"/></svg>
                ${past ? "Finalizado" : `Comprar — ${ev.price}`}
              </a>
              <button class="ev-card-btn ev-card-share" data-title="${ev.title}" data-artist="${ev.artist}" data-city="${ev.city}" data-date="${dateStr}" aria-label="Compartir">
                <svg viewBox="0 0 24 24" width="16" height="16"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              </button>
              <button class="ev-card-btn ev-card-save ${saved ? "saved" : ""}" data-evkey="${key}" data-evindex="${events.indexOf(ev)}" aria-label="${saved ? "Quitar guardado" : "Guardar evento"}">
                <svg viewBox="0 0 24 24" width="16" height="16"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              </button>
            </div>
          </div>
        </div>`;
    }

    // Normal card (compact scroll card)
    return `
      <div class="ev-card ${past ? "ev-past" : ""}" data-evkey="${key}">
        <div class="ev-card-img-wrap">
          <img class="ev-card-img" src="${imgSrc}" alt="${ev.artist}" loading="lazy" />
          <div class="ev-card-img-overlay"></div>
          ${ev.featured ? '<span class="ev-featured-badge ev-featured-sm">★</span>' : ""}
          <span class="ev-card-genre">${ev.genre}</span>
          <div class="ev-card-countdown-badge">
            <span class="ev-countdown ${cd.urgent ? "urgent" : ""}" data-date="${ev.date}" data-time="${ev.time}">${cd.text}</span>
          </div>
        </div>
        <div class="ev-card-body">
          <p class="ev-card-artist">${ev.artist}</p>
          <h3 class="ev-card-title">${ev.title}</h3>
          <div class="ev-card-meta">
            <span class="ev-card-date">${dateStr}</span>
            <span class="ev-card-dot">·</span>
            <span class="ev-card-city">📍 ${ev.city}</span>
          </div>
          <div class="ev-card-venue">${ev.venue} · ${ev.time}</div>
          <div class="ev-card-footer">
            <span class="ev-card-price">${ev.price}</span>
            <div class="ev-card-actions">
              <button class="ev-card-btn ev-card-share" data-title="${ev.title}" data-artist="${ev.artist}" data-city="${ev.city}" data-date="${dateStr}" aria-label="Compartir">
                <svg viewBox="0 0 24 24" width="14" height="14"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              </button>
              <button class="ev-card-btn ev-card-save ${saved ? "saved" : ""}" data-evkey="${key}" data-evindex="${events.indexOf(ev)}" aria-label="${saved ? "Quitar guardado" : "Guardar evento"}">
                <svg viewBox="0 0 24 24" width="14" height="14"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              </button>
              <a class="ev-card-buy ${past ? "ev-btn-disabled" : ""}" href="${ev.tickets}" target="_blank" rel="noopener" ${past ? 'aria-disabled="true"' : ""}>
                ${past ? "Agotado" : "Entradas"}
              </a>
            </div>
          </div>
        </div>
      </div>`;
  }

  /* ── Attach card events ─────────────────── */
  function attachCardEvents(container) {
    container.querySelectorAll(".ev-card-save").forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        const idx = parseInt(btn.dataset.evindex);
        if (!isNaN(idx) && events[idx]) toggleSaved(events[idx]);
      });
    });
    container.querySelectorAll(".ev-card-share").forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        const text = `🎤 ${btn.dataset.title} — ${btn.dataset.artist}\n📍 ${btn.dataset.city} · ${btn.dataset.date}`;
        if (navigator.share) {
          navigator.share({ title: btn.dataset.title, text }).catch(() => {});
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => showToast("Evento copiado al portapapeles", "success"));
        } else {
          showToast("Compartir no disponible en este dispositivo", "default");
        }
      });
    });
    // Click en tarjeta para abrir modal
    container.querySelectorAll(".ev-card, .ev-featured-card").forEach(card => {
      card.addEventListener("click", e => {
        if (e.target.closest(".ev-card-btn") || e.target.closest(".ev-card-buy") || e.target.closest(".ev-fc-actions")) return;
        const evKey = card.dataset.evkey;
        const ev = sortedEvents().find(e => (e.title + e.date) === evKey);
        if (ev) showEventoModal(ev);
      });
    });
  }

  /* ── Show Evento Modal ──────────────────– */
  function showEventoModal(ev) {
    const modal = document.getElementById("eventoDetailModal");
    if (!modal) return;
    
    // Elementos del modal
    const els = {
      img:    document.getElementById("eventoDetailImg"),
      title:  document.getElementById("eventoDetailTitle"),
      artist: document.getElementById("eventoDetailArtist"),
      genre:  document.getElementById("eventoDetailGenre"),
      city:   document.getElementById("eventoDetailCity"),
      desc:   document.getElementById("eventoDetailDesc"),
      date:   document.getElementById("eventoDetailDate"),
      time:   document.getElementById("eventoDetailTime"),
      venue:  document.getElementById("eventoDetailVenue"),
      price:  document.getElementById("eventoDetailPrice"),
      buy:    document.getElementById("eventoDetailBuyLink"),
      share:  document.getElementById("eventoDetailShare")
    };
    
    // Validar elementos críticos
    if (!els.title) return;
    
    // Rellenar datos
    if (els.img) {
      els.img.src = ev.image || ev.banner || "";
      els.img.alt = ev.artist;
    }
    els.title.textContent = ev.title;
    if (els.artist) els.artist.textContent = ev.artist;
    if (els.genre) els.genre.textContent = ev.genre;
    if (els.city) els.city.textContent = "📍 " + ev.city;
    if (els.desc) els.desc.textContent = ev.description;
    if (els.date) els.date.textContent = formatDate(ev.date);
    if (els.time) els.time.textContent = ev.time;
    if (els.venue) els.venue.textContent = ev.venue;
    if (els.price) els.price.textContent = ev.price;
    if (els.buy) els.buy.href = ev.tickets;
    
    // Evento para compartir
    if (els.share) {
      els.share.onclick = (e) => {
        e.preventDefault();
        const text = `🎤 ${ev.title} — ${ev.artist}\n📍 ${ev.city} · ${formatDate(ev.date)}\n⏰ ${ev.time}`;
        if (navigator.share) {
          navigator.share({ title: ev.title, text }).catch(() => {});
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => showToast("Evento copiado al portapapeles", "success"));
        }
      };
    }
    
    // Abrir modal
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  /* ── Close Evento Modal ────────────────– */
  function closeEventoModal() {
    const modal = document.getElementById("eventoDetailModal");
    if (modal) {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  /* ── Init Evento Modal ─────────────────– */
  function initEventoModal() {
    const modal = document.getElementById("eventoDetailModal");
    const closeBtn = document.getElementById("eventoDetailClose");
    
    if (!modal || !closeBtn) return;
    
    // Cerrar con botón X
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeEventoModal();
    });
    
    // Cerrar al hacer click en el fondo del modal
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeEventoModal();
      }
    });
    
    // Cerrar con ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) {
        closeEventoModal();
      }
    });
  }

  /* ── Main render ────────────────────────── */
  function renderContent() {
    const skeleton        = document.getElementById("evSkeleton");
    const featSection     = document.getElementById("evFeaturedSection");
    const featList        = document.getElementById("evFeaturedList");
    const nearSection     = document.getElementById("evNearSection");
    const nearList        = document.getElementById("evNearList");
    const nearCity        = document.getElementById("evNearCity");
    const soonSection     = document.getElementById("evSoonSection");
    const soonList        = document.getElementById("evSoonList");
    const allSection      = document.getElementById("evAllSection");
    const allList         = document.getElementById("evAllList");
    const allTitle        = document.getElementById("evAllTitle");
    const countBadgeEl    = document.getElementById("evCountBadge");
    const emptyState      = document.getElementById("evEmpty");

    if (!featSection) return;

    // Hide skeleton
    if (skeleton) skeleton.style.display = "none";

    const filtered  = filteredEvents();
    const isDefault = (evFilter === "all" && evSearch === "");

    // Reset all sections
    [featSection, nearSection, soonSection, allSection, emptyState].forEach(el => el.style.display = "none");

    if (filtered.length === 0) {
      emptyState.style.display = "";
      return;
    }

    if (isDefault) {
      // DEFAULT VIEW: 3 sections
      const featured = sortedEvents().filter(e => e.featured && !isPast(e));
      if (featured.length > 0) {
        featList.innerHTML = featured.map(e => cardHTML(e, "featured")).join("");
        attachCardEvents(featList);
        featSection.style.display = "";
      }

      // Near: use Barcelona as default city (España)
      const nearCityName = "Barcelona";
      const nearEvs = sortedEvents().filter(e => e.city === nearCityName && !isPast(e)).slice(0, 6);
      if (nearEvs.length > 0) {
        if (nearCity) nearCity.textContent = nearCityName;
        nearList.innerHTML = nearEvs.map(e => cardHTML(e, "normal")).join("");
        attachCardEvents(nearList);
        nearSection.style.display = "";
      }

      // Soon: next 4 non-featured upcoming
      const soon = sortedEvents().filter(e => !isPast(e) && !e.featured).slice(0, 4);
      if (soon.length > 0) {
        soonList.innerHTML = soon.map(e => cardHTML(e, "normal")).join("");
        attachCardEvents(soonList);
        soonSection.style.display = "";
      }

    } else {
      // FILTERED VIEW: show all
      const label = evFilter === "saved" ? "Guardados" : evFilter === "featured" ? "Destacados" : "Resultados";
      if (allTitle) allTitle.textContent = label;
      if (countBadgeEl) countBadgeEl.textContent = `${filtered.length} evento${filtered.length !== 1 ? "s" : ""}`;
      allList.innerHTML = filtered.map(e => cardHTML(e, "normal")).join("");
      attachCardEvents(allList);
      allSection.style.display = "";
    }

    // Restart countdown timers
    requestAnimationFrame(() => startCountdowns());
  }

  /* ── Public render (with skeleton on first load) ── */
  function render() {
    if (!rendered) {
      rendered = true;
      const skeleton = document.getElementById("evSkeleton");
      if (skeleton) skeleton.style.display = "";
      buildFilters();
      setTimeout(renderContent, 380);
    } else {
      renderContent();
    }
  }

  /* ── Search logic ─────────────────────── */
  function initSearch() {
    const input = document.getElementById("evSearchInput");
    const clear = document.getElementById("evSearchClear");
    if (!input) return;
    input.addEventListener("input", () => {
      evSearch = input.value;
      clear.style.display = evSearch ? "" : "none";
      if (evSearch) { evFilter = "all"; document.querySelectorAll(".ev-filter-pill").forEach(x => x.classList.remove("active")); document.querySelector(".ev-filter-pill[data-evfilter='all']")?.classList.add("active"); }
      renderContent();
    });
    clear.addEventListener("click", () => { input.value = ""; evSearch = ""; clear.style.display = "none"; renderContent(); input.focus(); });
  }

  /* ── Init ─────────────────────────────── */
  function init() {
    initSearch();
    initEventoModal();
  }

  return { render, init };
})();


function bootPremium() {
  injectPremiumDOM();
  patchExistingFunctions();
  setupPremiumEvents();

  // Init modules
  OfflineManager.init();
  OfflineManager.setupOfflineDetection();
  CloudSync.init();
  if (typeof SupabaseCloud !== "undefined" && typeof SupabaseCloud.init === "function") {
    SupabaseCloud.init();
  }

  // Render offline playlist (after IDB is ready, slight delay)
  setTimeout(() => { updateOfflineStatusBanner(); }, 400);

  // Ensure bottom nav slider recalculates after premium DOM (offline tab) is injected
  setTimeout(() => { try { if (typeof updateBottomNavSlider === 'function') updateBottomNavSlider(); } catch(_){} }, 500);

  // Register SW
  registerServiceWorker();

  console.info('[DROPLY Premium] ✓ Módulos cargados: Offline · Modo Coche · Cloud Sync · Supabase Cloud');
}

// Boot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootPremium);
} else {
  // Small delay to ensure script.js has finished its init()
  setTimeout(bootPremium, 0);
}

/* ═══════════════════════════════════════════════════════════
   DROPLY — MIXES
   Colecciones curadas fijas. Para añadir canciones a un mix,
   edita el array `tracks` de cada mix con objetos del array `media`.
   
   ┌─────────────────────────────────────────────────────────┐
   │  Cómo añadir canciones a un mix:                        │
   │  Copia el objeto del track desde media[] y pégalo       │
   │  en el array tracks[] del mix correspondiente.          │
   └─────────────────────────────────────────────────────────┘
═══════════════════════════════════════════════════════════ */
















const MIXES = [
  {
    id: "reggaeton",
    name: "Album Los Diozes",
    cover: "https://images.genius.com/cf49bfced9c8501f41d1ebf2127e8c9b.1000x1000x1.png",
    tracks: [
    


             {
    type:     "music",
    title:    "KIÉN E?",
    artist:   "LOS DIOZES",
    cover:    "https://i.scdn.co/image/ab67616d00001e029583673af04af6d27def8a9c",
    file:     "./Music/quiene.mp3",
    category: "Trap",
    duration: "3:41"
  },
              {
    type:     "music",
    title:    "PAYAS",
    artist:   "LOS DIOZES",
    cover:    "https://i.scdn.co/image/ab67616d00001e029583673af04af6d27def8a9c",
    file:     "./Music/payas.mp3",
    category: "Trap",
    duration: "4:35"
  },
              {
    type:     "music",
    title:    "MARDOSA",
    artist:   "LOS DIOZES",
    cover:    "https://i.scdn.co/image/ab67616d00001e029583673af04af6d27def8a9c",
    file:     "./Music/mardosa.mp3",
    category: "Trap",
    duration: "2:09"
  },
              {
    type:     "music",
    title:    "KIKE Y WANILLO",
    artist:   "LOS DIOZES",
    cover:    "https://i.scdn.co/image/ab67616d00001e029583673af04af6d27def8a9c",
    file:     "./Music/kikeywanillo.mp3",
    category: "Trap",
    duration: "2:25"
  },
              {
    type:     "music",
    title:    "FELA",
    artist:   "LOS DIOZES",
    cover:    "https://i.scdn.co/image/ab67616d00001e029583673af04af6d27def8a9c",
    file:     "./Music/fela.mp3",
    category: "Trap",
    duration: "2:18"
  },
              {
    type:     "music",
    title:    "POR ALGO SERÁ",
    artist:   "LOS DIOZES",
    cover:    "https://i.scdn.co/image/ab67616d00001e029583673af04af6d27def8a9c",
    file:     "./Music/poralgosera.mp3",
    category: "Trap",
    duration: "2:39"
  },
              {
    type:     "music",
    title:    "MALDITA FARLOPA",
    artist:   "LOS DIOZES",
    cover:    "https://i.scdn.co/image/ab67616d00001e029583673af04af6d27def8a9c",
    file:     "./Music/malafarlopa.mp3",
    category: "Trap",
    duration: "2:58"
  },
    ]
  },




























  {
    id: "dtmf-album",
    name: "Album DtMF ",
    cover: "https://upload.wikimedia.org/wikipedia/en/e/ef/Bad_Bunny_-_Deb%C3%AD_Tirar_M%C3%A1s_Fotos.png",
    tracks: [
             {
    type:     "music",
    title:    "NUEVAYoL",
    artist:   "Bad Bunny",
    cover:    "https://upload.wikimedia.org/wikipedia/en/e/ef/Bad_Bunny_-_Deb%C3%AD_Tirar_M%C3%A1s_Fotos.png",
    file:     "./Music/nuevayol.mp3",
    category: "Reggaeton",
    duration: "3:43"
  },
             {
    type:     "music",
    title:    "VOY A LLeVARTE PA PR",
    artist:   "Bad Bunny",
    cover:    "https://upload.wikimedia.org/wikipedia/en/e/ef/Bad_Bunny_-_Deb%C3%AD_Tirar_M%C3%A1s_Fotos.png",
    file:     "./Music/voyallvartepapr.mp3",
    category: "Reggaeton",
    duration: "2:36"
  },
             {
    type:     "music",
    title:    "EoO",
    artist:   "Bad Bunny",
    cover:    "https://upload.wikimedia.org/wikipedia/en/e/ef/Bad_Bunny_-_Deb%C3%AD_Tirar_M%C3%A1s_Fotos.png",
    file:     "./Music/eoo.mp3",
    category: "Reggaeton",
    duration: "3:25"
  },
             {
    type:     "music",
    title:    "VeLDÁ",
    artist:   "Bad Bunny, Omar Courtz, Dei V",
    cover:    "https://upload.wikimedia.org/wikipedia/en/e/ef/Bad_Bunny_-_Deb%C3%AD_Tirar_M%C3%A1s_Fotos.png",
    file:     "./Music/velda.mp3",
    category: "Reggaeton",
    duration: "3:55"
  },
             {
    type:     "music",
    title:    "CAFé CON RON",
    artist:   "Bad Bunny, Omar Courtz, Dei V",
    cover:    "https://upload.wikimedia.org/wikipedia/en/e/ef/Bad_Bunny_-_Deb%C3%AD_Tirar_M%C3%A1s_Fotos.png",
    file:     "./Music/cafecron.mp3",
    category: "Reggaeton",
    duration: "3:48"
  },
    ]
  },























];

































/* ═══════════════════════════════════════════════════════════
   MixesManager — lógica interna (no tocar)
═══════════════════════════════════════════════════════════ */
const MixesManager = (function() {

  /* Placeholder SVG con gradiente si no hay portada */
  function _placeholder(name) {
    const palettes = [
      ["#8b5cf6","#6366f1"],["#ec4899","#8b5cf6"],["#3b82f6","#8b5cf6"],
      ["#f59e0b","#ef4444"],["#10b981","#3b82f6"],["#7c3aed","#ec4899"],
      ["#06b6d4","#6366f1"],
    ];
    const i = name.split("").reduce((a,c)=>a+c.charCodeAt(0),0) % palettes.length;
    const [c1,c2] = palettes[i];
    const initials = name.replace(/Mix$/i,"").trim().slice(0,2).toUpperCase();
    return `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
        <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
        </linearGradient></defs>
        <rect width="200" height="200" fill="url(#g)" rx="0"/>
        <text x="100" y="118" font-family="system-ui,sans-serif" font-size="62"
          font-weight="700" fill="rgba(255,255,255,.92)" text-anchor="middle">${initials}</text>
      </svg>`
    )}`;
  }

  /* Calcular duración total legible */
  function _duration(tracks) {
    let s = 0;
    tracks.forEach(t => {
      if (!t.duration) return;
      const p = String(t.duration).split(":").map(Number);
      s += p.length===2 ? p[0]*60+p[1] : p[0];
    });
    const m = Math.floor(s/60);
    return m < 60 ? `${m} min` : `${Math.floor(m/60)}h ${m%60}min`;
  }

  /* Sólo mostrar mixes que tengan al menos 1 track */
  function _visible() {
    return MIXES.filter(m => m.tracks && m.tracks.length > 0);
  }

  /* ── Tarjeta para el grid de pageMixes ── */
  function _makeCard(mix) {
    const fb  = _placeholder(mix.name);
    const src = mix.cover || fb;
    const dur = _duration(mix.tracks);

    const card = document.createElement("div");
    card.className = "mix-card";

    card.innerHTML = `
      <div class="mix-card-cover">
        <img src="${src}" alt="${mix.name}" onerror="this.src='${fb}'" loading="lazy"/>
        <div class="mix-card-overlay"></div>
        <span class="mix-card-badge">MIX</span>
        <button class="mix-card-play" aria-label="Reproducir">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="none">
            <polygon points="5,3 19,12 5,21"/>
          </svg>
        </button>
      </div>
      <div class="mix-card-name">${mix.name}</div>
      <div class="mix-card-meta">${mix.tracks.length} canciones · ${dur}</div>
    `;

    card.querySelector(".mix-card-play").addEventListener("click", e => {
      e.stopPropagation();
      _play(mix, false);
    });
    card.addEventListener("click", () => openMixDetail(mix));
    return card;
  }

  /* ── Tarjeta compacta para el home ── */
  function _makeHomeCard(mix) {
    const fb  = _placeholder(mix.name);
    const src = mix.cover || fb;

    const card = document.createElement("div");
    card.className = "home-pl-card mix-home-card";

    card.innerHTML = `
      <div class="home-pl-cover-wrap" style="position:relative">
        <img class="home-pl-cover" src="${src}" alt="${mix.name}" onerror="this.src='${fb}'" loading="lazy"/>
        <span class="mix-home-badge">MIX</span>
      </div>
      <div class="home-pl-name">${mix.name}</div>
      <div class="home-pl-count">${mix.tracks.length} canciones</div>
    `;
    card.addEventListener("click", () => openMixDetail(mix));
    return card;
  }

  /* ── Reproducir mix (con shuffle opcional) ── */
  function _play(mix, shuffle) {
    if (!mix.tracks.length) return;
    let list = [...mix.tracks];
    if (shuffle) list = list.sort(()=>Math.random()-.5);
    if (typeof loadTrack === "function") loadTrack(list[0], false, list);
  }

  /* ── Abrir detalle ── */
  function openMixDetail(mix) {
    const modal = document.getElementById("mixDetailModal");
    if (!modal) return;

    const fb  = _placeholder(mix.name);
    const src = mix.cover || fb;
    const dur = _duration(mix.tracks);

    // Blurred BG
    const bg = document.getElementById("mixDetailBg");
    if (bg) bg.style.backgroundImage = `url('${src}')`;

    // Top title
    document.getElementById("mixDetailTopTitle").textContent = mix.name;

    // Cover
    const coverEl = document.getElementById("mixDetailCover");
    coverEl.innerHTML = "";
    const img = document.createElement("img");
    img.src = src;
    img.alt = mix.name;
    img.onerror = () => { img.src = fb; };
    img.style.cssText = "width:100%;height:100%;object-fit:cover;border-radius:inherit;display:block;";
    coverEl.appendChild(img);

    // Meta
    document.getElementById("mixDetailName").textContent  = mix.name;
    document.getElementById("mixDetailDesc").textContent  = mix.desc || "";
    document.getElementById("mixDetailCount").textContent =
      `${mix.tracks.length} canciones · ${dur}`;

    // Track list
    const list = document.getElementById("mixDetailList");
    list.innerHTML = "";
    mix.tracks.forEach((track, idx) => {
      const row = document.createElement("div");
      row.className = "playlist-detail-item";

      const coverFb = track.cover || "";
      row.innerHTML = `
        <span class="playlist-detail-num">${idx+1}</span>
        <img class="playlist-detail-thumb" src="${coverFb}" alt="${track.title}" loading="lazy"
             onerror="this.style.opacity='.3'"/>
        <div class="playlist-detail-info">
          <div class="playlist-detail-track">${track.title}</div>
          <div class="playlist-detail-artist">${track.artist||""}</div>
        </div>
        <span class="playlist-detail-dur">${track.duration||""}</span>
      `;

      row.addEventListener("click", () => {
        if (typeof loadTrack === "function") loadTrack(track, false, mix.tracks);
      });
      row.addEventListener("contextmenu", e => {
        e.preventDefault();
        if (typeof openContextMenu === "function") openContextMenu(track);
      });
      list.appendChild(row);
    });

    // Buttons
    document.getElementById("btnPlayMix").onclick    = () => _play(mix, false);
    document.getElementById("btnShuffleMix").onclick = () => _play(mix, true);

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  /* ── Cerrar detalle ── */
  function closeMixDetail() {
    const modal = document.getElementById("mixDetailModal");
    if (modal) modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  /* ── Render grid pageMixes ── */
  function renderGrid() {
    const grid = document.getElementById("mixesGrid");
    if (!grid) return;
    grid.innerHTML = "";
    const visible = _visible();
    if (!visible.length) {
      grid.innerHTML = `
        <div class="mixes-empty">
          <svg viewBox="0 0 24 24" width="40" height="40"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          <p>Todavía no hay canciones en ningún mix.</p>
          <span>Añade tracks a los mixes en el archivo <code>script.js</code></span>
        </div>`;
      return;
    }
    visible.forEach(mix => grid.appendChild(_makeCard(mix)));
  }

  /* ── Render home row ── */
  function renderHome() {
    const row = document.getElementById("homeMixesRow");
    if (!row) return;
    row.innerHTML = "";
    const visible = _visible();
    const section = document.getElementById("homeMixesSection");
    if (!visible.length) {
      if (section) section.style.display = "none";
      return;
    }
    if (section) section.style.display = "";
    visible.forEach(mix => row.appendChild(_makeHomeCard(mix)));
  }

  /* ── Init ── */
  function init() {
    const closeBtn = document.getElementById("mixDetailClose");
    if (closeBtn) closeBtn.addEventListener("click", closeMixDetail);
    renderHome();
  }

  return { init, renderGrid, renderHome, openMixDetail };
})();

/* Boot */
(function(){
  function _boot(){ MixesManager.init(); }
  if (document.readyState==="loading") document.addEventListener("DOMContentLoaded",_boot);
  else setTimeout(_boot, 60);

/* ══════════════════════════════════════════════════════
   GLASS SLIDER INIT
══════════════════════════════════════════════════════ */
(function initGlassSlider() {
  const slider = document.getElementById("bnavGlassSlider");
  const nav = document.getElementById("bottomNav");
  if (!slider || !nav) return;
  const NAV_DEBUG = false;
  
  // Posicionar en el primer botón activo
  const activeBtn = nav.querySelector(".bnav-btn.active");
  if (activeBtn) {
    const btnWidth = activeBtn.offsetWidth;
    const btnLeft = activeBtn.offsetLeft;
    slider.style.width = `${Math.max(btnWidth, 56)}px`;
    slider.style.left = `0px`;
    slider.style.transform = `translateX(${btnLeft}px)`;
  }

  let bnavDragActive = false;
  let bnavDragOffset = 0;

  const getNearestNavButton = (clientX) => {
    const buttons = Array.from(nav.querySelectorAll(".bnav-btn"));
    const navRect = nav.getBoundingClientRect();
    let nearest = buttons[0] || null;
    let closest = Infinity;
    buttons.forEach(btn => {
      const rect = btn.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const dist = Math.abs(clientX - center);
      if (dist < closest) {
        closest = dist;
        nearest = btn;
      }
    });
    return nearest;
  };

  const clampSliderLeft = (left) => {
    const maxLeft = nav.clientWidth - slider.offsetWidth;
    return Math.min(Math.max(left, 0), Math.max(maxLeft, 0));
  };

  const onPointerMove = (event) => {
    if (!bnavDragActive) return;
    event.preventDefault();
    const clientX = event.clientX;
    const navRect = nav.getBoundingClientRect();
    const left = clampSliderLeft(clientX - navRect.left - bnavDragOffset);
    if (NAV_DEBUG) console.log('bnav: move', { clientX, left, dragOffset: bnavDragOffset });
    slider.style.transform = `translateX(${left}px)`;
  };

  // Touch fallback for older browsers / Safari that prefer touch events
  const onTouchMove = (e) => {
    if (!bnavDragActive) return;
    if (!e.touches || !e.touches[0]) return;
    e.preventDefault();
    const clientX = e.touches[0].clientX;
    const navRect = nav.getBoundingClientRect();
    const left = clampSliderLeft(clientX - navRect.left - bnavDragOffset);
    if (NAV_DEBUG) console.log('bnav: touchmove', { clientX, left, dragOffset: bnavDragOffset });
    slider.style.transform = `translateX(${left}px)`;
  };

  const endDrag = (event) => {
    if (!bnavDragActive) return;
    bnavDragActive = false;
    document.body.style.userSelect = "";
    // Normalize clientX for pointer and touch events
    let clientX = event && event.clientX;
    if (!clientX && event && event.changedTouches && event.changedTouches[0]) {
      clientX = event.changedTouches[0].clientX;
    }
    // Fallback to slider center if we couldn't get a coordinate
    if (!clientX) {
      const sRect = slider.getBoundingClientRect();
      clientX = sRect.left + sRect.width / 2;
    }
    const nearest = getNearestNavButton(clientX);
    // Re-enable transition so the slider animates to the final button
    slider.style.transition = '';
    if (NAV_DEBUG) console.log('bnav: end', { clientX, nearest: nearest ? nearest.dataset.page : null });
    if (nearest) {
      showPage(nearest.dataset.page);
    } else {
      // Snap back to active
      updateBottomNavSlider();
    }
  };

  nav.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    const activeBtn = nav.querySelector(".bnav-btn.active");
    if (!activeBtn) return;
    const activeRect = activeBtn.getBoundingClientRect();
    const sliderRect = slider.getBoundingClientRect();
    const targetX = event.clientX;
    const isOnActive = targetX >= activeRect.left && targetX <= activeRect.right;
    const isOnSlider = targetX >= sliderRect.left && targetX <= sliderRect.right;
    if (!isOnActive && !isOnSlider) return;

    bnavDragActive = true;
    bnavDragOffset = event.clientX - sliderRect.left;
    document.body.style.userSelect = "none";
    // disable transition for smooth direct-follow dragging
    slider.style.transition = 'none';
    if (NAV_DEBUG) console.log('bnav: down', { clientX: event.clientX, sliderLeft: sliderRect.left, dragOffset: bnavDragOffset });
    slider.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });

  // Touch start handler
  nav.addEventListener('touchstart', (e) => {
    if (!e.touches || !e.touches[0]) return;
    const touchX = e.touches[0].clientX;
    const activeBtn = nav.querySelector(".bnav-btn.active");
    if (!activeBtn) return;
    const activeRect = activeBtn.getBoundingClientRect();
    const sliderRect = slider.getBoundingClientRect();
    const isOnActive = touchX >= activeRect.left && touchX <= activeRect.right;
    const isOnSlider = touchX >= sliderRect.left && touchX <= sliderRect.right;
    if (!isOnActive && !isOnSlider) return;

    bnavDragActive = true;
    bnavDragOffset = touchX - sliderRect.left;
    document.body.style.userSelect = "none";
    slider.style.transition = 'none';
    if (NAV_DEBUG) console.log('bnav: touchstart', { clientX: touchX, sliderLeft: sliderRect.left, dragOffset: bnavDragOffset });
  }, { passive: false });

  document.addEventListener("pointermove", onPointerMove, { passive: false });
  document.addEventListener("pointerup", endDrag);
  document.addEventListener("pointercancel", endDrag);
  // Touch fallback listeners
  document.addEventListener('touchmove', onTouchMove, { passive: false });
  document.addEventListener('touchend', endDrag, { passive: false });
})();
})();

/* ═══════════════════════════════════════════════════════════
   DROPLY — Lyrics Engine  (LRCLIB real fetch + vol visual)
   Apple Music–style synced lyrics view
═══════════════════════════════════════════════════════════ */
(function LyricsEngine() {

  /* ── DOM refs ─────────────────────────────────────────────── */
  const lyricsInner  = document.getElementById('sheetLyricsInner');
  const lyricsScroll = document.getElementById('sheetLyricsScroll');
  const volFillVis   = document.getElementById('volFillVis');
  const volSliderEl  = document.getElementById('volSlider');

  /* ── State ────────────────────────────────────────────────── */
  let activeLyrics  = [];
  let activeLine    = -1;
  let rafId         = null;
  let lineEls       = [];
  let lyricsReady   = false;
  let fetchAbort    = null;   // AbortController for in-flight requests
  const lyricsCache = {};     // key → lines array (persists session)

  /* ── Volume visual sync ───────────────────────────────────── */
  function syncVolVisual() {
    if (!volSliderEl || !volFillVis) return;
    volFillVis.style.width = (parseFloat(volSliderEl.value || 1) * 100) + '%';
  }
  if (volSliderEl) {
    volSliderEl.addEventListener('input', syncVolVisual);
    syncVolVisual();
  }

  /* ── Parse LRC text → [{t, l}] ───────────────────────────── */
  function parseLRC(lrcText) {
    const lines = [];
    const re    = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/g;
    let m;
    while ((m = re.exec(lrcText)) !== null) {
      const t = parseInt(m[1]) * 60 + parseInt(m[2]) + parseInt(m[3]) / (m[3].length === 3 ? 1000 : 100);
      const l = m[4].trim();
      if (l) lines.push({ t, l });
    }
    return lines.sort((a, b) => a.t - b.t);
  }

  /* ── Fetch from LRCLIB ────────────────────────────────────── */
  async function fetchLRCLIB(title, artist) {
    // LRCLIB public API — no key required
    const url = `https://lrclib.net/api/search?track_name=${encodeURIComponent(title)}&artist_name=${encodeURIComponent(artist)}`;
    const res  = await fetch(url, { signal: fetchAbort.signal });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || !data.length) return null;

    // Prefer synced, fall back to plain
    for (const entry of data) {
      if (entry.syncedLyrics) {
        const lines = parseLRC(entry.syncedLyrics);
        if (lines.length > 2) return { synced: true, lines };
      }
    }
    // Plain lyrics — split into "lines" evenly across duration
    for (const entry of data) {
      if (entry.plainLyrics) {
        const raw   = entry.plainLyrics.split('\n').map(l => l.trim()).filter(Boolean);
        const dur   = entry.duration || 180;
        const step  = dur / raw.length;
        const lines = raw.map((l, i) => ({ t: i * step, l }));
        return { synced: false, lines };
      }
    }
    return null;
  }

  /* ── Load lyrics for track ────────────────────────────────── */
  async function loadLyricsForTrack(item) {
    activeLyrics = [];
    activeLine   = -1;
    lyricsReady  = false;
    lineEls      = [];
    if (!lyricsInner) return;

    // Cancel any pending fetch
    if (fetchAbort) { try { fetchAbort.abort(); } catch (_) {} }
    fetchAbort = new AbortController();

    const cacheKey = (item.file || '') + '|' + item.title + '|' + item.artist;
    if (lyricsCache[cacheKey]) {
      applyLines(lyricsCache[cacheKey]);
      return;
    }

    // Show loading state
    showState('loading');

    try {
      const result = await fetchLRCLIB(item.title, item.artist);
      if (result && result.lines.length > 1) {
        lyricsCache[cacheKey] = result.lines;
        applyLines(result.lines);
      } else {
        showState('not-found');
      }
    } catch (err) {
      if (err.name !== 'AbortError') showState('not-found');
    }
  }

  function applyLines(lines) {
    activeLyrics = lines;
    renderLyricLines();
    lyricsReady = true;
    const audio = document.getElementById('mainAudio');
    updateActiveLine(audio ? audio.currentTime : 0, true);
    startTick();
  }

  /* ── Render DOM lines ─────────────────────────────────────── */
  function renderLyricLines() {
    if (!lyricsInner) return;
    lyricsInner.innerHTML = '';
    lineEls = [];
    activeLyrics.forEach((line, i) => {
      const el = document.createElement('p');
      el.className = 'lyric-line';
      el.textContent = line.l;
      el.dataset.text = line.l;
      el.addEventListener('click', () => {
        const audio = document.getElementById('mainAudio');
        if (audio && activeLyrics[i]) audio.currentTime = activeLyrics[i].t;
      });
      lyricsInner.appendChild(el);
      lineEls.push(el);
    });
  }

  /* ── Update active line ───────────────────────────────────── */
  function updateActiveLine(currentTime, force) {
    if (!lyricsReady || !activeLyrics.length) return;
    let newLine = 0;
    for (let i = activeLyrics.length - 1; i >= 0; i--) {
      if (currentTime >= activeLyrics[i].t) { newLine = i; break; }
    }
    if (newLine === activeLine && !force) return;
    activeLine = newLine;

    // Defer class application one frame so CSS transitions fire properly
    requestAnimationFrame(() => {
      lineEls.forEach((el, i) => {
        el.classList.remove('active','prev-1','prev-2','next-1','next-2');
        const d = i - newLine;
        if      (d ===  0) el.classList.add('active');
        else if (d === -1) el.classList.add('prev-1');
        else if (d === -2) el.classList.add('prev-2');
        else if (d ===  1) el.classList.add('next-1');
        else if (d ===  2) el.classList.add('next-2');
      });
    });

    scrollToActive(newLine, force);
  }

  /* ── Smooth scroll — custom eased animation ─────────────────── */
  let _scrollAnim = null;
  function scrollToActive(idx, instant) {
    if (!lyricsScroll || !lineEls[idx]) return;
    const containerH   = lyricsScroll.clientHeight;
    const targetScroll = Math.max(0, lineEls[idx].offsetTop - containerH * 0.32 + lineEls[idx].offsetHeight / 2);

    if (instant) {
      if (_scrollAnim) { cancelAnimationFrame(_scrollAnim); _scrollAnim = null; }
      lyricsScroll.scrollTop = targetScroll;
      return;
    }

    // Cancel any running animation
    if (_scrollAnim) { cancelAnimationFrame(_scrollAnim); _scrollAnim = null; }

    const startTop  = lyricsScroll.scrollTop;
    const dist      = targetScroll - startTop;
    if (Math.abs(dist) < 2) return;

    const duration  = 520; // ms
    const startTime = performance.now();

    function easeInOutQuart(t) {
      return t < .5 ? 8*t*t*t*t : 1 - Math.pow(-2*t+2, 4)/2;
    }

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      lyricsScroll.scrollTop = startTop + dist * easeInOutQuart(progress);
      if (progress < 1) {
        _scrollAnim = requestAnimationFrame(step);
      } else {
        _scrollAnim = null;
      }
    }
    _scrollAnim = requestAnimationFrame(step);
  }

  /* ── rAF ticker ───────────────────────────────────────────── */
  function tick() {
    const audio = document.getElementById('mainAudio');
    if (audio && !audio.paused) {
      updateActiveLine(audio.currentTime, false);

    }
    rafId = requestAnimationFrame(tick);
  }
  function startTick() { if (!rafId) rafId = requestAnimationFrame(tick); }
  function stopTick()  { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }

  /* ── UI states ────────────────────────────────────────────── */
  function showState(state) {
    if (!lyricsInner) return;
    lineEls = []; lyricsReady = false;
    if (state === 'loading') {
      lyricsInner.innerHTML = `
        <div class="lyrics-loading-dots">
          <span></span><span></span><span></span>
        </div>`;
      return;
    }
    const msgs = {
      'idle':      ['Reproduce una canción', 'para ver la letra aquí'],
      'not-found': ['Sin letra disponible', 'para esta canción'],
    };
    const [line1, line2] = msgs[state] || msgs['idle'];
    lyricsInner.innerHTML = `
      <div class="lyrics-placeholder">
        <p>${line1}</p>
        ${line2 ? `<p style="opacity:.45;font-size:1.05rem;margin-top:.25rem">${line2}</p>` : ''}
      </div>`;
  }
  showState('idle');

  /* ── Audio event hooks ────────────────────────────────────── */
  (function hookAudio() {
    const audio = document.getElementById('mainAudio');
    if (!audio) return;
    audio.addEventListener('play',  startTick, { passive: true });
    audio.addEventListener('pause', stopTick,  { passive: true });
    audio.addEventListener('ended', stopTick,  { passive: true });
    audio.addEventListener('seeked', () => {
      if (lyricsReady) {
        updateActiveLine(audio.currentTime, true);
        /* sync fill inmediato tras seek */
        if (activeLine >= 0 && lineEls[activeLine]) {
          const lineStart = activeLyrics[activeLine].t;
          const lineEnd   = activeLyrics[activeLine + 1] ? activeLyrics[activeLine + 1].t : lineStart + 4;
          const duration  = lineEnd - lineStart;
          const elapsed   = audio.currentTime - lineStart;
          const pct       = duration > 0 ? Math.min(100, Math.max(0, (elapsed / duration) * 100)) : 100;
          lineEls[activeLine].style.setProperty('--lyric-fill', pct + '%');
        }
      }
    }, { passive: true });
  })();

  /* ── Cover/Lyrics toggle ── */
  const coverArea   = document.getElementById('sheetCoverArea');
  const lyricsArea  = document.getElementById('sheetLyricsArea');
  const coverArtImg = document.getElementById('sheetCoverArt');
  const lyricsBtnEl = document.getElementById('sheetLyricsBtn');

  // Lyrics button → toggle (vía controlador único setSheetView)
  if (lyricsBtnEl) {
    lyricsBtnEl.addEventListener('click', () => {
      setSheetView(_sheetView === 'lyrics' ? 'cover' : 'lyrics');
    });
  }

  // Tap cover art → toggle to lyrics (keep for backwards compat)
  if (coverArea) {
    coverArea.addEventListener('click', () => {
      if (_sheetView === 'cover') setSheetView('lyrics');
    });
  }
  // Tap lyrics area → back to cover
  if (lyricsArea) {
    lyricsArea.addEventListener('click', (e) => {
      // Don't collapse if clicking a lyric line (seeks audio)
      if (e.target.classList.contains('lyric-line') || e.target.closest('.lyric-line')) return;
      if (_sheetView === 'lyrics') setSheetView('cover');
    });
  }

  /* ── Expose loadLyricsForTrack globally so loadTrack() can call it ── */
  window._droplyLoadLyrics = function(item) {
    // Reset to cover view whenever a new track starts
    if (typeof window._droplyResetSheetView === 'function') window._droplyResetSheetView();
    if (lyricsArea) {
      lyricsArea.style.display = 'none';
      lyricsArea.classList.add('slide-in-start');
      lyricsArea.classList.remove('slide-in-ready');
    }
    // Update cover art in sheet
    if (coverArtImg) coverArtImg.src = item.cover || '';
    // Pre-fetch lyrics in background immediately
    loadLyricsForTrack(item);
  };

  /* ── Float button → like current track ───────────────────── */
  const floatBtn = document.getElementById('sheetFloatBtn');
  if (floatBtn) {
    floatBtn.addEventListener('click', () => {
      const cur = (typeof playlist !== 'undefined' && typeof currentTrackIdx !== 'undefined')
        ? playlist[currentTrackIdx] : null;
      if (cur && typeof toggleLike === 'function') {
        toggleLike(cur);
        // Brief visual feedback
        floatBtn.style.background = 'rgba(255,255,255,.35)';
        setTimeout(() => { floatBtn.style.background = ''; }, 300);
      }
    });
  }

  /* ── Open sheet → sync vol + restart ticker ── */
  const miniExpandBtn = document.getElementById('miniPlayerExpand');
  if (miniExpandBtn) {
    miniExpandBtn.addEventListener('click', () => {
      syncVolVisual();
      const audio = document.getElementById('mainAudio');
      if (audio && !audio.paused) startTick();
    });
  }

})();

/* ══════════════════════════════════════════════════════
   20. INIT
══════════════════════════════════════════════════════ */
(function init() {
  playlist = media.filter(m => m.type === "music");
  playlistSource = "library";
  buildCategoryPills();
  renderGrid();
  buildGenreGrid();
  renderQueueList();
  renderHomeScreen();
  initChangelog();
  updateRepeatUI();
  handleHashRoute();

  if (audioEl) {
    audioEl.addEventListener("timeupdate", updateHomeContinueProgress, { passive: true });
  }
})();
/* ══════════════════════════════════════════════════════
   VISIBILITYCHANGE — Recuperar audio al desbloquear pantalla
   Cuando el usuario pasa canción desde la pantalla bloqueada
   y luego desbloquea, si el audio no arrancó en background
   lo reintentamos aquí cuando la app vuelve a primer plano.
══════════════════════════════════════════════════════ */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) return;
  const audio = activeAudio || document.getElementById('mainAudio');
  if (!audio) return;
  if (audio.src && audio.paused && (isPlaying || window._droplyPendingTrack)) {
    window._droplyPendingTrack = null;
    // _resumeWithWatchdog ya hace muted=false/volume/load-si-hace-falta y,
    // sobre todo, arma el watchdog para reintentar si el play() se queda
    // colgado sin buffer (el mismo caso que al reanudar tras una pausa).
    setTimeout(() => { _resumeWithWatchdog(); }, 100);
  }
});
/* ══════════════════════════════════════════════════════
   FEED PAGE MODULE
══════════════════════════════════════════════════════ */
const Feed = (() => {
  let initialized = false;

  const DEMO_FRIENDS = [
    { name: "Alex M.",    initials: "AM", ago: "hace 2 min",  type: "play"   },
    { name: "Sara K.",    initials: "SK", ago: "hace 8 min",  type: "repeat", times: 5 },
    { name: "Javi R.",    initials: "JR", ago: "hace 15 min", type: "play"   },
    { name: "Noa L.",     initials: "NL", ago: "hace 22 min", type: "add"    },
    { name: "Marc B.",    initials: "MB", ago: "hace 31 min", type: "play"   },
    { name: "Clàudia",   initials: "CL", ago: "hace 45 min", type: "repeat", times: 3 },
    { name: "3 usuarios cercanos", initials: "··", ago: "hace 1h", type: "zone" },
  ];

  function getTracks() {
    return (typeof media !== "undefined" ? media : []).filter(function(m) { return m.type === "music"; });
  }

  function dailyPick(arr, n, salt) {
    if (!arr.length) return [];
    var seed = Math.floor(Date.now() / 86400000) + (salt || 0);
    var shuffled = arr.slice().sort(function(a, b) {
      var ha = (a.file + seed).split("").reduce(function(s, c) { return s + c.charCodeAt(0); }, 0);
      var hb = (b.file + seed).split("").reduce(function(s, c) { return s + c.charCodeAt(0); }, 0);
      return ha - hb;
    });
    return shuffled.slice(0, n);
  }

  /* ── TABS ── */
  function initTabs() {
    document.querySelectorAll(".feed-tab").forEach(function(tab) {
      tab.addEventListener("click", function() {
        document.querySelectorAll(".feed-tab").forEach(function(t) { t.classList.remove("active"); });
        document.querySelectorAll(".feed-panel").forEach(function(p) { p.classList.remove("active"); });
        tab.classList.add("active");
        var name = tab.dataset.feedTab;
        var panelId = "feedPanel" + name.charAt(0).toUpperCase() + name.slice(1);
        var panel = document.getElementById(panelId);
        if (panel) panel.classList.add("active");
        if (name === "trending") renderTrending();
        if (name === "discover") renderDiscover();
      });
    });
  }

  /* ── STORY CANVAS ── */
  function initStory() {
    var canvas = document.getElementById("feedStoryCanvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    function resize() {
      var card = canvas.closest(".feed-story-card");
      if (card) { canvas.width = card.offsetWidth; canvas.height = card.offsetHeight; }
    }
    resize();
    var t = 0;
    var BARS = 52;
    function drawFrame() {
      var w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      var bw = w / BARS;
      for (var i = 0; i < BARS; i++) {
        var phase = (i / BARS) * Math.PI * 2;
        var amp = 0.28 + 0.38 * Math.abs(Math.sin(phase * 1.4 + t * 0.55))
                       + 0.14 * Math.abs(Math.sin(phase * 2.9 + t * 1.05));
        var barH = amp * h * 0.8;
        var alpha = 0.1 + amp * 0.2;
        ctx.fillStyle = "rgba(180,150,255," + alpha + ")";
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(i * bw + bw * 0.18, (h - barH) / 2, bw * 0.64, barH, 2);
        } else {
          ctx.rect(i * bw + bw * 0.18, (h - barH) / 2, bw * 0.64, barH);
        }
        ctx.fill();
      }
      t += 0.016;
      requestAnimationFrame(drawFrame);
    }
    drawFrame();
    window.addEventListener("resize", resize);
  }

  function updateStory(track) {
    var titleEl  = document.getElementById("feedStoryTitle");
    var artistEl = document.getElementById("feedStoryArtist");
    var coverEl  = document.getElementById("feedStoryCover");
    var lyricEl  = document.getElementById("feedStoryLyric");
    if (!titleEl) return;
    if (track) {
      titleEl.textContent  = track.title  || "—";
      artistEl.textContent = track.artist || "—";
      if (coverEl) coverEl.src = track.cover || "";
      if (lyricEl) lyricEl.textContent = "";
      /* Lyric snippet via lrclib */
      if (lyricEl && track.title && track.artist) {
        fetch("https://lrclib.net/api/search?track_name=" + encodeURIComponent(track.title) + "&artist_name=" + encodeURIComponent(track.artist))
          .then(function(r) { return r.json(); })
          .then(function(data) {
            var entry = Array.isArray(data) ? data[0] : null;
            if (entry && entry.plainLyrics) {
              var lines = entry.plainLyrics.split("\n").filter(function(l) { return l.trim().length > 4; });
              lyricEl.textContent = lines.slice(0, 2).join(" / ");
            }
          }).catch(function() {});
      }
      var card = document.getElementById("feedStoryCard");
      if (card) {
        card.onclick = function() { if (typeof loadTrack === "function") loadTrack(track); };
      }
    } else {
      titleEl.textContent  = "Reproduce algo para verlo aquí";
      if (artistEl) artistEl.textContent = "";
      if (coverEl)  coverEl.src = "";
      if (lyricEl)  lyricEl.textContent = "";
    }
  }

  /* ── ACTIVITY ── */
  function renderActivity() {
    var list = document.getElementById("feedActivityList");
    if (!list) return;
    var tracks = getTracks();
    if (!tracks.length) {
      list.innerHTML = "<p style='color:rgba(255,255,255,.25);font-size:.8rem;text-align:center;padding:2rem 0'>Reproduce música para ver actividad</p>";
      return;
    }

    var history = [];
    try { history = JSON.parse(localStorage.getItem("droply_history_v2") || "[]"); } catch(_) {}

    var items = [];

    /* Own recent plays first */
    history.slice(0, 4).forEach(function(h) {
      var t = tracks.find(function(m) { return m.file === h.file; });
      if (t) items.push({ own: true, track: t, ago: "ahora mismo", type: "play" });
    });

    /* Demo friends woven in */
    var demoTracks = dailyPick(tracks, DEMO_FRIENDS.length, 77);
    DEMO_FRIENDS.forEach(function(friend, i) {
      var track = demoTracks[i] || tracks[i % tracks.length];
      items.push({ own: false, friend: friend, track: track, ago: friend.ago, type: friend.type });
    });

    list.innerHTML = "";
    items.slice(0, 13).forEach(function(item) {
      var el = document.createElement("div");
      el.className = "feed-activity-item";
      var text = "";
      if (item.own) {
        text = "Tú escuchaste esto";
      } else if (item.type === "repeat") {
        text = "<strong>" + item.friend.name + "</strong> lo ha repetido " + item.friend.times + " veces";
      } else if (item.type === "add") {
        text = "<strong>" + item.friend.name + "</strong> lo añadió a su playlist";
      } else if (item.type === "zone") {
        text = "<strong>" + item.friend.name + "</strong> están escuchando esto en tu zona";
      } else {
        text = "<strong>" + item.friend.name + "</strong> está escuchando esto";
      }
      var initials = item.own ? "Tú" : (item.friend ? item.friend.initials : "?");
      el.innerHTML =
        '<div class="feed-activity-avatar">' + initials + '</div>' +
        '<img class="feed-activity-cover" src="' + (item.track.cover || "") + '" alt="" onerror="this.style.display=\'none\'" />' +
        '<div class="feed-activity-body">' +
          '<div class="feed-activity-text">' + text + '</div>' +
          '<div class="feed-activity-track">' + item.track.title + ' · ' + item.track.artist + '</div>' +
        '</div>' +
        '<span class="feed-activity-time">' + item.ago + '</span>';
      (function(track) {
        el.addEventListener("click", function() {
          if (typeof loadTrack === "function") loadTrack(track);
        });
      })(item.track);
      list.appendChild(el);
    });
  }

  /* ── TRENDING ── */
  function renderTrending() {
    var tracks = getTracks();
    if (!tracks.length) return;

    var zoneTracks = dailyPick(tracks, 10, 11);
    var zoneEl = document.getElementById("feedTrendingList");
    if (zoneEl && !zoneEl.children.length) {
      var demoCounts = [847, 612, 534, 489, 412, 388, 299, 241, 187, 132];
      zoneTracks.forEach(function(track, i) {
        var item = document.createElement("div");
        item.className = "feed-trending-item";
        item.innerHTML =
          '<div class="feed-trending-rank' + (i < 3 ? " top" : "") + '">' + (i + 1) + '</div>' +
          '<img class="feed-trending-cover" src="' + (track.cover || "") + '" alt="" onerror="this.style.display=\'none\'" />' +
          '<div class="feed-trending-info">' +
            '<div class="feed-trending-title">' + track.title + '</div>' +
            '<div class="feed-trending-artist">' + track.artist + '</div>' +
          '</div>' +
          '<div class="feed-trending-plays"><span>' + demoCounts[i] + '</span> hoy</div>';
        (function(t) {
          item.addEventListener("click", function() { if (typeof loadTrack === "function") loadTrack(t); });
        })(track);
        zoneEl.appendChild(item);
      });
    }

    /* My style: real playCounts */
    var counts = {};
    try { counts = JSON.parse(localStorage.getItem("droply_playcounts") || "{}"); } catch(_) {}
    var styleEl = document.getElementById("feedStyleList");
    if (styleEl && !styleEl.children.length) {
      var sorted = tracks
        .map(function(t) { return { track: t, count: counts[t.file] || 0 }; })
        .sort(function(a, b) { return b.count - a.count; })
        .slice(0, 8);
      if (!sorted.some(function(x) { return x.count > 0; })) {
        styleEl.innerHTML = "<p style='color:rgba(255,255,255,.25);font-size:.78rem;padding:.3rem 0'>Reproduce más canciones para ver tus tendencias</p>";
      } else {
        sorted.forEach(function(x, i) {
          var item = document.createElement("div");
          item.className = "feed-trending-item";
          item.innerHTML =
            '<div class="feed-trending-rank' + (i < 3 ? " top" : "") + '">' + (i + 1) + '</div>' +
            '<img class="feed-trending-cover" src="' + (x.track.cover || "") + '" alt="" onerror="this.style.display=\'none\'" />' +
            '<div class="feed-trending-info">' +
              '<div class="feed-trending-title">' + x.track.title + '</div>' +
              '<div class="feed-trending-artist">' + x.track.artist + '</div>' +
            '</div>' +
            '<div class="feed-trending-plays"><span>' + x.count + '</span> tuyas</div>';
          (function(t) {
            item.addEventListener("click", function() { if (typeof loadTrack === "function") loadTrack(t); });
          })(x.track);
          styleEl.appendChild(item);
        });
      }
    }
  }

  /* ── DISCOVER ── */
  function renderDiscover() {
    var scroll = document.getElementById("feedDiscoverScroll");
    if (!scroll || scroll.children.length > 0) return;
    var tracks = getTracks();
    if (!tracks.length) return;
    var picks = dailyPick(tracks, 10, 42);

    picks.forEach(function(track) {
      var card = document.createElement("div");
      card.className = "feed-discover-card";
      card.innerHTML =
        '<div class="feed-discover-bg" style="background-image:url(\'' + (track.cover || "") + '\')"></div>' +
        '<div class="feed-discover-overlay"></div>' +
        '<img class="feed-discover-cover" src="' + (track.cover || "") + '" alt="" />' +
        '<div class="feed-discover-content">' +
          '<div class="feed-discover-title">' + track.title + '</div>' +
          '<div class="feed-discover-artist">' + track.artist + '</div>' +
          '<div class="feed-discover-duration">Vista previa · 30s</div>' +
        '</div>' +
        '<div class="feed-discover-actions">' +
          '<button class="feed-discover-btn play-btn" aria-label="Vista previa">' +
            '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5,3 19,12 5,21"/></svg>' +
          '</button>' +
          '<button class="feed-discover-btn add-btn" aria-label="Añadir">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="feed-discover-progress"><div class="feed-discover-progress-fill"></div></div>';

      var playBtn = card.querySelector(".play-btn");
      var addBtn  = card.querySelector(".add-btn");
      var fill    = card.querySelector(".feed-discover-progress-fill");
      var previewAudio = null;
      var previewTimer = null;
      var playing = false;

      playBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        if (playing) {
          playing = false;
          if (previewAudio) { previewAudio.pause(); previewAudio = null; }
          clearInterval(previewTimer);
          fill.style.width = "0%";
          playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5,3 19,12 5,21"/></svg>';
          return;
        }
        playing = true;
        playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="3" width="4" height="18"/><rect x="14" y="3" width="4" height="18"/></svg>';
        var streamUrl = "/api/stream?title=" + encodeURIComponent(track.title) + "&artist=" + encodeURIComponent(track.artist);
        previewAudio = new Audio(streamUrl);
        previewAudio.volume = 0.6;
        var elapsed = 0;
        previewAudio.play().catch(function() {
          if (typeof loadTrack === "function") loadTrack(track);
          playing = false;
          fill.style.width = "0%";
          playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5,3 19,12 5,21"/></svg>';
        });
        previewTimer = setInterval(function() {
          elapsed += 0.5;
          fill.style.width = Math.min((elapsed / 30) * 100, 100) + "%";
          if (elapsed >= 30) {
            clearInterval(previewTimer);
            if (previewAudio) previewAudio.pause();
            fill.style.width = "0%";
            playing = false;
            playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5,3 19,12 5,21"/></svg>';
          }
        }, 500);
      });

      addBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        if (typeof openAddToPlaylist === "function") openAddToPlaylist(track);
      });

      card.addEventListener("click", function() {
        if (typeof loadTrack === "function") loadTrack(track);
      });

      scroll.appendChild(card);
    });
  }

  /* ── INIT ── */
  function init() {
    if (initialized) { refresh(); return; }
    initialized = true;
    initTabs();
    initStory();
    renderActivity();

    /* Listen for track changes */
    document.addEventListener("droply:trackchange", function(e) {
      updateStory(e && e.detail ? e.detail : null);
    });

    /* Check current playing track from history */
    var history = [];
    try { history = JSON.parse(localStorage.getItem("droply_history_v2") || "[]"); } catch(_) {}
    if (history.length) {
      var tracks = getTracks();
      var cur = tracks.find(function(m) { return m.file === history[0].file; }) || null;
      updateStory(cur);
    } else {
      updateStory(null);
    }
  }

  function refresh() {
    renderActivity();
  }

  return { init: init, refresh: refresh };
})();

/* ══════════════════════════════════════════════════════
   ACCOUNT MANAGEMENT & PERSISTENCE
══════════════════════════════════════════════════════ */
const USER_DATA_KEY = "droply_user_data_v1";

const defaultUserData = {
  name: "Invitado",
  username: "guest",
  avatar: "https://i.pravatar.cc/300?img=12"
};

let currentUser = loadUserData();

function loadUserData() {
  try {
    const saved = localStorage.getItem(USER_DATA_KEY);
    return saved ? JSON.parse(saved) : defaultUserData;
  } catch (e) {
    return defaultUserData;
  }
}

function saveUserData(data) {
  try {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
    currentUser = data;
    updateUserUI();
  } catch (e) {
    showToast("Error al guardar los datos", "error");
  }
}

function updateUserUI() {
  // Topbar
  const topbarImg = document.querySelector("#topbarProfileBtn img");
  if (topbarImg) topbarImg.src = currentUser.avatar;

  // Profile Page
  const profileName = document.getElementById("profileName");
  const profileUser = document.getElementById("profileUsername");
  const profileAvatar = document.getElementById("profileAvatar");

  if (profileName) profileName.textContent = currentUser.name;
  if (profileUser) profileUser.textContent = `@${currentUser.username}`;
  if (profileAvatar) profileAvatar.src = currentUser.avatar;

  // Modal pre-fill
  const inputName = document.getElementById("inputName");
  const inputUser = document.getElementById("inputUsername");
  const avatarPrev = document.getElementById("avatarPreview");

  if (inputName) inputName.value = currentUser.name;
  if (inputUser) inputUser.value = currentUser.username;
  if (avatarPrev) avatarPrev.src = currentUser.avatar;
}

// Inicializar gestión de cuenta
function initAccountManagement() {
  const modal = document.getElementById("accountModal");
  const btnOpen = document.getElementById("btnManageAccount");
  const btnClose = document.getElementById("accountClose");
  const btnSave = document.getElementById("btnAccountSave");
  const btnLogout = document.getElementById("btnLogout");
  const avatarInput = document.getElementById("avatarInput");
  const avatarPreview = document.getElementById("avatarPreview");

  if (btnOpen) {
    btnOpen.addEventListener("click", () => {
      updateUserUI(); // Asegurar que el modal tiene los datos frescos
      modal.classList.add("open");
    });
  }

  if (btnClose) {
    btnClose.addEventListener("click", () => modal.classList.remove("open"));
  }

  // Cerrar al hacer click fuera
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });

  // Manejo de avatar (Base64 para persistencia local simple)
  if (avatarInput) {
    avatarInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 1024 * 1024) { // Limite 1MB para localStorage
          showToast("La imagen es demasiado grande (máx 1MB)", "warn");
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          avatarPreview.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (btnSave) {
    btnSave.addEventListener("click", () => {
      const newName = document.getElementById("inputName").value.trim();
      const newUser = document.getElementById("inputUsername").value.trim();
      const newAvatar = avatarPreview.src;

      if (!newName || !newUser) {
        showToast("Nombre y usuario son obligatorios", "warn");
        return;
      }

      saveUserData({
        name: newName,
        username: newUser.replace("@", ""),
        avatar: newAvatar
      });

      modal.classList.remove("open");
      showToast("Perfil actualizado con éxito", "success");
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      if (confirm("¿Estás seguro de que quieres cerrar sesión? Se borrarán tus datos locales.")) {
        localStorage.removeItem(USER_DATA_KEY);
        localStorage.removeItem(PL_KEY);
        localStorage.removeItem(HIST_KEY);
        localStorage.removeItem(LIKED_KEY);
        
        // También cerrar sesión en Supabase si existe
        if (typeof SupabaseCloud !== "undefined" && SupabaseCloud.logout) {
          SupabaseCloud.logout();
        }
        
        showToast("Sesión cerrada. Reiniciando...", "default");
        setTimeout(() => location.reload(), 1500);
      }
    });
  }

  // Lógica de Supabase Auth
  const btnGoogle = document.getElementById("btnGoogleLogin");
  const btnAuthLogout = document.getElementById("btnAuthLogout");

  if (btnGoogle) {
    btnGoogle.addEventListener("click", () => {
      if (typeof SupabaseCloud !== "undefined" && SupabaseCloud.loginWithGoogle) {
        SupabaseCloud.loginWithGoogle();
      } else {
        showToast("Supabase no está configurado", "error");
      }
    });
  }

  if (btnAuthLogout) {
    btnAuthLogout.addEventListener("click", () => {
      if (typeof SupabaseCloud !== "undefined" && SupabaseCloud.logout) {
        SupabaseCloud.logout();
      }
    });
  }
}

// Función para actualizar el estado visual de Supabase (llamada desde supabase-cloud.js)
window.updateSupabaseUI = function(user) {
  const statusText = document.getElementById("authStatusText");
  const btnGoogle = document.getElementById("btnGoogleLogin");
  const authDetail = document.getElementById("authUserDetail");
  const authEmail = document.getElementById("authUserEmail");

  if (user) {
    if (statusText) statusText.textContent = "Conectado a la nube";
    if (btnGoogle) btnGoogle.style.display = "none";
    if (authDetail) authDetail.style.display = "flex";
    if (authEmail) authEmail.textContent = user.email;
    
    // Si el usuario de Supabase tiene metadatos, actualizar perfil local y ocultar muro
    const meta = user.user_metadata || {};
    saveUserData({
      name: meta.full_name || user.email.split('@')[0],
      username: user.email.split('@')[0],
      avatar: meta.avatar_url || currentUser.avatar
    });
    
    // Ocultar muro de autenticación
    const authWall = document.getElementById("authWall");
    if (authWall) {
      authWall.classList.add("hidden");
      document.body.style.overflow = "";
    }
  } else {
    if (statusText) statusText.textContent = "No conectado";
    if (btnGoogle) btnGoogle.style.display = "flex";
    if (authDetail) authDetail.style.display = "none";
    
    // Si no hay usuario de Supabase y tampoco local, mostrar muro
    if (currentUser.username === "guest") {
      const authWall = document.getElementById("authWall");
      if (authWall) {
        authWall.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      }
    }
  }
}

// Inyectar en el flujo de inicio
document.addEventListener("DOMContentLoaded", () => {
  updateUserUI();
  initAccountManagement();
  checkAuthWall();
});

function initAuthMosaic() {
  const col1 = document.getElementById("mosaicCol1");
  const col2 = document.getElementById("mosaicCol2");
  const col3 = document.getElementById("mosaicCol3");
  if (!col1 || !col2 || !col3) return;

  const allCovers = media.map(m => m.cover).filter(Boolean);
  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
  const picked = shuffle(allCovers).slice(0, 9);

  [col1, col2, col3].forEach((col, i) => {
    col.innerHTML = picked.slice(i * 3, (i + 1) * 3).map(src => `<img src="${src}" alt="">`).join("");
  });
}

function checkAuthWall() {
  const authWall = document.getElementById("authWall");
  const btnCreate = document.getElementById("btnGoogleAuthWall");
  const btnLogin = document.getElementById("btnGoogleLoginWall");

  if (!authWall) return;

  // Generar mosaico dinámico con imágenes que sí cargan
  initAuthMosaic();

  // Si el usuario es invitado (no registrado), mostrar muro
  if (currentUser.username === "guest") {
    authWall.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  } else {
    authWall.classList.add("hidden");
    document.body.style.overflow = "";
  }

  const handleAuth = (e) => {
    if (e) e.preventDefault();
    // Prioridad: Usar la lógica de Supabase original si está disponible
    if (typeof SupabaseCloud !== "undefined" && typeof SupabaseCloud.loginWithGoogle === "function") {
      SupabaseCloud.loginWithGoogle();
    } else {
      // Fallback: Si Supabase no está configurado, usar el simulador premium original
      showToast("Conectando...", "success");
      setTimeout(() => {
        const fakeUser = {
          name: "Usuario Premium",
          username: "premium_user",
          avatar: "https://i.pravatar.cc/300?img=12"
        };
        saveUserData(fakeUser);
        location.reload();
      }, 1000);
    }
  };

  if (btnCreate) btnCreate.addEventListener("click", handleAuth);
  if (btnLogin) btnLogin.addEventListener("click", handleAuth);
}
/* ═══════════════════════════════════════════════════════════
   LIBRARY HUB + SUBPAGES
═══════════════════════════════════════════════════════════ */

function renderLibraryHub() {
  // Update subtitle counters
  const subPl = document.getElementById('libSubPlaylists');
  const subLiked = document.getElementById('libSubLiked');
  const subDl = document.getElementById('libSubDownloads');

  if (subPl) {
    const count = (typeof playlists !== 'undefined') ? playlists.length : 0;
    subPl.textContent = count === 1 ? '1 playlist' : `${count} playlists`;
  }
  if (subLiked) {
    const count = (typeof likedTracks !== 'undefined') ? likedTracks.size : 0;
    subLiked.textContent = count === 1 ? '1 me gusta' : `${count} me gustas`;
  }
  if (subDl && typeof OfflineManager !== 'undefined') {
    OfflineManager.getAllDownloads().then(items => {
      if (subDl) subDl.textContent = items.length === 1 ? '1 canción' : `${items.length} canciones`;
    });
  }
}

// ── Open / close helpers ──────────────────────────────────
function openLibSubpage(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeLibSubpage(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

// ── Render artists subpage ────────────────────────────────
function renderLibArtists() {
  const grid = document.getElementById('libArtistsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const artistMap = {};
  if (typeof media !== 'undefined') {
    media.forEach(item => {
      const cnt = (typeof playCounts !== 'undefined') ? (playCounts[item.file] || 0) : 0;
      if (!artistMap[item.artist]) artistMap[item.artist] = { name: item.artist, count: 0, cover: item.cover, category: item.category };
      artistMap[item.artist].count += cnt;
    });
  }

  let artists = Object.values(artistMap);
  // Sort: played first, then alphabetical
  artists.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  // Limit to artists the user has actually played, or show all if none
  const played = artists.filter(a => a.count > 0);
  const displayArtists = played.length > 0 ? played : artists.slice(0, 30);

  if (displayArtists.length === 0) {
    grid.innerHTML = `<div class="lib-empty-state" style="grid-column:1/-1">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
      <h3>Sin artistas aún</h3><p>Escucha música y aquí aparecerán tus artistas más frecuentes.</p></div>`;
    return;
  }

  // Update subtitle
  const sub = document.getElementById('libSubArtists');
  if (sub) sub.textContent = `${displayArtists.length} artistas`;

  displayArtists.forEach(artist => {
    const photo = (typeof getArtistPhoto === 'function') ? getArtistPhoto(artist.name) : null;
    const cover = photo || artist.cover || ((typeof getPlaceholderCover === 'function') ? getPlaceholderCover(artist.category) : '');
    const card = document.createElement('div');
    card.className = 'lib-artist-card';
    const displayName = artist.name.split(/[,&\/]/)[0].trim();
    card.innerHTML = `<img src="${cover}" alt="${displayName}" loading="lazy"><p class="lib-artist-card-name">${displayName}</p>`;
    const img = card.querySelector('img');
    img.onerror = () => {
      img.onerror = null;
      if (typeof fetchArtistPhotoFromWiki === 'function') fetchArtistPhotoFromWiki(artist.name, img, cover);
    };
    if (!photo && typeof fetchArtistPhotoFromWiki === 'function') {
      fetchArtistPhotoFromWiki(artist.name, img, cover);
    }
    card.addEventListener('click', () => {
      closeLibSubpage('libPageArtists');
      const si = document.getElementById('searchInput');
      if (si) { si.value = displayName; si.dispatchEvent(new Event('input')); }
      showPage('pageSearch');
    });
    grid.appendChild(card);
  });
}

// ── Render liked tracks subpage ───────────────────────────
function renderLibLiked() {
  const list = document.getElementById('libLikedList');
  const countEl = document.getElementById('libLikedCount');
  if (!list) return;
  list.innerHTML = '';

  const likedItems = (typeof media !== 'undefined' && typeof likedTracks !== 'undefined')
    ? [...media, ...(typeof _ytLibrary !== 'undefined' ? _ytLibrary : [])].filter(m => m.type === 'music' && likedTracks.has(m.file))
    : [];

  if (countEl) countEl.textContent = likedItems.length === 1 ? '1 canción' : `${likedItems.length} canciones`;

  // Update hub subtitle
  const sub = document.getElementById('libSubLiked');
  if (sub) sub.textContent = likedItems.length === 1 ? '1 me gusta' : `${likedItems.length} me gustas`;

  if (likedItems.length === 0) {
    list.innerHTML = `<div class="lib-empty-state">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      <h3>Sin canciones guardadas</h3><p>Pulsa el corazón en cualquier canción para guardarla aquí.</p></div>`;
    return;
  }

  likedItems.forEach((item, idx) => {
    const cover = item.cover || ((typeof getPlaceholderCover === 'function') ? getPlaceholderCover(item.category) : '');
    const row = document.createElement('div');
    row.className = 'lib-track-row';
    row.innerHTML = `
      <img class="lib-track-row-cover" src="${cover}" alt="${item.title}" onerror="this.src='${cover}'">
      <div class="lib-track-row-info">
        <div class="lib-track-row-title">${item.title}</div>
        <div class="lib-track-row-artist">${item.artist}</div>
      </div>
      <button class="lib-track-row-more" aria-label="Opciones">
        <svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="5" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.4" fill="currentColor" stroke="none"/></svg>
      </button>`;
    row.addEventListener('click', e => {
      if (e.target.closest('.lib-track-row-more')) { e.stopPropagation(); if (typeof openContextMenu === 'function') openContextMenu(item); return; }
      if (typeof loadTrack === 'function') loadTrack(item, false, likedItems);
    });
    row.querySelector('.lib-track-row-more').addEventListener('click', e => {
      e.stopPropagation();
      if (typeof openContextMenu === 'function') openContextMenu(item);
    });
    list.appendChild(row);
  });

  // Play all button
  const playBtn = document.getElementById('libLikedPlayBtn');
  if (playBtn) {
    playBtn.onclick = () => {
      if (likedItems.length > 0 && typeof loadTrack === 'function') loadTrack(likedItems[0], false, likedItems);
    };
  }
}

// ── Render downloads subpage ──────────────────────────────
async function renderLibDownloads() {
  const list = document.getElementById('libDownloadsList');
  const fill = document.getElementById('libDlStorageFill');
  const lbl  = document.getElementById('libDlStorageLbl');
  if (!list || typeof OfflineManager === 'undefined') return;
  list.innerHTML = '';

  const { usage, quota } = await OfflineManager.getStorageEstimate();
  if (fill && quota > 0) fill.style.width = Math.min(100, (usage / quota) * 100) + '%';
  if (lbl) {
    const usedMB  = (usage / 1024 / 1024).toFixed(1);
    const totalGB = quota > 0 ? (quota / 1024 / 1024 / 1024).toFixed(1) : '—';
    lbl.textContent = `${usedMB} MB / ${totalGB} GB usados`;
  }

  const items = await OfflineManager.getAllDownloads();
  // Update hub subtitle
  const sub = document.getElementById('libSubDownloads');
  if (sub) sub.textContent = items.length === 1 ? '1 canción' : `${items.length} canciones`;

  if (items.length === 0) {
    list.innerHTML = `<div class="lib-empty-state">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      <h3>Sin descargas</h3><p>Pulsa el ícono ↓ en cualquier canción para escucharla sin conexión.</p></div>`;
    return;
  }

  items.sort((a, b) => (b.downloadedAt || 0) - (a.downloadedAt || 0)).forEach(item => {
    const cover = item.cover || ((typeof getPlaceholderCover === 'function') ? getPlaceholderCover(item.category) : '');
    const row = document.createElement('div');
    row.className = 'lib-track-row';
    row.innerHTML = `
      <img class="lib-track-row-cover" src="${cover}" alt="${item.title}" onerror="this.src='${cover}'">
      <div class="lib-track-row-info">
        <div class="lib-track-row-title">${item.title}</div>
        <div class="lib-track-row-artist">${item.artist}</div>
      </div>
      <button class="lib-track-row-more" aria-label="Opciones">
        <svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="5" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.4" fill="currentColor" stroke="none"/></svg>
      </button>`;
    // Find full item from media for playback
    const mediaItem = (typeof media !== 'undefined') ? media.find(m => m.file === item.file) : null;
    const playItem = mediaItem || item;
    row.addEventListener('click', e => {
      if (e.target.closest('.lib-track-row-more')) return;
      if (typeof loadTrack === 'function') loadTrack(playItem);
    });
    row.querySelector('.lib-track-row-more').addEventListener('click', e => {
      e.stopPropagation();
      if (typeof openContextMenu === 'function') openContextMenu(playItem);
    });
    list.appendChild(row);
  });
}

// ── Wire up Library Hub buttons ───────────────────────────
(function initLibraryHub() {
  // Hub card buttons (Artists removed)
  const cardPl = document.getElementById('libCardPlaylists');
  const cardLi = document.getElementById('libCardLiked');
  const cardDl = document.getElementById('libCardDownloads');

  if (cardPl) cardPl.addEventListener('click', () => {
    renderPlaylists();
    openLibSubpage('libPagePlaylists');
  });
  if (cardLi) cardLi.addEventListener('click', () => {
    renderLibLiked();
    openLibSubpage('libPageLiked');
  });
  if (cardDl) cardDl.addEventListener('click', () => {
    renderLibDownloads();
    openLibSubpage('libPageDownloads');
  });

  // Back buttons
  const backPl = document.getElementById('libBackPlaylists');
  const backLi = document.getElementById('libBackLiked');
  const backDl = document.getElementById('libBackDownloads');
  if (backPl) backPl.addEventListener('click', () => closeLibSubpage('libPagePlaylists'));
  if (backLi) backLi.addEventListener('click', () => closeLibSubpage('libPageLiked'));
  if (backDl) backDl.addEventListener('click', () => closeLibSubpage('libPageDownloads'));

  // Home "Ver todo" playlists link
  const homeVeroPl = document.getElementById('homeVeroPlaylists');
  if (homeVeroPl) homeVeroPl.addEventListener('click', () => {
    showPage('pageLibrary');
    renderPlaylists();
    openLibSubpage('libPagePlaylists');
  });

  // Liked play button (also wired in renderLibLiked, but set default)
  const likedPlayBtn = document.getElementById('libLikedPlayBtn');
  if (likedPlayBtn && !likedPlayBtn._wired) {
    likedPlayBtn._wired = true;
    likedPlayBtn.addEventListener('click', () => {
      const likedItems = (typeof media !== 'undefined' && typeof likedTracks !== 'undefined')
        ? [...media, ...(typeof _ytLibrary !== 'undefined' ? _ytLibrary : [])].filter(m => m.type === 'music' && likedTracks.has(m.file)) : [];
      if (likedItems.length > 0 && typeof loadTrack === 'function') loadTrack(likedItems[0], false, likedItems);
    });
  }
})();
