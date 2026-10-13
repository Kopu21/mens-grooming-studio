const https = require('https');
const fs = require('fs');

var servicesContent = fs.readFileSync('services.html', 'utf8');
var servicesIDSet = {};
(servicesContent.match(/photo-[a-zA-Z0-9_-]+/g) || []).forEach(function(id) { servicesIDSet[id] = true; });

// More targeted candidates
var CANDIDATES = [
  // Razor / straight blade options
  ['razor-1', '1585747860715-2ba37e788b70'],   // this was in balm category originally - shaving?
  ['razor-2', '1570172619644-dfd03ed5d881'],   // in services.html?
  ['razor-3', '1513694203232-719a280e022f'],   // was in home-1
  ['razor-4', '1516975080664-ed2fc6a32937'],   // was in home-1
  ['razor-5', '1600948836101-f9ffda59d250'],   // was in home-1
  ['razor-6', '1507003211169-0a1dd7228f2d'],   // was in home-1
  // Pomade / clay options
  ['pomade-1', '1556228720-195a672e8a03'],     // shave cream originally
  ['pomade-2', '1620916566398-39f1143ab7be'],  // beard oil - might look like pomade
  ['pomade-3', '1527799820374-dcf8d9d4a388'],  // was balm-3 - confirmed OK
  // Shave cream for home-1 AP2
  ['cream-1', '1596462502278-27bfdc403348'],   // ✅ confirmed
  ['cream-2', '1600585154526-990dced4db0d'],   // ✅ confirmed
  ['cream-3', '1571781926291-c477ebfd024b'],   // ✅ confirmed  
  // More unique options
  ['extra-1', '1553361371-9b09f4a3ce35'],
  ['extra-2', '1614548539924-61dbbf36a2fb'],
  ['extra-3', '1630163185958-cc2f0c4a39c3'],
  ['extra-4', '1621864395804-2f92a8f4e606'],
  ['extra-5', '1608686207856-001b95cf60ca'],
];

var results = [];
var completed = 0;

CANDIDATES.forEach(function(c) {
  var label = c[0], id = c[1];
  var url = 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&w=10&q=10';
  var req = https.get(url, function(res) {
    var ok = (res.statusCode === 200);
    var inServices = servicesIDSet['photo-' + id] || false;
    results.push({ label: label, id: id, status: res.statusCode, ok: ok, inServices: inServices });
    res.resume();
    completed++;
    if (completed === CANDIDATES.length) printResults();
  });
  req.on('error', function() {
    results.push({ label: label, id: id, status: 'ERR', ok: false, inServices: false });
    completed++;
    if (completed === CANDIDATES.length) printResults();
  });
  req.setTimeout(8000, function() { req.abort(); });
});

function printResults() {
  console.log('=== RESULTS ===');
  results.sort(function(a,b) { return a.label.localeCompare(b.label); });
  results.forEach(function(r) {
    var mark = r.ok ? (r.inServices ? '⚠️ SERVICES' : '✅ GOOD') : '❌ 404';
    console.log(mark + '  [' + r.label + '] photo-' + r.id + ' → ' + r.status);
  });
}
