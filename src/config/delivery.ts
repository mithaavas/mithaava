/**
 * Delivery radius and serviceable pincodes around Sector 46, Gurugram.
 *
 * Coordinates approximate Sector 46; TODO(owner): verify House No. 540 LGF.
 * Pincode list is derived from Haversine ≤10 km — TODO(owner): verify each
 * pincode is actually serviceable before launch. Do not present as accurate.
 */

export const deliveryConfig = {
  radiusKm: 10,
  storeLocation: {
    lat: 28.4359,
    lng: 77.0584,
    // TODO(owner): verify lat/lng for House No. 540 LGF, Sector 46
  },
  /**
   * Optional neighbourhood labels for CoverageRings.
   * Empty by default — do not invent area names.
   * TODO(owner): supply coverage area labels if desired on the diagram.
   */
  coverageAreas: [] as const,
  /**
   * Placeholder list within ~10 km of Sector 46 (Haversine estimate).
   * TODO(owner): replace with the verified list of serviceable pincodes.
   */
  serviceablePincodes: [
    { pincode: '122001', area: 'Gurugram HO / South City I' },
    { pincode: '122002', area: 'DLF Qutub Enclave' },
    { pincode: '122003', area: 'Sector 45–46 / Jharsa' },
    { pincode: '122004', area: 'Khandsa / Narsinghpur' },
    { pincode: '122005', area: 'Air Force Station' },
    { pincode: '122006', area: 'Gurugram Village / Basai' },
    { pincode: '122007', area: 'Industrial Estate' },
    { pincode: '122008', area: 'DLF Phase II' },
    { pincode: '122009', area: 'Galleria / DLF Phase IV' },
    { pincode: '122010', area: 'DLF Phase III' },
    { pincode: '122011', area: 'Sector 56' },
    { pincode: '122012', area: 'Sector 82 / Vatika' },
    { pincode: '122015', area: 'Palam Road / Udyog Vihar' },
    { pincode: '122016', area: 'Dundahera' },
    { pincode: '122017', area: 'Palam Vihar' },
    { pincode: '122018', area: 'South City II / Sohna Road' },
    { pincode: '122022', area: 'Near Sector 46 (edge)' },
  ] as const,
} as const;

export type ServiceablePincode = (typeof deliveryConfig.serviceablePincodes)[number];

export const serviceablePincodeSet: ReadonlySet<string> = new Set(
  deliveryConfig.serviceablePincodes.map((entry) => entry.pincode),
);
