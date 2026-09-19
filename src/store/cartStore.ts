'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartLineItem, SizeKey } from '@/domain/types';
import { createSafeStorage } from '@/lib/storage';

const MAX_QUANTITY = 10;

type CartState = {
  lines: CartLineItem[];
  addItem: (productId: string, size: SizeKey, quantity?: number) => void;
  setQuantity: (productId: string, size: SizeKey, quantity: number) => void;
  changeSize: (
    productId: string,
    fromSize: SizeKey,
    toSize: SizeKey,
  ) => void;
  removeItem: (productId: string, size: SizeKey) => void;
  clear: () => void;
  itemCount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],

      addItem: (productId, size, quantity = 1) => {
        const qty = Math.min(Math.max(1, quantity), MAX_QUANTITY);
        set((state) => {
          const existing = state.lines.find(
            (l) => l.productId === productId && l.size === size,
          );
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.productId === productId && l.size === size
                  ? {
                      ...l,
                      quantity: Math.min(l.quantity + qty, MAX_QUANTITY),
                    }
                  : l,
              ),
            };
          }
          return {
            lines: [...state.lines, { productId, size, quantity: qty }],
          };
        });
      },

      setQuantity: (productId, size, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId, size);
          return;
        }
        const qty = Math.min(quantity, MAX_QUANTITY);
        set((state) => ({
          lines: state.lines.map((l) =>
            l.productId === productId && l.size === size
              ? { ...l, quantity: qty }
              : l,
          ),
        }));
      },

      changeSize: (productId, fromSize, toSize) => {
        if (fromSize === toSize) return;
        set((state) => {
          const fromLine = state.lines.find(
            (l) => l.productId === productId && l.size === fromSize,
          );
          if (!fromLine) return state;

          const withoutFrom = state.lines.filter(
            (l) => !(l.productId === productId && l.size === fromSize),
          );
          const toLine = withoutFrom.find(
            (l) => l.productId === productId && l.size === toSize,
          );

          if (toLine) {
            return {
              lines: withoutFrom.map((l) =>
                l.productId === productId && l.size === toSize
                  ? {
                      ...l,
                      quantity: Math.min(
                        l.quantity + fromLine.quantity,
                        MAX_QUANTITY,
                      ),
                    }
                  : l,
              ),
            };
          }

          return {
            lines: [
              ...withoutFrom,
              {
                productId,
                size: toSize,
                quantity: fromLine.quantity,
              },
            ],
          };
        });
      },

      removeItem: (productId, size) => {
        set((state) => ({
          lines: state.lines.filter(
            (l) => !(l.productId === productId && l.size === size),
          ),
        }));
      },

      clear: () => set({ lines: [] }),

      itemCount: () =>
        get().lines.reduce((sum, line) => sum + line.quantity, 0),
    }),
    {
      name: 'mithaava-cart',
      storage: createJSONStorage(() => createSafeStorage()),
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
);

export { MAX_QUANTITY };
