const https = require('https');
const fs = require('fs');
const path = require('path');

const TOKEN = 'nfp_yLuCseWw4diS9a679TKqDE69iEbkGYzJba14';
const SITE_ID = ''; // We'll get this first

// First, get the site info
const options = {
  hostname: 'api.netlify.com',
  path: '/api/v1/sites',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const sites = JSON.parse(data);
      const mosawi = sites.find(s => s.name === 'mosawiclinics' || s.custom_domain === 'mosawiclinics.com');
      if (mosawi) {
        console.log(`✓ Found site: ${mosawi.name} (${mosawi.id})`);
        console.log(`  URL: ${mosawi.url}`);
      } else {
        console.log('Sites found:');
        sites.forEach(s => console.log(`  - ${s.name}: ${s.id}`));
      }
    } catch (e) {
      console.log('Response:', data);
    }
  });
});

req.on('error', e => console.error('Error:', e));
req.end();
