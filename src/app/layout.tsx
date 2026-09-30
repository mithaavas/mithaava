import type { Metadata, Viewport } from 'next';
import { Fraunces, Figtree, Great_Vibes } from 'next/font/google';
import { Providers } from '@/components/layout/Providers';
import { siteConfig } from '@/config/site';
import { deliveryConfig } from '@/config/delivery';
import { bakeryJsonLd } from '@/lib/seo';
import '@/styles/globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.homeTitle,
    template: `%s | ${siteConfig.brand}`,
  },
  description: siteConfig.seo.homeDescription,
  applicationName: siteConfig.brand,
  keywords: [...siteConfig.seo.homeKeywords],
  openGraph: {
    siteName: siteConfig.brand,
    title: siteConfig.seo.homeTitle,
    description: siteConfig.seo.homeDescription,
    url: '/',
    images: [{ url: siteConfig.heroImage, width: 1280, height: 854, alt: 'Mithaava Ferrero Rocher cake' }],
    locale: 'en_IN',
    type: 'website',
  },
  other: {
    'geo.region': 'IN-HR',
    'geo.placename': `${siteConfig.address.locality}, ${siteConfig.address.city}`,
    'geo.position': `${deliveryConfig.storeLocation.lat};${deliveryConfig.storeLocation.lng}`,
    ICBM: `${deliveryConfig.storeLocation.lat}, ${deliveryConfig.storeLocation.lng}`,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/icons/mithaava-icon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/icons/mithaava-icon-96.png', type: 'image/png', sizes: '96x96' },
      { url: '/icons/mithaava-icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/favicon.ico',
    apple: { url: '/icons/apple-touch-icon.png', sizes: '180x180' },
  },
};

export const viewport: Viewport = {
  themeColor: '#0E6B75',
};

const jsonLd = bakeryJsonLd();

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${figtree.variable} ${greatVibes.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-cream-50 font-sans text-cocoa-800 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
