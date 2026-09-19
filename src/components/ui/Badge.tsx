import type { ProductBadge } from '@/domain/types';
import { cn } from '@/lib/cn';

const badgeLabel: Record<ProductBadge, string> = {
  'premium-superhit': 'Premium SuperHit',
  'all-time-hit': 'All Time Hit',
  'chefs-fav': "Chef's Fav",
};

export function Badge({
  kind,
  className,
}: {
  kind: ProductBadge;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full bg-berry-600 px-2.5 py-1 text-xs font-semibold text-cream-50',
        className,
      )}
    >
      {badgeLabel[kind]}
    </span>
  );
}
