const puppeteer = require('puppeteer');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const url = process.env.SCRAPE_URL;

if (!url) {
  console.error('Error: SCRAPE_URL not set in environment variables.');
  process.exit(1);
}

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const result = await page.evaluate(() => {
      const get = (selector, attr = 'innerText') => {
        const el = document.querySelector(selector);
        if (!el) return null;
        return attr === 'innerText' ? el.innerText : el.getAttribute(attr);
      };

      return {
        title: document.title || null,
        description: get('meta[name="description"]', 'content'),
        heading: get('h1'),
        subheading: get('h2'),
        content: get('p'),
        image: get('img', 'src'),
        link: get('a', 'href')
      };
    });

    fs.writeFileSync('data.json', JSON.stringify(result, null, 2), 'utf-8');
    console.log('Data scraped and saved to data.json');

    await browser.close();
  } catch (err) {
    console.error('Scraping failed:', err);
  }
})();
