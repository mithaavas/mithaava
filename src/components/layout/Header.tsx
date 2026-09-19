'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, ShoppingBag } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { PincodeChip } from '@/components/delivery/PincodeChip';
import { InstagramCta } from '@/components/brand/InstagramCta';
import { useCartStore } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useUiStore } from '@/store/uiStore';
import { useDeliveryStore } from '@/store/deliveryStore';
import { useIsClient } from '@/hooks/useIsClient';
import { copy } from '@/content/copy';
import { cn } from '@/lib/cn';

type HeaderProps = {
  variant?: 'landing' | 'shop';
  className?: string;
};

const nav = [
  { href: '/', label: 'Home', match: (p: string) => p === '/' },
  { href: '/menu/', label: 'Shop', match: (p: string) => p.startsWith('/menu') },
] as const;

export function Header({ variant = 'shop', className }: HeaderProps) {
  const pathname = usePathname();
  const ready = useIsClient();
  const count = useCartStore((s) => s.itemCount());
  const favCount = useFavoritesStore((s) => s.ids.length);
  const openCart = useUiStore((s) => s.openCart);
  const delivery = useDeliveryStore((s) => s.result);
  const displayCount = ready ? count : 0;
  const displayFavCount = ready ? favCount : 0;

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-icing-200/60 bg-cream-50/95 backdrop-blur-md',
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        <Logo priority size="md" />

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {nav.map((item) => {
            const active = item.match(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-berry-600 text-white shadow-[0_6px_16px_-8px_rgba(194,37,92,0.7)]'
                    : 'text-cocoa-800/80 hover:bg-cream-100 hover:text-teal-900',
                )}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {variant === 'shop' && ready && delivery ? <PincodeChip /> : null}

          <InstagramCta variant="header" />

          {variant === 'shop' ? (
            <>
              <Link
                href="/menu/#collection-your-favourites"
                className={cn(
                  'relative inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream-100',
                  displayFavCount > 0 ? 'text-berry-600' : 'text-teal-900',
                )}
                aria-label={copy.a11y.favourites}
              >
                <Heart
                  className="h-5 w-5"
                  fill={displayFavCount > 0 ? 'currentColor' : 'none'}
                  aria-hidden
                />
                {displayFavCount > 0 ? (
                  <span className="absolute top-1 right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-berry-600 px-1 text-[11px] font-bold text-white">
                    {displayFavCount}
                  </span>
                ) : null}
              </Link>
              <button
                type="button"
                onClick={openCart}
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-teal-900 hover:bg-cream-100"
                aria-label={copy.a11y.cart}
              >
                <ShoppingBag className="h-5 w-5" aria-hidden />
                {displayCount > 0 ? (
                  <span className="absolute top-1 right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-berry-600 px-1 text-[11px] font-bold text-white">
                    {displayCount}
                  </span>
                ) : null}
              </button>
            </>
          ) : (
            <Link
              href="/menu/"
              className="inline-flex h-11 items-center rounded-full bg-berry-600 px-5 text-sm font-semibold text-white shadow-[0_8px_20px_-10px_rgba(194,37,92,0.75)]"
            >
              Order now
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
