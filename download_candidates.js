const https = require('https');
const fs = require('fs');

const candidates = [
  { id: 'photo-1592647420148-bfcc177e2117', name: 'cand_barber_1.jpg' },
  { id: 'photo-1517832606299-7ae9b720a186', name: 'cand_barber_2.jpg' },
  { id: 'photo-1596704017254-9b121068fb31', name: 'cand_barber_3.jpg' },
  { id: 'photo-1534778101976-62847782c213', name: 'cand_barber_4.jpg' },
  { id: 'photo-1622288432450-277d0fef5ed6', name: 'cand_barber_5.jpg' },
  { id: 'photo-1501196354995-cbb51c65aaea', name: 'cand_barber_6.jpg' }
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
  for (const c of candidates) {
    const url = `https://images.unsplash.com/${c.id}?auto=format&fit=crop&w=1200&q=80`;
    await download(url, c.name);
    console.log(`Downloaded ${c.name}`);
  }
}

run();
