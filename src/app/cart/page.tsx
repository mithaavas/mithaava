import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartPageClient } from '@/components/cart/CartPageClient';
import { copy } from '@/content/copy';

export const metadata: Metadata = {
  title: copy.cart.title,
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
