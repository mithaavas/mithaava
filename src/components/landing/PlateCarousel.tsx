'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Crown } from 'lucide-react';
import { CakeArt } from '@/components/brand/CakeArt';
import { formatINR } from '@/lib/format';
import { lowestAvailablePrice } from '@/domain/pricing';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { copy } from '@/content/copy';
import { cn } from '@/lib/cn';
import type { Product } from '@/domain/types';

type PlateCarouselProps = {
  products: Product[];
  index: number;
  onIndexChange: (index: number) => void;
  onSelect?: (product: Product) => void;
  className?: string;
  compact?: boolean;
  showCaption?: boolean;
  /** Soft pink mockup stage vs older berry plate */
  variant?: 'plate' | 'special';
  showBestSeller?: boolean;
  scriptLine?: string;
};

const AUTO_MS = 5500;

export function PlateCarousel({
  products,
  index,
  onIndexChange,
  onSelect,
  className,
  compact = false,
  showCaption = true,
  variant = 'plate',
  showBestSeller = false,
  scriptLine,
}: PlateCarouselProps) {
  const reduced = useReducedMotionSafe();
  const [paused, setPaused] = useState(false);
  const [ringRot, setRingRot] = useState(0);
  const touchX = useRef<number | null>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const count = products.length;
  const current = products[index] ?? products[0];
  const isSpecial = variant === 'special';

  const go = useCallback(
    (dir: 1 | -1) => {
      if (count === 0) return;
      const next = (index + dir + count) % count;
      onIndexChange(next);
      setRingRot((r) => r + (dir === 1 ? 12 : -12));
    },
    [count, index, onIndexChange],
  );

  useEffect(() => {
    if (reduced || paused || count < 2) return;
    const id = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused, count, go]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  if (!current) return null;

  const from = lowestAvailablePrice(current);

  return (
    <div
      ref={regionRef}
      className={cn('relative flex flex-col items-center', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!regionRef.current?.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          go(-1);
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          go(1);
        }
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        const end = e.changedTouches[0]?.clientX;
        touchX.current = null;
        if (start == null || end == null) return;
        const dx = end - start;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Mithaava Specials"
    >
      <div
        className={cn(
          'relative flex items-center justify-center',
          compact
            ? 'h-[200px] w-[200px] sm:h-[240px] sm:w-[240px]'
            : isSpecial
              ? 'h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] lg:h-[440px] lg:w-[440px]'
              : 'h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] lg:h-[380px] lg:w-[380px]',
        )}
      >
        {/* Soft pink bloom behind cake */}
        {isSpecial ? (
          <div
            className="absolute inset-[-6%] rounded-full bg-[radial-gradient(circle_at_50%_42%,#f7c8d4_0%,#f3b0c0_42%,#e89aaa_68%,transparent_72%)] opacity-95"
            aria-hidden
          />
        ) : null}

        <motion.div
          className={cn(
            'absolute inset-[4%] rounded-full border',
            isSpecial ? 'border-white/70' : 'border-icing-200/80 border-2',
          )}
          animate={{ rotate: ringRot }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        />
        <div
          className={cn(
            'absolute inset-[10%] rounded-full border',
            isSpecial ? 'border-white/45' : 'border-gold-500/35',
          )}
        />

        <div
          className={cn(
            'absolute overflow-hidden rounded-full bg-cream-50',
            isSpecial
              ? 'inset-[14%] shadow-[0_28px_60px_-18px_rgba(78,36,32,0.45)] ring-[6px] ring-white/70'
              : 'inset-[14%] shadow-[0_20px_50px_-16px_rgba(78,36,32,0.45)] ring-4 ring-white/50',
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="relative h-full w-full"
              initial={reduced ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.35 }}
            >
              {current.image ? (
                <Image
                  src={current.image.src}
                  alt={current.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 70vw, 440px"
                  priority={index === 0}
                />
              ) : (
                <CakeArt
                  collection={current.collections[0]}
                  title={current.name}
                  className="h-full w-full"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {showBestSeller ? (
          <div className="absolute top-2 right-2 z-20 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-gradient-to-b from-[#d4b078] to-[#b99560] text-center shadow-[0_10px_24px_-10px_rgba(78,36,32,0.55)] sm:top-4 sm:right-4 sm:h-[4.5rem] sm:w-[4.5rem]">
            <Crown className="mb-0.5 h-3.5 w-3.5 text-cream-50" aria-hidden />
            <span className="px-1 text-[9px] leading-tight font-bold tracking-wide text-cream-50 uppercase sm:text-[10px]">
              {copy.landing.bestSeller}
            </span>
          </div>
        ) : null}

        {scriptLine ? (
          <p
            className="pointer-events-none absolute top-[6%] left-[4%] z-10 max-w-[9rem] -rotate-6 font-[family-name:var(--font-script)] text-xl leading-tight text-white drop-shadow-[0_2px_8px_rgba(78,36,32,0.35)] sm:max-w-[11rem] sm:text-2xl"
            aria-hidden
          >
            {scriptLine}
          </p>
        ) : null}

        {count > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous special"
              onClick={() => go(-1)}
              className="absolute top-1/2 left-0 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-berry-600 shadow-lg"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next special"
              onClick={() => go(1)}
              className="absolute top-1/2 right-0 z-10 flex h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-berry-600 shadow-lg"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </>
        ) : null}
      </div>

      {showCaption ? (
        <div className="relative z-10 mt-4 max-w-xs text-center text-cocoa-800 lg:hidden">
          <p className="font-display text-lg font-semibold">{current.name}</p>
          {from != null ? (
            <p className="mt-0.5 text-sm text-cocoa-800/70">
              from {formatINR(from)}
            </p>
          ) : null}
          {onSelect ? (
            <button
              type="button"
              onClick={() => onSelect(current)}
              className="mt-1 text-sm font-medium text-berry-600 underline-offset-4 hover:underline"
            >
              View cake
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
