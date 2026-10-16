'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ReactLenis, useLenis, LenisRef } from 'lenis/react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

type WindowWithGlobals = Window & {
  __gsap?: typeof gsap;
  __ScrollTrigger?: typeof ScrollTrigger;
  __lenis?: Lenis;
};

function getWindowGlobals(): WindowWithGlobals {
  return window as WindowWithGlobals;
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  const w = getWindowGlobals();
  w.__gsap = gsap;
  w.__ScrollTrigger = ScrollTrigger;
}

interface LenisProviderProps {
  children: ReactNode;
}

// Inner child component that reacts to lenis instance creation via context
function LenisBinder() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    const w = getWindowGlobals();
    w.__gsap = gsap;
    w.__ScrollTrigger = ScrollTrigger;

    if (lenis) {
      w.__lenis = lenis;
      document.documentElement.classList.add('lenis');

      // 1. Synchronize ScrollTrigger on Lenis scroll events
      const onScroll = () => {
        ScrollTrigger.update();
      };
      lenis.on('scroll', onScroll);

      // 2. Drive Lenis through GSAP ticker for single unified loop
      const updateTicker = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);

      return () => {
        lenis.off('scroll', onScroll);
        gsap.ticker.remove(updateTicker);
      };
    }
  }, [lenis]);

  // Route transition scroll reset
  useEffect(() => {
    if (!lenis) return;
    lenis.stop();
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
    lenis.start();
    ScrollTrigger.refresh();
  }, [pathname, lenis]);

  return null;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const w = getWindowGlobals();
    w.__gsap = gsap;
    w.__ScrollTrigger = ScrollTrigger;

    const syncRef = () => {
      const l = lenisRef.current?.lenis;
      if (l) {
        getWindowGlobals().__lenis = l;
        document.documentElement.classList.add('lenis');
      }
    };

    syncRef();
    const interval = setInterval(syncRef, 50);
    const timeout = setTimeout(() => clearInterval(interval), 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false, // Unified with GSAP ticker
        duration: 1.2,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1,
        wheelMultiplier: 1,
        autoResize: true,
        anchors: true,
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
      }}
    >
      <LenisBinder />
      {children}
    </ReactLenis>
  );
}

export { useLenis, gsap, ScrollTrigger };
