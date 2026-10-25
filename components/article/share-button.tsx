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
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-[#DCCBB6] bg-white text-[#332A26] hover:bg-[#FFF5E6] hover:border-[#174B35] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B35] ${className}`}
      aria-label="Share article"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-[#174B35]" aria-hidden="true" />
          <span className="text-[#174B35] font-bold">Link copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-[#597260]" aria-hidden="true" />
          <span>Share</span>
        </>
      )}
    </button>
  );
}
