'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { useIsClient } from '@/hooks/useIsClient';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { useUiStore } from '@/store/uiStore';
import { formatINR } from '@/lib/format';
import { copy } from '@/content/copy';

export function MobileCartBar() {
  const ready = useIsClient();
  const { itemCount, subtotal } = useCart();
  const pathname = usePathname();
  const openCart = useUiStore((s) => s.openCart);
  const reduced = useReducedMotionSafe();

  const hidden =
    !ready ||
    itemCount === 0 ||
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/cart');

  return (
    <AnimatePresence>
      {!hidden ? (
        <motion.div
          initial={reduced ? false : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? undefined : { y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="fixed inset-x-0 bottom-0 z-30 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <button
            type="button"
            onClick={openCart}
            className="btn-primary flex h-14 w-full items-center justify-between rounded-full px-5 text-sm font-semibold shadow-[0_12px_32px_-10px_rgba(14,107,117,0.55)]"
          >
            <span>
              {copy.cart.itemsSummary(itemCount, formatINR(subtotal))}
            </span>
            <span>{copy.cart.viewCart}</span>
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
