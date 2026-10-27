'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TOPICS } from '@/lib/content/topics';
import { SortOption } from '@/types/content';
import { ArrowDownUp, Filter, RotateCcw, BarChart3 } from 'lucide-react';

interface FiltersProps {
  availableTags: string[];
}

function FiltersContent({ availableTags }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') || 'all';
  const currentTag = searchParams.get('tag') || 'all';
  const currentDifficulty = searchParams.get('difficulty') || 'all';
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
    currentCategory !== 'all' ||
    currentTag !== 'all' ||
    currentDifficulty !== 'all' ||
    currentSort !== 'newest' ||
    currentQuery !== '';

  return (
    <div className="space-y-6 text-[#49372F]">
      {/* Category Pills */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#174B35] flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#FF8A24]" aria-hidden="true" />
            <span>Category</span>
          </label>
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="text-xs font-medium text-[#E98898] hover:text-[#F04B35] hover:underline flex items-center gap-1 transition-colors"
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
                ? 'bg-[#174B35] text-[#FFFFFF] border-[#174B35] shadow-xs font-bold'
                : 'bg-[#FFF8EE] text-[#49372F] border-[#DFD0BE] hover:bg-[#F2B8C6]/30 hover:text-[#174B35]'
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
                  ? 'bg-[#174B35] text-[#FFFFFF] border-[#174B35] shadow-xs font-bold'
                  : 'bg-[#FFF8EE] text-[#49372F] border-[#DFD0BE] hover:bg-[#F2B8C6]/30 hover:text-[#174B35]'
              }`}
            >
              {topic.title}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Controls: Difficulty, Tag filter & Sorting */}
      <div className="space-y-4 pt-2 border-t border-[#DFD0BE]">
        {/* Difficulty Level Dropdown */}
        <div>
          <label
            htmlFor="difficulty-select"
            className="block text-xs font-semibold uppercase tracking-wider text-[#174B35] mb-2 flex items-center gap-1.5"
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#FF8A24]" aria-hidden="true" />
            <span>Difficulty</span>
          </label>
          <select
            id="difficulty-select"
            value={currentDifficulty}
            onChange={(e) => updateParam('difficulty', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD0BE] bg-[#FFF8EE] text-[#49372F] focus:outline-none focus:ring-2 focus:ring-[#F04B35] shadow-xs"
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner (Foundations)</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced Architecture</option>
          </select>
        </div>

        {/* Tag Dropdown */}
        <div>
          <label
            htmlFor="tag-select"
            className="block text-xs font-semibold uppercase tracking-wider text-[#174B35] mb-2"
          >
            Filter by Tag
          </label>
          <select
            id="tag-select"
            value={currentTag}
            onChange={(e) => updateParam('tag', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD0BE] bg-[#FFF8EE] text-[#49372F] focus:outline-none focus:ring-2 focus:ring-[#F04B35] shadow-xs"
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
            className="block text-xs font-semibold uppercase tracking-wider text-[#174B35] mb-2 flex items-center gap-1.5"
          >
            <ArrowDownUp className="w-3.5 h-3.5 text-[#FF8A24]" aria-hidden="true" />
            <span>Sort By</span>
          </label>
          <select
            id="sort-select"
            value={currentSort}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-[#DFD0BE] bg-[#FFF8EE] text-[#49372F] focus:outline-none focus:ring-2 focus:ring-[#F04B35] shadow-xs"
          >
            <option value="newest">Newest First</option>
            <option value="popular">Curator&apos;s Choice / Featured</option>
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
          <div className="h-4 bg-[#D9CDBB] rounded w-1/3"></div>
          <div className="h-8 bg-[#D9CDBB] rounded"></div>
        </div>
      }
    >
      <FiltersContent {...props} />
    </Suspense>
  );
}
