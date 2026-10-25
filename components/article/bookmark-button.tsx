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
        className={`p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B35] ${
          saved
            ? 'text-[#F04B35] bg-[#FFF5E6]'
            : 'text-[#597260] hover:text-[#174B35] hover:bg-[#FFF5E6]'
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
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B35] ${
        saved
          ? 'bg-[#FFF5E6] border-[#F04B35]/50 text-[#F04B35]'
          : 'bg-white border-[#DCCBB6] text-[#332A26] hover:bg-[#FFF5E6] hover:border-[#174B35]'
      } ${className}`}
      aria-label={saved ? 'Remove from saved resources' : 'Save article'}
      aria-pressed={saved}
    >
      <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current text-[#F04B35]' : 'text-[#597260]'}`} aria-hidden="true" />
      <span>{saved ? 'Saved' : 'Save for later'}</span>
    </button>
  );
}
