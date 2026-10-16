'use client';

import { useBookmarks } from '@/components/providers/bookmarks-provider';
import { Bookmark } from 'lucide-react';

interface BookmarkButtonProps {
  articleSlug: string;
  variant?: 'icon' | 'full';
  className?: string;
}

export function BookmarkButton({
  articleSlug,
  variant = 'full',
  className = '',
}: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const saved = isBookmarked(articleSlug);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(articleSlug);
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        className={`p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
          saved
            ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400'
            : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
        } ${className}`}
        aria-label={saved ? 'Remove from saved resources' : 'Save article'}
        aria-pressed={saved}
        title={saved ? 'Remove from saved resources' : 'Save article'}
      >
        <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
        saved
          ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
      } ${className}`}
      aria-label={saved ? 'Remove from saved resources' : 'Save article'}
      aria-pressed={saved}
    >
      <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current text-blue-600' : ''}`} aria-hidden="true" />
      <span>{saved ? 'Saved' : 'Save for later'}</span>
    </button>
  );
}
