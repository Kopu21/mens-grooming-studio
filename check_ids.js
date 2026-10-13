const https = require('https');
const fs = require('fs');

const ids = [
  'photo-1503951914875-452162b0f3f1', // in use
  'photo-1584297091622-af8e5bd80b13', // in use
  'photo-1512690459411-b9245aed614b', // in use
  'photo-1501196354995-cbb51c65aaea', 
  'photo-1516975080664-ed2fc6a32937', 
  'photo-1521590832167-7bcbfaa6381f', 
  'photo-1534778101976-62847782c213', 
  'photo-1532710093739-9470acff878f', 
  'photo-1596704017254-9b121068fb31', 
  'photo-1621607512022-6aecc4fed814', 
  'photo-1593702295094-aea22597af65', 
  'photo-1622288432450-277d0fef5ed6', 
  'photo-1519741497674-611481863552', 
  'photo-1599351431202-1e0f0137899a', 
  'photo-1622286342621-4bd786c2447c',
  // classic barbershop IDs:
  'photo-1522337360788-8b13dee7a37e',
  'photo-1534447677768-be436bb09401',
  'photo-1605497788044-5a32c7078486',
  'photo-1585747860715-2ba37e788b70'
];

// Let's test specifically IDs:
// photo-1521590832167-7bcbfaa6381f
// photo-1522337360788-8b13dee7a37e
// photo-1517832606299-7ae9b720a186
// photo-1622288432450-277d0fef5ed6
// cand_barber_2.jpg that we already downloaded:
// cand_barber_2 is: photo-1517832606299-7ae9b720a186!
// Wait! Let's check cand_barber_2.jpg!
