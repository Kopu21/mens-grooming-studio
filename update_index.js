const fs = require('fs');

let idx = fs.readFileSync('index.html', 'utf8');

// Replace Black Amber & Cedar Beard Oil
idx = idx.replace(/<img[^>]*alt="Black Amber & Cedar Beard Oil[^"]*"[^>]*>/i, '<img src="images/black-amber-cedar-beard-oil.jpg" alt="Black Amber & Cedar Beard Oil in luxury dark amber dropper bottle on natural cedarwood and slate" loading="lazy">');
idx = idx.replace(/(data-name="Black Amber & Cedar Beard Oil"[^>]*data-image=")[^"]*(")/i, '$1images/black-amber-cedar-beard-oil.jpg$2');

// Replace Sandalwood Botanical Shave Cream
idx = idx.replace(/<img[^>]*alt="Sandalwood Botanical Shave Cream"[^>]*>/i, '<img src="images/sandalwood-botanical-shave-cream.jpg" alt="Sandalwood Botanical Shave Cream" loading="lazy">');
idx = idx.replace(/(data-name="Sandalwood Botanical Shave Cream"[^>]*data-image=")[^"]*(")/i, '$1images/sandalwood-botanical-shave-cream.jpg$2');

// Replace Nordic Spruce Sculpting Balm
idx = idx.replace(/<img[^>]*alt="Nordic Spruce Sculpting Balm"[^>]*>/i, '<img src="images/nordic-spruce-sculpting-balm.jpg" alt="Nordic Spruce Sculpting Balm" loading="lazy">');
idx = idx.replace(/(data-name="Nordic Spruce Sculpting Balm"[^>]*data-image=")[^"]*(")/i, '$1images/nordic-spruce-sculpting-balm.jpg$2');

// Replace Volcanic Sea Clay Pomade
idx = idx.replace(/<img[^>]*alt="Volcanic Sea Clay Pomade[^"]*"[^>]*>/i, '<img src="images/volcanic-sea-clay-pomade.jpg" alt="Volcanic Sea Clay Pomade open jar revealing dense matte textured hair styling clay on volcanic rock" loading="lazy">');
idx = idx.replace(/(data-name="Volcanic Sea Clay Pomade"[^>]*data-image=")[^"]*(")/i, '$1images/volcanic-sea-clay-pomade.jpg$2');

fs.writeFileSync('index.html', idx, 'utf8');
console.log('✅ index.html updated');
