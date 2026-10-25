'use client';

import { useBookmarks } from '@/components/providers/bookmarks-provider';
import { CheckCircle2, X } from 'lucide-react';

export function Toast() {
  const { toastMessage, clearToast } = useBookmarks();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#174B35] text-[#FFF5E6] px-5 py-3.5 rounded-2xl shadow-2xl border border-[#416C53] text-sm animate-fade-in font-medium"
    >
      <CheckCircle2 className="w-5 h-5 text-[#FF8A24] shrink-0" aria-hidden="true" />
      <span>{toastMessage}</span>
      <button
        onClick={clearToast}
        className="ml-2 text-[#D8E9DA] hover:text-[#FFF5E6] p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A24]"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
