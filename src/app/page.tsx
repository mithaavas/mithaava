import type { Metadata } from 'next';
import { LandingPage } from '@/components/landing/LandingPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: { absolute: siteConfig.seo.homeTitle },
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <LandingPage />;
}
