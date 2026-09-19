'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { motionDuration, motionEase } from '@/lib/motion';

export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionSafe();
  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: motionDuration.fast, ease: motionEase }}
    >
      {children}
    </motion.div>
  );
}
