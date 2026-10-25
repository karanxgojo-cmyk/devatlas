const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const outDir = 'C:/Users/hp/.gemini/antigravity/brain/98a16c03-f788-4868-b39b-2550a689e60a';

  const routes = [
    { url: 'http://localhost:3000', file: 'palette_homepage.png' },
    { url: 'http://localhost:3000/explore', file: 'palette_explore.png' },
    { url: 'http://localhost:3000/topics', file: 'palette_topics.png' },
    { url: 'http://localhost:3000/paths', file: 'palette_paths.png' },
    { url: 'http://localhost:3000/paths/frontend-performance-essentials', file: 'palette_path_detail.png' },
    { url: 'http://localhost:3000/articles/nextjs-15-react-19-architecture', file: 'palette_article.png' },
  ];

  for (const item of routes) {
    console.log(`Capturing ${item.url} -> ${item.file}`);
    await page.goto(item.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const dest = path.join(outDir, item.file);
    await page.screenshot({ path: dest, fullPage: false });
    console.log(`Saved ${dest}`);
  }

  await browser.close();
  console.log('All palette screenshots captured successfully!');
})();
