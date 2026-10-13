const https = require('https');

const candidates = [
  // Groomsmen candidates
  'photo-1519741497674-611481863552',
  'photo-1520854221256-17451cc331bf',
  'photo-1507676184212-d03ab07a01bf',
  'photo-1543807535-eceef0bc6599',
  'photo-1606800052052-a08af7148866',
  'photo-1511285560929-80b456fea0bc',
  'photo-1525268771113-32d9e9021a97',
  'photo-1522673607200-164d1b6ce486',
  'photo-1583939003579-730e3918a45a',
  
  // Head Shave candidates
  'photo-1512690459411-b9245aed614b',
  'photo-1562157873-818bc0726f68',
  'photo-1534528741775-53994a69daeb',
  'photo-1520333789090-1afc82db536a',
  'photo-1584297091622-af8e5bd80b13',
  'photo-1516975080664-ed2fc6a32937',
  
  // Mustache & Goatee candidates
  'photo-1532710093739-9470acff878f',
  'photo-1517841905240-472988babdf9',
  'photo-1506794778202-cad84cf45f1d',
  'photo-1605497788044-5a32c7078486'
];

async function check(id) {
  return new Promise((resolve) => {
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;
    https.get(url, (res) => {
      resolve({ id, status: res.statusCode });
    }).on('error', (e) => resolve({ id, status: 500 }));
  });
}

Promise.all(candidates.map(check)).then((results) => {
  results.forEach(r => console.log(r.id, r.status));
});
