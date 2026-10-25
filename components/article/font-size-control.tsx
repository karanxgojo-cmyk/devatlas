'use client';

import { useFontSize } from '@/components/providers/font-size-provider';
import { Type } from 'lucide-react';

export function FontSizeControl() {
  const { fontSize, setFontSize } = useFontSize();

  return (
    <div
      className="inline-flex items-center rounded-lg border border-[#DCCBB6] bg-white p-0.5 text-xs text-[#332A26]"
      role="group"
      aria-label="Article text size adjustment"
    >
      <span className="sr-only">Font size</span>
      <div className="flex items-center px-2 py-1 text-[#597260]">
        <Type className="w-3.5 h-3.5" aria-hidden="true" />
      </div>
      <button
        onClick={() => setFontSize('sm')}
        className={`px-2 py-1 rounded text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B35] ${
          fontSize === 'sm'
            ? 'bg-[#174B35] text-[#FFF5E6]'
            : 'text-[#332A26] hover:text-[#174B35]'
        }`}
        aria-pressed={fontSize === 'sm'}
        aria-label="Small font size"
      >
        A-
      </button>
      <button
        onClick={() => setFontSize('md')}
        className={`px-2 py-1 rounded text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B35] ${
          fontSize === 'md'
            ? 'bg-[#174B35] text-[#FFF5E6]'
            : 'text-[#332A26] hover:text-[#174B35]'
        }`}
        aria-pressed={fontSize === 'md'}
        aria-label="Standard font size"
      >
        A
      </button>
      <button
        onClick={() => setFontSize('lg')}
        className={`px-2 py-1 rounded text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B35] ${
          fontSize === 'lg'
            ? 'bg-[#174B35] text-[#FFF5E6]'
            : 'text-[#332A26] hover:text-[#174B35]'
        }`}
        aria-pressed={fontSize === 'lg'}
        aria-label="Large font size"
      >
        A+
      </button>
    </div>
  );
}
