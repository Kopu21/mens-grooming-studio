const fs = require('fs');
const path = require('path');

const htmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
console.log('Scanning HTML files:', htmlFiles.length);

let totalImages = 0;
let errors = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
  let match;
  let count = 0;
  while ((match = imgRegex.exec(content)) !== null) {
    count++;
    totalImages++;
    const src = match[1];
    if (!src || src.includes('placeholder') || src.trim() === '') {
      errors.push(`Broken/empty src in ${file}: ${src}`);
    }
  }
  console.log(`${file}: ${count} images found`);
});

console.log(`\nTotal images across all pages: ${totalImages}`);
if (errors.length > 0) {
  console.error('Errors found:', errors);
} else {
  console.log('All image src attributes are valid and non-empty!');
}
