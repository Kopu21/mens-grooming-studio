const https = require('https');
const fs = require('fs');

// Step 1: REVERT broken IDs back to original working ones
console.log('=== STEP 1: REVERTING BROKEN IDs ===');

function revertFile(filename, reverts) {
  let c = fs.readFileSync(filename, 'utf8');
  reverts.forEach(function(r) {
    var broken = r[0], original = r[1];
    var count = c.split(broken).length - 1;
    if (count > 0) {
      c = c.split(broken).join(original);
      console.log('Reverted in ' + filename + ': ' + broken + ' -> ' + original + ' (' + count + 'x)');
    }
  });
  fs.writeFileSync(filename, c, 'utf8');
}

var REVERTS = [
  ['photo-1596462502278-27bfdc403348', 'photo-1620916566398-39f1143ab7be'],
  ['photo-1582735689369-4fe89db7114c', 'photo-1556228720-195a672e8a03'],
  ['photo-1581750697744-5ecf7d3bc5a4', 'photo-1571781926291-c477ebfd024b'],
  ['photo-1585386959984-a4155224a1ad', 'photo-1598440947619-2c35fc9aa908'],
  ['photo-1567688387454-a4504e1e3b07', 'photo-1599351431202-1e0f0137899a'],
  ['photo-1556228453-efd6c1ff04f6',    'photo-1608248543803-ba4f8c70ae0b'],
];

revertFile('home-1.html', REVERTS);
revertFile('products.html', REVERTS);
console.log('All reverted. Site is back to working state.\n');

// Step 2: TEST candidate replacement IDs via HTTP
console.log('=== STEP 2: TESTING CANDIDATE REPLACEMENT URLs ===');

// These are candidate IDs to test - picked from known Unsplash grooming/product photoshoots
var CANDIDATES = [
  // For Beard Oil (amber/oil dropper bottle)
  ['beard-oil-1', '1535585489-ba83e52e7ff5'],
  ['beard-oil-2', '1601049676869-702ea24cfd58'],
  ['beard-oil-3', '1618160702438-9b02ab6515c9'],
  ['beard-oil-4', '1559056199-641a0ac8b55d'],
  ['beard-oil-5', '1543269865-0a740d43b389'],
  // For Shave Cream (white cream/jar)
  ['shave-cream-1', '1556228150-66d9bf1b6dbe'],
  ['shave-cream-2', '1596178065887-1198b6bd2e40'],
  ['shave-cream-3', '1571781926291-c477ebfd024b'], // existing
  // For Pomade/Clay (tin/jar of hair product)
  ['pomade-1', '1522338242992-e1a54906a8da'],
  ['pomade-2', '1621607512022-6aecc4fed814'],
  ['pomade-3', '1614547676434-c87d028e8ed9'],
  // For Beard Balm
  ['balm-1', '1589739900243-4b52cd9b104e'],
  ['balm-2', '1585747860715-2ba37e788b70'],
  ['balm-3', '1527799820374-dcf8d9d4a388'],
  // For Damascus Razor (straight razor)
  ['razor-1', '1588776814546-1ffcf47267a5'],
  ['razor-2', '1562157873-818bc0726f68'],
  ['razor-3', '1590540179852-2110a54f813a'],
  // For Tea Tree Beard Wash (bottle)
  ['wash-1', '1612817288484-6f916006741a'],
  ['wash-2', '1583394838336-acd977736f90'],
  ['wash-3', '1597308680317-3c76aefff7d5'],
];

var results = [];
var completed = 0;

CANDIDATES.forEach(function(c) {
  var label = c[0], id = c[1];
  var url = 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&w=10&q=10';
  var req = https.get(url, function(res) {
    var ok = (res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302);
    results.push({ label: label, id: id, status: res.statusCode, ok: ok });
    res.resume();
    completed++;
    if (completed === CANDIDATES.length) {
      printResults();
    }
  });
  req.on('error', function(e) {
    results.push({ label: label, id: id, status: 'ERR', ok: false });
    completed++;
    if (completed === CANDIDATES.length) {
      printResults();
    }
  });
  req.setTimeout(8000, function() {
    req.abort();
  });
});

function printResults() {
  console.log('\n=== URL TEST RESULTS ===');
  results.forEach(function(r) {
    var mark = r.ok ? '✅' : '❌';
    console.log(mark + ' [' + r.label + '] photo-' + r.id + ' → HTTP ' + r.status);
  });

  console.log('\n=== WORKING IDs ONLY ===');
  results.filter(function(r) { return r.ok; }).forEach(function(r) {
    console.log('[' + r.label + '] photo-' + r.id);
  });
}
