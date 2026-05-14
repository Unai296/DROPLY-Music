/* ═══════════════════════════════════════════════════════════
   DROPLY — script.js  (adaptado al HTML v3 con sheet player)
   ──────────────────────────────────────────────────────────
   CÓMO AÑADIR CONTENIDO:
   1. Añade tu archivo de audio en /Music/
   2. Añade la portada donde quieras (URL o ruta local)
   3. Añade un nuevo objeto al array `media` más abajo:
      {
        type:     "music" | "video"
        title:    "Nombre del tema",
        artist:   "Nombre del artista",
        cover:    "covers/mi-portada.jpg",
        file:     "./Music/mi-cancion.mp3",
        category: "Jazz",
        duration: "3:42"   ← opcional
      }
═══════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════
   1. DATA
══════════════════════════════════════════════════════ */
const media = [
  {
    type:     "music",
    title:    "In Da Getto",
    artist:   "J. Balvin, Skrillex",
    cover:    "https://i.ytimg.com/vi/7aPzYlc2RY4/maxresdefault.jpg",
    file:     "./Music/indagetto.mp3",
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
    cover:    "https://i.scdn.co/image/ab67616d00001e02005ee342f4eef2cc6e8436ab",
    file:     "./Music/dakiti.mp3",
    category: "Reggaeton",
    duration: "3:33"
  },
  {
    type:     "music",
    title:    "LOVE",
    artist:   "Clarent",
    cover:    "https://i.scdn.co/image/ab67616d0000b273ecb5fbeae355fb9554341de4",
    file:     "./Music/love.mp3",
    category: "Reggaeton",
    duration: "2:44"
  },
  {
    type:     "music",
    title:    "AURORA",
    artist:   "Mora, De La Rose",
    cover:    "https://images.genius.com/9b4acd648c12aa172b1b4ec9f8eaf4da.1000x1000x1.png",
    file:     "./Music/aurora.mp3",
    category: "Reggaeton",
    duration: "3:12"
  },
  {
    type:     "music",
    title:    "POR SI MAÑANA NO ESTOY",
    artist:   "Omar Courtz",
    cover:    "https://cdn-images.dzcdn.net/images/cover/1ef9489b58a25622c2e3d2aa0473dde0/0x1900-000000-80-0-0.jpg",
    file:     "./Music/porsimañana.mp3",
    category: "Reggaeton",
    duration: "4:24"
  },
  {
    type:     "music",
    title:    "444 (Remix)",
    artist:   "Yan Block, De La Rose, Hades66, Ñengo Flow",
    cover:    "https://i.scdn.co/image/ab67616d0000b2735cc8552f86ba4cc528968d2d",
    file:     "./Music/444remix.mp3",
    category: "Reggaeton",
    duration: "4:59"
  },
  {
    type:     "music",
    title:    "ETA (Remix)",
    artist:   "Roa, De La Rose, Luar La L, Omar Courtz, Yan Block",
    cover:    "https://i.ytimg.com/vi/awbt4MRXuck/maxresdefault.jpg",
    file:     "./Music/etaremix.mp3",
    category: "Reggaeton",
    duration: "7:42"
  },
  {
    type:     "music",
    title:    "QLOO*",
    artist:   "Young Cister, Kreamly",
    cover:    "https://m.media-amazon.com/images/I/51qThLr9dIL._SX354_SY354_BL0_QL100__UXNaN_FMjpg_QL85_.jpg",
    file:     "./Music/qloo.mp3",
    category: "Reggaeton",
    duration: "2:47"
  },
  {
    type:     "music",
    title:    "LUCES DE COLORES",
    artist:   "Omar Courtz, De La Rose",
    cover:    "https://i.scdn.co/image/ab67616d0000b273996764071dbd5240eefb2422",
    file:     "./Music/lucesdecolores.mp3",
    category: "Reggaeton",
    duration: "3:36"
  },
  {
    type:     "music",
    title:    "IA",
    artist:   "Clarent, Mora",
    cover:    "https://i1.sndcdn.com/artworks-jATMMIVeQ5n5-0-t500x500.jpg",
    file:     "./Music/ia.mp3",
    category: "Reggaeton",
    duration: "2:51"
  },
  {
    type:     "music",
    title:    "Yo sé",
    artist:   "Yan Block",
    cover:    "https://m.media-amazon.com/images/I/31vUXtxjAgL._UXNaN_FMjpg_QL85_.jpg",
    file:     "./Music/yose.mp3",
    category: "Reggaeton",
    duration: "2:09"
  },
  {
    type:     "music",
    title:    "Mi Gente",
    artist:   "J Balvin, Willy William",
    cover:    "https://i1.sndcdn.com/artworks-000283629944-3i7bfp-t500x500.jpg",
    file:     "./Music/migente.mp3",
    category: "Reggaeton",
    duration: "3:07"
  },
  {
    type:     "music",
    title:    "Fuera Del Planeta (Remix)",
    artist:   "Eloy, Jowell & Randy, Zion",
    cover:    "https://i.scdn.co/image/ab67616d0000b273da7076e371c7859fbb2e18fd",
    file:     "./Music/fueradelplaneta.mp3",
    category: "Reggaeton",
    duration: "3:42"
  },
  {
    type:     "music",
    title:    "Morado",
    artist:   "J Balvin",
    cover:    "https://images.genius.com/ace3305e3501f40ee3d52e48731096b6.1000x1000x1.png",
    file:     "./Music/morado.mp3",
    category: "Reggaeton",
    duration: "3:52"
  },
  {
    type:     "music",
    title:    "Amarillo",
    artist:   "J Balvin",
    cover:    "https://images.genius.com/aa0eab4478dec1d231a5b96909f9b7d4.1000x1000x1.jpg",
    file:     "./Music/amarillo.mp3",
    category: "Reggaeton",
    duration: "2:47"
  },
  {
    type:     "music",
    title:    "Me Rehúso",
    artist:   "Danny Ocean",
    cover:    "https://cdn-images.dzcdn.net/images/cover/2312f5f5d53b0fb5238a4bc58d2f6cf6/1900x1900-000000-81-0-0.jpg",
    file:     "./Music/merehuso.mp3",
    category: "Reggaeton",
    duration: "3:25"
  },
  {
    type:     "music",
    title:    "NUBES",
    artist:   "De La Rose, Omar Courtz",
    cover:    "https://m.media-amazon.com/images/I/51qeKvk9ilL._UXNaN_FMjpg_QL85_.jpg",
    file:     "./Music/nubes.mp3",
    category: "Reggaeton",
    duration: "4:31"
  },
  {
    type:     "music",
    title:    "MODELITO",
    artist:   "Mora, YOVNGCHIMI",
    cover:    "https://i.scdn.co/image/ab67616d0000b2732a5c6164e8743597f44b645e",
    file:     "./Music/modelito.mp3",
    category: "Reggaeton",
    duration: "3:10"
  },
  {
    type:     "music",
    title:    "FLIPA",
    artist:   "JC REYES, DEI V",
    cover:    "https://i.scdn.co/image/ab67616d0000b2739d8645e943c9c45d66da0d7c",
    file:     "./Music/flipa.mp3",
    category: "Reggaeton",
    duration: "2:45"
  },
  {
    type:     "music",
    title:    "Me Mareo",
    artist:   "Kidd Voodoo, JC Reyes",
    cover:    "https://m.media-amazon.com/images/I/511UiqJjmZL._UXNaN_FMjpg_QL85_.jpg",
    file:     "./Music/memareo.mp3",
    category: "Reggaeton",
    duration: "3:06"
  },
  {
    type:     "music",
    title:    "Lo Que Tiene",
    artist:   "Morad, Beny Jr, Rvfv",
    cover:    "https://i.scdn.co/image/ab67616d0000b27345e6bba1ac0c5b54a9ee8121",
    file:     "./Music/loquetiene.mp3",
    category: "Reggaeton",
    duration: "4:19"
  },
  {
    type:     "music",
    title:    "El Conjuntito",
    artist:   "El Bobe, Omar Montes",
    cover:    "https://i.scdn.co/image/ab67616d0000b273412a45f6d65252ae3d1fac4c",
    file:     "./Music/elconjuntito.mp3",
    category: "Reggaeton",
    duration: "2:37"
  },
  {
    type:     "music",
    title:    "X (Remix)",
    artist:   "Nicky Jam, J Balvin, Ozuna, Maluma",
    cover:    "https://i.scdn.co/image/ab67616d0000b2738e17b8d0bf76a205bba297bd",
    file:     "./Music/xremix.mp3",
    category: "Reggaeton",
    duration: "3:55"
  },
  {
    type:     "music",
    title:    "Manos Rotas",
    artist:   "DELLAFUENTE, Morad",
    cover:    "https://i.scdn.co/image/ab67616d0000b2731a176de75067ededc26ad96d",
    file:     "./Music/manosrotas.mp3",
    category: "Reggaeton",
    duration: "2:45"
  },
  {
    type:     "music",
    title:    "KOKO",
    artist:   "Omar Courtz",
    cover:    "https://images.genius.com/f201d42444f05535e679524c12538736.1000x1000x1.png",
    file:     "./Music/koko.mp3",
    category: "Reggaeton",
    duration: "3:16"
  },
    {
    type:     "music",
    title:    "Y Que Fue?",
    artist:   "Don Miguelo",
    cover:    "https://i.ytimg.com/vi/16nZ6K7sim4/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgWyhLMA8=&rs=AOn4CLAm5BKIjd4rwtUHQHFpRU5wZArpbA",
    file:     "./Music/yquefue.mp3",
    category: "Reggaeton",
    duration: "2:43"
  },
    {
    type:     "music",
    title:    "Gata Only",
    artist:   "FloyyMenor, Cris MJ",
    cover:    "https://i.scdn.co/image/ab67616d0000b273c4583f3ad76630879a75450a",
    file:     "./Music/gataonly.mp3",
    category: "Reggaeton",
    duration: "3:42"
  },
    {
    type:     "music",
    title:    "FOREVER TU GANTEL",
    artist:   "Omar Courtz, Ñengo Flow",
    cover:    "https://m.media-amazon.com/images/I/41Qlx8iByTL._UXNaN_FMjpg_QL85_.jpg",
    file:     "./Music/forevertugantel.mp3",
    category: "Reggaeton",
    duration: "3:46"
  },
    {
    type:     "music",
    title:    "NINFO",
    artist:   "JC Reyes, De La Rose, MC Menor JP",
    cover:    "https://images.genius.com/60b39231e971719e4c609413d5bcc851.1000x1000x1.png",
    file:     "./Music/ninfo.mp3",
    category: "Reggaeton",
    duration: "3:04"
  },
    {
    type:     "music",
    title:    "China",
    artist:   "Anuel AA, Karol G, J. Balvin, Daddy Yankee, Ozuna",
    cover:    "https://i.scdn.co/image/ab67616d0000b2735fa6dc9fc261344044c301a9",
    file:     "./Music/china.mp3",
    category: "Reggaeton",
    duration: "4:55"
  },
    {
    type:     "music",
    title:    "Gasolina",
    artist:   "Daddy Yankee",
    cover:    "https://i.scdn.co/image/ab67616d0000b2734f15e5871e85d1da64024c3d",
    file:     "./Music/gasolina.mp3",
    category: "Reggaeton",
    duration: "3:12"
  },
    {
    type:     "music",
    title:    "Mayores",
    artist:   "Becky G, Bad Bunny",
    cover:    "https://cdn-images.dzcdn.net/images/cover/b6d13738038b285630370f5be059380f/0x1900-000000-80-0-0.jpg",
    file:     "./Music/mayores.mp3",
    category: "Reggaeton",
    duration: "3:21"
  },
    {
    type:     "music",
    title:    "Sin Pijama",
    artist:   "Becky G, Natti Natasha",
    cover:    "https://i.scdn.co/image/ab67616d0000b273d7ce6f9b0a15181635a933d9",
    file:     "./Music/sinpijama.mp3",
    category: "Reggaeton",
    duration: "3:08"
  },
    {
    type:     "music",
    title:    "Moulaga",
    artist:   "Heuss L'enfoiré, JuL",
    cover:    "https://m.media-amazon.com/images/I/51QolFGPe7L._UXNaN_FMjpg_QL85_.jpg",
    file:     "./Music/moulaga.mp3",
    category: "Reggaeton",
    duration: "2:56"
  },
    {
    type:     "music",
    title:    "MALA",
    artist:   "6ix9ine, Anuel AA",
    cover:    "https://i1.sndcdn.com/artworks-000447592197-j0yaci-large.jpg",
    file:     "./Music/mala.mp3",
    category: "Reggaeton",
    duration: "3:26"
  },
    {
    type:     "music",
    title:    "Downtown",
    artist:   "Anitta, J Balvin",
    cover:    "https://i.scdn.co/image/ab67616d0000b2738c6b830c36c7b4ac43c3cee8",
    file:     "./Music/downtown.mp3",
    category: "Reggaeton",
    duration: "3:19"
  },
   {
    type:     "music",
    title:    "Ram Pam Pam",
    artist:   "Natti Natasha, Becky G",
    cover:    "https://linkstorage.linkfire.com/medialinks/images/446136ec-c173-43e7-9612-94c1829582a3/artwork-440x440.jpg",
    file:     "./Music/rampampam.mp3",
    category: "Reggaeton",
    duration: "3:38"
  },
   {
    type:     "music",
    title:    "La Gozadera",
    artist:   "Gente De Zona, Marc Anthony",
    cover:    "https://images.genius.com/cf43fd45336758c065537970f6a79f96.1000x1000x1.jpg",
    file:     "./Music/lagozadera.mp3",
    category: "Reggaeton",
    duration: "3:23"
  },
   {
    type:     "music",
    title:    "BAILE INoLVIDABLE",
    artist:   "BAD BUNNY",
    cover:    "https://i.scdn.co/image/ab67616d0000b273bbd45c8d36e0e045ef640411",
    file:     "./Music/baileinolvidable.mp3",
    category: "Reggaeton",
    duration: "6:18"
  },
   {
    type:     "music",
    title:    "Con Altura",
    artist:   "ROSALÍA, J Balvin, El Guincho",
    cover:    "https://images.genius.com/a8b0efd41e6a43091837da78850cf312.1000x1000x1.png",
    file:     "./Music/conaltura.mp3",
    category: "Reggaeton",
    duration: "2:44"
  },
   {
    type:     "music",
    title:    "La Bicicleta",
    artist:   "Carlos Vives, Shakira",
    cover:    "https://i.scdn.co/image/ab67616d0000b273e588b4129b0afd8595ac55b0",
    file:     "./Music/labicicleta.mp3",
    category: "Reggaeton",
    duration: "3:46"
  },
   {
    type:     "music",
    title:    "NUEVAYoL",
    artist:   "BAD BUNNY",
    cover:    "https://i.scdn.co/image/ab67616d0000b273bbd45c8d36e0e045ef640411",
    file:     "./Music/nuevayol.mp3",
    category: "Reggaeton",
    duration: "3:43"
  },
   {
    type:     "music",
    title:    "Singapur (Remix)",
    artist:   "El Alfa, Farruko, Myke Towers, Justin Quiles, Chencho Corleone",
    cover:    "https://i.scdn.co/image/ab67616d0000b273c32233e3541a756a90880fb1",
    file:     "./Music/singapur.mp3",
    category: "Reggaeton",
    duration: "4:50"
  },
   {
    type:     "music",
    title:    "Azul",
    artist:   "J Balvin",
    cover:    "https://www.lahiguera.net/musicalia/artistas/j_balvin/disco/10426/tema/23157/j_balvin_azul-portada.jpg",
    file:     "./Music/azul.mp3",
    category: "Reggaeton",
    duration: "3:55"
  },
   {
    type:     "music",
    title:    "Lola",
    artist:   "Jedis, Gote, Nolep",
    cover:    "https://i.scdn.co/image/ab67616d00001e02fb1041333d9a712a182acfa0",
    file:     "./Music/lola.mp3",
    category: "Reggaeton",
    duration: "4:23"
  },
   {
    type:     "music",
    title:    "Thalía (Remix)",
    artist:   "Cyril Kamer, Rvfv, Polimá Westcoast",
    cover:    "https://i.scdn.co/image/ab67616d0000b2733e242bdd9632c6a49a693b1b",
    file:     "./Music/thaliaremix.mp3",
    category: "Reggaeton",
    duration: "3:50"
  },
    {
    type:     "music",
    title:    "DAVID GUETTA MASHUP",
    artist:   "David Guetta",
    cover:    "https://i.ytimg.com/vi/UhBfoDqaOhk/maxresdefault.jpg",
    file:     "./Music/davidguettamashup.mp3",
    category: "Electronic",
    duration: "2:42"
  },
   




































];

