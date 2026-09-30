import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CheckoutPageClient } from '@/components/checkout/CheckoutPageClient';
import { copy } from '@/content/copy';

export const metadata: Metadata = {
  title: copy.checkout.title,
  description:
    'Complete your Mithaava cake order: add your name, Gurugram delivery address, date and time slot, then confirm everything with us on WhatsApp.',
  alternates: { canonical: '/checkout/' },
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
