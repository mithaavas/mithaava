'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

/** Teal panel bottom drip — overlaps the section below. */
export function HeroPanelDrip({
  className,
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  const reduced = useReducedMotionSafe();
  const wobble = animate && !reduced;

  return (
    <svg
      viewBox="0 0 600 72"
      preserveAspectRatio="none"
      className={cn('pointer-events-none h-14 w-full sm:h-16', className)}
      aria-hidden
    >
      <path
        d="M0 0 H600 V18 C560 18 548 48 510 48 C472 48 460 18 420 18 C380 18 368 56 330 56 C292 56 280 18 240 18 C200 18 188 44 150 44 C112 44 100 18 60 18 C30 18 18 36 0 36 Z"
        fill="currentColor"
      />
      {([80, 210, 360, 500] as const).map((cx, i) => (
        <motion.ellipse
          key={cx}
          cx={cx}
          cy={52}
          rx={10 + (i % 2) * 2}
          ry={14 + (i % 3)}
          fill="currentColor"
          animate={wobble ? { y: [0, 4 + (i % 3), 0] } : undefined}
          transition={
            wobble
              ? {
                  duration: 2.4 + i * 0.25,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }
              : undefined
          }
        />
      ))}
    </svg>
  );
}
