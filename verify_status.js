const fs = require('fs');

console.log('--- Checking home-1.html ---');
const h1 = fs.readFileSync('home-1.html', 'utf8');
['black-amber-cedar-beard-oil.jpg', 'sandalwood-botanical-shave-cream.jpg', 'volcanic-sea-clay-pomade.jpg'].forEach(img => {
  console.log(img + ': ' + (h1.includes(img) ? 'FOUND' : 'MISSING'));
});

console.log('\n--- Checking services.html ---');
const s = fs.readFileSync('services.html', 'utf8');
['services-hero-master-barber.jpg'].forEach(img => {
  console.log(img + ': ' + (s.includes(img) ? 'FOUND' : 'MISSING'));
});

console.log('\n--- Checking file existence in images/ ---');
const files = [
  'black-amber-cedar-beard-oil.jpg',
  'sandalwood-botanical-shave-cream.jpg',
  'volcanic-sea-clay-pomade.jpg',
  'services-hero-master-barber.jpg'
];
files.forEach(f => {
  const p = 'images/' + f;
  const stat = fs.existsSync(p) ? fs.statSync(p).size + ' bytes' : 'DOES NOT EXIST';
  console.log(p + ': ' + stat);
});
