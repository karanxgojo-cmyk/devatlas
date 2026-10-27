import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/content/articles';
import { TOPICS } from '@/lib/content/topics';
import { LEARNING_PATHS } from '@/lib/content/paths';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://devatlas-kohl.vercel.app';

  // 1. Core public indexable landing pages (excluding private /dashboard, /bookmarks, /admin)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: domain,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${domain}/explore`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${domain}/topics`,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${domain}/paths`,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];

  // 2. Discipline / Category topic pages
  const topicRoutes: MetadataRoute.Sitemap = TOPICS.map((topic) => ({
    url: `${domain}/topics/${topic.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 3. Learning path and sequential roadmap pages
  const pathRoutes: MetadataRoute.Sitemap = LEARNING_PATHS.map((path) => ({
    url: `${domain}/paths/${path.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 4. Individual technical deep dives & foundation guides with accurate editorial lastmod
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => {
    const entry: MetadataRoute.Sitemap[number] = {
      url: `${domain}/articles/${article.slug}`,
      changeFrequency: 'weekly',
      priority: 0.8,
    };

    if (article.updatedAt) {
      const parsedDate = new Date(article.updatedAt);
      if (!isNaN(parsedDate.getTime())) {
        entry.lastModified = parsedDate;
      }
    }

    return entry;
  });

  return [...staticRoutes, ...topicRoutes, ...pathRoutes, ...articleRoutes];
}

