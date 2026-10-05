import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MapEmbed } from '@/components/brand/MapEmbed';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import { DeliveryAreas } from '@/components/seo/DeliveryAreas';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import { deliveryConfig } from '@/config/delivery';
import { whatsappConfig } from '@/config/whatsapp';
import { getAllLocalities, getLocalityBySlug } from '@/data/localities';
import { lowestAvailablePrice } from '@/domain/pricing';
import { formatINR } from '@/lib/format';
import { localityJsonLd, localityPath } from '@/lib/seo';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { productRepository } from '@/services/productRepository';

export function generateStaticParams() {
  return getAllLocalities().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/cake-delivery/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const locality = getLocalityBySlug(slug);
  if (!locality) return { title: 'Cake delivery' };
  return {
    title: locality.metaTitle,
    description: locality.metaDescription,
    alternates: { canonical: localityPath(locality.slug) },
    openGraph: {
      title: `${locality.metaTitle} | ${siteConfig.brand}`,
      description: locality.metaDescription,
      url: localityPath(locality.slug),
      images: [{ url: '/brand/mithaava-logo.png' }],
    },
  };
}

export default async function LocalityPage({
  params,
}: PageProps<'/cake-delivery/[slug]'>) {
  const { slug } = await params;
  const locality = getLocalityBySlug(slug);
  if (!locality) notFound();

  const products = await productRepository.getAll();
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const popular = locality.popularProductSlugs
    .map((s) => bySlug.get(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const whatsappUrl = buildWhatsAppUrl(
    whatsappConfig.number,
    `Hi ${siteConfig.brand}! I'd like to order a cake for delivery in ${locality.name}, ${siteConfig.address.city}.`,
  );

  const highlights = [
    { icon: Clock, title: siteConfig.businessHours.label, body: 'Midnight surprises welcome' },
    {
      icon: MapPin,
      title: `All of ${deliveryConfig.serviceArea}`,
      body: `From ${siteConfig.address.locality}, ${siteConfig.address.city}`,
    },
    { icon: ShieldCheck, title: 'FSSAI registered', body: `Reg. ${siteConfig.fssai}` },
  ];

  return (
    <>
      <Header variant="shop" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localityJsonLd(locality)) }}
      />
      <main className="bg-cream-50">
        <section className="bg-[#FFF6F2] px-4 pt-6 pb-10 sm:px-6 sm:pt-8 sm:pb-12">
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" className="text-xs text-cocoa-800/55">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-1.5">/</span>
              <Link href="/cake-delivery/" className="hover:underline">
                Cake delivery
              </Link>
              <span className="mx-1.5">/</span>
              <span className="text-cocoa-800/80">{locality.shortName}</span>
            </nav>

            <h1 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-teal-900 sm:text-4xl lg:text-[2.75rem]">
              {locality.heading}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-cocoa-800/80 sm:text-lg">
              {locality.intro}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/menu/">
                <Button size="lg" variant="accent" className="gap-2">
                  Order a cake
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="whatsapp" className="gap-2">
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp
                </Button>
              </a>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-icing-200/80 text-berry-600">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-teal-900">{title}</span>
                    <span className="block text-xs text-cocoa-800/60">{body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,440px)]">
            <div className="min-w-0">
              <h2 className="font-display text-2xl text-teal-900">
                Why {locality.shortName} orders from {siteConfig.brand}
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-cocoa-800/75 sm:text-base">
                {locality.body.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </div>

              <h3 className="mt-8 font-display text-lg text-teal-900">
                Areas we cover around {locality.shortName}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {locality.neighbourhoods.map((n) => (
                  <li
                    key={n}
                    className="rounded-full bg-icing-200/60 px-3 py-1 text-xs font-medium text-cocoa-800/80"
                  >
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-cocoa-800/55">
                Common pincodes: {locality.pincodes.join(', ')} — check yours at checkout.
              </p>
            </div>

            <div>
              <h2 className="sr-only">Our bakery location</h2>
              <MapEmbed heightClassName="h-64 sm:h-72" />
            </div>
          </div>
        </section>

        {popular.length > 0 ? (
          <section className="border-t border-icing-300/40 px-4 py-10 sm:px-6 sm:py-12">
            <div className="mx-auto max-w-6xl">
              <h2 className="font-display text-2xl text-teal-900">
                Popular cakes in {locality.shortName}
              </h2>
              <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {popular.map((p) => {
                  const from = lowestAvailablePrice(p);
                  return (
                    <li key={p.id}>
                      <Link href={`/menu/${p.slug}/`} className="group block">
                        <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-icing-200/50">
                          {p.image ? (
                            <Image
                              src={p.image.src}
                              alt={p.image.alt}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width:640px) 50vw, 25vw"
                            />
                          ) : null}
                        </div>
                        <h3 className="mt-2.5 font-display text-base text-teal-900 group-hover:text-berry-600">
                          {p.name}
                        </h3>
                        {from != null ? (
                          <p className="text-sm text-cocoa-800/65">From {formatINR(from)}</p>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="border-t border-icing-300/40 px-4 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl text-teal-900">
              Cake delivery in {locality.shortName} — FAQs
            </h2>
            <dl className="mt-6 divide-y divide-icing-300/60">
              {locality.faqs.map((f) => (
                <div key={f.q} className="py-4">
                  <dt className="font-semibold text-teal-900">{f.q}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-cocoa-800/75">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <DeliveryAreas
          excludeSlug={locality.slug}
          title="We also deliver to"
        />
      </main>
      <Footer />
    </>
  );
}
