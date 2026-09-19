'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { copy } from '@/content/copy';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

export function EmptyCart({ onBrowse }: { onBrowse?: () => void }) {
  const reduced = useReducedMotionSafe();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-5 px-6 py-16 text-center sm:py-20"
    >
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-icing-200/60 text-berry-600">
        <ShoppingBag className="h-7 w-7" aria-hidden />
      </span>
      <div>
        <p className="font-display text-2xl font-semibold text-teal-900">
          {copy.cart.empty}
        </p>
        <p className="mt-2 text-sm text-cocoa-800/60">
          Browse the menu and add something sweet.
        </p>
      </div>
      <Link
        href="/menu/"
        onClick={onBrowse}
        className="btn-primary inline-flex h-12 items-center rounded-full px-6 font-semibold"
      >
        {copy.cart.emptyAction}
      </Link>
    </motion.div>
  );
}
