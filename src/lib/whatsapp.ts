import type { Order } from '@/domain/types';
import { formatDate, formatINR } from '@/lib/format';

/**
 * Build the WhatsApp order message. Omits empty optional lines.
 */
export function buildWhatsAppMessage(order: Order): string {
  const lines: string[] = [
    '*New order: Mithaava* 🎂',
    `Order ID: ${order.id}`,
    '',
    '*Customer*',
    `Name: ${order.customer.name}`,
    `Mobile: ${order.customer.phone}`,
    `Address: ${order.delivery.address}`,
  ];

  const landmark = order.delivery.landmark?.trim();
  if (landmark) {
    lines.push(`Landmark: ${landmark}`);
  }

  lines.push(
    `Pincode: ${order.delivery.pincode}`,
    '',
    '*Delivery*',
    `Date: ${formatDate(order.delivery.date)}`,
    `Time slot: ${order.delivery.timeSlot}`,
    '',
    '*Items*',
  );

  order.lines.forEach((line, index) => {
    lines.push(
      `${index + 1}. ${line.productName}, ${line.sizeLabel} × ${line.quantity} = ${formatINR(line.lineTotal)}`,
    );
  });

  lines.push(
    '',
    `*Subtotal:* ${formatINR(order.subtotal)}`,
    'Delivery charges and payment: to be confirmed here.',
  );

  const cakeMessage = order.cakeMessage?.trim();
  if (cakeMessage) {
    lines.push('', `*Message on cake:* "${cakeMessage}"`);
  }

  const notes = order.notes?.trim();
  if (notes) {
    lines.push('', `*Notes:* ${notes}`);
  }

  return lines.join('\n');
}

export function buildWhatsAppUrl(number: string, message: string): string {
  const digits = number.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
