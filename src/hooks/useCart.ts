'use client';

import { useEffect, useMemo, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { productRepository } from '@/services/productRepository';
import { cartSubtotal, getUnitPrice, lineTotal } from '@/domain/pricing';
import type { Product, SizeKey } from '@/domain/types';

export type ResolvedCartLine = {
  productId: string;
  size: SizeKey;
  quantity: number;
  product: Product | null;
  unitPrice: number | null;
  lineTotal: number | null;
  missing: boolean;
};

/**
 * Cart lines with prices derived from the repository at read time.
 * Never reads prices from persisted cart state.
 */
export function useCart() {
  const lines = useCartStore((s) => s.lines);
  const addItem = useCartStore((s) => s.addItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const changeSize = useCartStore((s) => s.changeSize);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const itemCount = useCartStore((s) => s.itemCount);

  const [productsById, setProductsById] = useState<Map<string, Product>>(
    () => new Map(),
  );

  useEffect(() => {
    let cancelled = false;
    void productRepository.getAll().then((products) => {
      if (cancelled) return;
      setProductsById(new Map(products.map((p) => [p.id, p])));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const resolved: ResolvedCartLine[] = useMemo(
    () =>
      lines.map((line) => {
        const product = productsById.get(line.productId) ?? null;
        if (!product) {
          return {
            ...line,
            product: null,
            unitPrice: null,
            lineTotal: null,
            missing: true,
          };
        }
        return {
          ...line,
          product,
          unitPrice: getUnitPrice(product, line.size),
          lineTotal: lineTotal(product, line.size, line.quantity),
          missing: false,
        };
      }),
    [lines, productsById],
  );

  const subtotal = useMemo(
    () => cartSubtotal(lines, productsById),
    [lines, productsById],
  );

  return {
    lines: resolved,
    rawLines: lines,
    subtotal,
    itemCount: itemCount(),
    productsById,
    addItem,
    setQuantity,
    changeSize,
    removeItem,
    clear,
  };
}
