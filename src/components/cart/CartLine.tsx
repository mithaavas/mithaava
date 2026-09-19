'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { SizeKey } from '@/domain/types';
import type { ResolvedCartLine } from '@/hooks/useCart';
import { formatINR } from '@/lib/format';
import { Stepper } from '@/components/ui/Stepper';
import { SizePicker } from '@/components/menu/SizePicker';
import { CakeArt } from '@/components/brand/CakeArt';
import { copy } from '@/content/copy';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { motionSpring } from '@/lib/motion';

export function CartLineView({
  line,
  onQuantity,
  onSize,
  onRemove,
}: {
  line: ResolvedCartLine;
  onQuantity: (q: number) => void;
  onSize: (size: SizeKey) => void;
  onRemove: () => void;
}) {
  const reduced = useReducedMotionSafe();

  if (line.missing || !line.product) {
    return (
      <div className="rounded-2xl border border-berry-600/30 bg-berry-600/5 p-4 text-sm">
        <p>This cake is no longer available.</p>
        <button
          type="button"
          className="mt-2 font-medium text-teal-800 underline-offset-2 hover:underline"
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
    );
  }

  const primary = line.product.collections[0] ?? 'best-sellers';

  return (
    <motion.article
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduced ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
      transition={reduced ? { duration: 0.15 } : motionSpring.soft}
      className="rounded-[1.25rem] border border-icing-300/70 bg-gradient-to-b from-white to-icing-200/25 p-4 shadow-[0_8px_24px_-18px_rgba(194,37,92,0.35)] sm:p-5"
    >
      <div className="flex items-start gap-3.5">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-cream-100 ring-1 ring-icing-300/60 sm:h-[4.5rem] sm:w-[4.5rem]">
          {line.product.image ? (
            <Image
              src={line.product.image.src}
              alt=""
              fill
              className="object-cover"
              sizes="72px"
            />
          ) : (
            <CakeArt
              collection={primary}
              title={line.product.name}
              className="h-full w-full"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-display text-lg leading-snug font-semibold text-teal-900 sm:text-xl">
                {line.product.name}
              </p>
              <p className="mt-0.5 text-sm tabular-nums text-cocoa-800/70">
                {line.unitPrice !== null
                  ? formatINR(line.unitPrice)
                  : copy.menu.notAvailable}
                {line.lineTotal !== null ? (
                  <span className="font-semibold text-cocoa-800">
                    {' '}
                    · {formatINR(line.lineTotal)}
                  </span>
                ) : null}
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 pt-0.5 text-sm text-cocoa-800/45 transition-colors hover:text-berry-600"
              onClick={onRemove}
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <SizePicker
          product={line.product}
          value={line.size}
          onChange={onSize}
        />
      </div>

      <div className="mt-3">
        <Stepper
          value={line.quantity}
          onChange={onQuantity}
          className="w-full justify-between"
        />
      </div>
    </motion.article>
  );
}
