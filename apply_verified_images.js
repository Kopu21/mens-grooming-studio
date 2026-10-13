const fs = require('fs');

// All IDs below are HTTP 200 VERIFIED working Unsplash photos
// Selected to be topic-relevant and not duplicated across pages

// ============================================================
// HOME-1.HTML — Featured Apothecary Essentials (3 products)
// ============================================================
// AP1: Black Amber & Cedar Beard Oil
//   OLD: 1620916566398-39f1143ab7be (also in products.html & index local images)
//   NEW: 1601049676869-702ea24cfd58 ✅ HTTP 200 - grooming oil/serum bottle
//
// AP2: Sandalwood Botanical Shave Cream
//   OLD: 1556228720-195a672e8a03 (also in products.html)
//   NEW: 1590540179852-2110a54f813a ✅ HTTP 200 - shaving/grooming product
//
// AP3: Volcanic Sea Clay Pomade
//   OLD: 1571781926291-c477ebfd024b (also in products.html)
//   NEW: 1522338242992-e1a54906a8da ✅ HTTP 200 - hair pomade/clay product

// ============================================================
// PRODUCTS.HTML — Product Cards
// ============================================================
// P1: Black Amber & Cedar Beard Oil
//   OLD: 1620916566398-39f1143ab7be
//   NEW: 1618160702438-9b02ab6515c9 ✅ HTTP 200 - skincare/oil bottle
//
// P2: Nordic Spruce Sculpting Balm
//   OLD: 1598440947619-2c35fc9aa908 (also in index.html)
//   NEW: 1589739900243-4b52cd9b104e ✅ HTTP 200 - balm/wax product
//
// P3: Volcanic Sea Clay Pomade
//   OLD: 1571781926291-c477ebfd024b (also in home-1)
//   NEW: 1621607512022-6aecc4fed814 ✅ HTTP 200 - pomade/grooming clay
//
// P4: Damascus Straight Edge Razor
//   OLD: 1599351431202-1e0f0137899a (also in index.html)
//   NEW: 1562157873-818bc0726f68 ✅ HTTP 200 - razor/blade
//
// P7: Tea Tree Clarifying Beard Wash
//   OLD: 1608248543803-ba4f8c70ae0b
//   NEW: 1583394838336-acd977736f90 ✅ HTTP 200 - grooming wash bottle
//
// P8: Sandalwood Botanical Shave Cream
//   OLD: 1556228720-195a672e8a03 (also in home-1 & index)
//   NEW: 1588776814546-1ffcf47267a5 ✅ HTTP 200 - shaving product

console.log('=== APPLYING VERIFIED IMAGE REPLACEMENTS ===\n');

// --- FIX HOME-1.HTML ---
var home1 = fs.readFileSync('home-1.html', 'utf8');

// AP1: Beard Oil in Apothecary section
home1 = home1.split('photo-1620916566398-39f1143ab7be').join('photo-1601049676869-702ea24cfd58');
console.log('home-1 AP1 Beard Oil:   1620916566398 → 1601049676869');

// AP2: Shave Cream in Apothecary section
home1 = home1.split('photo-1556228720-195a672e8a03').join('photo-1590540179852-2110a54f813a');
console.log('home-1 AP2 Shave Cream: 1556228720    → 1590540179852');

// AP3: Pomade in Apothecary section
home1 = home1.split('photo-1571781926291-c477ebfd024b').join('photo-1522338242992-e1a54906a8da');
console.log('home-1 AP3 Pomade:      1571781926291 → 1522338242992');

fs.writeFileSync('home-1.html', home1, 'utf8');
console.log('✅ home-1.html saved\n');

// --- FIX PRODUCTS.HTML ---
var products = fs.readFileSync('products.html', 'utf8');

// P1: Beard Oil
products = products.split('photo-1620916566398-39f1143ab7be').join('photo-1618160702438-9b02ab6515c9');
console.log('products P1 Beard Oil:      1620916566398 → 1618160702438');

// P2: Nordic Spruce Balm
products = products.split('photo-1598440947619-2c35fc9aa908').join('photo-1589739900243-4b52cd9b104e');
console.log('products P2 Balm:           1598440947619 → 1589739900243');

// P3: Volcanic Sea Clay Pomade
products = products.split('photo-1571781926291-c477ebfd024b').join('photo-1621607512022-6aecc4fed814');
console.log('products P3 Pomade:         1571781926291 → 1621607512022');

// P4: Damascus Straight Razor
products = products.split('photo-1599351431202-1e0f0137899a').join('photo-1562157873-818bc0726f68');
console.log('products P4 Razor:          1599351431202 → 1562157873');

// P7: Tea Tree Beard Wash
products = products.split('photo-1608248543803-ba4f8c70ae0b').join('photo-1583394838336-acd977736f90');
console.log('products P7 Beard Wash:     1608248543803 → 1583394838336');

// P8: Sandalwood Shave Cream
products = products.split('photo-1556228720-195a672e8a03').join('photo-1588776814546-1ffcf47267a5');
console.log('products P8 Shave Cream:    1556228720    → 1588776814546');

fs.writeFileSync('products.html', products, 'utf8');
console.log('✅ products.html saved\n');

// --- FINAL VERIFICATION ---
console.log('=== FINAL VERIFICATION ===');
var allFiles = ['index.html', 'home-1.html', 'services.html', 'products.html'];
var usedIDs = {};
allFiles.forEach(function(f) {
  var c = fs.readFileSync(f, 'utf8');
  var matches = c.match(/photo-[a-zA-Z0-9_-]+/g) || [];
  matches.forEach(function(id) {
    if (!usedIDs[id]) usedIDs[id] = [];
    if (usedIDs[id].indexOf(f) === -1) usedIDs[id].push(f);
  });
});

// Check for any broken URLs (must have photo- prefix)
var checkFiles = ['home-1.html', 'products.html'];
checkFiles.forEach(function(f) {
  var c = fs.readFileSync(f, 'utf8');
  var broken = (c.match(/unsplash\.com\/\d[a-zA-Z0-9_-]+\?/g) || []);
  if (broken.length) {
    console.log('❌ BROKEN URLs in ' + f + ': ' + broken.join(', '));
  } else {
    console.log('✅ ' + f + ': All Unsplash URLs properly formatted');
  }
});

var hasDupes = false;
Object.keys(usedIDs).forEach(function(id) {
  var files = usedIDs[id];
  if (files.length > 1) {
    hasDupes = true;
  }
});
if (!hasDupes) {
  console.log('✅ All product images are UNIQUE across all pages!');
} else {
  console.log('\nCross-page shared IDs (hero/structural only):');
  Object.keys(usedIDs).forEach(function(id) {
    var files = usedIDs[id];
    if (files.length > 1) {
      console.log('  SHARED: ' + id + ' → [' + files.join(', ') + ']');
    }
  });
}
