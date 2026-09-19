'use client';

import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CartLineView } from '@/components/cart/CartLine';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { AggregatorStrip } from '@/components/aggregators/AggregatorStrip';
import { useCart } from '@/hooks/useCart';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/components/ui/Toast';
import { copy } from '@/content/copy';
import { maxLeadTimeHours } from '@/domain/leadTime';
import { PageTransition } from '@/components/layout/PageTransition';

export function CartPageClient() {
  const { lines, subtotal, setQuantity, changeSize, removeItem } = useCart();
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();

  const hours = maxLeadTimeHours(lines.map((l) => l.product?.leadTimeHours));
  const leadNotice =
    hours >= 2
      ? copy.cart.leadTimeNotice(hours >= 6 ? 'Signature' : 'Cheese', hours)
      : null;

  return (
    <PageTransition>
      <main className="mx-auto max-w-xl px-4 py-8 sm:px-6 sm:py-10">
        <h1 className="font-display text-3xl font-semibold text-teal-900 sm:text-4xl">
          {copy.cart.title}
        </h1>
        {lines.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="mt-8 space-y-4">
            {leadNotice ? (
              <p className="rounded-2xl bg-marigold-500/15 px-3.5 py-2.5 text-sm">
                {leadNotice}
              </p>
            ) : null}
            <AnimatePresence mode="popLayout" initial={false}>
              {lines.map((line) => (
                <CartLineView
                  key={`${line.productId}-${line.size}`}
                  line={line}
                  onQuantity={(q) => setQuantity(line.productId, line.size, q)}
                  onSize={(size) => changeSize(line.productId, line.size, size)}
                  onRemove={() => {
                    const snap = {
                      productId: line.productId,
                      size: line.size,
                      quantity: line.quantity,
                    };
                    removeItem(line.productId, line.size);
                    toast(copy.cart.removed, {
                      label: copy.cart.undoRemove,
                      onClick: () =>
                        addItem(snap.productId, snap.size, snap.quantity),
                    });
                  }}
                />
              ))}
            </AnimatePresence>

            <div className="sticky bottom-4 space-y-3 rounded-[1.5rem] border border-icing-300/60 bg-cream-50/95 p-5 shadow-[0_16px_40px_-20px_rgba(78,36,32,0.3)] backdrop-blur-md">
              <CartSummary subtotal={subtotal} />
              <AggregatorStrip />
              <Link
                href="/checkout/"
                className="btn-primary group flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full font-semibold"
              >
                {copy.cart.continue}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        )}
      </main>
    </PageTransition>
  );
}
