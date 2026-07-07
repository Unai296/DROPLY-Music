const express = require('express');
const { execFile } = require('child_process');
const { promisify } = require('util');
const { join } = require('path');

const execFileAsync = promisify(execFile);
const YTDLP = join(__dirname, 'yt-dlp');
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  next();
});

/* ── GET /info?videoId=XXX ─────────────────────────────
   Returns JSON with metadata + direct audio URL from yt-dlp.
   URL works because yt-dlp transforms the n-parameter correctly.
────────────────────────────────────────────────────── */
app.get('/info', async (req, res) => {
  const { videoId } = req.query;
  if (!videoId) return res.status(400).json({ error: 'Missing videoId' });

  try {
    const url = `https://youtube.com/watch?v=${videoId}`;

    const [infoResult, urlResult] = await Promise.all([
      execFileAsync(YTDLP, ['-j', '--no-download', url], { timeout: 30000 }),
      execFileAsync(YTDLP, ['-g', '-f', 'bestaudio[ext=m4a]/bestaudio', url], { timeout: 30000 }),
    ]);

    const info = JSON.parse(infoResult.stdout);
    const audioUrl = urlResult.stdout.trim();

    res.json({
      title: info.title,
      duration: info.duration,
      cover: info.thumbnail,
      audioUrl,
      videoId,
    });
  } catch (err) {
    console.error('[info]', err.message);
    res.status(500).json({ error: err.message });
  }
});

/* ── GET /stream?videoId=XXX ───────────────────────────
   Proxies audio directly through the server.
   Avoids CORS / CDN restrictions for the client browser.
────────────────────────────────────────────────────── */
app.get('/stream', async (req, res) => {
  const { videoId } = req.query;
  if (!videoId) return res.status(400).json({ error: 'Missing videoId' });

  try {
    const url = `https://youtube.com/watch?v=${videoId}`;
    const { stdout } = await execFileAsync(YTDLP, [
      '-g', '-f', 'bestaudio[ext=m4a]/bestaudio', url,
    ], { timeout: 30000 });

    const cdnUrl = stdout.trim();
    const cdnResp = await fetch(cdnUrl);

    if (!cdnResp.ok) {
      return res.status(cdnResp.status).send('Audio fetch failed');
    }

    res.setHeader('Content-Type', cdnResp.headers.get('content-type') || 'audio/mp4');
    cdnResp.body.pipe(res);
  } catch (err) {
    console.error('[stream]', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`droply-audio-proxy listening on ${PORT}`));
