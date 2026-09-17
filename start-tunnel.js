const localtunnel = require('localtunnel');
const fs = require('fs');

(async () => {
  try {
    console.log('Connecting to localtunnel...');
    const tunnel = await localtunnel({ port: 8080 });
    console.log('PUBLIC_URL:', tunnel.url);
    fs.writeFileSync('tunnel-url.txt', tunnel.url, 'utf8');
    console.log('URL saved to tunnel-url.txt');
    tunnel.on('close', () => {
      console.log('Tunnel closed');
      try { fs.unlinkSync('tunnel-url.txt'); } catch(e) {}
    });
    tunnel.on('error', (err) => {
      console.error('Tunnel error:', err.message);
    });
  } catch(e) {
    console.error('Failed to start tunnel:', e.message);
    process.exit(1);
  }
})();
