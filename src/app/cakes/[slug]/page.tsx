import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import { BlogCard } from '@/components/blog/BlogCard';
import { DeliveryAreas } from '@/components/seo/DeliveryAreas';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import { whatsappConfig } from '@/config/whatsapp';
import { getBlogBySlug } from '@/data/blogs';
import { getAllCategoryPages, getCategoryPageBySlug } from '@/data/categoryPages';
import { lowestAvailablePrice } from '@/domain/pricing';
import { formatINR } from '@/lib/format';
import { breadcrumbJsonLd, categoryPath, faqJsonLd, itemListJsonLd } from '@/lib/seo';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { productRepository } from '@/services/productRepository';

export function generateStaticParams() {
  return getAllCategoryPages().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/cakes/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const page = getCategoryPageBySlug(slug);
  if (!page) return { title: 'Cakes' };
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords],
    alternates: { canonical: categoryPath(page.slug) },
    openGraph: {
      title: `${page.metaTitle} | ${siteConfig.brand}`,
      description: page.metaDescription,
      url: categoryPath(page.slug),
    },
  };
}

export default async function CategoryLandingPage({
  params,
}: PageProps<'/cakes/[slug]'>) {
  const { slug } = await params;
  const page = getCategoryPageBySlug(slug);
  if (!page) notFound();

  const all = await productRepository.getAll();
  const inPage = all.filter(
    (p) =>
      p.collections.some((c) => page.collectionIds.includes(c)) ||
      page.extraProductSlugs?.includes(p.slug),
  );
  const rank = (s: string) => {
    const i = page.featuredProductSlugs.indexOf(s);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };
  const products = [...inPage].sort((a, b) => rank(a.slug) - rank(b.slug));
  const blogs = page.relatedBlogSlugs
    .map((s) => getBlogBySlug(s))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const whatsappUrl = buildWhatsAppUrl(
    whatsappConfig.number,
    `Hi ${siteConfig.brand}! I'm looking for ${page.navLabel.toLowerCase()} — can you help me choose?`,
  );

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu/' },
    { name: page.navLabel, path: categoryPath(page.slug) },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          itemListJsonLd(page.heading, products),
          faqJsonLd(page.faqs),
        ]}
      />
      <Header variant="shop" />
      <main className="bg-cream-50">
        <section className="bg-[#FFF6F2] px-4 pt-6 pb-10 sm:px-6 sm:pt-8 sm:pb-12">
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" className="text-xs text-cocoa-800/55">
              {crumbs.map((c, i) => (
                <span key={c.path}>
                  {i > 0 ? <span className="mx-1.5">/</span> : null}
                  {i < crumbs.length - 1 ? (
                    <Link href={c.path} className="hover:underline">
                      {c.name}
                    </Link>
                  ) : (
                    <span className="text-cocoa-800/80">{c.name}</span>
                  )}
                </span>
              ))}
            </nav>
            <h1 className="mt-4 max-w-3xl font-display text-3xl leading-tight text-teal-900 sm:text-4xl lg:text-[2.75rem]">
              {page.heading}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-cocoa-800/80 sm:text-lg">
              {page.intro}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#cakes">
                <Button size="lg" variant="accent" className="gap-2">
                  {page.ctaLabel ?? `Shop ${page.navLabel.toLowerCase()}`}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="whatsapp" className="gap-2">
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section id="cakes" className="scroll-mt-24 px-4 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl text-teal-900 sm:text-3xl">
              {page.navLabel} — order online
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => {
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
                            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
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

        <section className="border-t border-icing-300/40 px-4 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-3xl space-y-8">
            {page.sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-display text-2xl text-teal-900">{s.heading}</h2>
                <p className="mt-3 text-sm leading-relaxed text-cocoa-800/80 sm:text-base">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-icing-300/40 px-4 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl text-teal-900">
              {page.navLabel} — FAQs
            </h2>
            <dl className="mt-6 divide-y divide-icing-300/60">
              {page.faqs.map((f) => (
                <div key={f.q} className="py-4">
                  <dt className="font-semibold text-teal-900">{f.q}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-cocoa-800/75">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {blogs.length > 0 ? (
          <section className="border-t border-icing-300/40 px-4 py-10 sm:px-6 sm:py-12">
            <div className="mx-auto max-w-6xl">
              <h2 className="font-display text-2xl text-teal-900">Cake guides</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {blogs.map((b) => (
                  <BlogCard key={b.slug} post={b} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <DeliveryAreas />
      </main>
      <Footer />
    </>
  );
}
