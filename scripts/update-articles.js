const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../lib/content/articles.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace .jpg with .svg in author avatars
content = content.replace(/\/images\/authors\/([a-z]+)\.jpg/g, '/images/authors/$1.svg');

const additionalArticles = `
  // 17. Responsive Images & Modern Formats
  {
    slug: 'responsive-images-modern-formats-optimization',
    title: 'Responsive Images & Modern Formats: AVIF, WebP, and Zero-CLS Delivery',
    summary: 'A comprehensive engineering guide to modern media delivery. Learn how modern image encoders (AVIF and WebP), responsive srcset breakpoints, explicit aspect-ratios, and Next.js Image eliminate Cumulative Layout Shift (CLS) and save 90%+ bandwidth.',
    category: 'web-dev',
    categoryName: 'Web Development',
    tags: ['Images', 'AVIF', 'WebP', 'CLS', 'Performance', 'Next.js'],
    author: {
      name: 'Elena Rostova',
      role: 'Staff Frontend Architect',
      avatar: '/images/authors/elena.svg',
      bio: 'Specializes in high-scale web applications, compiler optimizations, and modern React performance patterns.',
      github: 'https://github.com',
    },
    publishedAt: '2026-03-22',
    updatedAt: '2026-04-03',
    readingTime: '11 min read',
    difficulty: 'Intermediate',
    views: 14200,
    featured: true,
    prerequisites: [
      {
        title: 'Browser Rendering Pipeline',
        url: '/articles/browser-rendering-pipeline-core-web-vitals',
        description: 'Understanding how images impact the layout tree and paint phases.',
      },
      {
        title: 'HTML Picture & Srcset Specifications',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images',
        description: 'Basic syntax for responsive image markup.',
      },
    ],
    relatedArticleSlugs: [
      'browser-rendering-pipeline-core-web-vitals',
      'nextjs-15-react-19-architecture',
      'building-devatlas-lenis-smooth-scrolling',
    ],
    headings: [
      { id: 'the-image-payload-bottleneck', text: 'The Image Payload Bottleneck in Modern Web Apps', level: 2 },
      { id: 'avif-vs-webp-compression-analysis', text: 'AVIF vs WebP: Deep Compression & Artifact Analysis', level: 2 },
      { id: 'preventing-cumulative-layout-shift', text: 'Preventing Cumulative Layout Shift (CLS = 0.00)', level: 2 },
      { id: 'responsive-srcset-and-sizes-engineering', text: 'Responsive Srcset & Sizes Syntax Engineering', level: 2 },
      { id: 'nextjs-image-internals-and-edge-resizing', text: 'Next.js Image Internals & Edge Resizing', level: 2 },
    ],
    content: \`
## The Image Payload Bottleneck in Modern Web Apps

Images routinely account for **over 65% of total page weight** on the modern web. When unoptimized 2MB+ JPEGs are downloaded by mobile devices, they starve network queues, delay critical script execution, and severely degrade Largest Contentful Paint (LCP).

Furthermore, unsized images cause severe **Cumulative Layout Shift (CLS)**: as the image headers arrive, the browser suddenly expands the element box from 0px to its intrinsic height, jarringly displacing content the user is actively reading.

## AVIF vs WebP: Deep Compression & Artifact Analysis

Modern formats leverage video codec compression algorithms rather than legacy 1990s JPEG discrete cosine transforms:

1. **AVIF (AV1 Image File Format):** Derived from the open-source AV1 video codec. Delivers up to **50% smaller files than JPEG** and **20-30% smaller than WebP** at equivalent visual fidelity. It excels at preserving high-frequency gradients without blocking artifacts.
2. **WebP:** Derived from VP8. Widely supported across 98%+ of global browsers. Highly efficient for both lossy and lossless graphics, transparency, and animation.

\`\`\`html
<!-- Modern multi-format fallback syntax -->
<picture>
  <source type="image/avif" srcset="/images/hero-800w.avif 800w, /images/hero-1600w.avif 1600w" sizes="(max-width: 768px) 100vw, 800px">
  <source type="image/webp" srcset="/images/hero-800w.webp 800w, /images/hero-1600w.webp 1600w" sizes="(max-width: 768px) 100vw, 800px">
  <img src="/images/hero-800w.jpg" alt="DevAtlas Architecture" width="800" height="500" loading="lazy" decoding="async">
</picture>
\`\`\`

## Preventing Cumulative Layout Shift (CLS = 0.00)

Browsers calculate layout geometry *before* downloading the image body, provided the HTML contains **width** and **height** attributes or a CSS \`aspect-ratio\`:

\`\`\`css
/* Ensure zero layout shift on responsive images */
.responsive-img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}
\`\`\`

By declaring explicit dimensions or an aspect-ratio, the browser allocates a placeholder box of the exact pixel height immediately during DOM tree construction. When the image pixels finish streaming in, they fill the allocated box without moving any sibling or descendant elements.

## Responsive Srcset & Sizes Syntax Engineering

Never serve desktop-width 1920px images to a 375px mobile screen. Use \`srcset\` to provide multi-resolution targets and \`sizes\` to tell the browser how wide the image will render on the viewport:

\`\`\`tsx
import Image from 'next/image';

export function ArticleThumbnail({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority={false}
        loading="lazy"
      />
    </div>
  );
}
\`\`\`

## Next.js Image Internals & Edge Resizing

Under the hood, Next.js implements an automated on-demand image optimization pipeline:
- Intercepts requests through \`/_next/image?url=...\`.
- Negotiates the \`Accept\` request header to deliver AVIF if supported, otherwise falling back to WebP.
- Resizes and compresses the source image using sharp at the edge or server tier.
- Emits immutable \`Cache-Control: public, max-age=31536000, immutable\` response headers so repeated requests never hit the origin compute tier.
\`,
  },

  // 18. HTTP Caching, CDN Edge Networks, and Stale-While-Revalidate Patterns
  {
    slug: 'http-caching-cdn-edge-revalidation',
    title: 'HTTP Caching, CDN Edge Networks, and Stale-While-Revalidate Patterns',
    summary: 'Master HTTP cache-control semantics, Anycast CDN edge caching, origin shield tiers, ETags, and background stale-while-revalidate invalidation to achieve sub-20ms TTFB worldwide.',
    category: 'web-dev',
    categoryName: 'Web Development',
    tags: ['HTTP Caching', 'CDN', 'Edge Computing', 'Networking', 'Performance'],
    author: {
      name: 'Marcus Vance',
      role: 'Principal Systems Architect',
      avatar: '/images/authors/marcus.svg',
      bio: 'Deep systems engineer focusing on Linux networking, TCP/QUIC protocols, distributed consensus, and edge proxy architectures.',
      github: 'https://github.com',
    },
    publishedAt: '2026-03-28',
    updatedAt: '2026-04-05',
    readingTime: '12 min read',
    difficulty: 'Advanced',
    views: 16800,
    featured: true,
    prerequisites: [
      {
        title: 'TCP vs UDP & Modern QUIC / HTTP/3',
        url: '/articles/tcp-udp-quic-http3-protocols',
        description: 'Foundations of transport layer protocols and packet round trips.',
      },
      {
        title: 'Next.js 15 & React 19 Architecture',
        url: '/articles/nextjs-15-react-19-architecture',
        description: 'How server rendering interacts with cache boundaries.',
      },
    ],
    relatedArticleSlugs: [
      'tcp-udp-quic-http3-protocols',
      'nextjs-15-react-19-architecture',
      'building-devatlas-lenis-smooth-scrolling',
    ],
    headings: [
      { id: 'the-anatomy-of-http-caching', text: 'The Anatomy of HTTP Cache-Control Directives', level: 2 },
      { id: 'anycast-cdns-and-origin-shielding', text: 'Anycast CDNs & Origin Shielding Topology', level: 2 },
      { id: 'conditional-validation-etags-last-modified', text: 'Conditional Validation: ETags vs Last-Modified', level: 2 },
      { id: 'stale-while-revalidate-deep-dive', text: 'Stale-While-Revalidate (SWR): Zero Latency Invalidation', level: 2 },
      { id: 'cache-tag-purging-in-production', text: 'Targeted Cache-Tag Invalidation in Production', level: 2 },
    ],
    content: \`
## The Anatomy of HTTP Cache-Control Directives

Speed is not just how fast your server can execute JavaScript; speed is avoiding the round trip to the origin altogether. The \`Cache-Control\` header is the most powerful performance tool in HTTP engineering:

\`\`\`http
Cache-Control: public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800
\`\`\`

Understanding each directive:
- **public:** Allows intermediary proxies, shared CDNs, and client browsers to store the response.
- **max-age=3600:** The browser may reuse this cached payload for up to 1 hour (3600 seconds) without contacting the server.
- **s-maxage=86400:** Shared CDN edge caches may keep this response fresh for 24 hours (86,400 seconds), overriding \`max-age\` for shared proxies.
- **stale-while-revalidate=604800:** If a request arrives when the cache is older than 24 hours but younger than 7 days, the CDN **immediately returns the stale cached response in &lt; 15ms**, while asynchronously contacting the origin server in the background to fetch and cache the fresh copy.

## Anycast CDNs & Origin Shielding Topology

An Anycast CDN assigns the identical IP address to hundreds of Point of Presence (PoP) data centers globally. BGP routing automatically sends user packets to the geographically closest edge location.

When millions of users visit simultaneously, having every edge PoP independently query your database creates an **origin dogpile**. To prevent this, production architectures use **Origin Shielding**:
1. Global edge PoPs route cache misses to a designated regional shield PoP.
2. The shield PoP collapses duplicate requests (request coalescing / mutex locking).
3. Only ONE request reaches your origin compute tier, protecting databases from collapse during traffic surges.

## Conditional Validation: ETags vs Last-Modified

When a cached resource expires, the browser issues a conditional request:

\`\`\`http
GET /api/articles/nextjs-15-react-19-architecture HTTP/2
Host: devatlas.engineering
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
\`\`\`

If the content has not changed:
1. The server generates the content hash (ETag).
2. It matches the \`If-None-Match\` header.
3. The server immediately returns **HTTP 304 Not Modified** with zero payload bytes!
4. The client reuses its existing local cache, saving bandwidth and rendering instantly.

## Stale-While-Revalidate (SWR): Zero Latency Invalidation

In traditional caching, the unlucky user whose request arrives after a cache expiration suffers the full penalty of origin database queries and SSR execution (e.g. 800ms).

With \`stale-while-revalidate\`, **zero users ever experience origin latency**:
- The expired cache is served instantly.
- The background thread issues the origin revalidation.
- Subsequent users receive the updated version immediately.

## Targeted Cache-Tag Invalidation in Production

In modern frameworks like Next.js 15, pages and fetch requests can be tagged with domain identifiers:

\`\`\`typescript
// Server action or webhook handler
import { revalidateTag } from 'next/cache';

export async function onArticleUpdated(slug: string) {
  // Purges only the exact article and its category listing across global CDNs
  revalidateTag(\`article:\${slug}\`);
  revalidateTag('explore-feed');
}
\`\`\`

This provides the holy grail of web architecture: **static-level sub-15ms edge delivery with instant programmatic invalidation on publish.**
\`,
  },
`;

// Insert before the last export functions
content = content.replace('export function getAllArticles(): Article[] {', additionalArticles + '\nexport function getAllArticles(): Article[] {');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated lib/content/articles.ts with avatar SVGs and 2 new articles!');
