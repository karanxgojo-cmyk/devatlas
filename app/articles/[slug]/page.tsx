import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getArticleBySlug,
  getAllArticles,
  getRelatedArticles,
} from '@/lib/content/articles';
import { ArticleView } from '@/components/article/article-view';
import {
  constructMetadata,
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
} from '@/lib/seo';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | DevAtlas',
      description: 'The requested engineering article could not be found.',
    };
  }

  return constructMetadata({
    title: article.title,
    description: article.summary,
    path: `/articles/${article.slug}`,
    type: 'article',
    publishedTime: article.publishedAt,
    authors: [article.author.name],
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = getAllArticles();
  const currentIndex = allArticles.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : undefined;
  const nextArticle =
    currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : undefined;

  const relatedArticles = getRelatedArticles(article.relatedArticleSlugs);

  // Generate Schema.org JSON-LD
  const articleJsonLd = generateArticleJsonLd(article);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', item: '/' },
    { name: 'Articles', item: '/explore' },
    { name: article.categoryName, item: `/topics/${article.category}` },
    { name: article.title, item: `/articles/${article.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <ArticleView
        article={article}
        relatedArticles={relatedArticles}
        prevArticle={prevArticle}
        nextArticle={nextArticle}
      />
    </>
  );
}
