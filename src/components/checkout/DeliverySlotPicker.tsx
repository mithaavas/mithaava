'use client';

import { useMemo } from 'react';
import {
  earliestDelivery,
  generateDeliverySlots,
  maxLeadTimeHours,
} from '@/domain/leadTime';
import { siteConfig } from '@/config/site';
import type { DeliverySlot } from '@/domain/types';
import { cn } from '@/lib/cn';

type Props = {
  leadTimes: Array<number | undefined>;
  date: string;
  timeSlot: string;
  onDateChange: (date: string) => void;
  onSlotChange: (slot: string) => void;
  error?: string;
};

function toDateInputValue(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function DeliverySlotPicker({
  leadTimes,
  date,
  timeSlot,
  onDateChange,
  onSlotChange,
  error,
}: Props) {
  const cartMax = maxLeadTimeHours(leadTimes);
  const earliest = useMemo(
    () =>
      earliestDelivery(
        new Date(),
        siteConfig.baseLeadTimeHours,
        cartMax,
        siteConfig.businessHours,
      ),
    [cartMax],
  );

  const slots: DeliverySlot[] = useMemo(() => {
    if (!date) return [];
    const [y, m, d] = date.split('-').map(Number);
    const dayStart = new Date(y!, (m ?? 1) - 1, d ?? 1, 0, 0, 0);
    return generateDeliverySlots({
      earliest,
      businessHours: siteConfig.businessHours,
      daysAhead: 30,
      slotMinutes: 60,
    }).filter(
      (s) =>
        s.start.getFullYear() === dayStart.getFullYear() &&
        s.start.getMonth() === dayStart.getMonth() &&
        s.start.getDate() === dayStart.getDate(),
    );
  }, [date, earliest]);

  const minDate = toDateInputValue(earliest);
  const maxDate = toDateInputValue(
    new Date(earliest.getTime() + 30 * 24 * 60 * 60 * 1000),
  );

  return (
    <div className="space-y-3">
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium">Delivery date</span>
        <input
          type="date"
          className="h-12 rounded-[var(--radius-md)] border border-icing-300/90 bg-cream-50 px-3"
          min={minDate}
          max={maxDate}
          value={date}
          onChange={(e) => {
            onDateChange(e.target.value);
            onSlotChange('');
          }}
        />
      </label>
      <fieldset>
        <legend className="mb-2 text-sm font-medium">Time slot</legend>
        <div className="flex flex-wrap gap-2">
          {slots.length === 0 ? (
            <p className="text-sm text-cocoa-800/65">Pick a date to see slots.</p>
          ) : (
            slots.map((slot) => (
              <button
                key={slot.label}
                type="button"
                disabled={slot.disabled}
                title={slot.disabledReason}
                onClick={() => onSlotChange(slot.label)}
                className={cn(
                  'h-10 rounded-full border px-3 text-sm',
                  timeSlot === slot.label
                    ? 'border-teal-700 bg-teal-700 text-white'
                    : 'border-icing-300 bg-cream-50',
                  slot.disabled && 'cursor-not-allowed opacity-40',
                )}
              >
                {slot.label}
              </button>
            ))
          )}
        </div>
      </fieldset>
      {error ? <p className="text-sm text-berry-600">{error}</p> : null}
    </div>
  );
}
