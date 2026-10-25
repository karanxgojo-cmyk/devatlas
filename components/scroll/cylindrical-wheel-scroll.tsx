'use client';

/**
 * DevAtlas Section-Level Cylindrical Wheel Scroll
 *
 * Custom 3D page transition architecture using GSAP ScrollTrigger + Lenis.
 * Distinct from the ThreeUI WebGL Canvas Gallery: this orchestrates DOM section
 * transformations around an invisible 3D cylindrical wheel in screen space,
 * curving exiting sections toward the left and rolling incoming sections from the right.
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CylindricalWheelScrollProps {
  children: React.ReactNode;
  className?: string;
  selector?: string;
}

export function CylindricalWheelScroll({
  children,
  className = '',
  selector = '.cylindrical-section',
}: CylindricalWheelScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect user motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll<HTMLElement>(selector);
    if (!sections || sections.length === 0) return;

    const isMobile = window.innerWidth < 1024;
    // 3D cylindrical transform values tuned for prominent, natural curvature
    const exitAngle = isMobile ? -7 : -18;
    const exitX = isMobile ? -35 : -110;
    const exitZ = isMobile ? -60 : -180;
    const exitScale = isMobile ? 0.97 : 0.93;

    const enterAngle = isMobile ? 5 : 12;
    const enterX = isMobile ? 25 : 55;
    const enterZ = isMobile ? -40 : -85;
    const enterScale = isMobile ? 0.98 : 0.96;

    const ctx = gsap.context(() => {
      sections.forEach((section, index) => {
        const isTall = section.offsetHeight > window.innerHeight * 1.4;

        // 1. Entry Transition: section emerges smoothly from the opposite cylinder rim
        if (index > 0) {
          gsap.fromTo(
            section,
            {
              rotateY: enterAngle,
              x: enterX,
              z: enterZ,
              scale: enterScale,
              opacity: 0.88,
              transformOrigin: 'right 50%',
            },
            {
              rotateY: 0,
              x: 0,
              z: 0,
              scale: 1,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top 20%',
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        // 2. Exit Transition: as section scrolls out, it curves and rotates away toward the LEFT
        // For tall interactive sections, start exit when bottom approaches viewport to protect sticky pinning
        if (index < sections.length - 1) {
          gsap.to(section, {
            rotateY: exitAngle,
            x: exitX,
            z: exitZ,
            scale: exitScale,
            opacity: 0.82,
            transformOrigin: 'left 50%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: isTall ? 'bottom 85%' : 'top 20%',
              end: 'bottom top',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
        }
      });
    }, containerRef);

    // Refresh ScrollTrigger once DOM/images finish initial layout calculations
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, [selector]);

  return (
    <div
      ref={containerRef}
      className={`cylindrical-perspective-wrapper ${className}`}
    >
      {children}
    </div>
  );
}
