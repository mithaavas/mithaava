'use client';

import { Heart } from 'lucide-react';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useIsClient } from '@/hooks/useIsClient';
import { useToast } from '@/components/ui/Toast';
import { copy } from '@/content/copy';
import { cn } from '@/lib/cn';

export function FavoriteButton({
  productId,
  className,
  size = 'md',
}: {
  productId: string;
  className?: string;
  size?: 'sm' | 'md';
}) {
  const ready = useIsClient();
  const saved = useFavoritesStore((s) => s.ids.includes(productId));
  const toggle = useFavoritesStore((s) => s.toggle);
  const { toast } = useToast();
  const active = ready && saved;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const next = !useFavoritesStore.getState().ids.includes(productId);
        toggle(productId);
        toast(next ? copy.favourites.added : copy.favourites.removed);
      }}
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-icing-300/70 bg-cream-50/95 text-teal-900 shadow-[var(--shadow-soft)] backdrop-blur-sm transition-colors hover:bg-cream-100',
        size === 'sm' ? 'h-9 w-9' : 'h-11 w-11',
        active && 'border-berry-600/40 text-berry-600',
        className,
      )}
      aria-label={active ? copy.favourites.remove : copy.favourites.add}
      aria-pressed={active}
    >
      <Heart
        className={cn(size === 'sm' ? 'h-4 w-4' : 'h-5 w-5')}
        fill={active ? 'currentColor' : 'none'}
        aria-hidden
      />
    </button>
  );
}
