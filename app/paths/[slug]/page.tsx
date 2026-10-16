import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LEARNING_PATHS, getPathBySlug } from '@/lib/content/paths';
import { InteractiveLearningJourney } from '@/components/paths/interactive-learning-journey';
import { constructMetadata, generateCourseJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import { Route, Clock, ArrowLeft, BarChart3 } from 'lucide-react';

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Navigation back */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Path Hero */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-10 mb-8 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Route className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Curated Curriculum &bull; Lenis &amp; ScrollTrigger Synchronized
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            {path.title}
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-3xl">
            {path.description}
          </p>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 flex-wrap pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
              <BarChart3 className="w-3.5 h-3.5" />
              Level: {path.difficulty}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Estimated Duration: {path.totalMinutes} minutes
            </span>
            <span>&bull;</span>
            <span>{path.steps.length} connected architecture stages</span>
          </div>
        </div>

        {/* Signature Interactive Scroll-Driven Learning Journey */}
        <InteractiveLearningJourney path={path} />
      </main>
    </>
  );
}
