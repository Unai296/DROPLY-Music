/* ═══════════════════════════════════════════════════════════
   DROPLY — script.js  v4 ENHANCED
   Funciones: Cola · Playlists · Historial · Crossfade
              Toasts · Context Menu · Favorites · Shuffle/Repeat
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
    artist:   "Omar Courtz",
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
    {
    type:     "music",
    title:    "Sientate en Ese Deo",
    artist:   "El Alfa",
    cover:    "https://images.genius.com/6898ac4006eb392cc4c2fe4429fb3c57.597x597x1.png",
    file:     "./Music/sientateenesedeo.mp3",
    category: "Reggaeton",
    duration: "4:42"
  },
    {
    type:     "music",
    title:    "La Gerencia",
    artist:   "Tito El Bambino, Fronti, Wisin, Hanzel La H, Arcángel",
    cover:    "https://akamai.sscdn.co/uploadfile/letras/albuns/b/3/4/0/4332821765558369.jpg",
    file:     "./Music/lagerencia.mp3",
    category: "Reggaeton",
    duration: "5:00"
  },
    {
    type:     "music",
    title:    "Dembow y Reggaeton",
    artist:   "El Alfa, Yandel, Myke Towers",
    cover:    "https://i.scdn.co/image/ab67616d0000b273c4e2ae0d7a6ba307bdd3cc0d",
    file:     "./Music/dembowyreggaeton.mp3",
    category: "Reggaeton",
    duration: "4:11"
  },
    {
    type:     "music",
    title:    "BESALO",
    artist:   "EL ALFA, Rauw Alejandro",
    cover:    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMVwbetQqCv73bf6t9mP31J9CucAlGW_k8YA&s",
    file:     "./Music/besalo.mp3",
    category: "Reggaeton",
    duration: "2:43"
  },
   {
    type:     "music",
    title:    "Caile",
    artist:   "Luar La L",
    cover:    "https://i.scdn.co/image/ab67616d0000b27305c2cc3e87e9aa15d9db3dd9",
    file:     "./Music/caile.mp3",
    category: "Reggaeton",
    duration: "2:21"
  },
   {
    type:     "music",
    title:    "No Me Conoce (Remix)",
    artist:   "Jhay Cortez, J. Balvin, Bad Bunny",
    cover:    "https://images.genius.com/2115ebd8003b44a027daa8d52cbcf08c.1000x1000x1.png",
    file:     "./Music/nomeconoceremix.mp3",
    category: "Reggaeton",
    duration: "5:05"
  },
 {
    type:     "music",
    title:    "Soltera (Remix)",
    artist:   "Lunay, Daddy Yankee, Bad Bunny",
    cover:    "https://i.scdn.co/image/ab67616d0000b27358e34ee7bc215e1b03ff78d4",
    file:     "./Music/solteraremix.mp3",
    category: "Reggaeton",
    duration: "4:25"
  },
 {
    type:     "music",
    title:    "Q U E V A S H A C E R H O Y ?",
    artist:   "Omar Courtz, De La Rose",
    cover:    "https://cdn-images.dzcdn.net/images/cover/bafa3d3f485cf157d393eb84f7db9f71/500x500.jpg",
    file:     "./Music/q_u_e_v_a_s_h_a_c_e_r_h_o_y.mp3",
    category: "Reggaeton",
    duration: "3:44"
  },
 {
    type:     "music",
    title:    "Hola Señorita",
    artist:   "GIMS, Maluma",
    cover:    "https://m.media-amazon.com/images/M/MV5BZDI1NzIxMTctZTUxMi00NmY4LWEzODAtYWQ1NWEwMGE0MWFhXkEyXkFqcGc@._V1_QL75_UY190_CR31,0,190,190_.jpg",
    file:     "./Music/holaseñorita.mp3",
    category: "Reggaeton",
    duration: "3:33"
  },
   {
    type:     "music",
    title:    "MOTINHA 2.0 (Remix)",
    artist:   "Dennis DJ, Luísa Sonza, Emilia",
    cover:    "https://s.mxmcdn.net/images-storage/albums2/4/7/9/3/2/5/87523974_500_500.jpg",
    file:     "./Music/motinha.mp3",
    category: "Reggaeton",
    duration: "1:58"
  },
   {
    type:     "music",
    title:    "Si Se Da (Remix)",
    artist:   "Myke Towers, Farruko, Arcangel, Sech, Zion",
    cover:    "https://images.genius.com/eb6adbb6247e85fca2cc94fb9388fd3a.1000x1000x1.png",
    file:     "./Music/siseda.mp3",
    category: "Reggaeton",
    duration: "5:35"
  },
   {
    type:     "music",
    title:    "4K",
    artist:   "El Alfa, Darell, Noriel",
    cover:    "https://m.media-amazon.com/images/I/41H6GkRuYiL._UXNaN_FMjpg_QL85_.jpg",
    file:     "./Music/4k.mp3",
    category: "Reggaeton",
    duration: "3:35"
  },
   {
    type:     "music",
    title:    "Tusa",
    artist:   "KAROL G, Nicki Minaj",
    cover:    "https://upload.wikimedia.org/wikipedia/en/0/07/Karol_G_featuring_Nicki_Minaj_-_Tusa.png",
    file:     "./Music/tusa.mp3",
    category: "Reggaeton",
    duration: "3:23"
  },
   {
    type:     "music",
    title:    "La Forma En Que Me Miras",
    artist:   "Super Yei, Sammy, Myke Towers, Lenny Tavarez, Rafa Pabon",
    cover:    "https://i1.sndcdn.com/artworks-000384998541-nkcy6u-t500x500.jpg",
    file:     "./Music/laformaenquemiras.mp3",
    category: "Reggaeton",
    duration: "5:03"
  },
   {
    type:     "music",
    title:    "Superman Sin Capa",
    artist:   "El Alfa",
    cover:    "https://m.media-amazon.com/images/I/519xrzwtqjL._UXNaN_FMjpg_QL85_.jpg",
    file:     "./Music/supermansincapa.mp3",
    category: "Reggaeton",
    duration: "3:50"
  },
   {
    type:     "music",
    title:    "Cuando No Era Cantante (Remix)",
    artist:   "El Bogueto, Anuel AA, Fuerza Regida, Yung Beef",
    cover:    "https://cdn-images.dzcdn.net/images/cover/e62f70e7b366e618da1cbf0eed47de8c/0x1900-000000-80-0-0.jpg",
    file:     "./Music/cuandonoeracantante.mp3",
    category: "Reggaeton",
    duration: "5:27"
  },
   {
    type:     "music",
    title:    "Ya No Tiene Novio",
    artist:   "Sebastián Yatra, Mau, Ricky",
    cover:    "https://i.scdn.co/image/ab67616d0000b273f89d8cc59e29c9d2f846e903",
    file:     "./Music/yanotienenovio.mp3",
    category: "Reggaeton",
    duration: "4:07"
  },
  {
    type:     "music",
    title:    "TALENTO",
    artist:   "YAN BLOCK",
    cover:    "https://images.genius.com/d96f36811a933372f0199ecbaa890fef.1000x1000x1.png",
    file:     "./Music/talento.mp3",
    category: "Reggaeton",
    duration: "2:33"
  },
  {
    type:     "music",
    title:    "BIENVENIDA",
    artist:   "Clarent",
    cover:    "https://images.genius.com/4852cb7ec2963e5f72b1e8f87e8928e3.1000x1000x1.png",
    file:     "./Music/bienvenida.mp3",
    category: "Reggaeton",
    duration: "1:45"
  },
  {
    type:     "music",
    title:    "Secuestro",
    artist:   "SLAYTER, Yan Block, NTG",
    cover:    "https://m.media-amazon.com/images/I/61KjgepxdwL._UXNaN_FMjpg_QL85_.jpg",
    file:     "./Music/secuestro.mp3",
    category: "Reggaeton",
    duration: "3:14"
  },
  {
    type:     "music",
    title:    "YOGURCITO (REMIX)",
    artist:   "Blessd, Anuel AA, Yan Block, Luar La L, Kris R, ROA",
    cover:    "https://m.media-amazon.com/images/I/31P5CYOaluL._UXNaN_FMjpg_QL85_.jpg",
    file:     "./Music/yogurcito.mp3",
    category: "Reggaeton",
    duration: "6:15"
  },
  {
    type:     "music",
    title:    "X’CLUSIVO (REMIX)",
    artist:   "GONZY, SAIKO, ARCANGEL",
    cover:    "https://i.scdn.co/image/ab67616d0000b2735327757614a832374e491778",
    file:     "./Music/xclusivo.mp3",
    category: "Reggaeton",
    duration: "3:35"
  },
  {
    type:     "music",
    title:    "COOOK PARDON",
    artist:   "LVBEL C5, AKDO",
    cover:    "https://i.scdn.co/image/ab67616d0000b2738e675f63b19c17334f7d62d9",
    file:     "./Music/cookpardon.mp3",
    category: "Reggaeton",
    duration: "1:32"
  },
   {
    type:     "music",
    title:    "Be My Lover",
    artist:   "La Bouche",
    cover:    "https://i.scdn.co/image/ab67616d00001e0288b506a4908da817dcabd4f3",
    file:     "./Music/bemylover.mp3",
    category: "90s",
    duration: "3:42"
  },
   {
    type:     "music",
    title:    "Destination Calabria",
    artist:   "Alex Gaudino, Crystal Waters",
    cover:    "https://cdn-images.dzcdn.net/images/cover/3cd44e7420b88ced60beb8daea52b11a/0x1900-000000-80-0-0.jpg",
    file:     "./Music/destination.mp3",
    category: "90s",
    duration: "3:03"
  },
   {
    type:     "music",
    title:    "Happy Nation",
    artist:   "Ace of Base",
    cover:    "https://m.media-amazon.com/images/I/51z3joghdnL._UF894,1000_QL80_.jpg",
    file:     "./Music/happynation.mp3",
    category: "90s",
    duration: "3:31"
  },
   {
    type:     "music",
    title:    "Gimme! Gimme! Gimme!",
    artist:   "ABBA",
    cover:    "https://upload.wikimedia.org/wikipedia/en/a/a5/ABBA_-_Gimme%21_Gimme%21_Gimme%21_%28A_Man_After_Midnight%29.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
    file:     "./Music/gimme.mp3",
    category: "90s",
    duration: "3:16"
  },
   {
    type:     "music",
    title:    "Lay All Your Love On Me",
    artist:   "ABBA",
    cover:    "https://i.ebayimg.com/images/g/O4kAAOxydlFSxW0j/s-l400.jpg",
    file:     "./Music/layallyourloveonme.mp3",
    category: "90s",
    duration: "4:40"
  },
   {
    type:     "music",
    title:    "La Isla Bonita",
    artist:   "Madonna",
    cover:    "https://m.media-amazon.com/images/I/81Iv8WsxUwL._UF894,1000_QL80_.jpg",
    file:     "./Music/laIslabonita.mp3",
    category: "90s",
    duration: "4:01"
  },
   {
    type:     "music",
    title:    "The Rhythm of the Night",
    artist:   "Corona",
    cover:    "https://cdn-images.dzcdn.net/images/cover/b3442cde5c53baa308dd569b5dbd46c1/1900x1900-000000-81-0-0.jpg",
    file:     "./Music/therhythmoftthenight.mp3",
    category: "90s",
    duration: "3:46"
  },
   {
    type:     "music",
    title:    "Stereo Love",
    artist:   "Edward Maya, Vika Jigulina",
    cover:    "https://i.scdn.co/image/ab67616d0000b273edd7dc7bf5f7c39d3e132490",
    file:     "./Music/stereolove.mp3",
    category: "90s",
    duration: "3:06"
  },
   {
    type:     "music",
    title:    "Barbie Girl",
    artist:   "Aqua",
    cover:    "https://cdn-images.dzcdn.net/images/cover/eaf83c8d5d9d21d6ddd380222bc2fc72/1900x1900-000000-81-0-0.jpg",
    file:     "./Music/barbiegirl.mp3",
    category: "90s",
    duration: "3:21"
  },
     {
    type:     "music",
    title:    "Around the World",
    artist:   "A Touch Of Class",
    cover:    "https://i.scdn.co/image/ab67616d00001e020fe766b9ffa406173ada8747",
    file:     "./Music/aroundtheworld.mp3",
    category: "90s",
    duration: "3:35"
  },
     {
    type:     "music",
    title:    "What Is Love",
    artist:   "Haddaway",
    cover:    "https://upload.wikimedia.org/wikipedia/en/a/a8/HaddawayWhatIsLoveMaxiCDCover.jpg",
    file:     "./Music/whatislove.mp3",
    category: "90s",
    duration: "4:00"
  },
     {
    type:     "music",
    title:    "Stayin' Alive",
    artist:   "Bee Gees",
    cover:    "https://m.media-amazon.com/images/M/MV5BZmU5M2E3M2MtM2M5My00YTI2LThkNDktNjk5MGE2NzAxNTZlXkEyXkFqcGc@._V1_.jpg",
    file:     "./Music/stayinalive.mp3",
    category: "90s",
    duration: "4:09"
  },
     {
    type:     "music",
    title:    "I Was Made For Lovin' You",
    artist:   "Kiss",
    cover:    "https://i.discogs.com/ZDR0sVMA4m0HNMH-M1w8qfzxOX_9HL_t76I8QjohXcQ/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM2Njg0/NzEtMTMzOTYwMDc2/MS0zNDU2LmpwZWc.jpeg",
    file:     "./Music/iwasmadeforlovinyou.mp3",
    category: "90s",
    duration: "3:58"
  },
     {
    type:     "music",
    title:    "Don't Stop The Music",
    artist:   "Rihanna",
    cover:    "https://i.scdn.co/image/ab67616d0000b273f9f27162ab1ed45b8d7a7e98",
    file:     "./Music/dontstopthemusic.mp3",
    category: "Dance-Pop",
    duration: "3:53"
  },
     {
    type:     "music",
    title:    "Poker Face",
    artist:   "Lady Gaga",
    cover:    "https://i.scdn.co/image/ab67616d0000b2739ff8dea75219ec13530d97f1",
    file:     "./Music/pokerface.mp3",
    category: "Dance-Pop",
    duration: "3:33"
  },
      {
    type:     "music",
    title:    "Better Off Alone",
    artist:   "Alice Deejay",
    cover:    "https://m.media-amazon.com/images/I/51jZFJRbIeL._UF894,1000_QL80_.jpg",
    file:     "./Music/betteroffalone.mp3",
    category: "90s",
    duration: "2:55"
  },
      {
    type:     "music",
    title:    "I'm Still Standing",
    artist:   "Elton John",
    cover:    "https://i.scdn.co/image/ab67616d0000b27373fd9802ec887972ecdacac2",
    file:     "./Music/istillstanding.mp3",
    category: "Dance-Pop",
    duration: "3:02"
  },
      {
    type:     "music",
    title:    "Aserejé",
    artist:   "Las Ketchup",
    cover:    "https://cdn-images.dzcdn.net/images/cover/be45674dc35c8f974a934dc3779c7b59/0x1900-000000-80-0-0.jpg",
    file:     "./Music/asereje.mp3",
    category: "Dance-Pop",
    duration: "3:33"
  },
      {
    type:     "music",
    title:    "I know you want me",
    artist:   "PITBULL",
    cover:    "https://i1.sndcdn.com/artworks-1AWknYa8R73YKDa6-ca4Cbw-t1080x1080.jpg",
    file:     "./Music/iknowyouwantme.mp3",
    category: "Dance-Pop",
    duration: "4:00"
  },
      {
    type:     "music",
    title:    "BLA BLA BLA",
    artist:   "GIGI D'AGOSTINO",
    cover:    "https://m.media-amazon.com/images/I/61Le1BprXyS._UF894,1000_QL80_.jpg",
    file:     "./Music/bla_bla_bla.mp3",
    category: "Electronic",
    duration: "3:11"
  },
      {
    type:     "music",
    title:    "Danza Kuduro",
    artist:   "Don Omar, Lucenzo",
    cover:    "https://i.scdn.co/image/ab67616d0000b2737b31a1e4b17d0c4d9a00d357",
    file:     "./Music/danzakuduro.mp3",
    category: "Reggaeton",
    duration: "3:18"
  },
  {
    type:     "music",
    title:    "Olvidar",
    artist:   "Morad",
    cover:    "https://cdn-images.dzcdn.net/images/cover/272af21ce5be9cbd3d4ac0db0cc0cab5/0x1900-000000-80-0-0.jpg",
    file:     "./Music/olvidar.mp3",
    category: "Reggaeton",
    duration: "2:57"
  },
  {
    type:     "music",
    title:    "SIGUE",
    artist:   "BENY JR FT MORAD",
    cover:    "https://images.genius.com/6f4195419969480a4fbd80dab61266a0.1000x1000x1.png",
    file:     "./Music/sigue.mp3",
    category: "Reggaeton",
    duration: "3:31"
  },
  {
    type:     "music",
    title:    "Contento",
    artist:   "Morad",
    cover:    "https://images.genius.com/3c69ccbd190cec4a98edf084a658c01d.1000x1000x1.png",
    file:     "./Music/contento.mp3",
    category: "Reggaeton",
    duration: "3:30"
  },
  {
    type:     "music",
    title:    "Soñar",
    artist:   "Morad",
    cover:    "https://i.scdn.co/image/ab67616d0000b273dfc07c8c7df28f36fad5017f",
    file:     "./Music/soñar.mp3",
    category: "Reggaeton",
    duration: "4:15"
  },
  {
    type:     "music",
    title:    "Te Boté (Remix)",
    artist:   "Nio Garcia, Casper Magico, Bad Bunny, Darell, Ozuna, Nicky Jam",
    cover:    "https://i.scdn.co/image/ab67616d0000b273a5779a2f04a513fac2fd1d15",
    file:     "./Music/tebote.mp3",
    category: "Reggaeton",
    duration: "6:58"
  },
  {
    type:     "music",
    title:    "Esclava (Remix)",
    artist:   "Anonimus, Almighty, Anuel AA, Bryant Myers",
    cover:    "https://i.scdn.co/image/ab67616d0000b273fc974b3893de83eba6c1f862",
    file:     "./Music/esclava.mp3",
    category: "Reggaeton",
    duration: "4:41"
  },
  {
    type:     "music",
    title:    "BRAQUAGE DE L’ÉTÉ",
    artist:   "YOUKA, CYRIL KAMER",
    cover:    "https://m.media-amazon.com/images/I/51MCuWWbx5L._UXNaN_FMjpg_QL85_.jpg",
    file:     "./Music/braquage_del_eté.mp3",
    category: "Reggaeton",
    duration: "2:09"
  },
  {
    type:     "music",
    title:    "Casanova",
    artist:   "LOLA ÍNDIGO, RVFV, SOOLKING",
    cover:    "https://universalmusic.es/wp-content/uploads/sites/50/2023/12/lola_indigo_top5.jpeg",
    file:     "./Music/casanova.mp3",
    category: "Reggaeton",
    duration: "4:03"
  },
    {
    type:     "music",
    title:    "Prendio (Remix)",
    artist:   "RVFV, OMAR MONTES, DAVILES DE NOVELDA",
    cover:    "https://cdn-images.dzcdn.net/images/cover/c72ce1a61f596e9723839de3c591d023/0x1900-000000-80-0-0.jpg",
    file:     "./Music/prendio.mp3",
    category: "Reggaeton",
    duration: "3:11"
  },
    {
    type:     "music",
    title:    "La rubia (Remix 2)",
    artist:   "La nueva escuela, Omar Montes",
    cover:    "https://m.media-amazon.com/images/I/51g3CMJ0UZL._UXNaN_FMjpg_QL85_.jpg",
    file:     "./Music/larubia.mp3",
    category: "Reggaeton",
    duration: "3:30"
  },
    {
    type:     "music",
    title:    "MUEVE ESE CULO",
    artist:   "JC REYES, GLOOSITO",
    cover:    "https://m.media-amazon.com/images/I/413QydatXeL._UXNaN_FMjpg_QL85_.jpg",
    file:     "./Music/mueveeseculo.mp3",
    category: "Reggaeton",
    duration: "2:33"
  },
    {
    type:     "music",
    title:    "Magic In The Air",
    artist:   "Magic System, Ahmed Chawki",
    cover:    "https://m.media-amazon.com/images/I/71BxXSyM6GL._UF894,1000_QL80_.jpg",
    file:     "./Music/magic_in_the_air.mp3",
    category: "Dance-Pop",
    duration: "3:53"
  },
    {
    type:     "music",
    title:    "C'est La Vie",
    artist:   "Khaled",
    cover:    "https://m.media-amazon.com/images/I/611ckdsBGeL._UF894,1000_QL80_.jpg",
    file:     "./Music/c'est_la_vie.mp3",
    category: "Dance-Pop",
    duration: "3:47"
  },
    {
    type:     "music",
    title:    "A Sky Full Of Stars",
    artist:   "Coldplay",
    cover:    "https://i1.sndcdn.com/artworks-000086432916-4b0kzg-t1080x1080.jpg",
    file:     "./Music/a_sky_full_of_stars.mp3",
    category: "Dance-Pop",
    duration: "4:13"
  },
    {
    type:     "music",
    title:    "Viva La Vida",
    artist:   "Coldplay",
    cover:    "https://m.media-amazon.com/images/I/9145yafeO2L._UF894,1000_QL80_.jpg",
    file:     "./Music/viva_la_vida.mp3",
    category: "Dance-Pop",
    duration: "4:02"
  },
    {
    type:     "music",
    title:    "Paradise",
    artist:   "Coldplay",
    cover:    "https://upload.wikimedia.org/wikipedia/en/2/22/Coldplay_-_Paradise.JPG",
    file:     "./Music/paradise.mp3",
    category: "Dance-Pop",
    duration: "4:20"
  },
    {
    type:     "music",
    title:    "Clocks",
    artist:   "Coldplay",
    cover:    "https://m.media-amazon.com/images/I/41POdN+-ZcL._UF894,1000_QL80_.jpg",
    file:     "./Music/clocks.mp3",
    category: "Dance-Pop",
    duration: "4:15"
  },
    {
    type:     "music",
    title:    "Adventure Of A Lifetime",
    artist:   "Coldplay",
    cover:    "https://i.scdn.co/image/ab67616d0000b2738ff7c3580d429c8212b9a3b6",
    file:     "./Music/adventure_of_a_lifetime.mp3",
    category: "Dance-Pop",
    duration: "4:24"
  },
    {
    type:     "music",
    title:    "Fix You",
    artist:   "Coldplay",
    cover:    "https://cdn-images.dzcdn.net/images/cover/8a1a3e7c5e46b5f763328d95431ac19a/1900x1900-000000-80-0-0.jpg",
    file:     "./Music/fix_you.mp3",
    category: "Dance-Pop",
    duration: "4:53"
  },
    {
    type:     "music",
    title:    "Hymn For The Weekend",
    artist:   "Coldplay",
    cover:    "https://cdn-images.dzcdn.net/images/cover/5df065fdcbaffd0f83d09789bad9d2db/1900x1900-000000-80-0-0.jpg",
    file:     "./Music/hymn_for_the_weekend.mp3",
    category: "Dance-Pop",
    duration: "4:20"
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

// ── PERSISTENCE KEYS ──
const LIKED_KEY    = "droply_liked_v2";
const QUEUE_KEY    = "droply_queue_v2";
const PL_KEY       = "droply_playlists_v2";
const HIST_KEY     = "droply_history_v2";
const PLAYS_KEY    = "droply_plays_v2";

// ── LIKED ──
function loadLiked() { try { return new Set(JSON.parse(localStorage.getItem(LIKED_KEY) || "[]")); } catch(_) { return new Set(); } }
function saveLiked() { try { localStorage.setItem(LIKED_KEY, JSON.stringify([...likedTracks])); } catch(_) {} }
let likedTracks = loadLiked();

// ── QUEUE ──
function loadQueue() { try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]"); } catch(_) { return []; } }
function saveQueue() { try { localStorage.setItem(QUEUE_KEY, JSON.stringify(queue)); } catch(_) {} }
let queue = loadQueue();

// ── PLAYLISTS ──
function loadPlaylists() { try { return JSON.parse(localStorage.getItem(PL_KEY) || "[]"); } catch(_) { return []; } }
function savePlaylists() { try { localStorage.setItem(PL_KEY, JSON.stringify(playlists)); } catch(_) {} }
let playlists = loadPlaylists();

// ── HISTORY ──
function loadHistory() { try { return JSON.parse(localStorage.getItem(HIST_KEY) || "[]"); } catch(_) { return []; } }
function saveHistory() { try { localStorage.setItem(HIST_KEY, JSON.stringify(historyTracks.slice(0, 100))); } catch(_) {} }
let historyTracks = loadHistory(); // [{file, timestamp}]

// ── PLAY COUNTS ──
function loadPlayCounts() { try { return JSON.parse(localStorage.getItem(PLAYS_KEY) || "{}"); } catch(_) { return {}; } }
function savePlayCounts() { try { localStorage.setItem(PLAYS_KEY, JSON.stringify(playCounts)); } catch(_) {} }
let playCounts = loadPlayCounts();

// ── Context target ──
let contextTarget = null;
let activeHistoricalTab = "recent";

/* ══════════════════════════════════════════════════════
   3. DOM REFS
══════════════════════════════════════════════════════ */
const audioEl          = document.getElementById("mainAudio");
const preloadAudio     = document.getElementById("preloadAudio");
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
const historialList    = document.getElementById("historialList");
const tabRecent        = document.getElementById("tabRecent");
const tabTop           = document.getElementById("tabTop");

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
}

