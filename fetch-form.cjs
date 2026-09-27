const https = require('https');
const http = require('http');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(get(res.headers.location));
      } else {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      }
    }).on('error', reject);
  });
}

get('https://forms.gle/9kRGgy3CJr2ZXaRD8').then(html => {
  const matches = html.matchAll(/<div role="heading" aria-level="3"[^>]*>.*?<span dir="auto">(.*?)<\/span>/g);
  for (const match of matches) {
    console.log(match[1]);
  }
}).catch(console.error);
