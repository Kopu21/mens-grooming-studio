const https = require('https');
const fs = require('fs');

// IDs currently in services.html that we must NOT use in products.html
var servicesContent = fs.readFileSync('services.html', 'utf8');
var servicesIDs = (servicesContent.match(/photo-[a-zA-Z0-9_-]+/g) || []);
var servicesIDSet = {};
servicesIDs.forEach(function(id) { servicesIDSet[id] = true; });
console.log('Services.html IDs in use:', Object.keys(servicesIDSet).length);

// Current conflicts:
// photo-1590540179852-2110a54f813a  used in home-1 AND services → need different for home-1
// photo-1621607512022-6aecc4fed814  used in products AND services → need different for products P3
// photo-1588776814546-1ffcf47267a5  used in products AND services → need different for products P8
// photo-1562157873-818bc0726f68    used in products AND services → need different for products P4

// New candidates to test (not in services.html)
var CANDIDATES = [
  // Shave cream alternatives (for home-1 AP2)
  ['shave-a', '1627483296135-00a72c30cf99'],
  ['shave-b', '1556228852-80b6e5d0e5b0'],
  ['shave-c', '1571781926291-c477ebfd024b'],  // already tested OK
  ['shave-d', '1614787236792-9a2f1ff0fe50'],
  // Pomade alternatives (for products P3)
  ['pomade-a', '1630163185958-cc2f0c4a39c3'],
  ['pomade-b', '1535585489-ba83e52e7ff5'],
  ['pomade-c', '1547824399-69bcd208c81a'],
  ['pomade-d', '1609904603143-5bdc4ffe68e6'],
  // Razor alternatives (for products P4)
  ['razor-a', '1516914943479-89db7d9ae7f2'],
  ['razor-b', '1519741497674-611481863552'],
  ['razor-c', '1532710093739-9470acff878f'],
  ['razor-d', '1517841905240-472988babdf9'],
  // Shave cream alternatives (for products P8)
  ['cream-a', '1596462502278-27bfdc403348'],
  ['cream-b', '1550134485-3773a9428d2d'],
  ['cream-c', '1600585154526-990dced4db0d'],
  ['cream-d', '1634476984836-df7a5e0d48a7'],
];

var results = [];
var completed = 0;

CANDIDATES.forEach(function(c) {
  var label = c[0], id = c[1];
  var url = 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&w=10&q=10';
  var req = https.get(url, function(res) {
    var ok = (res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302);
    var inServices = servicesIDSet['photo-' + id] || false;
    results.push({ label: label, id: id, status: res.statusCode, ok: ok, inServices: inServices });
    res.resume();
    completed++;
    if (completed === CANDIDATES.length) printResults();
  });
  req.on('error', function(e) {
    results.push({ label: label, id: id, status: 'ERR', ok: false, inServices: false });
    completed++;
    if (completed === CANDIDATES.length) printResults();
  });
  req.setTimeout(8000, function() { req.abort(); });
});

function printResults() {
  console.log('\n=== CANDIDATE TEST RESULTS ===');
  results.forEach(function(r) {
    var mark = r.ok ? (r.inServices ? '⚠️ IN-SERVICES' : '✅') : '❌';
    console.log(mark + ' [' + r.label + '] photo-' + r.id + ' → HTTP ' + r.status);
  });
  
  console.log('\n=== USABLE IDs (HTTP 200 AND NOT in services.html) ===');
  results.filter(function(r) { return r.ok && !r.inServices; }).forEach(function(r) {
    console.log('[' + r.label + '] photo-' + r.id);
  });
}
