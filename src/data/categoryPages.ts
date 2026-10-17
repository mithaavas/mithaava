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
  /** Hero button label; defaults to "Shop {navLabel}" */
  ctaLabel?: string;
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
      'Order the best chocolate truffle cake in Gurgaon from Mithaava, Sector 46 — Ferrero Rocher, Belgian truffle & dark chocolate cakes, delivered 24/7.',
    heading: 'Best chocolate truffle cake in Gurgaon',
    intro:
      'Rich, glossy and properly chocolatey — our truffle cakes are baked fresh in Sector 46, Gurugram and delivered across Gurgaon any time of the day or night. From a classic dark chocolate truffle to a hazelnut-loaded Ferrero Rocher cake, this is our full chocolate collection.',
    sections: [
      {
        heading: 'What makes a great chocolate truffle cake',
        body: 'A real truffle cake is about the ganache: smooth, deep and not overly sweet, layered between soft chocolate sponge. Our Dark Chocolate Truffle, Belgian Truffle and Fresh Cream Truffle cakes are each finished by hand, so every slice has that dense, melt-in-the-mouth centre.',
      },
      {
        heading: 'Ferrero Rocher cake delivery in Gurugram',
        body: 'Our Ferrero Rocher cake is a Mithaava Special — hazelnut, cashew, truffle and crunchy wafers, topped with whole Ferrero Rocher chocolates. It is one of the most ordered celebration cakes for birthdays and anniversaries, and we deliver it across Sector 46, Sohna Road, Nirvana Country and Golf Course Extension Road.',
      },
      {
        heading: 'Order a dark chocolate cake online',
        body: 'Pick your cake and size (500 gm, 1 kg or the 200 g Bento cake), add a message, and send the order on WhatsApp. Because we are open 24 hours, you can order a dark chocolate cake online for a midnight surprise or a same-day celebration.',
      },
    ],
    faqs: [
      {
        q: 'Which is the best chocolate truffle cake at Mithaava?',
        a: 'For pure chocolate lovers, the Dark Chocolate Truffle Cake is our richest option. If you prefer something lighter, try the Fresh Cream Truffle Cake; for a premium finish, go for the Belgian Truffle or Ferrero Rocher cake.',
      },
      {
        q: 'Do you deliver Ferrero Rocher cakes across Gurgaon?',
        a: 'Yes. We deliver Ferrero Rocher cakes across Delhi NCR from our Sector 46 bakery, including Sohna Road, Nirvana Country, Sectors 45, 47 and 50, and Golf Course Extension Road.',
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
    metaTitle: 'Blueberry Cheesecake in Gurugram — Mango Cheesecake & More',
    metaDescription:
      'Blueberry cheesecake in Gurugram from Mithaava, Sector 46 — plus mango, strawberry & rainbow cheesecakes. Fresh, chilled and delivered 24/7.',
    heading: 'Blueberry cheesecake in Gurugram',
    intro:
      'Silky, rich and chilled to perfection — Mithaava cheesecakes are made fresh in our Sector 46 kitchen and delivered across Gurugram. Our signature Blueberry Cheesecake leads the collection, alongside mango, strawberry and rainbow cheesecakes.',
    sections: [
      {
        heading: 'Our signature blueberry cheesecake',
        body: 'The Blueberry Cheesecake is one of our three Mithaava Specials: a creamy cheese layer with a bright blueberry topping that balances sweet and tangy. It is the cheesecake most Gurugram customers order for birthdays, anniversaries and dinner parties.',
      },
      {
        heading: 'Looking for a New York baked cheesecake near you?',
        body: 'If you love the dense, creamy richness of a New York-style cheesecake, our cheese cakes are a great match — and they are made right here in Sector 46, so they reach you fresh and properly chilled. Message us on WhatsApp if you have a specific style or flavour in mind and we will guide you.',
      },
      {
        heading: 'Mango cheese cake and more flavours',
        body: 'Our Mango Cheesecake is a summer favourite with a smooth mango finish, while the Strawberry Cheesecake and colourful Rainbow Cheesecake are perfect for kids’ parties. Cheesecakes need a little extra setting time, so order a couple of hours ahead.',
      },
    ],
    faqs: [
      {
        q: 'Where can I get a blueberry cheesecake in Gurugram?',
        a: 'Mithaava bakery in Sector 46, Gurugram makes a fresh Blueberry Cheesecake and delivers it across Delhi NCR, 24 hours a day.',
      },
      {
        q: 'How far in advance should I order a cheesecake?',
        a: 'Please allow at least 2 extra hours for cheesecakes so they are fully set and chilled before delivery.',
      },
      {
        q: 'Do you have a mango cheese cake?',
        a: 'Yes — our Mango Cheesecake comes in the 200 g Bento size, 500 gm and 1 kg. Check the product page for current prices.',
      },
    ],
    relatedBlogSlugs: ['cheese-cake-flavours-guide', 'perfect-cake-size-guide', 'midnight-cake-delivery-gurugram'],
  },
  {
    slug: 'midnight-delivery-gurugram',
    collectionIds: [],
    extraProductSlugs: [
      'ferrero-rocher',
      'dark-chocolate-truffle',
      'philippines-blueberry-cheese',
      'black-forest',
      'red-velvet',
      'kit-kat',
      'belgium-truffle',
      'truffle-fresh-cream',
      'butter-scotch',
      'choco-oreo',
      'pineapple',
      'rainbow-cheese',
    ],
    featuredProductSlugs: [
      'ferrero-rocher',
      'dark-chocolate-truffle',
      'philippines-blueberry-cheese',
      'black-forest',
      'red-velvet',
      'kit-kat',
    ],
    navLabel: 'Midnight cake delivery',
    ctaLabel: 'Choose a midnight cake',
    primaryKeyword: 'midnight cake delivery Gurugram',
    secondaryKeywords: [
      'birthday cakes Sector 46',
      'anniversary cakes Gurgaon',
      '24/7 cake delivery Gurgaon',
    ],
    metaTitle: 'Midnight Cake Delivery in Gurugram — Delivered at 12 AM',
    metaDescription:
      'Midnight cake delivery in Gurugram from Mithaava, open 24/7 in Sector 46. Birthday & anniversary cakes delivered at 12 AM across Delhi NCR.',
    heading: 'Midnight cake delivery in Gurugram',
    intro:
      'Surprise them the moment the clock strikes twelve. Mithaava is open 24 hours in Sector 46, so midnight cake delivery across Gurugram is part of our everyday — freshly finished birthday and anniversary cakes, delivered right on time.',
    sections: [
      {
        heading: 'Birthday cakes in Sector 46, delivered at midnight',
        body: 'Sector 46 is home, so midnight birthday cakes here arrive fastest. Our Ferrero Rocher, Dark Chocolate Truffle and classic Black Forest cakes are the most ordered for 12 AM birthday surprises, and the KitKat cake is a favourite for kids and teens.',
      },
      {
        heading: 'Anniversary cakes in Gurgaon for two',
        body: 'Pick our 200 g Bento cake for an anniversary at midnight — a proper celebration cake made for exactly two people. Red Velvet with cream cheese frosting and the Blueberry Cheesecake are the couple favourites across Gurgaon.',
      },
      {
        heading: 'How to book a midnight cake',
        body: 'Add your cake to the cart, choose the late-night delivery slot at checkout and send the order on WhatsApp. We confirm the address, society gate instructions and cake message with you. Order a few hours ahead — cheesecakes and signature cakes need extra setting time.',
      },
    ],
    faqs: [
      {
        q: 'Do you deliver cakes at midnight in Gurugram?',
        a: 'Yes. Mithaava is open 24 hours and delivers midnight cakes across Delhi NCR from our Sector 46 bakery, including Sohna Road, Nirvana Country, Sectors 45, 47 and 50, and Golf Course Extension Road.',
      },
      {
        q: 'How early should I order a midnight cake?',
        a: 'For fresh cream and chocolate cakes, a few hours ahead is enough. Cheesecakes need about 2 extra hours and signature cakes like Red Velvet about 6 hours, so order those earlier in the day.',
      },
      {
        q: 'Is there an extra charge for midnight delivery?',
        a: 'Delivery charges depend on your location and are confirmed with you on WhatsApp before we finalise the order.',
      },
    ],
    relatedBlogSlugs: ['midnight-cake-delivery-gurugram', 'birthday-cakes-sector-46', 'cake-message-ideas'],
  },
  {
    slug: 'eggless-cakes',
    collectionIds: ['best-sellers', 'classic', 'chocolate', 'cheese', 'fruit'],
    featuredProductSlugs: [
      'black-forest',
      'ferrero-rocher',
      'philippines-blueberry-cheese',
      'red-velvet',
      'fresh-fruit',
      'pineapple',
    ],
    navLabel: 'Eggless cakes',
    ctaLabel: 'Shop eggless cakes',
    primaryKeyword: 'eggless cake delivery Gurugram',
    secondaryKeywords: [
      'eggless cake Delhi NCR',
      'pure veg bakery Gurugram',
      'eggless birthday cake Gurgaon',
    ],
    metaTitle: 'Eggless Cake Delivery in Gurugram & Delhi NCR — Mithaava',
    metaDescription:
      'Eggless cake delivery in Gurugram & Delhi NCR from Mithaava, Sector 46. Pure veg, alcohol-free cakes, cheesecakes & midnight delivery. Order 24/7.',
    heading: 'Eggless cake delivery in Gurugram and Delhi NCR',
    intro:
      'Every Mithaava cake is Pure Veg, eggless and alcohol-free — chocolate, cheesecake, fruit and celebration cakes baked fresh in Sector 46 and delivered across Delhi NCR.',
    sections: [
      {
        heading: 'A pure veg bakery you can trust',
        body: 'Families across Gurugram choose Mithaava because every sponge, cream and cheesecake is made without egg. You do not need to ask which cakes are eggless — the whole menu is.',
      },
      {
        heading: 'Eggless birthday and celebration cakes',
        body: 'From Black Forest and Pineapple to Ferrero Rocher and Red Velvet, our eggless celebration cakes come in Bento (200 g), 500 gm and 1 kg. Add a name or message at checkout.',
      },
      {
        heading: 'Order eggless cakes online across Delhi NCR',
        body: 'We deliver eggless cakes to Delhi, Gurugram, Noida, Faridabad and Ghaziabad. Pick your cake, confirm your pincode and send the order on WhatsApp — we are open 24 hours.',
      },
    ],
    faqs: [
      {
        q: 'Are all Mithaava cakes eggless?',
        a: 'Yes. All cakes, pastries, brownies, cupcakes and jar cakes on our menu are Pure Veg, eggless and alcohol-free.',
      },
      {
        q: 'Do you deliver eggless cakes across Delhi NCR?',
        a: 'Yes. We deliver from Sector 46, Gurugram to Delhi, Noida, Faridabad, Ghaziabad and all of Gurugram. Enter your pincode at checkout to confirm.',
      },
      {
        q: 'Can I order an eggless cake for midnight delivery?',
        a: 'Yes. We are open 24 hours and can time eggless cake delivery for midnight celebrations across Delhi NCR.',
      },
    ],
    relatedBlogSlugs: ['birthday-cakes-sector-46', 'perfect-cake-size-guide', 'midnight-cake-delivery-gurugram'],
  },
  {
    slug: 'birthday-cakes',
    collectionIds: ['celebration', 'best-sellers'],
    extraProductSlugs: [
      'kit-kat',
      'rainbow-cheese',
      'choco-oreo',
      'black-forest',
      'ferrero-rocher',
      'number-letter',
      'theme-designer',
    ],
    featuredProductSlugs: [
      'ferrero-rocher',
      'kit-kat',
      'black-forest',
      'rainbow-cheese',
      'number-letter',
      'theme-designer',
    ],
    navLabel: 'Birthday cakes',
    ctaLabel: 'Shop birthday cakes',
    primaryKeyword: 'birthday cake delivery Gurugram',
    secondaryKeywords: [
      'birthday cakes Sector 46',
      'kids birthday cake Gurgaon',
      'theme cake delivery Delhi NCR',
    ],
    metaTitle: 'Birthday Cake Delivery in Gurugram — Theme & Kids Cakes',
    metaDescription:
      'Birthday cake delivery in Gurugram from Mithaava, Sector 46. Eggless theme cakes, KitKat, Ferrero Rocher & midnight surprises across Delhi NCR.',
    heading: 'Birthday cake delivery in Gurugram',
    intro:
      'Make the birthday cut with a freshly baked eggless cake from Sector 46. Kids love KitKat and Rainbow Cheesecake; adults reach for Ferrero Rocher and Black Forest — delivered 24/7 across Delhi NCR.',
    sections: [
      {
        heading: 'Kids birthday cakes they will recognise',
        body: 'KitKat, Chocolate Oreo and Rainbow Cheesecake are the playful hits for kids’ parties. Add a short message or name and we finish the cake before it leaves the bakery.',
      },
      {
        heading: 'Theme, number and designer birthday cakes',
        body: 'Need a number cake, letter cake or full theme design? Our celebration range starts from a clear per-kg price and we confirm the design with you on WhatsApp.',
      },
      {
        heading: 'Midnight birthday cake delivery',
        body: 'Surprise them at 12 AM. Order a few hours ahead, choose a late slot at checkout and we will coordinate the society gate with you.',
      },
    ],
    faqs: [
      {
        q: 'Which birthday cake is most popular at Mithaava?',
        a: 'Ferrero Rocher and Black Forest lead adult birthdays; KitKat and Rainbow Cheesecake are the kids’ favourites.',
      },
      {
        q: 'Can you write a name on a birthday cake?',
        a: 'Yes. Add the message at checkout or tell us on WhatsApp and we pipe it before delivery.',
      },
      {
        q: 'Do you deliver birthday cakes at midnight in Gurugram?',
        a: 'Yes. We are open 24 hours and deliver midnight birthday cakes across Delhi NCR from Sector 46.',
      },
    ],
    relatedBlogSlugs: ['birthday-cakes-sector-46', 'cake-message-ideas', 'midnight-cake-delivery-gurugram'],
  },
  {
    slug: 'anniversary-cakes',
    collectionIds: ['celebration'],
    extraProductSlugs: [
      'heart-shaped',
      'red-velvet',
      'philippines-blueberry-cheese',
      'ferrero-rocher',
      'opera',
    ],
    featuredProductSlugs: [
      'heart-shaped',
      'red-velvet',
      'philippines-blueberry-cheese',
      'ferrero-rocher',
    ],
    navLabel: 'Anniversary cakes',
    ctaLabel: 'Shop anniversary cakes',
    primaryKeyword: 'anniversary cake delivery Gurugram',
    secondaryKeywords: [
      'heart shaped cake Gurgaon',
      'couple cake Bento',
      'anniversary cake Delhi NCR',
    ],
    metaTitle: 'Anniversary Cake Delivery in Gurugram — Heart & Bento',
    metaDescription:
      'Anniversary cake delivery in Gurugram from Mithaava. Heart-shaped cakes, 200 g Bento for two, Red Velvet & cheesecakes — delivered 24/7 across Delhi NCR.',
    heading: 'Anniversary cake delivery in Gurugram',
    intro:
      'Celebrate the two of you with a heart-shaped cake or a 200 g Bento — proper celebration cakes without leftovers. Delivered fresh from Sector 46 across Delhi NCR.',
    sections: [
      {
        heading: 'Heart-shaped cakes for honeymoons and anniversaries',
        body: 'Our Heart-Shaped Cake is available in 500 gm and 1 kg. Tell us the flavour you love and we finish it for your date night or anniversary dinner.',
      },
      {
        heading: 'Bento cakes made for two',
        body: 'The 200 g Bento size is our couple cake — Red Velvet, Blueberry Cheesecake and Ferrero Rocher are the most ordered anniversary flavours.',
      },
      {
        heading: 'Midnight anniversary surprises',
        body: 'Open 24 hours means you can plan a 12 AM cake reveal. Order ahead, share gate instructions, and we will time the delivery.',
      },
    ],
    faqs: [
      {
        q: 'Do you make heart-shaped anniversary cakes?',
        a: 'Yes. Our Heart-Shaped Cake comes in 500 gm (₹620) and 1 kg (₹1,140). Flavour is confirmed with you on WhatsApp.',
      },
      {
        q: 'What size cake is best for two people?',
        a: 'Choose the 200 g Bento size — a proper celebration cake meant for exactly two people.',
      },
      {
        q: 'Can you deliver an anniversary cake at midnight?',
        a: 'Yes. Midnight anniversary cake delivery is available across Delhi NCR from our Sector 46 bakery.',
      },
    ],
    relatedBlogSlugs: ['perfect-cake-size-guide', 'ferrero-rocher-celebration-cake', 'midnight-cake-delivery-gurugram'],
  },
  {
    slug: 'corporate-cakes',
    collectionIds: ['pastries', 'brownies', 'cupcakes', 'jar-cakes'],
    extraProductSlugs: ['corporate-logo', 'theme-designer'],
    featuredProductSlugs: [
      'corporate-logo',
      'pastry-box-12',
      'brownie-box-12',
      'cupcake-box-12',
      'jar-box-3',
      'pastry-box-6',
    ],
    navLabel: 'Corporate cakes',
    ctaLabel: 'Shop corporate treats',
    primaryKeyword: 'corporate cake delivery Gurugram',
    secondaryKeywords: [
      'office cake delivery Gurgaon',
      'logo cake Delhi NCR',
      'bulk pastry box Gurugram',
    ],
    metaTitle: 'Corporate Cake & Office Treat Delivery in Gurugram',
    metaDescription:
      'Corporate cake delivery in Gurugram from Mithaava — logo cakes, pastry boxes, brownie boxes & jar cakes for offices across Delhi NCR. WhatsApp for a quote.',
    heading: 'Corporate cakes and office treat boxes',
    intro:
      'Logo cakes for brand moments, pastry and brownie boxes for team birthdays, jar cakes for client gifting — baked in Sector 46 and delivered across Delhi NCR.',
    sections: [
      {
        heading: 'Brand-printed logo cakes',
        body: 'Our Corporate Logo Cake starts from ₹1,330/kg. Share your logo and event details on WhatsApp and we confirm design, weight and delivery timing.',
      },
      {
        heading: 'Pastry, brownie and cupcake boxes for the office',
        body: 'Boxes of 4, 6 or 12 make it easy to treat a floor or a meeting room. All items are eggless and finished fresh before dispatch.',
      },
      {
        heading: 'Bulk and Diwali gifting',
        body: 'Planning Diwali hampers or a large office celebration? Message us on WhatsApp for a quote on jar boxes, brownie boxes and custom cakes.',
      },
    ],
    faqs: [
      {
        q: 'Can you print our company logo on a cake?',
        a: 'Yes. Order the Corporate Logo Cake and share your logo file on WhatsApp. We confirm the design and final price before baking.',
      },
      {
        q: 'Do you deliver to offices in Noida and Delhi?',
        a: 'Yes. We deliver corporate cakes and treat boxes across Delhi NCR, including Delhi, Noida, Gurugram, Faridabad and Ghaziabad.',
      },
      {
        q: 'What is a good quantity for a team of 20?',
        a: 'A 1 kg cake plus a pastry or brownie box of 12 usually covers a small office celebration. We can guide you on WhatsApp.',
      },
    ],
    relatedBlogSlugs: ['order-cakes-whatsapp-guide', 'same-day-cake-gurugram', 'perfect-cake-size-guide'],
  },
  {
    slug: 'same-day-cake-delivery',
    collectionIds: ['best-sellers', 'classic', 'chocolate'],
    extraProductSlugs: [
      'black-forest',
      'pineapple',
      'chocolate',
      'butter-scotch',
      'truffle-fresh-cream',
      'strawberry',
    ],
    featuredProductSlugs: [
      'black-forest',
      'pineapple',
      'chocolate',
      'butter-scotch',
      'truffle-fresh-cream',
      'dark-chocolate-truffle',
    ],
    navLabel: 'Same-day delivery',
    ctaLabel: 'Order for today',
    primaryKeyword: 'same day cake delivery Gurugram',
    secondaryKeywords: [
      'same day cake Delhi NCR',
      'last minute cake Sector 46',
      'urgent cake delivery Gurgaon',
    ],
    metaTitle: 'Same-Day Cake Delivery in Gurugram — Order Today',
    metaDescription:
      'Same-day cake delivery in Gurugram from Mithaava, Sector 46. Fresh cream & chocolate cakes for last-minute plans across Delhi NCR. Open 24/7.',
    heading: 'Same-day cake delivery in Gurugram',
    intro:
      'Plans changed? Mithaava bakes fresh cream and chocolate cakes that can often go out the same day when you order early enough. Open 24 hours in Sector 46.',
    sections: [
      {
        heading: 'Which cakes are fastest for same-day?',
        body: 'Classic fresh cream cakes — Black Forest, Pineapple, Butterscotch, Chocolate and Fresh Cream Truffle — need less setting time than cheesecakes or Red Velvet.',
      },
      {
        heading: 'Lead times still matter',
        body: 'Cheesecakes need about 2 extra hours and some celebration cakes need longer. Message us on WhatsApp with your area and we will tell you the earliest slot.',
      },
      {
        heading: 'Same-day across Delhi NCR',
        body: 'Nearby Gurugram sectors are quickest. For Delhi, Noida, Faridabad or Ghaziabad, order earlier so we can plan the drive while the cake stays chilled.',
      },
    ],
    faqs: [
      {
        q: 'Can I get a cake delivered today in Gurugram?',
        a: 'Often yes for fresh cream and chocolate cakes if you order early enough. WhatsApp us your pincode and cake choice and we confirm the earliest slot.',
      },
      {
        q: 'Which cakes are not ideal for last-minute orders?',
        a: 'Cheesecakes need about 2 extra hours and Red Velvet about 6 hours, so order those earlier in the day.',
      },
      {
        q: 'Do you offer same-day delivery to Noida or Delhi?',
        a: 'Yes when timing allows. Longer drives need more notice — we confirm on WhatsApp before you finalise.',
      },
    ],
    relatedBlogSlugs: ['same-day-cake-gurugram', 'order-cakes-whatsapp-guide', 'midnight-cake-delivery-gurugram'],
  },
];

export function getAllCategoryPages(): CategoryPage[] {
  return categoryPages;
}

export function getCategoryPageBySlug(slug: string): CategoryPage | undefined {
  return categoryPages.find((c) => c.slug === slug);
}

/** Prefer primary collection hubs; celebration maps to birthday cakes. */
const collectionCategoryPreference: Record<string, string> = {
  chocolate: 'chocolate-cakes',
  'chocolate-recipe': 'chocolate-cakes',
  cheese: 'cheesecakes',
  celebration: 'birthday-cakes',
  pastries: 'corporate-cakes',
  brownies: 'corporate-cakes',
  cupcakes: 'corporate-cakes',
  'jar-cakes': 'corporate-cakes',
  classic: 'eggless-cakes',
  'best-sellers': 'eggless-cakes',
  fruit: 'eggless-cakes',
};

/** Category landing page for a menu collection, if one exists. */
export function getCategoryPageForCollection(collectionId: string): CategoryPage | undefined {
  const preferred = collectionCategoryPreference[collectionId];
  if (preferred) {
    const page = categoryPages.find((c) => c.slug === preferred);
    if (page) return page;
  }
  return categoryPages.find((c) => c.collectionIds.includes(collectionId));
}
