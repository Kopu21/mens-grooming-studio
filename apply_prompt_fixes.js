const fs = require('fs');
const path = require('path');

console.log('=== APPLYING EXACT IMAGE & BUTTON ALIGNMENT FIXES ===\n');

// =========================================================================
// 1. PRODUCTS.HTML: REPLACE 3 SPECIFIC IMAGES & FIX BUTTONS
// =========================================================================
let prod = fs.readFileSync('products.html', 'utf8');

// A. Beard Care - Tea Tree Clarifying Beard Wash (Card P7)
// Replace image and data-image
prod = prod.replace(
  /<img[^>]*alt="Tea Tree Clarifying Beard Wash[^"]*"[^>]*>/i,
  '<img src="images/unique-tea-tree-clarifying-beard-wash.jpg" alt="Tea Tree Clarifying Beard Wash with Peppermint & Essential Oils" loading="lazy">'
);
prod = prod.replace(
  /(data-id="p7"[^>]*data-image=")[^"]*(")/i,
  '$1images/unique-tea-tree-clarifying-beard-wash.jpg$2'
);

// B. Signature Elixir - The Black Amber & Cedar Distinction (Spotlight 1)
prod = prod.replace(
  /<img[^>]*alt="Black Amber & Cedar Beard Oil Spotlight"[^>]*class="product-spotlight-img"[^>]*>/i,
  '<img src="images/unique-signature-elixir-black-amber-cedar.jpg" alt="The Black Amber & Cedar Distinction Signature Elixir luxury beard oil bottle on cedarwood and amber resin" class="product-spotlight-img" loading="lazy">'
);
prod = prod.replace(
  /(<button[^>]*class="btn btn-primary add-to-cart-btn"[^>]*data-name="Black Amber & Cedar Beard Oil"[^>]*data-image=")[^"]*(")/i,
  '$1images/unique-signature-elixir-black-amber-cedar.jpg$2'
);

// C. Texturizing Mineral Clay - Icelandic Volcanic Sea Clay Pomade (Spotlight 2)
prod = prod.replace(
  /<img[^>]*alt="Volcanic Sea Clay Pomade Spotlight"[^>]*class="product-spotlight-img"[^>]*>/i,
  '<img src="images/unique-icelandic-volcanic-sea-clay-pomade.jpg" alt="Icelandic Volcanic Sea Clay Pomade open jar on Icelandic lava rock with textured charcoal clay" class="product-spotlight-img" loading="lazy">'
);
prod = prod.replace(
  /(<button[^>]*class="btn btn-primary add-to-cart-btn"[^>]*data-name="Volcanic Sea Clay Pomade"[^>]*data-image=")[^"]*(")/i,
  '$1images/unique-icelandic-volcanic-sea-clay-pomade.jpg$2'
);

// Standardize buttons in products.html to have data-title and data-img as well
prod = prod.replace(/data-name="([^"]+)"\s+data-price="([^"]+)"\s+data-image="([^"]+)"/g, (match, name, price, img) => {
  return `data-name="${name}" data-title="${name}" data-price="${price}" data-image="${img}" data-img="${img}"`;
});

fs.writeFileSync('products.html', prod, 'utf8');
console.log('✅ products.html updated: 3 unique images applied, spotlight banners and card buttons updated.');

// =========================================================================
// 2. HOME-1.HTML: BUTTON ALIGNMENT & STANDARDIZATION
// =========================================================================
let h1 = fs.readFileSync('home-1.html', 'utf8');

// Replace .product-footer with .product-price-row and update button text to "+ Add to Satchel"
// Also ensure data-name and data-image are present
h1 = h1.replace(
  /<div class="product-footer">\s*<span class="product-price">\$48\.00<\/span>\s*<button class="btn btn-primary btn-sm add-to-cart-btn" data-id="p1" data-title="Black Amber & Cedar Beard Oil" data-price="48\.00" data-img="([^"]+)">\s*<i class="fas fa-plus"><\/i>\s*Add\s*<\/button>\s*<\/div>/g,
  `<div class="product-price-row">
              <span class="product-price">$48.00</span>
              <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="p1" data-name="Black Amber & Cedar Beard Oil" data-title="Black Amber & Cedar Beard Oil" data-price="48.00" data-image="$1" data-img="$1">
                <i class="fas fa-plus"></i> Add to Satchel
              </button>
            </div>`
);

