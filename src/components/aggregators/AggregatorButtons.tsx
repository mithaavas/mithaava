'use client';

import Link from 'next/link';
import { aggregatorList, isConfigured } from '@/config/aggregators';
import { copy } from '@/content/copy';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';

type AggregatorButtonsProps = {
  size?: 'md' | 'lg';
  className?: string;
  layout?: 'row' | 'stack';
};

export function AggregatorButtons({
  size = 'md',
  className,
  layout = 'row',
}: AggregatorButtonsProps) {
  return (
    <div
      className={cn(
        'flex gap-3',
        layout === 'stack' ? 'w-full flex-col' : 'flex-wrap',
        className,
      )}
    >
      {aggregatorList.map((agg) => {
        const ready = isConfigured(agg);
        const style = {
          backgroundColor: ready ? agg.brandColor : undefined,
          borderColor: agg.brandColor,
          color: ready ? '#fff' : agg.brandColor,
        } as const;

        if (!ready) {
          return (
            <Button
              key={agg.id}
              size={size}
              variant="outline"
              disabled
              title="Coming soon"
              className={cn(layout === 'stack' && 'w-full', 'border-2')}
              style={style}
            >
              {agg.label}
              <span className="sr-only"> — Coming soon</span>
            </Button>
          );
        }

        return (
          <a
            key={agg.id}
            href={agg.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(layout === 'stack' && 'w-full')}
          >
            <Button
              size={size}
              className={cn('w-full border-0 text-white')}
              style={{ backgroundColor: agg.brandColor }}
            >
              {agg.label}
            </Button>
          </a>
        );
      })}
    </div>
  );
}

export function AggregatorStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-cocoa-800/80',
        className,
      )}
    >
      <span>{copy.aggregators.strip}</span>
      <div className="flex flex-wrap gap-2">
        {aggregatorList.map((agg) => {
          const ready = isConfigured(agg);
          if (!ready) {
            return (
              <span
                key={agg.id}
                title="Coming soon"
                className="rounded-full border px-3 py-1 text-xs font-semibold opacity-60"
                style={{ borderColor: agg.brandColor, color: agg.brandColor }}
              >
                {agg.label}
              </span>
            );
          }
          return (
            <Link
              key={agg.id}
              href={agg.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border px-3 py-1 text-xs font-semibold"
              style={{ borderColor: agg.brandColor, color: agg.brandColor }}
            >
              {agg.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
