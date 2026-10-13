const fs = require('fs');
const prod = fs.readFileSync('products.html', 'utf8');

const s1 = prod.indexOf('Signature Elixir');
const start1 = prod.lastIndexOf('<div class="product-spotlight-banner', s1);
const end1 = prod.indexOf('</div>\n      </div>', s1);
console.log('=== SPOTLIGHT 1 (Signature Elixir) ===');
console.log(prod.substring(start1, s1 + 300));

const s2 = prod.indexOf('Texturizing Mineral Clay');
const start2 = prod.lastIndexOf('<div class="product-spotlight-banner', s2);
const end2 = prod.indexOf('</div>\n      </div>', s2 + 300);
console.log('\n=== SPOTLIGHT 2 (Texturizing Mineral Clay) ===');
console.log(prod.substring(start2, s2 + 600));
