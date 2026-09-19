'use client';


import { useEffect, useId, useState } from 'react';
import { cn } from '@/lib/cn';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

type CakeArtProps = {
  collection?: string;
  topping?: 'cherry' | 'strawberry' | 'chips' | 'mango' | 'kiwi' | 'rainbow';
  className?: string;
  title?: string;
  /** Piped icing message on the cake face (max 40 chars). */
  message?: string;
};

const palette: Record<string, { sponge: string; frosting: string; drip: string }> = {
  'best-sellers': { sponge: '#C2255C', frosting: '#FADAD6', drip: '#F6C1BC' },
  chocolate: { sponge: '#4E2420', frosting: '#6B3A34', drip: '#F6C1BC' },
  cheese: { sponge: '#F5D9A8', frosting: '#FADAD6', drip: '#E9963E' },
  signature: { sponge: '#0E6B75', frosting: '#F6C1BC', drip: '#E9963E' },
  'chocolate-recipe': { sponge: '#4E2420', frosting: '#E9963E', drip: '#F6C1BC' },
  favourites: { sponge: '#B99560', frosting: '#FFF9F3', drip: '#F6C1BC' },
  fruit: { sponge: '#E9963E', frosting: '#FADAD6', drip: '#C2255C' },
};

const toppingColor: Record<NonNullable<CakeArtProps['topping']>, string> = {
  cherry: '#C2255C',
  strawberry: '#E45A7A',
  chips: '#4E2420',
  mango: '#E9963E',
  kiwi: '#6BAE5F',
  rainbow: '#0E6B75',
};

function hashTopping(seed: string): NonNullable<CakeArtProps['topping']> {
  const options: NonNullable<CakeArtProps['topping']>[] = [
    'cherry',
    'strawberry',
    'chips',
    'mango',
    'kiwi',
    'rainbow',
  ];
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h + seed.charCodeAt(i) * (i + 1)) % 97;
  return options[h % options.length]!;
}

/** Procedural layered cake illustration — used when no product photo exists. */
export function CakeArt({
  collection = 'best-sellers',
  topping,
  className,
  title = 'Cake illustration',
  message,
}: CakeArtProps) {
  const colors = palette[collection] ?? palette['best-sellers']!;
  const top = topping ?? hashTopping(collection + title);
  const accent = toppingColor[top];
  const reduced = useReducedMotionSafe();
  const uid = useId().replace(/:/g, '');
  const [piped, setPiped] = useState(() => (message ?? '').slice(0, 40));
  const [clipWidth, setClipWidth] = useState(120);

  useEffect(() => {
    const next = (message ?? '').slice(0, 40);
    let frame = 0;
    const timer = window.setTimeout(() => {
      setPiped(next);
      if (!next) {
        setClipWidth(120);
        return;
      }
      if (reduced) {
        setClipWidth(120);
        return;
      }
      setClipWidth(0);
      frame = window.requestAnimationFrame(() => setClipWidth(120));
    }, 120);
    return () => {
      window.clearTimeout(timer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [message, reduced]);

  return (
    <svg
      viewBox="0 0 200 250"
      className={cn('h-full w-full', className)}
      role="img"
      aria-label={title}
    >
      <defs>
        <filter id={`${uid}-msg-shadow`} x="-20%" y="-40%" width="140%" height="180%">
          <feDropShadow
            dx="0"
            dy="1.5"
            stdDeviation="1.2"
            floodColor="#4E2420"
            floodOpacity="0.28"
          />
        </filter>
        <clipPath id={`${uid}-msg-clip`}>
          <rect
            x="40"
            y="140"
            width={clipWidth}
            height="28"
            style={{
              transition: reduced ? undefined : 'width 400ms ease-out',
            }}
          />
        </clipPath>
      </defs>
      <rect width="200" height="250" fill="#FFF9F3" />
      <ellipse cx="100" cy="210" rx="70" ry="12" fill="#4E242018" />
      <rect x="40" y="130" width="120" height="70" rx="8" fill={colors.sponge} />
      <rect x="40" y="100" width="120" height="40" rx="8" fill={colors.frosting} />
      <path
        d={`M40 112 C55 128 65 128 80 112 C95 128 105 128 120 112 C135 128 145 128 160 112 L160 100 L40 100 Z`}
        fill={colors.drip}
      />
      <circle cx="70" cy="92" r="7" fill={accent} />
      <circle cx="100" cy="86" r="8" fill={accent} />
      <circle cx="130" cy="92" r="7" fill={accent} />
      <rect x="88" y="70" width="24" height="10" rx="3" fill="#FFF9F3" opacity="0.85" />

      {piped ? (
        <text
          x="100"
          y="158"
          textAnchor="middle"
          fontSize="11"
          fontFamily="var(--font-fraunces), Georgia, serif"
          fontWeight={600}
          fill="#FFF9F3"
          stroke="#FADAD6"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          paintOrder="stroke fill"
          filter={`url(#${uid}-msg-shadow)`}
          clipPath={`url(#${uid}-msg-clip)`}
          letterSpacing="0.02em"
        >
          {piped}
        </text>
      ) : null}
    </svg>
  );
}
