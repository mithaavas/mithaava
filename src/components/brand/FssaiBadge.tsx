import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { copy } from '@/content/copy';
import { cn } from '@/lib/cn';

type FssaiBadgeProps = {
  variant?: 'cream' | 'footer';
  className?: string;
};

/**
 * Trust strip: Mithaava mark + FSSAI Approved seal.
 */
export function FssaiBadge({
  variant = 'cream',
  className,
}: FssaiBadgeProps) {
  const footer = variant === 'footer';
  const licence = siteConfig.fssai.trim();

  return (
    <div
      className={cn(
        'inline-flex max-w-full items-center gap-3 rounded-2xl border px-3 py-2.5 sm:gap-3.5 sm:px-4 sm:py-3',
        footer
          ? 'border-white/15 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
          : 'border-icing-300/70 bg-cream-50/95 shadow-[var(--shadow-soft)]',
        className,
      )}
      role="group"
      aria-label={
        licence
          ? `${copy.footer.fssaiApproved} · ${copy.footer.fssaiLicence(licence)}`
          : copy.footer.fssaiApproved
      }
    >
      <Image
        src="/brand/mithaava-logo.png"
        alt=""
        width={120}
        height={48}
        className={cn(
          'h-9 w-auto object-contain sm:h-10',
          footer && 'brightness-110',
        )}
      />

      <span
        className={cn(
          'h-9 w-px shrink-0 sm:h-10',
          footer ? 'bg-white/20' : 'bg-icing-300/80',
        )}
        aria-hidden
      />

      <Image
        src="/brand/fssai-approved-seal.png"
        alt=""
        width={56}
        height={56}
        className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12"
      />

      <div className="min-w-0 text-left">
        <p
          className={cn(
            'text-[11px] font-semibold tracking-[0.14em] uppercase sm:text-xs',
            footer ? 'text-[#7dcea0]' : 'text-[#1b7a3a]',
          )}
        >
          {copy.footer.fssaiApproved}
        </p>
        <p
          className={cn(
            'mt-0.5 text-sm font-medium leading-snug',
            footer ? 'text-cream-50/90' : 'text-teal-900',
          )}
        >
          {siteConfig.brand}
        </p>
        {licence ? (
          <p
            className={cn(
              'mt-0.5 text-[11px] tabular-nums sm:text-xs',
              footer ? 'text-cream-50/55' : 'text-cocoa-800/55',
            )}
          >
            {copy.footer.fssaiLicence(licence)}
          </p>
        ) : (
          <p
            className={cn(
              'mt-0.5 text-[11px] sm:text-xs',
              footer ? 'text-cream-50/50' : 'text-cocoa-800/50',
            )}
          >
            {copy.footer.fssaiSafe}
          </p>
        )}
      </div>
    </div>
  );
}
