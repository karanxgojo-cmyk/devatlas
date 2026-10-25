import { Metadata } from 'next';
import Link from 'next/link';
import { LEARNING_PATHS } from '@/lib/content/paths';
import { constructMetadata } from '@/lib/seo';
import { Route, Clock, BarChart3, ArrowRight, CheckCircle } from 'lucide-react';
import { EditorialTracksSection } from '@/components/home/editorial-tracks-section';
import { EditorialEcosystemSection } from '@/components/home/editorial-ecosystem-section';

export const metadata: Metadata = constructMetadata({
  title: 'Curated Engineering Roadmaps & Learning Paths',
  description: 'Step-by-step engineering paths synchronized with Lenis smooth scrolling and verified external learning resources from MDN, GeeksforGeeks, and roadmap.sh.',
  path: '/paths',
});

export default function PathsIndexPage() {
  return (
    <div className="flex-1 bg-[#63284F] min-h-screen text-[#FFF5E6]">
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-[#FF8190]/30">
          <div className="flex items-center gap-2 mb-2">
            <Route className="w-5 h-5 text-[#FF8190]" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FF8190]">
              Structured Curricula
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFF5E6] tracking-tight">
            Engineering Learning Paths.{' '}
            <span className="text-[#FF8190]">Zero to Mastery.</span>
          </h1>
          <p className="text-sm text-[#FFF5E6]/90 mt-2 max-w-2xl leading-relaxed font-normal">
            Comprehensive, stage-by-stage roadmaps designed to take learners from foundational principles to production-grade engineering mastery. Each stage links to verified, free external resources.
          </p>
        </div>

        {/* Grid of Learning Paths in Soft Cream #FFF8EE Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARNING_PATHS.map((path) => {
            const isFullRoadmap = Boolean(path.roadmapReferenceUrl);

            return (
              <div
                key={path.slug}
                className="rounded-2xl border border-[#DFD0BE] bg-[#FFF8EE] p-6 flex flex-col justify-between hover:shadow-xl transition-all shadow-md group text-[#49372F]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F2B8C6]/50 text-[#49372F] border border-[#DFD0BE]">
                      {path.difficulty}
                    </span>
                    {isFullRoadmap && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#9DD8EB]/40 text-[#174B35] border border-[#9DD8EB] flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-[#174B35]" />
                        roadmap.sh Verified
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-[#63284F] mb-2 group-hover:text-[#F04B35] transition-colors leading-tight">
                    <Link href={`/paths/${path.slug}`}>
                      {path.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-[#49372F] line-clamp-3 mb-6 leading-relaxed font-normal">
                    {path.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-[#795548] mb-6">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#F04B35]" />
                      <span className="text-[#49372F] font-medium">{path.totalMinutes} mins</span>
                    </span>
                    <span className="text-[#DFD0BE]">&bull;</span>
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-3.5 h-3.5 text-[#174B35]" />
                      <span className="text-[#174B35] font-semibold">{path.steps.length} Stages</span>
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DFD0BE] flex items-center justify-between">
                  <Link
                    href={`/paths/${path.slug}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#174B35] hover:bg-[#123d2b] text-[#FFFFFF] transition-all shadow-md group-hover:bg-[#174B35]"
                  >
                    <span>Start Learning Journey</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FF8A24]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Sequential 5-Tier Learning Pathways */}
      <EditorialTracksSection />

      {/* Verified Open Knowledge Ecosystem */}
      <EditorialEcosystemSection />
    </div>
  );
}
