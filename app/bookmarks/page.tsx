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
    <div className="min-h-screen bg-[#F5F0E8] text-[#49372F] transition-colors py-10">
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Forest-Green Introduction Banner */}
        <div className="rounded-3xl bg-[#174B35] text-[#FFF5E6] p-6 sm:p-10 mb-8 border border-[#416C53] shadow-md flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Bookmark className="w-5 h-5 text-[#FF8A24]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A24]">
                Personal Reading List
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#FFF5E6] tracking-tight">
              Saved Resources
            </h1>
            <p className="text-sm font-serif-body text-[#D8E9DA] mt-2 max-w-xl leading-relaxed">
              Curated architecture blueprints, deep dives, and system tutorials bookmarked for your personal engineering study.
            </p>
          </div>

          {savedArticles.length > 0 && (
            <button
              onClick={clearAllBookmarks}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F04B35] text-white hover:bg-[#d63a25] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A24]"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All Bookmarks</span>
            </button>
          )}
        </div>

        {/* Bookmarks Grid or Empty State */}
        {savedArticles.length > 0 ? (
          <div className="space-y-4">
            <p className="text-xs text-[#795548] font-semibold">
              Showing {savedArticles.length} saved {savedArticles.length === 1 ? 'article' : 'articles'}:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} variant="cream" />
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-[#DFD0BE] bg-[#FFF8EE] p-12 text-center max-w-lg mx-auto my-12 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[#F2B8C6]/40 text-[#49372F] flex items-center justify-center mx-auto mb-4 border border-[#DFD0BE]">
              <Bookmark className="w-7 h-7 text-[#FF8A24]" />
            </div>
            <h2 className="text-xl font-bold font-serif text-[#174B35] mb-2">
              No saved articles yet
            </h2>
            <p className="text-sm font-serif-body text-[#49372F] mb-6 leading-relaxed">
              Click the bookmark icon on any article card or guide header to save it to your personal study library.
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#174B35] hover:bg-[#123a29] text-[#FFF8EE] transition-colors shadow-sm"
            >
              <Compass className="w-4 h-4 text-[#FF8A24]" />
              <span>Discover Engineering Guides</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
