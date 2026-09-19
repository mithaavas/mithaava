'use client';

import { motion } from 'framer-motion';
import { formatINR } from '@/lib/format';
import { copy } from '@/content/copy';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

export function CartSummary({ subtotal }: { subtotal: number }) {
  const reduced = useReducedMotionSafe();

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-base font-medium text-cocoa-800">Subtotal</span>
        <motion.span
          key={subtotal}
          initial={reduced ? false : { opacity: 0.4, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-xl font-semibold tabular-nums text-teal-900"
        >
          {formatINR(subtotal)}
        </motion.span>
      </div>
      <p className="text-sm leading-snug text-cocoa-800/55">
        {copy.cart.deliveryNote}
      </p>
    </div>
  );
}
