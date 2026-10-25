const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const failedRequests = [];
  page.on('requestfailed', request => {
    failedRequests.push({ url: request.url(), failure: request.failure() });
  });

  page.on('response', response => {
    if (response.status() >= 400) {
      failedRequests.push({ url: response.url(), status: response.status() });
    }
  });

  const response = await page.goto('http://localhost:3000/landing-pages/meng-to-sketchbook.html', { waitUntil: 'networkidle' });

  console.log('Failed requests count:', failedRequests.length);
  console.log('Failed URLs:', failedRequests);

  await browser.close();
})();
