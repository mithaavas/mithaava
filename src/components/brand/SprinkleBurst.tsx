'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

const dots = [
  { x: 12, y: 28, c: '#C2255C', d: 0 },
  { x: 38, y: 16, c: '#E9963E', d: 0.05 },
  { x: 58, y: 34, c: '#0E6B75', d: 0.1 },
  { x: 78, y: 12, c: '#F6C1BC', d: 0.08 },
  { x: 24, y: 48, c: '#B99560', d: 0.12 },
  { x: 68, y: 52, c: '#C2255C', d: 0.15 },
  { x: 48, y: 58, c: '#0E6B75', d: 0.18 },
];

export function SprinkleBurst({
  className,
  play = true,
}: {
  className?: string;
  play?: boolean;
}) {
  const reduced = useReducedMotionSafe();
  if (!play || reduced) return null;

  return (
    <svg
      viewBox="0 0 100 70"
      className={cn('pointer-events-none h-16 w-24', className)}
      aria-hidden
    >
      {dots.map((dot) => (
        <motion.circle
          key={`${dot.x}-${dot.y}`}
          cx="50"
          cy="50"
          r="3.5"
          fill={dot.c}
          initial={{ opacity: 0, cx: 50, cy: 50 }}
          animate={{ opacity: [0, 1, 0], cx: dot.x, cy: dot.y }}
          transition={{ duration: 1.2, delay: dot.d, ease: 'easeOut' }}
        />
      ))}
    </svg>
  );
}
