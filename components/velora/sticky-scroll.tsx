'use client';

/**
 * Velora UI Sticky Scroll Component
 * Adapted for DevAtlas Interactive Engineering Roadmaps
 *
 * Attribution:
 * Based on the Velora UI Sticky Scroll by Colorlib (MIT License)
 * Reference: https://velora.colorlib.com/components/sticky-scroll
 * Adapted to DevAtlas architecture: uses native GSAP ScrollTrigger & Lenis
 * synchronization to avoid conflicting animation libraries while preserving
 * Velora's pinned visual container, responsive sizing, and sequential content swapping.
 */

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '@/components/providers/lenis-provider';

export interface StickyScrollItem {
  id?: string;
  title: string;
  description: string;
  content?: React.ReactNode;
  stepNumber?: number;
  tier?: string;
  estimatedMinutes?: number;
  articleSlug?: string;
}

export interface StickyScrollProps {
  items: StickyScrollItem[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  onProgressChange?: (progress: number) => void;
  renderPinnedVisual?: (activeIdx: number, progress: number) => React.ReactNode;
  renderScrollItem?: (item: StickyScrollItem, index: number, isActive: boolean) => React.ReactNode;
  className?: string;
}

export function StickyScroll({
  items,
  activeIndex: controlledActiveIndex,
  onActiveChange,
  onProgressChange,
  renderPinnedVisual,
  renderScrollItem,
  className = '',
}: StickyScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalActive, setInternalActive] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenis = useLenis();

  const active = typeof controlledActiveIndex === 'number' ? controlledActiveIndex : internalActive;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container || !items.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Overall section progress tracking (smooth 0 to 1 progress for 3D cylinder rotation)
      ScrollTrigger.create({
        trigger: container,
        start: 'top 70%',
        end: 'bottom 80%',
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress));
          setScrollProgress(p);
          onProgressChange?.(p);
        },
      });

      // 2. Individual step blocks for bidirectional active index switching
      const stepBlocks = container.querySelectorAll<HTMLElement>('[data-sticky-step]');
      stepBlocks.forEach((block, index) => {
        ScrollTrigger.create({
          trigger: block,
          start: 'top 65%',
          end: 'bottom 35%',
          onEnter: () => {
            setInternalActive(index);
            onActiveChange?.(index);
          },
          onEnterBack: () => {
            setInternalActive(index);
            onActiveChange?.(index);
          },
        });

        // Entrance animation
        if (!prefersReducedMotion) {
          gsap.fromTo(
            block,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 92%',
                once: true,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items.length, onActiveChange, onProgressChange]);

  if (!items.length) return null;

  return (
    <div
      ref={containerRef}
      data-slot="sticky-scroll"
      className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${className}`}
    >
      {/* PINNED VISUAL PANEL (Velora UI Pattern: Desktop sticky container, swapping content) */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 z-20 space-y-4">
        <div
          data-slot="sticky-scroll-panel"
          className="relative w-full rounded-2xl border border-[#803366] bg-[#63284F] text-[#FFF5E6] p-4 sm:p-6 shadow-xl overflow-hidden transition-all duration-300"
        >
          {renderPinnedVisual ? (
            renderPinnedVisual(active, scrollProgress)
          ) : (
            <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-[#4D1938] border border-[#803366] p-4 flex items-center justify-center">
              {items.map((item, i) => (
                <div
                  key={item.id || item.title || i}
                  aria-hidden={active !== i}
                  className={`absolute inset-0 flex items-center justify-center p-6 transition-all duration-500 ${
                    active === i
                      ? 'opacity-100 scale-100 pointer-events-auto'
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  {item.content ?? (
                    <div className="text-center">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#FF8190] block mb-2">
                        STAGE 0{i + 1}
                      </span>
                      <h4 className="text-lg font-bold text-[#FFF5E6]">{item.title}</h4>
                      <p className="text-xs text-[#D8E9DA] mt-2 max-w-xs">{item.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SEQUENTIAL SCROLLING STAGES COLUMN */}
      <div className="lg:col-span-7 space-y-6">
        {items.map((item, index) => {
          const isActive = active === index;

          return (
            <div
              key={item.id || item.title || index}
              data-sticky-step={index}
              className="scroll-mt-28"
            >
              {renderScrollItem ? (
                renderScrollItem(item, index, isActive)
              ) : (
                <div
                  className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 bg-[#FFF5E6] ${
                    isActive
                      ? 'border-[#F04B35] shadow-lg ring-2 ring-[#F04B35]/20 opacity-100'
                      : 'border-[#DCCBB6] shadow-sm opacity-85 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isActive
                          ? 'bg-[#F04B35] text-white'
                          : 'bg-[#DCCBB6] text-[#332A26]'
                      }`}
                    >
                      STAGE 0{index + 1}
                    </span>
                  </div>
                  <h3
                    className={`text-xl font-bold transition-opacity duration-300 ${
                      isActive ? 'text-[#174B35]' : 'text-[#332A26]/80'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#332A26] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
