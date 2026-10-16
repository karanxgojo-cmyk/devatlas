'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { SearchBar } from '@/components/search/search-bar';
import { Sparkles, Compass, Zap } from 'lucide-react';
import gsap from 'gsap';

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered entrance animation on first load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.75 },
          '-=0.3'
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.4'
        )
        .fromTo(
          searchRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.35'
        )
        .fromTo(
          actionsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, x: 40, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power2.out' },
          '-=0.8'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-blue-50/40 via-slate-50 to-white dark:from-slate-950 dark:via-[#090d16] dark:to-[#0b1120]"
    >
      {/* Subtle background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-80 h-80 bg-indigo-500/8 dark:bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Search */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline & Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/80 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>DevAtlas &bull; Learn. Build. Share.</span>
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
            >
              Understand technology.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Build better things.
              </span>
            </h1>

            {/* Subheading */}
            <p
              ref={subRef}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              A high-performance technical knowledge platform. Discover rigorous engineering guides, follow structured learning paths with synchronized architecture diagrams, and master production systems.
            </p>

            {/* Working Search Bar */}
            <div ref={searchRef} className="pt-2 max-w-xl mx-auto lg:mx-0">
              <SearchBar placeholder="Search 18+ guides (e.g. Next.js 15, Raft, Lenis, AVIF)..." />
              <div className="flex items-center justify-center lg:justify-start gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Quick explore:</span>
                <Link href="/explore?q=Lenis" className="hover:text-blue-600 underline">
                  Lenis Physics
                </Link>
                <span>&bull;</span>
                <Link href="/explore?q=RSC" className="hover:text-blue-600 underline">
                  React 19 RSC
                </Link>
                <span>&bull;</span>
                <Link href="/explore?q=AVIF" className="hover:text-blue-600 underline">
                  AVIF / Zero CLS
                </Link>
                <span>&bull;</span>
                <Link href="/explore?q=Kafka" className="hover:text-blue-600 underline">
                  Kafka Events
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div ref={actionsRef} className="pt-4 flex items-center justify-center lg:justify-start gap-4">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Content Library</span>
              </Link>
              <Link
                href="/paths/frontend-performance-essentials"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors shadow-xs"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Start Learning Path</span>
              </Link>
            </div>
          </div>

          {/* Right Column: High-Tech Hero Architecture Diagram */}
          <div ref={imageRef} className="lg:col-span-5 relative">
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-2 shadow-2xl overflow-hidden group">
              {/* Terminal top bar */}
              <div className="flex items-center gap-1.5 px-3 pt-2 pb-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[10px] font-mono text-slate-500">devatlas-engine.tsx</span>
              </div>
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden">
                <Image
                  src="/images/hero/hero-architecture.svg"
                  alt="DevAtlas high performance engine architecture diagram"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-contain group-hover:scale-[1.02] transition-transform duration-700"
                  priority
                />
              </div>
              <div className="p-3 bg-slate-900/90 rounded-b-xl border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Live Engine Pipeline
                </span>
                <span>Lenis + ScrollTrigger Synchronized</span>
              </div>
            </div>

            {/* Floating stat badges */}
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 shadow-lg hidden lg:flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-black">18</div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Engineering Guides</p>
                <p className="text-[10px] text-slate-500">4 disciplines</p>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 shadow-lg hidden lg:flex items-center gap-2.5">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-xs font-black">2</div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Learning Paths</p>
                <p className="text-[10px] text-slate-500">5 stages each</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
