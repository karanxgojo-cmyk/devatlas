'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Topic, Article } from '@/types/content';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CategoriesShowcaseProps {
  topics: Topic[];
  articles: Article[];
}

const categoryImages: Record<string, string> = {
  'web-dev': '/images/categories/web-dev.svg',
  'ai-ml': '/images/categories/ai-ml.svg',
  'computer-science': '/images/categories/computer-science.svg',
  'engineering-projects': '/images/categories/engineering-projects.svg',
};

export function CategoriesShowcase({ topics, articles }: CategoriesShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          Array.from(cards),
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.12,
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

  return (
    <section
      ref={sectionRef}
      className="py-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Curated Disciplines
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Explore the Engineering World
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Editorial compositions covering the foundations of modern systems, from microservices and distributed consensus to neural attention mechanics and zero-CLS web rendering.
            </p>
          </div>
          <Link
            href="/explore"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5 shrink-0"
          >
            <span>Browse all {articles.length} guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topics.map((topic) => {
            const topicArticleCount = articles.filter((a) => a.category === topic.slug).length;
            const imagePath = categoryImages[topic.slug] || '/images/categories/web-dev.svg';

            return (
              <div
                key={topic.slug}
                className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-500/80 dark:hover:border-blue-500/80 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Editorial Image Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                  <Image
                    src={imagePath}
                    alt={`${topic.title} technical diagram`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-900/90 text-blue-400 border border-slate-700/80 backdrop-blur-xs">
                      {topicArticleCount} In-Depth Guides
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <Link href={`/topics/${topic.slug}`}>
                        {topic.title}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {topic.description}
                    </p>

                    {/* Featured tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {topic.featuredTags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
                    <Link
                      href={`/topics/${topic.slug}`}
                      className="text-blue-600 dark:text-blue-400 group-hover:underline flex items-center gap-1.5"
                    >
                      <span>Explore {topic.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <span className="text-slate-400 font-normal">
                      Deep-dive curriculum
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