/* ══════════════════════════════════════════════════════
   2. STATE
══════════════════════════════════════════════════════ */
let currentFilter   = "all";
let currentSearch   = "";
let currentTrackIdx = -1;
let isPlaying       = false;
let playlist        = [];
let shuffleMode     = false;
let repeatMode      = false;
let likedTracks     = new Set();

/* ══════════════════════════════════════════════════════
   3. DOM REFS — mapeados al HTML nuevo
══════════════════════════════════════════════════════ */
// Audio
const audioEl         = document.getElementById("mainAudio");

// Pages
const pagesContainer  = document.getElementById("pagesContainer");
const pageHome        = document.getElementById("pageHome");
const pageSearch      = document.getElementById("pageSearch");
const pageLibrary     = document.getElementById("pageLibrary");

// Home grid
const mediaGrid       = document.getElementById("mediaGrid");
const catInner        = document.getElementById("catInner");
const sectionTitle    = document.getElementById("sectionTitle");
const countBadge      = document.getElementById("countBadge");
const heroExplore     = document.getElementById("heroExplore");
const gridSection     = document.getElementById("gridSection");

// Sheet player (now playing)
const nowPlayingSheet = document.getElementById("nowPlayingSheet");
const sheetClose      = document.getElementById("sheetClose");
const sheetCover      = document.getElementById("sheetCover");
const sheetCategory   = document.getElementById("sheetCategory");
const sheetTitle      = document.getElementById("sheetTitle");
const sheetArtist     = document.getElementById("sheetArtist");
const sheetHeart      = document.getElementById("sheetHeart");
const sheetPlay       = document.getElementById("sheetPlay");
const sheetPrev       = document.getElementById("sheetPrev");
const sheetNext       = document.getElementById("sheetNext");
const sheetShuffle    = document.getElementById("sheetShuffle");
const sheetRepeat     = document.getElementById("sheetRepeat");
const sheetBar        = document.getElementById("sheetBar");
const sheetFill       = document.getElementById("sheetFill");
const sheetThumb      = document.getElementById("sheetThumb");
const sheetCurrent    = document.getElementById("sheetCurrent");
const sheetDuration   = document.getElementById("sheetDuration");
const volSlider       = document.getElementById("volSlider");

