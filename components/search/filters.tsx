'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TOPICS } from '@/lib/content/topics';
import { SortOption } from '@/types/content';
import { ArrowDownUp, Filter, RotateCcw } from 'lucide-react';

interface FiltersProps {
  availableTags: string[];
}

function FiltersContent({ availableTags }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || 'all';
  const currentTag = searchParams.get('tag') || 'all';
  const currentSort = (searchParams.get('sort') as SortOption) || 'newest';
  const currentQuery = searchParams.get('q') || '';

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    router.push(`/explore?${params.toString()}`);
  };

  const handleReset = () => {
    router.push('/explore');
  };

  const hasActiveFilters =
    currentCategory !== 'all' || currentTag !== 'all' || currentSort !== 'newest' || currentQuery !== '';

  return (
    <div className="space-y-6">
      {/* Category Pills */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Category</span>
          </label>
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateParam('category', 'all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              currentCategory === 'all'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            All Categories
          </button>
          {TOPICS.map((topic) => (
            <button
              key={topic.slug}
              onClick={() => updateParam('category', topic.slug)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                currentCategory === topic.slug
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {topic.title}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Controls: Tag filter & Sorting */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* Tag Dropdown */}
        <div>
          <label
            htmlFor="tag-select"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2"
          >
            Filter by Tag
          </label>
          <select
            id="tag-select"
            value={currentTag}
            onChange={(e) => updateParam('tag', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div>
          <label
            htmlFor="sort-select"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5"
          >
            <ArrowDownUp className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Sort By</span>
          </label>
          <select
            id="sort-select"
            value={currentSort}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
            <option value="reading-time-asc">Reading Time (Shortest)</option>
            <option value="reading-time-desc">Reading Time (Longest)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export function Filters(props: FiltersProps) {
  return (
    <Suspense
      fallback={
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded"></div>
        </div>
      }
    >
      <FiltersContent {...props} />
    </Suspense>
  );
}
