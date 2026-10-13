const fs = require('fs');

// Final verification: map each product in products.html to its image
const products = fs.readFileSync('products.html', 'utf8');

console.log('=== PRODUCTS.HTML IMAGE MAP ===');
const blocks = products.split('product-card gallery-item');
blocks.slice(1).forEach(function(block, i) {
  var titleM = block.match(/product-title[^>]*>([^<]+)</);
  var photoM = block.match(/photo-([a-zA-Z0-9_-]+)/);
  var title = titleM ? titleM[1].trim() : 'UNKNOWN';
  var photo = photoM ? photoM[1] : 'NONE';
  console.log('P' + (i+1) + ': ' + title.substring(0,45) + ' → photo-' + photo);
});

console.log('');
console.log('=== HOME-1.HTML APOTHECARY SECTION ===');
const home1 = fs.readFileSync('home-1.html', 'utf8');
const apoStart = home1.indexOf('Featured Apothecary Essentials');
const apo = home1.substring(apoStart);
const apoBlocks = apo.split('product-card');
apoBlocks.slice(1,4).forEach(function(block, i) {
  var titleM = block.match(/product-title[^>]*>([^<]+)</);
  var photoM = block.match(/photo-([a-zA-Z0-9_-]+)/);
  var title = titleM ? titleM[1].trim() : 'UNKNOWN';
  var photo = photoM ? photoM[1] : 'NONE';
  console.log('AP' + (i+1) + ': ' + title.substring(0,45) + ' → photo-' + photo);
});

// Check for duplicates within products.html
console.log('');
console.log('=== CROSS-PAGE DUPLICATE CHECK ===');
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
var hasDupes = false;
Object.keys(usedIDs).forEach(function(id) {
  var files = usedIDs[id];
  if (files.length > 1) {
    console.log('SHARED: ' + id + ' in [' + files.join(', ') + ']');
    hasDupes = true;
  }
});
if (!hasDupes) {
  console.log('All images are UNIQUE across all 4 pages!');
} else {
  // Show what type of content these shared images are
  console.log('(Check above: shared images should only be hero/structural, not products)');
}
