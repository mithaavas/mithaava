/**
 * SEO category landing pages. Each targets one high-intent primary keyword
 * plus a few secondary keywords, and lists products from menu collections.
 */

export type CategoryFaq = { q: string; a: string };

export type CategoryPage = {
  slug: string;
  /** Menu collections whose products appear on this page */
  collectionIds: string[];
  /** Extra products pulled in from other collections */
  extraProductSlugs?: string[];
  /** Shown first, in this order */
  featuredProductSlugs: string[];
  navLabel: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  sections: { heading: string; body: string }[];
  faqs: CategoryFaq[];
  relatedBlogSlugs: string[];
};

export const categoryPages: CategoryPage[] = [
  {
    slug: 'chocolate-cakes',
    collectionIds: ['chocolate', 'chocolate-recipe'],
    featuredProductSlugs: [
      'dark-chocolate-truffle',
      'belgium-truffle',
      'truffle-fresh-cream',
      'ferrero-rocher',
    ],
    navLabel: 'Chocolate cakes',
    primaryKeyword: 'best chocolate truffle cake Gurgaon',
    secondaryKeywords: [
      'Ferrero Rocher cake delivery',
      'dark chocolate cake online',
      'chocolate cake delivery Gurugram',
    ],
    metaTitle: 'Best Chocolate Truffle Cake in Gurgaon — Ferrero Rocher Cakes',
    metaDescription:
      'Order the best chocolate truffle cake in Gurgaon from Mithaava, Sector 46. Ferrero Rocher cake delivery, dark chocolate cakes online and Belgian truffle — delivered fresh 24/7.',
    heading: 'Best chocolate truffle cake in Gurgaon',
    intro:
      'Rich, glossy and properly chocolatey — our truffle cakes are baked fresh in Sector 46, Gurugram and delivered across Gurgaon any time of the day or night. From a classic dark chocolate truffle to a hazelnut-loaded Ferrero Rocher cake, this is our full chocolate collection.',
    sections: [
      {
        heading: 'What makes a great chocolate truffle cake',
        body: 'A real truffle cake is about the ganache: smooth, deep and not overly sweet, layered between soft chocolate sponge. Our Dark Chocolate Truffle, Belgium Truffle and Truffle Fresh Cream cakes are each finished by hand, so every slice has that dense, melt-in-the-mouth centre.',
      },
      {
        heading: 'Ferrero Rocher cake delivery in Gurugram',
        body: 'Our Ferrero Rocher cake is a Mithaava Special — hazelnut, cashew, truffle and crunchy wafers, topped with whole Ferrero Rocher chocolates. It is one of the most ordered celebration cakes for birthdays and anniversaries, and we deliver it across Sector 46, Sohna Road, Nirvana Country and Golf Course Extension Road.',
      },
      {
        heading: 'Order a dark chocolate cake online',
        body: 'Pick your cake and size (500 gm, 1 kg or the U & Me couple cake), add a message, and send the order on WhatsApp. Because we are open 24 hours, you can order a dark chocolate cake online for a midnight surprise or a same-day celebration.',
      },
    ],
    faqs: [
      {
        q: 'Which is the best chocolate truffle cake at Mithaava?',
        a: 'For pure chocolate lovers, the Dark Chocolate Truffle Cake is our richest option. If you prefer something lighter, try the Truffle Fresh Cream Cake; for a premium finish, go for the Belgium Truffle or Ferrero Rocher cake.',
      },
      {
        q: 'Do you deliver Ferrero Rocher cakes across Gurgaon?',
        a: 'Yes. We deliver Ferrero Rocher cakes within 10 km of our Sector 46 bakery, including Sohna Road, Nirvana Country, Sectors 45, 47 and 50, and Golf Course Extension Road.',
      },
      {
        q: 'Can I order a chocolate cake online at midnight?',
        a: 'Yes — Mithaava is open 24 hours. Order online and confirm on WhatsApp; we will time the delivery for your midnight celebration.',
      },
    ],
    relatedBlogSlugs: ['ferrero-rocher-celebration-cake', 'red-velvet-vs-chocolate', 'midnight-cake-delivery-gurugram'],
  },
  {
    slug: 'cheesecakes',
    collectionIds: ['cheese'],
    extraProductSlugs: ['rainbow-cheese'],
    featuredProductSlugs: [
      'philippines-blueberry-cheese',
      'mango-cheese',
      'strawberry-cheese',
      'rainbow-cheese',
    ],
    navLabel: 'Cheesecakes',
    primaryKeyword: 'blueberry cheesecake Gurugram',
    secondaryKeywords: [
      'New York baked cheesecake near me',
      'mango cheese cake',
      'cheesecake delivery Gurgaon',
    ],
    metaTitle: 'Blueberry Cheesecake in Gurugram — Mango Cheese Cake & More',
    metaDescription:
      'Order blueberry cheesecake in Gurugram from Mithaava, Sector 46. Creamy mango cheese cake, strawberry and rainbow cheesecakes — fresh, chilled and delivered 24/7 near you.',
    heading: 'Blueberry cheesecake in Gurugram',
    intro:
      'Silky, rich and chilled to perfection — Mithaava cheesecakes are made fresh in our Sector 46 kitchen and delivered across Gurugram. Our signature Philippines Blueberry Cheese Cake leads the collection, alongside mango, strawberry and rainbow cheesecakes.',
    sections: [
      {
        heading: 'Our signature blueberry cheesecake',
        body: 'The Philippines Blueberry Cheese Cake is one of our three Mithaava Specials: a creamy cheese layer with a bright blueberry topping that balances sweet and tangy. It is the cheesecake most Gurugram customers order for birthdays, anniversaries and dinner parties.',
      },
      {
        heading: 'Looking for a New York baked cheesecake near you?',
        body: 'If you love the dense, creamy richness of a New York-style cheesecake, our cheese cakes are a great match — and they are made right here in Sector 46, so they reach you fresh and properly chilled. Message us on WhatsApp if you have a specific style or flavour in mind and we will guide you.',
      },
      {
        heading: 'Mango cheese cake and more flavours',
        body: 'Our Mango Cheese Cake is a summer favourite with a smooth mango finish, while the Strawberry Cheese Cake and colourful Rainbow Cheese Cake are perfect for kids’ parties. Cheesecakes need a little extra setting time, so order a couple of hours ahead.',
      },
    ],
    faqs: [
      {
        q: 'Where can I get a blueberry cheesecake in Gurugram?',
        a: 'Mithaava bakery in Sector 46, Gurugram makes a fresh Philippines Blueberry Cheese Cake and delivers it within 10 km, 24 hours a day.',
      },
      {
        q: 'How far in advance should I order a cheesecake?',
        a: 'Please allow at least 2 extra hours for cheesecakes so they are fully set and chilled before delivery.',
      },
      {
        q: 'Do you have a mango cheese cake?',
        a: 'Yes — our Mango Cheese Cake comes in the U & Me couple size, 500 gm and 1 kg. Check the product page for current prices.',
      },
    ],
    relatedBlogSlugs: ['cheese-cake-flavours-guide', 'perfect-cake-size-guide', 'midnight-cake-delivery-gurugram'],
  },
];

export function getAllCategoryPages(): CategoryPage[] {
  return categoryPages;
}

export function getCategoryPageBySlug(slug: string): CategoryPage | undefined {
  return categoryPages.find((c) => c.slug === slug);
}

/** Category landing page for a menu collection, if one exists. */
export function getCategoryPageForCollection(collectionId: string): CategoryPage | undefined {
  return categoryPages.find((c) => c.collectionIds.includes(collectionId));
}
