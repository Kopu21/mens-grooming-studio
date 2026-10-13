const https = require('https');
const fs = require('fs');

function api(params) {
  return new Promise((resolve) => {
    const qs = Object.entries(params).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
    const url = `https://commons.wikimedia.org/w/api.php?${qs}&format=json`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Bot/1.0' } }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch(e) { resolve({}); }
      });
    }).on('error', () => resolve({}));
  });
}

function download(url, dest) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Bot/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve);
      }
      const f = fs.createWriteStream(dest);
      res.pipe(f);
      f.on('finish', () => { f.close(); resolve(true); });
    }).on('error', () => resolve(false));
  });
}

async function searchAndGetUrls(term, limit = 5) {
  const searchRes = await api({
    action: 'query',
    list: 'search',
    srnamespace: '6',
    srsearch: term,
    srlimit: limit.toString()
  });

  const titles = (searchRes.query && searchRes.query.search) ? searchRes.query.search.map(s => s.title) : [];
  if (titles.length === 0) return [];

  const infoRes = await api({
    action: 'query',
    titles: titles.join('|'),
    prop: 'imageinfo',
    iiprop: 'url|size'
  });

  const pages = infoRes.query && infoRes.query.pages ? Object.values(infoRes.query.pages) : [];
  return pages.map(p => ({
    title: p.title,
    url: p.imageinfo && p.imageinfo[0] ? p.imageinfo[0].url : null
  })).filter(p => p.url && (p.url.endsWith('.jpg') || p.url.endsWith('.jpeg') || p.url.endsWith('.png')));
}

async function run() {
  console.log('Searching for Groomsmen...');
  const groomsmen = await searchAndGetUrls('groomsmen suits wedding party', 6);
  console.log('Groomsmen results:', groomsmen);

  console.log('Searching for Head Shave...');
  const headShave = await searchAndGetUrls('shaving head straight razor barber', 6);
  console.log('Head Shave results:', headShave);

  console.log('Searching for Mustache / Goatee...');
  const mustache = await searchAndGetUrls('mustache trimming razor barber goatee', 6);
  console.log('Mustache results:', mustache);

  // Download first 2 of each to test
  if (groomsmen[0]) await download(groomsmen[0].url, 'test_groomsmen_1.jpg');
  if (groomsmen[1]) await download(groomsmen[1].url, 'test_groomsmen_2.jpg');

  if (headShave[0]) await download(headShave[0].url, 'test_headshave_1.jpg');
  if (headShave[1]) await download(headShave[1].url, 'test_headshave_2.jpg');

  if (mustache[0]) await download(mustache[0].url, 'test_mustache_1.jpg');
  if (mustache[1]) await download(mustache[1].url, 'test_mustache_2.jpg');

  console.log('Done downloading candidates');
}
run();
