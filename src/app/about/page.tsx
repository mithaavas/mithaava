import type { Metadata } from 'next';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
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
      <main className="bg-[#FFF6F2]">
        <section className="mx-auto max-w-6xl px-4 pt-6 pb-10 sm:px-6 sm:pt-8 sm:pb-12">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:gap-10 xl:gap-14">
            {/* Story */}
            <div className="min-w-0">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-gold-500 uppercase">
                {copy.about.eyebrow}
              </p>
              <h1 className="mt-2 font-display text-3xl text-teal-900 sm:text-4xl">
                {copy.about.title}
              </h1>
              <p className="mt-1 text-sm font-medium tracking-[0.12em] text-gold-500 uppercase">
                {siteConfig.brand} · {siteConfig.taglines.primary}
              </p>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-cocoa-800/85 sm:text-lg">
                {copy.about.lead}
              </p>
              <div className="mt-4 max-w-xl space-y-3 text-sm leading-relaxed text-cocoa-800/70 sm:text-base">
                {copy.about.story.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </div>
            </div>

            {/* Co-founder — larger portrait, same two-column rhythm */}
            <aside className="mx-auto w-full max-w-[400px] lg:mx-0 lg:max-w-none">
              <figure>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.35rem] border border-icing-300/60 bg-cream-50 shadow-[0_18px_40px_-24px_rgba(78,36,32,0.4)]">
                  <Image
                    src={cofounder.image}
                    alt={cofounder.imageAlt}
                    fill
                    priority
                    className="object-cover object-[center_12%]"
                    sizes="(max-width:1024px) 400px, 400px"
                  />
                </div>
                <figcaption className="mt-4 px-0.5">
                  <p className="font-display text-xl leading-tight text-teal-900 sm:text-2xl">
                    {cofounder.name}
                  </p>
                  <p className="mt-1 text-xs font-semibold tracking-wide text-berry-600 uppercase">
                    {cofounder.role}
                  </p>
                  <p className="mt-3 border-l-2 border-icing-300 pl-3 text-sm leading-relaxed text-cocoa-800/75 sm:text-[0.95rem]">
                    “{copy.about.cofounderQuote}”
                  </p>
                </figcaption>
              </figure>
            </aside>
          </div>
        </section>

        <section className="border-t border-icing-300/40 bg-cream-50 px-4 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl text-teal-900">
              {copy.about.valuesTitle}
            </h2>
            <ul className="mt-6 grid gap-6 sm:grid-cols-3">
              {copy.about.values.map((v) => (
                <li key={v.title} className="border-t border-icing-300/70 pt-3">
                  <p className="font-display text-lg text-teal-900">{v.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-cocoa-800/70">
                    {v.body}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-2 rounded-[var(--radius-lg)] border border-icing-300/60 bg-cream-100/60 px-5 py-5 sm:grid-cols-[1fr_auto] sm:items-end sm:px-6">
              <div>
                <p className="font-display text-lg text-teal-900">Find us</p>
                <p className="mt-1 text-sm text-cocoa-800/80">
                  {siteConfig.address.full}
                </p>
                <p className="mt-0.5 text-sm text-cocoa-800/55">
                  {siteConfig.businessHours.label} ·{' '}
                  {siteConfig.businessHours.days}
                </p>
              </div>
              <p className="text-sm font-medium text-cocoa-800/75">
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
