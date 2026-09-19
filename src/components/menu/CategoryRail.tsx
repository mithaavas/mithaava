'use client';

import { cn } from '@/lib/cn';

export function CategoryRail({
  items,
  activeId,
  onSelect,
}: {
  items: { id: string; label: string }[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav
      aria-label="Collections"
      className="sticky top-[70px] z-30 -mx-4 border-b border-icing-300/50 bg-cream-50/95 pt-1 backdrop-blur sm:top-[78px] sm:-mx-6"
    >
      <div className="overflow-x-auto px-4 pt-3 pb-2.5 sm:px-6">
        <div className="flex w-max gap-2">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={cn(
                'inline-flex h-10 shrink-0 items-center rounded-full px-4 text-sm font-medium whitespace-nowrap',
                activeId === item.id
                  ? 'bg-teal-700 text-white'
                  : 'bg-cream-100 text-cocoa-800 hover:bg-icing-200',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