function getTrackByFile(file) { return media.find(m => m.file === file) || null; }

/* ══════════════════════════════════════════════════════
   5. TOAST NOTIFICATIONS
══════════════════════════════════════════════════════ */
function showToast(msg, type = "default") {
  const el = document.createElement("div");
  el.className = `toast toast-${type}`;
  el.innerHTML = `<span class="toast-dot"></span>${msg}`;
  toastContainer.appendChild(el);
  setTimeout(() => {
    el.classList.add("toast-out");
    el.addEventListener("animationend", () => el.remove(), { once: true });
  }, 2800);
}

/* ══════════════════════════════════════════════════════
   6. PAGES NAVIGATION
══════════════════════════════════════════════════════ */
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById(pageId);
  if (target) target.classList.add("active");
  bottomNav.querySelectorAll(".bnav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.page === pageId);
  });
  if (pageId === "pageFavoritos") renderFavoritos();
  if (pageId === "pagePlaylists") renderPlaylists();
  if (pageId === "pageHistorial") renderHistorial();
  closeContextMenu();
}

bottomNav.querySelectorAll(".bnav-btn").forEach(btn => {
  btn.addEventListener("click", () => showPage(btn.dataset.page));
});
topbarSearchBtn.addEventListener("click", () => showPage("pageSearch"));

