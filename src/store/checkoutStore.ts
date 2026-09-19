'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createSafeStorage } from '@/lib/storage';

export type SavedCustomerDetails = {
  name: string;
  phone: string;
  address: string;
  landmark: string;
};

type CheckoutState = {
  saved: SavedCustomerDetails;
  setSaved: (details: Partial<SavedCustomerDetails>) => void;
  clearSaved: () => void;
};

const emptySaved: SavedCustomerDetails = {
  name: '',
  phone: '',
  address: '',
  landmark: '',
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      saved: emptySaved,

      setSaved: (details) =>
        set((state) => ({
          saved: { ...state.saved, ...details },
        })),

      clearSaved: () => set({ saved: emptySaved }),
    }),
    {
      name: 'mithaava-checkout',
      storage: createJSONStorage(() => createSafeStorage()),
      partialize: (state) => ({ saved: state.saved }),
    },
  ),
);
