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
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 dark:bg-slate-800 text-white px-4 py-3 rounded-lg shadow-xl border border-slate-700 text-sm animate-fade-in"
    >
      <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" aria-hidden="true" />
      <span>{toastMessage}</span>
      <button
        onClick={clearToast}
        className="ml-2 text-slate-400 hover:text-white p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
