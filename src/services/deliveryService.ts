import { deliveryConfig, serviceAreaForPincode } from '@/config/delivery';
import type { DeliveryCheckResult } from '@/domain/types';
import { isValidPincode } from '@/lib/validators';

export interface DeliveryService {
  check(pincode: string): Promise<DeliveryCheckResult>;
}

export class StaticPincodeDeliveryService implements DeliveryService {
  async check(pincode: string): Promise<DeliveryCheckResult> {
    const trimmed = pincode.trim();

    if (!isValidPincode(trimmed)) {
      return {
        status: 'invalid',
        message: 'Enter a 6-digit pincode',
      };
    }

    const area = serviceAreaForPincode(trimmed);
    if (area) {
      return { status: 'serviceable', pincode: trimmed, area };
    }

    return {
      status: 'unserviceable',
      pincode: trimmed,
      reason: `Outside our ${deliveryConfig.serviceArea} delivery area`,
    };
  }
}

export const deliveryService: DeliveryService =
  new StaticPincodeDeliveryService();
