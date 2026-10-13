const fs = require('fs');
const path = require('path');

// 1. Update home-1.html
let h1 = fs.readFileSync('home-1.html', 'utf8');

// Replace Product 1: Black Amber & Cedar Beard Oil
h1 = h1.replace(/<img[^>]*alt="Black Amber & Cedar Beard Oil"[^>]*>/i, '<img src="images/black-amber-cedar-beard-oil.jpg" alt="Black Amber & Cedar Beard Oil" loading="lazy">');
h1 = h1.replace(/(data-title="Black Amber & Cedar Beard Oil"[^>]*data-img=")[^"]*(")/i, '$1images/black-amber-cedar-beard-oil.jpg$2');

// Replace Product 2: Sandalwood Botanical Shave Cream
h1 = h1.replace(/<img[^>]*alt="Sandalwood Botanical Shave Cream"[^>]*>/i, '<img src="images/sandalwood-botanical-shave-cream.jpg" alt="Sandalwood Botanical Shave Cream" loading="lazy">');
h1 = h1.replace(/(data-title="Sandalwood Botanical Shave Cream"[^>]*data-img=")[^"]*(")/i, '$1images/sandalwood-botanical-shave-cream.jpg$2');

// Replace Product 3: Volcanic Sea Clay Pomade
h1 = h1.replace(/<img[^>]*alt="Volcanic Sea Clay Pomade"[^>]*>/i, '<img src="images/volcanic-sea-clay-pomade.jpg" alt="Volcanic Sea Clay Pomade" loading="lazy">');
h1 = h1.replace(/(data-title="Volcanic Sea Clay Pomade"[^>]*data-img=")[^"]*(")/i, '$1images/volcanic-sea-clay-pomade.jpg$2');

fs.writeFileSync('home-1.html', h1, 'utf8');
console.log('✅ home-1.html updated with verified images');

// 2. Update services.html Hero Image
let s = fs.readFileSync('services.html', 'utf8');
s = s.replace(/url\('https:\/\/images\.unsplash\.com\/photo-[^']*'\)/, "url('images/services-hero-master-barber.jpg')");
s = s.replace(/(page-bg-backdrop" style="background-image: var\(--overlay-banner\), url\(')[^']*('\);)/, "$1images/services-hero-master-barber.jpg$2");

fs.writeFileSync('services.html', s, 'utf8');
console.log('✅ services.html hero image updated with verified master barber image');

// 3. Update products.html
let p = fs.readFileSync('products.html', 'utf8');
p = p.replace(/<img[^>]*alt="Black Amber & Cedar Beard Oil"[^>]*>/i, '<img src="images/black-amber-cedar-beard-oil.jpg" alt="Black Amber & Cedar Beard Oil" loading="lazy">');
p = p.replace(/(data-name="Black Amber & Cedar Beard Oil"[^>]*data-image=")[^"]*(")/i, '$1images/black-amber-cedar-beard-oil.jpg$2');

p = p.replace(/<img[^>]*alt="Nordic Spruce Sculpting Balm"[^>]*>/i, '<img src="images/nordic-spruce-sculpting-balm.jpg" alt="Nordic Spruce Sculpting Balm" loading="lazy">');
p = p.replace(/(data-name="Nordic Spruce Sculpting Balm"[^>]*data-image=")[^"]*(")/i, '$1images/nordic-spruce-sculpting-balm.jpg$2');

p = p.replace(/<img[^>]*alt="Volcanic Sea Clay Pomade"[^>]*>/i, '<img src="images/volcanic-sea-clay-pomade.jpg" alt="Volcanic Sea Clay Pomade" loading="lazy">');
p = p.replace(/(data-name="Volcanic Sea Clay Pomade"[^>]*data-image=")[^"]*(")/i, '$1images/volcanic-sea-clay-pomade.jpg$2');

p = p.replace(/<img[^>]*alt="Damascus Straight Edge Razor"[^>]*>/i, '<img src="images/damascus-steel-straight-razor.jpg" alt="Damascus Straight Edge Razor" loading="lazy">');
p = p.replace(/(data-name="Damascus Straight Edge Razor"[^>]*data-image=")[^"]*(")/i, '$1images/damascus-steel-straight-razor.jpg$2');

p = p.replace(/<img[^>]*alt="Smoked Oak & Bourbon Extract"[^>]*>/i, '<img src="images/smoked-oak-bourbon-cologne.jpg" alt="Smoked Oak & Bourbon Extract" loading="lazy">');
p = p.replace(/(data-name="Smoked Oak & Bourbon Extract"[^>]*data-image=")[^"]*(")/i, '$1images/smoked-oak-bourbon-cologne.jpg$2');

p = p.replace(/<img[^>]*alt="Silvertip Shaving Brush & Stand"[^>]*>/i, '<img src="images/silvertip-badger-shaving-brush.jpg" alt="Silvertip Shaving Brush & Stand" loading="lazy">');
p = p.replace(/(data-name="Silvertip Shaving Brush & Stand"[^>]*data-image=")[^"]*(")/i, '$1images/silvertip-badger-shaving-brush.jpg$2');

p = p.replace(/<img[^>]*alt="Sandalwood Botanical Shave Cream"[^>]*>/i, '<img src="images/sandalwood-botanical-shave-cream.jpg" alt="Sandalwood Botanical Shave Cream" loading="lazy">');
p = p.replace(/(data-name="Sandalwood Botanical Shave Cream"[^>]*data-image=")[^"]*(")/i, '$1images/sandalwood-botanical-shave-cream.jpg$2');

fs.writeFileSync('products.html', p, 'utf8');
console.log('✅ products.html updated with verified images');
