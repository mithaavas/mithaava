'use client';

import type { ReactNode } from 'react';

/** Product pages are open — no pincode gate. */
export function ProductDetailGate({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