// Mini player
const miniPlayer      = document.getElementById("miniPlayer");
const miniPlayerExpand= document.getElementById("miniPlayerExpand");
const miniCover       = document.getElementById("miniCover");
const miniTitle       = document.getElementById("miniTitle");
const miniArtist      = document.getElementById("miniArtist");
const miniPlay        = document.getElementById("miniPlay");
const miniNext        = document.getElementById("miniNext");
const miniProgressFill= document.getElementById("miniProgressFill");

// Search page
const searchInput     = document.getElementById("searchInput");
const searchClear     = document.getElementById("searchClear");
const searchBrowse    = document.getElementById("searchBrowse");
const searchResults   = document.getElementById("searchResults");
const genreGrid       = document.getElementById("genreGrid");

// Library page
const libraryList     = document.getElementById("libraryList");

// Bottom nav
const bottomNav       = document.getElementById("bottomNav");

// Topbar search btn
const topbarSearchBtn = document.getElementById("topbarSearchBtn");

/* ══════════════════════════════════════════════════════
   4. HELPERS
══════════════════════════════════════════════════════ */
function getCategories() {
  return [...new Set(media.map(m => m.category))].sort();
}

function filteredMedia() {
  return media.filter(item => {
    const matchFilter =
      currentFilter === "all"   ? true :
      currentFilter === "music" ? item.type === "music" :
      currentFilter === "video" ? item.type === "video" :
      item.category.toLowerCase() === currentFilter.toLowerCase();

    const q = currentSearch.toLowerCase().trim();
    const matchSearch = q === "" || [item.title, item.artist, item.category].some(s =>
      s.toLowerCase().includes(q)
    );

    return matchFilter && matchSearch;
  });
}

