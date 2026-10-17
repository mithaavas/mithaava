import type { Metadata } from 'next';
import { MenuPageClient } from '@/components/menu/MenuPageClient';
import { Footer } from '@/components/layout/Footer';
import { DeliveryAreas } from '@/components/seo/DeliveryAreas';
import { JsonLd } from '@/components/seo/JsonLd';
import { collections } from '@/data/collections';
import { collectionPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Cake Menu — Order Cakes Online in Gurugram',
  description:
    'Browse the full Mithaava cake menu, Sector 46 Gurugram — eggless chocolate, Ferrero Rocher, cheesecakes, pastries & more. Order online, 24/7 Delhi NCR delivery.',
  alternates: { canonical: '/menu/' },
};

export default function MenuPage() {
  return (
    <>
      <JsonLd
        data={collectionPageJsonLd(
          'Mithaava cake menu',
          '/menu/',
          collections.map((c) => ({
            name: c.label,
            url: `/menu/#collection-${c.id}`,
          })),
        )}
      />
      <MenuPageClient />
      <DeliveryAreas />
      <Footer />
    </>
  );
}
