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
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#090d16' },
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
        {/* Anti-flash theme script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('devatlas-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
        <SkipLink />
        <RootProviders>
          <Header />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </RootProviders>
      </body>
    </html>
  );
}
