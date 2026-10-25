'use client';

import { useEffect } from 'react';
import { MengToSketchbookLandingPage } from '@designcodeio/threeui';
import { useTheme } from '@/components/providers/theme-provider';
import '@designcodeio/threeui/style.css';

export function SketchbookTemplatePage() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Notify iframe of theme changes
    const iframe = document.querySelector('iframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'devatlas-theme-change', theme: resolvedTheme }, '*');
    }
  }, [resolvedTheme]);

  return (
    <div
      className="w-full relative min-h-screen transition-colors duration-200"
      style={{
        minHeight: '100vh',
        height: '3850px',
        width: '100%',
        position: 'relative',
        overflow: 'visible',
        backgroundColor: resolvedTheme === 'dark' ? '#1F1A17' : '#F5F0E8',
      }}
    >
      <MengToSketchbookLandingPage
        className="w-full h-full"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          background: resolvedTheme === 'dark' ? '#1F1A17' : '#F5F0E8',
          position: 'absolute',
          inset: 0,
        }}
      />
    </div>
  );
}
