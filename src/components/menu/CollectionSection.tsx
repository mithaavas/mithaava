import type { Product } from '@/domain/types';
import { ProductGrid } from '@/components/menu/ProductGrid';
import { LeadTimeChip } from '@/components/menu/LeadTimeChip';
import { cn } from '@/lib/cn';

export function CollectionSection({
  id,
  label,
  leadTimeHours,
  gradientKey,
  products,
}: {
  id: string;
  label: string;
  leadTimeHours?: number;
  gradientKey: string;
  products: Product[];
}) {
  if (products.length === 0) return null;
  return (
    <section
      id={`collection-${id}`}
      className={cn(
        'scroll-mt-36 rounded-[var(--radius-xl)] p-4 sm:p-6',
        `wash-${gradientKey}`,
      )}
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <h2 className="font-display text-2xl text-teal-900">{label}</h2>
        <LeadTimeChip hours={leadTimeHours} />
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
