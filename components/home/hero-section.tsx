'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { SearchBar } from '@/components/search/search-bar';
import { SafeImage } from '@/components/ui/safe-image';
import { Sparkles, Compass, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

    gsap.registerPlugin(ScrollTrigger);

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

      // Scroll-linked parallax exit
      const heroEl = heroRef.current;
      if (heroEl) {
        // Left column text fades and scales down as user scrolls away
        const leftCol = heroEl.querySelector('.lg\\:col-span-7');
        if (leftCol) {
          gsap.to(leftCol, {
            y: -60,
            opacity: 0.3,
            scale: 0.97,
            ease: 'none',
            scrollTrigger: {
              trigger: heroEl,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5,
            },
          });
        }

        // Right column image parallax
        const rightCol = heroEl.querySelector('.lg\\:col-span-5');
        if (rightCol) {
          gsap.to(rightCol, {
            y: -80,
            ease: 'none',
            scrollTrigger: {
              trigger: heroEl,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5,
            },
          });
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="cylindrical-section relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#416C53] bg-[#174B35] text-[#FFF5E6]"
    >
      {/* Background decorations contained without clipping 3D transform */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,245,230,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,245,230,0.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Decorative accents */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#FF8A24]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-0 w-80 h-80 bg-[#D8E9DA]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Search */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline & Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF5E6]/10 text-[#FFF5E6] border border-[#D8E9DA]/30 text-xs font-semibold tracking-wide shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF8A24]" aria-hidden="true" />
              <span>DevAtlas &bull; Learn. Build. Share.</span>
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-[#FFF5E6] leading-[1.12]"
            >
              Understand technology.{' '}
              <span className="text-[#FF8A24] italic">
                Build better things.
              </span>
            </h1>

            {/* Subheading */}
            <p
              ref={subRef}
              className="text-base sm:text-lg font-serif-body text-[#D8E9DA] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal"
            >
              A high-performance technical knowledge platform. Discover rigorous engineering guides, follow structured learning paths with synchronized architecture diagrams, and master production systems.
            </p>

            {/* Working Search Bar */}
            <div ref={searchRef} className="pt-2 max-w-xl mx-auto lg:mx-0">
              <SearchBar placeholder="Search 18+ guides (e.g. Next.js 15, Raft, Lenis, AVIF)..." />
              <div className="flex items-center justify-center lg:justify-start gap-2 mt-3 text-xs text-[#D8E9DA] flex-wrap">
                <span className="font-semibold text-[#FFF5E6]">Quick explore:</span>
                <Link href="/explore?q=Lenis" className="hover:text-[#FF8A24] underline transition-colors">
                  Lenis Physics
                </Link>
                <span>&bull;</span>
                <Link href="/explore?q=RSC" className="hover:text-[#FF8A24] underline transition-colors">
                  React 19 RSC
                </Link>
                <span>&bull;</span>
                <Link href="/explore?q=AVIF" className="hover:text-[#FF8A24] underline transition-colors">
                  AVIF / Zero CLS
                </Link>
                <span>&bull;</span>
                <Link href="/explore?q=Kafka" className="hover:text-[#FF8A24] underline transition-colors">
                  Kafka Events
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div ref={actionsRef} className="pt-4 flex items-center justify-center lg:justify-start gap-4">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-[#F04B35] hover:bg-[#d93d28] text-[#FFFFFF] shadow-md hover:shadow-lg transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Content Library</span>
              </Link>
              <Link
                href="/paths/frontend-performance-essentials"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-[#FFF5E6] hover:bg-[#f5e6d0] text-[#174B35] border border-[#D9CDBB] transition-colors shadow-xs"
              >
                <Zap className="w-4 h-4 text-[#FF8A24]" />
                <span>Start Learning Path</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Architecture Diagram with Morphing Container */}
          <div ref={imageRef} className="lg:col-span-5 relative">
            <div className="card-morph relative rounded-2xl border border-[#D9CDBB] bg-[#FFF5E6] p-2.5 shadow-2xl overflow-hidden group">
              {/* Terminal top bar */}
              <div className="flex items-center gap-1.5 px-3 pt-2 pb-2 border-b border-[#D9CDBB]/60">
                <span className="w-3 h-3 rounded-full bg-[#F04B35]" />
                <span className="w-3 h-3 rounded-full bg-[#FF8A24]" />
                <span className="w-3 h-3 rounded-full bg-[#174B35]" />
                <span className="ml-2 text-[10px] font-mono text-[#332A26]">devatlas-engine.tsx</span>
              </div>
              <div className="image-morph-container relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#F8F1E6] border border-[#D9CDBB]">
                <SafeImage
                  src="/images/hero/hero-architecture.svg"
                  alt="DevAtlas high performance engine architecture diagram"
                  fallbackCategory="web-dev"
                  fallbackTitle="DevAtlas Core Engine"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="image-morph-target object-contain"
                  priority
                />
              </div>
              <div className="p-3 bg-[#FFF5E6] rounded-b-xl border-t border-[#D9CDBB]/60 flex items-center justify-between text-[11px] text-[#332A26] font-mono">
                <span className="flex items-center gap-1.5 text-[#174B35] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#174B35] animate-ping inline-block" />
                  Live Engine Pipeline
                </span>
                <span className="text-[#F04B35] font-semibold">Lenis + ScrollTrigger Synchronized</span>
              </div>
            </div>

            {/* Floating stat badges */}
            <div className="absolute -bottom-4 -left-4 bg-[#FFF5E6] border border-[#D9CDBB] rounded-xl px-4 py-2.5 shadow-lg hidden lg:flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#174B35] rounded-lg flex items-center justify-center text-[#FFF5E6] text-xs font-black">18</div>
              <div>
                <p className="text-xs font-bold text-[#174B35]">Engineering Guides</p>
                <p className="text-[10px] text-[#597260]">4 disciplines</p>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-[#FFF5E6] border border-[#D9CDBB] rounded-xl px-4 py-2.5 shadow-lg hidden lg:flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#F04B35] rounded-lg flex items-center justify-center text-[#FFFFFF] text-xs font-black">6</div>
              <div>
                <p className="text-xs font-bold text-[#174B35]">Learning Paths</p>
                <p className="text-[10px] text-[#597260]">roadmap.sh verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
