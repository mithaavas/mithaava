import type { Metadata } from 'next';
import { LandingPage } from '@/components/landing/LandingPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import { faqJsonLd, homeFaqs } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: siteConfig.seo.homeTitle },
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd([...homeFaqs])} />
      <LandingPage />
    </>
  );
}
