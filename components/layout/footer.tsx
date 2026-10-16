import Link from 'next/link';
import { Compass, ExternalLink } from 'lucide-react';
import { TOPICS } from '@/lib/content/topics';
import { LEARNING_PATHS } from '@/lib/content/paths';

function GithubIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-lg tracking-tight"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                <Compass className="w-4 h-4" aria-hidden="true" />
              </div>
              <span>DevAtlas</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-slate-600 dark:text-slate-400">
              A high-performance engineering knowledge platform for developers, engineering students, and self-learners. Learn reliable technical concepts, follow structured paths, and build better systems.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Learn. Build. Share.
              </span>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                WCAG 2.2 AA Compliant
              </span>
            </div>
          </div>

          {/* Topics */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Topics
            </h2>
            <ul className="space-y-2.5 text-sm">
              {TOPICS.map((topic) => (
                <li key={topic.slug}>
                  <Link
                    href={`/topics/${topic.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {topic.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/explore"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-blue-600 dark:text-blue-400"
                >
                  All Articles →
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning Paths */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Learning Paths
            </h2>
            <ul className="space-y-2.5 text-sm">
              {LEARNING_PATHS.map((path) => (
                <li key={path.slug}>
                  <Link
                    href={`/paths/${path.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1"
                  >
                    {path.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-blue-600 dark:text-blue-400"
                >
                  My Progress Dashboard →
                </Link>
              </li>
            </ul>
          </div>

          {/* Engineering & Smooth Scrolling */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Architecture & Stack
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://github.com/darkroomengineering/lenis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>Lenis Smooth Scroll</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <Link
                  href="/articles/building-devatlas-lenis-smooth-scrolling"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xs text-blue-600 dark:text-blue-400"
                >
                  Read Lenis Integration Case Study
                </Link>
              </li>
              <li>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>Next.js App Router</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <Link
                  href="/admin/preview"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  MDX Authoring Preview
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 dark:text-slate-500">
            © 2026 DevAtlas. Built with Next.js, TypeScript, Tailwind CSS & Lenis.
          </p>
          <div className="flex items-center gap-6 text-slate-500 dark:text-slate-400">
            <Link href="/sitemap.xml" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Sitemap
            </Link>
            <Link href="/robots.txt" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Robots.txt
            </Link>
            <a
              href="https://github.com/darkroomengineering/lenis"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Lenis by Darkroom</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
