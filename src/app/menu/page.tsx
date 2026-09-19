import type { Metadata } from 'next';
import { MenuPageClient } from '@/components/menu/MenuPageClient';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Browse Mithaava cakes — chocolate, cheese, signature, fruit and more.',
};

export default function MenuPage() {
  return (
    <>
      <MenuPageClient />
      <Footer />
    </>
  );
}
