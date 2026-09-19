export type SizeKey = 'oneKg' | 'halfKg' | 'uAndMe';

export type ProductBadge =
  | 'premium-superhit'
  | 'all-time-hit'
  | 'chefs-fav';

export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  /** First entry is the primary collection */
  collections: string[];
  /** null = not available ("NE" on the menu) */
  prices: Record<SizeKey, number | null>;
  badges?: ProductBadge[];
  note?: string;
  leadTimeHours?: number;
  image?: ProductImage;
  isActive: boolean;
};

export type Collection = {
  id: string;
  label: string;
  gradientKey: string;
  leadTimeHours?: number;
};

export type CartLineItem = {
  productId: string;
  size: SizeKey;
  quantity: number;
};

export type Customer = {
  name: string;
  phone: string;
};

export type DeliveryDetails = {
  address: string;
  pincode: string;
  landmark?: string;
  date: string; // ISO date YYYY-MM-DD
  timeSlot: string; // e.g. "14:00–15:00"
};

export type OrderLine = {
  productId: string;
  productName: string;
  size: SizeKey;
  sizeLabel: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type Order = {
  id: string;
  customer: Customer;
  delivery: DeliveryDetails;
  lines: OrderLine[];
  subtotal: number;
  cakeMessage?: string;
  notes?: string;
  createdAt: string; // ISO
};

export type DeliveryCheckResult =
  | { status: 'serviceable'; pincode: string; area?: string }
  | { status: 'unserviceable'; pincode: string; reason: string }
  | { status: 'invalid'; message: string };

export type SubmitResult =
  | { ok: true; url: string; message: string; orderId: string }
  | { ok: false; error: string };

export type BusinessHours = {
  open: string; // HH:mm
  close: string; // HH:mm
  is24Hours?: boolean;
};

export type DeliverySlot = {
  start: Date;
  end: Date;
  label: string;
  disabled: boolean;
  disabledReason?: string;
};