function formatTime(sec) {
  if (isNaN(sec) || !isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getPlaceholderCover(category = "music") {
  const colors = {
    Reggaeton: "#e94f4f", Electronic: "#1db954", "Dance-Pop": "#1f77b4",
    "90s": "#d62728", Jazz: "#9467bd", "Lo-Fi": "#2ca02c",
    House: "#ff1493", "Hip-Hop": "#1a1a2e"
  };
  const bg = colors[category] || "#e94f4f";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="${bg}" width="400" height="400"/><text x="50%" y="50%" font-size="80" text-anchor="middle" dominant-baseline="middle" fill="white" opacity=".35">♪</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function updatePlayIcons(playing) {
  // Sheet player icons
  const iconPlay  = sheetPlay.querySelector(".icon-play");
  const iconPause = sheetPlay.querySelector(".icon-pause");
  if (iconPlay)  iconPlay.style.display  = playing ? "none" : "";
  if (iconPause) iconPause.style.display = playing ? "" : "none";

  // Mini player icons
  const mIconPlay  = miniPlay.querySelector(".icon-play");
  const mIconPause = miniPlay.querySelector(".icon-pause");
  if (mIconPlay)  mIconPlay.style.display  = playing ? "none" : "";
  if (mIconPause) mIconPause.style.display = playing ? "" : "none";
}

/* ══════════════════════════════════════════════════════
   5. PAGES NAVIGATION
══════════════════════════════════════════════════════ */
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById(pageId);
  if (target) target.classList.add("active");

  bottomNav.querySelectorAll(".bnav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.page === pageId);
  });
}

bottomNav.querySelectorAll(".bnav-btn").forEach(btn => {
  btn.addEventListener("click", () => showPage(btn.dataset.page));
});

// Topbar search → ir a search page
topbarSearchBtn.addEventListener("click", () => showPage("pageSearch"));

/* ══════════════════════════════════════════════════════
   6. BUILD HOME GRID
══════════════════════════════════════════════════════ */
function buildCategoryPills() {
  // Keep the "Todo" pill, remove extras
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

function renderGrid() {
  const items = filteredMedia();
  mediaGrid.innerHTML = "";
  playlist = media.filter(m => m.type === "music");

  const labels = { all: "Todo el contenido", music: "Música", video: "Vídeos" };
  sectionTitle.textContent = labels[currentFilter] || currentFilter;
  countBadge.textContent = `${items.length} item${items.length !== 1 ? "s" : ""}`;

  if (items.length === 0) {
    mediaGrid.innerHTML = `<div class="no-results fade-in"><h3>Sin resultados</h3><p>Prueba con otro término o categoría.</p></div>`;
    return;
  }

  items.forEach(item => {
    const cover = item.cover || getPlaceholderCover(item.category);
    const card = document.createElement("div");
    card.className = "media-card fade-in";

    card.innerHTML = `
      <div class="card-cover">
        <img src="${cover}" alt="${item.title}" loading="lazy"
          onerror="this.src='${getPlaceholderCover(item.category)}'" />
        <div class="card-play-overlay">
          <div class="play-circle">
            <svg viewBox="0 0 24 24" style="fill:currentColor;stroke:none"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>
      </div>
      <div class="card-body">
        <p class="card-category">${item.category}</p>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-artist">${item.artist}</p>
      </div>
      <div class="card-footer">
        <button class="card-play-btn">
          <svg viewBox="0 0 24 24" style="fill:currentColor;stroke:none"><polygon points="5,3 19,12 5,21"/></svg>
          Escuchar
        </button>
        ${item.duration ? `<span class="card-dur">${item.duration}</span>` : ""}
      </div>`;

    card.querySelector(".card-play-btn").addEventListener("click", e => {
      e.stopPropagation();
      loadTrack(item);
    });
    card.addEventListener("click", () => loadTrack(item));

    mediaGrid.appendChild(card);
  });
}

/* ══════════════════════════════════════════════════════
   7. LOAD TRACK → mini player + sheet
══════════════════════════════════════════════════════ */
function loadTrack(item) {
  if (item.type !== "music") return;

  const cover = item.cover || getPlaceholderCover(item.category);

  // Update playlist index
  playlist = media.filter(m => m.type === "music");
  currentTrackIdx = playlist.findIndex(p => p.title === item.title && p.artist === item.artist);

  // — Mini player —
  miniCover.src = cover;
  miniTitle.textContent = item.title;
  miniArtist.textContent = item.artist;
  miniPlayer.classList.add("visible");

  // — Sheet player —
  sheetCover.src = cover;
  sheetCategory.textContent = item.category;
  sheetTitle.textContent = item.title;
  sheetArtist.textContent = item.artist;

  // Heart state
  sheetHeart.classList.toggle("liked", likedTracks.has(item.title));

  // — Audio —
  audioEl.src = item.file;
  audioEl.load();
  audioEl.play()
    .then(() => {
      isPlaying = true;
      updatePlayIcons(true);
      setupMediaSession(item);
    })
    .catch(err => {
      isPlaying = false;
      updatePlayIcons(false);
      console.warn(`[DROPLY] No se pudo reproducir: "${item.file}"`, err);
    });
}

/* ══════════════════════════════════════════════════════
   8. SHEET PLAYER CONTROLS
══════════════════════════════════════════════════════ */
// Open sheet on mini player tap
miniPlayerExpand.addEventListener("click", () => {
  nowPlayingSheet.classList.add("open");
});

// Close sheet
sheetClose.addEventListener("click", () => {
  nowPlayingSheet.classList.remove("open");
});

// Play / Pause
sheetPlay.addEventListener("click", togglePlay);
miniPlay.addEventListener("click", togglePlay);

function togglePlay() {
  if (!audioEl.src) return;
  if (audioEl.paused) {
    audioEl.play().then(() => { isPlaying = true; updatePlayIcons(true); });
  } else {
    audioEl.pause();
    isPlaying = false;
    updatePlayIcons(false);
  }
}

// Prev
sheetPrev.addEventListener("click", () => {
  if (playlist.length === 0) return;
  currentTrackIdx = (currentTrackIdx - 1 + playlist.length) % playlist.length;
  loadTrack(playlist[currentTrackIdx]);
});

// Next
sheetNext.addEventListener("click", playNext);
miniNext.addEventListener("click", playNext);

function playNext() {
  if (playlist.length === 0) return;
  if (shuffleMode) {
    currentTrackIdx = Math.floor(Math.random() * playlist.length);
  } else {
    currentTrackIdx = (currentTrackIdx + 1) % playlist.length;
  }
  loadTrack(playlist[currentTrackIdx]);
}

// Shuffle
sheetShuffle.addEventListener("click", () => {
  shuffleMode = !shuffleMode;
  sheetShuffle.classList.toggle("active", shuffleMode);
});

// Repeat
sheetRepeat.addEventListener("click", () => {
  repeatMode = !repeatMode;
  sheetRepeat.classList.toggle("active", repeatMode);
});

// Heart / like
sheetHeart.addEventListener("click", () => {
  const title = sheetTitle.textContent;
  if (likedTracks.has(title)) {
    likedTracks.delete(title);
    sheetHeart.classList.remove("liked");
  } else {
    likedTracks.add(title);
    sheetHeart.classList.add("liked");
  }
});

// Volume
volSlider.addEventListener("input", () => {
  audioEl.volume = volSlider.value;
});

// Progress bar — sheet
sheetBar.addEventListener("click", e => {
  const rect = sheetBar.getBoundingClientRect();
  const pct  = (e.clientX - rect.left) / rect.width;
  if (audioEl.duration) audioEl.currentTime = pct * audioEl.duration;
});

// Touch drag on progress bar
let dragging = false;
sheetBar.addEventListener("touchstart", () => { dragging = true; }, { passive: true });
sheetBar.addEventListener("touchmove", e => {
  if (!dragging) return;
  const rect = sheetBar.getBoundingClientRect();
  const pct  = Math.max(0, Math.min(1, (e.touches[0].clientX - rect.left) / rect.width));
  if (audioEl.duration) audioEl.currentTime = pct * audioEl.duration;
}, { passive: true });
sheetBar.addEventListener("touchend", () => { dragging = false; }, { passive: true });

/* ══════════════════════════════════════════════════════
   9. AUDIO EVENTS
══════════════════════════════════════════════════════ */
audioEl.addEventListener("timeupdate", () => {
  if (!audioEl.duration) return;
  const pct = (audioEl.currentTime / audioEl.duration) * 100;

  // Sheet progress
  sheetFill.style.width  = pct + "%";
  sheetThumb.style.left  = pct + "%";
  sheetCurrent.textContent  = formatTime(audioEl.currentTime);
  sheetDuration.textContent = formatTime(audioEl.duration);

  // Mini player progress line
  miniProgressFill.style.width = pct + "%";

  // Lock screen progress bar
  if ("mediaSession" in navigator) {
    try {
      navigator.mediaSession.setPositionState({
        duration:     audioEl.duration,
        playbackRate: audioEl.playbackRate,
        position:     audioEl.currentTime
      });
    } catch (_) {}
  }
});

audioEl.addEventListener("ended", () => {
  if (repeatMode) {
    audioEl.currentTime = 0;
    audioEl.play();
  } else {
    playNext();
  }
});

audioEl.addEventListener("play",  () => { isPlaying = true;  updatePlayIcons(true);  });
audioEl.addEventListener("pause", () => { isPlaying = false; updatePlayIcons(false); });

/* ══════════════════════════════════════════════════════
   10. SEARCH PAGE
══════════════════════════════════════════════════════ */
function buildGenreGrid() {
  const colors = ["#e94f4f","#1db954","#1f77b4","#d62728","#9467bd","#ff7f0e","#2ca02c","#ff1493"];
  getCategories().forEach((cat, i) => {
    const btn = document.createElement("button");
    btn.className = "genre-pill";
    btn.style.background = colors[i % colors.length];
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      currentFilter = cat;
      showPage("pageHome");
      catInner.querySelectorAll(".cat-pill").forEach(p => {
        p.classList.toggle("active", p.dataset.cat === cat);
      });
      renderGrid();
    });
    genreGrid.appendChild(btn);
  });
}

