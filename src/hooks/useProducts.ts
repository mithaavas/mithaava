'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';
import { productRepository } from '@/services/productRepository';
import type { Product } from '@/domain/types';

type ProductsState = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

export function useProducts(): ProductsState & {
  refresh: () => void;
  search: (query: string) => Promise<Product[]>;
  getBySlug: (slug: string) => Promise<Product | null>;
  getByCollection: (collectionId: string) => Promise<Product[]>;
} {
  const [products, setProducts] = useState<Product[]>(() =>
    productRepository.getAllSync(),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    void productRepository
      .getAll()
      .then((list) => {
        if (cancelled) return;
        startTransition(() => {
          setProducts(list);
          setLoading(false);
          setError(null);
        });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load products');
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tick, startTransition]);

  const refresh = useCallback(() => {
    setLoading(true);
    setTick((t) => t + 1);
  }, []);

  return {
    products,
    loading,
    error,
    refresh,
    search: (query) => productRepository.search(query),
    getBySlug: (slug) => productRepository.getBySlug(slug),
    getByCollection: (id) => productRepository.getByCollection(id),
  };
}
