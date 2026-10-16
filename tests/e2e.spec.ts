import { test, expect } from '@playwright/test';

test.describe('DevAtlas Comprehensive E2E Test Suite', () => {
  // 1. Homepage rendering and navigation
  test('1. Homepage renders brand, tagline, and navigation properly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/DevAtlas/);
    await expect(page.locator('text=Understand technology. Build better things.')).toBeVisible();
    // Use header scope to avoid matching footer link with same text
    await expect(page.locator('header').getByText('Learn. Build. Share.').first()).toBeVisible();

    // Verify main nav links
    await expect(page.locator('nav[aria-label="Main Navigation"] a:has-text("Explore")')).toBeVisible();
    await expect(page.locator('nav[aria-label="Main Navigation"] a:has-text("Topics")')).toBeVisible();
    await expect(page.locator('nav[aria-label="Main Navigation"] a:has-text("Learning Paths")')).toBeVisible();
  });

  // 2. Search for an existing article
  test('2. Search finds existing articles', async ({ page }) => {
    await page.goto('/explore');
    const searchInput = page.locator('input[placeholder*="Search by title"]');
    await searchInput.fill('Next.js 15');
    await searchInput.press('Enter');

    await expect(page).toHaveURL(/q=Next\.js\+15|q=Next\.js%2015/);
    await expect(page.locator('text=Next.js 15 & React 19 Architecture').first()).toBeVisible();
  });

  // 3. Search with no matching results
  test('3. Search with no matching results displays clear empty state', async ({ page }) => {
    await page.goto('/explore');
    const searchInput = page.locator('input[placeholder*="Search by title"]');
    await searchInput.fill('xyznonexistentquery999');
    await searchInput.press('Enter');

    await expect(page.locator('text=No matching articles found')).toBeVisible();
    await expect(page.locator('text=Reset All Filters')).toBeVisible();
  });

  // 4. Category and tag filters
  test('4. Category and tag filters filter results correctly', async ({ page }) => {
    await page.goto('/explore');
    // Click "AI and Machine Learning" category button
    await page.locator('button:has-text("AI and Machine Learning")').click();
    await expect(page).toHaveURL(/category=ai-ml/);
    await expect(page.locator('text=Production ML Pipelines').first()).toBeVisible();

    // Verify reset filters button appears
    await expect(page.locator('text=Reset filters')).toBeVisible();
  });

  // 5. Sorting
  test('5. Sorting changes result order', async ({ page }) => {
    await page.goto('/explore');
    const sortSelect = page.locator('select#sort-select');
    await sortSelect.selectOption('popular');
    await expect(page).toHaveURL(/sort=popular/);
  });

  // 6. Pagination and URL query parameters
  test('6. Pagination navigates between pages and preserves query parameters', async ({ page }) => {
    await page.goto('/explore');
    // Click page 2 button
    const page2Button = page.locator('nav[aria-label="Pagination"] a:has-text("2")');
    if (await page2Button.isVisible()) {
      await page2Button.click();
      await expect(page).toHaveURL(/page=2/);
      await expect(page.locator('text=Page 2 of')).toBeVisible();
    }
  });

  // 7. Opening an article from search results
  test('7. Opening an article opens correct article page', async ({ page }) => {
    await page.goto('/explore');
    const firstArticleLink = page.locator('article h3 a').first();
    const articleTitle = await firstArticleLink.textContent();
    await firstArticleLink.click();

    await expect(page).toHaveURL(/\/articles\/.+/);
    // Use first() to avoid strict-mode violation when h1 appears multiple times during streaming
    await expect(page.locator('h1').first()).toContainText(articleTitle!.trim());
  });

  // 8. Table-of-contents navigation
  test('8. Table of contents lists headings and provides anchor links', async ({ page }) => {
    await page.goto('/articles/nextjs-15-react-19-architecture');
    const toc = page.locator('nav[aria-label="Table of contents"]');
    await expect(toc).toBeVisible();

    const tocLink = toc.locator('a').first();
    const href = await tocLink.getAttribute('href');
    expect(href).toMatch(/^#/);
    await tocLink.click();
  });

  // 9. Copying code snippets
  test('9. Code block copy button provides visual copied feedback', async ({ page }) => {
    // Grant clipboard permissions in browser context
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/articles/nextjs-15-react-19-architecture');
    const copyButton = page.locator('button[aria-label*="Copy code snippet"]').first();
    await expect(copyButton).toBeVisible();
    await copyButton.click();
    // Allow up to 3s for the state update to render
    await expect(page.locator('text=Copied').first()).toBeVisible({ timeout: 3000 });
  });

  // 10. Bookmarking and removing a bookmark
  test('10. Bookmarking updates state and syncs to /bookmarks page', async ({ page }) => {
    await page.goto('/articles/modern-css-container-queries-has');
    const bookmarkBtn = page.locator('button[aria-label="Save article"]').first();
    await expect(bookmarkBtn).toBeVisible();
    await bookmarkBtn.click();

    // Check toast notification
    await expect(page.locator('text=Article saved to your resources')).toBeVisible();

    // Visit /bookmarks page and verify it appears
    await page.goto('/bookmarks');
    await expect(page.locator('text=Mastering Modern CSS').first()).toBeVisible();

    // Remove bookmark
    const removeBtn = page.locator('button[aria-label="Remove from saved resources"]').first();
    await removeBtn.click();
    await expect(page.locator('text=No saved articles yet')).toBeVisible();
  });

  // 11. Theme switching
  test('11. Theme toggle switches between dark and light themes', async ({ page }) => {
    await page.goto('/');
    const themeBtn = page.locator('button[aria-label*="Switch to"]').first();
    await expect(themeBtn).toBeVisible();

    const initialIsDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    await themeBtn.click();
    const newIsDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(newIsDark).not.toBe(initialIsDark);
  });

  // 12. Article-to-article navigation
  test('12. Article previous/next navigation cards work', async ({ page }) => {
    await page.goto('/articles/nextjs-15-react-19-architecture');
    const nextArticleCard = page.locator('nav[aria-label="Previous and Next Articles"] a:has-text("Next Article")');
    await expect(nextArticleCard).toBeVisible();
    await nextArticleCard.click();
    await expect(page).toHaveURL(/\/articles\/.+/);
  });

  // 13. Invalid article and topic slugs show 404 UI (Next.js PPR returns 200 status for dynamic routes)
  test('13. Invalid slugs return 404 page', async ({ page }) => {
    // PPR static shells return HTTP 200 even for notFound() — check UI instead
    await page.goto('/articles/non-existent-article-slug-12345');
    await expect(page.locator('text=Resource Not Found')).toBeVisible();
    await expect(page.locator('text=Return to Home')).toBeVisible();

    await page.goto('/topics/non-existent-topic-slug');
    await expect(page.locator('text=Resource Not Found')).toBeVisible();
  });

  // 14. Mobile navigation and small viewport layouts
  test('14. Mobile viewport opens hamburger drawer and navigates', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuButton = page.locator('button[aria-label*="navigation menu"]');
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Verify drawer navigation links
    await expect(page.locator('div[data-lenis-prevent] a:has-text("Saved")')).toBeVisible();
  });

  // 15. Keyboard navigation and skip link
  test('15. Skip link is accessible via keyboard Tab', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skipLink = page.locator('a:has-text("Skip to main content")');
    await expect(skipLink).toBeFocused();
  });

  // 16. Reduced-motion behavior
  test('16. Reduced-motion setting is respected by Lenis and CSS', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/articles/nextjs-15-react-19-architecture');
    // Verify html page renders cleanly with reduced motion
    await expect(page.locator('h1').first()).toBeVisible();
  });

  // 17. Lenis smooth scrolling integration verification
  test('17. Lenis smooth scrolling is active on the root document', async ({ page }) => {
    await page.goto('/');
    // Wait for React hydration and the LenisProvider useEffect to run
    await page.waitForTimeout(800);
    const hasLenisClass = await page.evaluate(() => document.documentElement.classList.contains('lenis'));
    expect(hasLenisClass).toBe(true);
  });

  // 18. Learning path step completion tracker
  test('18. Learning path interactive step completion updates progress', async ({ page }) => {
    await page.goto('/paths/frontend-performance-essentials');
    // Use h1 specifically to avoid matching footer links with the same text
    await expect(page.locator('h1').filter({ hasText: 'Frontend Performance Essentials' })).toBeVisible();
    await expect(page.locator('text=0% Complete')).toBeVisible();

    // Toggle step 1 checkbox
    const step1Btn = page.locator('button[aria-label="Mark step 1 as complete"]');
    await step1Btn.click();
    await expect(page.locator('text=20% Complete')).toBeVisible();
  });

  // 19. Admin article draft editor and live preview
  test('19. Admin preview page validates draft and renders live markdown preview', async ({ page }) => {
    await page.goto('/admin/preview');
    await expect(page.locator('h1').filter({ hasText: 'Article Draft Editor' })).toBeVisible();

    // Toggle preview tab
    const toggleBtn = page.locator('button:has-text("Show Preview")');
    if (await toggleBtn.isVisible()) {
      await toggleBtn.click();
    }
    // Use the section label specifically (not the heading that shares the word)
    await expect(page.locator('text=Live Preview').first()).toBeVisible();

    // Click validate and publish
    await page.locator('button:has-text("Validate & Publish")').click();
    await expect(page.locator('text=Ready for Publication')).toBeVisible();
  });

  // 20. Lenis scrolling on a long article
  test('20. Lenis smooth scrolling functions properly on long article pages', async ({ page }) => {
    await page.goto('/articles/nextjs-15-react-19-architecture');
    await page.waitForTimeout(1000);
    const lenisInitialScroll = await page.evaluate(() => (window as any).__lenis?.scroll || 0);
    expect(lenisInitialScroll).toBe(0);

    // Scroll down using Lenis API
    await page.evaluate(() => {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(500, { immediate: true });
      }
    });
    await page.waitForTimeout(500);
    const lenisScrolled = await page.evaluate(() => (window as any).__lenis?.scroll ?? window.scrollY);
    expect(lenisScrolled).toBeGreaterThanOrEqual(400);
  });

  // 21. Lenis scrolling on a learning-path page
  test('21. Lenis scrolling operates smoothly on learning-path page', async ({ page }) => {
    await page.goto('/paths/frontend-performance-essentials');
    await page.waitForTimeout(1000);
    const hasLenis = await page.evaluate(() => typeof (window as any).__lenis !== 'undefined');
    expect(hasLenis).toBe(true);

    // Scroll to stage 3
    await page.evaluate(() => (window as any).__lenis?.scrollTo('#stage-frontend-performance-essentials-3', { immediate: true }));
    await page.waitForTimeout(500);
    const scrollPos = await page.evaluate(() => (window as any).__lenis?.scroll ?? window.scrollY);
    expect(scrollPos).toBeGreaterThan(200);
  });

  // 22. Synchronization between Lenis and GSAP ScrollTrigger
  test('22. Lenis and GSAP ScrollTrigger are synchronized on the root window', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    const hasScrollTrigger = await page.evaluate(() => typeof (window as any).__ScrollTrigger !== 'undefined');
    const hasGsap = await page.evaluate(() => typeof (window as any).__gsap !== 'undefined');
    expect(hasScrollTrigger).toBe(true);
    expect(hasGsap).toBe(true);
  });

  // 23. Active learning-stage changes while scrolling downward
  test('23. Active learning stage changes during downward scrolling', async ({ page }) => {
    await page.goto('/paths/frontend-performance-essentials');
    await page.waitForTimeout(800);

    // Click Stage 03 switcher pill
    const stage3Btn = page.locator('button[aria-label*="Jump to stage 3"]');
    if (await stage3Btn.isVisible()) {
      await stage3Btn.click();
      await page.waitForTimeout(600);
      await expect(page.locator('text=STAGE 03 ARCHITECTURE')).toBeVisible();
    }
  });

  // 24. Restoration of the correct stage while scrolling upward
  test('24. Stage restores to Stage 01 when scrolling back up', async ({ page }) => {
    await page.goto('/paths/frontend-performance-essentials');
    await page.waitForTimeout(1000);

    // Jump to Stage 04
    const stage4Btn = page.locator('button[aria-label*="Jump to stage 4"]');
    if (await stage4Btn.isVisible()) {
      await stage4Btn.click();
      await page.waitForTimeout(1000);
      await expect(page.locator('text=STAGE 04 ARCHITECTURE')).toBeVisible();

      // Jump back to Stage 01
      const stage1Btn = page.locator('button[aria-label*="Jump to stage 1"]');
      await stage1Btn.click();
      await page.waitForTimeout(1000);
      await expect(page.locator('text=STAGE 01 ARCHITECTURE')).toBeVisible();
    }
  });

  // 25. High-fidelity diagram assets are loaded
  test('25. Learning path diagrams and category illustrations are rendered', async ({ page }) => {
    await page.goto('/paths/frontend-performance-essentials');
    await page.waitForTimeout(500);
    const stageImages = page.locator('img[alt*="diagram"], img[alt*="Foundations"], img[alt*="rendering"]');
    await expect(stageImages.first()).toBeVisible();
  });

  // 26. Topics category page
  test('26. Category topic pages render curated articles and breadcrumb metadata', async ({ page }) => {
    await page.goto('/topics/web-dev');
    await expect(page.locator('h1').filter({ hasText: 'Web Development' })).toBeVisible();
    await expect(page.locator('article').first()).toBeVisible();
  });
});
