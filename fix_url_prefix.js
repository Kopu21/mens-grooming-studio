const fs = require('fs');

// The previous fix_all_images.js incorrectly replaced just the photo ID portion
// but the URL already had 'photo-' prefix so it became:
//   images.unsplash.com/1596462502278-... (missing 'photo-' prefix)
// This script corrects by restoring the 'photo-' prefix on all replaced IDs

const FIXES = [
  // [broken pattern, correct replacement]
  ['images.unsplash.com/1596462502278-27bfdc403348', 'images.unsplash.com/photo-1596462502278-27bfdc403348'],
  ['images.unsplash.com/1582735689369-4fe89db7114c', 'images.unsplash.com/photo-1582735689369-4fe89db7114c'],
  ['images.unsplash.com/1581750697744-5ecf7d3bc5a4', 'images.unsplash.com/photo-1581750697744-5ecf7d3bc5a4'],
  ['images.unsplash.com/1585386959984-a4155224a1ad', 'images.unsplash.com/photo-1585386959984-a4155224a1ad'],
  ['images.unsplash.com/1567688387454-a4504e1e3b07', 'images.unsplash.com/photo-1567688387454-a4504e1e3b07'],
  ['images.unsplash.com/1556228453-efd6c1ff04f6', 'images.unsplash.com/photo-1556228453-efd6c1ff04f6'],
];

const FILES = ['home-1.html', 'products.html'];

FILES.forEach(function(f) {
  var c = fs.readFileSync(f, 'utf8');
  var original = c;
  FIXES.forEach(function(fix) {
    var broken = fix[0];
    var correct = fix[1];
    var count = (c.split(broken).length - 1);
    if (count > 0) {
      c = c.split(broken).join(correct);
      console.log('Fixed in ' + f + ': ' + broken + ' (' + count + ' occurrences)');
    }
  });
  if (c !== original) {
    fs.writeFileSync(f, c, 'utf8');
    console.log('Saved ' + f);
  } else {
    console.log(f + ': no changes needed');
  }
});

// Final URL verification
console.log('\n=== FINAL URL VERIFICATION ===');
FILES.forEach(function(f) {
  var c = fs.readFileSync(f, 'utf8');
  // Find broken URLs (unsplash.com/[digit] without 'photo-')
  var broken = c.match(/images\.unsplash\.com\/\d[a-zA-Z0-9_-]+/g) || [];
  if (broken.length > 0) {
    console.log('STILL BROKEN in ' + f + ': ' + broken.join(', '));
  } else {
    console.log(f + ': All Unsplash URLs have correct photo- prefix ✓');
  }
});
