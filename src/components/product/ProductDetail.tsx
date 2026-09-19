'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Product, SizeKey } from '@/domain/types';
import { getUnitPrice } from '@/domain/pricing';
import { formatINR } from '@/lib/format';
import { copy } from '@/content/copy';
import { CakeArt } from '@/components/brand/CakeArt';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Stepper } from '@/components/ui/Stepper';
import {
  SizePicker,
  defaultAvailableSize,
} from '@/components/menu/SizePicker';
import { LeadTimeChip } from '@/components/menu/LeadTimeChip';
import { FavoriteButton } from '@/components/menu/FavoriteButton';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { useCartStore } from '@/store/cartStore';
import { useUiStore } from '@/store/uiStore';
import { useToast } from '@/components/ui/Toast';

function ProductDetailInner({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [size, setSize] = useState<SizeKey>(() => defaultAvailableSize(product));
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUiStore((s) => s.openCart);
  const { toast } = useToast();
  const price = getUnitPrice(product, size);
  const primary = product.collections[0] ?? 'best-sellers';

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] border border-icing-300/50 bg-cream-100">
          {product.image ? (
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          ) : (
            <CakeArt collection={primary} title={product.name} className="h-full w-full" />
          )}
          <FavoriteButton
            productId={product.id}
            className="absolute top-4 right-4 z-10"
          />
        </div>
        <div className="flex flex-col gap-4">
          {product.badges?.[0] ? <Badge kind={product.badges[0]} /> : null}
          <h1 className="font-display text-3xl text-teal-900 sm:text-4xl">
            {product.name}
          </h1>
          {product.note ? (
            <p className="text-cocoa-800/80">{product.note}</p>
          ) : null}
          <LeadTimeChip hours={product.leadTimeHours} />
          <SizePicker product={product} value={size} onChange={setSize} />
          <p className="font-display text-2xl tabular-nums text-cocoa-800">
            {price !== null ? formatINR(price) : copy.menu.notAvailable}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Stepper value={qty} onChange={setQty} />
            <Button
              size="lg"
              disabled={price === null}
              onClick={() => {
                addItem(product.id, size, qty);
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
      </div>
      <RelatedProducts products={related} />
    </div>
  );
}

/** Remount on product change so size/qty reset without effect setState. */
export function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  return (
    <ProductDetailInner key={product.id} product={product} related={related} />
  );
}