h1 = h1.replace(
  /<div class="product-footer">\s*<span class="product-price">\$42\.00<\/span>\s*<button class="btn btn-primary btn-sm add-to-cart-btn" data-id="p2" data-title="Sandalwood Botanical Shave Cream" data-price="42\.00" data-img="([^"]+)">\s*<i class="fas fa-plus"><\/i>\s*Add\s*<\/button>\s*<\/div>/g,
  `<div class="product-price-row">
              <span class="product-price">$42.00</span>
              <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="p2" data-name="Sandalwood Botanical Shave Cream" data-title="Sandalwood Botanical Shave Cream" data-price="42.00" data-image="$1" data-img="$1">
                <i class="fas fa-plus"></i> Add to Satchel
              </button>
            </div>`
);

h1 = h1.replace(
  /<div class="product-footer">\s*<span class="product-price">\$38\.00<\/span>\s*<button class="btn btn-primary btn-sm add-to-cart-btn" data-id="p4" data-title="Volcanic Sea Clay Pomade" data-price="38\.00" data-img="([^"]+)">\s*<i class="fas fa-plus"><\/i>\s*Add\s*<\/button>\s*<\/div>/g,
  `<div class="product-price-row">
              <span class="product-price">$38.00</span>
              <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="p4" data-name="Volcanic Sea Clay Pomade" data-title="Volcanic Sea Clay Pomade" data-price="38.00" data-image="$1" data-img="$1">
                <i class="fas fa-plus"></i> Add to Satchel
              </button>
            </div>`
);

fs.writeFileSync('home-1.html', h1, 'utf8');
console.log('✅ home-1.html updated: buttons aligned with .product-price-row and styled as "+ Add to Satchel".');

// =========================================================================
// 3. HOME-2.HTML: BUTTON ALIGNMENT & STANDARDIZATION
// =========================================================================
let h2 = fs.readFileSync('home-2.html', 'utf8');

h2 = h2.replace(
  /<div class="product-footer">\s*<span class="product-price">\$44\.00<\/span>\s*<button class="btn btn-primary btn-sm add-to-cart-btn" data-id="p3" data-title="Nordic Spruce Sculpting Balm" data-price="44\.00" data-img="([^"]+)">\s*<i class="fas fa-plus"><\/i>\s*Add\s*<\/button>\s*<\/div>/g,
  `<div class="product-price-row">
              <span class="product-price">$44.00</span>
              <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="p3" data-name="Nordic Spruce Sculpting Balm" data-title="Nordic Spruce Sculpting Balm" data-price="44.00" data-image="$1" data-img="$1">
                <i class="fas fa-plus"></i> Add to Satchel
              </button>
            </div>`
);

h2 = h2.replace(
  /<div class="product-footer">\s*<span class="product-price">\$36\.00<\/span>\s*<button class="btn btn-primary btn-sm add-to-cart-btn" data-id="p7" data-title="Tea Tree Clarifying Beard Wash" data-price="36\.00" data-img="([^"]+)">\s*<i class="fas fa-plus"><\/i>\s*Add\s*<\/button>\s*<\/div>/g,
  `<div class="product-price-row">
              <span class="product-price">$36.00</span>
              <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="p7" data-name="Tea Tree Clarifying Beard Wash" data-title="Tea Tree Clarifying Beard Wash" data-price="36.00" data-image="$1" data-img="$1">
                <i class="fas fa-plus"></i> Add to Satchel
              </button>
            </div>`
);

h2 = h2.replace(
  /<div class="product-footer">\s*<span class="product-price">\$165\.00<\/span>\s*<button class="btn btn-primary btn-sm add-to-cart-btn" data-id="p5" data-title="Damascus Straight Edge Razor" data-price="165\.00" data-img="([^"]+)">\s*<i class="fas fa-plus"><\/i>\s*Add\s*<\/button>\s*<\/div>/g,
  `<div class="product-price-row">
              <span class="product-price">$165.00</span>
              <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="p5" data-name="Damascus Straight Edge Razor" data-title="Damascus Straight Edge Razor" data-price="165.00" data-image="$1" data-img="$1">
                <i class="fas fa-plus"></i> Add to Satchel
              </button>
            </div>`
);

