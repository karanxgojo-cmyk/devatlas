import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TOPICS, getTopicBySlug } from '@/lib/content/topics';
import { getArticlesByCategory } from '@/lib/content/articles';
import { LEARNING_PATHS } from '@/lib/content/paths';
import { ArticleCard } from '@/components/article/article-card';
import { constructMetadata, generateBreadcrumbJsonLd } from '@/lib/seo';
import { BookOpen, Route, ArrowRight, ArrowLeft } from 'lucide-react';

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TOPICS.map((topic) => ({
    slug: topic.slug,
  }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    return {
      title: 'Topic Not Found | DevAtlas',
      description: 'The requested topic category could not be found.',
    };
  }

  return constructMetadata({
    title: `${topic.title} Engineering Guides`,
    description: topic.description,
    path: `/topics/${topic.slug}`,
  });
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const articles = getArticlesByCategory(topic.slug);
  const relatedPaths = LEARNING_PATHS.filter((p) => topic.learningPathSlugs.includes(p.slug));

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', item: '/' },
    { name: 'Topics', item: '/explore' },
    { name: topic.title, item: `/topics/${topic.slug}` },
  ]);

  return (
    <>
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
            <span>Back to Overview</span>
          </Link>
        </div>

        {/* Topic Header Banner */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-10 mb-10 shadow-xs">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Engineering Discipline
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              {topic.title}
            </h1>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {topic.description}
            </p>

            {/* Featured Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Core Focus:
              </span>
              {topic.featuredTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/explore?tag=${encodeURIComponent(tag)}`}
                  className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Related Learning Paths */}
        {relatedPaths.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Route className="w-4 h-4 text-blue-600" />
              <span>Recommended Learning Paths for {topic.title}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedPaths.map((p) => (
                <Link
                  key={p.slug}
                  href={`/paths/${p.slug}`}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      {p.difficulty} • {p.totalMinutes} mins
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-0.5">
                      {p.title}
                    </h3>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Articles in Topic */}
        <div>
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Published Architecture Guides ({articles.length})</span>
            </h2>

            <Link
              href={`/explore?category=${topic.slug}`}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Filter in Explore Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
