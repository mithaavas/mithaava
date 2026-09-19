'use client';

import { Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

type StepperProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
  label?: string;
};

export function Stepper({
  value,
  min = 1,
  max = 10,
  onChange,
  className,
  label = 'Quantity',
}: StepperProps) {
  const reduced = useReducedMotionSafe();

  return (
    <div
      className={cn(
        'inline-flex h-12 items-center rounded-full border border-icing-300/80 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]',
        className,
      )}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full text-teal-900 transition-colors hover:bg-cream-100 active:scale-90 disabled:opacity-35"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus className="h-4 w-4" aria-hidden />
      </button>
      <span
        className="min-w-10 flex-1 text-center text-base font-semibold tabular-nums text-teal-900"
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={reduced ? false : { y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? undefined : { y: -8, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="inline-block"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <button
        type="button"
        className="inline-flex h-12 w-12 items-center justify-center rounded-full text-teal-900 transition-colors hover:bg-cream-100 active:scale-90 disabled:opacity-35"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
