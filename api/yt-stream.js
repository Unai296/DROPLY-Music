/* ═══════════════════════════════════════════════════════════
   DROPLY — api/yt-stream.js  (Edge Function)
   Hace pipe del stream de audio de YouTube al cliente.
   Usar Edge runtime evita el timeout de serverless.
═══════════════════════════════════════════════════════════ */

export const config = { runtime: 'edge' };

const YT_BASE = 'https://www.youtube.com/watch?v=';

/* Extraer formatos de audio del innertube response */
async function getAudioUrl(videoId) {
  const body = JSON.stringify({
    context: {
      client: {
        clientName: 'ANDROID',
        clientVersion: '17.31.35',
        androidSdkVersion: 30,
        hl: 'en',
        gl: 'US'
      }
    },
    videoId
  });

  const res = await fetch('https://www.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'com.google.android.youtube/17.31.35 (Linux; U; Android 11) gzip',
      'X-YouTube-Client-Name': '3',
      'X-YouTube-Client-Version': '17.31.35'
    },
    body
  });

  if (!res.ok) throw new Error(`YT_API_${res.status}`);
  const data = await res.json();

  const formats = [
    ...(data?.streamingData?.adaptiveFormats || []),
    ...(data?.streamingData?.formats || [])
  ].filter(f => f.mimeType?.startsWith('audio'));

  if (!formats.length) throw new Error('NO_AUDIO_FORMAT');

  /* Preferir m4a/mp4 (mejor soporte móvil) */
  const m4a  = formats.filter(f => f.mimeType.includes('mp4')).sort((a,b) => (b.bitrate||0)-(a.bitrate||0));
  const webm = formats.filter(f => f.mimeType.includes('webm')).sort((a,b) => (b.bitrate||0)-(a.bitrate||0));
  const best = m4a[0] || webm[0] || formats[0];

  return {
    url:      best.url,
    mimeType: best.mimeType.split(';')[0],
    duration: parseInt(data?.videoDetails?.lengthSeconds || '0', 10)
  };
}

export default async function handler(req) {
  const url = new URL(req.url);

  /* CORS preflight */
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    });
  }

  const videoId = url.searchParams.get('v') || '';
  if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    return new Response(JSON.stringify({ error: 'INVALID_VIDEO_ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  try {
    const { url: streamUrl, mimeType, duration } = await getAudioUrl(videoId);

    /* Redirigir al cliente a la URL real — desde Edge esto funciona
       porque la IP del edge node está autorizada por YouTube */
    return new Response(null, {
      status: 302,
      headers: {
        'Location': streamUrl,
        'Access-Control-Allow-Origin': '*',
        'X-Duration': String(duration),
        'Cache-Control': 'no-store'
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
