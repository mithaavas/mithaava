'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDeliveryStore, DELIVERY_STORE_EXPIRY_MS } from '@/store/deliveryStore';
import { useIsClient } from '@/hooks/useIsClient';

/**
 * Delivery is checked at checkout — menu and cart stay open.
 * Expires verified pincode after 24 hours.
 */
export function useDeliveryGate(): {
  ready: boolean;
  /** True when a fresh serviceable pincode is stored */
  hasDelivery: boolean;
  pincode: string | null;
  area: string | undefined;
  /** @deprecated use hasDelivery — always true for browse routes */
  allowed: boolean;
} {
  const pathname = usePathname();
  const result = useDeliveryStore((s) => s.result);
  const checkedAt = useDeliveryStore((s) => s.checkedAt);
  const clear = useDeliveryStore((s) => s.clear);
  const ready = useIsClient();

  useEffect(() => {
    if (!ready) return;
    if (
      result &&
      checkedAt !== null &&
      Date.now() - checkedAt > DELIVERY_STORE_EXPIRY_MS
    ) {
      clear();
    }
  }, [ready, result, checkedAt, clear, pathname]);

  const hasDelivery = result !== null;

  return {
    ready,
    hasDelivery,
    allowed: true,
    pincode: result?.pincode ?? null,
    area: result?.area,
  };
}
