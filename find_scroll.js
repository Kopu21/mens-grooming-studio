const fs = require('fs');
const path = require('path');

function search(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory() && f !== 'node_modules') {
      search(full);
    } else if (f.endsWith('.js') || f.endsWith('.css') || f.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((l, i) => {
        if (l.toLowerCase().includes('scroll') || l.includes('position: fixed') || l.includes('position: sticky')) {
          console.log(`${full}:${i+1}: ${l.trim()}`);
        }
      });
    }
  });
}

search('.');
