'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product, SizeKey } from '@/domain/types';
import { getUnitPrice } from '@/domain/pricing';
import { formatINR } from '@/lib/format';
import { copy } from '@/content/copy';
import { CakeArt } from '@/components/brand/CakeArt';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SizePicker, defaultAvailableSize } from '@/components/menu/SizePicker';
import { LeadTimeChip } from '@/components/menu/LeadTimeChip';
import { FavoriteButton } from '@/components/menu/FavoriteButton';
import { useCartStore } from '@/store/cartStore';
import { useUiStore } from '@/store/uiStore';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/cn';

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const [size, setSize] = useState<SizeKey>(() => defaultAvailableSize(product));
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUiStore((s) => s.openCart);
  const { toast } = useToast();
  const price = getUnitPrice(product, size);
  const primary = product.collections[0] ?? 'best-sellers';

  return (
    <article
      className={cn(
        'flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-icing-300/50 bg-cream-50/80 shadow-[var(--shadow-soft)]',
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Link
          href={`/menu/${product.slug}/`}
          className="absolute inset-0 block"
        >
          {product.image ? (
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              className="object-cover"
              sizes="(max-width:768px) 50vw, 25vw"
            />
          ) : (
            <CakeArt collection={primary} title={product.name} className="h-full w-full" />
          )}
        </Link>
        {product.badges?.[0] ? (
          <div className="pointer-events-none absolute top-3 left-3 z-10">
            <Badge kind={product.badges[0]} />
          </div>
        ) : null}
        <FavoriteButton
          productId={product.id}
          size="sm"
          className="absolute top-3 right-3 z-10"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
        <div>
          <Link
            href={`/menu/${product.slug}/`}
            className="font-display text-lg text-teal-900 hover:underline"
          >
            {product.name}
          </Link>
          {product.note ? (
            <p className="mt-1 text-sm text-cocoa-800/70">{product.note}</p>
          ) : null}
          <div className="mt-2">
            <LeadTimeChip hours={product.leadTimeHours} />
          </div>
        </div>
        <SizePicker product={product} value={size} onChange={setSize} />
        <div className="mt-auto flex items-center justify-between gap-2">
          <p className="font-semibold tabular-nums text-cocoa-800">
            {price !== null ? formatINR(price) : copy.menu.notAvailable}
          </p>
          <Button
            size="sm"
            disabled={price === null}
            onClick={() => {
              addItem(product.id, size, 1);
              toast(copy.menu.addToCart, {
                label: copy.cart.viewCart,
                onClick: openCart,
              });
            }}
          >
            {copy.menu.addToCart}
          </Button>
        </div>
      </div>
    </article>
  );
}
