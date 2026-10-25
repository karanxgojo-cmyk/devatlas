const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const frame = page.frameLocator('iframe[src*="meng-to-sketchbook"]');
  const cap0 = await frame.locator('#sbCaptions').textContent();
  console.log('Initial Caption in iframe:', cap0);

  console.log('Clicking #sbRight in iframe...');
  await frame.locator('#sbRight').click({ force: true });
  await page.waitForTimeout(1000);
  const cap1 = await frame.locator('#sbCaptions').textContent();
  console.log('Caption after #sbRight click:', cap1);

  console.log('Clicking plate 2 in index (#plateList button nth 1)...');
  const plate2 = frame.locator('#plateList button').nth(1);
  await plate2.evaluate(el => el.click());
  await page.waitForTimeout(1000);
  const cap2 = await frame.locator('#sbCaptions').textContent();
  console.log('Caption after plate2 evaluate click:', cap2);

  await browser.close();
})();
