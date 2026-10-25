import type { Metadata } from 'next';
import { Inter, Spectral } from 'next/font/google';
import '@/styles/globals.css';
import 'katex/dist/katex.min.css';
import Masthead from '@/components/Masthead';
import Footer from '@/components/Footer';
import ThemeScript from '@/components/ThemeScript';
import { site } from '@/lib/site';
import { withBasePath } from '@/lib/paths';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spectral = Spectral({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const siteUrl = 'https://amanasci.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author, url: site.authorUrl }],
  icons: {
    icon: [
      { url: withBasePath('/assets/images/favicon-32x32.png'), sizes: '32x32' },
      { url: withBasePath('/assets/images/favicon-16x16.png'), sizes: '16x16' },
    ],
    apple: withBasePath('/assets/images/apple-touch-icon.png'),
  },
  openGraph: {
    title: site.name,
    description: site.description,
    siteName: site.name,
    locale: 'en_US',
    type: 'website',
    url: siteUrl,
    images: [{ url: withBasePath('/assets/images/background.jpg') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    images: [withBasePath('/assets/images/background.jpg')],
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
      className={`${inter.variable} ${spectral.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeScript />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="site-shell">
          <Masthead />
          <main id="main" className="site-main">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
