import { cn } from '@/lib/cn';

export type FaqItem = { q: string; a: string };

export function FaqSection({
  faqs,
  title = 'Frequently asked questions',
  className,
}: {
  faqs: readonly FaqItem[];
  title?: string;
  className?: string;
}) {
  return (
    <section
      aria-labelledby="faq-heading"
      className={cn('border-t border-icing-300/40 bg-cream-50 px-4 py-12 sm:px-6', className)}
    >
      <div className="mx-auto max-w-3xl">
        <h2 id="faq-heading" className="font-display text-2xl text-teal-900 sm:text-3xl">
          {title}
        </h2>
        <dl className="mt-6 space-y-5">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-semibold text-teal-900">{f.q}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-cocoa-800/80 sm:text-base">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
