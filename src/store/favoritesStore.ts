'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createSafeStorage } from '@/lib/storage';

type FavoritesState = {
  ids: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],

      toggle: (productId) => {
        set((state) => {
          const exists = state.ids.includes(productId);
          return {
            ids: exists
              ? state.ids.filter((id) => id !== productId)
              : [...state.ids, productId],
          };
        });
      },

      has: (productId) => get().ids.includes(productId),

      clear: () => set({ ids: [] }),
    }),
    {
      name: 'mithaava-favourites',
      storage: createJSONStorage(() => createSafeStorage()),
      partialize: (state) => ({ ids: state.ids }),
    },
  ),
);
