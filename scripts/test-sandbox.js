const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('framenavigated', frame => {
    if (frame === page.mainFrame()) {
      console.log('Main frame navigated to:', frame.url());
    }
  });

  await page.goto('http://localhost:3000');
  await page.evaluate(() => {
    const iframe = document.createElement('iframe');
    iframe.src = '/landing-pages/meng-to-sketchbook.html';
    iframe.sandbox = 'allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts';
    iframe.id = 'testFrame';
    document.body.appendChild(iframe);
  });

  await page.waitForTimeout(1000);
  const frame = page.frame({ url: /meng-to-sketchbook\.html/ });
  if (!frame) {
    console.log('Frame not found');
    await browser.close();
    return;
  }

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  const link = frame.locator('a[href="/topics"]').first();
  await link.click();
  await page.waitForTimeout(1000);

  console.log('Top page URL after click:', page.url());
  console.log('Errors:', errors);

  await browser.close();
})();
