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
 * Display order for menu sections.
 */
export const collections: CollectionDefinition[] = [
  {
    id: 'best-sellers',
    label: 'Best Sellers',
    gradientKey: 'best-sellers',
  },
  {
    id: 'chocolate',
    label: 'Chocolate Cakes',
    gradientKey: 'chocolate',
  },
  {
    id: 'cheese',
    label: 'Cheese Cakes',
    gradientKey: 'cheese',
    leadTimeHours: 2,
  },
  {
    id: 'signature',
    label: 'Signature Cakes',
    gradientKey: 'signature',
    leadTimeHours: 6,
  },
  {
    id: 'chocolate-recipe',
    label: 'Chocolate Recipe',
    gradientKey: 'chocolate-recipe',
  },
  {
    id: 'favourites',
    label: 'Seniors Favourite',
    gradientKey: 'favourites',
  },
  {
    id: 'fruit',
    label: 'Fruit Cakes',
    gradientKey: 'fruit',
  },
];

export const collectionById: Record<string, CollectionDefinition> =
  Object.fromEntries(collections.map((c) => [c.id, c]));

/** Display order matches common cake weight pickers: smaller → larger, then U & Me. */
export const sizeOrder: SizeKey[] = ['halfKg', 'oneKg', 'uAndMe'];
