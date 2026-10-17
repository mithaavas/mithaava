/**
 * Delivery-area landing pages for neighbourhoods near our Sector 46 bakery.
 * TODO(owner): confirm neighbourhood names and pincodes against real orders.
 */

export type LocalityFaq = { q: string; a: string };

export type Locality = {
  slug: string;
  name: string;
  /** Short label used in chips and link lists */
  shortName: string;
  /** Defaults to Gurugram when omitted */
  city?: string;
  region?: string;
  /** City hubs show first in delivery lists */
  tier?: 'city' | 'neighbourhood';
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
    slug: 'sector-46',
    name: 'Sector 46',
    shortName: 'Sector 46',
    tier: 'neighbourhood',
    metaTitle: 'Cake Delivery in Sector 46, Gurugram — Bakery Open 24/7',
    metaDescription:
      'Cake delivery in Sector 46, Gurugram from Mithaava bakery at House No. 540 LGF. Fresh eggless cakes, midnight delivery & WhatsApp ordering, open 24/7.',
    heading: 'Your neighbourhood bakery in Sector 46, Gurugram',
    intro:
      'Sector 46 is home. Every Mithaava cake is baked at House No. 540 LGF and delivered to societies and homes around the sector — often within the shortest window on our map.',
    body: [
      'Because the bakery is here, Sector 46 is ideal for same-day and midnight surprises. Fresh cream cakes, cheesecakes and celebration cakes leave the kitchen finished and chilled.',
      'Popular orders include Ferrero Rocher, Black Forest, Red Velvet and our Blueberry Cheesecake. Add a message at checkout and we pipe it before delivery.',
    ],
    neighbourhoods: ['Sector 46', 'Huda Market area', 'Sector 45 border', 'Jharsa road'],
    pincodes: ['122003'],
    popularProductSlugs: ['ferrero-rocher', 'black-forest', 'red-velvet', 'philippines-blueberry-cheese'],
    faqs: sharedFaqs('Sector 46'),
  },
  {
    slug: 'delhi',
    name: 'Delhi',
    shortName: 'Delhi',
    city: 'Delhi',
    region: 'Delhi',
    tier: 'city',
    metaTitle: 'Cake Delivery in Delhi — Eggless Cakes from Mithaava',
    metaDescription:
      'Cake delivery in Delhi from Mithaava, Sector 46 Gurugram. Fresh eggless cakes, cheesecakes & midnight surprises across Delhi NCR. Order on WhatsApp 24/7.',
    heading: 'Fresh cake delivery across Delhi',
    intro:
      'Order a freshly baked Mithaava cake from our Sector 46 kitchen for delivery across Delhi. Pure veg, eggless cakes for birthdays, offices and midnight celebrations.',
    body: [
      'We deliver to Delhi pincodes starting with 110. Order a little earlier than a Gurugram neighbour so we can plan the drive and keep cream cakes chilled.',
      'Ferrero Rocher, Dark Chocolate Truffle, Red Velvet and Blueberry Cheesecake are the cakes Delhi customers order most for birthdays and office treats.',
    ],
    neighbourhoods: ['South Delhi', 'Dwarka', 'Rohini', 'East Delhi', 'Central Delhi'],
    pincodes: ['110001', '110016', '110017', '110075'],
    popularProductSlugs: ['ferrero-rocher', 'dark-chocolate-truffle', 'red-velvet', 'philippines-blueberry-cheese'],
    faqs: sharedFaqs('Delhi'),
  },
  {
    slug: 'noida',
    name: 'Noida',
    shortName: 'Noida',
    city: 'Noida',
    region: 'Uttar Pradesh',
    tier: 'city',
    metaTitle: 'Cake Delivery in Noida — Fresh Eggless Cakes 24/7',
    metaDescription:
      'Cake delivery in Noida & Greater Noida from Mithaava, Sector 46 Gurugram. Eggless birthday cakes, cheesecakes & corporate boxes — order on WhatsApp 24/7.',
    heading: 'Cake delivery in Noida and Greater Noida',
    intro:
      'From Sector 18 offices to Greater Noida homes, Mithaava delivers freshly finished eggless cakes across Noida. Open 24 hours for same-day and midnight orders.',
    body: [
      'Noida and Greater Noida use pincodes starting with 201. Tell us your sector, tower and gate instructions on WhatsApp and we will time the drop-off.',
      'Corporate teams often order pastry boxes, brownie boxes and logo cakes alongside a celebration cake for office birthdays.',
    ],
    neighbourhoods: ['Sector 18', 'Sector 62', 'Sector 137', 'Greater Noida', 'Noida Extension'],
    pincodes: ['201301', '201304', '201310'],
    popularProductSlugs: ['ferrero-rocher', 'kit-kat', 'corporate-logo', 'pastry-box-6'],
    faqs: sharedFaqs('Noida'),
  },
  {
    slug: 'faridabad',
    name: 'Faridabad',
    shortName: 'Faridabad',
    city: 'Faridabad',
    region: 'Haryana',
    tier: 'city',
    metaTitle: 'Cake Delivery in Faridabad — Mithaava Bakery 24/7',
    metaDescription:
      'Cake delivery in Faridabad from Mithaava, Sector 46 Gurugram. Fresh eggless cakes, cheesecakes & celebration cakes delivered 24/7. Order on WhatsApp.',
    heading: 'Fresh cake delivery in Faridabad',
    intro:
      'Celebrate with a cake baked fresh in Sector 46 and delivered to Faridabad. Mithaava is open 24 hours for birthday, anniversary and family orders.',
    body: [
      'Faridabad pincodes start with 121. Order ahead so we can plan the route and keep your cake chilled on the drive from Gurugram.',
      'Black Forest, Butterscotch, Fresh Fruit and chocolate truffle cakes are popular family picks for Faridabad celebrations.',
    ],
    neighbourhoods: ['Sector 15', 'Sector 21', 'NIT Faridabad', 'Greater Faridabad'],
    pincodes: ['121001', '121002', '121003'],
    popularProductSlugs: ['black-forest', 'butter-scotch', 'fresh-fruit', 'dark-chocolate-truffle'],
    faqs: sharedFaqs('Faridabad'),
  },
  {
    slug: 'ghaziabad',
    name: 'Ghaziabad',
    shortName: 'Ghaziabad',
    city: 'Ghaziabad',
    region: 'Uttar Pradesh',
    tier: 'city',
    metaTitle: 'Cake Delivery in Ghaziabad — Eggless Cakes from Mithaava',
    metaDescription:
      'Cake delivery in Ghaziabad from Mithaava, Sector 46 Gurugram. Eggless birthday cakes, cheesecakes & midnight delivery across Delhi NCR. WhatsApp 24/7.',
    heading: 'Cake delivery in Ghaziabad',
    intro:
      'Mithaava delivers freshly baked eggless cakes to Ghaziabad from our Sector 46 kitchen — birthdays, anniversaries and office celebrations, day or night.',
    body: [
      'Ghaziabad shares the 201 pincode prefix with Noida. Share your locality and landmark on WhatsApp so the delivery reaches the right gate.',
      'Chocolate Oreo, Pineapple, Red Velvet and Blueberry Cheesecake are frequent Ghaziabad orders for kids’ parties and family gatherings.',
    ],
    neighbourhoods: ['Indirapuram', 'Vaishali', 'Kaushambi', 'Raj Nagar Extension'],
    pincodes: ['201010', '201014', '201001'],
    popularProductSlugs: ['choco-oreo', 'pineapple', 'red-velvet', 'philippines-blueberry-cheese'],
    faqs: sharedFaqs('Ghaziabad'),
  },
  {
    slug: 'sohna-road',
    name: 'Sohna Road',
    shortName: 'Sohna Road',
    tier: 'neighbourhood',
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
    tier: 'neighbourhood',
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
    tier: 'neighbourhood',
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
    tier: 'neighbourhood',
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
    tier: 'neighbourhood',
    metaTitle: 'Cake Delivery in Sector 50, Gurugram — Fresh & 24/7',
    metaDescription:
      'Cake delivery in Sector 50, Gurugram from Mithaava. Fresh cream cakes, cheesecakes & premium celebration cakes from Sector 46, delivered 24/7.',
    heading: 'Fresh cakes delivered in Sector 50, Gurugram',
    intro:
      'Sector 50 is just next door to our bakery, so whether it is a birthday at home or a celebration at the office, a fresh Mithaava cake is only a WhatsApp message away.',
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
    tier: 'neighbourhood',
    metaTitle: 'Cake Delivery on Golf Course Extension Road, Gurugram',
    metaDescription:
      'Cake delivery on Golf Course Extension Road, Gurugram by Mithaava. Ferrero Rocher, Red Velvet & cheesecakes with custom messages — open 24/7.',
    heading: 'Premium cake delivery on Golf Course Extension Road',
    intro:
      'Golf Course Extension Road is home to some of Gurugram’s most vibrant societies — and some of our most loved celebration cakes. Mithaava delivers here 24 hours a day.',
    body: [
      'Golf Course Extension is a short drive from our Sector 46 bakery. We pack every cake carefully for the drive so premium finishes like Ferrero Rocher and Belgian truffle arrive picture-perfect.',
      'Share your tower, flat number and any gate instructions when you order on WhatsApp, and we will coordinate the handover with you.',
    ],
    neighbourhoods: ['Sector 58', 'Sector 59', 'Sector 62', 'Sector 65'],
    pincodes: ['122011', '122102'],
    popularProductSlugs: ['ferrero-rocher', 'belgium-truffle', 'opera', 'rainbow-cheese'],
    faqs: sharedFaqs('Golf Course Extension Road'),
  },
];

export function getAllLocalities(): Locality[] {
  return [...localities].sort((a, b) => {
    const rank = (l: Locality) => (l.tier === 'city' ? 0 : 1);
    return rank(a) - rank(b);
  });
}

export function getLocalityBySlug(slug: string): Locality | undefined {
  return localities.find((l) => l.slug === slug);
}
