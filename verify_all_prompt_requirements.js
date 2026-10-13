const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('VERIFYING ALL USER REQUIREMENTS');
console.log('====================================================\n');

// 1. Check the 3 replacement image files exist on disk
const targetImages = [
  'images/unique-tea-tree-clarifying-beard-wash.jpg',
  'images/unique-signature-elixir-black-amber-cedar.jpg',
  'images/unique-icelandic-volcanic-sea-clay-pomade.jpg'
];

console.log('1. Checking file existence on disk:');
targetImages.forEach(img => {
  if (fs.existsSync(img)) {
    const sz = fs.statSync(img).size;
    console.log(`  ✅ ${img} exists (${sz} bytes)`);
  } else {
    console.error(`  ❌ ${img} MISSING!`);
  }
});

// 2. Check uniqueness across all HTML files
console.log('\n2. Checking uniqueness across all HTML files in project:');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const occurrences = {};

targetImages.forEach(img => {
  occurrences[img] = [];
  htmlFiles.forEach(hf => {
    const content = fs.readFileSync(hf, 'utf8');
    if (content.includes(img)) {
      occurrences[img].push(hf);
    }
  });
});

for (const [img, files] of Object.entries(occurrences)) {
  console.log(`  Image: ${img}`);
  console.log(`    Found in: ${files.join(', ')}`);
  if (files.length === 1 && files[0] === 'products.html') {
    console.log('    ✅ Appears EXCLUSIVELY on products.html (Zero duplication on Home 1, Home 2, Services, etc.)');
  } else {
    console.log(`    ⚠️ Appears in ${files.length} files`);
  }
}

// 3. Inspect cards and buttons in products.html
console.log('\n3. Inspecting Products Page Cards and Buttons:');
const prodContent = fs.readFileSync('products.html', 'utf8');

// Verify Card P7
const p7Match = prodContent.match(/<div class="product-card gallery-item"[^>]*data-category="beard">[\s\S]*?Tea Tree Clarifying Beard Wash[\s\S]*?<\/div>\s*<\/div>/);
if (p7Match && p7Match[0].includes('unique-tea-tree-clarifying-beard-wash.jpg')) {
  console.log('  ✅ Card P7 (Tea Tree Beard Wash): Successfully uses unique-tea-tree-clarifying-beard-wash.jpg');
} else {
  console.log('  ❌ Card P7 image check failed!');
}

// Verify Spotlight 1
const spot1Match = prodContent.includes('unique-signature-elixir-black-amber-cedar.jpg');
console.log('  ' + (spot1Match ? '✅' : '❌') + ' Spotlight 1 (Signature Elixir): Uses unique-signature-elixir-black-amber-cedar.jpg');

// Verify Spotlight 2
const spot2Match = prodContent.includes('unique-icelandic-volcanic-sea-clay-pomade.jpg');
console.log('  ' + (spot2Match ? '✅' : '❌') + ' Spotlight 2 (Icelandic Pomade): Uses unique-icelandic-volcanic-sea-clay-pomade.jpg');

// 4. Verify button alignment classes and text
console.log('\n4. Verifying Button Markup on Home 1, Home 2, Index, and Products:');
['index.html', 'home-1.html', 'home-2.html', 'products.html'].forEach(hf => {
  const c = fs.readFileSync(hf, 'utf8');
  const cards = c.split(/class="product-card/);
  console.log(`\n  --- ${hf} (${cards.length - 1} cards) ---`);
  cards.slice(1).forEach((card, idx) => {
    const titleMatch = card.match(/<h3[^>]*>([^<]+)<\/h3>/);
    const title = titleMatch ? titleMatch[1].trim() : 'Unknown';
    const hasPriceRow = card.includes('product-price-row');
    const hasAddSatchel = card.includes('Add to Satchel');
    const hasButton = card.includes('add-to-cart-btn');
    console.log(`    Card ${idx+1} [${title}]: product-price-row=${hasPriceRow}, Add to Satchel=${hasAddSatchel}, btn=${hasButton}`);
  });
});

console.log('\n====================================================');
console.log('AUDIT COMPLETED');
console.log('====================================================');