let searchTimeout;
searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim();
  searchClear.style.display = q ? "" : "none";

  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    if (!q) {
      searchBrowse.style.display = "";
      searchResults.style.display = "none";
      searchResults.innerHTML = "";
      return;
    }
    searchBrowse.style.display = "none";
    searchResults.style.display = "";

    const results = media.filter(item =>
      [item.title, item.artist, item.category].some(s =>
        s.toLowerCase().includes(q.toLowerCase())
      )
    );

    if (results.length === 0) {
      searchResults.innerHTML = `<div class="no-results"><p>Sin resultados para "<strong>${q}</strong>"</p></div>`;
      return;
    }

    searchResults.innerHTML = "";
    results.forEach(item => {
      const cover = item.cover || getPlaceholderCover(item.category);
      const row = document.createElement("div");
      row.className = "search-result-row";
      row.innerHTML = `
        <img src="${cover}" alt="${item.title}" onerror="this.src='${getPlaceholderCover(item.category)}'" />
        <div class="search-result-info">
          <span class="search-result-title">${item.title}</span>
          <span class="search-result-artist">${item.artist}</span>
        </div>
        <span class="search-result-cat">${item.category}</span>`;
      row.addEventListener("click", () => {
        loadTrack(item);
        showPage("pageHome");
      });
      searchResults.appendChild(row);
    });
  }, 220);
});

