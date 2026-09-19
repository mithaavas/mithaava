const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** Format integer INR, e.g. 1400 → "₹1,400" */
export function formatINR(amount: number): string {
  return inrFormatter.format(amount);
}

/**
 * Format a date for display, e.g. "Sat, 19 Sep 2026".
 * Accepts Date or ISO / YYYY-MM-DD string.
 */
export function formatDate(value: Date | string): string {
  const date = typeof value === 'string' ? parseDateInput(value) : value;
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function parseDateInput(value: string): Date {
  // Prefer YYYY-MM-DD as local calendar day
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]) - 1;
    const day = Number(match[3]);
    return new Date(year, month, day);
  }
  return new Date(value);
}
