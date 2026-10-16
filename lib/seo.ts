import { Article, LearningPath } from '@/types/content';
import { Metadata } from 'next';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://devatlas.dev';
export const SITE_NAME = 'DevAtlas';
export const SITE_TAGLINE = 'Learn. Build. Share.';
export const SITE_DESCRIPTION = 'A high-performance engineering knowledge platform for developers, engineering students, and self-learners.';

export function constructMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = '',
  image = '/images/og-default.png',
  type = 'website',
  publishedTime,
  authors,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  authors?: string[];
}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`;
  const canonicalUrl = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: image.startsWith('http') ? image : `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      type,
      ...(publishedTime && { publishedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.startsWith('http') ? image : `${SITE_URL}${image}`],
      creator: '@devatlas',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateArticleJsonLd(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.summary,
    url: `${SITE_URL}/articles/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
      description: article.author.bio,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/articles/${article.slug}`,
    },
    keywords: article.tags.join(', '),
    proficiencyLevel: article.difficulty,
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.item.startsWith('http') ? it.item : `${SITE_URL}${it.item}`,
    })),
  };
}

export function generateCourseJsonLd(path: LearningPath) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: path.title,
    description: path.description,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
    },
  };
}
