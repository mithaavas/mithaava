'use client';


import type { Product, SizeKey } from '@/domain/types';
import { siteConfig } from '@/config/site';
import { sizeOrder } from '@/data/collections';
import { isSizeAvailable } from '@/domain/pricing';
import { copy } from '@/content/copy';
import { SegmentedControl } from '@/components/ui/SegmentedControl';

export function SizePicker({
  product,
  value,
  onChange,
}: {
  product: Product;
  value: SizeKey;
  onChange: (size: SizeKey) => void;
}) {
  const options = sizeOrder.map((size) => ({
    value: size,
    label: siteConfig.sizeLabels[size].label,
    disabled: !isSizeAvailable(product, size),
    title: !isSizeAvailable(product, size)
      ? copy.menu.notAvailable
      : size === 'uAndMe'
        ? siteConfig.sizeLabels.uAndMe.note
        : undefined,
  }));

  return (
    <SegmentedControl
      ariaLabel="Cake size"
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}

/** Prefer siteConfig.defaultSize, then first available size. */
export function defaultAvailableSize(product: Product): SizeKey {
  const preferred = siteConfig.defaultSize;
  if (isSizeAvailable(product, preferred)) return preferred;
  for (const size of sizeOrder) {
    if (isSizeAvailable(product, size)) return size;
  }
  return preferred;
}
