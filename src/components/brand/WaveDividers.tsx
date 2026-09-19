import { cn } from '@/lib/cn';

/**
 * Pink icing drip with eyelet cutouts — berry panel edge.
 * currentColor = pink fill; eyelets use cream so they read as holes on cream pages.
 */
export function PinkIcingDrip({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      className={cn('pointer-events-none block h-[4.5rem] w-full sm:h-20', className)}
      aria-hidden
    >
      {/* Solid band */}
      <rect x="0" y="0" width="1440" height="28" fill="currentColor" />
      {/* Wavy drip */}
      <path
        fill="currentColor"
        d="M0 36 H1440 V44
           C1365 44 1345 88 1270 88
           C1195 88 1175 44 1100 44
           C1025 44 1005 92 930 92
           C855 92 835 44 760 44
           C685 44 665 86 590 86
           C515 86 495 44 420 44
           C345 44 325 94 250 94
           C175 94 155 44 80 44
           C40 44 20 70 0 70 Z"
      />
      <ellipse cx="80" cy="68" rx="15" ry="11" fill="#FFF9F3" />
      <ellipse cx="250" cy="72" rx="17" ry="12" fill="#FFF9F3" />
      <ellipse cx="420" cy="66" rx="14" ry="10" fill="#FFF9F3" />
      <ellipse cx="590" cy="70" rx="16" ry="11" fill="#FFF9F3" />
      <ellipse cx="760" cy="66" rx="15" ry="10" fill="#FFF9F3" />
      <ellipse cx="930" cy="74" rx="17" ry="12" fill="#FFF9F3" />
      <ellipse cx="1100" cy="66" rx="14" ry="10" fill="#FFF9F3" />
      <ellipse cx="1270" cy="70" rx="16" ry="11" fill="#FFF9F3" />
    </svg>
  );
}

/** Soft chocolate wave — cream → cocoa footer. */
export function ChocolateWave({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 88"
      preserveAspectRatio="none"
      className={cn('pointer-events-none block h-14 w-full sm:h-[4.25rem]', className)}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0 88 V42
           C160 12 300 4 440 28
           C580 52 700 72 840 48
           C980 24 1120 6 1260 22
           C1340 32 1400 48 1440 36
           V88 Z"
      />
    </svg>
  );
}
