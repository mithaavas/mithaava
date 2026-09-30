import { MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { getMapEmbedUrl, getMapLinkUrl } from '@/lib/maps';
import { cn } from '@/lib/cn';

type MapEmbedProps = {
  className?: string;
  heightClassName?: string;
};

export function MapEmbed({
  className,
  heightClassName = 'h-72 sm:h-80',
}: MapEmbedProps) {
  return (
    <figure
      className={cn(
        'overflow-hidden rounded-[var(--radius-xl)] border border-icing-300/60 bg-cream-50 shadow-[var(--shadow-soft)]',
        className,
      )}
    >
      <iframe
        title={`${siteConfig.brand} on Google Maps — ${siteConfig.address.full}`}
        src={getMapEmbedUrl()}
        className={cn('block w-full border-0', heightClassName)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <figcaption className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm sm:px-5">
        <span className="inline-flex items-start gap-2 text-cocoa-800/80">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-berry-600" aria-hidden />
          <span>
            <span className="font-medium text-teal-900">{siteConfig.brand}</span>
            {' · '}
            {siteConfig.address.full}
          </span>
        </span>
        <a
          href={getMapLinkUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-teal-700 underline-offset-2 hover:underline"
        >
          Get directions
        </a>
      </figcaption>
    </figure>
  );
}
