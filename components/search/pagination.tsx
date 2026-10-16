'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

function PaginationContent({ currentPage, totalPages, basePath = '/explore' }: PaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${basePath}?${params.toString()}`;
  };

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav
      className="flex items-center justify-center gap-1.5 mt-10 pt-6 border-t border-slate-200 dark:border-slate-800"
      aria-label="Pagination"
    >
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">Previous</span>
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60"
          aria-disabled="true"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">Previous</span>
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1 mx-2">
        {pages.map((p) => {
          const isCurrent = p === currentPage;
          return isCurrent ? (
            <span
              key={p}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-xs"
              aria-current="page"
            >
              {p}
            </span>
          ) : (
            <Link
              key={p}
              href={createPageUrl(p)}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label={`Page ${p}`}
            >
              {p}
            </Link>
          );
        })}
      </div>

      {/* Next button */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60"
          aria-disabled="true"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}

export function Pagination(props: PaginationProps) {
  return (
    <Suspense fallback={<div className="h-10 mt-10"></div>}>
      <PaginationContent {...props} />
    </Suspense>
  );
}
