const { createWriteStream, chmodSync, existsSync } = require('fs');
const { get } = require('https');
const { join } = require('path');

const BIN = join(__dirname, 'yt-dlp');
const URL = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp';

if (existsSync(BIN)) {
  console.log('yt-dlp already exists, skipping download');
  process.exit(0);
}

console.log(`Downloading yt-dlp from ${URL}...`);

const file = createWriteStream(BIN);
get(URL, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Download failed with status ${res.statusCode}`);
    process.exit(1);
  }
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    chmodSync(BIN, 0o755);
    console.log('yt-dlp downloaded successfully');
  });
}).on('error', (err) => {
  console.error('Download failed:', err.message);
  process.exit(1);
});
