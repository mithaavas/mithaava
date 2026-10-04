/**
 * Delivery-area landing pages (all within the 10 km radius of Sector 46).
 * TODO(owner): confirm neighbourhood names and pincodes against real orders.
 */

export type LocalityFaq = { q: string; a: string };

export type Locality = {
  slug: string;
  name: string;
  /** Short label used in chips and link lists */
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  body: string[];
  neighbourhoods: string[];
  pincodes: string[];
  popularProductSlugs: string[];
  faqs: LocalityFaq[];
};

const sharedFaqs = (area: string): LocalityFaq[] => [
  {
    q: `Do you deliver cakes to ${area} at midnight?`,
    a: `Yes. Mithaava is open 24 hours, so you can order a cake for a midnight surprise in ${area}. Place the order a little in advance so the cake is freshly finished and chilled before it leaves the bakery.`,
  },
  {
    q: `How do I order a cake for delivery in ${area}?`,
    a: `Pick your cake and size on the Mithaava menu, add it to your cart and send the order on WhatsApp. We confirm the delivery slot, address and message on the cake with you directly.`,
  },
  {
    q: `Can I add a name or message on the cake?`,
    a: `Of course. Add the message at checkout or tell us on WhatsApp — we pipe names, wishes and short notes on every celebration cake.`,
  },
];

