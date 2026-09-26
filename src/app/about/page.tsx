import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import { copy } from '@/content/copy';

export const metadata: Metadata = {
  title: copy.about.title,
  description: copy.about.lead,
};

export default function AboutPage() {
  const { cofounder } = siteConfig.team;

  return (
    <>
      <Header variant="shop" />
      <main>
        <section className="relative overflow-hidden bg-[#FFF6F2]">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,#f6c1bc44,transparent_45%),radial-gradient(ellipse_at_10%_80%,#fadad655,transparent_40%)]"
            aria-hidden
          />

          <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-gold-500 uppercase">
                {copy.about.eyebrow}
              </p>
              <h1 className="mt-3 font-display text-4xl text-teal-900 sm:text-5xl">
                {siteConfig.brand}
              </h1>
              <p className="mt-2 text-sm font-medium tracking-[0.12em] text-gold-500 uppercase">
                {siteConfig.taglines.primary}
              </p>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-cocoa-800/80">
                {copy.about.lead}
              </p>
              {copy.about.story.map((para) => (
                <p
                  key={para.slice(0, 24)}
                  className="mt-4 max-w-md text-base leading-relaxed text-cocoa-800/70"
                >
                  {para}
                </p>
              ))}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/menu/">
                  <Button size="lg" variant="accent">
                    {copy.about.shopCta}
                  </Button>
                </Link>
                <Link href="/contact/">
                  <Button size="lg" variant="outline">
                    {copy.about.visitCta}
                  </Button>
                </Link>
              </div>
            </div>

            <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-icing-200/80 via-cream-50 to-teal-700/10 sm:-inset-4" aria-hidden />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-icing-300/50 bg-cream-50 shadow-[0_24px_60px_-28px_rgba(78,36,32,0.45)]">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={cofounder.image}
                    alt={cofounder.imageAlt}
                    fill
                    priority
                    className="object-cover object-[center_15%]"
                    sizes="(max-width:1024px) 90vw, 480px"
                  />
                </div>
              </div>
              <figcaption className="relative mt-5 text-center lg:text-left">
                <p className="font-display text-2xl text-teal-900">
                  {cofounder.name}
                </p>
                <p className="mt-0.5 text-sm font-semibold tracking-wide text-berry-600 uppercase">
                  {cofounder.role}
                </p>
                <p className="mt-3 max-w-sm font-[family-name:var(--font-script)] text-2xl leading-snug text-cocoa-800/80 lg:text-[1.65rem]">
                  “{copy.about.cofounderQuote}”
                </p>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="bg-cream-50 px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl text-teal-900 sm:text-3xl">
              {copy.about.valuesTitle}
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-3">
              {copy.about.values.map((v) => (
                <li
                  key={v.title}
                  className="border-t border-icing-300/70 pt-4"
                >
                  <p className="font-display text-xl text-teal-900">{v.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-cocoa-800/70">
                    {v.body}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-12 rounded-[var(--radius-xl)] border border-icing-300/60 bg-cream-100/70 p-6 sm:p-8">
              <p className="font-display text-xl text-teal-900">Find us</p>
              <p className="mt-2 text-cocoa-800/80">{siteConfig.address.full}</p>
              <p className="mt-1 text-sm text-cocoa-800/60">
                {siteConfig.businessHours.label} · {siteConfig.businessHours.days}
              </p>
              <p className="mt-3 text-sm text-cocoa-800/70">
                WhatsApp {siteConfig.contact.whatsappDisplay}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
