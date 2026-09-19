import { copy } from '@/content/copy';
import { cn } from '@/lib/cn';

export function LeadTimeChip({
  hours,
  className,
}: {
  hours?: number;
  className?: string;
}) {
  if (!hours) return null;
  return (
    <span
      className={cn(
        'inline-flex rounded-full bg-marigold-500/20 px-2.5 py-1 text-xs font-medium text-cocoa-800',
        className,
      )}
    >
      {copy.menu.orderHoursAhead(hours)}
    </span>
  );
}
