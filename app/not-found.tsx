import Link from 'next/link';
import { Compass, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#49372F] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 text-center">
      <main
        id="main-content"
        className="max-w-md w-full space-y-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-[#F2B8C6]/40 text-[#49372F] flex items-center justify-center mx-auto shadow-sm border border-[#DFD0BE]">
          <Compass className="w-8 h-8 text-[#FF8A24]" aria-hidden="true" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#F04B35]">
            Error 404
          </span>
          <h1 className="text-3xl font-extrabold text-[#174B35] tracking-tight mt-1">
            Resource Not Found
          </h1>
          <p className="text-sm text-[#49372F] mt-2 leading-relaxed">
            The engineering article, topic, or path you requested does not exist or has been relocated to another slug.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#174B35] hover:bg-[#123a29] text-[#FFF8EE] transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold border border-[#DFD0BE] bg-[#FFF8EE] text-[#174B35] hover:bg-[#F5F0E8] transition-colors"
          >
            <Search className="w-4 h-4 text-[#FF8A24]" />
            <span>Search Catalog</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
