'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { DeliveryCheckResult } from '@/domain/types';
import { createSafeStorage } from '@/lib/storage';

const EXPIRY_MS = 24 * 60 * 60 * 1000;

type PersistedDelivery = {
  result: Extract<DeliveryCheckResult, { status: 'serviceable' }> | null;
  checkedAt: number | null;
};

type DeliveryState = PersistedDelivery & {
  setServiceable: (
    result: Extract<DeliveryCheckResult, { status: 'serviceable' }>,
  ) => void;
  clear: () => void;
  isFresh: () => boolean;
  getActive: () => Extract<
    DeliveryCheckResult,
    { status: 'serviceable' }
  > | null;
};

function isExpired(checkedAt: number | null): boolean {
  if (checkedAt === null) return true;
  return Date.now() - checkedAt > EXPIRY_MS;
}

export const useDeliveryStore = create<DeliveryState>()(
  persist(
    (set, get) => ({
      result: null,
      checkedAt: null,

      setServiceable: (result) =>
        set({ result, checkedAt: Date.now() }),

      clear: () => set({ result: null, checkedAt: null }),

      isFresh: () => {
        const { result, checkedAt } = get();
        return result !== null && !isExpired(checkedAt);
      },

      getActive: () => {
        const { result, checkedAt } = get();
        if (!result || isExpired(checkedAt)) {
          if (result || checkedAt) {
            set({ result: null, checkedAt: null });
          }
          return null;
        }
        return result;
      },
    }),
    {
      name: 'mithaava-delivery',
      storage: createJSONStorage(() => createSafeStorage()),
      partialize: (state) => ({
        result: state.result,
        checkedAt: state.checkedAt,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        if (isExpired(state.checkedAt)) {
          state.result = null;
          state.checkedAt = null;
        }
      },
    },
  ),
);

export { EXPIRY_MS as DELIVERY_STORE_EXPIRY_MS };