export const localities: Locality[] = [
  {
    slug: 'sohna-road',
    name: 'Sohna Road',
    shortName: 'Sohna Road',
    metaTitle: 'Cake Delivery on Sohna Road, Gurugram — Open 24/7',
    metaDescription:
      'Cake delivery on Sohna Road, Gurugram from Mithaava, Sector 46. Open 24/7 for midnight birthday cakes, cheesecakes & celebration cakes. Order on WhatsApp.',
    heading: 'Fresh cake delivery on Sohna Road, Gurugram',
    intro:
      'Sohna Road is one of our busiest delivery routes. From offices to high-rise societies, we bring freshly finished Mithaava cakes straight from our Sector 46 kitchen — any hour of the day.',
    body: [
      'Sohna Road sits right next to Sector 46, which means shorter travel time and cakes that arrive looking exactly the way they left the bakery. Fresh cream cakes stay cool, cheese cakes stay set, and toppings stay in place.',
      'Planning a team celebration or a late-night birthday surprise? Order a 1 kg cake for the office, or a 200 g Bento cake when it is just the two of you.',
    ],
    neighbourhoods: ['Subhash Chowk', 'South City II', 'Vatika City', 'Malibu Towne'],
    pincodes: ['122018'],
    popularProductSlugs: ['ferrero-rocher', 'red-velvet', 'black-forest', 'truffle-fresh-cream'],
    faqs: sharedFaqs('Sohna Road'),
  },
  {
    slug: 'nirvana-country',
    name: 'Nirvana Country',
    shortName: 'Nirvana Country',
    metaTitle: 'Cake Delivery in Nirvana Country, Gurugram — 24 Hours',
    metaDescription:
      'Cake delivery in Nirvana Country, Gurugram from Mithaava bakery, Sector 46. Birthday, anniversary & cheesecakes delivered fresh to your door, 24/7.',
    heading: 'Cake delivery in Nirvana Country, Gurugram',
    intro:
      'Birthdays at home, anniversaries in the garden, a quiet dessert after dinner — Mithaava delivers freshly baked cakes to every block of Nirvana Country.',
    body: [
      'Nirvana Country is a short, easy drive from our Sector 46 bakery, so your cake reaches your gate fresh and properly chilled. Just share your block and house number and we will handle the rest.',
      'Family favourites here include our classic Black Forest, the Blueberry Cheesecake and rich chocolate truffle cakes for the kids.',
    ],
    neighbourhoods: ['Nirvana Country (Sector 50)', 'South City II', 'Rosewood City', 'Mayfield Garden'],
    pincodes: ['122018'],
    popularProductSlugs: ['philippines-blueberry-cheese', 'black-forest', 'dark-chocolate-truffle', 'red-velvet'],
    faqs: sharedFaqs('Nirvana Country'),
  },
  {
    slug: 'sector-45',
    name: 'Sector 45',
    shortName: 'Sector 45',
    metaTitle: 'Cake Delivery in Sector 45, Gurugram — Next Door Bakery',
    metaDescription:
      'Your neighbourhood bakery for Sector 45, Gurugram. Mithaava bakes fresh cakes next door in Sector 46 and delivers 24 hours a day. Order on WhatsApp.',
    heading: 'Your neighbourhood bakery for Sector 45, Gurugram',
    intro:
      'Sector 45 is practically next door to our kitchen in Sector 46. That makes Mithaava one of the quickest ways to get a fresh, made-with-care cake to your doorstep.',
    body: [
      'Because we are so close, Sector 45 is ideal for last-minute celebrations — a surprise cake for a friend, a small cake for a puja, or dessert for unexpected guests.',
      'Try our Mithaava Specials: the Ferrero Rocher cake, the Red Velvet and the Blueberry Cheesecake.',
    ],
    neighbourhoods: ['Sector 45', 'Kanhai', 'Sector 46 border'],
    pincodes: ['122003'],
    popularProductSlugs: ['ferrero-rocher', 'red-velvet', 'philippines-blueberry-cheese', 'butter-scotch'],
    faqs: sharedFaqs('Sector 45'),
  },
  {
    slug: 'sector-47',
    name: 'Sector 47',
    shortName: 'Sector 47',
    metaTitle: 'Cake Delivery in Sector 47, Gurugram — Open 24 Hours',
    metaDescription:
      'Cake delivery in Sector 47, Gurugram from Mithaava, Sector 46. Birthday & celebration cakes, open 24/7 with midnight delivery. Order on WhatsApp.',
    heading: 'Birthday & celebration cakes delivered in Sector 47',
    intro:
      'From Malibu Towne to the lanes around Subhash Chowk, Sector 47 is a few minutes from our bakery — perfect for fresh cakes delivered right when you need them.',
    body: [
      'Sector 47 families order everything from simple pineapple cakes to layered Ferrero Rocher cakes. Whatever you pick, it is baked and finished in Sector 46 and sent out fresh.',
      'Hosting a party? Mix a 1 kg celebration cake with a couple of cheese cakes so there is something for everyone.',
    ],
    neighbourhoods: ['Sector 47', 'Malibu Towne', 'Subhash Chowk'],
    pincodes: ['122018'],
    popularProductSlugs: ['ferrero-rocher', 'pineapple', 'kit-kat', 'strawberry-cheese'],
    faqs: sharedFaqs('Sector 47'),
  },
  {
    slug: 'sector-50',
    name: 'Sector 50',
    shortName: 'Sector 50',
    metaTitle: 'Cake Delivery in Sector 50, Gurugram — Fresh & 24/7',
    metaDescription:
      'Cake delivery in Sector 50, Gurugram from Mithaava. Fresh cream cakes, cheesecakes & premium celebration cakes from Sector 46, delivered 24/7.',
    heading: 'Fresh cakes delivered in Sector 50, Gurugram',
    intro:
      'Sector 50 is well inside our delivery radius, so whether it is a birthday at home or a celebration at the office, a fresh Mithaava cake is only a WhatsApp message away.',
    body: [
      'Our Sector 50 customers love the Red Velvet with cream cheese frosting, the Tiramisu and our rich chocolate range. Every cake is freshly finished before it leaves the kitchen.',
      'Need it at midnight? We are open 24 hours — order ahead and we will time the delivery for the moment you cut the cake.',
    ],
    neighbourhoods: ['Sector 50', 'Nirvana Country', 'Mayfield Garden', 'Uppal Southend'],
    pincodes: ['122018'],
    popularProductSlugs: ['red-velvet', 'tiramishu', 'choco-hazelnut', 'mango-cheese'],
    faqs: sharedFaqs('Sector 50'),
  },
  {
    slug: 'golf-course-extension',
    name: 'Golf Course Extension Road',
    shortName: 'Golf Course Extension',
    metaTitle: 'Cake Delivery on Golf Course Extension Road, Gurugram',
    metaDescription:
      'Cake delivery on Golf Course Extension Road, Gurugram by Mithaava. Ferrero Rocher, Red Velvet & cheesecakes with custom messages — open 24/7.',
    heading: 'Premium cake delivery on Golf Course Extension Road',
    intro:
      'Golf Course Extension Road is home to some of Gurugram’s most vibrant societies — and some of our most loved celebration cakes. Mithaava delivers here 24 hours a day.',
    body: [
      'Golf Course Extension is within our 10 km delivery radius from Sector 46. We pack every cake carefully for the drive so premium finishes like Ferrero Rocher and Belgian truffle arrive picture-perfect.',
      'Share your tower, flat number and any gate instructions when you order on WhatsApp, and we will coordinate the handover with you.',
    ],
    neighbourhoods: ['Sector 58', 'Sector 59', 'Sector 62', 'Sector 65'],
    pincodes: ['122011', '122102'],
    popularProductSlugs: ['ferrero-rocher', 'belgium-truffle', 'opera', 'rainbow-cheese'],
    faqs: sharedFaqs('Golf Course Extension Road'),
  },
];

export function getAllLocalities(): Locality[] {
  return localities;
}

export function getLocalityBySlug(slug: string): Locality | undefined {
  return localities.find((l) => l.slug === slug);
}
