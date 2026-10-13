const fs = require('fs');
const s = fs.readFileSync('services.html', 'utf8');

function findCard(query) {
  const idx = s.indexOf(query);
  if (idx === -1) {
    console.log('Not found:', query);
    return;
  }
  const start = s.lastIndexOf('service-card', idx);
  console.log('=== CARD FOR ' + query + ' ===');
  console.log(s.substring(start - 12, start + 600));
}

findCard('The Groomsmen Private Suite');
findCard('Full Cranial Razor Shave & Steam');
findCard('Mustache & Goatee');
