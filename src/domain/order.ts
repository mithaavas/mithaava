import type {
  CartLineItem,
  Customer,
  DeliveryDetails,
  Order,
  OrderLine,
  Product,
  SizeKey,
} from '@/domain/types';
import { cartSubtotal, getUnitPrice } from '@/domain/pricing';
import { siteConfig } from '@/config/site';

const BASE32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function randomBase32Char(): string {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const buf = new Uint8Array(1);
    crypto.getRandomValues(buf);
    return BASE32[(buf[0]! % BASE32.length)!]!;
  }
  return BASE32[Math.floor(Math.random() * BASE32.length)]!;
}

/**
 * Format: MTH-YYMMDD-XXXX (4 random base-32 characters).
 */
export function createOrderId(now: Date = new Date()): string {
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const suffix = Array.from({ length: 4 }, () => randomBase32Char()).join('');
  return `MTH-${yy}${mm}${dd}-${suffix}`;
}

export function sizeLabel(size: SizeKey): string {
  return siteConfig.sizeLabels[size].label;
}

export type BuildOrderInput = {
  customer: Customer;
  delivery: DeliveryDetails;
  lines: CartLineItem[];
  productsById: Map<string, Product> | Record<string, Product>;
  cakeMessage?: string;
  notes?: string;
  now?: Date;
  orderId?: string;
};

function lookupProduct(
  productsById: Map<string, Product> | Record<string, Product>,
  id: string,
): Product | undefined {
  return productsById instanceof Map
    ? productsById.get(id)
    : productsById[id];
}

export function buildOrder(input: BuildOrderInput): Order {
  const now = input.now ?? new Date();
  const orderLines: OrderLine[] = [];

  for (const line of input.lines) {
    const product = lookupProduct(input.productsById, line.productId);
    if (!product) continue;
    const unitPrice = getUnitPrice(product, line.size);
    if (unitPrice === null) continue;

    orderLines.push({
      productId: product.id,
      productName: product.name,
      size: line.size,
      sizeLabel: sizeLabel(line.size),
      quantity: line.quantity,
      unitPrice,
      lineTotal: unitPrice * line.quantity,
    });
  }

  const subtotal = cartSubtotal(input.lines, input.productsById);

  const order: Order = {
    id: input.orderId ?? createOrderId(now),
    customer: input.customer,
    delivery: input.delivery,
    lines: orderLines,
    subtotal,
    createdAt: now.toISOString(),
  };

  const cakeMessage = input.cakeMessage?.trim();
  if (cakeMessage) {
    order.cakeMessage = cakeMessage;
  }

  const notes = input.notes?.trim();
  if (notes) {
    order.notes = notes;
  }

  return order;
}
