'use client';

/**
 * DevAtlas Engineering Sketchbook Atlas
 *
 * An interactive, tactile engineering knowledge atlas adapted from
 * the Sketchbook Landing Page by Meng To (ThreeUI / Design+Code)
 *
 * Attribution:
 * Based on Meng To's Sketchbook & ThreeUI Sketchbook Landing Page (MIT License)
 * Repository: https://github.com/MengTo/sketchbook
 *
 * Features:
 * - 18-strip nested curled-paper page-turn geometry with real light/shadow shaders
 * - Interactive brass magnifying loupe with live 2.3x magnification across technical schematics
 * - Tilt and pointer parallax physics
 * - Zoom controls (+ / - / 100% reset)
 * - Complete DevAtlas curriculum and architecture plate system
 * - Accessible keyboard navigation and reduced-motion support
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ZoomIn, ZoomOut, RotateCcw, Search, ExternalLink, Sparkles, BookOpen } from 'lucide-react';
import './sketchbook.css';

export interface EngineeringPlateData {
  num: string;
  title: string;
  subtitle: string;
  category: string;
  catColor: string;
  accColor: string;
  time: string;
  desc: string;
  concepts: string[];
  articleSlug: string;
  pathSlug: string;
  svgUrl: string;
}

export const DEVATLAS_PLATES: EngineeringPlateData[] = [
  {
    num: '01',
    title: 'Frontend Architecture Foundations',
    subtitle: 'Modern CSS Primitives, Container Queries & Subgrid',
    category: 'Web Development',
    catColor: '#174B35',
    accColor: '#F04B35',
    time: '15 mins',
    desc: 'Deconstruct modern browser layout calculations. Master container queries, subgrid, and relational :has() styling without layout thrashing.',
    concepts: ['Container Queries', 'Subgrid', ':has() Selector', 'Layout Triggers'],
    articleSlug: 'modern-css-container-queries-has',
    pathSlug: 'frontend-performance-essentials',
    svgUrl: '/sketchbook/plates/plate-1.svg',
  },
  {
    num: '02',
    title: 'Browser Rendering Engine & CRP',
    subtitle: 'Critical Rendering Path, DOM/CSSOM & Core Web Vitals',
    category: 'Browser Internals',
    catColor: '#174B35',
    accColor: '#FF8A24',
    time: '18 mins',
    desc: 'Trace the entire critical rendering path: HTML tokenization, DOM/CSSOM creation, layout reflow, paint rasterization, and GPU compositing.',
    concepts: ['Critical Rendering Path', 'LCP', 'INP', 'CLS', 'Compositor Threads'],
    articleSlug: 'browser-rendering-pipeline-core-web-vitals',
    pathSlug: 'frontend-performance-essentials',
    svgUrl: '/sketchbook/plates/plate-2.svg',
  },
  {
    num: '03',
    title: 'Responsive Media & Zero-CLS',
    subtitle: 'AVIF, WebP & Content Layout Shift Prevention',
    category: 'Media Performance',
    catColor: '#174B35',
    accColor: '#F04B35',
    time: '14 mins',
    desc: 'Eliminate layout instability by negotiating next-gen image compression formats (AVIF/WebP) with responsive srcset negotiation.',
    concepts: ['AVIF Compression', 'Responsive Srcset', 'Aspect-Ratio', 'Zero CLS'],
    articleSlug: 'responsive-images-avif-webp-nextjs',
    pathSlug: 'frontend-performance-essentials',
    svgUrl: '/sketchbook/plates/plate-3.svg',
  },
  {
    num: '04',
    title: 'Edge Caching & Stale-While-Revalidate',
    subtitle: 'Global CDN Delivery & Cache-Control Headers',
    category: 'Distributed Systems',
    catColor: '#63284F',
    accColor: '#FF8190',
    time: '20 mins',
    desc: 'Architect global low-latency content distribution with immutable asset caching and background stale-while-revalidate replenishment.',
    concepts: ['SWR Protocol', 'Cache-Control', 'Edge PoPs', 'Tag Purging'],
    articleSlug: 'edge-caching-stale-while-revalidate-cdn',
    pathSlug: 'frontend-performance-essentials',
    svgUrl: '/sketchbook/plates/plate-4.svg',
  },
  {
    num: '05',
    title: 'Empirical Auditing with Lighthouse',
    subtitle: 'Synthetic Benchmarks & Chrome Tracing Profiles',
    category: 'Telemetry & QA',
    catColor: '#63284F',
    accColor: '#F04B35',
    time: '16 mins',
    desc: 'Conduct rigorous performance profiling with simulated 4G mobile throttling, CPU slowdown emulation, and flame chart trace analysis.',
    concepts: ['Lighthouse CI', 'Trace Event Profiling', 'Flame Charts', 'Field CrUX'],
    articleSlug: 'measuring-web-performance-lighthouse-devtools',
    pathSlug: 'frontend-performance-essentials',
    svgUrl: '/sketchbook/plates/plate-5.svg',
  },
  {
    num: '06',
    title: 'Distributed Storage & Vector Indexing',
    subtitle: 'HNSW Graphs, Cosine Similarity & Embeddings',
    category: 'AI / ML Infrastructure',
    catColor: '#4D1938',
    accColor: '#FF8A24',
    time: '22 mins',
    desc: 'Explore high-dimensional vector search indexing, Hierarchical Navigable Small World graphs, and scalable semantic similarity retrieval.',
    concepts: ['HNSW Graphs', 'Cosine Distance', 'Product Quantization', 'ANN Indexing'],
    articleSlug: 'vector-databases-embeddings-hnsw',
    pathSlug: 'first-ml-pipeline',
    svgUrl: '/sketchbook/plates/plate-6.svg',
  },
  {
    num: '07',
    title: 'Next.js 15 & React 19 Architecture',
    subtitle: 'RSC Streaming, Partial Prerendering & Server Actions',
    category: 'Modern Architecture',
    catColor: '#174B35',
    accColor: '#F04B35',
    time: '25 mins',
    desc: 'Master the architectural boundary between React Server Components and interactive client islands with concurrent streaming.',
    concepts: ['React Server Components', 'Turbopack', 'PPR Shell', 'Optimistic UI'],
    articleSlug: 'nextjs-15-react-19-architecture',
    pathSlug: 'full-stack-web-architecture',
    svgUrl: '/sketchbook/plates/plate-7.svg',
  },
  {
    num: '08',
    title: 'Compiler Optimization & AST Pipelines',
    subtitle: 'Lexical Analysis, Parser Trees & LLVM Intermediate Rep',
    category: 'Computer Science',
    catColor: '#174B35',
    accColor: '#FF8A24',
    time: '24 mins',
    desc: 'Trace source code transformation through lexical scanning, recursive descent parser trees, dead code elimination, and LLVM bitcode.',
    concepts: ['AST Generation', 'Tree Shaking', 'Constant Folding', 'LLVM IR'],
    articleSlug: 'compiler-optimization-ast-lowering',
    pathSlug: 'computer-science-fundamentals',
    svgUrl: '/sketchbook/plates/plate-8.svg',
  },
  {
    num: '09',
    title: 'Production ML Pipelines & Model Ops',
    subtitle: 'Feature Stores, Distributed Training & Drift Detection',
    category: 'Machine Learning',
    catColor: '#4D1938',
    accColor: '#FF8190',
    time: '28 mins',
    desc: 'Build reproducible end-to-end machine learning workflows with automated feature engineering pipelines, MLflow logging, and Triton serving.',
    concepts: ['Feature Store', 'MLflow Tracking', 'Data Drift', 'Triton Server'],
    articleSlug: 'production-ml-pipelines-features-training',
    pathSlug: 'first-ml-pipeline',
    svgUrl: '/sketchbook/plates/plate-9.svg',
  },
];

export function SketchbookAtlas({
  plates = DEVATLAS_PLATES,
  onPlateSelect,
}: {
  plates?: EngineeringPlateData[];
  onPlateSelect?: (plate: EngineeringPlateData, index: number) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const [loupeActive, setLoupeActive] = useState(true);
  const [isLoupeDragging, setIsLoupeDragging] = useState(false);
  const [loupePos, setLoupePos] = useState({ x: 620, y: 380 });
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipProgress, setFlipProgress] = useState(0);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [flipFrom, setFlipFrom] = useState(0);
  const [flipTo, setFlipTo] = useState(1);

  const stageRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const sb3dRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ active: boolean; startX: number; width: number; dir: 'next' | 'prev' } | null>(null);
  const loupeDragRef = useRef<{ active: boolean; startX: number; startY: number; initX: number; initY: number } | null>(null);

  const currentPlate = plates[activeIndex] || plates[0];
  const totalPlates = plates.length;

  // Curled leaf 18 nested strips count
  const STRIP_COUNT = 18;
  const SPAN = 0.449;
  const BETA = 0.60;

  // Page turn commit
  const commitTurn = useCallback((dir: 'next' | 'prev', from: number, to: number) => {
    setIsFlipping(true);
    setFlipDirection(dir);
    setFlipFrom(from);
    setFlipTo(to);

    const startTime = performance.now();
    const duration = 650; // ms

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setFlipProgress(eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsFlipping(false);
        setFlipProgress(0);
        setActiveIndex(to);
        onPlateSelect?.(plates[to], to);
      }
    };

    requestAnimationFrame(animate);
  }, [onPlateSelect, plates]);

  // Turn to specific page
  const goToPlate = useCallback((targetIndex: number) => {
    if (isFlipping || targetIndex === activeIndex) return;
    const dir = targetIndex > activeIndex ? 'next' : 'prev';
    commitTurn(dir, activeIndex, targetIndex);
  }, [activeIndex, commitTurn, isFlipping]);

  const nextPlate = useCallback(() => {
    if (isFlipping) return;
    const target = (activeIndex + 1) % totalPlates;
    commitTurn('next', activeIndex, target);
  }, [activeIndex, commitTurn, isFlipping, totalPlates]);

  const prevPlate = useCallback(() => {
    if (isFlipping) return;
    const target = (activeIndex - 1 + totalPlates) % totalPlates;
    commitTurn('prev', activeIndex, target);
  }, [activeIndex, commitTurn, isFlipping, totalPlates]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextPlate();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPlate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPlate, prevPlate]);

  // Pointer tilt & parallax on desktop
  const handlePointerMove = (e: React.PointerEvent) => {
    if (isLoupeDragging || !sb3dRef.current || !bookRef.current) return;
    const rect = bookRef.current.getBoundingClientRect();
    if (!rect.width) return;

    const nx = Math.max(-1, Math.min(1, (e.clientX - (rect.left + rect.width / 2)) / (rect.width * 0.62)));
    const ny = Math.max(-1, Math.min(1, (e.clientY - (rect.top + rect.height / 2)) / (rect.height * 0.9)));

    const tiltX = -ny * 4.0;
    const tiltY = nx * 6.5;

    sb3dRef.current.style.setProperty('--rx', `${tiltX.toFixed(2)}deg`);
    sb3dRef.current.style.setProperty('--ry', `${tiltY.toFixed(2)}deg`);
  };

  // Loupe drag handlers
  const handleLoupePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLoupeDragging(true);
    loupeDragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      initX: loupePos.x,
      initY: loupePos.y,
    };
  };

  useEffect(() => {
    const handlePointerMoveGlobal = (e: PointerEvent) => {
      if (!loupeDragRef.current?.active || !bookRef.current) return;
      const dx = e.clientX - loupeDragRef.current.startX;
      const dy = e.clientY - loupeDragRef.current.startY;
      const rect = bookRef.current.getBoundingClientRect();

      const newX = Math.max(50, Math.min(rect.width - 50, loupeDragRef.current.initX + dx));
      const newY = Math.max(50, Math.min(rect.height - 50, loupeDragRef.current.initY + dy));

      setLoupePos({ x: newX, y: newY });
    };

    const handlePointerUpGlobal = () => {
      if (loupeDragRef.current?.active) {
        loupeDragRef.current.active = false;
        setIsLoupeDragging(false);
      }
    };

    window.addEventListener('pointermove', handlePointerMoveGlobal);
    window.addEventListener('pointerup', handlePointerUpGlobal);
    return () => {
      window.removeEventListener('pointermove', handlePointerMoveGlobal);
      window.removeEventListener('pointerup', handlePointerUpGlobal);
    };
  }, []);

  // Compute loupe dimensions & magnified position
  const loupeSize = 220;
  const MAGNIFY = 2.3;
  const zoomOffsetX = -(loupePos.x * MAGNIFY - loupeSize / 2);
  const zoomOffsetY = -(loupePos.y * MAGNIFY - loupeSize / 2);

  // Dynamic values for 18 strips curled page turn
  const t = flipProgress;
  const theta = Math.PI * t;
  const beta = BETA * Math.sin(Math.PI * t);
  const DEG = 180 / Math.PI;
  const ttDeg = (theta + beta) * DEG;
  const tdDeg = (2 * beta / STRIP_COUNT) * DEG;
  const shade = Math.sin(Math.PI * t).toFixed(3);

  return (
    <div
      className="sketchbook-container relative w-full overflow-hidden select-none"
      onPointerMove={handlePointerMove}
    >
      {/* Botanical Wash & Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: 'url(/sketchbook/bg-wash.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(236,231,220,0.2) 0%, rgba(236,231,220,0.65) 60%, #ECE7DC 95%)',
          }}
        />
      </div>

      <img
        src="/sketchbook/botany-left.png"
        alt=""
        aria-hidden="true"
        className="hidden lg:block absolute left-2 bottom-6 w-44 opacity-40 pointer-events-none z-10"
      />
      <img
        src="/sketchbook/botany-right.png"
        alt=""
        aria-hidden="true"
        className="hidden lg:block absolute right-2 bottom-4 w-40 opacity-40 pointer-events-none z-10"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 z-10 flex flex-col items-center">
        {/* Kicker Header */}
        <div className="text-center mb-6">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#9A6A3E] inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EE]/80 border border-[#D9CDBB]">
            <Sparkles className="w-3.5 h-3.5 text-[#F04B35]" />
            <span>DevAtlas Engineering Sketchbook &bull; Interactive Folio Spread</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2B2721] font-serif mt-2 tracking-tight">
            Curated Engineering Knowledge Atlas
          </h2>
          <p className="text-xs sm:text-sm text-[#597260] mt-1 max-w-xl mx-auto font-serif italic">
            Flip through handwritten engineering plates. Drag the brass loupe to inspect micro-architectural data flow and compiler instruction lowering.
          </p>
        </div>

        {/* Stage Wrapper */}
        <div ref={stageRef} className="sb-wrap relative w-full flex flex-col items-center">
          {/* Navigation Arrows */}
          <div className="sb-stage relative w-full flex items-center justify-center">
            <button
              onClick={prevPlate}
              className="sb-arrow left p-2 sm:p-3 text-[#2B2721]/60 hover:text-[#2B2721] transition-colors focus:outline-none"
              aria-label="Previous plate"
            >
              <svg viewBox="0 0 14 44" width="16" height="48" fill="none" aria-hidden="true">
                <polyline points="12,4 4,22 12,40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* 3D Perspective Box */}
            <div
              ref={sb3dRef}
              className="sb-3d relative w-full max-w-[940px] px-1 sm:px-4"
              style={{
                perspective: '1750px',
                perspectiveOrigin: '50% 46%',
                // Pass CSS variables for strip rotation and lighting
                ['--bw' as any]: '900px',
                ['--tt' as any]: `${ttDeg.toFixed(2)}deg`,
                ['--td' as any]: `${tdDeg.toFixed(3)}deg`,
                ['--shade' as any]: shade,
                ['--zoom' as any]: zoomScale,
              }}
            >
              {/* Leaning Tilt Container */}
              <div
                className="sb-tilt relative transform-gpu transition-transform duration-300 ease-out"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(${zoomScale})`,
                }}
              >
                {/* Soft Contact Shadows Underneath Book */}
                <div className="sb-cast ambient" aria-hidden="true" />
                <div className="sb-cast contact" aria-hidden="true" />
                <div className="sb-cast hair" aria-hidden="true" />

                {/* THE BOOK SPREAD (Aspect 1760/1240) */}
                <div
                  ref={bookRef}
                  className="sb-book relative w-full rounded-2xl shadow-2xl overflow-hidden cursor-pointer"
                  style={{
                    aspectRatio: '1760 / 1240',
                    transformStyle: 'preserve-3d',
                    backgroundColor: '#FFF5E6',
                  }}
                >
                  {/* Static Book Spread (When Not Mid-Flip) */}
                  {!isFlipping && (
                    <div className="sb-full absolute inset-0">
                      <img
                        src={currentPlate.svgUrl}
                        alt={currentPlate.title}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                    </div>
                  )}

                  {/* Mid-Turn Leaf with 18-Strip Curled Paper Geometry */}
                  {isFlipping && (
                    <>
                      {/* Left and Right Stationary Halves */}
                      <div className="sb-half left absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden">
                        <img
                          src={flipDirection === 'next' ? plates[flipFrom].svgUrl : plates[flipTo].svgUrl}
                          alt=""
                          className="w-[200%] max-w-none h-full object-contain"
                        />
                        <div
                          className="gutter-shade left"
                          style={{ opacity: Number(shade) * 0.6 }}
                        />
                      </div>

                      <div className="sb-half right absolute top-0 bottom-0 left-1/2 w-1/2 overflow-hidden">
                        <img
                          src={flipDirection === 'next' ? plates[flipTo].svgUrl : plates[flipFrom].svgUrl}
                          alt=""
                          className="w-[200%] max-w-none h-full object-contain -ml-[100%]"
                        />
                        <div
                          className="gutter-shade right"
                          style={{ opacity: Number(shade) * 0.6 }}
                        />
                      </div>

                      {/* 18-Strip Bending Leaf */}
                      <div
                        className={`curl ${flipDirection}`}
                        style={{
                          transformOrigin: flipDirection === 'next' ? 'left center' : 'right center',
                          transform: flipDirection === 'next' ? `rotateY(-${ttDeg}deg)` : `rotateY(${ttDeg}deg)`,
                        }}
                      >
                        {Array.from({ length: STRIP_COUNT }).map((_, i) => (
                          <div
                            key={i}
                            className={`strip ${i === STRIP_COUNT - 1 ? 'edge' : ''}`}
                            style={{
                              transform: i > 0 ? (flipDirection === 'next' ? `rotateY(${tdDeg}deg)` : `rotateY(-${tdDeg}deg)`) : undefined,
                            }}
                          >
                            <div
                              className="face front"
                              style={{
                                backgroundImage: `url(${flipDirection === 'next' ? plates[flipFrom].svgUrl : plates[flipTo].svgUrl})`,
                              }}
                            >
                              <div className="sh" style={{ opacity: shade }} />
                              <div className="gl" style={{ opacity: Number(shade) * 0.25 }} />
                            </div>
                            <div
                              className="face back"
                              style={{
                                backgroundImage: `url(${flipDirection === 'next' ? plates[flipTo].svgUrl : plates[flipFrom].svgUrl})`,
                              }}
                            >
                              <div className="sh" style={{ opacity: shade }} />
                              <div className="gl" style={{ opacity: Number(shade) * 0.25 }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Tap-to-Turn Hit Zones */}
                  <button
                    onClick={prevPlate}
                    className="sb-zone sb-prev absolute top-0 bottom-0 left-0 w-1/2 z-30 opacity-0 cursor-pointer"
                    aria-label="Previous plate"
                  />
                  <button
                    onClick={nextPlate}
                    className="sb-zone sb-next absolute top-0 bottom-0 right-0 w-1/2 z-30 opacity-0 cursor-pointer"
                    aria-label="Next plate"
                  />
                </div>
              </div>

              {/* BRASS MAGNIFYING LOUPE (Desktop Interactive Inspection) */}
              {loupeActive && (
                <div
                  className={`loupe hidden md:block ${isLoupeDragging ? 'held' : ''} on`}
                  style={{
                    left: `${loupePos.x - loupeSize / 2}px`,
                    top: `${loupePos.y - loupeSize / 2}px`,
                    width: `${loupeSize}px`,
                    height: `${loupeSize}px`,
                  }}
                  onPointerDown={handleLoupePointerDown}
                  role="region"
                  aria-label="Interactive brass magnifier"
                >
                  {/* Brass Ring Bezel */}
                  <div className="ring absolute inset-0 rounded-full cursor-grab">
                    {/* Brass Handle */}
                    <div className="grip" />

                    {/* Magnified Lens Glass Viewport */}
                    <div className="lens relative w-full h-full rounded-full overflow-hidden shadow-inner">
                      {/* Scaled Mirrored Copy of the Underneath Plate */}
                      <div
                        className="zoominner absolute top-0 left-0 w-[900px] pointer-events-none"
                        style={{
                          transform: `translate(${zoomOffsetX}px, ${zoomOffsetY}px) scale(${MAGNIFY})`,
                          transformOrigin: '0 0',
                        }}
                      >
                        <img
                          src={currentPlate.svgUrl}
                          alt=""
                          className="w-full h-auto display-block"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={nextPlate}
              className="sb-arrow right p-2 sm:p-3 text-[#2B2721]/60 hover:text-[#2B2721] transition-colors focus:outline-none"
              aria-label="Next plate"
            >
              <svg viewBox="0 0 14 44" width="16" height="48" fill="none" aria-hidden="true">
                <polyline points="2,4 10,22 2,40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Plate Caption Bar */}
          <div className="sb-captions mt-4 text-center">
            <p className="sb-caption text-xs font-mono font-bold tracking-[0.24em] uppercase text-[#2B2721]/70">
              Plate {currentPlate.num} &bull; {currentPlate.title} ({currentPlate.category})
            </p>
            <p className="text-[11px] font-mono text-[#9A6A3E] mt-0.5">
              Drag brass loupe across diagram &bull; Click edges or use &larr; / &rarr; keys to turn
            </p>
          </div>

          {/* Interactive Tools Ribbon: Loupe Toggle, Zoom In, Zoom Out, Reset */}
          <div className="sb-tools mt-4 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D9CDBB] bg-[#FFF5E6]/90 backdrop-blur-md shadow-xs">
            <button
              onClick={() => setLoupeActive(!loupeActive)}
              className={`tool p-1.5 rounded-full text-xs font-mono transition-colors ${
                loupeActive ? 'bg-[#9A6A3E]/20 text-[#9A6A3E]' : 'text-[#2B2721]/60 hover:text-[#2B2721]'
              }`}
              title="Toggle Brass Magnifier"
              aria-label="Toggle Brass Magnifier"
              aria-pressed={loupeActive}
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            <div className="tool-sep w-px h-4 bg-[#D9CDBB]" />

            <button
              onClick={() => setZoomScale((z) => Math.max(0.9, Number((z - 0.1).toFixed(2))))}
              className="tool p-1.5 text-[#2B2721]/70 hover:text-[#2B2721] transition-colors"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <span className="zoom-read text-[11px] font-mono font-bold text-[#2B2721]/70 min-w-[36px] text-center">
              {Math.round(zoomScale * 100)}%
            </span>

            <button
              onClick={() => setZoomScale((z) => Math.min(1.4, Number((z + 0.1).toFixed(2))))}
              className="tool p-1.5 text-[#2B2721]/70 hover:text-[#2B2721] transition-colors"
              title="Zoom In"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <div className="tool-sep w-px h-4 bg-[#D9CDBB]" />

            <button
              onClick={() => setZoomScale(1)}
              className="tool p-1.5 text-[#2B2721]/70 hover:text-[#2B2721] transition-colors"
              title="Reset Zoom (100%)"
              aria-label="Reset zoom to 100%"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Quick Direct Actions for the Active Plate */}
          <div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href={`/articles/${currentPlate.articleSlug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#F04B35] hover:bg-[#d63a25] text-white shadow-xs transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Full Architectural Guide</span>
            </Link>
            <Link
              href={`/paths/${currentPlate.pathSlug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#174B35] hover:bg-[#123b2a] text-[#FFF5E6] shadow-xs transition-colors"
            >
              <span>Explore Curriculum Syllabus</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* EDITORIAL INDEX: Curriculum Plates Navigation */}
        <div className="w-full max-w-4xl mt-14 pt-8 border-t border-[#D9CDBB]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold text-[#9A6A3E]">
              Atlas Editorial Index &bull; Select Plate
            </span>
            <span className="text-xs font-mono text-[#597260]">
              {totalPlates} Engineering Spreads
            </span>
          </div>

          <ul className="plate-list border-t border-[#D9CDBB] divide-y divide-[#D9CDBB]/70">
            {plates.map((plate, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <li key={plate.num}>
                  <button
                    onClick={() => goToPlate(idx)}
                    className={`plate w-full grid grid-cols-12 gap-3 items-baseline py-3 px-2 text-left transition-all ${
                      isSelected
                        ? 'bg-[#FAF6EE] pl-4 border-l-2 border-[#F04B35]'
                        : 'hover:bg-[#FAF6EE]/50 hover:pl-3'
                    }`}
                    aria-current={isSelected ? 'true' : undefined}
                    aria-label={`Jump to Plate ${plate.num}: ${plate.title}`}
                  >
                    <span className="col-span-1 text-xs font-mono font-bold text-[#9A6A3E]">
                      {plate.num}
                    </span>
                    <span className="col-span-7 font-serif text-base sm:text-lg font-bold text-[#2B2721]">
                      {plate.title}
                    </span>
                    <span className="col-span-4 text-right text-[11px] font-mono uppercase tracking-wider text-[#597260]">
                      {plate.category}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