fs.writeFileSync('home-2.html', h2, 'utf8');
console.log('✅ home-2.html updated: buttons aligned with .product-price-row and styled as "+ Add to Satchel".');

// =========================================================================
// 4. INDEX.HTML (HOMEPAGE): STANDARDIZE BUTTON LABELS & DATA ATTRIBUTES
// =========================================================================
let idx = fs.readFileSync('index.html', 'utf8');

idx = idx.replace(
  /<div class="product-price-row">\s*<div class="product-price">([^<]+)<\/div>\s*<button class="btn btn-primary btn-sm add-to-cart-btn" data-id="([^"]+)" data-name="([^"]+)" data-price="([^"]+)" data-image="([^"]+)">\s*<i class="fas fa-plus"><\/i>\s*Add\s*<\/button>\s*<\/div>/g,
  `<div class="product-price-row">
              <div class="product-price">$1</div>
              <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="$2" data-name="$3" data-title="$3" data-price="$4" data-image="$5" data-img="$5">
                <i class="fas fa-plus"></i> Add to Satchel
              </button>
            </div>`
);

fs.writeFileSync('index.html', idx, 'utf8');
console.log('✅ index.html updated: buttons styled consistently with "+ Add to Satchel".');

// =========================================================================
// 5. CSS/STYLE.CSS: BULLETPROOF PRODUCT CARD & BUTTON ALIGNMENT
// =========================================================================
let css = fs.readFileSync('css/style.css', 'utf8');

// Ensure .product-card, .product-body, .product-price-row, .product-footer have exact flexbox alignment
const cssAlignmentFix = `
/* ==========================================================================
   Bulletproof Product Card & "+ Add to Satchel" Button Alignment
   ========================================================================== */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 28px;
  align-items: stretch;
}

.product-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: var(--transition-smooth);
  display: flex !important;
  flex-direction: column !important;
  position: relative;
  height: 100% !important;
}

.product-card .product-img-wrap {
  position: relative;
  height: 270px;
  min-height: 270px;
  max-height: 270px;
  background: #11141a;
  overflow: hidden;
  flex-shrink: 0;
}

.product-card .product-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease;
}

.product-card .product-body {
  padding: 22px;
  display: flex !important;
  flex-direction: column !important;
  flex: 1 1 auto !important;
  height: 100% !important;
}

.product-card .product-title {
  font-size: 1.15rem;
  margin-bottom: 8px;
  line-height: 1.35;
}

.product-card .product-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 16px;
}

.product-price-row,
.product-footer {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  margin-top: auto !important;
  padding-top: 14px !important;
  border-top: 1px solid var(--border-subtle) !important;
  width: 100% !important;
  gap: 10px !important;
}

.product-price-row .product-price,
.product-footer .product-price {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-white);
  white-space: nowrap;
}

.product-price-row .add-to-cart-btn,
.product-footer .add-to-cart-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 6px !important;
  white-space: nowrap !important;
  font-size: 0.78rem !important;
  font-weight: 700 !important;
  padding: 8px 14px !important;
  border-radius: var(--radius-sm) !important;
  flex-shrink: 0 !important;
  cursor: pointer;
  letter-spacing: 0.03em;
  margin-left: auto;
  line-height: 1.2 !important;
}
`;

// Append or update in style.css
if (css.includes('Bulletproof Product Card & "+ Add to Satchel" Button Alignment')) {
  css = css.replace(/\/\* ==========================================================================\s+Bulletproof Product Card & "\+ Add to Satchel" Button Alignment[\s\S]*?\*\/[\s\S]*?(?=\n\/\*|$)/, cssAlignmentFix.trim());
} else {
  css += '\n' + cssAlignmentFix;
}

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('✅ css/style.css updated with guaranteed bottom button alignment rules.');
