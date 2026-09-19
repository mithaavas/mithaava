'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Sheet } from '@/components/ui/Sheet';
import { CartLineView } from '@/components/cart/CartLine';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { AggregatorStrip } from '@/components/aggregators/AggregatorStrip';
import { useCart } from '@/hooks/useCart';
import { useCartStore } from '@/store/cartStore';
import { useUiStore } from '@/store/uiStore';
import { useToast } from '@/components/ui/Toast';
import { copy } from '@/content/copy';
import { maxLeadTimeHours } from '@/domain/leadTime';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import type { SizeKey } from '@/domain/types';

export function CartDrawer() {
  const open = useUiStore((s) => s.cartOpen);
  const closeCart = useUiStore((s) => s.closeCart);
  const { lines, subtotal, setQuantity, changeSize, removeItem, itemCount } =
    useCart();
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();
  const reduced = useReducedMotionSafe();
  const [side, setSide] = useState<'right' | 'bottom'>('bottom');

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setSide(mq.matches ? 'bottom' : 'right');
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const leadNotice = useMemo(() => {
    const hours = maxLeadTimeHours(lines.map((l) => l.product?.leadTimeHours));
    if (hours < 2) return null;
    const label = hours >= 6 ? 'Signature' : 'Cheese';
    return copy.cart.leadTimeNotice(label, hours);
  }, [lines]);

  return (
    <Sheet
      open={open}
      onClose={closeCart}
      title={copy.cart.title}
      side={side}
      badge={itemCount > 0 ? itemCount : null}
    >
      {lines.length === 0 ? (
        <EmptyCart
          onBrowse={() => {
            closeCart();
          }}
        />
      ) : (
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex-1 space-y-3.5 px-5 pb-4 sm:space-y-4 sm:px-6">
            {leadNotice ? (
              <motion.p
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-marigold-500/15 px-3.5 py-2.5 text-sm text-cocoa-800"
              >
                {leadNotice}
              </motion.p>
            ) : null}

            <AnimatePresence mode="popLayout" initial={false}>
              {lines.map((line) => (
                <CartLineView
                  key={`${line.productId}-${line.size}`}
                  line={line}
                  onQuantity={(q) => setQuantity(line.productId, line.size, q)}
                  onSize={(size: SizeKey) =>
                    changeSize(line.productId, line.size, size)
                  }
                  onRemove={() => {
                    const snapshot = {
                      productId: line.productId,
                      size: line.size,
                      quantity: line.quantity,
                    };
                    removeItem(line.productId, line.size);
                    toast(copy.cart.removed, {
                      label: copy.cart.undoRemove,
                      onClick: () =>
                        addItem(
                          snapshot.productId,
                          snapshot.size,
                          snapshot.quantity,
                        ),
                    });
                  }}
                />
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            layout={!reduced}
            className="sticky bottom-0 border-t border-icing-300/50 bg-cream-50/95 px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:px-6"
          >
            <CartSummary subtotal={subtotal} />
            <AggregatorStrip className="mt-3" />
            <Link
              href="/checkout/"
              onClick={closeCart}
              className="btn-primary group mt-4 flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-full text-base font-semibold"
            >
              {copy.cart.continue}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </motion.div>
        </div>
      )}
    </Sheet>
  );
}
