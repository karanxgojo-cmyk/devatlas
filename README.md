# DevAtlas

**A High-Performance Engineering Knowledge Platform + ThreeUI Sketchbook Folio + Lenis Smooth Scrolling + Persistent Dual-Theme Architecture**

> *Learn. Build. Share.*

DevAtlas is a production-grade technical knowledge platform designed for engineering students, software developers, and system architects. It combines the tactile warmth and editorial craftsmanship of an archival botanical sketchbook with a high-performance modern web stack. Featuring peer-reviewed engineering deep dives, interactive sequential learning roadmaps, 3D WebGL architecture spreads, full-text search, and a zero-flicker dual-theme engine.

* **Live Production:** [https://devatlas-kohl.vercel.app](https://devatlas-kohl.vercel.app)
* **GitHub Repository:** [https://github.com/karanxgojo-cmyk/devatlas](https://github.com/karanxgojo-cmyk/devatlas)

---

## Architecture & Visual Design

### 1. ThreeUI Sketchbook Interactive Folio (Meng To)
* **Interactive 3D Book Spread:** Interactive page turn and plate viewer rendered via WebGL.
* **Micro-Inspection Loupe:** High-precision brass magnifying lens magnifying intricate system schematics at 2.3x zoom.
* **Botanical Wash:** Multi-layered botanical ground with responsive lighting and dark-mode adaptation.

### 2. Dual-Theme Editorial Color System
DevAtlas implements a warm, readable editorial palette across both light and dark modes:
* **Light Mode:** Warm off-white page background (`#F5F0E8`), soft cream cards (`#FFF8EE`), dark brown typography (`#49372F`), muted beige borders (`#DFD0BE`), and forest green (`#174B35`) accents.
* **Dark Mode:** Warm charcoal/espresso ground (`#1F1A17`), deep charcoal cards (`#27211C`), warm brown borders (`#3D322B`), readable cream typography (`#F5F0E8`), and mint-emerald accents (`#3EB489`). Zero cold navy, zero blue-black.
* **Anti-Flash Engine:** Instant theme resolution via an inline `<head>` script that evaluates `localStorage` and `prefers-color-scheme: dark` before DOM rendering, eliminating layout and color flashes. Synchronizes seamlessly across client routes and embedded iframes.

### 3. Lenis Smooth Scrolling & GSAP ScrollTrigger Synchronization
* Built on the official `lenis@1.3.26` library running on a single frame-update loop synchronized with the GSAP ticker.
* Bidirectional stage transitions (`onEnter` and `onEnterBack`), dynamic diagram scaling, and synchronized progress bars.
* Full respect for `prefers-reduced-motion: reduce`.

---

## Feature Matrix

| Feature | Engineering Implementation |
|---------|----------------------------|
| 📖 **ThreeUI Sketchbook Atlas** | Interactive 3D folio with inspection loupe, SVG plate viewer, and botanical paper aesthetic. |
| 📜 **Official Lenis Smooth Scrolling** | Installed from official repository `lenis@1.3.26`, running in central `LenisProvider` with `autoRaf: false` tied to GSAP ticker. |
| 🎬 **GSAP ScrollTrigger Integration** | Bidirectional stage transitions (`onEnter` and `onEnterBack`), dynamic diagram scaling, and synchronized progress bars. |
| 🗺️ **Interactive Learning Roadmaps** | 5-stage sequential curriculums with 3D cylindrical gallery, 2D system schematics, interactive completion, and local persistence. |
| 📰 **Technical Article Publication** | Full-length original engineering deep dives across 4 categories with syntax-highlighted code snippets, prerequisites, and related guides. |
| 🔍 **Discovery & Search Engine** | Full-text title/tag/summary search, category filtering, sort by popularity or reading time, and URL query preservation. |
| 🔖 **Resource Bookmarks** | Client-side bookmarks persistence in `localStorage`, unified across article views and `/bookmarks`. |
| 🌗 **Anti-Flash Theme Toggle** | Zero-FOUC inline script theme engine switching between warm light and warm dark espresso palettes. |
| 📐 **Accessible Reading Controls** | User-adjustable font size provider (Small / Medium / Large), high contrast text, and keyboard visible focus rings. |
| 🧭 **Smooth Anchor Navigation** | Heading offsets configured with `scroll-margin-top: 5.5rem` to prevent sticky navbar occlusion. |
| ♿ **WCAG 2.2 Accessibility & a11y** | Skip-to-content link, `prefers-reduced-motion` detection, ARIA state declarations, and full keyboard navigation. |
| 🔗 **Technical SEO & Structured Data** | JSON-LD schemas (`WebSite`, `TechArticle`, `Course`, `BreadcrumbList`), dynamic `sitemap.xml`, and `robots.txt`. |
| 📝 **Admin Draft Editor & Live Preview** | Split-pane markdown editor with instant client-side preview, validation, and simulated publishing flow. |

---

## Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | Next.js 16 (Turbopack) | Server Components by default, streaming SSR, Partial Prerendering (PPR), static optimization. |
| **Language** | TypeScript 5 | Strict typing across article models, search params, learning paths, and DOM events. |
| **Styling** | Tailwind CSS v4 | Zero runtime CSS overhead, modern design tokens, container queries, and subgrid support. |
| **3D & WebGL** | ThreeUI + Three.js | Curled-paper transitions, 3D cylindrical stage previews, and interactive WebGL canvas. |
| **Smooth Scrolling** | Official Lenis (`lenis@1.3.26`) | High-performance, accessible, physics-based scroll normalization. |
| **Animation System** | GSAP 3 + ScrollTrigger | Orchestrated section entrances, pinned visual panels, and stage transitions. |
| **Icons** | Lucide React | Clean, scalable vector iconography. |
| **Testing** | Playwright | 38 automated E2E tests validating browser interactions, navigation, and scroll physics. |
| **Deployment** | Vercel Edge Platform | Global Anycast CDN, automated Brotli/Gzip compression, edge revalidation. |

---

## Automated Verification Suite

DevAtlas includes a comprehensive 38-test Playwright suite testing real browser behaviors:

```bash
# Run production build and execute test suite
npm run build
npm run test
```

### Test Results: 38 / 38 Passed (100% Success)

```
  ok  1  Homepage renders brand, tagline, and navigation properly
  ok  2  Search finds existing articles
  ok  3  Search with no matching results displays clear empty state
  ok  4  Category and tag filters filter results correctly
  ok  5  Sorting changes result order
  ok  6  Pagination navigates between pages and preserves query parameters
  ok  7  Opening an article opens correct article page
  ok  8  Table of contents lists headings and provides anchor links
  ok  9  Code block copy button provides visual copied feedback
  ok 10  Bookmarking updates state and syncs to /bookmarks page
  ok 11  Theme toggle switches between dark and light themes
  ok 12  Article previous/next navigation cards work
  ok 13  Invalid slugs return 404 page
  ok 14  Mobile viewport opens hamburger drawer and navigates
  ok 15  Skip link is accessible via keyboard Tab
  ok 16  Reduced-motion setting is respected by Lenis and CSS
  ok 17  Lenis smooth scrolling is active on the root document
  ok 18  Learning path interactive step completion updates progress
  ok 19  Admin preview page validates draft and renders live markdown preview
  ok 20  Lenis smooth scrolling functions properly on long article pages
  ok 21  Lenis scrolling operates smoothly on learning-path page
  ok 22  Lenis and GSAP ScrollTrigger are synchronized on the root window
  ok 23  Active learning stage changes during downward scrolling
  ok 24  Stage restores to Stage 01 when scrolling back up
  ok 25  Learning path diagrams and category illustrations are rendered
  ok 26  Category topic pages render curated articles and breadcrumb metadata
  ok 27  Category cards render actual SVG images with positive dimensions
  ok 28  Pinned visual panel stays visible and sticky when scrolled to stage 3
  ok 29  Article cards display reading time and date without fake view counts
  ok 30  Interactive cards include card-morph and image-morph styling
  ok 31  Editorial tracks and open educational ecosystem render with distinct styling
  ok 32  Difficulty filter displays beginner foundation guides
  ok 33  Complete sequential roadmaps display 5-tier progression with exercises and pitfalls
  ok 34  ThreeUI Cylindrical Gallery renders in pinned learning panel with 3D canvas
  ok 35  Velora UI Sticky Scroll structure renders pinned panel and sequential step blocks
  ok 36  Switching between 3D Cylinder and 2D Schematic modes operates smoothly
  ok 37  ThreeUI Sketchbook Atlas renders on homepage via template iframe with 3D book and plates
  ok 38  Standalone ThreeUI Sketchbook page loads directly with full folio and navigation
```

---

## Production Build & Static Route Prerendering

All 50 application routes compile and prerender statically:

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /admin/preview
├   /articles/[slug] (25 routes)
├ ○ /bookmarks
├ ○ /dashboard
├ ◐ /explore
├ ○ /paths
├   /paths/[slug] (6 routes)
├ ○ /robots.txt
├ ○ /sitemap.xml
├ ○ /topics
└   /topics/[slug] (4 routes)

Total compiled routes: 50 (Zero client JS hydration on article text)
```

---

## Getting Started

### Prerequisites
- Node.js &ge; 20
- npm

### Local Setup

```bash
# 1. Clone repository
git clone https://github.com/karanxgojo-cmyk/devatlas.git
cd devatlas

# 2. Install dependencies
npm install

# 3. Environment configuration
cp .env.example .env.local

# 4. Start development server
npm run dev
# Open http://localhost:3000

# 5. Production build and verification
npm run build
npm run test
npm start
```

---

## Environment Variables

| Variable | Description | Required | Default in Production |
|----------|-------------|----------|-----------------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL of the website without trailing slash. Used for SEO canonical tags, Open Graph images, and sitemap generation. | Optional | `https://devatlas-kohl.vercel.app` (or Vercel domain) |

---

## Production Deployment

DevAtlas is configured for deployment on Vercel with automatic continuous deployment linked to the GitHub repository:

* **Branch:** `main`
* **Build Command:** `next build`
* **Output Directory:** `.next`
* **Framework Preset:** Next.js
* **Continuous Integration:** Every commit pushed to `main` triggers an automatic edge build and deployment on Vercel.

---

## License

MIT License. Designed and engineered for high-performance open technical education.
