import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/config/site';

type LogoProps = {
  href?: string | null;
  className?: string;
  priority?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
};

const sizes = {
  sm: { w: 140, h: 56 },
  md: { w: 180, h: 72 },
  lg: { w: 240, h: 96 },
  hero: { w: 360, h: 144 },
};

export function Logo({
  href = '/',
  className,
  priority,
  size = 'md',
}: LogoProps) {
  const dim = sizes[size];
  const content = (
    <span className={cn('inline-flex items-center', className)}>
      <Image
        src="/brand/mithaava-logo.png"
        alt={`${siteConfig.brand} — ${siteConfig.taglines.primary}`}
        width={dim.w}
        height={dim.h}
        priority={priority}
        className={cn(
          'h-auto w-auto object-contain',
          size === 'sm' && 'max-h-10 sm:max-h-11',
          size === 'md' && 'max-h-12 sm:max-h-14',
          size === 'lg' && 'max-h-16 sm:max-h-20',
          size === 'hero' && 'max-h-24 sm:max-h-32',
        )}
      />
    </span>
  );

  if (href === null) return content;
  return (
    <Link
      href={href}
      className="inline-flex focus-visible:outline-offset-4"
      aria-label={siteConfig.brand}
    >
      {content}
    </Link>
  );
}
