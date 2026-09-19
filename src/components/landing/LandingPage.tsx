'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Heart,
  Leaf,
  MapPin,
  Bike,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PlateCarousel } from '@/components/landing/PlateCarousel';
import { Button } from '@/components/ui/Button';
import { collections } from '@/data/collections';
import { siteConfig } from '@/config/site';
import { copy } from '@/content/copy';
import { useProducts } from '@/hooks/useProducts';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { lowestAvailablePrice } from '@/domain/pricing';
import { formatINR } from '@/lib/format';
import { cn } from '@/lib/cn';
import type { Product } from '@/domain/types';

const collectionPhotos: Record<string, string> = {
  'best-sellers': '/cakes/belgium-pineapple.jpg',
  chocolate: '/cakes/chocolate.jpg',
  cheese: '/cakes/philippines-blueberry-cheese.jpg',
  signature: '/cakes/red-velvet.jpg',
  'chocolate-recipe': '/cakes/choco-fudge.jpg',
  favourites: '/cakes/pineapple.jpg',
  fruit: '/cakes/fresh-fruit.jpg',
};

const benefitIcons = {
  fresh: Leaf,
  delivery: Bike,
  hours: MapPin,
  love: Heart,
} as const;

function heroBlurb(slug: string, fallback?: string) {
  const map = siteConfig.heroSpecialBlurbs;
  if (slug in map) return map[slug as keyof typeof map];
  return fallback;
}

