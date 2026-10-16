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
      className="py-20 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#070b12] relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="absolute -right-40 top-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
              <Route className="w-3.5 h-3.5" />
              <span>Signature DevAtlas Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Curated Engineering Roadmaps
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Scroll through guided, end-to-end curriculums. Watch the architecture diagram evolve as you progress through each connected stage.
            </p>
          </div>

          {/* Path Selector Tabs */}
          <div className="flex items-center gap-2 bg-slate-200/80 dark:bg-slate-800/80 p-1 rounded-xl self-start md:self-auto border border-slate-300 dark:border-slate-700">
            {paths.slice(0, 2).map((path) => {
              const isSelected = path.slug === activePath.slug;
              const shortTitle = path.title.split(' ').slice(0, 2).join(' ');
              return (
                <button
                  key={path.slug}
                  onClick={() => setSelectedPathSlug(path.slug)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
