'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ArticleFontSize = 'sm' | 'md' | 'lg';

interface FontSizeContextType {
  fontSize: ArticleFontSize;
  setFontSize: (size: ArticleFontSize) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  fontSizeClass: string;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export function FontSizeProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSizeState] = useState<ArticleFontSize>('md');

  useEffect(() => {
    const saved = localStorage.getItem('devatlas-article-font-size') as ArticleFontSize | null;
    if (saved && ['sm', 'md', 'lg'].includes(saved)) {
      setFontSizeState(saved);
    }
  }, []);

  const setFontSize = (size: ArticleFontSize) => {
    setFontSizeState(size);
    localStorage.setItem('devatlas-article-font-size', size);
  };

  const increaseFontSize = () => {
    if (fontSize === 'sm') setFontSize('md');
    else if (fontSize === 'md') setFontSize('lg');
  };

  const decreaseFontSize = () => {
    if (fontSize === 'lg') setFontSize('md');
    else if (fontSize === 'md') setFontSize('sm');
  };

  const fontSizeClass =
    fontSize === 'sm'
      ? 'text-base leading-relaxed'
      : fontSize === 'lg'
      ? 'text-xl leading-loose'
      : 'text-lg leading-relaxed';

  return (
    <FontSizeContext.Provider
      value={{ fontSize, setFontSize, increaseFontSize, decreaseFontSize, fontSizeClass }}
    >
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
}
