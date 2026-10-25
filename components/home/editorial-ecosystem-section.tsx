'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, BookOpen, GraduationCap, Users, ShieldCheck, Sparkles } from 'lucide-react';
import { OSSU_COURSES, MDN_REFERENCES, DEV_FALLBACK_ARTICLES, ExternalResource } from '@/lib/services/educational-resources';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function EditorialEcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<'all' | 'ossu' | 'mdn' | 'dev'>('all');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax scroll on banner
      if (bannerRef.current && sectionRef.current) {
        gsap.to(bannerRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // Staggered card entrance
      if (cardsRef.current) {
        gsap.fromTo(
          Array.from(cardsRef.current.children),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  const allResources: ExternalResource[] = [
    ...OSSU_COURSES.slice(0, 2),
    ...MDN_REFERENCES.slice(0, 2),
    ...DEV_FALLBACK_ARTICLES.slice(0, 2),
  ];

  const displayedResources =
    activeTab === 'ossu'
      ? OSSU_COURSES
      : activeTab === 'mdn'
      ? MDN_REFERENCES
      : activeTab === 'dev'
      ? DEV_FALLBACK_ARTICLES
      : allResources;

  return (
    <section
      ref={sectionRef}
      className="editorial-plum cylindrical-section py-24 border-b border-[#3b122a] bg-[#4D1938] relative transition-colors duration-500"
    >
      {/* Background radial ambiance contained without clipping 3D */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FF8190]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#63284F]/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Left: Distinctive Angled Number Banner */}
          <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
            <div
              ref={bannerRef}
              className="bg-[#F04B35] text-[#FFF5E6] p-6 rounded-3xl shadow-2xl flex flex-col items-center justify-between min-h-[360px] w-28 border border-[#FF8190]/30 select-none transform rotate-1"
            >
              <span className="text-xs font-mono font-black uppercase tracking-widest text-[#FFF5E6]/90">
                ECOSYSTEM
              </span>
              <div className="text-4xl font-black font-mono tracking-tighter text-center leading-none text-[#FFF5E6]">
                OPEN<br />EDU<br />2026
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFF5E6]/80 rotate-180 writing-mode-vertical">
                MDN &bull; OSSU &bull; DEV
              </span>
            </div>
          </div>

          {/* Right: Section Header copy & Filter Tabs */}
          <div className="lg:col-span-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF5E6]/10 text-[#FFF5E6] border border-[#FF8190]/30 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF8190]" />
              <span>Verified Open Knowledge Integration</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-[#FFF5E6] tracking-tight leading-[1.12]">
                  Open Educational Ecosystem. <br className="hidden sm:inline" />
                  <span className="text-[#FF8190] italic">Curated &amp; Connected.</span>
                </h2>
                <p className="text-[#FFF5E6]/95 font-serif-body text-base max-w-2xl mt-2 leading-relaxed">
                  DevAtlas integrates university syllabuses from OSSU, official browser specifications from MDN Web Docs, and real-world developer discussions from DEV Community APIs.
                </p>
              </div>

              {/* Resource Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-[#FFF5E6]/15 p-1.5 rounded-2xl border border-[#FF8190]/30 shrink-0 self-start md:self-auto">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'all'
                      ? 'bg-[#F04B35] text-[#FFFFFF] shadow-sm'
                      : 'bg-[#FFF5E6] text-[#4D1938] hover:bg-[#FFF5E6]/90'
                  }`}
                >
                  All Sources
                </button>
                <button
                  onClick={() => setActiveTab('ossu')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'ossu'
                      ? 'bg-[#F04B35] text-[#FFFFFF] shadow-sm'
                      : 'bg-[#FFF5E6] text-[#4D1938] hover:bg-[#FFF5E6]/90'
                  }`}
                >
                  OSSU Degree
                </button>
                <button
                  onClick={() => setActiveTab('mdn')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'mdn'
                      ? 'bg-[#F04B35] text-[#FFFFFF] shadow-sm'
                      : 'bg-[#FFF5E6] text-[#4D1938] hover:bg-[#FFF5E6]/90'
                  }`}
                >
                  MDN Docs
                </button>
                <button
                  onClick={() => setActiveTab('dev')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'dev'
                      ? 'bg-[#F04B35] text-[#FFFFFF] shadow-sm'
                      : 'bg-[#FFF5E6] text-[#4D1938] hover:bg-[#FFF5E6]/90'
                  }`}
                >
                  DEV Community
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Grid in Soft Cream #FFF8EE Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedResources.map((res) => (
            <div
              key={res.id}
              className="bg-[#FFF8EE] border border-[#DFD0BE] rounded-2xl p-6 flex flex-col justify-between shadow-lg text-[#49372F]"
            >
              <div>
                {/* Source Badge & Level */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border bg-[#9DD8EB]/30 text-[#49372F] border-[#DFD0BE]">
                    {res.source} &bull; {res.level}
                  </span>
                  {res.starsOrReactions && (
                    <span className="text-[10px] font-mono text-[#795548] font-semibold">
                      ★ {res.starsOrReactions} reactions
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold font-serif text-[#63284F] mb-2 leading-snug">
                  {res.title}
                </h3>

                <p className="text-xs sm:text-sm font-serif-body text-[#49372F] leading-relaxed mb-4">
                  {res.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {res.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#9DD8EB]/20 text-[#49372F] border border-[#DFD0BE] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Attribution and External Link */}
              <div className="pt-3 border-t border-[#DFD0BE] flex items-center justify-between gap-2 text-xs">
                <span className="text-[10px] text-[#795548] truncate max-w-[190px]">
                  {res.attribution}
                </span>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-[#174B35] hover:text-[#F04B35] transition-colors shrink-0"
                >
                  <span>Explore</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
