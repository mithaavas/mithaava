import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactForm } from '@/components/contact/ContactForm';
import { copy } from '@/content/copy';

export const metadata: Metadata = {
  title: copy.contact.title,
  description:
    'Contact Mithaava in Sector 46, Gurugram — send us a message on WhatsApp.',
};

export default function ContactPage() {
  return (
    <>
      <Header variant="shop" />
      <main className="mx-auto max-w-lg px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="font-display text-3xl text-teal-900 sm:text-4xl">
          {copy.contact.title}
        </h1>
        <p className="mt-3 text-cocoa-800/75">{copy.contact.subline}</p>
        <div className="mt-8 rounded-[var(--radius-xl)] border border-icing-300/60 bg-cream-50/90 p-5 shadow-[var(--shadow-soft)] sm:p-6">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
