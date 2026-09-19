'use client';

import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { PageTransition } from '@/components/layout/PageTransition';
import { copy } from '@/content/copy';

export function CheckoutPageClient() {
  return (
    <PageTransition>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="mb-2 font-display text-3xl text-teal-900">
          {copy.checkout.title}
        </h1>
        <p className="mb-8 text-cocoa-800/75">
          Confirm delivery pincode, then send your order on WhatsApp.
        </p>
        <CheckoutForm />
      </main>
    </PageTransition>
  );
}
