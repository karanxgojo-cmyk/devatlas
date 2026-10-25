const fs = require('fs');
const path = require('path');

const outDir1 = path.join(__dirname, '..', 'public', 'sketchbook', 'plates');
const outDir2 = path.join(__dirname, '..', 'public', 'landing-pages', 'meng-to-sketchbook', 'plates');
[outDir1, outDir2].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const plates = [
  {
    num: '01',
    title: 'Frontend Architecture Foundations',
    subtitle: 'Modern CSS Primitives, Container Queries & Subgrid',
    category: 'WEB DEVELOPMENT',
    catColor: '#174B35',
    accColor: '#F04B35',
    time: '15 mins',
    desc: 'Deconstruct modern browser layout calculations. Master container queries, subgrid, and relational :has() styling without triggering layout reflow or rendering thrash.',
    concepts: ['Container Queries', 'Subgrid', ':has() Selector', 'Layout Triggers'],
    diagTitle: 'Browser Layout Pipeline & Grid Subtree',
    diagCode: '@container (min-width: 480px) {\n  .card-grid {\n    display: grid;\n    grid-template-columns: subgrid;\n  }\n}'
  },
  {
    num: '02',
    title: 'Browser Rendering Engine & CRP',
    subtitle: 'Critical Rendering Path, DOM/CSSOM & Core Web Vitals',
    category: 'BROWSER INTERNALS',
    catColor: '#174B35',
    accColor: '#FF8A24',
    time: '18 mins',
    desc: 'Trace the entire browser critical rendering path: HTML parser tokenization, DOM tree generation, CSSOM hierarchy, layout tree reflow, paint rasterization, and GPU compositing.',
    concepts: ['Critical Rendering Path', 'LCP', 'INP', 'CLS', 'Compositor Threads'],
    diagTitle: 'DOM + CSSOM Compositing Architecture',
    diagCode: 'HTML Tokenizer -> DOM Tree   \\\n                              -> Render Tree -> Layout -> GPU Paint\nCSS Parser    -> CSSOM Tree  /'
  },
  {
    num: '03',
    title: 'Responsive Media & Zero-CLS Optimization',
    subtitle: 'AVIF, WebP & Content Layout Shift Prevention',
    category: 'MEDIA PERFORMANCE',
    catColor: '#174B35',
    accColor: '#F04B35',
    time: '14 mins',
    desc: 'Eliminate layout instability by negotiating next-gen image compression formats (AVIF/WebP) with responsive srcset negotiation and explicit aspect-ratio constraints.',
    concepts: ['AVIF Compression', 'Responsive Srcset', 'Aspect-Ratio', 'Zero CLS'],
    diagTitle: 'Next-Gen Image Format Negotiation Pipeline',
    diagCode: '<picture>\n  <source srcset="hero.avif" type="image/avif" />\n  <source srcset="hero.webp" type="image/webp" />\n  <img src="hero.jpg" width="1200" height="800" />\n</picture>'
  },
  {
    num: '04',
    title: 'Edge Caching & Stale-While-Revalidate',
    subtitle: 'Global CDN Delivery & Cache-Control Headers',
    category: 'DISTRIBUTED SYSTEMS',
    catColor: '#63284F',
    accColor: '#FF8190',
    time: '20 mins',
    desc: 'Architect global low-latency content distribution with immutable asset caching, stale-while-revalidate background cache replenishment, and edge tag purging.',
    concepts: ['SWR Protocol', 'Cache-Control', 'Edge PoPs', 'Tag Purging'],
    diagTitle: 'Global CDN Edge Cache Invalidation Model',
    diagCode: 'Cache-Control: public, max-age=3600,\n               stale-while-revalidate=86400\nClient -> Edge Cache (HIT) -> Instant 200 OK\nEdge   -> Origin (Background Revalidation)'
  },
  {
    num: '05',
    title: 'Empirical Auditing with Lighthouse',
    subtitle: 'Synthetic Benchmarks & Chrome Tracing Profiles',
    category: 'TELEMETRY & QA',
    catColor: '#63284F',
    accColor: '#F04B35',
    time: '16 mins',
    desc: 'Conduct rigorous performance profiling with simulated 4G mobile throttling, CPU slowdown emulation, flame chart analysis, and Chrome User Experience Report telemetry.',
    concepts: ['Lighthouse CI', 'Trace Event Profiling', 'Flame Charts', 'Field CrUX'],
    diagTitle: 'Chrome DevTools Performance Trace Architecture',
    diagCode: 'Main Thread: [ Parse HTML ] [ Recalc Style ] [ Layout ]\nRasterizer:  [ Rasterize Chunk #1 ] [ Rasterize Chunk #2 ]\nGPU Thread:  [ Swap Buffers (16.6ms / 60 FPS) ]'
  },
  {
    num: '06',
    title: 'Distributed Storage & Vector Indexing',
    subtitle: 'HNSW Graphs, Cosine Similarity & Embeddings',
    category: 'AI / ML INFRASTRUCTURE',
    catColor: '#4D1938',
    accColor: '#FF8A24',
    time: '22 mins',
    desc: 'Explore high-dimensional vector search indexing, Hierarchical Navigable Small World graphs, product quantization, and scalable semantic similarity retrieval engines.',
    concepts: ['HNSW Graphs', 'Cosine Distance', 'Product Quantization', 'ANN Indexing'],
    diagTitle: 'Hierarchical Navigable Small World (HNSW) Layers',
    diagCode: 'Layer 3: (Expressway)   O ---------> O\nLayer 2: (Highway)       O ----> O --> O\nLayer 1: (Main Road)     O -> O -> O -> O\nLayer 0: (Local Ground)  O-O-O-O-O-O-O-O'
  },
  {
    num: '07',
    title: 'Next.js 15 & React 19 Architecture',
    subtitle: 'RSC Streaming, Partial Prerendering & Server Actions',
    category: 'MODERN ARCHITECTURE',
    catColor: '#174B35',
    accColor: '#F04B35',
    time: '25 mins',
    desc: 'Master the architectural boundary between React Server Components and interactive client islands with concurrent streaming, partial prerendering, and server actions.',
    concepts: ['React Server Components', 'Turbopack', 'PPR Shell', 'Optimistic UI'],
    diagTitle: 'Partial Prerendering (PPR) Streaming Shell',
    diagCode: 'Static Shell (Edge CDN, 0ms TTFB):\n  [ Header ] [ Hero Banner ] [ Sidebar Nav ]\nDynamic Slots (Streamed via Suspense):\n  <Suspense fallback={<Skeleton />}>\n    <LiveFeed />\n  </Suspense>'
  },
  {
    num: '08',
    title: 'Compiler Optimization & AST Pipelines',
    subtitle: 'Lexical Analysis, Parser Trees & LLVM Intermediate Rep',
    category: 'COMPUTER SCIENCE',
    catColor: '#174B35',
    accColor: '#FF8A24',
    time: '24 mins',
    desc: 'Trace source code transformation through lexical scanning, recursive descent parser trees, dead code elimination, constant folding, and LLVM bitcode generation.',
    concepts: ['AST Generation', 'Tree Shaking', 'Constant Folding', 'LLVM IR'],
    diagTitle: 'Compiler Lowering & Code Optimization Pipeline',
    diagCode: 'Source -> Lexer -> Tokens -> Parser -> AST\n       -> Semantic Analysis -> Typed AST\n       -> IR Lowering -> LLVM Optimization -> Native ASM'
  },
  {
    num: '09',
    title: 'Production ML Pipelines & Model Ops',
    subtitle: 'Feature Stores, Distributed Training & Drift Detection',
    category: 'MACHINE LEARNING',
    catColor: '#4D1938',
    accColor: '#FF8190',
    time: '28 mins',
    desc: 'Build reproducible end-to-end machine learning workflows with automated feature engineering pipelines, MLflow metric logging, data drift monitoring, and Triton serving.',
    concepts: ['Feature Store', 'MLflow Tracking', 'Data Drift', 'Triton Server'],
    diagTitle: 'Continuous Training & Drift Evaluation Loop',
    diagCode: 'Telemetry Stream -> Feature Store -> Training Cluster\n                   -> Validation Gate (KS-Test < 0.05)\n                   -> Model Registry -> Blue/Green Deployment'
  }
];

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

