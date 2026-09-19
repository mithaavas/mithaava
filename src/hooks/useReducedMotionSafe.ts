'use client';


import { useEffect, useState } from 'react';

type NetworkInformation = {
  saveData?: boolean;
};

/**
 * Respects prefers-reduced-motion and the Save-Data hint.
 * Defaults to false until measured so SSR and first paint stay calm.
 */
export function useReducedMotionSafe(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (
      navigator as Navigator & { connection?: NetworkInformation }
    ).connection;

    const update = () => {
      setReduced(query.matches || Boolean(connection?.saveData));
    };
    update();

    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}
