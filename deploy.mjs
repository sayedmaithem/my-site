import https from 'https';

const TOKEN = process.env.NETLIFY_TOKEN;

if (!TOKEN) {
  console.error('Missing NETLIFY_TOKEN environment variable.');
  process.exit(1);
}

// Get site info
const options = {
  hostname: 'api.netlify.com',
  path: '/api/v1/sites',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }
};

https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const sites = JSON.parse(data);
      console.log('✓ Connected to Netlify!');
      console.log('\nYour sites:');
      sites.forEach(s => {
        console.log(`  📍 ${s.name}`);
        console.log(`     ID: ${s.id}`);
        console.log(`     URL: ${s.url}\n`);
      });
    } catch (e) {
      console.error('Error parsing response:', e.message);
    }
  });
}).on('error', e => console.error('Connection error:', e.message)).end();
