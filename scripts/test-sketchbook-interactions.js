const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  console.log('Testing http://localhost:3000/landing-pages/meng-to-sketchbook.html ...');
  await page.goto('http://localhost:3000/landing-pages/meng-to-sketchbook.html', { waitUntil: 'networkidle' });

  // 1. Check title
  const title = await page.title();
  console.log('Title:', title);

  // 2. Check book and plates
  const caption = await page.locator('#sbCaptions').textContent();
  console.log('Active Caption:', caption);

  // 3. Test clicking Next arrow
  console.log('Testing Next page turn...');
  await page.locator('#sbRight').click();
  await page.waitForTimeout(800);
  const captionAfterNext = await page.locator('#sbCaptions').textContent();
  console.log('Caption after Next:', captionAfterNext);

  // 4. Test clicking Plate 6 in index
  console.log('Testing Plate 6 click in index...');
  const plate6 = page.locator('#plateList button').nth(5);
  await plate6.click();
  await page.waitForTimeout(800);
  const captionAfterPlate6 = await page.locator('#sbCaptions').textContent();
  console.log('Caption after Plate 6 click:', captionAfterPlate6);

  // 5. Test Zoom In
  console.log('Testing Zoom in...');
  await page.locator('#zIn').click();
  const zoomText = await page.locator('#zRead').textContent();
  console.log('Zoom text:', zoomText);

  // 6. Test Loupe Visibility
  const isLoupeOn = await page.locator('#loupe').evaluate(el => el.classList.contains('on'));
  console.log('Loupe active:', isLoupeOn);

  console.log('Console Errors:', errors);

  await browser.close();
})();
