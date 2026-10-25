'use client';

import { useState, useEffect, useRef } from 'react';
import { LearningPath } from '@/types/content';
import { InteractiveLearningJourney } from '@/components/paths/interactive-learning-journey';
import { Route } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface FeaturedJourneySectionProps {
  paths: LearningPath[];
}

export function FeaturedJourneySection({ paths }: FeaturedJourneySectionProps) {
  const [selectedPathSlug, setSelectedPathSlug] = useState<string>(
    paths[0]?.slug || 'frontend-performance-essentials'
  );
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const activePath = paths.find((p) => p.slug === selectedPathSlug) || paths[0];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cylindrical-section py-20 border-b border-[#4D1938] bg-[#63284F] text-[#FFF5E6] relative transition-colors duration-500"
    >
      {/* Background accents contained without breaking sticky positioning */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF8190]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F04B35]/20 to-transparent" />
        <div className="absolute -right-40 top-20 w-96 h-96 bg-[#FF8190]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D1938] border border-[#803366] text-[#FF8190] text-xs font-bold mb-3">
              <Route className="w-3.5 h-3.5 text-[#FF8A24]" />
              <span>Signature DevAtlas Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#FFF5E6] tracking-tight">
              Curated Engineering Roadmaps
            </h2>
            <p className="text-sm sm:text-base font-serif-body text-[#FFF5E6]/85 mt-2 leading-relaxed">
              Scroll through guided, end-to-end curriculums. Watch the 3D cylindrical stage gallery rotate and architecture diagrams synchronize in real-time as you progress through each connected stage.
            </p>
          </div>

          {/* Path Selector Tabs */}
          <div className="flex items-center gap-2 bg-[#4D1938] p-1.5 rounded-2xl self-start md:self-auto border border-[#803366] shadow-sm">
            {paths.slice(0, 2).map((path) => {
              const isSelected = path.slug === activePath.slug;
              const shortTitle = path.title.split(' ').slice(0, 2).join(' ');
              return (
                <button
                  key={path.slug}
                  onClick={() => setSelectedPathSlug(path.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-[#F04B35] text-[#FFFFFF] shadow-sm'
                      : 'text-[#FFF5E6]/75 hover:text-[#FFF5E6]'
                  }`}
                  aria-pressed={isSelected}
                >
                  {shortTitle}
                </button>
              );
            })}
          </div>
        </div>

        {/* The Signature Interactive Scrollytelling Component */}
        <div ref={contentRef}>
          <InteractiveLearningJourney path={activePath} />
        </div>
      </div>
    </section>
  );
}
