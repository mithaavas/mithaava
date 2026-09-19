import type { CartLineItem, Product, SizeKey } from '@/domain/types';

export function getUnitPrice(
  product: Product,
  size: SizeKey,
): number | null {
  return product.prices[size];
}

export function isSizeAvailable(
  product: Product,
  size: SizeKey,
): boolean {
  const price = product.prices[size];
  return price !== null && price > 0;
}

export function lineTotal(
  product: Product,
  size: SizeKey,
  quantity: number,
): number | null {
  const unit = getUnitPrice(product, size);
  if (unit === null) return null;
  if (quantity < 1) return 0;
  return unit * quantity;
}

/**
 * Sum cart line totals. Skips lines whose product is missing or size is NE.
 * Prices are always derived from products — never from the cart.
 */
export function cartSubtotal(
  lines: CartLineItem[],
  productsById: Map<string, Product> | Record<string, Product>,
): number {
  const lookup =
    productsById instanceof Map
      ? (id: string) => productsById.get(id)
      : (id: string) => productsById[id];

  let total = 0;
  for (const line of lines) {
    const product = lookup(line.productId);
    if (!product) continue;
    const amount = lineTotal(product, line.size, line.quantity);
    if (amount === null) continue;
    total += amount;
  }
  return total;
}

/** Lowest non-null positive price across available sizes. */
export function lowestAvailablePrice(product: Product): number | null {
  let lowest: number | null = null;
  for (const size of Object.keys(product.prices) as SizeKey[]) {
    const price = product.prices[size];
    if (price === null || price <= 0) continue;
    if (lowest === null || price < lowest) lowest = price;
  }
  return lowest;
}

