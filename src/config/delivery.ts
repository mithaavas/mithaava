/**
 * Delivery area: all of Delhi NCR, dispatched from Sector 46, Gurugram.
 * Pincodes are matched by their first three digits.
 */

export const deliveryConfig = {
  serviceArea: 'Delhi NCR',
  storeLocation: {
    lat: 28.4355,
    lng: 77.0535,
  },
  /**
   * Optional neighbourhood labels for CoverageRings.
   * Empty by default — do not invent area names.
   */
  coverageAreas: [] as const,
  serviceablePrefixes: [
    { prefix: '110', area: 'Delhi' },
    { prefix: '122', area: 'Gurugram' },
    { prefix: '121', area: 'Faridabad' },
    { prefix: '201', area: 'Noida, Greater Noida & Ghaziabad' },
  ] as const,
} as const;

export function serviceAreaForPincode(pincode: string): string | null {
  const match = deliveryConfig.serviceablePrefixes.find((entry) =>
    pincode.startsWith(entry.prefix),
  );
  return match?.area ?? null;
}
