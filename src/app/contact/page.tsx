import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactForm } from '@/components/contact/ContactForm';
import { MapEmbed } from '@/components/brand/MapEmbed';
import { siteConfig } from '@/config/site';
import { copy } from '@/content/copy';

export const metadata: Metadata = {
  title: 'Contact Us — Bakery in Sector 46, Gurugram (Open 24/7)',
  description: `Contact Mithaava bakery, House No. 540 LGF, Sector 46, Gurugram. Open 24 hours — WhatsApp ${siteConfig.contact.whatsappDisplay} or get directions on Google Maps.`,
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <Header variant="shop" />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="font-display text-3xl text-teal-900 sm:text-4xl">
          {copy.contact.title}
        </h1>
        <p className="mt-3 max-w-xl text-cocoa-800/75">{copy.contact.subline}</p>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-2">
          <div className="rounded-[var(--radius-xl)] border border-icing-300/60 bg-cream-50/90 p-5 shadow-[var(--shadow-soft)] sm:p-6">
            <ContactForm />
          </div>
          <div>
            <h2 className="font-display text-xl text-teal-900">
              Find our bakery in {siteConfig.address.locality}, {siteConfig.address.city}
            </h2>
            <p className="mt-1 text-sm text-cocoa-800/65">
              {siteConfig.businessHours.label} · {siteConfig.businessHours.days} · WhatsApp{' '}
              {siteConfig.contact.whatsappDisplay}
            </p>
            <MapEmbed className="mt-4" heightClassName="h-72 sm:h-96" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
