'use client';

import {
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { motionSpring } from '@/lib/motion';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { copy } from '@/content/copy';

type SheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  side?: 'right' | 'bottom';
  className?: string;
  /** Optional badge next to title (e.g. item count) */
  badge?: string | number | null;
};

export function Sheet({
  open,
  onClose,
  title,
  children,
  side = 'right',
  className,
  badge,
}: SheetProps) {
  const reduced = useReducedMotionSafe();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previousFocus.current?.focus();
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  const isBottom = side === 'bottom';

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.button
            type="button"
            aria-label="Close overlay"
            className="absolute inset-0 bg-cocoa-800/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.01 : 0.22 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className={cn(
              'relative z-10 flex max-h-[100dvh] flex-col bg-cream-50 outline-none',
              isBottom
                ? 'mt-auto max-h-[92dvh] w-full rounded-t-[1.75rem] shadow-[0_-12px_40px_-12px_rgba(78,36,32,0.25)]'
                : 'ml-auto h-full w-full max-w-[420px] shadow-[-16px_0_48px_-20px_rgba(78,36,32,0.28)] sm:max-w-[440px]',
              className,
            )}
            initial={
              reduced
                ? { opacity: 0 }
                : isBottom
                  ? { y: '100%' }
                  : { x: '100%' }
            }
            animate={reduced ? { opacity: 1 } : isBottom ? { y: 0 } : { x: 0 }}
            exit={
              reduced
                ? { opacity: 0 }
                : isBottom
                  ? { y: '100%' }
                  : { x: '100%' }
            }
            transition={reduced ? { duration: 0.15 } : motionSpring.soft}
          >
            {isBottom ? (
              <div className="flex justify-center pt-3 pb-1" aria-hidden>
                <span className="h-1.5 w-12 rounded-full bg-icing-300/90" />
              </div>
            ) : null}

            <div className="flex items-center justify-between gap-3 px-5 pt-2 pb-4 sm:px-6 sm:pt-5">
              <div className="flex items-baseline gap-2.5">
                <h2
                  id={titleId}
                  className="font-display text-2xl font-semibold text-teal-900 sm:text-[1.65rem]"
                >
                  {title}
                </h2>
                {badge != null && badge !== '' ? (
                  <motion.span
                    key={String(badge)}
                    initial={reduced ? false : { scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex min-w-6 items-center justify-center rounded-full bg-berry-600 px-2 py-0.5 text-xs font-bold text-white"
                  >
                    {badge}
                  </motion.span>
                ) : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cocoa-800 transition-colors hover:bg-cream-100 active:scale-95"
                aria-label={copy.a11y.close}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {children}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
