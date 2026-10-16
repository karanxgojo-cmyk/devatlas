'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useBookmarks } from '@/components/providers/bookmarks-provider';
import { getAllArticles } from '@/lib/content/articles';
import { LEARNING_PATHS } from '@/lib/content/paths';
import { ArticleCard } from '@/components/article/article-card';
import {
  LayoutDashboard,
  Bookmark,
  Route,
  Trophy,
  ArrowRight,
} from 'lucide-react';

export default function DashboardPage() {
  const { bookmarks, bookmarkCount } = useBookmarks();
  const allArticles = getAllArticles();
  const [pathsProgress, setPathsProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const progressMap: Record<string, number> = {};
    LEARNING_PATHS.forEach((path) => {
      try {
        const stored = localStorage.getItem(`devatlas-path-progress-${path.slug}`);
        if (stored) {
          const completed: number[] = JSON.parse(stored);
          progressMap[path.slug] = completed.length;
        } else {
          progressMap[path.slug] = 0;
        }
      } catch {
        progressMap[path.slug] = 0;
      }
    });
    setPathsProgress(progressMap);
  }, []);

  const savedArticles = allArticles.filter((article) =>
    bookmarks.includes(article.slug)
  );

  const totalModulesCompleted = Object.values(pathsProgress).reduce((a, b) => a + b, 0);

  return (
    <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Header */}
      <div className="pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <LayoutDashboard className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Learner Workspace
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Learning Dashboard
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Track your progress through structured learning paths and access your saved engineering guides.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Route className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {totalModulesCompleted}
            </p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Curriculum Modules Done
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {bookmarkCount}
            </p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Saved Architecture Guides
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {LEARNING_PATHS.length}
            </p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Active Learning Paths
            </p>
          </div>
        </div>
      </div>

      {/* Learning Paths Status Section */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Route className="w-5 h-5 text-blue-600" />
          <span>Curriculum Roadmaps in Progress</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARNING_PATHS.map((path) => {
            const completed = pathsProgress[path.slug] || 0;
            const total = path.steps.length;
            const pct = Math.round((completed / total) * 100);

            return (
              <div
                key={path.slug}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {path.difficulty}
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {completed}/{total} ({pct}%)
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {path.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {path.description}
                  </p>

                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-6">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <Link
                  href={`/paths/${path.slug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-600 text-slate-800 dark:text-slate-200 transition-colors"
                >
                  <span>{pct === 100 ? 'Review Path' : 'Continue Path'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Saved Resources Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-blue-600" />
            <span>Saved Architecture Deep Dives ({bookmarkCount})</span>
          </h2>
          {bookmarkCount > 0 && (
            <Link
              href="/bookmarks"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Manage Saved Items →
            </Link>
          )}
        </div>

        {savedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedArticles.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-8 text-center text-sm text-slate-500 dark:text-slate-400">
            You haven&apos;t saved any articles yet.{' '}
            <Link href="/explore" className="text-blue-600 dark:text-blue-400 underline font-semibold">
              Explore the article library
            </Link>{' '}
            to start curating your reference materials.
          </div>
        )}
      </section>
    </main>
  );
}
