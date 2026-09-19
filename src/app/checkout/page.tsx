import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CheckoutPageClient } from '@/components/checkout/CheckoutPageClient';
import { copy } from '@/content/copy';

export const metadata: Metadata = {
  title: copy.checkout.title,
};

export default function CheckoutPage() {
  return (
    <>
      <Header variant="shop" />
      <CheckoutPageClient />
      <Footer />
    </>
  );
}