searchClear.addEventListener("click", () => {
  searchInput.value = "";
  searchClear.style.display = "none";
  searchBrowse.style.display = "";
  searchResults.style.display = "none";
  searchResults.innerHTML = "";
});

/* ══════════════════════════════════════════════════════
   11. LIBRARY PAGE
══════════════════════════════════════════════════════ */
function renderLibrary(filter = "all") {
  libraryList.innerHTML = "";
  const items = filter === "all"
    ? media.filter(m => m.type === "music")
    : media.filter(m => m.type === "music" && m.category === filter);

  items.forEach(item => {
    const cover = item.cover || getPlaceholderCover(item.category);
    const row = document.createElement("div");
    row.className = "library-row";
    row.innerHTML = `
      <img src="${cover}" alt="${item.title}" onerror="this.src='${getPlaceholderCover(item.category)}'" />
      <div class="library-row-info">
        <span class="library-row-title">${item.title}</span>
        <span class="library-row-artist">${item.artist}</span>
      </div>
      <span class="library-row-dur">${item.duration || ""}</span>`;
    row.addEventListener("click", () => {
      loadTrack(item);
      showPage("pageHome");
    });
    libraryList.appendChild(row);
  });
}

document.querySelectorAll(".lib-filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".lib-filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderLibrary(btn.dataset.lib);
  });
});

