import { whatsappConfig } from '@/config/whatsapp';
import type { Order, SubmitResult } from '@/domain/types';
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
} from '@/lib/whatsapp';

export interface OrderChannel {
  submit(order: Order): Promise<SubmitResult>;
}

export class WhatsAppOrderChannel implements OrderChannel {
  async submit(order: Order): Promise<SubmitResult> {
    try {
      if (whatsappConfig.isPlaceholder) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            '[Mithaava] WhatsApp number is a placeholder. TODO(owner): set the business number.',
          );
        }
      }

      const message = buildWhatsAppMessage(order);
      const url = buildWhatsAppUrl(whatsappConfig.number, message);

      return {
        ok: true,
        url,
        message,
        orderId: order.id,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to build WhatsApp order';
      return { ok: false, error: message };
    }
  }
}

export const orderChannel: OrderChannel = new WhatsAppOrderChannel();
