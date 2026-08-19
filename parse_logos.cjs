const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('boffinglobal.html', 'utf8');
const $ = cheerio.load(html);
const links = $('.js--mention-desktop a');
if (links.length === 0) {
  const links2 = $('.js--mention-mobile a');
  console.log("Mobile links:", links2.length);
  links2.each((i, el) => {
    console.log($(el).attr('href'));
    console.log($(el).html().slice(0, 100));
  });
} else {
  console.log("Desktop links:", links.length);
  links.each((i, el) => {
    console.log($(el).attr('href'));
    console.log($(el).html().slice(0, 50));
  });
}
