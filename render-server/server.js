const express = require('express');
const { execFile } = require('child_process');
const { promisify } = require('util');
const { join, resolve } = require('path');

const execFileAsync = promisify(execFile);
const YTDLP = join(__dirname, 'yt-dlp');
const PUBLIC = resolve(__dirname, '..'); // parent dir = repo root (index.html, etc.)
const app = express();
const PORT = process.env.PORT || 3000;

// ── Health / keep-alive ──
app.get('/ping', (_, res) => res.end('ok'));

// ── API: /info?videoId=XXX ──
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

// ── API: /stream?videoId=XXX (proxy) ──
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

// ── Static frontend (index.html, script.js, styles, sw.js, assets, etc.) ──
app.use(express.static(PUBLIC, {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
  }
}));

// ── SPA fallback: any unmatched route → index.html ──
app.get('*', (_, res) => {
  res.sendFile(join(PUBLIC, 'index.html'));
});

app.listen(PORT, () => console.log(`droply serving at http://localhost:${PORT}`));
