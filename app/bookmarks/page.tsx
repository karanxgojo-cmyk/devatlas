'use client';

import Link from 'next/link';
import { useBookmarks } from '@/components/providers/bookmarks-provider';
import { getAllArticles } from '@/lib/content/articles';
import { ArticleCard } from '@/components/article/article-card';
import { Bookmark, Trash2, Compass } from 'lucide-react';

export default function BookmarksPage() {
  const { bookmarks, clearAllBookmarks } = useBookmarks();
  const allArticles = getAllArticles();

  const savedArticles = allArticles.filter((article) =>
    bookmarks.includes(article.slug)
  );

  return (
    <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Bookmark className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Personal Reading List
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Saved Resources
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Articles and architecture blueprints bookmarked for later study.
          </p>
        </div>

        {savedArticles.length > 0 && (
          <button
            onClick={clearAllBookmarks}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 hover:bg-red-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Bookmarks</span>
          </button>
        )}
      </div>

      {/* Bookmarks Grid or Empty State */}
      {savedArticles.length > 0 ? (
        <div className="space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing {savedArticles.length} saved {savedArticles.length === 1 ? 'article' : 'articles'}:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-12 text-center max-w-lg mx-auto my-12">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            No saved articles yet
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            Click the bookmark icon on any article card or guide header to save it to your personal study library.
          </p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Engineering Guides</span>
          </Link>
        </div>
      )}
    </main>
  );
}
