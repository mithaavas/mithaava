import { describe, expect, it } from 'vitest';
import {
  clampToBusinessHours,
  earliestDelivery,
  generateDeliverySlots,
  maxLeadTimeHours,
} from '@/domain/leadTime';

const hours = { open: '10:00', close: '21:00' };

describe('leadTime', () => {
  it('takes the max of base and cart lead hours', () => {
    // 2026-09-19 08:00 local
    const now = new Date(2026, 8, 19, 8, 0, 0);
    const earliest = earliestDelivery(now, 2, 6, hours);
    // 08:00 + 6h = 14:00, within business hours
    expect(earliest.getHours()).toBe(14);
    expect(earliest.getMinutes()).toBe(0);
  });

  it('clamps before open to opening time', () => {
    const instant = new Date(2026, 8, 19, 7, 30, 0);
    const clamped = clampToBusinessHours(instant, hours);
    expect(clamped.getHours()).toBe(10);
    expect(clamped.getMinutes()).toBe(0);
  });

  it('rolls past close to next day open', () => {
    const instant = new Date(2026, 8, 19, 21, 0, 0);
    const clamped = clampToBusinessHours(instant, hours);
    expect(clamped.getDate()).toBe(20);
    expect(clamped.getHours()).toBe(10);
  });

  it('uses cart max lead when higher than base', () => {
    const now = new Date(2026, 8, 19, 10, 0, 0);
    const withCheese = earliestDelivery(now, 2, 2, hours);
    const withSignature = earliestDelivery(now, 2, 6, hours);
    expect(withSignature.getTime()).toBeGreaterThan(withCheese.getTime());
    expect(
      (withSignature.getTime() - now.getTime()) / (60 * 60 * 1000),
    ).toBe(6);
  });

  it('generates slots up to 30 days and disables those before earliest', () => {
    const earliest = new Date(2026, 8, 19, 14, 0, 0);
    const slots = generateDeliverySlots({
      earliest,
      businessHours: hours,
      daysAhead: 1,
      slotMinutes: 60,
    });

    expect(slots.length).toBeGreaterThan(0);
    const morning = slots.find((s) => s.start.getHours() === 10);
    expect(morning?.disabled).toBe(true);
    const afternoon = slots.find(
      (s) =>
        s.start.getDate() === 19 &&
        s.start.getHours() === 14 &&
        !s.disabled,
    );
    expect(afternoon).toBeDefined();
  });

  it('computes maxLeadTimeHours', () => {
    expect(maxLeadTimeHours([undefined, 2, 6, 0])).toBe(6);
    expect(maxLeadTimeHours([])).toBe(0);
  });

  it('does not clamp when open 24 hours', () => {
    const late = new Date(2026, 8, 19, 23, 45, 0);
    const hours24 = { open: '00:00', close: '23:59', is24Hours: true };
    const clamped = clampToBusinessHours(late, hours24);
    expect(clamped.getHours()).toBe(23);
    expect(clamped.getMinutes()).toBe(45);

    const slots = generateDeliverySlots({
      earliest: new Date(2026, 8, 19, 22, 0, 0),
      businessHours: hours24,
      daysAhead: 0,
      slotMinutes: 60,
    });
    expect(slots.some((s) => s.start.getHours() === 22 && !s.disabled)).toBe(
      true,
    );
    expect(slots.some((s) => s.start.getHours() === 23)).toBe(true);
  });
});
