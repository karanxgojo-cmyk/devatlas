'use client';

import { useFontSize } from '@/components/providers/font-size-provider';
import { Type } from 'lucide-react';

export function FontSizeControl() {
  const { fontSize, setFontSize } = useFontSize();

  return (
    <div
      className="inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-0.5 text-xs text-slate-600 dark:text-slate-400"
      role="group"
      aria-label="Article text size adjustment"
    >
      <span className="sr-only">Font size</span>
      <div className="flex items-center px-2 py-1 text-slate-400 dark:text-slate-500">
        <Type className="w-3.5 h-3.5" aria-hidden="true" />
      </div>
      <button
        onClick={() => setFontSize('sm')}
        className={`px-2 py-1 rounded text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
          fontSize === 'sm'
            ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold'
            : 'hover:text-slate-900 dark:hover:text-white'
        }`}
        aria-pressed={fontSize === 'sm'}
        aria-label="Small font size"
      >
        A-
      </button>
      <button
        onClick={() => setFontSize('md')}
        className={`px-2 py-1 rounded text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
          fontSize === 'md'
            ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold'
            : 'hover:text-slate-900 dark:hover:text-white'
        }`}
        aria-pressed={fontSize === 'md'}
        aria-label="Standard font size"
      >
        A
      </button>
      <button
        onClick={() => setFontSize('lg')}
        className={`px-2 py-1 rounded text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
          fontSize === 'lg'
            ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold'
            : 'hover:text-slate-900 dark:hover:text-white'
        }`}
        aria-pressed={fontSize === 'lg'}
        aria-label="Large font size"
      >
        A+
      </button>
    </div>
  );
}
