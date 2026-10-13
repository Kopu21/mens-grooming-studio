const fs = require('fs');
const files = ['home-1.html','services.html','products.html','index.html'];
const allUsed = new Set();
files.forEach(f => {
  try {
    const c = fs.readFileSync(f,'utf8');
    // Extract unsplash photo IDs
    const unsplash = [...c.matchAll(/photo-([a-zA-Z0-9_-]+)/g)].map(m => m[1]);
    const localImgs = [...c.matchAll(/src="(images\/[^"]+)"/g)].map(m => m[1]);
    console.log('=== ' + f + ' ===');
    console.log('Unsplash IDs: ' + [...new Set(unsplash)].join(', '));
    console.log('Local images: ' + [...new Set(localImgs)].join(', '));
    console.log('Count: ' + unsplash.length + ' unsplash, ' + localImgs.length + ' local');
    console.log('');
    unsplash.forEach(id => allUsed.add(id));
  } catch(e) { console.log('Error reading ' + f + ': ' + e.message); }
});
console.log('TOTAL UNIQUE UNSPLASH IDs USED:', allUsed.size);