export function LandingPage() {
  const reduced = useReducedMotionSafe();
  const router = useRouter();
  const { products } = useProducts();
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const featured = useMemo(() => {
    const bySlug = new Map(products.map((p) => [p.slug, p]));
    return siteConfig.heroFeaturedSlugs
      .map((slug) => bySlug.get(slug))
      .filter((p): p is Product => Boolean(p))
      .slice(0, 3);
  }, [products]);

  const active = featured[featuredIndex] ?? featured[0];
  const from = active ? lowestAvailablePrice(active) : null;
  const blurb = active
    ? heroBlurb(active.slug, active.note)
    : copy.landing.subline;

  const openCake = (product: Product) => {
    router.push(`/menu/${product.slug}/`);
  };

  return (
    <>
      <Header variant="landing" />
      <main>
        <section className="relative overflow-hidden bg-[#FFF6F2]">
          {/* Soft page atmosphere */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_18%,#f6c1bc55,transparent_42%),radial-gradient(ellipse_at_88%_12%,#fadad688,transparent_38%),linear-gradient(180deg,#FFF6F2_0%,#FFF9F3_55%,#FDF3E8_100%)]"
            aria-hidden
          />

          <div className="relative mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            {/* Copy */}
            <div className="relative z-10 flex flex-col px-6 pt-10 pb-8 sm:px-10 lg:min-h-[min(92vh,820px)] lg:justify-between lg:px-14 lg:pt-14 lg:pb-10">
              <div>
                <motion.p
                  className="text-[11px] font-semibold tracking-[0.18em] text-cocoa-800/45 uppercase sm:text-xs"
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {copy.landing.eyebrow}
                </motion.p>

                <motion.div
                  className="mt-5"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                >
                  <p className="font-display text-4xl font-semibold tracking-tight text-teal-900 sm:text-5xl">
                    {siteConfig.brand}
                  </p>
                  <p className="mt-1 text-sm font-medium tracking-[0.14em] text-gold-500 uppercase">
                    {siteConfig.taglines.primary}
                  </p>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active?.id ?? 'fallback'}
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h1 className="mt-8 max-w-lg font-display text-[clamp(2rem,4.2vw,3.15rem)] leading-[1.08] font-semibold text-berry-600">
                      {active?.name ?? copy.landing.headline}
                      {active ? (
                        <Heart
                          className="ml-2 inline-block h-6 w-6 -translate-y-1 fill-berry-600 text-berry-600 sm:h-7 sm:w-7"
                          aria-hidden
                        />
                      ) : null}
                    </h1>

                    <p className="mt-4 max-w-md text-base leading-relaxed text-cocoa-800/70">
                      {blurb}
                    </p>

                    {from != null ? (
                      <p className="mt-6 font-display text-3xl font-semibold text-berry-600 sm:text-4xl">
                        {formatINR(from)}
                        <span className="ml-2 text-base font-normal text-cocoa-800/45">
                          onwards
                        </span>
                      </p>
                    ) : null}
                  </motion.div>
                </AnimatePresence>

                <motion.div
                  className="mt-8"
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  <Link
                    href={active ? `/menu/${active.slug}/` : '/menu/'}
                  >
                    <Button size="lg" variant="accent" className="gap-2 pr-2">
                      {copy.landing.orderNow}
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/25">
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Benefits */}
              <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 lg:mt-0 lg:gap-x-3">
                {copy.landing.benefits.map((b) => {
                  const Icon = benefitIcons[b.id as keyof typeof benefitIcons];
                  return (
                    <li key={b.id} className="flex items-start gap-2.5">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-icing-200/80 text-berry-600">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-teal-900">
                          {b.title}
                        </span>
                        <span className="block text-xs text-cocoa-800/55">
                          {b.body}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Soft pink specials stage */}
            <div className="relative flex min-h-[420px] flex-col lg:min-h-[min(92vh,820px)]">
              <div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_58%_42%,#f8d0da_0%,#f2b4c4_38%,#e89eb0_62%,#f6c1bc_78%,#FFF6F2_100%)] lg:rounded-bl-[4rem]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
                aria-hidden
              >
                <div className="absolute top-[12%] left-[10%] h-24 w-24 rounded-full bg-white/50 blur-2xl" />
                <div className="absolute right-[14%] bottom-[22%] h-32 w-32 rounded-full bg-berry-600/15 blur-3xl" />
              </div>

              <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-10 pb-6 sm:pt-12 lg:px-8 lg:pt-16">
                <PlateCarousel
                  products={featured}
                  index={featuredIndex}
                  onIndexChange={setFeaturedIndex}
                  onSelect={openCake}
                  showCaption={false}
                  variant="special"
                  showBestSeller
                  scriptLine={copy.landing.scriptLine}
                />
              </div>

              {/* 01 · 02 · 03 */}
              <div className="relative z-10 flex flex-col items-center gap-3 px-6 pb-10 sm:pb-12 lg:items-end lg:pr-12">
                <p className="font-display text-base font-semibold tracking-wide text-white drop-shadow-sm">
                  {copy.landing.specialsLabel}
                </p>
                <div className="flex items-center gap-2.5">
                  {featured.slice(0, 3).map((p, i) => {
                    const n = String(i + 1).padStart(2, '0');
                    const on = featuredIndex === i;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        aria-label={`Special ${n}: ${p.name}`}
                        aria-current={on ? 'true' : undefined}
                        onClick={() => setFeaturedIndex(i)}
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold transition-colors',
                          on
                            ? 'bg-white text-berry-600 shadow-md'
                            : 'border border-white/80 text-white hover:bg-white/15',
                        )}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="collections"
          className="relative z-10 bg-cream-50 px-4 pt-14 pb-16 sm:px-6"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl text-teal-900 sm:text-3xl">
              Our cakes
            </h2>
            <p className="mt-2 max-w-xl text-cocoa-800/75">
              Pick a collection and build your order — delivery confirmed at
              checkout.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {collections.map((c) => (
                <Link
                  key={c.id}
                  href={`/menu/#collection-${c.id}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-[1.25rem]"
                >
                  <Image
                    src={
                      collectionPhotos[c.id] ?? '/cakes/cake-slice-berry.jpg'
                    }
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width:768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa-800/75 via-cocoa-800/20 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-3 font-display text-base font-semibold text-cream-50 sm:p-4 sm:text-lg">
                    {c.label}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <Link href="/menu/">
                <Button size="lg">Browse full menu</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