plates.forEach((p, index) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1760 1240" width="1760" height="1240">
  <defs>
    <linearGradient id="gutter-fold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="47%" stop-color="rgba(43,39,33,0)" />
      <stop offset="49.5%" stop-color="rgba(43,39,33,0.18)" />
      <stop offset="50%" stop-color="rgba(43,39,33,0.32)" />
      <stop offset="50.5%" stop-color="rgba(43,39,33,0.18)" />
      <stop offset="53%" stop-color="rgba(43,39,33,0)" />
    </linearGradient>
  </defs>

  <!-- Left Folio (Verso) -->
  <rect x="40" y="30" width="830" height="1180" rx="16" fill="#FFF5E6" stroke="#D9CDBB" stroke-width="2" />
  <!-- Right Folio (Recto) -->
  <rect x="890" y="30" width="830" height="1180" rx="16" fill="#FFF5E6" stroke="#D9CDBB" stroke-width="2" />

  <!-- Center Gutter Fold Shadow -->
  <rect x="840" y="20" width="80" height="1200" fill="url(#gutter-fold)" />

  <!-- LEFT FOLIO CONTENT: Theory, Syllabus and Guidance -->
  <g transform="translate(110, 110)">
    <!-- Header Ribbon -->
    <rect x="0" y="0" width="220" height="34" rx="17" fill="${p.catColor}" />
    <text x="20" y="22" fill="#FFF5E6" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold" letter-spacing="0.15em">PLATE ${p.num} &#8226; CURRICULUM</text>
    
    <text x="240" y="22" fill="#9A6A3E" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold" letter-spacing="0.1em">${escapeXml(p.category)}</text>

    <!-- Title & Subtitle in Serif -->
    <text x="0" y="105" fill="#2B2721" font-family="'Instrument Serif', Georgia, serif" font-size="44" font-weight="bold">${escapeXml(p.title)}</text>
    <text x="0" y="148" fill="#597260" font-family="'Newsreader', Georgia, serif" font-size="22" font-style="italic">${escapeXml(p.subtitle)}</text>

    <!-- Duration Pill -->
    <g transform="translate(0, 185)">
      <rect x="0" y="0" width="130" height="28" rx="6" fill="#F8F1E6" stroke="#D9CDBB" />
      <text x="14" y="19" fill="#174B35" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold">Est. ${p.time}</text>
      <text x="150" y="19" fill="#2B2721" font-family="'Newsreader', serif" font-size="14">Verified Open Curriculum</text>
    </g>

    <!-- Synthesis Summary -->
    <text x="0" y="265" fill="#2B2721" font-family="'Newsreader', Georgia, serif" font-size="20" font-weight="400">
      <tspan x="0" dy="0">${escapeXml(p.desc.substring(0, 56))}</tspan>
      <tspan x="0" dy="32">${escapeXml(p.desc.substring(56, 120))}</tspan>
      <tspan x="0" dy="32">${escapeXml(p.desc.substring(120))}</tspan>
    </text>

    <!-- Key Concepts Archival Stamps -->
    <text x="0" y="410" fill="#9A6A3E" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold" letter-spacing="0.15em">CORE ARCHITECTURAL PILLARS:</text>
    <g transform="translate(0, 430)">
      ${p.concepts.map((c, i) => `
        <rect x="${(i % 2) * 340}" y="${Math.floor(i / 2) * 44}" width="320" height="36" rx="8" fill="#F8F1E6" stroke="#D9CDBB" />
        <circle cx="${(i % 2) * 340 + 18}" cy="${Math.floor(i / 2) * 44 + 18}" r="4" fill="${p.accColor}" />
        <text x="${(i % 2) * 340 + 34}" y="${Math.floor(i / 2) * 44 + 23}" fill="#2B2721" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="600">${escapeXml(c)}</text>
      `).join('')}
    </g>

    <!-- Bottom Manuscript Rule & Folio Number -->
    <line x1="0" y1="760" x2="680" y2="760" stroke="#D9CDBB" stroke-width="1.5" />
    <text x="0" y="800" fill="rgba(43,39,33,0.5)" font-family="'Newsreader', serif" font-size="14" font-style="italic">DevAtlas Engineering Sketchbook &#8226; Singapore Editorial Series</text>
    <text x="640" y="800" fill="#2B2721" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="bold">Folio ${p.num}v</text>
  </g>

  <!-- RIGHT FOLIO CONTENT: Architectural Blueprint Schematic & Loupe Inspection Target -->
  <g transform="translate(960, 110)">
    <!-- Folio Title & Figure Number -->
    <text x="0" y="22" fill="#9A6A3E" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold" letter-spacing="0.15em">FIGURE ${p.num}.A &#8226; SYSTEM SCHEMATIC</text>
    <text x="0" y="70" fill="#2B2721" font-family="'Instrument Serif', Georgia, serif" font-size="32" font-weight="bold">${escapeXml(p.diagTitle)}</text>

    <!-- Blueprint Canvas Inset -->
    <rect x="0" y="95" width="680" height="520" rx="14" fill="#4D1938" stroke="#803366" stroke-width="2" />
    
    <!-- Schematic Header in Inset -->
    <rect x="25" y="120" width="160" height="28" rx="6" fill="#63284F" />
    <text x="38" y="139" fill="#FFF5E6" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold">INSPECTION TARGET</text>

    <!-- Code & Architecture Text Inset (Crystal clear for Loupe at 2.3x) -->
    <g transform="translate(35, 180)">
      <rect width="610" height="280" rx="10" fill="#3B132B" stroke="#63284F" />
      <rect width="610" height="34" rx="10" fill="#63284F" />
      <circle cx="22" cy="17" r="4.5" fill="#F04B35" />
      <circle cx="38" cy="17" r="4.5" fill="#FF8A24" />
      <circle cx="54" cy="17" r="4.5" fill="#174B35" />
      <text x="80" y="22" fill="#FFF5E6" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600">pipeline.architecture.ts</text>
      
      <!-- Code lines -->
      ${p.diagCode.split('\n').map((line, idx) => `
        <text x="24" y="${70 + idx * 30}" fill="${idx === 0 ? '#FF8190' : idx === 1 ? '#FFF5E6' : '#FF8A24'}" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="500">${escapeXml(line)}</text>
      `).join('')}
    </g>

    <!-- Explanatory Caption -->
    <g transform="translate(0, 645)">
      <text x="0" y="20" fill="#2B2721" font-family="'Newsreader', serif" font-size="16" font-style="italic">
        Drag the brass loupe over the schematic above to examine micro-architectural data flow at 2.3x magnification.
      </text>
      <rect x="0" y="45" width="140" height="30" rx="6" fill="#174B35" />
      <text x="16" y="65" fill="#FFF5E6" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="bold">LOUPE COMPATIBLE</text>
    </g>

    <!-- Bottom Folio Number -->
    <line x1="0" y1="760" x2="680" y2="760" stroke="#D9CDBB" stroke-width="1.5" />
    <text x="0" y="800" fill="rgba(43,39,33,0.5)" font-family="'Newsreader', serif" font-size="14" font-style="italic">Plate ${p.num} of 09 &#8226; Atlas Technical Spread</text>
    <text x="635" y="800" fill="#2B2721" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="bold">Folio ${p.num}r</text>
  </g>
</svg>`;

  fs.writeFileSync(path.join(outDir1, `plate-${index + 1}.svg`), svg, 'utf8');
  fs.writeFileSync(path.join(outDir2, `plate-${index + 1}.svg`), svg, 'utf8');
});

console.log('Successfully generated 9 plates in both directories');
