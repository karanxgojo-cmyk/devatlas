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

  const topicThemeMap: Record<string, { banner: string; badge: string; dot: string; tagPill: string }> = {
    'web-dev': {
      banner: 'bg-[#174B35] text-[#FFF5E6] border-[#416C53] shadow-md',
      badge: 'bg-[#FFF5E6]/15 text-[#FFF5E6] border-[#D8E9DA]/30',
      dot: 'bg-[#FF8A24]',
      tagPill: 'bg-[#FFF5E6]/10 hover:bg-[#FFF5E6]/20 text-[#FFF5E6] border-[#D8E9DA]/30',
    },
    'web-development': {
      banner: 'bg-[#174B35] text-[#FFF5E6] border-[#416C53] shadow-md',
      badge: 'bg-[#FFF5E6]/15 text-[#FFF5E6] border-[#D8E9DA]/30',
      dot: 'bg-[#FF8A24]',
      tagPill: 'bg-[#FFF5E6]/10 hover:bg-[#FFF5E6]/20 text-[#FFF5E6] border-[#D8E9DA]/30',
    },
    'ai-ml': {
      banner: 'bg-[#63284F] text-[#FFF5E6] border-[#4D1938] shadow-md',
      badge: 'bg-[#FFF5E6]/15 text-[#FFF5E6] border-[#FF8190]/30',
      dot: 'bg-[#FF8190]',
      tagPill: 'bg-[#FFF5E6]/10 hover:bg-[#FFF5E6]/20 text-[#FFF5E6] border-[#FF8190]/30',
    },
    'ai-machine-learning': {
      banner: 'bg-[#63284F] text-[#FFF5E6] border-[#4D1938] shadow-md',
      badge: 'bg-[#FFF5E6]/15 text-[#FFF5E6] border-[#FF8190]/30',
      dot: 'bg-[#FF8190]',
      tagPill: 'bg-[#FFF5E6]/10 hover:bg-[#FFF5E6]/20 text-[#FFF5E6] border-[#FF8190]/30',
    },
    'computer-science': {
      banner: 'bg-[#174B35] text-[#FFF5E6] border-[#416C53] shadow-md',
      badge: 'bg-[#FFF5E6]/15 text-[#FFF5E6] border-[#D8E9DA]/30',
      dot: 'bg-[#FF8A24]',
      tagPill: 'bg-[#FFF5E6]/10 hover:bg-[#FFF5E6]/20 text-[#FFF5E6] border-[#D8E9DA]/30',
    },
    'engineering-projects': {
      banner: 'bg-[#F04B35] text-[#FFF5E6] border-[#E7B4A0] shadow-md',
      badge: 'bg-[#FFF5E6]/15 text-[#FFF5E6] border-[#FFF5E6]/30',
      dot: 'bg-[#FFF5E6]',
      tagPill: 'bg-[#FFF5E6]/10 hover:bg-[#FFF5E6]/20 text-[#FFF5E6] border-[#FFF5E6]/30',
    },
  };
  const theme = topicThemeMap[topic.slug] || topicThemeMap['web-dev'];

  return (
    <div className="flex-1 bg-[#F5F0E8] min-h-screen text-[#49372F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Navigation back */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174B35] hover:text-[#F04B35] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </Link>
        </div>

        {/* Topic Header Banner: Forest green / Plum with Warm cream text */}
        <div className={`card-morph rounded-2xl border p-6 sm:p-10 mb-10 ${theme.banner}`}>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className={`w-2 h-2 rounded-full ${theme.dot}`}></span>
              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${theme.badge}`}>
                Engineering Discipline
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight mb-3 text-[#FFF5E6]">
              {topic.title}
            </h1>

            <p className="text-base font-serif-body opacity-90 leading-relaxed mb-6 font-normal text-[#FFF5E6]">
              {topic.description}
            </p>

            {/* Featured Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-85 text-[#FFF5E6]">
                Core Focus:
              </span>
              {topic.featuredTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/explore?tag=${encodeURIComponent(tag)}`}
                  className={`text-xs font-mono px-2.5 py-1 rounded transition-colors border ${theme.tagPill}`}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Related Learning Paths: Soft Cream #FFF8EE Cards with Deep Plum / Forest Green Accents */}
        {relatedPaths.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-bold text-[#174B35] mb-4 flex items-center gap-2">
              <Route className="w-4 h-4 text-[#F04B35]" />
              <span>Recommended Learning Paths for {topic.title}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedPaths.map((p) => (
                <Link
                  key={p.slug}
                  href={`/paths/${p.slug}`}
                  className="card-morph p-5 rounded-xl border border-[#DFD0BE] bg-[#FFF8EE] hover:border-[#E98898] shadow-sm transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-[#F04B35] uppercase tracking-wider">
                      {p.difficulty} • {p.totalMinutes} mins
                    </span>
                    <h3 className="text-sm font-bold text-[#174B35] group-hover:text-[#F04B35] transition-colors mt-0.5">
                      {p.title}
                    </h3>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#174B35] group-hover:text-[#F04B35] group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Articles in Topic */}
        <div>
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#DFD0BE]">
            <h2 className="text-xl font-bold text-[#174B35] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#174B35]" />
              <span>Published Architecture Guides ({articles.length})</span>
            </h2>

            <Link
              href={`/explore?category=${topic.slug}`}
              className="text-xs font-semibold text-[#F04B35] hover:text-[#FF8A24] transition-colors"
            >
              Filter in Explore Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="cream" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
