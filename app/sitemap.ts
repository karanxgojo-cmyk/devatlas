import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/content/articles';
import { TOPICS } from '@/lib/content/topics';
import { LEARNING_PATHS } from '@/lib/content/paths';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  const BUILD_DATE = new Date('2026-04-10T00:00:00Z');

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: BUILD_DATE,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/explore`,
      lastModified: BUILD_DATE,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/topics`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/paths`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/dashboard`,
      lastModified: BUILD_DATE,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  const topicRoutes: MetadataRoute.Sitemap = TOPICS.map((topic) => ({
    url: `${SITE_URL}/topics/${topic.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const pathRoutes: MetadataRoute.Sitemap = LEARNING_PATHS.map((path) => ({
    url: `${SITE_URL}/paths/${path.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...topicRoutes, ...pathRoutes, ...articleRoutes];
}
