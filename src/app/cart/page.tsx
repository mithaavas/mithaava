import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartPageClient } from '@/components/cart/CartPageClient';
import { copy } from '@/content/copy';

export const metadata: Metadata = {
  title: copy.cart.title,
  description:
    'Review your Mithaava cake order — sizes, quantities and cake messages — then check delivery to your Gurugram pincode and send the order on WhatsApp.',
  alternates: { canonical: '/cart/' },
};

export default function CartPage() {
  return (
    <>
      <Header variant="shop" />
      <CartPageClient />
      <Footer />
    </>
  );
}
