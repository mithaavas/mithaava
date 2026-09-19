'use client';

import { copy } from '@/content/copy';

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative block w-full max-w-md">
      <span className="sr-only">{copy.a11y.search}</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={copy.menu.searchPlaceholder}
        className="h-11 w-full rounded-full border border-icing-300/80 bg-cream-50 px-4 text-base"
      />
    </label>
  );
}
