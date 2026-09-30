import Link from 'next/link';
import type { Product } from '@/domain/types';
import { getCategoryPageForCollection } from '@/data/categoryPages';
import { categoryPath } from '@/lib/seo';
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
  const categoryPage = getCategoryPageForCollection(id);
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
        <div className="flex items-center gap-3">
          <LeadTimeChip hours={leadTimeHours} />
          {categoryPage?.collectionIds[0] === id ? (
            <Link
              href={categoryPath(categoryPage.slug)}
              className="text-sm font-semibold text-teal-700 underline-offset-2 hover:underline"
            >
              About our {categoryPage.navLabel.toLowerCase()}
            </Link>
          ) : null}
        </div>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
