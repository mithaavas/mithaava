'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { deliveryService } from '@/services/deliveryService';
import { useDeliveryStore } from '@/store/deliveryStore';
import { normalizePincode, isValidPincode } from '@/lib/validators';
import { copy } from '@/content/copy';
import type { DeliveryCheckResult } from '@/domain/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { NotServiceableResult } from '@/components/delivery/NotServiceableResult';

type PincodeCardProps = {
  autoFocus?: boolean;
  /** checkout = stay on page after success; default shows success message only */
  variant?: 'checkout' | 'default';
};

export function PincodeCard({
  autoFocus = false,
  variant = 'default',
}: PincodeCardProps) {
  const setServiceable = useDeliveryStore((s) => s.setServiceable);
  const [value, setValue] = useState('');
  const [result, setResult] = useState<DeliveryCheckResult | null>(null);
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoFocus) return;
    inputRef.current?.focus();
  }, [autoFocus]);

  const runCheck = (raw: string) => {
    const pincode = normalizePincode(raw);
    if (pincode.length !== 6) return;
    startTransition(async () => {
      const check = await deliveryService.check(pincode);
      setResult(check);
      if (check.status === 'serviceable') {
        setServiceable(check);
      }
    });
  };

  const onChange = (next: string) => {
    const digits = normalizePincode(next);
    setValue(digits);
    setResult(null);
    if (digits.length === 6) runCheck(digits);
  };

  if (result?.status === 'serviceable') {
    if (variant === 'checkout') {
      return null;
    }
    return (
      <div
        className="w-full rounded-[var(--radius-xl)] border border-teal-700/25 bg-cream-50 p-5 text-center shadow-[var(--shadow-soft)]"
        aria-live="polite"
      >
        <p className="font-display text-xl text-teal-900">
          {copy.pincode.serviceable(result.pincode)}
        </p>
        {result.area ? (
          <p className="mt-1 text-sm text-cocoa-800/70">{result.area}</p>
        ) : null}
      </div>
    );
  }

  if (result?.status === 'unserviceable') {
    return (
      <NotServiceableResult
        pincode={result.pincode}
        onRetry={() => {
          setResult(null);
          setValue('');
          inputRef.current?.focus();
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-md rounded-[var(--radius-xl)] border border-icing-300/70 bg-cream-50/95 p-4 shadow-[var(--shadow-soft)] sm:p-6">
      <form
        className="flex flex-col gap-3 sm:gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (isValidPincode(value)) runCheck(value);
          else setResult({ status: 'invalid', message: copy.pincode.invalid });
        }}
      >
        <Input
          ref={inputRef}
          label={copy.pincode.label}
          name="pincode"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder={copy.pincode.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={6}
          hint={copy.landing.pincodeHelper}
          error={
            result?.status === 'invalid' ? result.message : undefined
          }
          aria-busy={pending}
        />
        <Button type="submit" size="lg" disabled={value.length < 6 || pending}>
          Check delivery
        </Button>
      </form>
      <div aria-live="polite" className="sr-only">
        {pending ? 'Checking pincode' : ''}
        {result?.status === 'invalid' ? result.message : ''}
      </div>
    </div>
  );
}
