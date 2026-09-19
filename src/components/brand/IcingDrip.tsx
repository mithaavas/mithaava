'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

type IcingDripProps = {
  className?: string;
  animate?: boolean;
};

/** Decorative icing drip path — hero motif over the brand. */
export function IcingDrip({ className, animate = true }: IcingDripProps) {
  const reduced = useReducedMotionSafe();
  const shouldAnimate = animate && !reduced;

  return (
    <svg
      viewBox="0 0 320 80"
      className={cn('pointer-events-none h-auto w-full text-icing-300', className)}
      aria-hidden
    >
      <motion.path
        d="M0 8 C40 8 36 42 64 42 C92 42 88 8 120 8 C152 8 148 48 180 48 C212 48 208 8 240 8 C272 8 268 40 300 40 L320 40 L320 0 L0 0 Z"
        fill="currentColor"
        initial={shouldAnimate ? { pathLength: 0, opacity: 0.35 } : false}
        animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.g
        initial={shouldAnimate ? { y: -8, opacity: 0 } : false}
        animate={shouldAnimate ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.4, duration: 0.9 }}
      >
        <ellipse cx="64" cy="54" rx="7" ry="10" fill="currentColor" />
        <ellipse cx="180" cy="60" rx="8" ry="12" fill="currentColor" />
        <ellipse cx="300" cy="52" rx="6" ry="9" fill="currentColor" />
      </motion.g>
    </svg>
  );
}

/** Thin drip edge for section dividers */
export function IcingDripEdge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 28"
      preserveAspectRatio="none"
      className={cn('h-7 w-full text-icing-200', className)}
      aria-hidden
    >
      <path
        d="M0 0 H1200 V8 C1140 8 1128 26 1080 26 C1032 26 1020 8 960 8 C900 8 888 24 840 24 C792 24 780 8 720 8 C660 8 648 26 600 26 C552 26 540 8 480 8 C420 8 408 24 360 24 C312 24 300 8 240 8 C180 8 168 26 120 26 C72 26 60 8 0 8 Z"
        fill="currentColor"
      />
    </svg>
  );
}
