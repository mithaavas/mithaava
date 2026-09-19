import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export function Chip({
  className,
  active,
  type = 'button',
  ...props
}: ChipProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors',
        active
          ? 'border-teal-700 bg-teal-700 text-white'
          : 'border-icing-300/80 bg-cream-50 text-cocoa-800 hover:border-teal-700/40',
        className,
      )}
      {...props}
    />
  );
}
