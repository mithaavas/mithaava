import {
  deliveryConfig,
  serviceablePincodeSet,
} from '@/config/delivery';
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

    if (serviceablePincodeSet.has(trimmed)) {
      const match = deliveryConfig.serviceablePincodes.find(
        (entry) => entry.pincode === trimmed,
      );
      return {
        status: 'serviceable',
        pincode: trimmed,
        area: match?.area,
      };
    }

    return {
      status: 'unserviceable',
      pincode: trimmed,
      reason:
        'Outside our 10 km delivery radius from Sector 46, Gurugram',
    };
  }
}

export const deliveryService: DeliveryService =
  new StaticPincodeDeliveryService();
