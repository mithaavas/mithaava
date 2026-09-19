'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SprinkleBurst } from '@/components/brand/SprinkleBurst';
import { AggregatorStrip } from '@/components/aggregators/AggregatorStrip';
import { copy } from '@/content/copy';

type Props = {
  pincode: string;
  area?: string;
  onStart: () => void;
  onAutoAdvance: () => void;
};

export function ServiceableResult({
  pincode,
  area,
  onStart,
  onAutoAdvance,
}: Props) {
  const [play, setPlay] = useState(true);

  useEffect(() => {
    const burst = window.setTimeout(() => setPlay(false), 1200);
    const go = window.setTimeout(() => onAutoAdvance(), 1400);
    return () => {
      window.clearTimeout(burst);
      window.clearTimeout(go);
    };
  }, [onAutoAdvance]);

  return (
    <div
      className="relative w-full max-w-md rounded-[var(--radius-xl)] border border-teal-700/20 bg-cream-50 p-6 text-center shadow-[var(--shadow-soft)]"
      aria-live="polite"
    >
      <div className="absolute top-2 right-4">
        <SprinkleBurst play={play} />
      </div>
      <p className="font-display text-2xl text-teal-900">
        {copy.pincode.serviceable(pincode)}
      </p>
      {area ? (
        <p className="mt-1 text-sm text-cocoa-800/70">{area}</p>
      ) : null}
      <div className="mt-5 flex flex-col items-center gap-4">
        <Button size="lg" onClick={onStart}>
          {copy.pincode.startShopping}
        </Button>
        <AggregatorStrip />
      </div>
    </div>
  );
}
