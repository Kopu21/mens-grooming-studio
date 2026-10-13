const https = require('https');
const fs = require('fs');

const testList = [
  { id: 'photo-1521590832167-7bcbfaa6381f', name: 'cand_tools.jpg' },
  { id: 'photo-1522337360788-8b13dee7a37e', name: 'cand_chair.jpg' },
  { id: 'photo-1622288432450-277d0fef5ed6', name: 'cand_salon.jpg' }
];

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const c of testList) {
    const url = `https://images.unsplash.com/${c.id}?auto=format&fit=crop&w=1200&q=80`;
    await download(url, c.name);
    console.log(`Downloaded ${c.name}`);
  }
}

run();
