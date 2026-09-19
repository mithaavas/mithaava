import { cn } from '@/lib/cn';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('icing-shimmer rounded-[var(--radius-md)]', className)}
      aria-hidden
    />
  );
}
