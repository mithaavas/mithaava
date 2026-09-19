import { describe, expect, it } from 'vitest';
import {
  isValidIndianMobile,
  isValidPincode,
  normalizePincode,
} from '@/lib/validators';
import { StaticPincodeDeliveryService } from '@/services/deliveryService';

describe('pincode validation', () => {
  it('accepts valid 6-digit pincodes starting 1–9', () => {
    expect(isValidPincode('122009')).toBe(true);
    expect(isValidPincode('110001')).toBe(true);
  });

  it('rejects invalid pincodes', () => {
    expect(isValidPincode('022001')).toBe(false);
    expect(isValidPincode('12200')).toBe(false);
    expect(isValidPincode('1220099')).toBe(false);
    expect(isValidPincode('12a009')).toBe(false);
    expect(isValidPincode('')).toBe(false);
  });

  it('normalizes input to digits', () => {
    expect(normalizePincode('122-009')).toBe('122009');
  });
});

describe('indian mobile validation', () => {
  it('accepts numbers starting 6–9', () => {
    expect(isValidIndianMobile('9211887308')).toBe(true);
    expect(isValidIndianMobile('6123456789')).toBe(true);
  });

  it('rejects invalid mobiles', () => {
    expect(isValidIndianMobile('5211887308')).toBe(false);
    expect(isValidIndianMobile('921188730')).toBe(false);
    expect(isValidIndianMobile('+919211887308')).toBe(false);
  });
});

describe('StaticPincodeDeliveryService', () => {
  const service = new StaticPincodeDeliveryService();

  it('returns invalid for bad format', async () => {
    const result = await service.check('000000');
    expect(result.status).toBe('invalid');
  });

  it('returns serviceable for seeded Gurugram pincode', async () => {
    const result = await service.check('122009');
    expect(result).toMatchObject({
      status: 'serviceable',
      pincode: '122009',
    });
  });

  it('returns unserviceable outside the list', async () => {
    const result = await service.check('110001');
    expect(result.status).toBe('unserviceable');
  });
});
