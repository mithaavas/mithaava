import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { deliveryConfig } from '@/config/delivery';
import { siteConfig } from '@/config/site';
import { getAllLocalities } from '@/data/localities';
import { localityPath } from '@/lib/seo';
import { cn } from '@/lib/cn';

type DeliveryAreasProps = {
  /** Slug to omit — used on a locality page to list the other areas */
  excludeSlug?: string;
  title?: string;
  className?: string;
};

export function DeliveryAreas({
  excludeSlug,
  title = 'Cake delivery across Delhi NCR',
  className,
}: DeliveryAreasProps) {
  const areas = getAllLocalities().filter((l) => l.slug !== excludeSlug);

  return (
    <section
      aria-labelledby="delivery-areas-heading"
      className={cn(
        'border-t border-icing-300/40 bg-[#FFF6F2] px-4 py-12 sm:px-6',
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="delivery-areas-heading"
          className="font-display text-2xl text-teal-900 sm:text-3xl"
        >
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-cocoa-800/75">
          Baked fresh in {siteConfig.address.locality}, {siteConfig.address.city}{' '}
          and delivered anywhere in {deliveryConfig.serviceArea} —{' '}
          {siteConfig.businessHours.label.toLowerCase()}, every day.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {areas.map((l) => (
            <li key={l.slug}>
              <Link
                href={localityPath(l.slug)}
                className="inline-flex items-center gap-1.5 rounded-full border border-icing-300/80 bg-cream-50 px-4 py-2 text-sm font-medium text-teal-900 transition-colors hover:border-berry-600/50 hover:text-berry-600"
              >
                <MapPin className="h-3.5 w-3.5 text-berry-600" aria-hidden />
                Cake delivery in {l.shortName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
