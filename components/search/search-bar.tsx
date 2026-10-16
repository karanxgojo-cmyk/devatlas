'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  initialValue?: string;
  className?: string;
}

function SearchBarContent({
  placeholder = 'Search articles, topics, keywords...',
  initialValue = '',
  className = '',
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialValue || searchParams.get('q') || '');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set('q', query.trim());
      params.set('page', '1');
    } else {
      params.delete('q');
    }
    router.push(`/explore?${params.toString()}`);
  };

  const handleClear = () => {
    setQuery('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    params.set('page', '1');
    router.push(`/explore?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`} role="search">
      <div className="relative flex items-center">
        <Search
          className="absolute left-4 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm shadow-xs transition-shadow"
          aria-label="Search articles"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Clear search query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
}

export function SearchBar(props: SearchBarProps) {
  return (
    <Suspense
      fallback={
        <div className={`relative w-full ${props.className || ''}`}>
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={props.placeholder || 'Search articles, topics, keywords...'}
              disabled
              className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 text-sm"
            />
          </div>
        </div>
      }
    >
      <SearchBarContent {...props} />
    </Suspense>
  );
}
