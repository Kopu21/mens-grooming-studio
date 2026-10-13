const https = require('https');
const fs = require('fs');

// Unsplash source search redirect or Wikimedia
const queries = [
  'https://unsplash.com/napi/search/photos?query=barbershop+craftsmanship&per_page=10',
  'https://unsplash.com/napi/search/photos?query=vintage+barbershop&per_page=10',
  'https://unsplash.com/napi/search/photos?query=barber+haircut&per_page=10'
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', resolve);
  });
}

async function search() {
  const res = await fetchJson(queries[0]);
  if (res && res.results) {
    console.log('Results:');
    res.results.forEach((r, i) => {
      console.log(`${i}: id=${r.id}, alt=${r.alt_description}, url=${r.urls ? r.urls.raw : ''}`);
    });
  } else {
    console.log('No direct results, testing known curated high-quality IDs:');
  }
}

search();
