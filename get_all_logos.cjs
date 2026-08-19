const https = require('https');
https.get('https://boffinglobal.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const fs = require('fs');
    fs.writeFileSync('boffinglobal.html', data);
    console.log("Saved boffinglobal.html");
  });
});
