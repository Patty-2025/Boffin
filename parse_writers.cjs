const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('writers_html.txt', 'utf8');
const $ = cheerio.load(html);

const writers = [];

$('.bb-topWritersCard').each((i, el) => {
  const card = $(el);
  const link = card.find('.bb-topWritersProfile').attr('href');
  const number = card.find('.bb-topWritersNumber').text().trim();
  const onlineStatusClass = card.find('.bb-topWriterOnlineStatus').attr('class') || '';
  let status = 'offline';
  if (onlineStatusClass.includes('online')) status = 'online';
  if (onlineStatusClass.includes('away')) status = 'away';
  
  const avatar = card.find('.bb-topWriterAvatar').attr('src');
  const name = card.find('.bb-topWriterName').text().trim();
  const ratingText = card.find('.bb-rating').text().trim();
  const rating = ratingText.split('/')[0];
  
  const ordersText = card.find('.bb-topWriterFinishedOrders b').text().trim();
  const orders = parseInt(ordersText.replace(/[^0-9]/g, ''), 10);
  
  const awards = [];
  card.find('.bb-awardImage').each((j, img) => {
    awards.push({
      src: $(img).attr('src'),
      alt: $(img).attr('alt')
    });
  });
  
  writers.push({
    id: parseInt(number, 10),
    name,
    href: link,
    status,
    avatar,
    rating: parseFloat(rating),
    orders,
    awards
  });
});

fs.writeFileSync('src/data/topWriters.json', JSON.stringify(writers, null, 2));
console.log('Done!');
