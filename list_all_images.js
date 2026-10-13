const fs = require('fs');
const path = require('path');

const htmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
const imageMap = {};

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/g;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    const src = match[1];
    const alt = match[2];
    if (!imageMap[src]) imageMap[src] = [];
    imageMap[src].push({ file, alt });
  }
});

console.log('--- IMAGE USAGE REPORT ---');
for (const [src, uses] of Object.entries(imageMap)) {
  console.log(`\nURL: ${src}`);
  uses.forEach(u => console.log(`  - [${u.file}] alt: "${u.alt}"`));
}
