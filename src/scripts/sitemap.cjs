const { createWriteStream } = require('fs');
const { SitemapStream } = require('sitemap');

const BASE_URL = 'https://protouch.uz';

const routes = [
  '/',
  '/products',
  '/products/interactive-equipment',
  '/products/computer-equipment',
  '/products/conference-equipment',
];

const sitemap = new SitemapStream({ hostname: BASE_URL });

const writeStream = createWriteStream('./dist/sitemap.xml');
sitemap.pipe(writeStream);

routes.forEach((route) => {
  sitemap.write({ url: route, changefreq: 'monthly', priority: 0.8 });
});

sitemap.end();

writeStream.on('finish', () => {
  console.log('✅ Sitemap успешно создан в dist/sitemap.xml');
});
