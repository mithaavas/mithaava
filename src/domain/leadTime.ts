import type { BusinessHours, DeliverySlot } from '@/domain/types';

const MAX_DAYS_AHEAD = 30;
const DEFAULT_SLOT_MINUTES = 60;

function parseHm(hm: string): { hours: number; minutes: number } {
  const [h, m] = hm.split(':').map((part) => Number(part));
  return { hours: h ?? 0, minutes: m ?? 0 };
}

function setTime(date: Date, hm: string): Date {
  const { hours, minutes } = parseHm(hm);
  const next = new Date(date);
  next.setHours(hours, minutes, 0, 0);
  return next;
}

function startOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/** Day window: [open, closeExclusive). For 24h → midnight → next midnight. */
function dayWindow(
  day: Date,
  businessHours: BusinessHours,
): { open: Date; closeExclusive: Date } {
  if (businessHours.is24Hours) {
    const open = startOfDay(day);
    return { open, closeExclusive: addDays(open, 1) };
  }
  return {
    open: setTime(day, businessHours.open),
    closeExclusive: setTime(day, businessHours.close),
  };
}

/**
 * Earliest delivery instant = now + max(base, cart max lead hours),
 * then clamped into business hours (roll to next open if after close).
 */
export function earliestDelivery(
  now: Date,
  baseLeadTimeHours: number,
  cartMaxLeadTimeHours: number,
  businessHours: BusinessHours,
): Date {
  const leadHours = Math.max(baseLeadTimeHours, cartMaxLeadTimeHours, 0);
  const raw = new Date(now.getTime() + leadHours * 60 * 60 * 1000);
  return clampToBusinessHours(raw, businessHours);
}

/**
 * If `instant` falls before open → that day's open.
 * If at/after close → next day's open.
 * Otherwise return instant (minutes preserved).
 * 24h shops: never clamp.
 */
export function clampToBusinessHours(
  instant: Date,
  businessHours: BusinessHours,
): Date {
  if (businessHours.is24Hours) {
    return new Date(instant);
  }

  const { open, closeExclusive } = dayWindow(instant, businessHours);

  if (instant.getTime() < open.getTime()) {
    return open;
  }
  if (instant.getTime() >= closeExclusive.getTime()) {
    return dayWindow(addDays(instant, 1), businessHours).open;
  }
  return new Date(instant);
}

export function formatSlotLabel(start: Date, end: Date): string {
  const fmt = (d: Date) =>
    d.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  return `${fmt(start)}–${fmt(end)}`;
}

export type GenerateSlotsOptions = {
  earliest: Date;
  now?: Date;
  businessHours: BusinessHours;
  /** Inclusive day count from earliest's calendar day; default 30 */
  daysAhead?: number;
  slotMinutes?: number;
};

/**
 * Generate selectable delivery slots from earliest up to `daysAhead` days.
 * Slots before `earliest` are marked disabled.
 */
export function generateDeliverySlots(
  options: GenerateSlotsOptions,
): DeliverySlot[] {
  const {
    earliest,
    businessHours,
    daysAhead = MAX_DAYS_AHEAD,
    slotMinutes = DEFAULT_SLOT_MINUTES,
  } = options;

  const slots: DeliverySlot[] = [];
  const firstDay = startOfDay(earliest);
  const lastDay = startOfDay(addDays(firstDay, daysAhead));

  for (
    let day = new Date(firstDay);
    day.getTime() <= lastDay.getTime();
    day = addDays(day, 1)
  ) {
    const { open, closeExclusive } = dayWindow(day, businessHours);
    let cursor = new Date(open);

    while (cursor.getTime() + slotMinutes * 60 * 1000 <= closeExclusive.getTime()) {
      const end = new Date(cursor.getTime() + slotMinutes * 60 * 1000);
      const tooSoon = cursor.getTime() < earliest.getTime();

      slots.push({
        start: new Date(cursor),
        end,
        label: formatSlotLabel(cursor, end),
        disabled: tooSoon,
        disabledReason: tooSoon
          ? 'Earlier than the minimum lead time for your cart'
          : undefined,
      });

      cursor = end;
    }
  }

  return slots;
}

export function maxLeadTimeHours(
  leadTimes: Array<number | undefined>,
): number {
  let max = 0;
  for (const hours of leadTimes) {
    if (typeof hours === 'number' && hours > max) {
      max = hours;
    }
  }
  return max;
}

export { MAX_DAYS_AHEAD, DEFAULT_SLOT_MINUTES };
