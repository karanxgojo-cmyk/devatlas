'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Topic, Article } from '@/types/content';
import { SafeImage } from '@/components/ui/safe-image';
import { ArrowRight, Sparkles } from 'lucide-react';
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
      // Heading entrance animation
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
      className="cylindrical-section py-20 border-b border-[#E7B4A0] bg-[#F04B35] relative"
    >
      {/* Subtle radial glow contained without clipping 3D */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FFF5E6]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headingRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5E6]/20 text-[#FFF5E6] text-xs font-semibold mb-2 border border-[#FFF5E6]/40 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FFF5E6]" />
              <span>Curated Disciplines</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-[#FFF5E6] tracking-tight">
              Explore the Engineering World
            </h2>
            <p className="text-sm sm:text-base font-serif-body text-[#FFF5E6]/95 mt-2 max-w-2xl leading-relaxed">
              Editorial compositions covering the foundations of modern systems, from microservices and distributed consensus to neural attention mechanics and zero-CLS web rendering.
            </p>
          </div>
          <Link
            href="/explore"
            className="text-xs font-bold text-[#FFF5E6] hover:text-[#FFF5E6]/80 transition-colors flex items-center gap-1.5 shrink-0 bg-[#FFF5E6]/20 px-3 py-1.5 rounded-lg border border-[#FFF5E6]/30"
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
                className="card-morph group relative rounded-2xl border border-[#DFD0BE] bg-[#FFF8EE] overflow-hidden shadow-soft hover:shadow-xl hover:border-[#E98898] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Editorial Image Header with Morphing Frame */}
                <div className="p-3 pb-0">
                  <div className="image-morph-container relative aspect-[16/9] w-full overflow-hidden bg-[#F5F0E8] rounded-xl border border-[#DFD0BE]">
                    <SafeImage
                      src={imagePath}
                      alt={`${topic.title} technical architecture diagram`}
                      fallbackCategory={topic.slug}
                      fallbackTitle={topic.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="image-morph-target object-contain p-2.5 transition-transform duration-700"
                    />

                    {/* Badge: Soft Pink #F2B8C6 */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#F2B8C6]/50 text-[#49372F] border border-[#DFD0BE] shadow-xs">
                        {topicArticleCount} In-Depth Guides
                      </span>
                    </div>

                    {/* Subtle specular sheen overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F04B35]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold font-serif text-[#174B35] mb-2 group-hover:text-[#224936] transition-colors">
                      <Link href={`/topics/${topic.slug}`} className="focus:outline-none">
                        {topic.title}
                      </Link>
                    </h3>
                    <p className="text-sm font-serif-body text-[#49372F] leading-relaxed mb-4 font-normal">
                      {topic.description}
                    </p>

                    {/* Featured tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {topic.featuredTags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#9DD8EB]/30 text-[#49372F] border border-[#DFD0BE]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#DFD0BE] flex items-center justify-between text-xs font-semibold">
                    <Link
                      href={`/topics/${topic.slug}`}
                      className="text-[#174B35] hover:text-[#224936] group-hover:underline flex items-center gap-1.5 transition-colors font-bold"
                    >
                      <span>Explore {topic.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <span className="text-[#795548] font-normal">
                      Full Curriculum
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
