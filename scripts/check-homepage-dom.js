const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('ERROR:', err.message));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const mainHtml = await page.$eval('main', el => el.outerHTML);
  console.log('Main outerHTML:\n', mainHtml);

  await browser.close();
})();
