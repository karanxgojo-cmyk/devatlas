# DevAtlas — Performance Notes

## Build Output (Production)

| Metric | Value |
|--------|-------|
| Build tool | Next.js 16.4.0 Turbopack |
| Total pages generated | 38 |
| Static pages (`○`) | 16 |
| Partial Prerender pages (`◐`) | 22 |
| TypeScript errors | 0 |
| ESLint errors | 0 |
| Build exit code | 0 |

### PPR Pages (streamed server content)

| Route | Reason for PPR |
|-------|---------------|
| `/explore` | `searchParams` triggers dynamic rendering for search/filter/sort/pagination |
| `/articles/[slug]` (shell) | Dynamic catch-all for uncached slugs |
| `/topics/[slug]` (shell) | Dynamic catch-all |
| `/paths/[slug]` (shell) | Dynamic catch-all |

All known slugs are also pre-rendered as fully static pages via `generateStaticParams`.

---

## Lighthouse Methodology

Lighthouse results must be measured on a **deployed production instance** (e.g., Vercel), not on `localhost`.

Local results are artificially low because:
- The dev server does not compress assets (no Brotli/gzip).
- Local hardware competes for CPU with Node.js, Playwright, and other processes.
- No CDN edge caching applies.

### How to run Lighthouse for this project

1. Deploy to Vercel:
   ```bash
   npx vercel --prod
   ```
2. Open Chrome and navigate to the deployed URL.
3. Open DevTools → Lighthouse tab.
4. Throttling: **Mobile, Simulated Fast 4G**.
5. Run audits on: `/`, `/explore`, and one article page (e.g., `/articles/nextjs-15-react-19-architecture`).

### Architectural decisions that drive Lighthouse scores

| Decision | Performance Impact |
|----------|-------------------|
| App Router Server Components | HTML is streamed; no client JS bundle for static content |
| Partial Prerender (PPR) | Dynamic shell served from edge; static content as HTML |
| `next/image` with lazy loading | Defers off-screen images; avoids LCP regressions |
| Geist font via `next/font` | Fonts self-hosted, no render-blocking external requests |
| Lenis `@raf-based` | Single RAF loop, no forced layouts, no layout thrashing |
| `data-lenis-prevent` on code blocks & drawers | Prevents nested scroll conflicts |
| `prefers-reduced-motion` in CSS + Lenis `respectReducedMotion` | Accessibility + avoids CLS on low-motion devices |
| `scroll-margin-top: 5.5rem` on headings | TOC anchor links clear the sticky header precisely |

### Expected Lighthouse targets (post-deployment)

| Category | Target |
|----------|--------|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | ≥ 95 |

> **Note:** These targets are aspirational during Phase 1. Run Lighthouse on a production Vercel deployment and iterate on image sizes, font loading, and JS bundle weight if scores fall short.

---

## Bundle Analysis

To inspect the JavaScript bundle:

```bash
ANALYZE=true npm run build
```

This requires adding `@next/bundle-analyzer` to the project. Key things to watch:

- Ensure `lenis` is not duplicated in the bundle.
- `lucide-react` imports should be tree-shaken (only used icons included).
- Client Components boundary should be tight — most page components should stay as Server Components.

---

## Caching Strategy

| Layer | Mechanism |
|-------|-----------|
| Static HTML | Vercel CDN edge cache (infinite TTL for static routes) |
| PPR shell | Edge-cached HTML + streamed server slots |
| `next/image` | Vercel image optimization + `Cache-Control: public, max-age=31536000` |
| Local MDX content | Bundled at build time — no runtime fetching |
| Bookmarks | `localStorage` — no server cache needed |
| Progress tracking | `localStorage` — no server cache needed |

---

## Accessibility Audit Results

All 19 Playwright tests pass including:

- **Test 15:** Skip link receives focus on first `Tab` press.
- **Test 16:** `prefers-reduced-motion` renders correctly without layout breakage.
- **Test 14:** Mobile hamburger drawer is operable via pointer.
- **Test 11:** Theme toggle is labeled and functional.

Remaining manual accessibility checks recommended before production:

- Screen reader walkthrough (NVDA + Chrome, or VoiceOver + Safari).
- Color contrast verification for all badge and tag colors in dark mode.
- Focus trap verification inside the mobile drawer.
- Zoom to 200% — verify no horizontal overflow on article pages.
