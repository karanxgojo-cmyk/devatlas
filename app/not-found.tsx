import Link from 'next/link';
import { Compass, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 text-center"
    >
      <div className="max-w-md w-full space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-xs border border-blue-100 dark:border-blue-900">
          <Compass className="w-8 h-8" aria-hidden="true" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Error 404
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Resource Not Found
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            The engineering article, topic, or path you requested does not exist or has been relocated to another slug.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search Catalog</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