/* ══════════════════════════════════════════════════════
   12. HERO BUTTON
══════════════════════════════════════════════════════ */
heroExplore.addEventListener("click", () => {
  gridSection.scrollIntoView({ behavior: "smooth" });
});

/* ══════════════════════════════════════════════════════
   13. MEDIA SESSION (pantalla apagada / auriculares)
══════════════════════════════════════════════════════ */
function setupMediaSession(item) {
  if (!("mediaSession" in navigator)) return;
  const cover = item.cover || getPlaceholderCover(item.category);
  navigator.mediaSession.metadata = new MediaMetadata({
    title:   item.title,
    artist:  item.artist,
    album:   item.category,
    artwork: [96, 128, 192, 256, 384, 512].map(s => ({
      src: cover, sizes: `${s}x${s}`, type: "image/jpeg"
    }))
  });
  navigator.mediaSession.setActionHandler("play",          () => audioEl.play());
  navigator.mediaSession.setActionHandler("pause",         () => audioEl.pause());
  navigator.mediaSession.setActionHandler("previoustrack", () => sheetPrev.click());
  navigator.mediaSession.setActionHandler("nexttrack",     () => playNext());
  navigator.mediaSession.setActionHandler("seekbackward",  ({ seekOffset }) => {
    audioEl.currentTime = Math.max(0, audioEl.currentTime - (seekOffset ?? 10));
  });
  navigator.mediaSession.setActionHandler("seekforward",   ({ seekOffset }) => {
    audioEl.currentTime = Math.min(audioEl.duration, audioEl.currentTime + (seekOffset ?? 10));
  });
  navigator.mediaSession.setActionHandler("seekto",        ({ seekTime }) => {
    audioEl.currentTime = seekTime;
  });
}

