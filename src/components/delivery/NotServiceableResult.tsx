'use client';

import { Button } from '@/components/ui/Button';
import { AggregatorButtons } from '@/components/aggregators/AggregatorButtons';
import { copy } from '@/content/copy';

type Props = {
  pincode: string;
  onRetry: () => void;
};

export function NotServiceableResult({ pincode, onRetry }: Props) {
  return (
    <div
      className="w-full max-w-md rounded-[var(--radius-xl)] border border-icing-300/80 bg-cream-50 p-6 shadow-[var(--shadow-soft)]"
      aria-live="polite"
    >
      <p className="font-display text-xl text-teal-900">
        {copy.pincode.unserviceable(pincode)}
      </p>
      <AggregatorButtons className="mt-5" size="lg" layout="stack" />
      <Button variant="ghost" className="mt-4 w-full" onClick={onRetry}>
        {copy.pincode.tryAnother}
      </Button>
    </div>
  );
}
