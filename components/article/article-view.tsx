'use client';

import Link from 'next/link';
import { Article } from '@/types/content';
import { TableOfContents } from './table-of-contents';
import { ReadingProgress } from './reading-progress';
import { BookmarkButton } from './bookmark-button';
import { ShareButton } from './share-button';
import { FontSizeControl } from './font-size-control';
import { MarkdownRenderer } from './markdown-renderer';
import { Prerequisites } from './prerequisites';
import { AuthorCard } from './author-card';
import { ArticleCard } from './article-card';
import { Calendar, Clock, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface ArticleViewProps {
  article: Article;
  relatedArticles: Article[];
  prevArticle?: Article;
  nextArticle?: Article;
}

export function ArticleView({
  article,
  relatedArticles,
  prevArticle,
  nextArticle,
}: ArticleViewProps) {
  const categoryColors: Record<string, string> = {
    'web-dev': 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    'ai-ml': 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    'computer-science': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    'engineering-projects': 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  };

  const badgeClass =
    categoryColors[article.category] ||
    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';

  return (
    <div className="relative">
      {/* Top Reading Progress Bar */}
      <ReadingProgress />

      {/* Article Header Container */}
      <header className="pt-8 pb-10 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link
              href={`/topics/${article.category}`}
              className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border transition-opacity hover:opacity-80 ${badgeClass}`}
            >
              {article.categoryName}
            </Link>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
              {article.difficulty}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.15]">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
            {article.summary}
          </p>

          {/* Author & Timestamp Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {article.author.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {article.views.toLocaleString()} reads
                  </span>
                </div>
              </div>
            </div>

            {/* Reading Controls: Bookmark, Share, Font Size */}
            <div className="flex items-center gap-2 flex-wrap">
              <BookmarkButton articleSlug={article.slug} />
              <ShareButton title={article.title} />
              <FontSizeControl />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout with Sticky Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Article Body */}
          <main id="main-content" className="lg:col-span-8 max-w-3xl">
            {/* Prerequisites */}
            <Prerequisites items={article.prerequisites} />

            {/* Rich Markdown & Code renderer */}
            <MarkdownRenderer content={article.content} />

            {/* Tags footer */}
            <div className="my-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Related Topics & Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/explore?tag=${encodeURIComponent(tag)}`}
                    className="text-xs font-mono px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Author Profile */}
            <AuthorCard author={article.author} />

            {/* Previous and Next Navigation */}
            <nav
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 pt-8 border-t border-slate-200 dark:border-slate-800"
              aria-label="Previous and Next Articles"
            >
              {prevArticle ? (
                <Link
                  href={`/articles/${prevArticle.slug}`}
                  className="flex flex-col p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-blue-500 transition-all group"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                    <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                    Previous Article
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                    {prevArticle.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextArticle ? (
                <Link
                  href={`/articles/${nextArticle.slug}`}
                  className="flex flex-col p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-blue-500 transition-all group text-right sm:items-end"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                    Next Article
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                    {nextArticle.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </main>

          {/* Sticky Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <TableOfContents headings={article.headings} />

              {/* Quick Share / Bookmark Card in sidebar */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-4 text-xs text-slate-600 dark:text-slate-400 space-y-3">
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  Enjoying this article?
                </p>
                <div className="flex gap-2">
                  <BookmarkButton articleSlug={article.slug} className="w-full justify-center" />
                  <ShareButton title={article.title} className="w-full justify-center" />
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Recommended Next Reads
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.slug} article={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
