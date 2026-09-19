/**
 * Central motion tokens for Framer Motion.
 * Durations in seconds for Framer; ms helpers for CSS.
 */

export const motionDuration = {
  fast: 0.15,
  medium: 0.25,
  slow: 0.4,
} as const;

export const motionDurationMs = {
  fast: 150,
  medium: 250,
  slow: 400,
} as const;

/** Shared ease curve (cubic-bezier feel) */
export const motionEase = [0.22, 1, 0.36, 1] as const;

export const motionSpring = {
  snappy: { type: 'spring' as const, stiffness: 420, damping: 32, mass: 0.8 },
  soft: { type: 'spring' as const, stiffness: 260, damping: 28, mass: 1 },
} as const;

export const motionTokens = {
  duration: motionDuration,
  durationMs: motionDurationMs,
  ease: motionEase,
  spring: motionSpring,
} as const;
