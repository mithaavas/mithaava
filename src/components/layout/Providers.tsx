'use client';

import type { ReactNode } from 'react';
import { ToastProvider } from '@/components/ui/Toast';
import { CartDrawer } from '@/components/cart/CartDrawer';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <CartDrawer />
    </ToastProvider>
  );
}
