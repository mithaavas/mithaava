'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import { AggregatorStrip } from '@/components/aggregators/AggregatorStrip';
import { useCartStore } from '@/store/cartStore';
import { copy } from '@/content/copy';
import { storageGet, storageRemove } from '@/lib/storage';
import { formatINR } from '@/lib/format';

type LastOrder = {
  orderId: string;
  message: string;
  url: string;
  subtotal: number;
};

let cachedRaw: string | null | undefined;
let cachedOrder: LastOrder | null = null;

function readLastOrder(): LastOrder | null {
  const raw = storageGet('mithaava-last-order');
  if (raw === cachedRaw) return cachedOrder;
  cachedRaw = raw;
  if (!raw) {
    cachedOrder = null;
    return null;
  }
  try {
    cachedOrder = JSON.parse(raw) as LastOrder;
  } catch {
    cachedOrder = null;
  }
  return cachedOrder;
}

function subscribeStorage(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange);
  return () => window.removeEventListener('storage', onStoreChange);
}

export default function OrderSentPage() {
  const clear = useCartStore((s) => s.clear);
  const order = useSyncExternalStore(
    subscribeStorage,
    readLastOrder,
    () => null,
  );
  const [copied, setCopied] = useState(false);
  const openedRef = useRef(false);

  useEffect(() => {
    if (!order?.url || openedRef.current) return;
    openedRef.current = true;
    window.open(order.url, '_blank', 'noopener,noreferrer');
  }, [order]);

  return (
    <>
      <Header variant="shop" />
      <main className="mx-auto max-w-lg px-4 py-12 text-center sm:px-6">
        <h1 className="font-display text-3xl text-teal-900">
          {copy.orderSent.title}
        </h1>
        {order ? (
          <p className="mt-3 text-cocoa-800/80">
            {copy.orderSent.orderId(order.orderId)} · {formatINR(order.subtotal)}
          </p>
        ) : (
          <p className="mt-3 text-cocoa-800/80">
            If WhatsApp did not open, go back to checkout and try again.
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3">
          {order?.url ? (
            <a href={order.url} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="lg" className="w-full gap-2">
                <WhatsAppIcon className="h-5 w-5" />
                {copy.orderSent.openAgain}
              </Button>
            </a>
          ) : null}
          <Button
            variant="outline"
            size="lg"
            disabled={!order}
            onClick={async () => {
              if (!order) return;
              try {
                await navigator.clipboard.writeText(order.message);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? 'Copied' : copy.orderSent.copyText}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              clear();
              storageRemove('mithaava-last-order');
              window.dispatchEvent(new Event('storage'));
            }}
          >
            {copy.orderSent.clearCart}
          </Button>
          <Link
            href="/menu/"
            className="inline-flex h-12 items-center justify-center rounded-full text-teal-800 underline-offset-2 hover:underline"
          >
            {copy.orderSent.backToMenu}
          </Link>
        </div>
        <AggregatorStrip className="mt-8 justify-center" />
      </main>
      <Footer />
    </>
  );
}
