const YT_API = 'https://youtubei.googleapis.com/youtubei/v1/player';

function nonce(len = 16) {
  let s = '';
  while (s.length < len) s += Math.random().toString(36).slice(2);
  return s.slice(0, len);
}

const CLIENTS = [
  {
    name: 'ANDROID',
    version: '19.44.38',
    os: 'Android',
    osVersion: '11',
    sdkVersion: '30',
    userAgent: 'com.google.android.youtube/19.44.38 (Linux; U; Android 11) gzip',
  },
  {
    name: 'IOS',
    version: '19.45.4',
    os: 'iOS',
    osVersion: '17.5.1.21F90',
    sdkVersion: '17.5.1.21F90',
    userAgent: 'com.google.ios.youtube/19.45.4 (iPhone16,2; U; CPU iOS 17_5_1 like Mac OS X)',
  },
];

function buildPayload(videoId, clientInfo) {
  return {
    videoId,
    cpn: nonce(),
    contentCheckOk: true,
    racyCheckOk: true,
    context: {
      client: {
        clientName: clientInfo.name,
        clientVersion: clientInfo.version,
        platform: 'MOBILE',
        osName: clientInfo.os,
        osVersion: clientInfo.osVersion,
        androidSdkVersion: clientInfo.sdkVersion,
        hl: 'en',
        gl: 'US',
        utcOffsetMinutes: 0,
      },
      request: { internalExperimentFlags: [], useSsl: true },
      user: { lockedSafetyMode: false },
    },
  };
}

async function tryClient(videoId, clientInfo) {
  const payload = buildPayload(videoId, clientInfo);
  const url = `${YT_API}?prettyPrint=false&t=${nonce()}&id=${videoId}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': clientInfo.userAgent,
      'X-Goog-Api-Format-Version': '2',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} for ${clientInfo.name}`);

  const data = await res.json();
  const status = data.playabilityStatus?.status;

  if (status !== 'OK') {
    throw new Error(`${clientInfo.name}: ${data.playabilityStatus?.reason || status}`);
  }

  const formats = [
    ...(data.streamingData?.formats || []),
    ...(data.streamingData?.adaptiveFormats || []),
  ];

  return { data, formats };
}

async function extractAudioUrl(videoId) {
  let lastError;

  for (const client of CLIENTS) {
    try {
      const { data, formats } = await tryClient(videoId, client);
      if (formats.length === 0) { lastError = new Error('empty formats'); continue; }

      const audioFormats = formats
        .filter(f => f.mimeType?.startsWith('audio/'))
        .filter(f => f.url || f.signatureCipher || f.cipher)
        .sort((a, b) => (a.bitrate || a.averageBitrate || 0) - (b.bitrate || b.averageBitrate || 0));

      if (audioFormats.length === 0) { lastError = new Error('no audio formats'); continue; }

      const best = audioFormats[0];
      let finalUrl = best.url || best.signatureCipher || best.cipher;

      if (!best.url && finalUrl) {
        const params = new URLSearchParams(finalUrl);
        const decoded = params.get('url');
        if (decoded) finalUrl = decodeURIComponent(decoded);
      }

      const thumbnails = data.videoDetails?.thumbnail?.thumbnails || [];
      const bestThumbnail = thumbnails.reduce((a, b) =>
        (a.width || 0) > (b.width || 0) ? a : b, thumbnails[0] || {});

      return {
        title: data.videoDetails?.title || 'Unknown',
        duration: parseInt(data.videoDetails?.lengthSeconds) || 0,
        audioUrl: finalUrl,
        cover: bestThumbnail?.url || null,
        videoId,
      };
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error('All clients failed');
}

module.exports = async (req, res) => {
  const { videoId, json } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'Missing "videoId" query parameter' });
  }

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Range');
    return res.status(200).end();
  }

  try {
    const info = await extractAudioUrl(videoId);

    if (json === '1') {
      return res.json(info);
    }

    // redirect to the YouTube CDN audio URL – browser follows transparently,
    // no CORS issues for <audio> elements on redirect
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.redirect(302, info.audioUrl);
  } catch (err) {
    console.error('[ytstream] Error:', err.message);
    if (json === '1') {
      res.status(200).json({ error: 'No se pudo obtener el audio: ' + err.message });
    } else {
      res.status(404).end();
    }
  }
};
