'use client';

import { cn } from '@/lib/cn';

export type SegmentOption<T extends string> = {
  value: T;
  label: string;
  disabled?: boolean;
  title?: string;
};

type SegmentedControlProps<T extends string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  ariaLabel?: string;
};

/** Chip-style size control — berry selected pills. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  ariaLabel,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn('flex flex-wrap gap-2', className)}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={option.disabled}
            title={option.title}
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex h-11 min-w-[4.75rem] items-center justify-center rounded-full px-4 text-sm font-semibold transition-[transform,background-color,border-color,box-shadow] duration-150 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40',
              selected
                ? 'bg-berry-600 text-white shadow-[0_6px_16px_-8px_rgba(194,37,92,0.65)]'
                : 'border border-icing-300/90 bg-white text-cocoa-800 hover:border-berry-600/35',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
