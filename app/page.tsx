import type { Metadata } from 'next';
import { SketchbookTemplatePage } from '@/components/sketchbook/sketchbook-template-page';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: `${SITE_NAME} — Engineering Knowledge Atlas`,
  description: 'An interactive engineering knowledge platform for developers and students, featuring architecture diagrams, learning paths, and curriculum folios.',
};

export default function HomePage() {
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
      <main id="main-content" className="w-full flex-1 flex flex-col bg-[var(--background)] min-h-screen">
        <SketchbookTemplatePage />
      </main>
    </>
  );
}
