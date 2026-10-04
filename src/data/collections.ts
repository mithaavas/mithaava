import type { SizeKey } from '@/domain/types';

export type GradientKey =
  | 'best-sellers'
  | 'chocolate'
  | 'cheese'
  | 'signature'
  | 'chocolate-recipe'
  | 'favourites'
  | 'fruit';

export type CollectionDefinition = {
  id: string;
  label: string;
  gradientKey: GradientKey;
  /** Extra lead time for items in this collection (hours) */
  leadTimeHours?: number;
};

/**
 * Display order for menu sections (matches the Final Menu PDF).
 * Some ids predate the section renames and are kept for stable anchors.
 */
export const collections: CollectionDefinition[] = [
  { id: 'best-sellers', label: 'Best Sellers', gradientKey: 'best-sellers' },
  { id: 'classic', label: 'Classic Cakes', gradientKey: 'favourites' },
  { id: 'chocolate', label: 'Chocolate Cakes', gradientKey: 'chocolate' },
  { id: 'chocolate-recipe', label: 'Chocolate Fusion Cakes', gradientKey: 'chocolate-recipe' },
  { id: 'cheese', label: 'Cheesecakes & Desserts', gradientKey: 'cheese', leadTimeHours: 2 },
  { id: 'fruit', label: 'Fruit & Nut Cakes', gradientKey: 'fruit' },
  { id: 'celebration', label: 'Celebration Cakes', gradientKey: 'signature' },
  { id: 'pastries', label: 'Pastries', gradientKey: 'best-sellers' },
  { id: 'brownies', label: 'Brownies', gradientKey: 'chocolate' },
  { id: 'cupcakes', label: 'Cupcakes', gradientKey: 'cheese' },
  { id: 'jar-cakes', label: 'Jar Cakes', gradientKey: 'chocolate-recipe' },
];

export const collectionById: Record<string, CollectionDefinition> =
  Object.fromEntries(collections.map((c) => [c.id, c]));

/** Display order matches common cake weight pickers: smaller → larger, then Bento. */
export const sizeOrder: SizeKey[] = ['halfKg', 'oneKg', 'uAndMe'];
