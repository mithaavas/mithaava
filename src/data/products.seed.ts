import type { Product } from '@/domain/types';

/**
 * Single source of truth for the Mithaava menu (Final Menu PDF).
 * Slugs predate some renames and are kept so indexed URLs keep working.
 * UI must never import this file — use productRepository only.
 */

type CakePrices = [oneKg: number, halfKg: number, bento: number | null];

function cake(
  slug: string,
  name: string,
  collections: string[],
  [oneKg, halfKg, uAndMe]: CakePrices,
  extra: Partial<Product> = {},
): Product {
  return {
    id: slug,
    slug,
    name,
    collections,
    prices: { oneKg, halfKg, uAndMe },
    isActive: true,
    ...extra,
  };
}

function item(
  slug: string,
  name: string,
  collection: string,
  piece: number,
  extra: Partial<Product> = {},
): Product {
  return {
    id: slug,
    slug,
    name,
    collections: [collection],
    prices: { piece },
    isActive: true,
    ...extra,
  };
}

/** Priced per kg from the menu; any weight, design and final price agreed on WhatsApp. */
function customCake(slug: string, name: string, perKg: number, occasion: string): Product {
  return {
    id: slug,
    slug,
    name,
    collections: ['celebration'],
    prices: { oneKg: perKg, halfKg: null, uAndMe: null },
    note: `${occasion} · from ₹${perKg.toLocaleString('en-IN')}/kg in any weight — we confirm the design and final price on WhatsApp`,
    isActive: true,
  };
}

const BEST = 'best-sellers';

