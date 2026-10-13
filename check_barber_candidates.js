const https = require('https');
const fs = require('fs');

async function searchUnsplash(query) {
  // Query Unsplash search via public source / source endpoints or fetch candidates
  console.log('Testing candidates for:', query);
}

// Let's test a curated list of well-known high-res barbershop interior / master barber craft Unsplash photos:
const candidates = [
  'photo-1503951914875-452162b0f3f1', // in use
  'photo-1517832606299-7ae9b720a186', // barbershop interior
  'photo-1585747860715-2ba37e788b70', // in use
  'photo-1592647420148-bfcc177e2117', // traditional barber styling
  'photo-1519699047748-de8e457a634e', // barber cutting hair
  'photo-1534447677768-be436bb09401', // barbershop chairs
  'photo-1521590832167-7bcbfaa6381f', // barber tools
  'photo-1596704017254-9b121068fb31', // vintage barber chair
  'photo-1584297091622-af8e5bd80b13', // in use
  'photo-1599351431202-1e0f0137899a', // in use
  'photo-1516914943479-89db7d9ae7f2', // in use
  'photo-1534778101976-62847782c213', // classic barber
  'photo-1622288432450-277d0fef5ed6', // barber chair
  'photo-1501196354995-cbb51c65aaea', // vintage barbershop
  'photo-1605497788044-5a32c7078486'  // in use
];

async function checkAndDownload() {
  for (const id of candidates) {
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;
    try {
      await new Promise((resolve, reject) => {
        https.get(url, (res) => {
          console.log(`${id}: status ${res.statusCode}`);
          if (res.statusCode === 200 || res.statusCode === 302) {
            resolve();
          } else {
            resolve();
          }
        }).on('error', resolve);
      });
    } catch (e) {
      console.log(id, 'error');
    }
  }
}

checkAndDownload();
