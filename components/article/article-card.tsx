import Link from 'next/link';
import { Article } from '@/types/content';
import { BookmarkButton } from './bookmark-button';
import { Clock, Sparkles } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  priority?: boolean;
  variant?: 'white' | 'cream';
}

export function ArticleCard({ article, variant = 'white' }: ArticleCardProps) {
  const isCream = variant === 'cream';

  return (
    <article
      className="card-morph group relative flex flex-col justify-between rounded-2xl border border-[#DFD0BE] bg-[#FFF8EE] p-6 shadow-xs hover:border-[#E98898] hover:shadow-md transition-all duration-300"
    >
      <div>
        {/* Top metadata */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/topics/${article.category}`}
              className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#DFD0BE] bg-[#F2B8C6]/50 text-[#49372F] transition-opacity hover:opacity-85 hover:bg-[#F2B8C6]"
            >
              {article.categoryName}
            </Link>
            {article.featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#49372F] bg-[#E98898]/25 px-2 py-0.5 rounded-full border border-[#E98898]">
                <Sparkles className="w-3 h-3 text-[#F04B35]" />
                Featured
              </span>
            )}
            <span className="text-xs font-medium text-[#795548]">
              {article.difficulty}
            </span>
          </div>

          <BookmarkButton articleSlug={article.slug} variant="icon" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold font-serif text-[#174B35] group-hover:text-[#F04B35] transition-colors line-clamp-2 mb-2 leading-snug">
          <Link
            href={`/articles/${article.slug}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B35] rounded-sm"
          >
            {article.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-sm text-[#49372F] line-clamp-3 mb-4 leading-relaxed font-normal">
          {article.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {article.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/explore?tag=${encodeURIComponent(tag)}`}
              className="text-[11px] font-mono text-[#49372F] bg-[#9DD8EB]/30 hover:bg-[#9DD8EB]/60 hover:border-[#795548]/40 px-2 py-0.5 rounded transition-colors border border-[#DFD0BE]"
            >
              #{tag}
            </Link>
          ))}
          {article.tags.length > 3 && (
            <span className="text-[11px] font-mono text-[#795548] py-0.5">
              +{article.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer / Author info & verified read time */}
      <div className="pt-4 border-t border-[#DFD0BE] flex items-center justify-between text-xs text-[#795548]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#F2B8C6]/40 text-[#49372F] font-bold flex items-center justify-center text-[10px] shrink-0 border border-[#DFD0BE]">
            {article.author.name.charAt(0)}
          </div>
          <span className="font-medium text-[#49372F]">
            {article.author.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#F04B35]" aria-hidden="true" />
            <span className="text-[#49372F]">{article.readingTime}</span>
          </span>
          <span className="text-[#DFD0BE]">•</span>
          <span className="text-[11px] font-mono text-[#795548]">
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
    </article>
  );
}
