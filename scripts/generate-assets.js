const fs = require('fs');
const path = require('path');

const assets = [
  // 1. HERO ARCHITECTURE
  {
    path: 'public/images/hero/hero-architecture.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="hero-grad-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="50%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>
    <linearGradient id="hero-accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="50%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#a855f7" />
    </linearGradient>
    <linearGradient id="glow-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.1" />
    </linearGradient>
    <pattern id="hero-grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
    </pattern>
    <filter id="hero-blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="30" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="500" rx="16" fill="url(#hero-grad-bg)" />
  <rect width="800" height="500" rx="16" fill="url(#hero-grid)" />

  <!-- Ambient Glow -->
  <circle cx="200" cy="180" r="140" fill="#3b82f6" opacity="0.25" filter="url(#hero-blur)" />
  <circle cx="620" cy="300" r="160" fill="#8b5cf6" opacity="0.2" filter="url(#hero-blur)" />

  <!-- Pipeline Header -->
  <g transform="translate(40, 35)">
    <rect width="720" height="42" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
    <circle cx="24" cy="21" r="5" fill="#ef4444" />
    <circle cx="40" cy="21" r="5" fill="#f59e0b" />
    <circle cx="56" cy="21" r="5" fill="#10b981" />
    <text x="80" y="26" fill="#94a3b8" font-family="monospace" font-size="13" font-weight="600">DevAtlas Engine • Next.js 15 RSC + Lenis Physics + ScrollTrigger Pipeline</text>
    <rect x="630" y="11" width="76" height="20" rx="6" fill="#3b82f6" opacity="0.3" />
    <text x="643" y="25" fill="#60a5fa" font-family="monospace" font-size="11" font-weight="bold">60 FPS</text>
  </g>

  <!-- Architecture Nodes -->
  <!-- Node 1: Edge Router -->
  <g transform="translate(60, 120)">
    <rect width="180" height="150" rx="12" fill="rgba(15,23,42,0.85)" stroke="#38bdf8" stroke-width="1.5" />
    <rect x="14" y="16" width="32" height="32" rx="8" fill="#0284c7" opacity="0.3" />
    <path d="M 24 32 L 36 32 M 30 26 L 30 38" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
    <text x="56" y="32" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="bold">Edge Request</text>
    <text x="56" y="46" fill="#94a3b8" font-family="sans-serif" font-size="11">Global Anycast CDN</text>
    <line x1="14" y1="62" x2="166" y2="62" stroke="rgba(255,255,255,0.08)" />
    <text x="16" y="84" fill="#64748b" font-family="monospace" font-size="11">HTTP/3 Multiplex</text>
    <text x="16" y="104" fill="#38bdf8" font-family="monospace" font-size="11">TTFB &lt; 28ms</text>
    <text x="16" y="124" fill="#10b981" font-family="monospace" font-size="11">Cache: STALE-REVAL</text>
  </g>

  <!-- Flow Connector 1 to 2 -->
  <path d="M 240 195 L 310 195" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 4" />
  <polygon points="310,191 320,195 310,199" fill="#38bdf8" />

  <!-- Node 2: React Server Components Engine -->
  <g transform="translate(320, 100)">
    <rect width="200" height="190" rx="12" fill="rgba(15,23,42,0.9)" stroke="#6366f1" stroke-width="2" />
    <rect x="16" y="16" width="34" height="34" rx="8" fill="#4338ca" opacity="0.3" />
    <circle cx="33" cy="33" r="8" stroke="#818cf8" stroke-width="2" fill="none" />
    <text x="60" y="32" fill="#f8fafc" font-family="sans-serif" font-size="15" font-weight="bold">RSC Streamer</text>
    <text x="60" y="47" fill="#a5b4fc" font-family="sans-serif" font-size="11">Next.js 15 App Router</text>
    <line x1="16" y1="64" x2="184" y2="64" stroke="rgba(255,255,255,0.08)" />
    <rect x="16" y="76" width="168" height="24" rx="6" fill="rgba(99,102,241,0.15)" />
    <text x="24" y="92" fill="#c7d2fe" font-family="monospace" font-size="11">Zero-Client-JS Payload</text>
    <rect x="16" y="108" width="168" height="24" rx="6" fill="rgba(16,185,129,0.15)" />
    <text x="24" y="124" fill="#6ee7b7" font-family="monospace" font-size="11">Streaming SSR Suspense</text>
    <text x="16" y="152" fill="#94a3b8" font-family="monospace" font-size="11">Hydration overhead: 0kB</text>
    <text x="16" y="170" fill="#818cf8" font-family="monospace" font-size="11">Partial Prerendering (PPR)</text>
  </g>

  <!-- Flow Connector 2 to 3 -->
  <path d="M 520 195 L 580 195" stroke="#a855f7" stroke-width="2" stroke-dasharray="4 4" />
  <polygon points="580,191 590,195 580,199" fill="#a855f7" />

  <!-- Node 3: Lenis + GSAP Motion Engine -->
  <g transform="translate(590, 115)">
    <rect width="170" height="160" rx="12" fill="rgba(15,23,42,0.85)" stroke="#c084fc" stroke-width="1.5" />
    <rect x="14" y="16" width="32" height="32" rx="8" fill="#7e22ce" opacity="0.3" />
    <path d="M 22 36 Q 30 22 38 36" stroke="#c084fc" stroke-width="2" fill="none" />
    <text x="54" y="32" fill="#f8fafc" font-family="sans-serif" font-size="14" font-weight="bold">Lenis Motion</text>
    <text x="54" y="46" fill="#d8b4fe" font-family="sans-serif" font-size="11">GSAP Ticker Lock</text>
    <line x1="14" y1="62" x2="156" y2="62" stroke="rgba(255,255,255,0.08)" />
    <text x="14" y="84" fill="#a855f7" font-family="monospace" font-size="11">ScrollTrigger.update()</text>
    <text x="14" y="104" fill="#60a5fa" font-family="monospace" font-size="11">Smooth Momentum</text>
    <text x="14" y="124" fill="#10b981" font-family="monospace" font-size="11">Pinned Story Stages</text>
    <text x="14" y="144" fill="#e2e8f0" font-family="monospace" font-size="11">a11y Reduced Motion</text>
  </g>

  <!-- Lower Metric Cards -->
  <g transform="translate(60, 320)">
    <rect width="210" height="120" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="20" y="35" fill="#94a3b8" font-family="sans-serif" font-size="12" font-weight="600">Lighthouse Performance</text>
    <text x="20" y="78" fill="#10b981" font-family="sans-serif" font-size="40" font-weight="900">100</text>
    <text x="96" y="74" fill="#6ee7b7" font-family="monospace" font-size="13">/ 100</text>
    <text x="20" y="102" fill="#64748b" font-family="sans-serif" font-size="11">LCP: 0.8s • CLS: 0.00 • INP: 42ms</text>
  </g>

  <g transform="translate(295, 320)">
    <rect width="210" height="120" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="20" y="35" fill="#94a3b8" font-family="sans-serif" font-size="12" font-weight="600">WCAG 2.2 Accessibility</text>
    <text x="20" y="78" fill="#38bdf8" font-family="sans-serif" font-size="40" font-weight="900">100</text>
    <text x="96" y="74" fill="#7dd3fc" font-family="monospace" font-size="13">AA Level</text>
    <text x="20" y="102" fill="#64748b" font-family="sans-serif" font-size="11">Full keyboard Tab &amp; screen reader nav</text>
  </g>

  <g transform="translate(530, 320)">
    <rect width="230" height="120" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="20" y="35" fill="#94a3b8" font-family="sans-serif" font-size="12" font-weight="600">Technical SEO &amp; Rich Snippets</text>
    <text x="20" y="78" fill="#a855f7" font-family="sans-serif" font-size="40" font-weight="900">100</text>
    <text x="96" y="74" fill="#c084fc" font-family="monospace" font-size="13">Verified</text>
    <text x="20" y="102" fill="#64748b" font-family="sans-serif" font-size="11">JSON-LD Articles, Breadcrumbs, Sitemap</text>
  </g>
</svg>`
  },

  // 2. CATEGORY: WEB DEVELOPMENT
  {
    path: 'public/images/categories/web-dev.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="wd-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <linearGradient id="wd-accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>
  </defs>
  <rect width="600" height="400" rx="12" fill="url(#wd-bg)" />
  <!-- Browser Frame -->
  <rect x="40" y="30" width="520" height="340" rx="10" fill="#090d16" stroke="#334155" stroke-width="1.5" />
  <rect x="40" y="30" width="520" height="36" rx="10" fill="#1e293b" />
  <circle cx="64" cy="48" r="5" fill="#ef4444" />
  <circle cx="80" cy="48" r="5" fill="#f59e0b" />
  <circle cx="96" cy="48" r="5" fill="#10b981" />
  <rect x="120" y="40" width="280" height="18" rx="5" fill="#0f172a" />
  <text x="130" y="53" fill="#64748b" font-family="monospace" font-size="10">https://devatlas.engineering/web-dev</text>

  <!-- Interactive Code / Component Layout -->
  <g transform="translate(60, 90)">
    <rect width="220" height="250" rx="8" fill="#0f172a" stroke="#1e293b" />
    <text x="15" y="25" fill="#38bdf8" font-family="monospace" font-size="12">// Next.js 15 Server Component</text>
    <text x="15" y="45" fill="#f8fafc" font-family="monospace" font-size="11">export async function Page() {</text>
    <text x="25" y="65" fill="#a5b4fc" font-family="monospace" font-size="11">  const data = await db();</text>
    <text x="25" y="85" fill="#f8fafc" font-family="monospace" font-size="11">  return (</text>
    <text x="35" y="105" fill="#38bdf8" font-family="monospace" font-size="11">    &lt;Layout stream={true}&gt;</text>
    <text x="45" y="125" fill="#34d399" font-family="monospace" font-size="11">      &lt;Suspense fallback=&gt;</text>
    <text x="55" y="145" fill="#e2e8f0" font-family="monospace" font-size="11">        &lt;FastFeed /&gt;</text>
    <text x="45" y="165" fill="#34d399" font-family="monospace" font-size="11">      &lt;/Suspense&gt;</text>
    <text x="35" y="185" fill="#38bdf8" font-family="monospace" font-size="11">    &lt;/Layout&gt;</text>
    <text x="25" y="205" fill="#f8fafc" font-family="monospace" font-size="11">  );</text>
    <text x="15" y="225" fill="#f8fafc" font-family="monospace" font-size="11">}</text>
  </g>

  <!-- Render Pipeline Visual -->
  <g transform="translate(305, 90)">
    <rect width="235" height="250" rx="8" fill="#0f172a" stroke="#1e293b" />
    <text x="15" y="25" fill="#94a3b8" font-family="sans-serif" font-size="12" font-weight="bold">Critical Rendering Tree</text>
    
    <rect x="15" y="40" width="205" height="40" rx="6" fill="#1e3a8a" opacity="0.4" stroke="#3b82f6" />
    <text x="25" y="58" fill="#93c5fd" font-family="sans-serif" font-size="11" font-weight="600">DOM + CSSOM Construction</text>
    <text x="25" y="72" fill="#60a5fa" font-family="monospace" font-size="9">Parse HTML tokens &bull; Style Rules</text>

    <path d="M 117 80 L 117 95" stroke="#3b82f6" stroke-width="2" />

    <rect x="15" y="95" width="205" height="40" rx="6" fill="#312e81" opacity="0.4" stroke="#6366f1" />
    <text x="25" y="113" fill="#c7d2fe" font-family="sans-serif" font-size="11" font-weight="600">Render Tree &amp; Layout Reflow</text>
    <text x="25" y="127" fill="#818cf8" font-family="monospace" font-size="9">Box model metrics &bull; Geometry</text>

    <path d="M 117 135 L 117 150" stroke="#6366f1" stroke-width="2" />

    <rect x="15" y="150" width="205" height="40" rx="6" fill="#064e3b" opacity="0.4" stroke="#10b981" />
    <text x="25" y="168" fill="#6ee7b7" font-family="sans-serif" font-size="11" font-weight="600">Compositor &amp; GPU Paint</text>
    <text x="25" y="182" fill="#34d399" font-family="monospace" font-size="9">transform &amp; opacity &bull; 0ms JSR</text>

    <rect x="15" y="202" width="205" height="32" rx="6" fill="#1e293b" />
    <text x="25" y="222" fill="#38bdf8" font-family="monospace" font-size="11" font-weight="bold">&bull; 0 layout shifts (CLS: 0.00)</text>
  </g>
</svg>`
  },

  // 3. CATEGORY: AI & MACHINE LEARNING
  {
    path: 'public/images/categories/ai-ml.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="ai-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#2e1065" />
    </linearGradient>
  </defs>
  <rect width="600" height="400" rx="12" fill="url(#ai-bg)" />

  <!-- Multi-head Attention Matrix & Neural Graph -->
  <g transform="translate(50, 40)">
    <text x="0" y="20" fill="#c084fc" font-family="monospace" font-size="12" font-weight="bold">// TRANSFORMER Q-K-V ATTENTION</text>
    <text x="0" y="40" fill="#f8fafc" font-family="sans-serif" font-size="16" font-weight="bold">Self-Attention &amp; Vector Embeddings</text>

    <!-- Query Key Value vectors -->
    <rect x="0" y="60" width="120" height="140" rx="8" fill="#1e1b4b" stroke="#6366f1" />
    <text x="12" y="85" fill="#a5b4fc" font-family="monospace" font-size="12" font-weight="bold">Query [Q]</text>
    <rect x="12" y="98" width="96" height="8" rx="2" fill="#4338ca" />
    <rect x="12" y="112" width="96" height="8" rx="2" fill="#4f46e5" />
    <rect x="12" y="126" width="96" height="8" rx="2" fill="#6366f1" />
    <rect x="12" y="140" width="96" height="8" rx="2" fill="#818cf8" />
    <text x="12" y="175" fill="#94a3b8" font-family="monospace" font-size="10">dim = 768</text>

    <text x="135" y="130" fill="#e2e8f0" font-family="sans-serif" font-size="20">&times;</text>

    <rect x="160" y="60" width="120" height="140" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
    <text x="12" y="85" fill="#c084fc" font-family="monospace" font-size="12" font-weight="bold" transform="translate(160, 0)">Key [K]ᵀ</text>
    <rect x="172" y="98" width="96" height="8" rx="2" fill="#6d28d9" />
    <rect x="172" y="112" width="96" height="8" rx="2" fill="#7c3aed" />
    <rect x="172" y="126" width="96" height="8" rx="2" fill="#8b5cf6" />
    <rect x="172" y="140" width="96" height="8" rx="2" fill="#a78bfa" />
    <text x="172" y="175" fill="#94a3b8" font-family="monospace" font-size="10">dim = 768</text>

    <!-- Attention Heatmap -->
    <g transform="translate(320, 60)">
      <rect width="180" height="140" rx="8" fill="#090d16" stroke="#c084fc" />
      <text x="12" y="24" fill="#e2e8f0" font-family="sans-serif" font-size="11" font-weight="bold">Softmax(QKᵀ / √d)</text>
      <!-- Grid cells -->
      <rect x="15" y="35" width="22" height="22" rx="3" fill="#a855f7" />
      <rect x="42" y="35" width="22" height="22" rx="3" fill="#6b21a8" />
      <rect x="69" y="35" width="22" height="22" rx="3" fill="#3b0764" />
      <rect x="96" y="35" width="22" height="22" rx="3" fill="#d8b4fe" />
      <rect x="123" y="35" width="22" height="22" rx="3" fill="#7e22ce" />

      <rect x="15" y="62" width="22" height="22" rx="3" fill="#581c87" />
      <rect x="42" y="62" width="22" height="22" rx="3" fill="#c084fc" />
      <rect x="69" y="62" width="22" height="22" rx="3" fill="#9333ea" />
      <rect x="96" y="62" width="22" height="22" rx="3" fill="#3b0764" />
      <rect x="123" y="62" width="22" height="22" rx="3" fill="#e9d5ff" />

      <rect x="15" y="89" width="22" height="22" rx="3" fill="#7e22ce" />
      <rect x="42" y="89" width="22" height="22" rx="3" fill="#3b0764" />
      <rect x="69" y="89" width="22" height="22" rx="3" fill="#c084fc" />
      <rect x="96" y="89" width="22" height="22" rx="3" fill="#a855f7" />
      <rect x="123" y="89" width="22" height="22" rx="3" fill="#6b21a8" />
      <text x="15" y="128" fill="#a78bfa" font-family="monospace" font-size="10">Self-Attention Weights</text>
    </g>

    <!-- Vector Store / HNSW Graph Representation -->
    <g transform="translate(0, 220)">
      <rect width="500" height="90" rx="8" fill="#111827" stroke="#374151" />
      <circle cx="50" cy="45" r="14" fill="#3b82f6" />
      <circle cx="150" cy="30" r="16" fill="#8b5cf6" />
      <circle cx="250" cy="55" r="14" fill="#ec4899" />
      <circle cx="360" cy="35" r="18" fill="#10b981" />
      <circle cx="450" cy="50" r="12" fill="#f59e0b" />
      <line x1="50" y1="45" x2="150" y2="30" stroke="#60a5fa" stroke-width="2" />
      <line x1="150" y1="30" x2="250" y2="55" stroke="#a78bfa" stroke-width="2" />
      <line x1="250" y1="55" x2="360" y2="35" stroke="#f472b6" stroke-width="2" />
      <line x1="360" y1="35" x2="450" y2="50" stroke="#34d399" stroke-width="2" />
      <text x="20" y="78" fill="#9ca3af" font-family="monospace" font-size="10">HNSW Proximity Graph (Cosine Similarity &gt; 0.92)</text>
    </g>
  </g>
</svg>`
  },

  // 4. CATEGORY: COMPUTER SCIENCE
  {
    path: 'public/images/categories/computer-science.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="cs-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#064e3b" />
    </linearGradient>
  </defs>
  <rect width="600" height="400" rx="12" fill="url(#cs-bg)" />

  <g transform="translate(45, 35)">
    <text x="0" y="20" fill="#34d399" font-family="monospace" font-size="12" font-weight="bold">// DISTRIBUTED SYSTEMS &amp; STORAGE INTERNALS</text>
    <text x="0" y="42" fill="#f8fafc" font-family="sans-serif" font-size="16" font-weight="bold">Raft Consensus &amp; B-Tree Index Hierarchy</text>

    <!-- Raft Cluster Nodes -->
    <g transform="translate(0, 65)">
      <!-- Node A: Leader -->
      <rect x="0" y="0" width="140" height="110" rx="10" fill="#065f46" stroke="#10b981" stroke-width="2" />
      <text x="12" y="24" fill="#a7f3d0" font-family="sans-serif" font-size="12" font-weight="bold">Node 1 [LEADER]</text>
      <text x="12" y="44" fill="#ecfdf5" font-family="monospace" font-size="10">Term: 42</text>
      <rect x="12" y="55" width="116" height="18" rx="4" fill="#047857" />
      <text x="18" y="68" fill="#d1fae5" font-family="monospace" font-size="9">CommitIndex: 1048</text>
      <text x="12" y="95" fill="#34d399" font-family="monospace" font-size="9">&bull; Heartbeat (50ms)</text>

      <!-- Connection Lines -->
      <path d="M 140 35 L 200 20" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 3" />
      <path d="M 140 75 L 200 90" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3 3" />

      <!-- Node B: Follower -->
      <rect x="200" y="0" width="130" height="50" rx="8" fill="#0f172a" stroke="#334155" />
      <text x="12" y="22" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="bold" transform="translate(200, 0)">Node 2 [Follower]</text>
      <text x="12" y="38" fill="#64748b" font-family="monospace" font-size="9" transform="translate(200, 0)">Matched Log: 1048</text>

      <!-- Node C: Follower -->
      <rect x="200" y="65" width="130" height="50" rx="8" fill="#0f172a" stroke="#334155" />
      <text x="12" y="22" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="bold" transform="translate(200, 65)">Node 3 [Follower]</text>
      <text x="12" y="38" fill="#64748b" font-family="monospace" font-size="9" transform="translate(200, 65)">Matched Log: 1048</text>
    </g>

    <!-- B+ Tree Index Visual -->
    <g transform="translate(360, 65)">
      <rect width="150" height="110" rx="10" fill="#0f172a" stroke="#10b981" />
      <text x="12" y="22" fill="#6ee7b7" font-family="sans-serif" font-size="11" font-weight="bold">B+ Tree Storage Root</text>
      <rect x="12" y="32" width="126" height="24" rx="4" fill="#1e293b" />
      <text x="18" y="48" fill="#f8fafc" font-family="monospace" font-size="10">[20 | 50 | 80]</text>
      <line x1="30" y1="56" x2="20" y2="75" stroke="#10b981" />
      <line x1="75" y1="56" x2="75" y2="75" stroke="#10b981" />
      <line x1="120" y1="56" x2="130" y2="75" stroke="#10b981" />
      <rect x="10" y="75" width="130" height="24" rx="4" fill="#064e3b" />
      <text x="14" y="91" fill="#a7f3d0" font-family="monospace" font-size="9">Leaf Nodes (Linked List)</text>
    </g>

    <!-- Paging & Virtual Memory Console -->
    <g transform="translate(0, 200)">
      <rect width="510" height="110" rx="8" fill="#090d16" stroke="#1e293b" />
      <text x="16" y="25" fill="#38bdf8" font-family="monospace" font-size="11">&gt; OS Page Table &bull; CR3 Register: 0x00007fff8900</text>
      <text x="16" y="45" fill="#94a3b8" font-family="monospace" font-size="10">Virtual Addr: 0x7ffd1234a000 &rarr; TLB Cache Hit &rarr; Physical Page Frame: 0x1f4a0</text>
      <text x="16" y="65" fill="#10b981" font-family="monospace" font-size="10">Context Switch Cost: 1.2&mu;s &bull; Cache Flush Prevention with PCID</text>
      <rect x="16" y="78" width="478" height="18" rx="4" fill="#1e293b" />
      <text x="24" y="91" fill="#6ee7b7" font-family="monospace" font-size="10">Zero-Copy DMA &bull; epoll() socket I/O multiplexing active</text>
    </g>
  </g>
</svg>`
  },

  // 5. CATEGORY: ENGINEERING PROJECTS
  {
    path: 'public/images/categories/engineering-projects.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="ep-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#451a03" />
    </linearGradient>
  </defs>
  <rect width="600" height="400" rx="12" fill="url(#ep-bg)" />

  <g transform="translate(45, 35)">
    <text x="0" y="20" fill="#fbbf24" font-family="monospace" font-size="12" font-weight="bold">// ENTERPRISE SYSTEM ARCHITECTURE</text>
    <text x="0" y="42" fill="#f8fafc" font-family="sans-serif" font-size="16" font-weight="bold">High-Throughput Kafka Microservices &amp; Blue-Green Mesh</text>

    <!-- Kafka Topic Streaming -->
    <g transform="translate(0, 65)">
      <rect width="240" height="130" rx="10" fill="#1c1917" stroke="#d97706" />
      <text x="14" y="25" fill="#fef3c7" font-family="sans-serif" font-size="12" font-weight="bold">Kafka Event Broker</text>
      <text x="14" y="42" fill="#f59e0b" font-family="monospace" font-size="10">Topic: telemetry-events (6 partitions)</text>
      <rect x="14" y="55" width="212" height="20" rx="4" fill="#292524" />
      <text x="20" y="69" fill="#fbbf24" font-family="monospace" font-size="9">P0: [msg] P1: [msg] P2: [msg]</text>
      <rect x="14" y="80" width="212" height="20" rx="4" fill="#292524" />
      <text x="20" y="94" fill="#fbbf24" font-family="monospace" font-size="9">P3: [msg] P4: [msg] P5: [msg]</text>
      <text x="14" y="118" fill="#a8a29e" font-family="monospace" font-size="9">Throughput: 150k msgs/sec</text>
    </g>

    <!-- Blue Green Deployment -->
    <g transform="translate(265, 65)">
      <rect width="245" height="130" rx="10" fill="#1c1917" stroke="#3b82f6" />
      <text x="14" y="25" fill="#93c5fd" font-family="sans-serif" font-size="12" font-weight="bold">Zero-Downtime Rollout</text>
      <rect x="14" y="40" width="217" height="34" rx="6" fill="#1e3a8a" opacity="0.5" stroke="#3b82f6" />
      <text x="22" y="56" fill="#bfdbfe" font-family="monospace" font-size="10">BLUE [Active 100% Traffic]</text>
      <text x="22" y="68" fill="#60a5fa" font-family="monospace" font-size="9">v2.4.0 &bull; Healthy &bull; 12 Pods</text>

      <rect x="14" y="82" width="217" height="34" rx="6" fill="#065f46" opacity="0.5" stroke="#10b981" />
      <text x="22" y="98" fill="#a7f3d0" font-family="monospace" font-size="10">GREEN [Staged v2.5.0]</text>
      <text x="22" y="110" fill="#34d399" font-family="monospace" font-size="9">Canary verified &bull; Switch ready</text>
    </g>

    <!-- Observability & Telemetry -->
    <g transform="translate(0, 215)">
      <rect width="510" height="95" rx="8" fill="#090d16" stroke="#292524" />
      <text x="16" y="25" fill="#fbbf24" font-family="monospace" font-size="11">System Telemetry &bull; Prometheus + OpenTelemetry + Grafana</text>
      <text x="16" y="48" fill="#a8a29e" font-family="monospace" font-size="10">Database connection pool: 98% utilization &bull; P99 latency: 12.4ms</text>
      <text x="16" y="68" fill="#10b981" font-family="monospace" font-size="10">Zero memory leaks detected over 30 days continuous runtime</text>
    </g>
  </g>
</svg>`
  },

  // 6. LEARNING PATH A - STAGE 01: FOUNDATIONS
  {
    path: 'public/images/paths/frontend-1-foundations.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 450" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="p1-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="700" height="450" rx="16" fill="url(#p1-bg)" />
  <rect x="30" y="30" width="640" height="390" rx="12" fill="#090d16" stroke="#334155" stroke-width="1.5" />
  
  <g transform="translate(60, 60)">
    <rect x="0" y="0" width="120" height="26" rx="13" fill="#1e3a8a" stroke="#3b82f6" />
    <text x="14" y="17" fill="#93c5fd" font-family="monospace" font-size="11" font-weight="bold">STAGE 01</text>
    <text x="135" y="19" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="bold">Frontend Architecture Foundations</text>
    
    <!-- Code Editor Box -->
    <g transform="translate(0, 45)">
      <rect width="280" height="250" rx="10" fill="#0f172a" stroke="#1e293b" />
      <rect width="280" height="30" rx="10" fill="#1e293b" />
      <circle cx="20" cy="15" r="4" fill="#ef4444" />
      <circle cx="32" cy="15" r="4" fill="#f59e0b" />
      <circle cx="44" cy="15" r="4" fill="#10b981" />
      <text x="60" y="19" fill="#64748b" font-family="monospace" font-size="11">layout.css</text>

      <text x="15" y="55" fill="#38bdf8" font-family="monospace" font-size="11">@container (min-width: 480px) {</text>
      <text x="25" y="75" fill="#a5b4fc" font-family="monospace" font-size="11">  .article-card {</text>
      <text x="35" y="95" fill="#f8fafc" font-family="monospace" font-size="11">    display: grid;</text>
      <text x="35" y="115" fill="#f8fafc" font-family="monospace" font-size="11">    grid-template-columns: subgrid;</text>
      <text x="25" y="135" fill="#a5b4fc" font-family="monospace" font-size="11">  }</text>
      <text x="15" y="155" fill="#38bdf8" font-family="monospace" font-size="11">}</text>
      <text x="15" y="185" fill="#34d399" font-family="monospace" font-size="11">article:has(.badge) {</text>
      <text x="25" y="205" fill="#f8fafc" font-family="monospace" font-size="11">  border-color: var(--highlight);</text>
      <text x="15" y="225" fill="#34d399" font-family="monospace" font-size="11">}</text>
    </g>

    <!-- Structural Layout Diagram -->
    <g transform="translate(310, 45)">
      <rect width="270" height="250" rx="10" fill="#0f172a" stroke="#1e293b" />
      <text x="15" y="25" fill="#94a3b8" font-family="sans-serif" font-size="12" font-weight="bold">Modern Layout Primitives</text>
      
      <rect x="15" y="45" width="240" height="50" rx="6" fill="#1e293b" stroke="#3b82f6" />
      <text x="25" y="68" fill="#60a5fa" font-family="sans-serif" font-size="12" font-weight="bold">Container Queries</text>
      <text x="25" y="84" fill="#94a3b8" font-family="sans-serif" font-size="10">Component-driven responsive design</text>

      <rect x="15" y="105" width="240" height="50" rx="6" fill="#1e293b" stroke="#6366f1" />
      <text x="25" y="128" fill="#818cf8" font-family="sans-serif" font-size="12" font-weight="bold">CSS Subgrid Alignment</text>
      <text x="25" y="144" fill="#94a3b8" font-family="sans-serif" font-size="10">Consistent tracks across nested elements</text>

      <rect x="15" y="165" width="240" height="50" rx="6" fill="#1e293b" stroke="#10b981" />
      <text x="25" y="188" fill="#34d399" font-family="sans-serif" font-size="12" font-weight="bold">:has() Parent Selector</text>
      <text x="25" y="204" fill="#94a3b8" font-family="sans-serif" font-size="10">Zero-JS relational state styling</text>
    </g>
  </g>
</svg>`
  },

  // 7. LEARNING PATH A - STAGE 02: BROWSER RENDERING
  {
    path: 'public/images/paths/frontend-2-rendering.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 450" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="p2-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e1b4b" />
    </linearGradient>
  </defs>
  <rect width="700" height="450" rx="16" fill="url(#p2-bg)" />
  <rect x="30" y="30" width="640" height="390" rx="12" fill="#090d16" stroke="#334155" stroke-width="1.5" />
  
  <g transform="translate(60, 60)">
    <rect x="0" y="0" width="120" height="26" rx="13" fill="#312e81" stroke="#6366f1" />
    <text x="14" y="17" fill="#c7d2fe" font-family="monospace" font-size="11" font-weight="bold">STAGE 02</text>
    <text x="135" y="19" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="bold">Browser Rendering Pipeline</text>

    <!-- Pipeline Flow Diagram -->
    <g transform="translate(0, 50)">
      <!-- Step 1: Parse -->
      <rect x="0" y="0" width="125" height="150" rx="8" fill="#0f172a" stroke="#3b82f6" />
      <text x="12" y="25" fill="#60a5fa" font-family="sans-serif" font-size="12" font-weight="bold">1. PARSE</text>
      <text x="12" y="48" fill="#f8fafc" font-family="sans-serif" font-size="11">HTML &rarr; DOM</text>
      <text x="12" y="66" fill="#f8fafc" font-family="sans-serif" font-size="11">CSS &rarr; CSSOM</text>
      <line x1="12" y1="80" x2="113" y2="80" stroke="#1e293b" />
      <text x="12" y="100" fill="#94a3b8" font-family="monospace" font-size="10">Tokenization</text>
      <text x="12" y="118" fill="#94a3b8" font-family="monospace" font-size="10">Tree building</text>

      <path d="M 125 75 L 145 75" stroke="#3b82f6" stroke-width="2" />

      <!-- Step 2: Render Tree -->
      <rect x="145" y="0" width="130" height="150" rx="8" fill="#0f172a" stroke="#6366f1" />
      <text x="12" y="25" fill="#818cf8" font-family="sans-serif" font-size="12" font-weight="bold">2. STYLE</text>
      <text x="12" y="48" fill="#f8fafc" font-family="sans-serif" font-size="11">Render Tree</text>
      <text x="12" y="66" fill="#94a3b8" font-family="sans-serif" font-size="10">Visible nodes</text>
      <line x1="12" y1="80" x2="118" y2="80" stroke="#1e293b" />
      <text x="12" y="100" fill="#c7d2fe" font-family="monospace" font-size="10">Cascade solve</text>
      <text x="12" y="118" fill="#c7d2fe" font-family="monospace" font-size="10">Computed style</text>

      <path d="M 275 75 L 295 75" stroke="#6366f1" stroke-width="2" />

      <!-- Step 3: Layout -->
      <rect x="295" y="0" width="130" height="150" rx="8" fill="#0f172a" stroke="#8b5cf6" />
      <text x="12" y="25" fill="#a78bfa" font-family="sans-serif" font-size="12" font-weight="bold">3. LAYOUT</text>
      <text x="12" y="48" fill="#f8fafc" font-family="sans-serif" font-size="11">Reflow &amp; Geometry</text>
      <text x="12" y="66" fill="#94a3b8" font-family="sans-serif" font-size="10">Exact pixels</text>
      <line x1="12" y1="80" x2="118" y2="80" stroke="#1e293b" />
      <text x="12" y="100" fill="#ddd6fe" font-family="monospace" font-size="10">Box metrics</text>
      <text x="12" y="118" fill="#ddd6fe" font-family="monospace" font-size="10">Viewport size</text>

      <path d="M 425 75 L 445 75" stroke="#8b5cf6" stroke-width="2" />

      <!-- Step 4: Paint & Composite -->
      <rect x="445" y="0" width="135" height="150" rx="8" fill="#0f172a" stroke="#10b981" />
      <text x="12" y="25" fill="#34d399" font-family="sans-serif" font-size="12" font-weight="bold">4. COMPOSITE</text>
      <text x="12" y="48" fill="#f8fafc" font-family="sans-serif" font-size="11">GPU Layers</text>
      <text x="12" y="66" fill="#94a3b8" font-family="sans-serif" font-size="10">Fast 60fps</text>
      <line x1="12" y1="80" x2="123" y2="80" stroke="#1e293b" />
      <text x="12" y="100" fill="#a7f3d0" font-family="monospace" font-size="10">Rasterization</text>
      <text x="12" y="118" fill="#a7f3d0" font-family="monospace" font-size="10">Tiling &amp; Draw</text>
    </g>

    <!-- Core Web Vitals Checklist -->
    <g transform="translate(0, 220)">
      <rect width="580" height="75" rx="8" fill="#111827" stroke="#374151" />
      <text x="20" y="28" fill="#f8fafc" font-family="sans-serif" font-size="12" font-weight="bold">Core Web Vitals Impact Analysis:</text>
      <text x="20" y="52" fill="#38bdf8" font-family="monospace" font-size="11">&bull; LCP: Keep critical server payload &lt; 50kB to render paint candidate in &lt; 1.2s</text>
      <text x="320" y="52" fill="#10b981" font-family="monospace" font-size="11">&bull; INP: Yield long tasks via scheduler.yield()</text>
    </g>
  </g>
</svg>`
  },

  // 8. LEARNING PATH A - STAGE 03: IMAGE OPTIMIZATION
  {
    path: 'public/images/paths/frontend-3-images.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 450" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="p3-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#022c22" />
    </linearGradient>
  </defs>
  <rect width="700" height="450" rx="16" fill="url(#p3-bg)" />
  <rect x="30" y="30" width="640" height="390" rx="12" fill="#090d16" stroke="#334155" stroke-width="1.5" />
  
  <g transform="translate(60, 60)">
    <rect x="0" y="0" width="120" height="26" rx="13" fill="#064e3b" stroke="#10b981" />
    <text x="14" y="17" fill="#a7f3d0" font-family="monospace" font-size="11" font-weight="bold">STAGE 03</text>
    <text x="135" y="19" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="bold">Modern Responsive Image Optimization</text>

    <!-- Side-by-side Comparison -->
    <g transform="translate(0, 45)">
      <!-- Unoptimized Image -->
      <rect x="0" y="0" width="275" height="180" rx="10" fill="#18181b" stroke="#ef4444" />
      <rect x="0" y="0" width="275" height="28" rx="10" fill="#27272a" />
      <text x="15" y="18" fill="#f87171" font-family="sans-serif" font-size="11" font-weight="bold">Traditional JPEG (Unoptimized)</text>
      <text x="15" y="55" fill="#fca5a5" font-family="monospace" font-size="12">File Size: 1.84 MB</text>
      <text x="15" y="75" fill="#94a3b8" font-family="monospace" font-size="11">Format: baseline JPEG 2400x1600</text>
      <text x="15" y="95" fill="#ef4444" font-family="monospace" font-size="11">&bull; Layout Shift (CLS: 0.28)</text>
      <text x="15" y="115" fill="#ef4444" font-family="monospace" font-size="11">&bull; Blocks Main Thread Decode</text>
      <text x="15" y="135" fill="#94a3b8" font-family="monospace" font-size="11">&bull; No responsive srcset</text>
      <text x="15" y="155" fill="#64748b" font-family="monospace" font-size="11">Load Duration: 2.1s (4G)</text>

      <!-- Optimized AVIF / WebP -->
      <rect x="305" y="0" width="275" height="180" rx="10" fill="#064e3b" stroke="#10b981" />
      <rect x="305" y="0" width="275" height="28" rx="10" fill="#047857" />
      <text x="320" y="18" fill="#d1fae5" font-family="sans-serif" font-size="11" font-weight="bold">Next.js AVIF / WebP Pipeline</text>
      <text x="320" y="55" fill="#6ee7b7" font-family="monospace" font-size="12">File Size: 48 KB (97.4% reduction)</text>
      <text x="320" y="75" fill="#ecfdf5" font-family="monospace" font-size="11">Format: AVIF with WebP fallback</text>
      <text x="320" y="95" fill="#34d399" font-family="monospace" font-size="11">&bull; Explicit aspect-ratio (CLS: 0.00)</text>
      <text x="320" y="115" fill="#34d399" font-family="monospace" font-size="11">&bull; decoding="async" loading="lazy"</text>
      <text x="320" y="135" fill="#34d399" font-family="monospace" font-size="11">&bull; srcset: 640w, 1080w, 1920w</text>
      <text x="320" y="155" fill="#a7f3d0" font-family="monospace" font-size="11">Load Duration: 74ms</text>
    </g>

    <!-- Picture element syntax demonstration -->
    <g transform="translate(0, 240)">
      <rect width="580" height="70" rx="8" fill="#0f172a" stroke="#1e293b" />
      <text x="15" y="24" fill="#38bdf8" font-family="monospace" font-size="11">&lt;Image src={src} alt="Architecture" priority={false} sizes="(max-width: 768px) 100vw, 50vw" /&gt;</text>
      <text x="15" y="48" fill="#94a3b8" font-family="monospace" font-size="10">Eliminates oversized asset payloads &bull; Automatically converts to WebP/AVIF at edge</text>
    </g>
  </g>
</svg>`
  },

  // 9. LEARNING PATH A - STAGE 04: CACHING AND DELIVERY
  {
    path: 'public/images/paths/frontend-4-caching.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 450" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="p4-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e1b4b" />
    </linearGradient>
  </defs>
  <rect width="700" height="450" rx="16" fill="url(#p4-bg)" />
  <rect x="30" y="30" width="640" height="390" rx="12" fill="#090d16" stroke="#334155" stroke-width="1.5" />
  
  <g transform="translate(60, 60)">
    <rect x="0" y="0" width="120" height="26" rx="13" fill="#1e3a8a" stroke="#3b82f6" />
    <text x="14" y="17" fill="#93c5fd" font-family="monospace" font-size="11" font-weight="bold">STAGE 04</text>
    <text x="135" y="19" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="bold">HTTP Caching &amp; CDN Delivery Architecture</text>

    <!-- Request flow from User -> CDN Edge -> Origin Shield -> Server -->
    <g transform="translate(0, 50)">
      <!-- Client -->
      <rect x="0" y="15" width="105" height="110" rx="8" fill="#0f172a" stroke="#64748b" />
      <text x="12" y="38" fill="#f8fafc" font-family="sans-serif" font-size="11" font-weight="bold">Browser</text>
      <text x="12" y="56" fill="#94a3b8" font-family="monospace" font-size="9">Local Cache</text>
      <text x="12" y="74" fill="#38bdf8" font-family="monospace" font-size="9">If-None-Match</text>
      <text x="12" y="92" fill="#10b981" font-family="monospace" font-size="9">304 Cached</text>

      <!-- Flow Arrow 1 -->
      <path d="M 105 70 L 155 70" stroke="#38bdf8" stroke-width="2" />
      <text x="110" y="60" fill="#38bdf8" font-family="monospace" font-size="9">GET</text>

      <!-- CDN Edge -->
      <rect x="155" y="0" width="135" height="140" rx="8" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1.5" />
      <text x="12" y="24" fill="#93c5fd" font-family="sans-serif" font-size="11" font-weight="bold">CDN Anycast Edge</text>
      <text x="12" y="44" fill="#dbeafe" font-family="monospace" font-size="9">300+ Global PoPs</text>
      <line x1="12" y1="52" x2="123" y2="52" stroke="#2563eb" />
      <text x="12" y="68" fill="#f8fafc" font-family="monospace" font-size="9">Cache HIT &rarr; 8ms</text>
      <text x="12" y="86" fill="#60a5fa" font-family="monospace" font-size="9">s-maxage=86400</text>
      <text x="12" y="104" fill="#bfdbfe" font-family="monospace" font-size="9">stale-while-revalidate</text>
      <text x="12" y="122" fill="#34d399" font-family="monospace" font-size="9">Brotli (br) Comp</text>

      <!-- Flow Arrow 2 -->
      <path d="M 290 70 L 340 70" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3 3" />
      <text x="296" y="60" fill="#f59e0b" font-family="monospace" font-size="9">MISS</text>

      <!-- Origin Next.js Server -->
      <rect x="340" y="15" width="125" height="110" rx="8" fill="#0f172a" stroke="#6366f1" />
      <text x="12" y="38" fill="#f8fafc" font-family="sans-serif" font-size="11" font-weight="bold">Origin Server</text>
      <text x="12" y="56" fill="#a5b4fc" font-family="monospace" font-size="9">Next.js 15 App</text>
      <text x="12" y="74" fill="#818cf8" font-family="monospace" font-size="9">ETag Generation</text>
      <text x="12" y="92" fill="#c7d2fe" font-family="monospace" font-size="9">Incremental ISR</text>

      <!-- Database -->
      <path d="M 465 70 L 495 70" stroke="#6366f1" stroke-width="2" />
      <rect x="495" y="25" width="85" height="90" rx="8" fill="#090d16" stroke="#475569" />
      <text x="12" y="38" fill="#e2e8f0" font-family="sans-serif" font-size="10" font-weight="bold">DB / MDX</text>
      <text x="12" y="56" fill="#94a3b8" font-family="monospace" font-size="9">PostgreSQL</text>
      <text x="12" y="74" fill="#10b981" font-family="monospace" font-size="9">Read Replica</text>
    </g>

    <!-- Cache Header Specification Table -->
    <g transform="translate(0, 215)">
      <rect width="580" height="95" rx="8" fill="#0f172a" stroke="#1e293b" />
      <text x="15" y="24" fill="#60a5fa" font-family="monospace" font-size="11">Cache-Control: public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800</text>
      <text x="15" y="48" fill="#94a3b8" font-family="monospace" font-size="10">&bull; Browser caches for 1 hour &bull; Edge servers cache for 24 hours</text>
      <text x="15" y="68" fill="#10b981" font-family="monospace" font-size="10">&bull; Serves cached content instantly while asynchronously revalidating in background</text>
    </g>
  </g>
</svg>`
  },

  // 10. LEARNING PATH A - STAGE 05: LIGHTHOUSE & MEASUREMENT
  {
    path: 'public/images/paths/frontend-5-lighthouse.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 450" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="p5-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#064e3b" />
    </linearGradient>
  </defs>
  <rect width="700" height="450" rx="16" fill="url(#p5-bg)" />
  <rect x="30" y="30" width="640" height="390" rx="12" fill="#090d16" stroke="#334155" stroke-width="1.5" />
  
  <g transform="translate(60, 60)">
    <rect x="0" y="0" width="120" height="26" rx="13" fill="#065f46" stroke="#10b981" />
    <text x="14" y="17" fill="#a7f3d0" font-family="monospace" font-size="11" font-weight="bold">STAGE 05</text>
    <text x="135" y="19" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="bold">Lighthouse 100 &amp; Empirical Measurement</text>

    <!-- Four Score Gauges -->
    <g transform="translate(0, 45)">
      <!-- Performance Gauge -->
      <g transform="translate(25, 0)">
        <circle cx="50" cy="50" r="42" stroke="#064e3b" stroke-width="8" fill="none" />
        <circle cx="50" cy="50" r="42" stroke="#10b981" stroke-width="8" stroke-dasharray="264" stroke-dashoffset="0" fill="none" />
        <text x="32" y="58" fill="#10b981" font-family="sans-serif" font-size="26" font-weight="bold">100</text>
        <text x="14" y="112" fill="#f8fafc" font-family="sans-serif" font-size="12" font-weight="bold">Performance</text>
      </g>

      <!-- Accessibility Gauge -->
      <g transform="translate(170, 0)">
        <circle cx="50" cy="50" r="42" stroke="#064e3b" stroke-width="8" fill="none" />
        <circle cx="50" cy="50" r="42" stroke="#10b981" stroke-width="8" stroke-dasharray="264" stroke-dashoffset="0" fill="none" />
        <text x="32" y="58" fill="#10b981" font-family="sans-serif" font-size="26" font-weight="bold">100</text>
        <text x="14" y="112" fill="#f8fafc" font-family="sans-serif" font-size="12" font-weight="bold">Accessibility</text>
      </g>

      <!-- Best Practices Gauge -->
      <g transform="translate(315, 0)">
        <circle cx="50" cy="50" r="42" stroke="#064e3b" stroke-width="8" fill="none" />
        <circle cx="50" cy="50" r="42" stroke="#10b981" stroke-width="8" stroke-dasharray="264" stroke-dashoffset="0" fill="none" />
        <text x="32" y="58" fill="#10b981" font-family="sans-serif" font-size="26" font-weight="bold">100</text>
        <text x="12" y="112" fill="#f8fafc" font-family="sans-serif" font-size="12" font-weight="bold">Best Practices</text>
      </g>

      <!-- SEO Gauge -->
      <g transform="translate(460, 0)">
        <circle cx="50" cy="50" r="42" stroke="#064e3b" stroke-width="8" fill="none" />
        <circle cx="50" cy="50" r="42" stroke="#10b981" stroke-width="8" stroke-dasharray="264" stroke-dashoffset="0" fill="none" />
        <text x="32" y="58" fill="#10b981" font-family="sans-serif" font-size="26" font-weight="bold">100</text>
        <text x="38" y="112" fill="#f8fafc" font-family="sans-serif" font-size="12" font-weight="bold">SEO</text>
      </g>
    </g>

    <!-- Real-World Core Web Vitals Card -->
    <g transform="translate(0, 195)">
      <rect width="580" height="110" rx="10" fill="#0f172a" stroke="#1e293b" />
      <text x="20" y="26" fill="#94a3b8" font-family="sans-serif" font-size="12" font-weight="bold">Measured Production Telemetry:</text>
      
      <g transform="translate(20, 42)">
        <rect width="165" height="50" rx="6" fill="#1e293b" />
        <text x="12" y="20" fill="#94a3b8" font-family="monospace" font-size="10">Largest Contentful Paint</text>
        <text x="12" y="40" fill="#10b981" font-family="sans-serif" font-size="16" font-weight="bold">LCP 0.8s &bull; Fast</text>
      </g>

      <g transform="translate(205, 42)">
        <rect width="165" height="50" rx="6" fill="#1e293b" />
        <text x="12" y="20" fill="#94a3b8" font-family="monospace" font-size="10">Interaction to Next Paint</text>
        <text x="12" y="40" fill="#10b981" font-family="sans-serif" font-size="16" font-weight="bold">INP 42ms &bull; Good</text>
      </g>

      <g transform="translate(390, 42)">
        <rect width="170" height="50" rx="6" fill="#1e293b" />
        <text x="12" y="20" fill="#94a3b8" font-family="monospace" font-size="10">Cumulative Layout Shift</text>
        <text x="12" y="40" fill="#10b981" font-family="sans-serif" font-size="16" font-weight="bold">CLS 0.00 &bull; Stable</text>
      </g>
    </g>
  </g>
</svg>`
  },

  // 11. LEARNING PATH B - STAGE 01: DATA PREPARATION
  {
    path: 'public/images/paths/ml-1-data-prep.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 450" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="ml1-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#3b0764" />
    </linearGradient>
  </defs>
  <rect width="700" height="450" rx="16" fill="url(#ml1-bg)" />
  <rect x="30" y="30" width="640" height="390" rx="12" fill="#090d16" stroke="#334155" stroke-width="1.5" />
  
  <g transform="translate(60, 60)">
    <rect x="0" y="0" width="120" height="26" rx="13" fill="#581c87" stroke="#a855f7" />
    <text x="14" y="17" fill="#f3e8ff" font-family="monospace" font-size="11" font-weight="bold">STAGE 01</text>
    <text x="135" y="19" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="bold">Data Preparation &amp; Hygiene</text>

    <!-- Data Ingestion Pipeline -->
    <g transform="translate(0, 45)">
      <rect width="580" height="150" rx="10" fill="#1e1b4b" stroke="#6366f1" />
      
      <!-- Raw Data Source -->
      <g transform="translate(20, 20)">
        <rect width="140" height="110" rx="8" fill="#0f172a" stroke="#818cf8" />
        <text x="12" y="22" fill="#c7d2fe" font-family="sans-serif" font-size="11" font-weight="bold">Raw Telemetry</text>
        <text x="12" y="42" fill="#94a3b8" font-family="monospace" font-size="9">JSON, CSV, Kafka</text>
        <text x="12" y="60" fill="#ef4444" font-family="monospace" font-size="9">&bull; Null values</text>
        <text x="12" y="78" fill="#f59e0b" font-family="monospace" font-size="9">&bull; Outliers</text>
        <text x="12" y="96" fill="#94a3b8" font-family="monospace" font-size="9">10M rows/day</text>
      </g>

      <path d="M 170 75 L 200 75" stroke="#a855f7" stroke-width="2" />

      <!-- Cleaning Engine -->
      <g transform="translate(210, 20)">
        <rect width="160" height="110" rx="8" fill="#0f172a" stroke="#a855f7" />
        <text x="12" y="22" fill="#e9d5ff" font-family="sans-serif" font-size="11" font-weight="bold">Deduplication &amp; Impute</text>
        <text x="12" y="42" fill="#c084fc" font-family="monospace" font-size="9">Great Expectations</text>
        <text x="12" y="60" fill="#10b981" font-family="monospace" font-size="9">&bull; Schema Validation</text>
        <text x="12" y="78" fill="#10b981" font-family="monospace" font-size="9">&bull; Median Imputation</text>
        <text x="12" y="96" fill="#10b981" font-family="monospace" font-size="9">&bull; Z-score Clip</text>
      </g>

      <path d="M 380 75 L 410 75" stroke="#a855f7" stroke-width="2" />

      <!-- Parquet Storage -->
      <g transform="translate(420, 20)">
        <rect width="140" height="110" rx="8" fill="#0f172a" stroke="#10b981" />
        <text x="12" y="22" fill="#a7f3d0" font-family="sans-serif" font-size="11" font-weight="bold">Clean Data Lake</text>
        <text x="12" y="42" fill="#34d399" font-family="monospace" font-size="9">Apache Parquet</text>
        <text x="12" y="60" fill="#94a3b8" font-family="monospace" font-size="9">Snappy Compressed</text>
        <text x="12" y="78" fill="#6ee7b7" font-family="monospace" font-size="9">&bull; Zero schema drift</text>
        <text x="12" y="96" fill="#a7f3d0" font-family="monospace" font-size="9">Deterministic split</text>
      </g>
    </g>

    <!-- Code Block -->
    <g transform="translate(0, 215)">
      <rect width="580" height="90" rx="8" fill="#090d16" stroke="#1e293b" />
      <text x="15" y="25" fill="#c084fc" font-family="monospace" font-size="11"># PySpark / Polars Data Validation</text>
      <text x="15" y="45" fill="#f8fafc" font-family="monospace" font-size="11">df = pl.read_parquet("s3://devatlas-ml/raw/*.parquet").filter(pl.col("latency_ms") &gt; 0)</text>
      <text x="15" y="65" fill="#34d399" font-family="monospace" font-size="11">df_clean = df.with_columns(pl.col("feature").fill_null(strategy="forward"))</text>
    </g>
  </g>
</svg>`
  },

  // 12. LEARNING PATH B - STAGE 02: FEATURE ENGINEERING
  {
    path: 'public/images/paths/ml-2-features.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 450" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="ml2-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#4c1d95" />
    </linearGradient>
  </defs>
  <rect width="700" height="450" rx="16" fill="url(#ml2-bg)" />
  <rect x="30" y="30" width="640" height="390" rx="12" fill="#090d16" stroke="#334155" stroke-width="1.5" />
  
  <g transform="translate(60, 60)">
    <rect x="0" y="0" width="120" height="26" rx="13" fill="#4c1d95" stroke="#a78bfa" />
    <text x="14" y="17" fill="#ede9fe" font-family="monospace" font-size="11" font-weight="bold">STAGE 02</text>
    <text x="135" y="19" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="bold">Feature Engineering &amp; Vector Stores</text>

    <!-- Feature Transformation & Store Architecture -->
    <g transform="translate(0, 45)">
      <!-- Tabular Features -->
      <g transform="translate(0, 0)">
        <rect width="180" height="150" rx="8" fill="#1e1b4b" stroke="#7c3aed" />
        <text x="14" y="24" fill="#ddd6fe" font-family="sans-serif" font-size="11" font-weight="bold">Dense Features</text>
        <rect x="14" y="38" width="152" height="20" rx="4" fill="#2e1065" />
        <text x="20" y="52" fill="#c4b5fd" font-family="monospace" font-size="9">StandardScaler(z-score)</text>
        <rect x="14" y="64" width="152" height="20" rx="4" fill="#2e1065" />
        <text x="20" y="78" fill="#c4b5fd" font-family="monospace" font-size="9">One-Hot Encoding</text>
        <rect x="14" y="90" width="152" height="20" rx="4" fill="#2e1065" />
        <text x="20" y="104" fill="#c4b5fd" font-family="monospace" font-size="9">Lagged Rolling Windows</text>
        <text x="14" y="132" fill="#a78bfa" font-family="monospace" font-size="9">128 numerical cols</text>
      </g>

      <!-- Embeddings Extraction -->
      <g transform="translate(200, 0)">
        <rect width="180" height="150" rx="8" fill="#1e1b4b" stroke="#a855f7" />
        <text x="14" y="24" fill="#f3e8ff" font-family="sans-serif" font-size="11" font-weight="bold">Semantic Embeddings</text>
        <rect x="14" y="38" width="152" height="20" rx="4" fill="#3b0764" />
        <text x="20" y="52" fill="#e9d5ff" font-family="monospace" font-size="9">text-embedding-3-small</text>
        <rect x="14" y="64" width="152" height="20" rx="4" fill="#3b0764" />
        <text x="20" y="78" fill="#e9d5ff" font-family="monospace" font-size="9">dim = 1536 float32</text>
        <rect x="14" y="90" width="152" height="20" rx="4" fill="#3b0764" />
        <text x="20" y="104" fill="#e9d5ff" font-family="monospace" font-size="9">L2 Norm Normalized</text>
        <text x="14" y="132" fill="#d8b4fe" font-family="monospace" font-size="9">Cosine similarity ready</text>
      </g>

      <!-- Feast Feature Store -->
      <g transform="translate(400, 0)">
        <rect width="180" height="150" rx="8" fill="#1e1b4b" stroke="#10b981" />
        <text x="14" y="24" fill="#d1fae5" font-family="sans-serif" font-size="11" font-weight="bold">Feast Feature Store</text>
        <rect x="14" y="38" width="152" height="20" rx="4" fill="#064e3b" />
        <text x="20" y="52" fill="#6ee7b7" font-family="monospace" font-size="9">Online: Redis (p99 &lt; 2ms)</text>
        <rect x="14" y="64" width="152" height="20" rx="4" fill="#064e3b" />
        <text x="20" y="78" fill="#6ee7b7" font-family="monospace" font-size="9">Offline: Snowflake / S3</text>
        <rect x="14" y="90" width="152" height="20" rx="4" fill="#064e3b" />
        <text x="20" y="104" fill="#6ee7b7" font-family="monospace" font-size="9">Point-in-Time Correct</text>
        <text x="14" y="132" fill="#34d399" font-family="monospace" font-size="9">No data leakage</text>
      </g>
    </g>

    <!-- Point-in-time correctness banner -->
    <g transform="translate(0, 215)">
      <rect width="580" height="90" rx="8" fill="#090d16" stroke="#1e293b" />
      <text x="15" y="25" fill="#a78bfa" font-family="monospace" font-size="11">from feast import FeatureStore</text>
      <text x="15" y="48" fill="#f8fafc" font-family="monospace" font-size="11">store = FeatureStore(repo_path=".")</text>
      <text x="15" y="68" fill="#34d399" font-family="monospace" font-size="11">training_df = store.get_historical_features(entity_df=events, features=feature_refs).to_df()</text>
    </g>
  </g>
</svg>`
  },

  // 13. LEARNING PATH B - STAGE 03: MODEL TRAINING
  {
    path: 'public/images/paths/ml-3-training.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 450" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="ml3-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e1b4b" />
    </linearGradient>
  </defs>
  <rect width="700" height="450" rx="16" fill="url(#ml3-bg)" />
  <rect x="30" y="30" width="640" height="390" rx="12" fill="#090d16" stroke="#334155" stroke-width="1.5" />
  
  <g transform="translate(60, 60)">
    <rect x="0" y="0" width="120" height="26" rx="13" fill="#3730a3" stroke="#6366f1" />
    <text x="14" y="17" fill="#e0e7ff" font-family="monospace" font-size="11" font-weight="bold">STAGE 03</text>
    <text x="135" y="19" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="bold">Model Training &amp; Convergence</text>

    <!-- Training Curve Graph & Tensor Dimensions -->
    <g transform="translate(0, 45)">
      <!-- Loss Curve Canvas -->
      <g transform="translate(0, 0)">
        <rect width="320" height="155" rx="8" fill="#0f172a" stroke="#4338ca" />
        <text x="15" y="24" fill="#a5b4fc" font-family="sans-serif" font-size="11" font-weight="bold">Training vs Validation Loss</text>
        
        <!-- Axes -->
        <line x1="30" y1="35" x2="30" y2="125" stroke="#334155" stroke-width="1.5" />
        <line x1="30" y1="125" x2="300" y2="125" stroke="#334155" stroke-width="1.5" />
        
        <!-- Loss Curves -->
        <!-- Train Loss (Blue) -->
        <path d="M 35 45 Q 80 80 150 100 T 290 115" stroke="#38bdf8" stroke-width="2.5" fill="none" />
        <!-- Val Loss (Purple) -->
        <path d="M 35 50 Q 85 90 150 105 T 290 110" stroke="#c084fc" stroke-width="2" stroke-dasharray="4 2" fill="none" />

        <text x="170" y="70" fill="#38bdf8" font-family="monospace" font-size="9">&bull; Train Loss: 0.142</text>
        <text x="170" y="85" fill="#c084fc" font-family="monospace" font-size="9">&bull; Val Loss: 0.168</text>
        <text x="240" y="140" fill="#64748b" font-family="monospace" font-size="9">Epoch 20</text>
      </g>

      <!-- Hyperparameters & Optimizer -->
      <g transform="translate(340, 0)">
        <rect width="240" height="155" rx="8" fill="#0f172a" stroke="#6366f1" />
        <text x="15" y="24" fill="#c7d2fe" font-family="sans-serif" font-size="11" font-weight="bold">Optimizer &amp; Schedule</text>
        <rect x="15" y="36" width="210" height="22" rx="4" fill="#1e1b4b" />
        <text x="22" y="51" fill="#818cf8" font-family="monospace" font-size="9">AdamW (lr=2e-5, wd=0.01)</text>

        <rect x="15" y="64" width="210" height="22" rx="4" fill="#1e1b4b" />
        <text x="22" y="79" fill="#818cf8" font-family="monospace" font-size="9">CosineAnnealingWarmRestarts</text>

        <rect x="15" y="92" width="210" height="22" rx="4" fill="#1e1b4b" />
        <text x="22" y="107" fill="#818cf8" font-family="monospace" font-size="9">fp16 Mixed Precision (AMP)</text>

        <text x="15" y="138" fill="#10b981" font-family="monospace" font-size="10">&bull; EarlyStopping (patience=3)</text>
      </g>
    </g>

    <!-- PyTorch Training Loop snippet -->
    <g transform="translate(0, 220)">
      <rect width="580" height="85" rx="8" fill="#090d16" stroke="#1e293b" />
      <text x="15" y="24" fill="#60a5fa" font-family="monospace" font-size="11">scaler = torch.cuda.amp.GradScaler()</text>
      <text x="15" y="44" fill="#f8fafc" font-family="monospace" font-size="11">with torch.autocast(device_type="cuda", dtype=torch.float16):</text>
      <text x="15" y="64" fill="#34d399" font-family="monospace" font-size="11">    loss = criterion(outputs, labels); scaler.scale(loss).backward(); scaler.step(optimizer)</text>
    </g>
  </g>
</svg>`
  },

  // 14. LEARNING PATH B - STAGE 04: MODEL EVALUATION
  {
    path: 'public/images/paths/ml-4-evaluation.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 450" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="ml4-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#064e3b" />
    </linearGradient>
  </defs>
  <rect width="700" height="450" rx="16" fill="url(#ml4-bg)" />
  <rect x="30" y="30" width="640" height="390" rx="12" fill="#090d16" stroke="#334155" stroke-width="1.5" />
  
  <g transform="translate(60, 60)">
    <rect x="0" y="0" width="120" height="26" rx="13" fill="#065f46" stroke="#10b981" />
    <text x="14" y="17" fill="#a7f3d0" font-family="monospace" font-size="11" font-weight="bold">STAGE 04</text>
    <text x="135" y="19" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="bold">Model Evaluation &amp; RAG Triad Benchmarks</text>

    <!-- Evaluation Matrix & Curves -->
    <g transform="translate(0, 45)">
      <!-- ROC AUC Chart -->
      <g transform="translate(0, 0)">
        <rect width="280" height="155" rx="8" fill="#0f172a" stroke="#10b981" />
        <text x="15" y="24" fill="#a7f3d0" font-family="sans-serif" font-size="11" font-weight="bold">ROC Curve (AUC = 0.984)</text>
        <line x1="30" y1="35" x2="30" y2="125" stroke="#334155" stroke-width="1.5" />
        <line x1="30" y1="125" x2="260" y2="125" stroke="#334155" stroke-width="1.5" />
        <!-- Diagonal -->
        <line x1="30" y1="125" x2="260" y2="35" stroke="#475569" stroke-dasharray="3 3" />
        <!-- ROC curve -->
        <path d="M 30 125 Q 40 45 260 35" stroke="#10b981" stroke-width="2.5" fill="none" />
        <text x="130" y="95" fill="#34d399" font-family="monospace" font-size="10">True Positive Rate: 98%</text>
        <text x="130" y="112" fill="#94a3b8" font-family="monospace" font-size="10">False Positive: 1.2%</text>
      </g>

      <!-- RAG Triad Scorecard -->
      <g transform="translate(300, 0)">
        <rect width="280" height="155" rx="8" fill="#0f172a" stroke="#059669" />
        <text x="15" y="24" fill="#6ee7b7" font-family="sans-serif" font-size="11" font-weight="bold">RAG Triad Hallucination Audit</text>
        
        <rect x="15" y="36" width="250" height="26" rx="4" fill="#064e3b" />
        <text x="22" y="53" fill="#a7f3d0" font-family="monospace" font-size="10">Context Relevance: 0.94 / 1.0</text>

        <rect x="15" y="68" width="250" height="26" rx="4" fill="#064e3b" />
        <text x="22" y="85" fill="#a7f3d0" font-family="monospace" font-size="10">Groundedness (Faithful): 0.96</text>

        <rect x="15" y="100" width="250" height="26" rx="4" fill="#064e3b" />
        <text x="22" y="117" fill="#a7f3d0" font-family="monospace" font-size="10">Answer Relevance: 0.95 / 1.0</text>

        <text x="15" y="142" fill="#34d399" font-family="monospace" font-size="9">&bull; Zero ungrounded hallucinated facts</text>
      </g>
    </g>

    <!-- Metrics summary -->
    <g transform="translate(0, 220)">
      <rect width="580" height="85" rx="8" fill="#090d16" stroke="#1e293b" />
      <text x="15" y="25" fill="#38bdf8" font-family="monospace" font-size="11">Automated Evaluation Suite &bull; Ragas + TruLens</text>
      <text x="15" y="48" fill="#f8fafc" font-family="monospace" font-size="10">F1 Score: 0.942 &bull; Precision: 0.961 &bull; Recall: 0.924 &bull; Specificity: 0.988</text>
      <text x="15" y="68" fill="#10b981" font-family="monospace" font-size="10">Model validated and approved for production staging deployment</text>
    </g>
  </g>
</svg>`
  },

  // 15. LEARNING PATH B - STAGE 05: DEPLOYMENT
  {
    path: 'public/images/paths/ml-5-deployment.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 450" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="ml5-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <rect width="700" height="450" rx="16" fill="url(#ml5-bg)" />
  <rect x="30" y="30" width="640" height="390" rx="12" fill="#090d16" stroke="#334155" stroke-width="1.5" />
  
  <g transform="translate(60, 60)">
    <rect x="0" y="0" width="120" height="26" rx="13" fill="#1e3a8a" stroke="#3b82f6" />
    <text x="14" y="17" fill="#bfdbfe" font-family="monospace" font-size="11" font-weight="bold">STAGE 05</text>
    <text x="135" y="19" fill="#f8fafc" font-family="sans-serif" font-size="20" font-weight="bold">Model Serving &amp; Real-Time Inference</text>

    <!-- Production Architecture -->
    <g transform="translate(0, 45)">
      <!-- ONNX & Quantization -->
      <g transform="translate(0, 0)">
        <rect width="180" height="150" rx="8" fill="#0f172a" stroke="#38bdf8" />
        <text x="14" y="24" fill="#38bdf8" font-family="sans-serif" font-size="11" font-weight="bold">ONNX &amp; INT8</text>
        <rect x="14" y="38" width="152" height="22" rx="4" fill="#082f49" />
        <text x="20" y="53" fill="#7dd3fc" font-family="monospace" font-size="9">Post-Training Quant</text>
        <rect x="14" y="66" width="152" height="22" rx="4" fill="#082f49" />
        <text x="20" y="81" fill="#7dd3fc" font-family="monospace" font-size="9">TensorRT Graph Opt</text>
        <text x="14" y="112" fill="#38bdf8" font-family="monospace" font-size="10">Memory: 4x reduction</text>
        <text x="14" y="132" fill="#10b981" font-family="monospace" font-size="10">Throughput: 3.8x boost</text>
      </g>

      <!-- Triton Inference Server -->
      <g transform="translate(200, 0)">
        <rect width="180" height="150" rx="8" fill="#0f172a" stroke="#6366f1" />
        <text x="14" y="24" fill="#818cf8" font-family="sans-serif" font-size="11" font-weight="bold">Triton Inference</text>
        <rect x="14" y="38" width="152" height="22" rx="4" fill="#1e1b4b" />
        <text x="20" y="53" fill="#a5b4fc" font-family="monospace" font-size="9">Dynamic Batching</text>
        <rect x="14" y="66" width="152" height="22" rx="4" fill="#1e1b4b" />
        <text x="20" y="81" fill="#a5b4fc" font-family="monospace" font-size="9">gRPC Streaming API</text>
        <text x="14" y="112" fill="#818cf8" font-family="monospace" font-size="10">P99 Latency: 14.2ms</text>
        <text x="14" y="132" fill="#10b981" font-family="monospace" font-size="10">Concurrency: 800 req/s</text>
      </g>

      <!-- Autoscaling Cluster -->
      <g transform="translate(400, 0)">
        <rect width="180" height="150" rx="8" fill="#0f172a" stroke="#10b981" />
        <text x="14" y="24" fill="#34d399" font-family="sans-serif" font-size="11" font-weight="bold">Kubernetes HPA</text>
        <rect x="14" y="38" width="152" height="22" rx="4" fill="#064e3b" />
        <text x="20" y="53" fill="#6ee7b7" font-family="monospace" font-size="9">GPU Metrics Trigger</text>
        <rect x="14" y="66" width="152" height="22" rx="4" fill="#064e3b" />
        <text x="20" y="81" fill="#6ee7b7" font-family="monospace" font-size="9">Zero Downtime Pods</text>
        <text x="14" y="112" fill="#10b981" font-family="monospace" font-size="10">Availability: 99.99%</text>
        <text x="14" y="132" fill="#a7f3d0" font-family="monospace" font-size="10">Self-healing cluster</text>
      </g>
    </g>

    <!-- Real-time metrics banner -->
    <g transform="translate(0, 220)">
      <rect width="580" height="85" rx="8" fill="#090d16" stroke="#1e293b" />
      <text x="15" y="25" fill="#38bdf8" font-family="monospace" font-size="11">&gt; curl -X POST https://api.devatlas.engineering/v1/models/predictor:predict</text>
      <text x="15" y="48" fill="#f8fafc" font-family="monospace" font-size="10">HTTP/2 200 OK &bull; latency: 12ms &bull; token_throughput: 120 tok/sec</text>
      <text x="15" y="68" fill="#10b981" font-family="monospace" font-size="10">Production deployment complete &bull; Model active and serving live traffic</text>
    </g>
  </g>
</svg>`
  },

  // 16-20. AUTHORS AVATARS
  {
    path: 'public/images/authors/elena.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="50" fill="#1e3a8a" />
  <circle cx="50" cy="40" r="20" fill="#60a5fa" />
  <ellipse cx="50" cy="85" rx="32" ry="24" fill="#3b82f6" />
  <text x="50" y="46" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">ER</text>
</svg>`
  },
  {
    path: 'public/images/authors/marcus.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="50" fill="#4c1d95" />
  <circle cx="50" cy="40" r="20" fill="#a78bfa" />
  <ellipse cx="50" cy="85" rx="32" ry="24" fill="#8b5cf6" />
  <text x="50" y="46" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">MV</text>
</svg>`
  },
  {
    path: 'public/images/authors/sarah.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="50" fill="#064e3b" />
  <circle cx="50" cy="40" r="20" fill="#34d399" />
  <ellipse cx="50" cy="85" rx="32" ry="24" fill="#10b981" />
  <text x="50" y="46" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">SC</text>
</svg>`
  },
  {
    path: 'public/images/authors/alex.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="50" fill="#78350f" />
  <circle cx="50" cy="40" r="20" fill="#fbbf24" />
  <ellipse cx="50" cy="85" rx="32" ry="24" fill="#f59e0b" />
  <text x="50" y="46" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">AK</text>
</svg>`
  },
  {
    path: 'public/images/authors/priya.svg',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="50" fill="#831843" />
  <circle cx="50" cy="40" r="20" fill="#f472b6" />
  <ellipse cx="50" cy="85" rx="32" ry="24" fill="#ec4899" />
  <text x="50" y="46" fill="#ffffff" font-family="sans-serif" font-size="18" font-weight="bold" text-anchor="middle">PS</text>
</svg>`
  }
];

assets.forEach((asset) => {
  const fullPath = path.join(process.cwd(), asset.path);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, asset.svg.trim(), 'utf8');
  console.log('Created asset:', asset.path);
});
console.log('All 20 high-fidelity technical illustrations created successfully!');
