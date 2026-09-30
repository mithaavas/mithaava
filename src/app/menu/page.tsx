import type { Metadata } from 'next';
import { MenuPageClient } from '@/components/menu/MenuPageClient';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Cake Menu — Order Cakes Online in Gurugram',
  description:
    'Order cakes online from Mithaava, the bakery in Sector 46, Gurugram. Chocolate truffle, Ferrero Rocher, blueberry cheesecake, red velvet and fruit cakes — delivered 24/7 in Gurgaon.',
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
