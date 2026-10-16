'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  url?: string;
  className?: string;
}

export function ShareButton({ title, url, className = '' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl,
        });
        return;
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') {
          return;
        }
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${className}`}
      aria-label="Share article"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
          <span className="text-emerald-600 dark:text-emerald-400">Link copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Share</span>
        </>
      )}
    </button>
  );
}
