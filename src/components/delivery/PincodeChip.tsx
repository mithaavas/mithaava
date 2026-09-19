'use client';

import { useDeliveryStore } from '@/store/deliveryStore';
import { copy } from '@/content/copy';

export function PincodeChip() {
  const result = useDeliveryStore((s) => s.result);
  const clear = useDeliveryStore((s) => s.clear);

  if (!result) return null;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-icing-300/80 bg-cream-50 px-3 py-1.5 text-sm text-cocoa-800">
      <span className="hidden sm:inline">
        {copy.pincode.deliveringTo(result.pincode)}
      </span>
      <span className="sm:hidden">{result.pincode}</span>
      <button
        type="button"
        className="font-medium text-teal-700 underline-offset-2 hover:underline"
        onClick={() => clear()}
      >
        {copy.pincode.change}
      </button>
    </div>
  );
}
