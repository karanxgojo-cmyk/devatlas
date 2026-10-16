'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Animation variant */
  variant?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp';
  /** Stagger delay for children (in seconds) */
  stagger?: number;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** ScrollTrigger start position */
  start?: string;
}

export function ScrollReveal({
  children,
  className = '',
  variant = 'fadeUp',
  stagger = 0,
  delay = 0,
  start = 'top 88%',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const targets = stagger > 0 ? Array.from(el.children) : [el];

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      ...(variant === 'fadeUp' && { y: 40 }),
      ...(variant === 'slideLeft' && { x: -50 }),
      ...(variant === 'slideRight' && { x: 50 }),
      ...(variant === 'scaleUp' && { scale: 0.92, y: 20 }),
    };

    const toVars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
      delay,
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
    };

    let tween: gsap.core.Tween;
    if (stagger > 0 && targets.length > 1) {
      tween = gsap.fromTo(targets, fromVars, {
        ...toVars,
        stagger,
      });
    } else {
      tween = gsap.fromTo(el, fromVars, toVars);
    }

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [variant, stagger, delay, start]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
