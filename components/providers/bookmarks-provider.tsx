'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface BookmarksContextType {
  bookmarks: string[];
  bookmarkCount: number;
  isBookmarked: (slug: string) => boolean;
  toggleBookmark: (slug: string) => boolean;
  removeBookmark: (slug: string) => void;
  clearAllBookmarks: () => void;
  toastMessage: string | null;
  clearToast: () => void;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('devatlas-bookmarks');
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveToStorage = (updated: string[]) => {
    setBookmarks(updated);
    try {
      localStorage.setItem('devatlas-bookmarks', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  }, []);

  const clearToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  const isBookmarked = useCallback(
    (slug: string) => bookmarks.includes(slug),
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    (slug: string): boolean => {
      const exists = bookmarks.includes(slug);
      let updated: string[];
      if (exists) {
        updated = bookmarks.filter((s) => s !== slug);
        showToast('Article removed from saved resources');
      } else {
        updated = [...bookmarks, slug];
        showToast('Article saved to your resources');
      }
      saveToStorage(updated);
      return !exists;
    },
    [bookmarks, showToast]
  );

  const removeBookmark = useCallback(
    (slug: string) => {
      const updated = bookmarks.filter((s) => s !== slug);
      saveToStorage(updated);
      showToast('Article removed from saved resources');
    },
    [bookmarks, showToast]
  );

  const clearAllBookmarks = useCallback(() => {
    saveToStorage([]);
    showToast('All saved articles cleared');
  }, [showToast]);

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        bookmarkCount: bookmarks.length,
        isBookmarked,
        toggleBookmark,
        removeBookmark,
        clearAllBookmarks,
        toastMessage,
        clearToast,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
}
