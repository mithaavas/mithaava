'use client';

import { useSyncExternalStore } from 'react';

function subscribeNever() {
  return () => undefined;
}

/**
 * False during SSR and the hydration pass; true after.
 * Use to gate UI that depends on localStorage / persist.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
}
