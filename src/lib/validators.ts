/** Indian pincode: exactly 6 digits, first digit 1–9 */
export function isValidPincode(value: string): boolean {
  return /^[1-9]\d{5}$/.test(value.trim());
}

/** Indian mobile: 10 digits starting with 6–9 */
export function isValidIndianMobile(value: string): boolean {
  return /^[6-9]\d{9}$/.test(value.trim());
}

export function normalizePincode(value: string): string {
  return value.replace(/\D/g, '').slice(0, 6);
}

export function normalizeIndianMobile(value: string): string {
  return value.replace(/\D/g, '').slice(0, 10);
}
