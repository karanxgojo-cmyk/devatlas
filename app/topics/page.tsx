import { Metadata } from 'next';
import Link from 'next/link';
import { TOPICS } from '@/lib/content/topics';
import { getArticlesByCategory, getAllArticles } from '@/lib/content/articles';
import { LEARNING_PATHS } from '@/lib/content/paths';
import { CategoriesShowcase } from '@/components/home/categories-showcase';
import { constructMetadata } from '@/lib/seo';
import {
  Globe,
  Cpu,
  Terminal,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Engineering Topics & Core Disciplines',
  description: 'Explore DevAtlas topics: Web Development, Machine Learning, Computer Science, and Engineering Projects.',
  path: '/topics',
});

const topicThemes: Record<string, { icon: React.ReactNode; headerBg: string; badge: string; accent: string }> = {
  'web-dev': {
    icon: <Globe className="w-6 h-6 text-[#FFF5E6]" />,
    headerBg: 'bg-[#174B35] text-[#FFF5E6]',
    badge: 'bg-[#FFF5E6]/20 text-[#FFF5E6] border-[#D8E9DA]/30',
    accent: 'text-[#174B35]',
  },
  'ai-ml': {
    icon: <Cpu className="w-6 h-6 text-[#FFF5E6]" />,
    headerBg: 'bg-[#63284F] text-[#FFF5E6]',
    badge: 'bg-[#FFF5E6]/20 text-[#FFF5E6] border-[#FF8190]/30',
    accent: 'text-[#63284F]',
  },
  'computer-science': {
    icon: <Terminal className="w-6 h-6 text-[#FFF5E6]" />,
    headerBg: 'bg-[#174B35] text-[#FFF5E6]',
    badge: 'bg-[#FFF5E6]/20 text-[#FFF5E6] border-[#D8E9DA]/30',
    accent: 'text-[#174B35]',
  },
  'engineering-projects': {
    icon: <Layers className="w-6 h-6 text-[#FFF5E6]" />,
    headerBg: 'bg-[#F04B35] text-[#FFF5E6]',
    badge: 'bg-[#FFF5E6]/20 text-[#FFF5E6] border-[#FFF5E6]/30',
    accent: 'text-[#F04B35]',
  },
};

export default function TopicsIndexPage() {
  return (
    <div className="flex-1 bg-[#F5F0E8] min-h-screen text-[#49372F]">
      {/* Page Introduction: Forest Green #174B35 with Warm Cream #FFF5E6 Text */}
      <section className="bg-[#174B35] text-[#FFF5E6] py-12 border-b border-[#416C53] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-5 h-5 text-[#FF8A24]" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D8E9DA]">
              Disciplines &amp; Domains
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#FFF5E6] tracking-tight">
            Engineering Topics
          </h1>
          <p className="text-base font-serif-body text-[#D8E9DA] mt-2 max-w-2xl leading-relaxed">
            Structured technical domains spanning foundational theory, production engineering, and applied architectural systems.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Grid of Topics: Soft Cream #FFF8EE Cards with Domain-Colored Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TOPICS.map((topic) => {
            const articles = getArticlesByCategory(topic.slug);
            const paths = LEARNING_PATHS.filter((p) => topic.learningPathSlugs.includes(p.slug));
            const theme = topicThemes[topic.slug] || topicThemes['web-dev'];

            return (
              <div
                key={topic.slug}
                className="rounded-2xl border border-[#DFD0BE] bg-[#FFF8EE] overflow-hidden flex flex-col justify-between transition-all group hover:border-[#E98898] shadow-md hover:shadow-lg"
              >
                {/* Domain Header Band */}
                <div className={`p-6 ${theme.headerBg} flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20">
                      {theme.icon}
                    </div>
                    <div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${theme.badge}`}>
                        Discipline
                      </span>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFF5E6] mt-1">
                        <Link href={`/topics/${topic.slug}`} className="hover:underline">
                          {topic.title}
                        </Link>
                      </h2>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#FFF5E6] bg-black/20 px-3 py-1 rounded-full shrink-0">
                    {articles.length} Guides
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-[#49372F] leading-relaxed mb-6 font-normal">
                      {topic.description}
                    </p>

                    {/* Featured Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {topic.featuredTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-[#9DD8EB]/30 text-[#49372F] border border-[#DFD0BE]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#DFD0BE] flex items-center justify-between">
                    <Link
                      href={`/topics/${topic.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#174B35] hover:text-[#F04B35] transition-colors"
                    >
                      <span>Explore Category Curriculum</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <span className="text-xs font-semibold text-[#795548]">
                      {paths.length} {paths.length === 1 ? 'Path' : 'Paths'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Architecture Showcase with Morphing Visual Frames */}
      <CategoriesShowcase topics={TOPICS} articles={getAllArticles()} />
    </div>
  );
}
