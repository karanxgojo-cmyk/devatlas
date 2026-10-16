'use client';

import { useEffect, useState, useRef } from 'react';
import { useLenis } from 'lenis/react';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  // Subscribe to Lenis scroll events with priority
  useLenis((lenis) => {
    // Only schedule state update if changed significantly to avoid excessive React renders
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const currentProgress = Math.min(100, Math.max(0, Math.round(lenis.progress * 100)));
      setProgress((prev) => (Math.abs(prev - currentProgress) >= 1 ? currentProgress : prev));
    });
  });

  // Fallback for native window scroll if Lenis is paused/disabled
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const current = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
      setProgress(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-16 left-0 right-0 h-1 z-30 bg-transparent pointer-events-none"
      role="progressbar"
      aria-label="Article reading progress"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-400 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
