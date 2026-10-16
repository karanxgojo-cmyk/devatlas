import Link from 'next/link';
import { getFeaturedArticles, getRecentArticles, getAllArticles } from '@/lib/content/articles';
import { TOPICS } from '@/lib/content/topics';
import { LEARNING_PATHS } from '@/lib/content/paths';
import { ArticleCard } from '@/components/article/article-card';
import { NewsletterCard } from '@/components/home/newsletter-card';
import { HeroSection } from '@/components/home/hero-section';
import { CategoriesShowcase } from '@/components/home/categories-showcase';
import { FeaturedJourneySection } from '@/components/home/featured-journey-section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Sparkles, ArrowRight } from 'lucide-react';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

export default function HomePage() {
  const featuredArticles = getFeaturedArticles();
  const recentArticles = getRecentArticles(6);
  const allArticles = getAllArticles();

  // Structured data JSON-LD for WebSite
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'A High-Performance Engineering Knowledge Platform',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/explore?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" className="flex-1">
        {/* SECTION A: HERO */}
        <HeroSection />

        {/* SECTION B: EXPLORE THE ENGINEERING WORLD (CURATED CATEGORIES) */}
        <CategoriesShowcase topics={TOPICS} articles={allArticles} />

        {/* SECTION C: SIGNATURE FEATURED LEARNING JOURNEY (PINNED SCROLL-DRIVEN UI) */}
        <FeaturedJourneySection paths={LEARNING_PATHS} />

        {/* SECTION D: FEATURED ARCHITECTURE DEEP DIVES */}
        <section className="py-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal variant="fadeUp" className="mb-12">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Editor&apos;s Selection</span>
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
                    Featured Architecture Deep Dives
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-xl">
                    Peer-reviewed technical explorations into compiler design, distributed storage engines, vector search algorithms, and modern frontend pipelines.
                  </p>
                </div>
                <Link
                  href="/explore?sort=popular"
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5 shrink-0"
                >
                  <span>View most read articles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.slice(0, 6).map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* SECTION E: RECENT ARTICLES */}
        <section className="py-20 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#080d17]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal variant="fadeUp" className="mb-12">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Fresh Publications
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
                    Recently Published Guides
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-xl">
                    Stay updated with our newest production case studies, system benchmarks, and implementation tutorials.
                  </p>
                </div>
                <Link
                  href="/explore?sort=newest"
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5 shrink-0"
                >
                  <span>View all {allArticles.length} publications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* SECTION F: CONTINUE LEARNING CTA */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal variant="scaleUp">
              <NewsletterCard />
            </ScrollReveal>
          </div>
        </section>
      </main>
    </>
  );
}
