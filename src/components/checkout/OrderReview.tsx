import { formatINR } from '@/lib/format';
import type { ResolvedCartLine } from '@/hooks/useCart';
import { siteConfig } from '@/config/site';

export function OrderReview({
  lines,
  subtotal,
}: {
  lines: ResolvedCartLine[];
  subtotal: number;
}) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-icing-300/60 bg-cream-100/60 p-4">
      <h3 className="font-display text-xl text-teal-900">Review</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {lines.map((line) => (
          <li
            key={`${line.productId}-${line.size}`}
            className="flex justify-between gap-3"
          >
            <span>
              {line.product?.name ?? 'Unavailable'} ·{' '}
              {siteConfig.sizeLabels[line.size].label} × {line.quantity}
            </span>
            <span className="tabular-nums">
              {line.lineTotal !== null ? formatINR(line.lineTotal) : '—'}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex justify-between border-t border-icing-300/50 pt-3 font-semibold">
        <span>Subtotal</span>
        <span className="tabular-nums">{formatINR(subtotal)}</span>
      </div>
    </div>
  );
}
