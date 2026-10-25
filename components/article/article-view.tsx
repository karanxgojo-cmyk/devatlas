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
import { Calendar, Clock, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

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
  return (
    <div className="relative bg-[#F5F0E8] min-h-screen text-[#49372F]">
      {/* Top Reading Progress Bar */}
      <ReadingProgress />

      {/* Article Title Area: Forest Green #174B35 with Warm Cream #FFF5E6 Text */}
      <header className="pt-10 pb-12 border-b border-[#416C53] bg-[#174B35] text-[#FFF5E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link
              href={`/topics/${article.category}`}
              className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-[#D8E9DA]/30 bg-[#FFF5E6]/10 text-[#FFF5E6] transition-opacity hover:opacity-85"
            >
              {article.categoryName}
            </Link>
            <span className="text-xs font-medium text-[#FFF5E6] bg-[#FFF5E6]/10 border border-[#D8E9DA]/30 px-2.5 py-1 rounded-full">
              {article.difficulty}
            </span>
            <span className="text-xs text-[#D8E9DA]/70">•</span>
            <span className="text-xs text-[#D8E9DA] flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-[#FF8A24]" />
              {article.readingTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-[#FFF5E6] mb-4 leading-[1.15]">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg font-serif-body text-[#D8E9DA] leading-relaxed mb-6 font-normal">
            {article.summary}
          </p>

          {/* Author & Timestamp Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#416C53]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F04B35] text-[#FFFFFF] font-bold flex items-center justify-center text-sm shadow-xs">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-[#FFF5E6]">
                  {article.author.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#D8E9DA]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#FF8A24]" />
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#FFF5E6] font-medium">
                    <CheckCircle2 className="w-3 h-3 text-[#FF8A24]" />
                    <span>Peer-Reviewed Architecture Guide</span>
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
          {/* Main Article Body Surface: Soft Cream #FFF8EE with Dark Brown #49372F Text */}
          <main id="main-content" className="lg:col-span-8 max-w-3xl">
            <div className="bg-[#FFF8EE] border border-[#DFD0BE] rounded-2xl p-6 sm:p-10 shadow-sm">
              {/* Prerequisites */}
              <Prerequisites items={article.prerequisites} />

              {/* Rich Markdown & Code renderer */}
              <MarkdownRenderer content={article.content} />

              {/* Tags footer */}
              <div className="my-8 pt-6 border-t border-[#DFD0BE]">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#174B35] mb-3">
                  Related Topics &amp; Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/explore?tag=${encodeURIComponent(tag)}`}
                      className="text-xs font-mono px-3 py-1 rounded-md bg-[#9DD8EB]/30 text-[#49372F] hover:bg-[#9DD8EB]/60 hover:text-[#174B35] border border-[#DFD0BE] transition-colors"
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
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 pt-8 border-t border-[#DFD0BE]"
                aria-label="Previous and Next Articles"
              >
                {prevArticle ? (
                  <Link
                    href={`/articles/${prevArticle.slug}`}
                    className="flex flex-col p-4 rounded-xl border border-[#DFD0BE] bg-[#FFF8EE] hover:border-[#E98898] transition-all group shadow-xs"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#795548] flex items-center gap-1 mb-1">
                      <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-[#F04B35]" />
                      Previous Article
                    </span>
                    <span className="text-sm font-bold text-[#174B35] group-hover:text-[#F04B35] line-clamp-2">
                      {prevArticle.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextArticle ? (
                  <Link
                    href={`/articles/${nextArticle.slug}`}
                    className="flex flex-col p-4 rounded-xl border border-[#DFD0BE] bg-[#FFF8EE] hover:border-[#E98898] transition-all group text-right sm:items-end shadow-xs"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#795548] flex items-center gap-1 mb-1">
                      Next Article
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#F04B35]" />
                    </span>
                    <span className="text-sm font-bold text-[#174B35] group-hover:text-[#F04B35] line-clamp-2">
                      {nextArticle.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </nav>
            </div>
          </main>

          {/* Sticky Table of Contents Sidebar: Soft Cream #FFF8EE */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <TableOfContents headings={article.headings} />

              {/* Quick Share / Bookmark Card in sidebar */}
              <div className="rounded-xl border border-[#DFD0BE] bg-[#FFF8EE] p-4 text-xs text-[#49372F] space-y-3 shadow-xs">
                <p className="font-semibold text-[#174B35]">
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

        {/* Related Articles Section: Soft Cream Cards */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#DFD0BE]">
            <h2 className="text-2xl font-bold text-[#174B35] mb-6">
              Recommended Next Reads
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.slug} article={rel} variant="cream" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
