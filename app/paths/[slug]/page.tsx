import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LEARNING_PATHS, getPathBySlug } from '@/lib/content/paths';
import { InteractiveLearningJourney } from '@/components/paths/interactive-learning-journey';
import { constructMetadata, generateCourseJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { Route, Clock, ArrowLeft, BarChart3, BookOpen, ExternalLink } from 'lucide-react';

interface PathPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LEARNING_PATHS.map((path) => ({
    slug: path.slug,
  }));
}

export async function generateMetadata({ params }: PathPageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = getPathBySlug(slug);

  if (!path) {
    return {
      title: 'Learning Path Not Found | DevAtlas',
      description: 'The requested engineering curriculum could not be found.',
    };
  }

  return constructMetadata({
    title: `${path.title} Curriculum`,
    description: path.description,
    path: `/paths/${path.slug}`,
  });
}

export default async function PathPage({ params }: PathPageProps) {
  const { slug } = await params;
  const path = getPathBySlug(slug);

  if (!path) {
    notFound();
  }

  const courseJsonLd = generateCourseJsonLd(path);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', item: '/' },
    { name: 'Learning Paths', item: '/explore' },
    { name: path.title, item: `/paths/${path.slug}` },
  ]);

  return (
    <div className="flex-1 bg-[#F5F0E8] min-h-screen text-[#49372F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Navigation back */}
        <div className="mb-6">
          <Link
            href="/paths"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174B35] hover:text-[#F04B35] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Learning Paths</span>
          </Link>
        </div>

        {/* Path Introduction: Forest Green #174B35 with Warm Cream #FFF5E6 text */}
        <div className="card-morph rounded-2xl border border-[#416C53] bg-[#174B35] text-[#FFF5E6] p-6 sm:p-10 mb-8 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <Route className="w-4 h-4 text-[#FF8A24]" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFF5E6] bg-[#FFF5E6]/10 px-2.5 py-0.5 rounded-full border border-[#D8E9DA]/30">
              Curated Curriculum &bull; Lenis &amp; ScrollTrigger Synchronized
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#FFF5E6] tracking-tight mb-3">
            {path.title}
          </h1>

          <p className="text-base font-serif-body text-[#D8E9DA] leading-relaxed mb-6 max-w-3xl font-normal">
            {path.description}
          </p>

          <div className="flex items-center gap-4 text-xs font-medium text-[#D8E9DA] flex-wrap pt-4 border-t border-[#416C53]">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5E6]/15 text-[#FFF5E6] font-semibold border border-[#D8E9DA]/30">
              <BarChart3 className="w-3.5 h-3.5 text-[#FF8A24]" />
              Level: {path.difficulty}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#FF8A24]" />
              Estimated Duration: {path.totalMinutes} minutes
            </span>
            <span>&bull;</span>
            <span>{path.steps.length} connected architecture stages</span>
          </div>

          {path.roadmapReferenceUrl && (
            <div className="mt-4 p-3 rounded-lg border border-[#D8E9DA]/30 bg-[#FFF5E6]/10 text-[#FFF5E6] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#FF8A24] shrink-0" />
                <span>Curriculum aligned with industry-standard roadmap.sh specifications and verified educational resources.</span>
              </span>
              <a
                href={path.roadmapReferenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#FF8A24] hover:text-[#FFF5E6] underline shrink-0"
              >
                <span>View roadmap.sh Syllabus</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Signature Interactive Scroll-Driven Learning Journey */}
        <InteractiveLearningJourney path={path} />
      </main>
    </div>
  );
}
