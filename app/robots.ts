import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://devatlas-kohl.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/dashboard', '/bookmarks'],
      },
    ],
    sitemap: `${domain}/sitemap.xml`,
  };
}
