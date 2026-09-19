import type { Product } from '@/domain/types';
import { ProductGrid } from '@/components/menu/ProductGrid';
import { copy } from '@/content/copy';

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="mb-4 font-display text-2xl text-teal-900">
        {copy.menu.youMayAlsoLike}
      </h2>
      <ProductGrid products={products.slice(0, 3)} />
    </section>
  );
}
