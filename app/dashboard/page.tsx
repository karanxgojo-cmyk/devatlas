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
  Compass,
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
    <div className="min-h-screen bg-[#F5F0E8] text-[#49372F] transition-colors py-10">
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Dashboard Introduction (Forest green #174B35 with #FFF5E6 text) */}
        <div className="rounded-3xl bg-[#174B35] text-[#FFF5E6] p-6 sm:p-10 mb-10 border border-[#416C53] shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <LayoutDashboard className="w-5 h-5 text-[#FF8A24]" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A24]">
              Learner Workspace
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#FFF5E6] tracking-tight">
            Learning Dashboard
          </h1>
          <p className="text-sm sm:text-base font-serif-body text-[#D8E9DA] mt-2 max-w-2xl leading-relaxed">
            Track your progress through structured learning paths and access your saved engineering guides across web, distributed systems, and computer science.
          </p>
        </div>

        {/* Metrics Row (Information panels: Soft Cream #FFF8EE with #DFD0BE border) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="rounded-2xl border border-[#DFD0BE] bg-[#FFF8EE] p-6 flex items-center gap-4 shadow-sm hover:border-[#174B35] transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#D8E9DA] text-[#174B35] flex items-center justify-center shrink-0 border border-[#174B35]/20">
              <Route className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#174B35]">
                {totalModulesCompleted}
              </p>
              <p className="text-xs font-bold text-[#795548]">
                Curriculum Modules Done
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#DFD0BE] bg-[#FFF8EE] p-6 flex items-center gap-4 shadow-sm hover:border-[#F04B35] transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#F2B8C6]/40 text-[#49372F] flex items-center justify-center shrink-0 border border-[#DFD0BE]">
              <Bookmark className="w-6 h-6 text-[#F04B35]" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#F04B35]">
                {bookmarkCount}
              </p>
              <p className="text-xs font-bold text-[#795548]">
                Saved Architecture Guides
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#DFD0BE] bg-[#FFF8EE] p-6 flex items-center gap-4 shadow-sm hover:border-[#63284F] transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#9DD8EB]/30 text-[#49372F] flex items-center justify-center shrink-0 border border-[#DFD0BE]">
              <Trophy className="w-6 h-6 text-[#FF8A24]" />
            </div>
            <div>
              <p className="text-2xl font-black text-[#63284F]">
                {LEARNING_PATHS.length}
              </p>
              <p className="text-xs font-bold text-[#795548]">
                Active Learning Paths
              </p>
            </div>
          </div>
        </div>

        {/* Learning Paths Status Section (Progress panels: Deep plum #63284F with #FFF5E6 text) */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-serif text-[#174B35] flex items-center gap-2">
              <Route className="w-6 h-6 text-[#F04B35]" />
              <span>Curriculum Roadmaps in Progress</span>
            </h2>
            <Link
              href="/paths"
              className="text-xs font-bold text-[#174B35] hover:text-[#F04B35] transition-colors"
            >
              View All Paths →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEARNING_PATHS.map((path) => {
              const completed = pathsProgress[path.slug] || 0;
              const total = path.steps.length;
              const pct = Math.round((completed / total) * 100);

              return (
                <div
                  key={path.slug}
                  className="rounded-2xl border border-[#803366] bg-[#63284F] text-[#FFF5E6] p-6 flex flex-col justify-between shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#4D1938] text-[#FF8190] border border-[#803366]">
                        {path.difficulty}
                      </span>
                      <span className="text-xs font-bold text-[#FF8A24] font-mono">
                        {completed}/{total} ({pct}%)
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-serif text-[#FFF5E6] mb-2">
                      {path.title}
                    </h3>

                    <p className="text-sm font-serif-body text-[#FFF5E6]/85 line-clamp-2 mb-4 leading-relaxed font-normal">
                      {path.description}
                    </p>

                    <div className="w-full h-2.5 bg-[#4D1938] rounded-full overflow-hidden mb-6 border border-[#803366]">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF8A24] to-[#F04B35] transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/paths/${path.slug}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F04B35] hover:bg-[#d63a25] text-white transition-colors shadow-xs"
                    >
                      <span>{pct === 100 ? 'Review Path' : 'Continue Path'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Saved Resources Section: Soft Cream Cards */}
        <section>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#DFD0BE]">
            <h2 className="text-2xl font-bold font-serif text-[#174B35] flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-[#F04B35]" />
              <span>Saved Architecture Deep Dives ({bookmarkCount})</span>
            </h2>
            {bookmarkCount > 0 && (
              <Link
                href="/bookmarks"
                className="text-xs font-bold text-[#174B35] hover:text-[#F04B35] transition-colors"
              >
                Manage Saved Items →
              </Link>
            )}
          </div>

          {savedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedArticles.slice(0, 3).map((article) => (
                <ArticleCard key={article.slug} article={article} variant="cream" />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#DFD0BE] bg-[#FFF8EE] p-8 sm:p-12 text-center text-sm text-[#49372F] shadow-sm">
              <Bookmark className="w-8 h-8 text-[#FF8A24] mx-auto mb-3" />
              <p className="font-semibold text-base text-[#174B35] mb-1">
                You haven&apos;t saved any articles yet.
              </p>
              <p className="text-xs text-[#795548] mb-4">
                Explore our engineering curriculum and bookmark deep dives to create your personal reference shelf.
              </p>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#174B35] hover:bg-[#123a29] text-[#FFF8EE] transition-colors shadow-sm"
              >
                <Compass className="w-4 h-4 text-[#FF8A24]" />
                <span>Explore the article library</span>
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
