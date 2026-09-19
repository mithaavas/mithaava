'use client';

import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { collections } from '@/data/collections';
import { useProducts } from '@/hooks/useProducts';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useIsClient } from '@/hooks/useIsClient';
import { CategoryRail } from '@/components/menu/CategoryRail';
import { CollectionSection } from '@/components/menu/CollectionSection';
import { SearchBar } from '@/components/menu/SearchBar';
import { ProductGrid } from '@/components/menu/ProductGrid';
import { MobileCartBar } from '@/components/layout/MobileCartBar';
import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { Skeleton } from '@/components/ui/Skeleton';
import { copy } from '@/content/copy';
import type { Product } from '@/domain/types';

const YOUR_FAVOURITES_ID = 'your-favourites';

export function MenuPageClient() {
  const { products, loading } = useProducts();
  const ready = useIsClient();
  const favoriteIds = useFavoritesStore((s) => s.ids);
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState(collections[0]?.id ?? '');
  const [, startTransition] = useTransition();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const favoriteProducts = useMemo(() => {
    if (!ready || favoriteIds.length === 0) return [];
    const byId = new Map(products.map((p) => [p.id, p]));
    return favoriteIds
      .map((id) => byId.get(id))
      .filter((p): p is Product => Boolean(p));
  }, [products, favoriteIds, ready]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.note?.toLowerCase().includes(q) ?? false),
    );
  }, [products, query]);

  useEffect(() => {
    observerRef.current?.disconnect();
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id.startsWith('collection-')) {
          startTransition(() => {
            setActiveId(visible.target.id.replace('collection-', ''));
          });
        }
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0.1, 0.4] },
    );
    observerRef.current = observer;
    const sectionIds = [
      ...(favoriteProducts.length > 0 ? [YOUR_FAVOURITES_ID] : []),
      ...collections.map((c) => c.id),
    ];
    sectionIds.forEach((id) => {
      const el = document.getElementById(`collection-${id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [products, filtered, favoriteProducts.length, startTransition]);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('collection-')) {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [products, favoriteProducts.length]);

  const byCollection = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const c of collections) map.set(c.id, []);
    for (const p of products) {
      for (const cid of p.collections) {
        map.get(cid)?.push(p);
      }
    }
    return map;
  }, [products]);

  const railItems = [
    ...(favoriteProducts.length > 0
      ? [{ id: YOUR_FAVOURITES_ID, label: copy.favourites.nav }]
      : []),
    ...collections.map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <>
      <Header variant="shop" />
      <PageTransition>
        <main className="mx-auto max-w-6xl px-4 pb-28 sm:px-6">
          <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="font-display text-3xl text-teal-900">Menu</h1>
            <SearchBar value={query} onChange={setQuery} />
          </div>

          {filtered ? (
            <div className="pb-8">
              {filtered.length === 0 ? (
                <p className="text-cocoa-800/80">{copy.menu.searchEmpty(query)}</p>
              ) : (
                <ProductGrid products={filtered} />
              )}
            </div>
          ) : (
            <>
              <CategoryRail
                items={railItems}
                activeId={activeId}
                onSelect={(id) => {
                  setActiveId(id);
                  document
                    .getElementById(`collection-${id}`)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              />
              <div className="mt-6 space-y-10">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-64 w-full" />
                  ))
                ) : (
                  <>
                    {favoriteProducts.length > 0 ? (
                      <CollectionSection
                        id={YOUR_FAVOURITES_ID}
                        label={copy.favourites.title}
                        gradientKey="favourites"
                        products={favoriteProducts}
                      />
                    ) : null}
                    {collections.map((c) => (
                      <CollectionSection
                        key={c.id}
                        id={c.id}
                        label={c.label}
                        leadTimeHours={c.leadTimeHours}
                        gradientKey={c.gradientKey}
                        products={byCollection.get(c.id) ?? []}
                      />
                    ))}
                  </>
                )}
              </div>
            </>
          )}
        </main>
      </PageTransition>
      <MobileCartBar />
    </>
  );
}
