import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { RootProviders } from '@/components/providers/root-providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SkipLink } from '@/components/layout/skip-link';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/seo';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F0E8' },
    { media: '(prefers-color-scheme: dark)', color: '#F5F0E8' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — A High-Performance Engineering Knowledge Platform`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Engineering',
    'Next.js 15',
    'React 19',
    'Lenis Smooth Scrolling',
    'Computer Science',
    'Machine Learning',
    'Web Performance',
    'Core Web Vitals',
    'System Design',
  ],
  authors: [{ name: 'DevAtlas Editorial Team' }],
  creator: 'DevAtlas',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: `${SITE_NAME} — Learn. Build. Share.`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — A High-Performance Engineering Knowledge Platform`,
    description: SITE_DESCRIPTION,
    creator: '@devatlas',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Anti-flash theme script - ensures immediate theme resolution with zero flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('devatlas-theme');
                  if (saved === 'dark-navy') {
                    saved = 'light';
                    localStorage.setItem('devatlas-theme', 'light');
                  }
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = saved === 'dark' || (!saved && prefersDark) || (saved === 'system' && prefersDark);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans selection:bg-[#F04B35] selection:text-white relative transition-colors duration-200">
        <div className="sketchbook-wash" aria-hidden="true" />
        <SkipLink />
        <RootProviders>
          <Header />
          <div className="flex-1 flex flex-col relative z-0">{children}</div>
          <Footer />
        </RootProviders>
      </body>
    </html>
  );
}
