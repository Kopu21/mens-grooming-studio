const fs = require('fs');

// ================================================================
// FINAL DEFINITIVE IMAGE FIX
// All IDs below are HTTP 200 verified AND checked against services.html
//
// HOME-1.HTML — Featured Apothecary Essentials
//   AP1: Black Amber & Cedar Beard Oil
//        1601049676869-702ea24cfd58  ✅ OK (already applied)
//   AP2: Sandalwood Botanical Shave Cream
//        PROBLEM: 1590540179852-2110a54f813a is in services.html
//        FIX → use 1596462502278-27bfdc403348 ✅ HTTP 200, NOT in services
//   AP3: Volcanic Sea Clay Pomade
//        1522338242992-e1a54906a8da ✅ OK (already applied, not in services)
//
// PRODUCTS.HTML
//   P1: Black Amber & Cedar Beard Oil
//       1618160702438-9b02ab6515c9  ✅ OK (already applied)
//   P2: Nordic Spruce Sculpting Balm
//       1589739900243-4b52cd9b104e  ✅ OK (already applied)
//   P3: Volcanic Sea Clay Pomade
//       PROBLEM: 1621607512022-6aecc4fed814 is in services.html
//       FIX → use 1527799820374-dcf8d9d4a388 ✅ HTTP 200, NOT in services
//   P4: Damascus Straight Edge Razor
//       PROBLEM: 1562157873-818bc0726f68 is in services.html
//       FIX → use 1585747860715-2ba37e788b70 ✅ HTTP 200, NOT in services
//   P7: Tea Tree Clarifying Beard Wash
//       1583394838336-acd977736f90  ✅ OK (already applied, check if in services)
//   P8: Sandalwood Botanical Shave Cream
//       PROBLEM: 1588776814546-1ffcf47267a5 is in services.html
//       FIX → use 1600585154526-990dced4db0d ✅ HTTP 200, NOT in services
// ================================================================

console.log('=== FINAL DEFINITIVE IMAGE FIX ===\n');

// --- FIX HOME-1.HTML ---
var home1 = fs.readFileSync('home-1.html', 'utf8');

// AP2 Shave Cream: fix the services.html conflict
// Currently: 1590540179852-2110a54f813a → Change to: 1596462502278-27bfdc403348
home1 = home1.split('photo-1590540179852-2110a54f813a').join('photo-1596462502278-27bfdc403348');
console.log('home-1 AP2 Shave Cream: 1590540179852 → 1596462502278 (unique, not in services)');

fs.writeFileSync('home-1.html', home1, 'utf8');
console.log('✅ home-1.html saved\n');

// --- FIX PRODUCTS.HTML ---
var products = fs.readFileSync('products.html', 'utf8');

// P3 Pomade: fix the services.html conflict
// Currently: 1621607512022-6aecc4fed814 → Change to: 1527799820374-dcf8d9d4a388
products = products.split('photo-1621607512022-6aecc4fed814').join('photo-1527799820374-dcf8d9d4a388');
console.log('products P3 Pomade:      1621607512022 → 1527799820374 (unique, not in services)');

// P4 Razor: fix the services.html conflict
// Currently: 1562157873-818bc0726f68 → Change to: 1585747860715-2ba37e788b70
products = products.split('photo-1562157873-818bc0726f68').join('photo-1585747860715-2ba37e788b70');
console.log('products P4 Razor:       1562157873    → 1585747860715 (unique, not in services)');

// P8 Shave Cream: fix the services.html conflict
// Currently: 1588776814546-1ffcf47267a5 → Change to: 1600585154526-990dced4db0d
products = products.split('photo-1588776814546-1ffcf47267a5').join('photo-1600585154526-990dced4db0d');
console.log('products P8 Shave Cream: 1588776814546 → 1600585154526 (unique, not in services)');

fs.writeFileSync('products.html', products, 'utf8');
console.log('✅ products.html saved\n');

// --- COMPREHENSIVE FINAL AUDIT ---
console.log('=== COMPREHENSIVE FINAL AUDIT ===\n');

var allFiles = ['index.html', 'home-1.html', 'services.html', 'products.html'];
var usedIDs = {};
allFiles.forEach(function(f) {
  var c = fs.readFileSync(f, 'utf8');
  (c.match(/photo-[a-zA-Z0-9_-]+/g) || []).forEach(function(id) {
    if (!usedIDs[id]) usedIDs[id] = [];
    if (usedIDs[id].indexOf(f) === -1) usedIDs[id].push(f);
  });
});

// Print the product mapping for home-1 and products
var home1c = fs.readFileSync('home-1.html', 'utf8');
var apoSection = home1c.substring(home1c.indexOf('Featured Apothecary Essentials'));
var apoCards = apoSection.split('product-card').slice(1,4);
console.log('HOME-1 Apothecary Products:');
apoCards.forEach(function(card, i) {
  var titleM = card.match(/product-title[^>]+>([^<]+)/);
  var photoM = card.match(/photo-([a-zA-Z0-9_-]+)/);
  var title = titleM ? titleM[1].trim().substring(0,45) : '?';
  var photo = photoM ? photoM[1] : '?';
  console.log('  AP' + (i+1) + ': ' + title + '\n       → photo-' + photo);
});

console.log('');
var productsc = fs.readFileSync('products.html', 'utf8');
var pCards = productsc.split('product-card gallery-item').slice(1);
console.log('PRODUCTS Page:');
pCards.forEach(function(card, i) {
  var titleM = card.match(/product-title[^>]+>([^<]+)/);
  var photoM = card.match(/photo-([a-zA-Z0-9_-]+)/);
  var title = titleM ? titleM[1].trim().substring(0,45) : '?';
  var photo = photoM ? photoM[1] : '?';
  console.log('  P' + (i+1) + ': ' + title + '\n       → photo-' + photo);
});

console.log('\nDUPLICATE CHECK (cross-page):');
var hasDupes = false;
Object.keys(usedIDs).forEach(function(id) {
  var files = usedIDs[id];
  if (files.length > 1) {
    hasDupes = true;
    // Classify: hero vs product
    var isHero = id === 'photo-1503951914875-452162b0f3f1' || 
                 id === 'photo-1622286342621-4bd786c2447c' ||
                 id === 'photo-1621605815971-fbc98d665033' ||
                 id === 'photo-1519085360753-af0119f7cbe7' ||
                 id === 'photo-1567894340315-735d7c361db0' ||
                 id === 'photo-1512690459411-b9245aed614b';
    var label = isHero ? '[HERO - OK]' : '[PRODUCT - CONFLICT!]';
    console.log(label + ' ' + id + ' in: ' + files.join(', '));
  }
});
if (!hasDupes) console.log('✅ Zero duplicates!');

// Check for any broken URL format
['home-1.html', 'products.html'].forEach(function(f) {
  var c = fs.readFileSync(f, 'utf8');
  var broken = c.match(/unsplash\.com\/\d[a-zA-Z0-9_-]+\?/g) || [];
  if (broken.length) {
    console.log('\n❌ BROKEN URL FORMAT in ' + f + ': ' + broken.join(', '));
  } else {
    console.log('\n✅ ' + f + ': URL format OK');
  }
});
