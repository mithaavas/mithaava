import { cn } from '@/lib/cn';

/** Soft chocolate wave — cream → cocoa footer. */
export function ChocolateWave({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 88"
      preserveAspectRatio="none"
      className={cn('pointer-events-none block h-14 w-full sm:h-[4.25rem]', className)}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0 88 V42
           C160 12 300 4 440 28
           C580 52 700 72 840 48
           C980 24 1120 6 1260 22
           C1340 32 1400 48 1440 36
           V88 Z"
      />
    </svg>
  );
}
