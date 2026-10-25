const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACTS_DIR = 'C:/Users/hp/.gemini/antigravity/brain/98a16c03-f788-4868-b39b-2550a689e60a';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('1. Navigating to homepage...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  // Initial state check
  const initialTheme = await page.evaluate(() => ({
    classList: Array.from(document.documentElement.classList),
    localStorageTheme: localStorage.getItem('devatlas-theme'),
    bodyBg: window.getComputedStyle(document.body).backgroundColor,
    bodyColor: window.getComputedStyle(document.body).color
  }));
  console.log('Initial state:', initialTheme);

  // Find theme toggle button
  const toggleBtn = page.locator('button[aria-label*="Switch to"]').first();
  await toggleBtn.waitFor({ state: 'visible' });

  console.log('2. Clicking theme toggle to switch to DARK mode...');
  await toggleBtn.click();
  await page.waitForTimeout(500);

  const darkState = await page.evaluate(() => ({
    classList: Array.from(document.documentElement.classList),
    localStorageTheme: localStorage.getItem('devatlas-theme'),
    dataTheme: document.documentElement.getAttribute('data-theme'),
    bodyBg: window.getComputedStyle(document.body).backgroundColor,
    bodyColor: window.getComputedStyle(document.body).color
  }));
  console.log('Dark mode state:', darkState);

  // Take screenshot of dark homepage
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'dark_homepage.png'), fullPage: false });
  console.log('Captured dark_homepage.png');

  // Verify persistence on reload
  console.log('3. Reloading page to test persistence...');
  await page.reload({ waitUntil: 'networkidle' });
  const reloadedState = await page.evaluate(() => ({
    classList: Array.from(document.documentElement.classList),
    localStorageTheme: localStorage.getItem('devatlas-theme'),
    bodyBg: window.getComputedStyle(document.body).backgroundColor
  }));
  console.log('Reloaded dark state:', reloadedState);

  // Navigate to Explore in dark mode
  console.log('4. Navigating to /explore in dark mode...');
  await page.goto('http://localhost:3000/explore', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'dark_explore.png'), fullPage: false });
  console.log('Captured dark_explore.png');

  // Navigate to Topics in dark mode
  console.log('5. Navigating to /topics in dark mode...');
  await page.goto('http://localhost:3000/topics', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'dark_topics.png'), fullPage: false });
  console.log('Captured dark_topics.png');

  // Navigate to Learning Paths in dark mode
  console.log('6. Navigating to /paths/frontend-performance-essentials in dark mode...');
  await page.goto('http://localhost:3000/paths/frontend-performance-essentials', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'dark_paths.png'), fullPage: false });
  console.log('Captured dark_paths.png');

  // Navigate to Article in dark mode
  console.log('7. Navigating to /articles/how-the-web-works-dns-http in dark mode...');
  await page.goto('http://localhost:3000/articles/how-the-web-works-dns-http', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'dark_article.png'), fullPage: false });
  console.log('Captured dark_article.png');

  // Navigate to Bookmarks in dark mode
  console.log('8. Navigating to /bookmarks in dark mode...');
  await page.goto('http://localhost:3000/bookmarks', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'dark_bookmarks.png'), fullPage: false });
  console.log('Captured dark_bookmarks.png');

  // Navigate to Dashboard in dark mode
  console.log('9. Navigating to /dashboard in dark mode...');
  await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'dark_dashboard.png'), fullPage: false });
  console.log('Captured dark_dashboard.png');

  // Switch back to light mode
  console.log('10. Switching back to LIGHT mode...');
  const lightToggleBtn = page.locator('button[aria-label*="Switch to"]').first();
  await lightToggleBtn.click();
  await page.waitForTimeout(500);

  const lightState = await page.evaluate(() => ({
    classList: Array.from(document.documentElement.classList),
    localStorageTheme: localStorage.getItem('devatlas-theme'),
    bodyBg: window.getComputedStyle(document.body).backgroundColor,
    bodyColor: window.getComputedStyle(document.body).color
  }));
  console.log('Returned to light mode state:', lightState);

  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'light_dashboard.png'), fullPage: false });

  await browser.close();
  console.log('Verification completed successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