/* ══════════════════════════════════════════════════════
   14. KEYBOARD SHORTCUTS
══════════════════════════════════════════════════════ */
document.addEventListener("keydown", e => {
  if (document.activeElement.tagName === "INPUT") return;
  if (e.key === " ") { e.preventDefault(); togglePlay(); }
  if (e.key === "Escape") nowPlayingSheet.classList.remove("open");
  if (e.key === "ArrowRight") playNext();
  if (e.key === "ArrowLeft")  sheetPrev.click();
});

/* ══════════════════════════════════════════════════════
   15. TOPBAR SCROLL EFFECT
══════════════════════════════════════════════════════ */
window.addEventListener("scroll", () => {
  document.getElementById("topbar").classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

/* ══════════════════════════════════════════════════════
   16. CSS HELPERS — inject missing styles if needed
   (search results, library rows, genre pills, liked heart)
══════════════════════════════════════════════════════ */
(function injectDynamicStyles() {
  const style = document.createElement("style");
  style.textContent = `
    /* Genre pills in search */
    .genre-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: .75rem; padding: 1rem; }
    .genre-pill {
      padding: 1.4rem 1rem; border-radius: 10px; font-size: .9rem;
      font-weight: 600; color: #fff; text-align: left; cursor: pointer;
      transition: opacity .18s;
    }
    .genre-pill:hover { opacity: .85; }

    /* Search result rows */
    .search-result-row {
      display: flex; align-items: center; gap: .9rem;
      padding: .7rem 1rem; cursor: pointer; border-radius: 8px;
      transition: background .15s;
    }
    .search-result-row:hover { background: rgba(255,255,255,.05); }
    .search-result-row img { width: 48px; height: 48px; border-radius: 6px; object-fit: cover; flex-shrink:0; }
    .search-result-info { flex: 1; min-width: 0; }
    .search-result-title { display: block; font-size: .9rem; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .search-result-artist { display: block; font-size: .78rem; color: var(--text-mid); }
    .search-result-cat { font-size: .72rem; color: var(--accent); background: var(--accent-glow); padding: .2rem .5rem; border-radius: 99px; white-space: nowrap; }

    /* Library rows */
    .library-row {
      display: flex; align-items: center; gap: .9rem;
      padding: .7rem 1rem; cursor: pointer; border-radius: 8px;
      transition: background .15s;
    }
    .library-row:hover { background: rgba(255,255,255,.05); }
    .library-row img { width: 52px; height: 52px; border-radius: 6px; object-fit: cover; flex-shrink:0; }
    .library-row-info { flex: 1; min-width: 0; }
    .library-row-title { display: block; font-size: .9rem; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .library-row-artist { display: block; font-size: .78rem; color: var(--text-mid); }
    .library-row-dur { font-size: .78rem; color: var(--text-soft); flex-shrink:0; }

    /* Liked heart */
    .sheet-heart.liked svg { fill: var(--accent); stroke: var(--accent); }

    /* Shuffle / repeat active */
    .sheet-ctrl-btn.active svg { stroke: var(--accent); }

    /* Mini player visible */
    .mini-player.visible { transform: translateY(0); }

    /* Sheet open */
    .now-playing-sheet.open { transform: translateY(0) !important; }

    /* No results */
    .no-results { text-align: center; padding: 3rem 1rem; color: var(--text-mid); }
    .no-results h3 { margin-bottom: .4rem; }

    /* Fade-in */
    .fade-in { animation: fadeInUp .3s ease both; }
    @keyframes fadeInUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  `;
  document.head.appendChild(style);
})();

/* ══════════════════════════════════════════════════════
   17. INIT
══════════════════════════════════════════════════════ */
(function init() {
  playlist = media.filter(m => m.type === "music");
  buildCategoryPills();
  renderGrid();
  buildGenreGrid();
  renderLibrary();
})();
