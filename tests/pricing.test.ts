import { describe, expect, it } from 'vitest';
import {
  cartSubtotal,
  getUnitPrice,
  isSizeAvailable,
  lineTotal,
  lowestAvailablePrice,
} from '@/domain/pricing';
import type { Product } from '@/domain/types';

const sample: Product = {
  id: 'kit-kat',
  slug: 'kit-kat',
  name: 'Kit Kat Cake',
  collections: ['chocolate'],
  prices: { oneKg: 1200, halfKg: 750, uAndMe: null },
  isActive: true,
};

const blackForest: Product = {
  id: 'black-forest',
  slug: 'black-forest',
  name: 'Black Forest Cake',
  collections: ['best-sellers'],
  prices: { oneKg: 650, halfKg: 450, uAndMe: 350 },
  isActive: true,
};

describe('pricing', () => {
  it('returns unit prices and treats NE as null', () => {
    expect(getUnitPrice(sample, 'oneKg')).toBe(1200);
    expect(getUnitPrice(sample, 'halfKg')).toBe(750);
    expect(getUnitPrice(sample, 'uAndMe')).toBeNull();
    expect(isSizeAvailable(sample, 'uAndMe')).toBe(false);
    expect(isSizeAvailable(sample, 'oneKg')).toBe(true);
  });

  it('computes line totals and skips unavailable sizes', () => {
    expect(lineTotal(sample, 'halfKg', 2)).toBe(1500);
    expect(lineTotal(sample, 'uAndMe', 1)).toBeNull();
  });

  it('sums cart subtotal from products, never from stored prices', () => {
    const products = new Map([
      [sample.id, sample],
      [blackForest.id, blackForest],
    ]);

    const total = cartSubtotal(
      [
        { productId: 'black-forest', size: 'oneKg', quantity: 1 },
        { productId: 'kit-kat', size: 'halfKg', quantity: 1 },
        { productId: 'kit-kat', size: 'uAndMe', quantity: 2 },
        { productId: 'missing', size: 'oneKg', quantity: 1 },
      ],
      products,
    );

    // 650 + 750; NE and missing skipped
    expect(total).toBe(1400);
  });

  it('returns the lowest available size price', () => {
    expect(lowestAvailablePrice(blackForest)).toBe(350);
    expect(lowestAvailablePrice(sample)).toBe(750);
    expect(
      lowestAvailablePrice({
        ...sample,
        prices: { oneKg: null, halfKg: null, uAndMe: null },
      }),
    ).toBeNull();
  });
});