export const productsSeed: Product[] = [
  // Classic Cakes
  cake('black-forest', 'Black Forest Cake', ['classic', BEST], [890, 510, 320]),
  cake('pineapple', 'Pineapple Cake', ['classic', BEST], [1000, 570, 350]),
  cake('belgium-pineapple', 'Belgian Pineapple Cake', ['classic', BEST], [1050, 600, 370], {
    badges: ['chefs-fav'],
  }),
  cake('blueberry', 'Blueberry Cake', ['classic', BEST], [1240, 710, 440]),
  cake('butter-scotch', 'Butterscotch Cake', ['classic', BEST], [910, 520, 320]),
  cake('strawberry', 'Strawberry Cake', ['classic', BEST], [910, 520, 320]),
  cake('red-velvet', 'Red Velvet Cake', ['classic'], [1330, 760, 470], { leadTimeHours: 6 }),

  // Chocolate Cakes
  cake('choco-chips', 'Chocolate Chip Cake', ['chocolate', BEST], [1160, 660, 410]),
  cake('chocolate', 'Chocolate Cake', ['chocolate', BEST], [1000, 570, 350]),
  cake('dark-chocolate-truffle', 'Dark Chocolate Truffle Cake', ['chocolate'], [980, 560, 350]),
  cake('truffle-fresh-cream', 'Fresh Cream Truffle Cake', ['chocolate'], [910, 520, 320]),
  cake('choco-mud', 'Chocolate Mud Cake', ['chocolate'], [1140, 650, 400]),
  cake('choco-oreo', 'Chocolate Oreo Cake', ['chocolate'], [1240, 710, 440]),
  cake('kit-kat', 'KitKat Cake', ['chocolate'], [1560, 890, null]),
  cake('choco-fudge', 'Chocolate Fudge Cake', ['chocolate'], [1140, 650, 400]),
  cake('choco-marble', 'Chocolate Marble Cake', ['chocolate'], [1050, 600, 370]),
  cake('white-forest', 'White Forest Cake', ['chocolate'], [1030, 590, 370]),
  cake('choco-hazelnut', 'Chocolate Hazelnut Cake', ['chocolate'], [1350, 770, 480]),
  cake('choco-caramel', 'Chocolate Caramel Cake', ['chocolate'], [1140, 650, 400]),
  cake('belgium-truffle', 'Belgian Truffle Cake', ['chocolate'], [1350, 770, 480], {
    note: 'Belgian chocolate filling inside',
  }),
  cake('ferrero-rocher', 'Ferrero Rocher Cake', ['chocolate'], [1660, 950, 590], {
    note: 'Hazelnut, cashew, truffle and crunchy wafer filling',
  }),
  cake('opera', 'Opera Cake', ['chocolate'], [1350, 770, 480], { note: 'White truffle filling' }),

  // Chocolate Fusion Cakes
  cake('choco-walnut', 'Chocolate Walnut Cake', ['chocolate-recipe'], [1140, 650, 400]),
  cake('choco-strawberry', 'Chocolate Strawberry Cake', ['chocolate-recipe'], [1050, 600, 370]),
  cake('choco-dry-fruit', 'Chocolate Dry Fruit Cake', ['chocolate-recipe'], [1140, 650, 400]),
  cake('choco-pineapple', 'Chocolate Pineapple Cake', ['chocolate-recipe'], [1050, 600, 370]),
  cake('choco-fruit', 'Chocolate Fruit Cake', ['chocolate-recipe'], [1140, 650, 400]),

  // Cheesecakes & Desserts
  cake('philippines-blueberry-cheese', 'Blueberry Cheesecake', ['cheese'], [1170, 670, 420], {
    leadTimeHours: 2,
  }),
  cake('strawberry-cheese', 'Strawberry Cheesecake', ['cheese'], [1170, 670, 420], {
    leadTimeHours: 2,
  }),
  cake('mango-cheese', 'Mango Cheesecake', ['cheese'], [1170, 670, 420], { leadTimeHours: 2 }),
  cake('rainbow-cheese', 'Rainbow Cheesecake', ['cheese'], [1260, 720, 450], {
    leadTimeHours: 6,
  }),
  cake('tiramishu', 'Tiramisu Cake', ['cheese'], [1350, 770, 480], {
    leadTimeHours: 6,
    note: 'Coffee-flavoured Italian dessert',
  }),
  cake('rasmalai', 'Rasmalai Cake', ['cheese'], [1420, 810, 500], {
    badges: ['new'],
    note: 'Festive special',
  }),

  // Fruit & Nut Cakes
  cake('fresh-fruit', 'Fresh Fruit Cake', ['fruit', BEST], [1310, 750, 470]),
  cake('kiwi', 'Kiwi Cake', ['fruit'], [1160, 660, 410]),
  cake('cherry', 'Cherry Cake', ['fruit'], [1050, 600, 370]),
  cake('lemon', 'Lemon Cake', ['fruit'], [1050, 600, 370]),
  cake('mango-pulp', 'Mango Pulp Cake', ['fruit'], [1050, 600, 370]),
  cake('red-velvet-fruit', 'Red Velvet Fruit Cake', ['fruit'], [1380, 790, null]),
  cake('dry-fresho', 'Fresh & Dry Fruit Cake', ['fruit'], [1140, 650, 400], {
    note: 'Dry fruits and fresh fruits',
  }),
  cake('cashew-casata', 'Cashew Cassata Cake', ['fruit'], [1050, 600, 370], {
    badges: ['chefs-fav'],
  }),

  // Celebration Cakes
  {
    id: 'heart-shaped',
    slug: 'heart-shaped',
    name: 'Heart-Shaped Cake',
    collections: ['celebration'],
    prices: { halfKg: 620, oneKg: 1140, uAndMe: null },
    note: 'For honeymoons and anniversaries',
    isActive: true,
  },
  customCake('number-letter', 'Number & Letter Cake', 1520, 'Birthdays and milestones'),
  customCake('theme-designer', 'Theme & Designer Cake', 1330, 'Anniversary, birthday or custom'),
  customCake('two-tier', 'Two-Tier Cake', 1235, 'Engagements and weddings'),
  customCake('three-tier', 'Three-Tier Cake', 1425, 'Grand weddings'),
  customCake('corporate-logo', 'Corporate Logo Cake', 1330, 'Brand-printed for office events'),

  // Pastries
  item('black-forest-pastry', 'Black Forest Pastry', 'pastries', 95),
  item('pineapple-pastry', 'Pineapple Pastry', 'pastries', 95),
  item('butterscotch-pastry', 'Butterscotch Pastry', 'pastries', 105),
  item('strawberry-pastry', 'Strawberry Pastry', 'pastries', 95),
  item('blueberry-pastry', 'Blueberry Pastry', 'pastries', 105),
  item('chocolate-truffle-pastry', 'Chocolate Truffle Pastry', 'pastries', 105),
  item('rasmalai-pastry', 'Rasmalai Pastry', 'pastries', 130, {
    badges: ['new'],
    note: 'Festive special',
  }),
  item('pastry-box-4', 'Pastry Box · 4 pcs', 'pastries', 399),
  item('pastry-box-6', 'Pastry Box · 6 pcs', 'pastries', 579),
  item('pastry-box-12', 'Pastry Box · 12 pcs', 'pastries', 1099),

  // Brownies
  item('chocolate-chip-brownie', 'Chocolate Chip Brownie', 'brownies', 105),
  item('walnut-brownie', 'Walnut Brownie', 'brownies', 110),
  item('cookie-brownie', 'Cookie Brownie', 'brownies', 95),
  item('chocolate-overload-brownie', 'Chocolate Overload Brownie', 'brownies', 100),
  item('brownie-box-6', 'Brownie Box · 6 pcs', 'brownies', 655),
  item('brownie-box-12', 'Brownie Box · 12 pcs', 'brownies', 1325),

  // Cupcakes
  item('vanilla-cupcake', 'Vanilla Cupcake', 'cupcakes', 95),
  item('chocolate-cupcake', 'Chocolate Cupcake', 'cupcakes', 95),
  item('blueberry-cupcake', 'Blueberry Cupcake', 'cupcakes', 95),
  item('oreo-cupcake', 'Oreo Cupcake', 'cupcakes', 95),
  item('cupcake-box-6', 'Cupcake Box · 6 pcs', 'cupcakes', 549),
  item('cupcake-box-12', 'Cupcake Box · 12 pcs', 'cupcakes', 1049),

  // Jar Cakes
  item('chocolate-truffle-jar', 'Chocolate Truffle Jar', 'jar-cakes', 180),
  item('blueberry-cheesecake-jar', 'Blueberry Cheesecake Jar', 'jar-cakes', 180),
  item('tiramisu-jar', 'Tiramisu Jar', 'jar-cakes', 180),
  item('rasmalai-jar', 'Rasmalai Jar', 'jar-cakes', 180),
  item('oreo-cheesecake-jar', 'Oreo Cheesecake Jar', 'jar-cakes', 180),
  item('jar-box-3', 'Jar Box · 3 jars', 'jar-cakes', 550),
];
