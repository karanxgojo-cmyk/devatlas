import { Metadata } from 'next';
import { Suspense } from 'react';
import { searchAndFilterArticles } from '@/lib/search';
import { getAllTags } from '@/lib/content/articles';
import { ArticleCard } from '@/components/article/article-card';
import { SearchBar } from '@/components/search/search-bar';
import { Filters } from '@/components/search/filters';
import { Pagination } from '@/components/search/pagination';
import { constructMetadata } from '@/lib/seo';
import { SortOption } from '@/types/content';
import { Compass, BookOpen, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = constructMetadata({
  title: 'Explore Technical Guides & Deep Dives',
  description: 'Search and filter across 16+ comprehensive engineering articles, system architectures, and learning paths.',
  path: '/explore',
});

interface ExplorePageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    tag?: string;
    sort?: string;
    page?: string;
  }>;
}

async function ExploreResults({ searchParams }: ExplorePageProps) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || '';
  const category = resolvedParams.category || 'all';
  const tag = resolvedParams.tag || 'all';
  const sort = (resolvedParams.sort as SortOption) || 'newest';
  const page = parseInt(resolvedParams.page || '1', 10) || 1;

  const result = searchAndFilterArticles({
    q,
    category,
    tag,
    sort,
    page,
    pageSize: 6,
  });

  return (
    <div>
      {/* Results Summary Bar */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
        <div>
          <span className="font-bold text-slate-900 dark:text-white">
            {result.totalCount}
          </span>{' '}
          {result.totalCount === 1 ? 'article found' : 'articles found'}
          {q && (
            <span>
              {' '}
              for <strong className="text-blue-600 dark:text-blue-400">&ldquo;{q}&rdquo;</strong>
            </span>
          )}
        </div>

        <div className="text-slate-500">
          Page {result.currentPage} of {result.totalPages}
        </div>
      </div>

      {/* Cards Grid or Empty State */}
      {result.items.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.items.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {/* Server-Side Pagination */}
          <Pagination
            currentPage={result.currentPage}
            totalPages={result.totalPages}
            basePath="/explore"
          />
        </>
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-12 text-center max-w-lg mx-auto my-8">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            No matching articles found
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            We couldn&apos;t find any articles matching your search criteria. Try adjusting your search query or resetting active filters.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </Link>
        </div>
      )}
    </div>
  );
}

function ExploreSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}

export default function ExplorePage({ searchParams }: ExplorePageProps) {
  const availableTags = getAllTags();

  return (
    <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Resource Catalog
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Technical Articles
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
          Search across engineering deep dives, system design blueprints, and production-tested tutorials.
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-8 max-w-2xl">
        <SearchBar placeholder="Search by title, keyword, or concept (e.g. Next.js, Raft, B-Tree, Lenis)..." />
      </div>

      {/* Main Grid: Sidebar Filters & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-xs">
            <Filters availableTags={availableTags} />
          </div>
        </aside>

        {/* Results Area wrapped in Suspense */}
        <div className="lg:col-span-3">
          <Suspense fallback={<ExploreSkeleton />}>
            <ExploreResults searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
