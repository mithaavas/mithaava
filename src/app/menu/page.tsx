import type { Metadata } from 'next';
import { MenuPageClient } from '@/components/menu/MenuPageClient';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Cake Menu — Order Cakes Online in Gurugram',
  description:
    'Browse the full Mithaava cake menu, Sector 46 Gurugram — chocolate truffle, Ferrero Rocher, cheesecakes, red velvet & fruit cakes. Order online, 24/7.',
  alternates: { canonical: '/menu/' },
};

export default function MenuPage() {
  return (
    <>
      <MenuPageClient />
      <Footer />
    </>
  );
}
