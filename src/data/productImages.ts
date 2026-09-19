/**
 * Local cake photos under /public/cakes — one image per menu slug.
 * Sources: Unsplash License + Wikimedia Commons (see scripts/cake-image-credits.md).
 */
const bySlug: Record<string, string> = {
  'black-forest': '/cakes/black-forest.jpg',
  'belgium-pineapple': '/cakes/belgium-pineapple.jpg',
  pineapple: '/cakes/pineapple.jpg',
  'choco-chips': '/cakes/choco-chips.jpg',
  chocolate: '/cakes/chocolate.jpg',
  'fresh-fruit': '/cakes/fresh-fruit.jpg',
  blueberry: '/cakes/blueberry.jpg',
  'butter-scotch': '/cakes/butter-scotch.jpg',
  strawberry: '/cakes/strawberry.jpg',
  'dark-chocolate-truffle': '/cakes/dark-chocolate-truffle.jpg',
  'truffle-fresh-cream': '/cakes/truffle-fresh-cream.jpg',
  'choco-mud': '/cakes/choco-mud.jpg',
  'choco-oreo': '/cakes/choco-oreo.jpg',
  'kit-kat': '/cakes/kit-kat.jpg',
  'choco-fudge': '/cakes/choco-fudge.jpg',
  'choco-marble': '/cakes/choco-marble.jpg',
  'white-forest': '/cakes/white-forest.jpg',
  'choco-hazelnut': '/cakes/choco-hazelnut.jpg',
  'choco-caramel': '/cakes/choco-caramel.jpg',
  'belgium-truffle': '/cakes/belgium-truffle.jpg',
  'ferrero-rocher': '/cakes/ferrero-rocher.jpg',
  opera: '/cakes/opera.jpg',
  'philippines-blueberry-cheese': '/cakes/philippines-blueberry-cheese.jpg',
  'strawberry-cheese': '/cakes/strawberry-cheese.jpg',
  'mango-cheese': '/cakes/mango-cheese.jpg',
  'red-velvet': '/cakes/red-velvet.jpg',
  'rainbow-cheese': '/cakes/rainbow-cheese.jpg',
  tiramishu: '/cakes/tiramishu.jpg',
  'choco-walnut': '/cakes/choco-walnut.jpg',
  'choco-strawberry': '/cakes/choco-strawberry.jpg',
  'choco-dry-fruit': '/cakes/choco-dry-fruit.jpg',
  'choco-pineapple': '/cakes/choco-pineapple.jpg',
  'choco-fruit': '/cakes/choco-fruit.jpg',
  'cashew-casata': '/cakes/cashew-casata.jpg',
  kiwi: '/cakes/kiwi.jpg',
  cherry: '/cakes/cherry.jpg',
  lemon: '/cakes/lemon.jpg',
  'mango-pulp': '/cakes/mango-pulp.jpg',
  'red-velvet-fruit': '/cakes/red-velvet-fruit.jpg',
  'dry-fresho': '/cakes/dry-fresho.jpg',
};

const DEFAULT_IMAGE = '/cakes/chocolate.jpg';

export function imageForProduct(
  slug: string,
  _collections: string[],
  name: string,
): { src: string; alt: string } {
  const src = bySlug[slug] ?? DEFAULT_IMAGE;
  return { src, alt: name };
}

/** Featured hero plate photos (real product shots). */
export const heroPlateImages = [
  '/cakes/belgium-pineapple.jpg',
  '/cakes/black-forest.jpg',
  '/cakes/ferrero-rocher.jpg',
  '/cakes/red-velvet.jpg',
  '/cakes/philippines-blueberry-cheese.jpg',
] as const;
