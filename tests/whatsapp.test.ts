import { describe, expect, it } from 'vitest';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import type { Order } from '@/domain/types';

const baseOrder: Order = {
  id: 'MTH-260919-4F2K',
  customer: {
    name: 'प्रभात Sharma',
    phone: '9211887308',
  },
  delivery: {
    address: 'House 12, Sector 46',
    pincode: '122009',
    date: '2026-09-19',
    timeSlot: '14:00–15:00',
  },
  lines: [
    {
      productId: 'black-forest',
      productName: 'Black Forest Cake',
      size: 'oneKg',
      sizeLabel: '1 kg',
      quantity: 1,
      unitPrice: 650,
      lineTotal: 650,
    },
    {
      productId: 'kit-kat',
      productName: 'Kit Kat Cake',
      size: 'halfKg',
      sizeLabel: '500 g',
      quantity: 1,
      unitPrice: 750,
      lineTotal: 750,
    },
  ],
  subtotal: 1400,
  createdAt: '2026-09-19T08:00:00.000Z',
};

describe('whatsapp message builder', () => {
  it('builds the full template with Hindi and special characters', () => {
    const message = buildWhatsAppMessage({
      ...baseOrder,
      delivery: {
        ...baseOrder.delivery,
        landmark: 'Near park & café',
      },
      cakeMessage: 'Happy Birthday!',
      notes: 'Ring bell — मीठा चाहिए',
    });

    expect(message).toContain('*New order: Mithaava* 🎂');
    expect(message).toContain('Order ID: MTH-260919-4F2K');
    expect(message).toContain('Name: प्रभात Sharma');
    expect(message).toContain('Landmark: Near park & café');
    expect(message).toContain('1. Black Forest Cake, 1 kg × 1 = ₹650');
    expect(message).toContain('2. Kit Kat Cake, 500 g × 1 = ₹750');
    expect(message).toContain('*Subtotal:* ₹1,400');
    expect(message).toContain('Delivery charges and payment: to be confirmed here.');
    expect(message).toContain('*Message on cake:* "Happy Birthday!"');
    expect(message).toContain('*Notes:* Ring bell — मीठा चाहिए');
  });

  it('omits empty optional lines', () => {
    const message = buildWhatsAppMessage(baseOrder);
    expect(message).not.toContain('Landmark:');
    expect(message).not.toContain('Message on cake');
    expect(message).not.toContain('*Notes:*');
  });

  it('builds wa.me URLs with encoded text', () => {
    const message = buildWhatsAppMessage(baseOrder);
    const url = buildWhatsAppUrl('919211887308', message);
    expect(url.startsWith('https://wa.me/919211887308?text=')).toBe(true);
    expect(url).toContain(encodeURIComponent('*New order: Mithaava*'));
  });
});
