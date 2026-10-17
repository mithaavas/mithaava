import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MapEmbed } from '@/components/brand/MapEmbed';
import { FaqSection } from '@/components/seo/FaqSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import { deliveryConfig } from '@/config/delivery';
import { getAllLocalities } from '@/data/localities';
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  deliveryHubFaqs,
  faqJsonLd,
  localityPath,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Cake Delivery Across Delhi NCR — Gurugram, Delhi, Noida & more',
  description: `Mithaava delivers fresh cakes 24/7 across ${deliveryConfig.serviceArea} from Sector 46, Gurugram — Delhi, Noida, Faridabad, Sohna Road, Golf Course Extension & more.`,
  alternates: { canonical: '/cake-delivery/' },
};

export default function CakeDeliveryIndexPage() {
  const areas = getAllLocalities();
  const cities = areas.filter((l) => l.tier === 'city');
  const neighbourhoods = areas.filter((l) => l.tier !== 'city');

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Cake delivery', path: '/cake-delivery/' },
          ]),
          collectionPageJsonLd(
            'Cake delivery areas',
            '/cake-delivery/',
            areas.map((l) => ({ name: l.name, url: localityPath(l.slug) })),
          ),
          faqJsonLd([...deliveryHubFaqs]),
        ]}
      />
      <Header variant="shop" />
      <main className="bg-cream-50">
        <section className="bg-[#FFF6F2] px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-12">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-gold-500 uppercase">
              Delivery areas
            </p>
            <h1 className="mt-2 max-w-3xl font-display text-3xl leading-tight text-teal-900 sm:text-4xl">
              24/7 cake delivery across {deliveryConfig.serviceArea}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-cocoa-800/80 sm:text-lg">
              Every {siteConfig.brand} cake is baked in {siteConfig.address.locality},{' '}
              {siteConfig.address.city} and delivered fresh anywhere in{' '}
              {deliveryConfig.serviceArea} — Gurugram, Delhi, Noida, Greater Noida, Ghaziabad
              and Faridabad — day or night.
            </p>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,440px)]">
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-xl text-teal-900">Cities we deliver to</h2>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                  {cities.map((l) => (
                    <li key={l.slug}>
                      <Link
                        href={localityPath(l.slug)}
                        className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-icing-300/60 bg-cream-50 p-5 transition-colors hover:border-berry-600/40"
                      >
                        <h3 className="font-display text-lg text-teal-900 group-hover:text-berry-600">
                          Cake delivery in {l.name}
                        </h3>
                        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-cocoa-800/70">
                          {l.intro}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal-700">
                          View area
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-xl text-teal-900">
                  Gurugram neighbourhoods near our bakery
                </h2>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                  {neighbourhoods.map((l) => (
                    <li key={l.slug}>
                      <Link
                        href={localityPath(l.slug)}
                        className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-icing-300/60 bg-cream-50 p-5 transition-colors hover:border-berry-600/40"
                      >
                        <h3 className="font-display text-lg text-teal-900 group-hover:text-berry-600">
                          Cake delivery in {l.name}
                        </h3>
                        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-cocoa-800/70">
                          {l.intro}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal-700">
                          View area
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h2 className="sr-only">Our bakery location</h2>
              <MapEmbed />
            </div>
          </div>
        </section>

        <FaqSection faqs={[...deliveryHubFaqs]} title="Cake delivery FAQs" />
      </main>
      <Footer />
    </>
  );
}
