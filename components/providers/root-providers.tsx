'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { BookmarksProvider } from './bookmarks-provider';
import { FontSizeProvider } from './font-size-provider';
import { LenisProvider } from './lenis-provider';
import { Toast } from '@/components/ui/toast';

export function RootProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <BookmarksProvider>
        <FontSizeProvider>
          <LenisProvider>
            {children}
            <Toast />
          </LenisProvider>
        </FontSizeProvider>
      </BookmarksProvider>
    </ThemeProvider>
  );
}