/* ══════════════════════════════════════════════════════
   7. CONTEXT MENU
══════════════════════════════════════════════════════ */
function openContextMenu(item, x, y) {
  contextTarget = item;
  const liked = likedTracks.has(item.file);
  ctxLike.innerHTML = `
    <svg viewBox="0 0 24 24" width="16" height="16" ${liked ? 'style="fill:#e94f4f;stroke:#e94f4f"' : ''}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    ${liked ? "Quitar de likes" : "Me gusta"}`;

  const cw = contextMenu.offsetWidth || 190;
  const ch = contextMenu.offsetHeight || 160;
  let cx = Math.min(x, window.innerWidth - cw - 8);
  let cy = Math.min(y, window.innerHeight - ch - 8);
  contextMenu.style.left = cx + "px";
  contextMenu.style.top  = cy + "px";
  contextMenu.classList.add("open");
}
function closeContextMenu() {
  contextMenu.classList.remove("open");
  contextTarget = null;
}
document.addEventListener("click", e => {
  if (!contextMenu.contains(e.target)) closeContextMenu();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeContextMenu(); });

ctxPlayNow.addEventListener("click", () => {
  if (contextTarget) { loadTrack(contextTarget); closeContextMenu(); }
});
ctxAddQueue.addEventListener("click", () => {
  if (contextTarget) { addToQueue(contextTarget); closeContextMenu(); }
});
ctxAddPlaylist.addEventListener("click", () => {
  if (contextTarget) { openAddToPlaylist(contextTarget); closeContextMenu(); }
});
ctxLike.addEventListener("click", () => {
  if (contextTarget) { toggleLike(contextTarget); closeContextMenu(); }
});

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
  mediaGrid.innerHTML = "";
  playlist = media.filter(m => m.type === "music");
  const labels = { all:"Destacados para ti", music:"Música" };
  sectionTitle.textContent = labels[currentFilter] || currentFilter;

  const isHome = currentFilter === "all" && currentSearch === "";
  if (isHome) {
    if (homeRandomSeed.length === 0) homeRandomSeed = shuffleArray(items).slice(0, HOME_RANDOM_COUNT);
    items = homeRandomSeed;
    countBadge.textContent = `${HOME_RANDOM_COUNT} de ${filteredMedia().length}`;
  } else {
    homeRandomSeed = [];
    countBadge.textContent = `${items.length} item${items.length !== 1 ? "s" : ""}`;
  }

  if (items.length === 0) {
    mediaGrid.innerHTML = `<div class="no-results fade-in"><h3>Sin resultados</h3><p>Prueba con otro término o categoría.</p></div>`;
    return;
  }

  const currentFile = playlist[currentTrackIdx]?.file;

  items.forEach(item => {
    const cover = item.cover || getPlaceholderCover(item.category);
    const card = document.createElement("div");
    card.className = "media-card fade-in";
    if (item.file === currentFile) card.classList.add("is-playing");
    const liked = likedTracks.has(item.file);

    card.innerHTML = `
      <div class="card-cover">
        <img src="${cover}" alt="${item.title}" loading="lazy" onerror="this.src='${getPlaceholderCover(item.category)}'" />
        <div class="card-play-overlay">
          <div class="play-circle">
            <svg viewBox="0 0 24 24" style="fill:currentColor;stroke:none"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>
        <button class="card-more-btn" aria-label="Más opciones">
          <svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="5" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none"/></svg>
        </button>
        <div class="card-liked-dot ${liked ? 'visible' : ''}">
          <svg viewBox="0 0 24 24"><path fill="#fff" stroke="none" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </div>
        <button class="card-download-btn" data-file="${item.file}" title="Descargar para offline" aria-label="Descargar">
          <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        </button>
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

    card.querySelector(".card-play-btn").addEventListener("click", e => { e.stopPropagation(); loadTrack(item); });
    card.addEventListener("click", e => { if (!e.target.closest(".card-more-btn") && !e.target.closest(".card-download-btn")) loadTrack(item); });
    card.querySelector(".card-more-btn").addEventListener("click", e => {
      e.stopPropagation();
      openContextMenu(item, e.clientX, e.clientY);
    });
    card.querySelector(".card-download-btn").addEventListener("click", e => {
      e.stopPropagation();
      if (typeof OfflineManager !== 'undefined') {
        if (OfflineManager.isDownloaded(item.file)) {
          if (typeof showToast === 'function') showToast(`"${item.title}" ya está guardada offline`, 'default');
        } else {
          OfflineManager.downloadTrack(item);
        }
      } else {
        if (typeof showToast === 'function') showToast('Módulo offline no disponible', 'error');
      }
    });
    mediaGrid.appendChild(card);
  });
}

/* ══════════════════════════════════════════════════════
   9. LOAD TRACK + CROSSFADE
══════════════════════════════════════════════════════ */
const CROSSFADE_DURATION = 0; // ms — set > 0 if you want crossfade (e.g. 1500)

function loadTrack(item, fromQueue = false) {
  if (item.type !== "music") return;
  const cover = item.cover || getPlaceholderCover(item.category);

  // Track history
  historyTracks.unshift({ file: item.file, timestamp: Date.now() });
  historyTracks = historyTracks.filter((v, i, arr) => arr.findIndex(x => x.file === v.file) === i).slice(0, 100);
  saveHistory();

  // Play counts
  playCounts[item.file] = (playCounts[item.file] || 0) + 1;
  savePlayCounts();

  // Update playlist context
  if (!fromQueue) {
    playlist = media.filter(m => m.type === "music");
    currentTrackIdx = playlist.findIndex(p => p.file === item.file);
  }

  // Mini player
  miniCover.src = cover;
  miniTitle.textContent  = item.title;
  miniArtist.textContent = item.artist;
  miniPlayer.classList.add("visible");

  // Sheet player
  sheetCover.src = cover;
  sheetBgBlur.style.backgroundImage = `url(${cover})`;
  sheetCategory.textContent = item.category;
  sheetTitle.textContent    = item.title;
  sheetArtist.textContent   = item.artist;

  // Heart
  const liked = likedTracks.has(item.file);
  sheetHeart.classList.toggle("liked", liked);

  // Highlight playing card
  document.querySelectorAll(".media-card").forEach(c => c.classList.remove("is-playing"));
  const cards = document.querySelectorAll(".media-card");
  const items = Array.from(filteredMedia());
  cards.forEach((card, i) => { if (items[i]?.file === item.file) card.classList.add("is-playing"); });

  // Update queue now-playing
  renderQueueNowPlaying(item);

  // Audio
  audioEl.src = item.file;
  audioEl.load();
  audioEl.play()
    .then(() => { isPlaying = true; updatePlayIcons(true); setupMediaSession(item); preloadNext(item); })
    .catch(err => { isPlaying = false; updatePlayIcons(false); console.warn(`[DROPLY] No se pudo reproducir: "${item.file}"`, err); });
}

function preloadNext(currentItem) {
  // Preload the next track for smooth transitions
  const nextItem = getNextItem(currentItem);
  if (nextItem) {
    preloadAudio.src = nextItem.file;
    preloadAudio.load();
  }
}

function getNextItem(currentItem) {
  if (queue.length > 0) {
    const t = getTrackByFile(queue[0]);
    return t;
  }
  const idx = playlist.findIndex(p => p.file === currentItem?.file);
  if (idx < 0) return null;
  return playlist[(idx + 1) % playlist.length];
}

/* ══════════════════════════════════════════════════════
   10. QUEUE SYSTEM
══════════════════════════════════════════════════════ */
function addToQueue(item) {
  if (!item?.file) return;
  // Avoid duplicates immediately adjacent
  queue.push(item.file);
  saveQueue();
  renderQueueList();
  showToast(`"${item.title}" añadida a la cola`, "success");
}

function removeFromQueue(index) {
  queue.splice(index, 1);
  saveQueue();
  renderQueueList();
}

function clearQueue() {
  queue = [];
  saveQueue();
  renderQueueList();
  showToast("Cola vaciada");
}

function moveQueueItem(from, to) {
  if (to < 0 || to >= queue.length) return;
  const [removed] = queue.splice(from, 1);
  queue.splice(to, 0, removed);
  saveQueue();
  renderQueueList();
}

function openQueuePanel() {
  queuePanel.classList.add("open");
  queueOverlay.classList.add("open");
  sheetQueueBtn.classList.add("active");
  renderQueueList();
}
function closeQueuePanel() {
  queuePanel.classList.remove("open");
  queueOverlay.classList.remove("open");
  sheetQueueBtn.classList.remove("active");
}

sheetQueueBtn.addEventListener("click", () => {
  queuePanel.classList.contains("open") ? closeQueuePanel() : openQueuePanel();
});
queueCloseBtn.addEventListener("click", closeQueuePanel);
queueOverlay.addEventListener("click", closeQueuePanel);
queueClearBtn.addEventListener("click", clearQueue);

function renderQueueNowPlaying(item) {
  if (!item) { queueNowPlaying.innerHTML = ""; return; }
  const cover = item.cover || getPlaceholderCover(item.category);
  queueNowPlaying.innerHTML = `
    <p class="queue-now-label">Reproduciendo ahora</p>
    <div class="queue-now-item">
      <img class="queue-now-img" src="${cover}" alt="${item.title}" onerror="this.src='${getPlaceholderCover(item.category)}'">
      <div class="queue-now-info">
        <div class="queue-now-title">${item.title}</div>
        <div class="queue-now-artist">${item.artist}</div>
      </div>
    </div>`;
}

function renderQueueList() {
  queueList.innerHTML = "";
  if (queue.length === 0) {
    queueNextLabel.style.display = "none";
    queueList.innerHTML = `<div class="queue-empty">La cola está vacía.<br>Añade canciones con el botón ⊕</div>`;
    return;
  }
  queueNextLabel.style.display = "";
  queue.forEach((file, i) => {
    const item = getTrackByFile(file);
    if (!item) return;
    const cover = item.cover || getPlaceholderCover(item.category);
    const li = document.createElement("div");
    li.className = "queue-item";
    li.draggable = true;
    li.dataset.index = i;
    li.innerHTML = `
      <div class="queue-item-drag" title="Arrastrar">
        <svg viewBox="0 0 24 24"><circle cx="9" cy="5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="5" r="1.2" fill="currentColor" stroke="none"/><circle cx="9" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="9" cy="19" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="19" r="1.2" fill="currentColor" stroke="none"/></svg>
      </div>
      <img src="${cover}" alt="${item.title}" onerror="this.src='${getPlaceholderCover(item.category)}'">
      <div class="queue-item-info">
        <div class="queue-item-title">${item.title}</div>
        <div class="queue-item-artist">${item.artist}</div>
      </div>
      <div class="queue-item-actions">
        <button class="queue-item-btn" data-action="up" title="Subir"><svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg></button>
        <button class="queue-item-btn" data-action="down" title="Bajar"><svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg></button>
        <button class="queue-item-btn" data-action="remove" title="Eliminar"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      </div>`;
    // Play on click
    li.addEventListener("click", e => {
      if (e.target.closest(".queue-item-actions") || e.target.closest(".queue-item-drag")) return;
      const toPlay = getTrackByFile(queue[i]);
      if (toPlay) {
        queue.splice(0, i + 1);
        saveQueue();
        loadTrack(toPlay, true);
        renderQueueList();
      }
    });
    // Buttons
    li.querySelectorAll(".queue-item-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        const action = btn.dataset.action;
        if (action === "up")     moveQueueItem(i, i - 1);
        if (action === "down")   moveQueueItem(i, i + 1);
        if (action === "remove") removeFromQueue(i);
      });
    });
    // Drag and drop
    let dragIdx = null;
    li.addEventListener("dragstart", () => { dragIdx = i; li.style.opacity = ".5"; });
    li.addEventListener("dragend",   () => { li.style.opacity = ""; dragIdx = null; document.querySelectorAll(".queue-item").forEach(el => el.classList.remove("drag-over")); });
    li.addEventListener("dragover",  e => { e.preventDefault(); li.classList.add("drag-over"); });
    li.addEventListener("dragleave", () => li.classList.remove("drag-over"));
    li.addEventListener("drop",      e => {
      e.preventDefault(); li.classList.remove("drag-over");
      if (dragIdx !== null && dragIdx !== i) moveQueueItem(dragIdx, i);
    });
    queueList.appendChild(li);
  });
}

/* ══════════════════════════════════════════════════════
   11. SHEET PLAYER CONTROLS
══════════════════════════════════════════════════════ */
miniPlayerExpand.addEventListener("click", () => nowPlayingSheet.classList.add("open"));
sheetClose.addEventListener("click", () => nowPlayingSheet.classList.remove("open"));
sheetPlay.addEventListener("click", togglePlay);
miniPlay.addEventListener("click", togglePlay);

function togglePlay() {
  if (!audioEl.src) return;
  if (audioEl.paused) {
    audioEl.play().then(() => { isPlaying = true; updatePlayIcons(true); });
  } else {
    audioEl.pause(); isPlaying = false; updatePlayIcons(false);
  }
}

function playPrev() {
  if (playlist.length === 0) return;
  if (audioEl.currentTime > 3) { audioEl.currentTime = 0; return; }
  currentTrackIdx = (currentTrackIdx - 1 + playlist.length) % playlist.length;
  loadTrack(playlist[currentTrackIdx]);
}

function playNext() {
  // Queue takes priority
  if (queue.length > 0) {
    const nextFile = queue.shift();
    saveQueue();
    renderQueueList();
    const nextItem = getTrackByFile(nextFile);
    if (nextItem) { loadTrack(nextItem, true); return; }
  }
  if (playlist.length === 0) return;
  if (shuffleMode) {
    let next; do { next = Math.floor(Math.random() * playlist.length); } while (playlist.length > 1 && next === currentTrackIdx);
    currentTrackIdx = next;
  } else {
    currentTrackIdx = (currentTrackIdx + 1) % playlist.length;
  }
  loadTrack(playlist[currentTrackIdx]);
}

sheetPrev.addEventListener("click", playPrev);
sheetNext.addEventListener("click", playNext);
miniNext.addEventListener("click", playNext);

sheetShuffle.addEventListener("click", () => {
  shuffleMode = !shuffleMode;
  sheetShuffle.classList.toggle("active", shuffleMode);
  showToast(shuffleMode ? "Aleatorio activado" : "Aleatorio desactivado");
});

sheetRepeat.addEventListener("click", () => {
  repeatMode = !repeatMode;
  sheetRepeat.classList.toggle("active", repeatMode);
  showToast(repeatMode ? "Repetición activada" : "Repetición desactivada");
});

// Heart
sheetHeart.addEventListener("click", () => {
  const track = playlist[currentTrackIdx];
  if (!track) return;
  toggleLike(track);
});

// Sheet add to playlist
sheetAddMenu.addEventListener("click", () => {
  const track = playlist[currentTrackIdx];
  if (track) openAddToPlaylist(track);
});

// Volume
volSlider.addEventListener("input", () => { audioEl.volume = parseFloat(volSlider.value); });

/* ── Progress bar ─────────────────────────────────── */
function seekToPercent(pct) {
  if (audioEl.duration && isFinite(audioEl.duration))
    audioEl.currentTime = Math.max(0, Math.min(1, pct)) * audioEl.duration;
}
sheetBar.addEventListener("click", e => {
  const rect = sheetBar.getBoundingClientRect();
  seekToPercent((e.clientX - rect.left) / rect.width);
});
let barDragging = false;
sheetBar.addEventListener("touchstart", e => { barDragging = true; const r = sheetBar.getBoundingClientRect(); seekToPercent((e.touches[0].clientX - r.left) / r.width); }, { passive:true });
sheetBar.addEventListener("touchmove",  e => { if (!barDragging) return; const r = sheetBar.getBoundingClientRect(); seekToPercent((e.touches[0].clientX - r.left) / r.width); }, { passive:true });
sheetBar.addEventListener("touchend",   () => { barDragging = false; }, { passive:true });

/* ── Swipe down to close ──────────────────────────── */
let sheetTouchStartY = 0;
nowPlayingSheet.addEventListener("touchstart", e => { sheetTouchStartY = e.touches[0].clientY; }, { passive:true });
nowPlayingSheet.addEventListener("touchend",   e => { if (e.changedTouches[0].clientY - sheetTouchStartY > 80) nowPlayingSheet.classList.remove("open"); }, { passive:true });

/* ══════════════════════════════════════════════════════
   12. AUDIO EVENTS
══════════════════════════════════════════════════════ */
audioEl.addEventListener("timeupdate", () => {
  const dur = audioEl.duration, cur = audioEl.currentTime;
  if (!dur || isNaN(dur) || !isFinite(dur) || dur <= 0) return;
  const pct = Math.max(0, Math.min(100, (cur / dur) * 100));
  sheetFill.style.width     = pct + "%";
  sheetThumb.style.left     = pct + "%";
  sheetCurrent.textContent  = formatTime(cur);
  sheetDuration.textContent = formatTime(dur);
  miniProgressFill.style.width = pct + "%";
  if ("mediaSession" in navigator) {
    try { navigator.mediaSession.setPositionState({ duration: dur, playbackRate: audioEl.playbackRate || 1, position: Math.min(cur, dur) }); } catch(_) {}
  }
});

audioEl.addEventListener("ended", () => {
  if (repeatMode) { audioEl.currentTime = 0; audioEl.play(); }
  else playNext();
});

audioEl.addEventListener("play",  () => { isPlaying = true;  updatePlayIcons(true);  });
audioEl.addEventListener("pause", () => { isPlaying = false; updatePlayIcons(false); });

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
  const likedItems = media.filter(m => m.type === "music" && likedTracks.has(m.file));
  if (likedItems.length === 0) {
    favoritosList.innerHTML = `<div class="fav-empty"><svg viewBox="0 0 24 24" width="48" height="48" style="margin:0 auto 1rem;display:block;color:#e94f4f;opacity:.4"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><p style="color:#b3b3b3;text-align:center;font-size:.9rem">Aún no tienes canciones favoritas.<br>Pulsa el ❤ en cualquier canción.</p></div>`;
    return;
  }
  likedItems.forEach((item, idx) => {
    const cover = item.cover || getPlaceholderCover(item.category);
    const row = buildLibraryRow(item, idx + 1, cover, () => {
      playlist = likedItems; currentTrackIdx = idx; loadTrack(item);
    }, item);
    favoritosList.appendChild(row);
  });
}

function buildLibraryRow(item, num, cover, onClick, itemForCtx) {
  const row = document.createElement("div");
  row.className = "library-item fade-in";
  const isCurrentTrack = playlist[currentTrackIdx]?.file === item.file;
  if (isCurrentTrack) row.classList.add("playing");
  row.innerHTML = `
    <span class="library-item-num">${num}</span>
    <div class="library-thumb"><img src="${cover}" alt="${item.title}" onerror="this.src='${getPlaceholderCover(item.category)}'" /></div>
    <div class="library-info">
      <span class="library-track-title">${item.title}</span>
      <span class="library-track-artist">${item.artist}</span>
    </div>
    <div class="library-item-actions">
      <button class="library-action-btn" data-action="queue" title="Añadir a cola">
        <svg viewBox="0 0 24 24" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
      <button class="library-action-btn" data-action="more" title="Más opciones">
        <svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="5" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none"/></svg>
      </button>
    </div>
    <span class="library-item-dur">${item.duration || ""}</span>`;
  row.addEventListener("click", e => { if (!e.target.closest(".library-item-actions")) onClick(); });
  row.querySelector('[data-action="queue"]').addEventListener("click", e => { e.stopPropagation(); addToQueue(item); });
  row.querySelector('[data-action="more"]').addEventListener("click", e => { e.stopPropagation(); openContextMenu(itemForCtx || item, e.clientX, e.clientY); });
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
    card.innerHTML = `
      ${coverHTML}
      <div class="playlist-card-body">
        <div class="playlist-card-name">${pl.name}</div>
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
  playlistDetailName.textContent = pl.name;
  playlistDetailCount.textContent = `${pl.tracks.length} cancion${pl.tracks.length !== 1 ? "es" : ""}`;

  // Cover
  const trackImgs = pl.tracks.slice(0, 4).map(f => getTrackByFile(f)?.cover || "").filter(Boolean);
  const coverHTML = buildPlaylistCoverHTML(trackImgs, "playlist-detail-cover");
  playlistDetailCover.outerHTML; // won't update this way, use innerHTML approach
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

  // Track list
  playlistDetailList.innerHTML = "";
  if (pl.tracks.length === 0) {
    playlistDetailList.innerHTML = `<p style="color:var(--text-soft);text-align:center;padding:2rem">No hay canciones aún.</p>`;
  } else {
    pl.tracks.forEach(file => {
      const item = getTrackByFile(file);
      if (!item) return;
      const cover = item.cover || getPlaceholderCover(item.category);
      const div = document.createElement("div");
      div.className = "playlist-detail-item";
      div.innerHTML = `
        <img src="${cover}" alt="${item.title}" onerror="this.src='${getPlaceholderCover(item.category)}'">
        <div class="playlist-detail-info">
          <div class="playlist-detail-track">${item.title}</div>
          <div class="playlist-detail-artist">${item.artist}</div>
        </div>
        <button class="playlist-detail-remove" title="Eliminar de playlist">
          <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>`;
      div.addEventListener("click", e => {
        if (e.target.closest(".playlist-detail-remove")) return;
        const plItems = pl.tracks.map(f => getTrackByFile(f)).filter(Boolean);
        const idx = plItems.findIndex(t => t.file === file);
        playlist = plItems; currentTrackIdx = idx;
        loadTrack(item);
        playlistDetailModal.classList.remove("open");
      });
      div.querySelector(".playlist-detail-remove").addEventListener("click", e => {
        e.stopPropagation();
        removeTrackFromPlaylist(id, file);
      });
      playlistDetailList.appendChild(div);
    });
  }
  playlistDetailModal.classList.add("open");
}

// Play all playlist
btnPlayPlaylist.addEventListener("click", () => {
  if (!openPlaylistId) return;
  const pl = playlists.find(p => p.id === openPlaylistId);
  if (!pl || pl.tracks.length === 0) { showToast("La playlist está vacía"); return; }
  const plItems = pl.tracks.map(f => getTrackByFile(f)).filter(Boolean);
  playlist = plItems; currentTrackIdx = 0;
  loadTrack(plItems[0]);
  playlistDetailModal.classList.remove("open");
});

btnDeletePlaylist.addEventListener("click", () => {
  if (!openPlaylistId) return;
  deletePlaylist(openPlaylistId);
  playlistDetailModal.classList.remove("open");
  openPlaylistId = null;
});

playlistDetailClose.addEventListener("click", () => playlistDetailModal.classList.remove("open"));
playlistDetailModal.addEventListener("click", e => { if (e.target === playlistDetailModal) playlistDetailModal.classList.remove("open"); });

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
function renderHistorial() {
  historialList.innerHTML = "";
  let items;
  if (activeHistoricalTab === "recent") {
    items = historyTracks.slice(0, 50).map(h => getTrackByFile(h.file)).filter(Boolean);
  } else {
    // Top tracks sorted by play count
    items = Object.entries(playCounts)
      .sort(([,a],[,b]) => b - a)
      .slice(0, 50)
      .map(([file]) => getTrackByFile(file))
      .filter(Boolean);
  }
  if (items.length === 0) {
    historialList.innerHTML = `<div class="fav-empty" style="text-align:center;padding:3rem 1rem"><p style="color:var(--text-mid);font-size:.9rem">${activeHistoricalTab === "recent" ? "Aún no has reproducido ninguna canción." : "Sin datos de reproducción aún."}</p></div>`;
    return;
  }
  items.forEach((item, idx) => {
    const cover = item.cover || getPlaceholderCover(item.category);
    let subtitle = item.artist;
    if (activeHistoricalTab === "top") subtitle += ` · ${playCounts[item.file] || 0} reproducciones`;
    const row = document.createElement("div");
    row.className = "library-item fade-in";
    row.innerHTML = `
      <span class="library-item-num">${idx + 1}</span>
      <div class="library-thumb"><img src="${cover}" alt="${item.title}" onerror="this.src='${getPlaceholderCover(item.category)}'" /></div>
      <div class="library-info">
        <span class="library-track-title">${item.title}</span>
        <span class="library-track-artist">${subtitle}</span>
      </div>
      <div class="library-item-actions">
        <button class="library-action-btn" data-action="queue" title="Añadir a cola">
          <svg viewBox="0 0 24 24" width="14" height="14"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
      <span class="library-item-dur">${item.duration || ""}</span>`;
    row.addEventListener("click", e => { if (!e.target.closest(".library-item-actions")) { playlist = items; currentTrackIdx = idx; loadTrack(item); } });
    row.querySelector('[data-action="queue"]').addEventListener("click", e => { e.stopPropagation(); addToQueue(item); });
    historialList.appendChild(row);
  });
}

tabRecent.addEventListener("click", () => {
  activeHistoricalTab = "recent";
  tabRecent.classList.add("active"); tabTop.classList.remove("active");
  renderHistorial();
});
tabTop.addEventListener("click", () => {
  activeHistoricalTab = "top";
  tabTop.classList.add("active"); tabRecent.classList.remove("active");
  renderHistorial();
});

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
    btn.addEventListener("click", () => {
      currentFilter = cat;
      showPage("pageHome");
      catInner.querySelectorAll(".cat-pill").forEach(p => { p.classList.toggle("active", p.dataset.cat === cat); });
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
    if (!q) { searchBrowse.style.display = ""; searchResults.style.display = "none"; searchResults.innerHTML = ""; return; }
    searchBrowse.style.display = "none";
    searchResults.style.display = "";
    const results = media.filter(item =>
      [item.title, item.artist, item.category].some(s => s.toLowerCase().includes(q.toLowerCase()))
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
        <div class="search-result-actions">
          <button class="search-result-queue-btn" title="Añadir a cola">
            <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
        <span class="search-result-cat">${item.category}</span>`;
      row.addEventListener("click", e => {
        if (e.target.closest(".search-result-queue-btn")) return;
        loadTrack(item); showPage("pageHome");
      });
      row.querySelector(".search-result-queue-btn").addEventListener("click", e => { e.stopPropagation(); addToQueue(item); });
      searchResults.appendChild(row);
    });
  }, 220);
});
searchClear.addEventListener("click", () => {
  searchInput.value = ""; searchClear.style.display = "none";
  searchBrowse.style.display = ""; searchResults.style.display = "none"; searchResults.innerHTML = "";
});

/* ══════════════════════════════════════════════════════
   18. MEDIA SESSION
══════════════════════════════════════════════════════ */
function setupMediaSession(item) {
  if (!("mediaSession" in navigator)) return;
  const cover = item.cover || getPlaceholderCover(item.category);
  navigator.mediaSession.metadata = new MediaMetadata({
    title: item.title, artist: item.artist, album: item.category,
    artwork: [96, 128, 192, 256, 384, 512].map(s => ({ src: cover, sizes: `${s}x${s}`, type: "image/jpeg" }))
  });
  navigator.mediaSession.setActionHandler("play",          () => { audioEl.play(); });
  navigator.mediaSession.setActionHandler("pause",         () => { audioEl.pause(); });
  navigator.mediaSession.setActionHandler("previoustrack", () => playPrev());
  navigator.mediaSession.setActionHandler("nexttrack",     () => playNext());
  try { navigator.mediaSession.setActionHandler("seekbackward", null); } catch(_) {}
  try { navigator.mediaSession.setActionHandler("seekforward",  null); } catch(_) {}
  try { navigator.mediaSession.setActionHandler("seekto", ({ seekTime }) => {
    if (audioEl.duration) audioEl.currentTime = Math.max(0, Math.min(audioEl.duration, seekTime));
  }); } catch(_) {}
}

/* ══════════════════════════════════════════════════════
   19. KEYBOARD + SCROLL
══════════════════════════════════════════════════════ */
heroExplore.addEventListener("click", () => gridSection.scrollIntoView({ behavior: "smooth" }));

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

/* ══════════════════════════════════════════════════════
   20. INIT
══════════════════════════════════════════════════════ */
(function init() {
  playlist = media.filter(m => m.type === "music");
  buildCategoryPills();
  renderGrid();
  buildGenreGrid();
  // Restore queue panel now-playing if there's a last track (just initialize empty state)
  renderQueueList();
})();/* ═══════════════════════════════════════════════════════════
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
      // Fetch audio
      const audioResp = await fetch(key);
      if (!audioResp.ok) throw new Error(`HTTP ${audioResp.status}`);
      const total    = parseInt(audioResp.headers.get('content-length') || '0');
      const reader   = audioResp.body.getReader();
      const chunks   = [];
      let loaded     = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.byteLength;
        if (total > 0 && onProgress) onProgress(loaded / total);
      }

      const audioBlob = new Blob(chunks, { type: 'audio/mpeg' });

      // Fetch cover (best-effort)
      let coverBlob = null;
      try {
        const coverResp = await fetch(item.cover);
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
      renderDownloadsList();
      if (typeof renderOfflinePlaylist === 'function') renderOfflinePlaylist();
      if (typeof showToast === 'function') showToast(`"${item.title}" guardada offline`, 'success');
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
    renderDownloadsList();
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
    return document.querySelector(`.card-download-btn[data-file="${CSS.escape(file)}"]`);
  }

  function updateCardDownloadBtn(file, state) {
    const btn = getCardDownloadBtn(file);
    if (!btn) return;
    btn.classList.remove('downloaded', 'downloading', 'error');
    const svgDownload = `<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
    const svgDone     = `<svg viewBox="0 0 24 24" stroke="currentColor"><polyline points="20 6 9 17 4 12"/></svg>`;
    const svgSpin     = `<svg viewBox="0 0 24 24"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>`;
    if (state === 'done')        { btn.classList.add('downloaded'); btn.innerHTML = svgDone; btn.title = 'Guardado offline'; }
    else if (state === 'downloading') { btn.classList.add('downloading'); btn.innerHTML = svgSpin; btn.title = 'Descargando...'; }
    else if (state === 'error')  { btn.innerHTML = svgDownload; btn.title = 'Reintentar descarga'; }
    else                         { btn.innerHTML = svgDownload; btn.title = 'Descargar para offline'; }
  }

  function updateAllCardDownloadButtons() {
    document.querySelectorAll('.card-download-btn').forEach(btn => {
      const file = btn.dataset.file;
      if (!file) return;
      const state = downloadStates.get(file) || 'none';
      updateCardDownloadBtn(file, state);
    });
  }

  function updateDownloadsBadge() {
    const badge = document.querySelector('#bnavDownloads .nav-badge');
    if (!badge) return;
    const count = downloadedKeys.size;
    badge.textContent  = count > 99 ? '99+' : count;
    badge.classList.toggle('visible', count > 0);
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
      const row = document.createElement('div');
      row.className = 'library-item fade-in';
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
        // Use offline blob src if available
        const offlineSrc = await getOfflineSrc(item.file);
        if (offlineSrc && typeof loadTrack === 'function') {
          const patchedItem = { ...trackItem, _offlineSrc: offlineSrc };
          loadTrack(patchedItem);
        } else if (typeof loadTrack === 'function') {
          loadTrack(trackItem);
        }
      });
      fragment.appendChild(row);
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

  return { init, downloadTrack, getOfflineSrc, deleteDownload, renderDownloadsList, isDownloaded: k => downloadedKeys.has(k), updateAllCardDownloadButtons, setupOfflineDetection };
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
    activate, deactivate, toggle, active: () => active,
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
   MÓDULO 3 — TRANSFERENCIA ENTRE DISPOSITIVOS
   Tecnología: BroadcastChannel (misma origin) + QR fallback
   Para cross-device real: genera un session token con QR
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
      repeatMode:  typeof repeatMode  !== 'undefined' ? repeatMode  : false,
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
      repeatMode:  typeof repeatMode  !== 'undefined' ? repeatMode  : false,
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
    // Only restore if recent (< 7 days)
    if (Date.now() - (state.ts || 0) > 7 * 24 * 3600 * 1000) return;
    const track = typeof media !== 'undefined' ? media.find(m => m.file === state.file) : null;
    if (!track) return;

    // Restore volume
    const audio = typeof audioEl !== 'undefined' ? audioEl : null;
    if (audio && state.volume != null) audio.volume = state.volume;
    if (typeof volSlider !== 'undefined') volSlider.value = state.volume ?? 1;

    // Load track silently (paused)
    if (typeof loadTrack === 'function') {
      loadTrack(track);
      // Seek without autoplay
      if (audio) {
        const trySeek = () => {
          if (audio.readyState >= 2) {
            audio.currentTime = state.currentTime || 0;
            audio.pause();
          } else {
            audio.addEventListener('canplay', () => {
              audio.currentTime = state.currentTime || 0;
              audio.pause();
            }, { once: true });
          }
        };
        setTimeout(trySeek, 400);
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
  if (!('serviceWorker' in navigator)) return;
  // Generate the SW inline via blob URL (no external file needed)
  const swCode = `
const CACHE = 'droply-cache-v1';
const STATIC = ['/', '/index.html', '/style.css', '/script.js', '/premium.css', '/premium.js'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC.filter(Boolean))).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fresh = fetch(e.request).then(resp => {
        if (resp.ok && e.request.url.startsWith(self.location.origin)) {
          caches.open(CACHE).then(c => c.put(e.request, resp.clone()));
        }
        return resp;
      }).catch(() => cached);
      return cached || fresh;
    })
  );
});`;

  try {
    const blob = new Blob([swCode], { type: 'application/javascript' });
    const url  = URL.createObjectURL(blob);
    navigator.serviceWorker.register(url, { scope: '/' }).catch(() => {});
  } catch(_) {}
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

  /* ── Car mode suggest toast ───────────────────── */
  document.body.insertAdjacentHTML('beforeend', `
    <div class="car-suggest-toast" id="carSuggestToast">
      <div class="car-suggest-row">
        <div class="car-suggest-icon">
          <svg viewBox="0 0 24 24"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="17" r="1.5" fill="currentColor" stroke="none"/><circle cx="20" cy="17" r="1.5" fill="currentColor" stroke="none"/></svg>
        </div>
        <div class="car-suggest-info">
          <div class="car-suggest-title">¿Estás en el coche?</div>
          <div class="car-suggest-sub">Activa el modo coche para una experiencia más segura</div>
        </div>
      </div>
      <div class="car-suggest-actions">
        <button class="car-suggest-btn primary" id="carSuggestActivate">Activar modo coche</button>
        <button class="car-suggest-btn secondary" id="carSuggestDismiss">No, gracias</button>
      </div>
    </div>`);

  /* ── Car mode full-screen panel ───────────────── */
  document.body.insertAdjacentHTML('beforeend', `
    <div class="car-mode-panel" id="carModePanel" role="dialog" aria-label="Modo Coche">
      <div class="car-mode-bg">
        <img class="car-mode-bg-img" id="carModeBgImg" src="" alt="" aria-hidden="true" />
      </div>
      <div class="car-mode-header">
        <span class="car-mode-logo">DROPLY</span>
        <span class="car-mode-time" id="carModeTime">00:00</span>
        <button class="car-mode-exit-btn" id="carModeExitBtn">Salir</button>
      </div>
      <div class="car-mode-cover-section">
        <div class="car-mode-cover" id="carModeCover">
          <img id="carModeCoverImg" src="" alt="Portada" />
        </div>
        <div class="car-mode-info">
          <h2 class="car-mode-title" id="carModeTitle">—</h2>
          <p class="car-mode-artist" id="carModeArtist">—</p>
        </div>
      </div>
      <div class="car-mode-progress-wrap">
        <div class="car-mode-bar" id="carModeBar" role="slider" aria-label="Progreso">
          <div class="car-mode-bar-fill" id="carModeBarFill"></div>
        </div>
        <div class="car-mode-times">
          <span id="carModeCurrent">0:00</span>
          <span id="carModeDuration">0:00</span>
        </div>
      </div>
      <div class="car-mode-controls">
        <button class="car-ctrl-btn secondary" id="carPrevBtn" aria-label="Anterior">
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="19,20 9,12 19,4"/><rect x="5" y="4" width="3" height="16"/></svg>
        </button>
        <button class="car-ctrl-btn primary" id="carPlayBtn" aria-label="Play/Pause">
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5,3 19,12 5,21"/></svg>
        </button>
        <button class="car-ctrl-btn secondary" id="carNextBtn" aria-label="Siguiente">
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5,20 15,12 5,4"/><rect x="16" y="4" width="3" height="16"/></svg>
        </button>
      </div>
      <p class="car-swipe-hint">← Desliza para cambiar canción →</p>
    </div>`);

  /* ── Transfer panel ───────────────────────────── */
  document.body.insertAdjacentHTML('beforeend', `
    <div class="transfer-panel-overlay" id="transferOverlay"></div>
    <div class="transfer-panel" id="transferPanel" role="dialog" aria-label="Transferir reproducción">
      <div class="transfer-handle"></div>
      <h3 class="transfer-panel-title">Transferir reproducción</h3>
      <p class="transfer-panel-subtitle">Continúa escuchando en otro dispositivo desde el segundo exacto.</p>
      
      <div class="transfer-current-card">
        <div class="transfer-current-cover"><img id="transferCurrentCover" src="" alt="" /></div>
        <div class="transfer-current-info">
          <div class="transfer-current-title" id="transferCurrentTitle">—</div>
          <div class="transfer-current-artist" id="transferCurrentArtist">—</div>
        </div>
        <span class="transfer-current-time" id="transferCurrentTime">0:00</span>
      </div>

      <p class="transfer-devices-label">Dispositivos disponibles</p>
      <div id="transferDevicesList"></div>

      <div class="transfer-qr-section">
        <p class="transfer-qr-title">O escanea desde otro dispositivo</p>
        <div class="transfer-qr-wrap">
          <div class="transfer-qr-canvas">
            <canvas id="transferQRCanvas" width="72" height="72"></canvas>
          </div>
          <div class="transfer-qr-info">
            <p class="transfer-qr-desc">Abre DROPLY en el otro dispositivo y pulsa "Recibir desde QR" para continuar la sesión.</p>
            <div class="transfer-qr-session" id="transferSessionId">—</div>
          </div>
        </div>
      </div>
      <div class="transfer-connecting-overlay" id="transferConnecting">
        <div class="transfer-connecting-spinner"></div>
        <span class="transfer-connecting-text">Conectando…</span>
      </div>
    </div>`);

  /* ── Cloud sync indicator ─────────────────────── */
  const topbarActions = document.querySelector('.topbar-actions');
  if (topbarActions) {
    topbarActions.insertAdjacentHTML('afterbegin', `
      <div class="cloud-sync-indicator" id="cloudSyncIndicator" title="Estado de sincronización">
        <svg class="sync-icon" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>
        <span class="sync-text"></span>
      </div>`);

    /* ── Car mode topbar button ─────────────────── */
    topbarActions.insertAdjacentHTML('afterbegin', `
      <button class="car-mode-topbar-btn topbar-icon-btn" id="carModeTopbarBtn" title="Modo Coche" aria-label="Modo Coche">
        <svg viewBox="0 0 24 24"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="17" r="1.5" fill="currentColor" stroke="none"/><circle cx="20" cy="17" r="1.5" fill="currentColor" stroke="none"/></svg>
      </button>`);
  }

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

  /* ── Downloads page ───────────────────────────── */
  const pagesContainer = document.getElementById('pagesContainer');
  if (pagesContainer) {
    pagesContainer.insertAdjacentHTML('beforeend', `
      <div class="page" id="pageDownloads">
        <div class="library-header" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.6rem">
          <h2 class="library-title">
            <svg viewBox="0 0 24 24" width="22" height="22" style="display:inline;margin-right:.4rem;vertical-align:middle"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Offline
          </h2>
          <button class="offline-clear-btn" id="offlineClearAllBtn">Liberar espacio</button>
        </div>

        <!-- ── Connectivity banner ── -->
        <div class="offline-status-banner is-online" id="offlineStatusBanner">
          <svg viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/></svg>
          <span id="offlineStatusText">Conectado — escucha también sin internet</span>
        </div>

        <!-- ── Offline playlist ── -->
        <div class="offline-playlist-section">
          <div class="offline-playlist-header">
            <div>
              <div class="offline-playlist-title">Mis canciones guardadas</div>
              <div class="offline-playlist-count" id="offlinePlaylistCount">0 canciones</div>
            </div>
            <div class="offline-playlist-controls">
              <button class="offline-shuffle-btn" id="offlineShuffleBtn" title="Aleatorio">
                <svg viewBox="0 0 24 24"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
                Aleatorio
              </button>
              <button class="offline-play-all-btn" id="offlinePlayAllBtn">
                <svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
                Reproducir todo
              </button>
            </div>
          </div>
          <div class="offline-track-list" id="offlineTrackList">
            <div class="offline-empty-playlist">
              <strong>Sin canciones guardadas</strong>
              <p>Descarga canciones pulsando el botón <svg viewBox="0 0 24 24" width="13" height="13" style="display:inline;vertical-align:middle"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> en cualquier canción para escucharlas sin conexión.</p>
            </div>
          </div>
        </div>

        <hr class="offline-section-divider" />

        <!-- ── Storage + raw downloads list (existing) ── -->
        <div class="page-offline-downloads">
          <div class="offline-storage-bar">
            <div class="offline-storage-label">
              <span class="offline-storage-title">Almacenamiento usado</span>
              <span class="offline-storage-size" id="offlineStorageSize">—</span>
            </div>
            <div class="offline-storage-track">
              <div class="offline-storage-fill" id="offlineStorageFill" style="width:0%"></div>
            </div>
          </div>
          <div class="offline-actions-row">
            <span class="offline-section-label">Detalle de descargas</span>
          </div>
          <div id="downloadsListContainer"></div>
        </div>
      </div>`);
  }

  /* ── Offline tab in bottom nav ────────────────── */
  const bottomNav = document.getElementById('bottomNav');
  if (bottomNav) {
    bottomNav.insertAdjacentHTML('beforeend', `
      <button class="bnav-btn" data-page="pageDownloads" aria-label="Descargas offline">
        <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        <span>Offline</span>
        <span class="nav-badge" id="bnavDownloadsBadge"></span>
      </button>`);
  }
}


/* ══════════════════════════════════════════════════════
   PATCH EXISTING FUNCTIONS — Extender sin modificar
══════════════════════════════════════════════════════ */
function patchExistingFunctions() {

  /* ── Patch renderGrid to add download buttons ─── */
  const origRenderGrid = typeof renderGrid === 'function' ? renderGrid : null;
  if (origRenderGrid) {
    // Override by wrapping via MutationObserver on mediaGrid
    const mediaGrid = document.getElementById('mediaGrid');
    if (mediaGrid) {
      const observer = new MutationObserver(() => {
        mediaGrid.querySelectorAll('.media-card:not([data-dl-patched])').forEach(card => {
          card.dataset.dlPatched = '1';
          const cover = card.querySelector('.card-cover');
          if (!cover) return;
          // Find track by cover src or title
          const img = card.querySelector('.card-cover img');
          const titleEl = card.querySelector('.card-title');
          if (!img || !titleEl) return;
          const title = titleEl.textContent.trim();
          const track = typeof media !== 'undefined' ? media.find(m => m.title === title) : null;
          if (!track) return;

          const btn = document.createElement('button');
          btn.className = 'card-download-btn';
          btn.dataset.file = track.file;
          btn.title = 'Descargar para offline';
          btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
          btn.addEventListener('click', async e => {
            e.stopPropagation();
            if (OfflineManager.isDownloaded(track.file)) {
              // Already downloaded: show toast
              if (typeof showToast === 'function') showToast(`"${track.title}" ya está guardada`, 'default');
              return;
            }
            let lastPct = 0;
            await OfflineManager.downloadTrack(track, pct => {
              if (Math.abs(pct - lastPct) > 0.05) {
                lastPct = pct;
                btn.title = `Descargando ${Math.round(pct*100)}%`;
              }
            });
          });
          cover.appendChild(btn);
          // Apply current state
          const state = OfflineManager.isDownloaded(track.file) ? 'done' : 'none';
          if (state === 'done') {
            btn.classList.add('downloaded');
            btn.innerHTML = `<svg viewBox="0 0 24 24" stroke="currentColor"><polyline points="20 6 9 17 4 12"/></svg>`;
            btn.title = 'Guardado offline';
          }
        });
      });
      observer.observe(mediaGrid, { childList: true });
    }
  }

  /* ── Patch loadTrack to use offline src when available ── */
  const origLoadTrack = typeof loadTrack === 'function' ? loadTrack : null;
  if (origLoadTrack) {
    window.loadTrack = async function(item, fromQueue) {
      // Check offline first
      if (OfflineManager.isDownloaded(item.file) && !navigator.onLine) {
        const offlineSrc = await OfflineManager.getOfflineSrc(item.file);
        if (offlineSrc) {
          const patchedItem = { ...item, file: offlineSrc };
          origLoadTrack.call(this, patchedItem, fromQueue);
          // Sync car mode
          setTimeout(() => CarMode.syncToPlayer(), 200);
          return;
        }
      }
      origLoadTrack.call(this, item, fromQueue);
      // Sync car mode
      setTimeout(() => CarMode.syncToPlayer(), 200);
    };
  }

  /* ── Patch togglePlay, playNext, playPrev to update car mode ── */
  ['togglePlay', 'playNext', 'playPrev'].forEach(fn => {
    const orig = typeof window[fn] === 'function' ? window[fn] : null;
    if (!orig) return;
    window[fn] = function(...args) {
      const result = orig.apply(this, args);
      setTimeout(() => {
        CarMode.syncToPlayer();
        CloudSync.markDirty();
      }, 100);
      return result;
    };
  });

  /* ── Hook audio timeupdate for car mode progress ── */
  const audio = typeof audioEl !== 'undefined' ? audioEl : null;
  if (audio) {
    audio.addEventListener('timeupdate', () => CarMode.updateProgress(), { passive: true });
    audio.addEventListener('play',   () => { CarMode.updatePlayState(); }, { passive: true });
    audio.addEventListener('pause',  () => { CarMode.updatePlayState(); }, { passive: true });
  }
}


/* ══════════════════════════════════════════════════════
   EVENT LISTENERS — Car mode, Transfer, Downloads
══════════════════════════════════════════════════════ */
function setupPremiumEvents() {

  /* ── Car mode ──────────────────────────────────── */
  document.getElementById('carModeTopbarBtn')?.addEventListener('click', () => CarMode.toggle());
  document.getElementById('carModeExitBtn')?.addEventListener('click', () => CarMode.deactivate());

  document.getElementById('carPlayBtn')?.addEventListener('click', () => {
    if (typeof togglePlay === 'function') togglePlay();
    if (typeof hapticFeedback === 'function') hapticFeedback('medium');
  });
  document.getElementById('carPrevBtn')?.addEventListener('click', () => {
    if (typeof playPrev === 'function') playPrev();
    if (typeof hapticFeedback === 'function') hapticFeedback('light');
  });
  document.getElementById('carNextBtn')?.addEventListener('click', () => {
    if (typeof playNext === 'function') playNext();
    if (typeof hapticFeedback === 'function') hapticFeedback('light');
  });

  /* Car suggest */
  document.getElementById('carSuggestActivate')?.addEventListener('click', () => {
    CarMode.activate();
  });
  document.getElementById('carSuggestDismiss')?.addEventListener('click', () => {
    CarMode.hideSuggest();
    CarMode.setSuggestDismissed();
  });

  /* Setup car mode gestures */
  const carPanel = document.getElementById('carModePanel');
  if (carPanel) CarMode.setup(carPanel);

  /* ── Transfer panel ────────────────────────────── */
  document.getElementById('sheetTransferBtn')?.addEventListener('click', () => TransferManager.open());
  document.getElementById('transferOverlay')?.addEventListener('click', () => TransferManager.close());

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

  /* ── Nav tab for downloads ─────────────────────── */
  document.querySelectorAll('.bnav-btn[data-page="pageDownloads"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof showPage === 'function') showPage('pageDownloads');
      OfflineManager.renderDownloadsList();
      renderOfflinePlaylist();
      updateOfflineStatusBanner();
    });
  });

  /* ── Downloads badge target ────────────────────── */
  const badge = document.getElementById('bnavDownloadsBadge');
  if (badge) badge.id = 'bnavDownloads'; // fix the id for OfflineManager to find .nav-badge inside it
  // Reattach badge correctly
  const offlineNavBtn = document.querySelector('.bnav-btn[data-page="pageDownloads"]');
  if (offlineNavBtn) {
    const b = offlineNavBtn.querySelector('span:last-child');
    if (b) b.className = 'nav-badge';
  }
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

  // Get current playing track title to highlight it
  const currentTitleEl = document.getElementById('sheetTitle') || document.getElementById('miniTitle');
  const currentTitle   = currentTitleEl ? currentTitleEl.textContent.trim() : '';

  container.innerHTML = downloaded.map((track, i) => {
    const isPlaying = track.title === currentTitle && currentTitle !== '—';
    return `
      <div class="offline-track-row${isPlaying ? ' playing' : ''}"
           data-file="${track.file}" data-index="${i}" role="button" tabindex="0"
           aria-label="Reproducir ${track.title}">
        <span class="offline-track-num">${isPlaying
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
          <div class="offline-dot-saved" title="Guardada offline"></div>
        </div>
      </div>`;
  }).join('');

  // Click on a track to play it (using offline src if possible)
  container.querySelectorAll('.offline-track-row').forEach((row, i) => {
    const play = async () => {
      const track = downloaded[i];
      if (!track) return;
      // Build an offline queue starting from this track
      const queue = [...downloaded.slice(i), ...downloaded.slice(0, i)];
      // Use existing loadTrack if available — it will pick offline src automatically
      if (typeof loadTrack === 'function') {
        // Set up queue
        if (typeof window.playQueue !== 'undefined') {
          window.playQueue = queue;
          window.playQueueIndex = 0;
        }
        loadTrack(track, false);
      }
      // Re-render to update highlight
      setTimeout(() => renderOfflinePlaylist(), 300);
    };
    row.addEventListener('click', play);
    row.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } });
  });

  // Play all button
  if (playAllBtn) {
    playAllBtn.onclick = () => {
      if (downloaded.length === 0) return;
      if (typeof loadTrack === 'function') {
        if (typeof window.playQueue !== 'undefined') {
          window.playQueue = [...downloaded];
          window.playQueueIndex = 0;
        }
        loadTrack(downloaded[0], false);
      }
      setTimeout(() => renderOfflinePlaylist(), 300);
    };
  }

  // Shuffle button
  if (shuffleBtn) {
    shuffleBtn.onclick = () => {
      if (downloaded.length === 0) return;
      const shuffled = [...downloaded].sort(() => Math.random() - 0.5);
      if (typeof loadTrack === 'function') {
        if (typeof window.playQueue !== 'undefined') {
          window.playQueue = shuffled;
          window.playQueueIndex = 0;
        }
        loadTrack(shuffled[0], false);
        // Enable shuffle mode if possible
        if (typeof window.shuffleOn !== 'undefined') window.shuffleOn = true;
      }
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
   BOOT — Init all modules after DOM ready
══════════════════════════════════════════════════════ */
function bootPremium() {
  injectPremiumDOM();
  patchExistingFunctions();
  setupPremiumEvents();

  // Init modules
  OfflineManager.init();
  OfflineManager.setupOfflineDetection();
  TransferManager.init();
  CloudSync.init();

  // Render offline playlist (after IDB is ready, slight delay)
  setTimeout(() => { renderOfflinePlaylist(); updateOfflineStatusBanner(); }, 400);

  // Register SW
  registerServiceWorker();

  console.info('[DROPLY Premium] ✓ Módulos cargados: Offline · Modo Coche · Transferencia · Cloud Sync');
}

// Boot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootPremium);
} else {
  // Small delay to ensure script.js has finished its init()
  setTimeout(bootPremium, 0);
}