import { AggregatorStrip } from '@/components/aggregators/AggregatorStrip';
import { cn } from '@/lib/cn';

export function AnnouncementBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'border-b border-icing-300/50 bg-cream-100/90 px-4 py-2 text-center',
        className,
      )}
    >
      <AggregatorStrip className="justify-center" />
    </div>
  );
}
