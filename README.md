# DevAtlas

**A High-Performance Engineering Knowledge Platform + Lenis Smooth Scrolling + Immersive Scroll-Driven UI**

> *Learn. Build. Share.*

DevAtlas is a production-grade technical knowledge platform that helps engineering students, software developers, and system architects discover peer-reviewed technical articles, follow structured interactive learning paths, and save resources. It pairs the calm readability of a technical publication with an immersive, scroll-driven storytelling experience powered by the official [Lenis](https://github.com/darkroomengineering/lenis) library and [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).

---

## Resume Description

> **DevAtlas | High-Performance Engineering Knowledge Platform**
> Built DevAtlas, a responsive engineering knowledge platform using Next.js 16 (Turbopack) and TypeScript, featuring 18 searchable technical articles, category filtering, pagination, and interactive learning paths. Synchronized official Lenis smooth scrolling with GSAP ScrollTrigger on a single frame-update ticker loop, implemented technical SEO (Article/Course JSON-LD, sitemap, canonical links), designed accessible UI controls (WCAG 2.2 AA compliant with zero layout shift), and validated reliability across 26 automated Playwright end-to-end tests and 38 statically prerendered routes.

---

## Live Demo & Screenshots Checklist

```bash
http://localhost:3000  # Local development & production server
```

### Visual Verification Checklist
- [x] **Homepage Hero (`/`)**: DevAtlas branding, "Learn. Build. Share.", working instant search, live architecture diagram (`hero-architecture.svg`).
- [x] **Categories Showcase (`/`)**: Editorial image-led panels across Web Dev, AI/ML, Computer Science, and Engineering Projects.
- [x] **Signature Learning Journey (`/` & `/paths/[slug]`)**: Pinned visual architecture diagram with bidirectional GSAP ScrollTrigger stage synchronization (Foundations &rarr; Browser Rendering &rarr; Image Optimization &rarr; Caching &rarr; Lighthouse).
- [x] **Explore & Discovery (`/explore`)**: Full-text query, category/tag chips, sorting (newest/popular/reading-time), pagination, and URL parameter preservation.
- [x] **Article Publication Reader (`/articles/[slug]`)**: Reading progress indicator, scrollspy TOC with anchor offsets, code block copy button, dark/light themes, and author credentials.
- [x] **Mobile Responsiveness**: Clean hamburger navigation, inline responsive diagrams, and natural touch scrolling without scroll hijacking.

---

## Features

| Feature | Engineering Implementation |
|---------|----------------------------|
| 📜 **Official Lenis Smooth Scrolling** | Installed from official repository `lenis@1.3.26`, running in central `LenisProvider` with `autoRaf: false` tied to GSAP ticker. |
| 🎬 **GSAP ScrollTrigger Integration** | Bidirectional stage transitions (`onEnter` and `onEnterBack`), dynamic diagram scaling, and synchronized progress bars. |
| 🗺️ **Signature Interactive Learning Paths** | Pinned visual stage panels on desktop; responsive vertical timeline on mobile; localStorage persistent module progress. |
| 📰 **Technical Article Publication** | 18 full-length original engineering deep dives across 4 categories with code snippets, prerequisites, and related guides. |
| 🔍 **Discovery & Search Engine** | Full-text title/tag/summary search, category filtering, sort by popularity or date, paginated URL query reflection. |
| 🔖 **Resource Bookmarks** | Client-side bookmarks persistence in `localStorage`, unified across article views and `/bookmarks`. |
| 🌗 **Anti-Flash Theme Toggle** | Zero-FOUC inline script theme engine switching between light (`#f8fafc`) and dark (`#090d16`). |
| 📐 **Accessible Reading Controls** | User-adjustable font size provider (Small / Medium / Large), high contrast text, and keyboard visible focus rings. |
| 🧭 **Smooth Anchor Navigation** | Heading offsets configured with `scroll-margin-top: 5.5rem` to prevent sticky navbar occlusion. |
| ♿ **WCAG 2.2 Accessibility & a11y** | Skip-to-content link, `prefers-reduced-motion` detection, ARIA state declarations, and full keyboard navigation. |
| 🔗 **Technical SEO & Structured Data** | JSON-LD schemas (`WebSite`, `Article`, `Course`, `BreadcrumbList`), dynamic `sitemap.xml`, and `robots.txt`. |
| 📝 **Admin Draft Editor & Live Preview** | Split-pane markdown editor with instant client-side preview, validation, and simulated publishing flow. |

---

## Technology Stack & Architecture

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | Next.js 16 (App Router + Turbopack) | Server Components by default, streaming SSR, Partial Prerendering (PPR), static optimization. |
| **Language** | TypeScript 5 | Strict typing across article models, search params, learning paths, and DOM events. |
| **Styling** | Tailwind CSS v4 | Zero runtime CSS overhead, modern design tokens, container queries, and subgrid support. |
| **Smooth Scrolling** | Official Lenis (`lenis@1.3.26`) | High-performance, accessible, physics-based scroll normalization. |
| **Animation System** | GSAP 3 + ScrollTrigger | Orchestrated section entrances, pinned visual panels, and stage transitions. |
| **Icons** | Lucide React | Clean, scalable vector iconography. |
| **Testing** | Playwright | 26 automated E2E tests validating browser interactions, navigation, and scroll physics. |
| **Deployment** | Vercel Edge Platform | Global Anycast CDN, automated Brotli/Gzip compression, edge revalidation. |

---

## Lenis & GSAP ScrollTrigger Synchronization Architecture

A primary problem with naive smooth-scrolling implementations is running multiple competing `requestAnimationFrame` loops or allowing GSAP's scroll measurements to desynchronize from the smoothed scroll position.

DevAtlas solves this with a **single, unified frame-update architecture**:

```
                  ┌──────────────────────────────┐
                  │    GSAP Internal Ticker      │
                  └──────────────┬───────────────┘
                                 │
                   tick event    │ time (seconds)
                                 ▼
                  ┌──────────────────────────────┐
                  │  lenis.raf(time * 1000)      │  (autoRaf: false)
                  └──────────────┬───────────────┘
                                 │
                   scroll event  │
                                 ▼
                  ┌──────────────────────────────┐
                  │    ScrollTrigger.update()    │
                  └──────────────────────────────┘
```

### Code Implementation (`components/providers/lenis-provider.tsx`)

```typescript
'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function LenisBinder() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // 1. Synchronize ScrollTrigger on Lenis scroll events
    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    // 2. Drive Lenis updates strictly off GSAP's unified ticker loop
    const updateTicker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0); // Prevent delay jumps

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(updateTicker);
    };
  }, [lenis]);

  return null;
}
```

### Motion Sensitivity & `prefers-reduced-motion`

When a user enables `prefers-reduced-motion: reduce`:
1. Lenis detects the setting via `options={{ respectReducedMotion: true }}` and falls back to native unassisted scrolling.
2. GSAP ScrollTrigger timelines disable pinning and large displacements.
3. Global CSS forces `transition-duration: 0.01ms` and `scroll-behavior: auto`.

---

## Signature Interactive Learning Paths

DevAtlas features two 5-stage signature learning curriculums with bespoke visual architecture diagrams:

### Path A: Frontend Performance Essentials (`/paths/frontend-performance-essentials`)
1. **Stage 01: Foundations & Modern CSS Primitives** — Container queries, subgrid, and zero-JS relational `:has()` selectors (`frontend-1-foundations.svg`).
2. **Stage 02: Browser Rendering Engine & Core Web Vitals** — Critical rendering path, DOM/CSSOM creation, layout reflow, and GPU compositing (`frontend-2-rendering.svg`).
3. **Stage 03: Responsive Images & Zero-CLS Optimization** — AVIF/WebP compression, responsive `srcset`, explicit aspect-ratios, and Next.js Image (`frontend-3-images.svg`).
4. **Stage 04: HTTP Caching, CDNs & Edge Revalidation** — Anycast CDN edge caching, origin shield tiers, ETags, and background stale-while-revalidate invalidation (`frontend-4-caching.svg`).
5. **Stage 05: Lighthouse Audits & Empirical Measurement** — Empirical performance audits, 100/100 score verification, INP tuning, and telemetry (`frontend-5-lighthouse.svg`).

### Path B: Your First ML Pipeline (`/paths/first-ml-pipeline`)
1. **Stage 01: Data Preparation & Pipeline Hygiene** — Ingestion, deduplication, schema validation, and partitioned Parquet lakes (`ml-1-data-prep.svg`).
2. **Stage 02: Feature Engineering & Vector Stores** — Dense feature scaling, embeddings extraction, and Feast point-in-time stores (`ml-2-features.svg`).
3. **Stage 03: Model Training & Attention Mechanisms** — Query-Key-Value attention computation, PyTorch AMP, and loss convergence (`ml-3-training.svg`).
4. **Stage 04: Model Evaluation & RAG Triad Benchmarks** — ROC curves, precision-recall analysis, and hallucination audits (`ml-4-evaluation.svg`).
5. **Stage 05: Model Serving & Real-Time Inference** — ONNX runtime INT8 quantization, Triton inference server, and Kubernetes HPA (`ml-5-deployment.svg`).

---

## Automated Testing Suite (Playwright)

DevAtlas includes a comprehensive 26-test Playwright suite testing real browser behaviors:

```bash
# Run production build and execute test suite
npm run build
npx playwright test
```

### Test Results: 26 / 26 Passed (100% Success)

```
  ok  1 [chromium] › 1. Homepage renders brand, tagline, and navigation properly (878ms)
  ok  2 [chromium] › 2. Search finds existing articles (963ms)
  ok  3 [chromium] › 3. Search with no matching results displays clear empty state (896ms)
  ok  4 [chromium] › 4. Category and tag filters filter results correctly (685ms)
  ok  5 [chromium] › 5. Sorting changes result order (750ms)
  ok  6 [chromium] › 6. Pagination navigates between pages and preserves query parameters (789ms)
  ok  7 [chromium] › 7. Opening an article opens correct article page (738ms)
  ok  8 [chromium] › 8. Table of contents lists headings and provides anchor links (665ms)
  ok  9 [chromium] › 9. Code block copy button provides visual copied feedback (627ms)
  ok 10 [chromium] › 10. Bookmarking updates state and syncs to /bookmarks page (853ms)
  ok 11 [chromium] › 11. Theme toggle switches between dark and light themes (880ms)
  ok 12 [chromium] › 12. Article previous/next navigation cards work (662ms)
  ok 13 [chromium] › 13. Invalid slugs return 404 page (1.1s)
  ok 14 [chromium] › 14. Mobile viewport opens hamburger drawer and navigates (645ms)
  ok 15 [chromium] › 15. Skip link is accessible via keyboard Tab (718ms)
  ok 16 [chromium] › 16. Reduced-motion setting is respected by Lenis and CSS (400ms)
  ok 17 [chromium] › 17. Lenis smooth scrolling is active on the root document (1.3s)
  ok 18 [chromium] › 18. Learning path interactive step completion updates progress (800ms)
  ok 19 [chromium] › 19. Admin preview page validates draft and renders live markdown preview (645ms)
  ok 20 [chromium] › 20. Lenis smooth scrolling functions properly on long article pages (1.9s)
  ok 21 [chromium] › 21. Lenis scrolling operates smoothly on learning-path page (1.9s)
  ok 22 [chromium] › 22. Lenis and GSAP ScrollTrigger are synchronized on the root window (1.5s)
  ok 23 [chromium] › 23. Active learning stage changes during downward scrolling (1.9s)
  ok 24 [chromium] › 24. Stage restores to Stage 01 when scrolling back up (3.6s)
  ok 25 [chromium] › 25. Learning path diagrams and category illustrations are rendered (902ms)
  ok 26 [chromium] › 26. Category topic pages render curated articles and breadcrumb metadata (449ms)
```

---

## Production Build & Static Generation Breakdown

`npm run build` compiles successfully via Next.js Turbopack, generating 38 static and Partial Prerender (PPR) routes:

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /admin/preview
├   /articles/[slug]
│ ├ ◐ /articles/[slug]
│ ├ ○ /articles/nextjs-15-react-19-architecture
│ ├ ○ /articles/modern-css-container-queries-has
│ └ ◐ [+16 more paths]
├ ○ /bookmarks
├ ○ /dashboard
├ ◐ /explore
├   /paths/[slug]
│ ├ ◐ /paths/[slug]
│ ├ ○ /paths/frontend-performance-essentials
│ ├ ○ /paths/first-ml-pipeline
│ └ ○ /paths/system-design-foundations
├ ○ /robots.txt
├ ○ /sitemap.xml
└   /topics/[slug]
  ├ ◐ /topics/[slug]
  ├ ○ /topics/web-dev
  ├ ○ /topics/ai-ml
  └ ◐ [+2 more paths]

Total compiled routes: 38 (Zero client JS hydration on article text)
```

---

## Getting Started

### Prerequisites
- Node.js &ge; 20
- npm

### Installation & Run

```bash
# 1. Clone repository
git clone https://github.com/your-username/devatlas.git
cd devatlas

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start development server
npm run dev
# Open http://localhost:3000

# 5. Production build and run
npm run build
npm start
```

---

## Credits & Acknowledgements

- **Official Lenis Library**: [darkroomengineering/lenis](https://github.com/darkroomengineering/lenis)
- **GSAP & ScrollTrigger**: [GreenSock](https://gsap.com/)
- **Next.js**: [Vercel](https://nextjs.org/)
- **Tailwind CSS**: [Tailwind Labs](https://tailwindcss.com/)
- **Lucide**: [Lucide Icons](https://lucide.dev/)
