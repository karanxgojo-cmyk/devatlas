'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles, BookOpen, Clock, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function EditorialTracksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax scroll on the large side number banner (Cloud Fairy inspiration)
      if (bannerRef.current && sectionRef.current) {
        gsap.to(bannerRef.current, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }

      // Staggered entrance for the editorial curriculum cards
      if (cardsRef.current) {
        gsap.fromTo(
          Array.from(cardsRef.current.children),
          { opacity: 0, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
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
  }, []);

  const tracks = [
    {
      title: 'Full-Stack Web Engineering',
      slug: 'web-development-roadmap',
      tagline: 'From your first HTML tag to sub-15ms edge Next.js 15 delivery.',
      totalMinutes: 110,
      tiers: [
        { label: 'Fundamentals', desc: 'How the Web Works, DNS & Client-Server HTTP' },
        { label: 'Beginner', desc: 'Semantic HTML5, Box Model & Modern Flexbox/Grid' },
        { label: 'Intermediate', desc: 'Modern ES6+, DOM Events & React Component Architecture' },
        { label: 'Advanced', desc: 'Next.js 15 Server Components, Actions & Web Security' },
        { label: 'Projects', desc: 'Zero-CLS Images, Edge Caching & Lenis Physics' },
      ],
      badge: '10 Structured Modules',
      href: '/paths/web-development-roadmap',
    },
    {
      title: 'Machine Learning & AI Engineering',
      slug: 'ai-ml-roadmap',
      tagline: 'From Python syntax & vectors to PyTorch transformers and model serving.',
      totalMinutes: 115,
      tiers: [
        { label: 'Fundamentals', desc: 'Python for AI, Vectors, Matrices & Probability' },
        { label: 'Beginner', desc: 'NumPy, Pandas & Automated Data Pipeline Hygiene' },
        { label: 'Intermediate', desc: 'Feature Engineering, Feast & HNSW Vector Search' },
        { label: 'Advanced', desc: 'Transformer Self-Attention & RAG Triad Benchmarks' },
        { label: 'Projects', desc: 'PyTorch AMP, ONNX Runtime & Real-Time Triton Serving' },
      ],
      badge: '10 Structured Modules',
      href: '/paths/ai-ml-roadmap',
    },
    {
      title: 'Core Computer Science Systems',
      slug: 'computer-science-roadmap',
      tagline: 'University-grade computing foundations aligned with OSSU curriculum.',
      totalMinutes: 120,
      tiers: [
        { label: 'Fundamentals', desc: 'Transistors, Binary Logic & Memory Hierarchy' },
        { label: 'Beginner', desc: 'Contiguous Arrays, Linked Lists & Hash Maps' },
        { label: 'Intermediate', desc: 'Network Transport (TCP/UDP/QUIC) & Storage Engines' },
        { label: 'Advanced', desc: 'OS Kernel Virtual Memory & Raft Consensus Protocols' },
        { label: 'Projects', desc: 'High-Throughput Kafka Event Platforms & Migrations' },
      ],
      badge: '10 Structured Modules',
      href: '/paths/computer-science-roadmap',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="editorial-forest cylindrical-section py-24 border-b border-[#4D1938] bg-[#63284F] relative transition-colors duration-500"
    >
      {/* Background radial atmosphere contained without clipping 3D */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF8190]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F04B35]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left: Distinctive Angled Number Banner */}
          <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
            <div
              ref={bannerRef}
              className="bg-[#F04B35] text-[#FFF5E6] p-6 rounded-3xl shadow-2xl flex flex-col items-center justify-between min-h-[380px] w-28 border border-[#FF8190]/40 select-none transform -rotate-1"
            >
              <span className="text-xs font-mono font-black uppercase tracking-widest text-[#FFF5E6]/90">
                TRACKS
              </span>
              <div className="text-4xl font-black font-mono tracking-tighter text-center leading-none text-[#FFF5E6]">
                03<br />02<br />01
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFF5E6]/80 rotate-180 writing-mode-vertical">
                DEVATLAS &bull; 2026
              </span>
            </div>
          </div>

          {/* Right: Section Header copy */}
          <div className="lg:col-span-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF5E6]/10 text-[#FFF5E6] border border-[#FF8190]/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#FF8190]" />
              <span>Progressive Sequential Learning</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-[#FFF5E6] tracking-tight leading-[1.12]">
              Structured Engineering Pathways. <br className="hidden sm:inline" />
              <span className="text-[#FF8190] italic">Zero to Production.</span>
            </h2>

            <p className="text-[#FFF5E6]/95 font-serif-body text-base sm:text-lg max-w-3xl leading-relaxed">
              Every curriculum is sequenced into five distinct learning phases: <strong className="text-[#FFF5E6]">Fundamentals &rarr; Beginner &rarr; Intermediate &rarr; Advanced &rarr; Practical Projects</strong>. Each lesson includes real code walkthroughs, common beginner pitfalls, and hands-on exercises.
            </p>
          </div>
        </div>

        {/* 3 Editorial Cards in Soft Cream with Deep Plum Titles */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tracks.map((track) => (
            <div
              key={track.slug}
              className="bg-[#FFF8EE] border border-[#DFD0BE] rounded-3xl p-7 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#F2B8C6]/50 text-[#49372F] border border-[#DFD0BE]">
                    {track.badge}
                  </span>
                  <span className="text-xs font-mono text-[#795548] font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#F04B35]" />
                    {track.totalMinutes} mins
                  </span>
                </div>

                <h3 className="text-2xl font-black font-serif text-[#63284F] mb-2 leading-tight">
                  {track.title}
                </h3>

                <p className="text-xs sm:text-sm font-serif-body text-[#49372F] leading-relaxed mb-6 font-medium">
                  {track.tagline}
                </p>

                {/* 5-Tier Sequential Progression List */}
                <div className="space-y-3 mb-8 pt-4 border-t border-[#DFD0BE]">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#63284F] font-bold block">
                    Curriculum Progression
                  </span>
                  {track.tiers.map((tier, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#49372F]">
                      <span className="font-mono font-bold text-[#F04B35] shrink-0 text-[11px] pt-0.5">
                        0{idx + 1}
                      </span>
                      <div>
                        <strong className="font-bold text-[#63284F]">{tier.label}:</strong>{' '}
                        <span className="text-[#49372F]/85 text-[11px] leading-tight block">
                          {tier.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#DFD0BE]">
                <Link
                  href={track.href}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-[#174B35] hover:bg-[#123d2b] text-[#FFFFFF] transition-all shadow-md group"
                >
                  <span>Start Complete Pathway</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#FF8A24]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
