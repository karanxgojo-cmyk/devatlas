import Link from 'next/link';
import { Article } from '@/types/content';
import { BookmarkButton } from './bookmark-button';
import { Clock, Eye, Sparkles } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  priority?: boolean;
}

export function ArticleCard({ article }: ArticleCardProps) {
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
    <article className="group relative flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200">
      <div>
        {/* Top metadata */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/topics/${article.category}`}
              className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border transition-colors hover:opacity-80 ${badgeClass}`}
            >
              {article.categoryName}
            </Link>
            {article.featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {article.difficulty}
            </span>
          </div>

          <BookmarkButton articleSlug={article.slug} variant="icon" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2 leading-snug">
          <Link
            href={`/articles/${article.slug}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm"
          >
            {article.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
          {article.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {article.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/explore?tag=${encodeURIComponent(tag)}`}
              className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 px-2 py-0.5 rounded transition-colors"
            >
              #{tag}
            </Link>
          ))}
          {article.tags.length > 3 && (
            <span className="text-[11px] font-mono text-slate-400 py-0.5">
              +{article.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer / Author info */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-[10px] shrink-0 border border-blue-200 dark:border-blue-800">
            {article.author.name.charAt(0)}
          </div>
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {article.author.name}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{article.readingTime}</span>
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{article.views.toLocaleString()}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
