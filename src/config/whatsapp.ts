/**
 * WhatsApp business number in international format without '+'.
 * India: 91 + 10-digit mobile.
 */
export const whatsappConfig = {
  number: '919211887308',
  isPlaceholder: false,
} as const;

export type WhatsAppConfig = typeof whatsappConfig;
