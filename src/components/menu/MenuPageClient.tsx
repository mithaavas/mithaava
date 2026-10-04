'use client';

import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { collections } from '@/data/collections';
import { useProducts } from '@/hooks/useProducts';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useIsClient } from '@/hooks/useIsClient';
import { CategoryRail } from '@/components/menu/CategoryRail';
import { CollectionSection } from '@/components/menu/CollectionSection';
import { SearchBar } from '@/components/menu/SearchBar';
import { ComingSoonPanel, MenuTabs, type MenuTabId } from '@/components/menu/MenuTabs';
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
  const [tab, setTab] = useState<MenuTabId>('cake');
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState(collections[0]?.id ?? '');
  const [, startTransition] = useTransition();
  const scrollLockUntil = useRef(0);

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
    if (tab !== 'cake' || filtered || loading) return;
    const sectionIds = [
      ...(favoriteProducts.length > 0 ? [YOUR_FAVOURITES_ID] : []),
      ...collections.map((c) => c.id),
    ];
    let frame = 0;
    const update = () => {
      frame = 0;
      if (Date.now() < scrollLockUntil.current) return;
      const railBottom =
        document.querySelector('nav[aria-label="Collections"]')?.getBoundingClientRect()
          .bottom ?? 0;
      const line = railBottom + 24;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(`collection-${id}`);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
      }
      if (atBottom) current = sectionIds[sectionIds.length - 1];
      if (current) startTransition(() => setActiveId(current));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [tab, products, filtered, loading, favoriteProducts.length, startTransition]);

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
          <h1 className="sr-only">{copy.menu.heading}</h1>
          <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
            <MenuTabs value={tab} onChange={setTab} />
            {tab === 'cake' ? <SearchBar value={query} onChange={setQuery} /> : null}
          </div>

          {tab !== 'cake' ? (
            <ComingSoonPanel tab={tab} />
          ) : filtered ? (
            <div role="tabpanel" id="menu-panel-cake" aria-labelledby="menu-tab-cake" className="pb-8">
              {filtered.length === 0 ? (
                <p className="text-cocoa-800/80">{copy.menu.searchEmpty(query)}</p>
              ) : (
                <ProductGrid products={filtered} />
              )}
            </div>
          ) : (
            <div role="tabpanel" id="menu-panel-cake" aria-labelledby="menu-tab-cake">
              <CategoryRail
                items={railItems}
                activeId={activeId}
                onSelect={(id) => {
                  setActiveId(id);
                  scrollLockUntil.current = Date.now() + 900;
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
            </div>
          )}
        </main>
      </PageTransition>
      <MobileCartBar />
    </>
  );
}
