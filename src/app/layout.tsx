import type { Metadata, Viewport } from 'next';
import { Fraunces, Figtree, Great_Vibes } from 'next/font/google';
import { Providers } from '@/components/layout/Providers';
import { siteConfig } from '@/config/site';
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
  metadataBase: new URL('https://mithaava.example'),
  title: {
    default: `${siteConfig.brand} — ${siteConfig.taglines.primary}`,
    template: `%s · ${siteConfig.brand}`,
  },
  description:
    'Order fresh cakes from Mithaava in Sector 46, Gurugram. Open 24 hours — browse the menu and send your order on WhatsApp.',
  openGraph: {
    title: siteConfig.brand,
    description: siteConfig.taglines.secondary,
    images: [{ url: '/brand/mithaava-logo.png' }],
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/brand/favicon.ico', sizes: '48x48' },
      { url: '/brand/mithaava-favicon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/brand/mithaava-favicon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0E6B75',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Bakery',
  name: siteConfig.brand,
  description: siteConfig.taglines.secondary,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.line1,
    addressLocality: 'Gurugram',
    addressRegion: 'Haryana',
    addressCountry: 'IN',
  },
  telephone: siteConfig.contact.whatsappDisplay,
  url: 'https://mithaava.example',
  servesCuisine: 'Bakery',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${figtree.variable} ${greatVibes.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-cream-50 font-sans text-cocoa-800 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
