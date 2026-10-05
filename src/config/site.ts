export const siteConfig = {
  brand: 'Mithaava',
  /** Canonical origin — no trailing slash. Update when a custom domain goes live. */
  url: 'https://mithaava.com',
  /** Primary image for search / social cards */
  heroImage: '/images/hero-cake.jpg',
  logo: '/logo.png',
  seo: {
    homeTitle: 'Mithaava | Artisanal Bakery & Cake Delivery Sector 46 Gurugram',
    homeDescription:
      'Order fresh artisanal cakes, cheesecakes & gourmet desserts from Mithaava. 24/7 delivery across Delhi NCR from Sector 46, Gurugram. Order now.',
    heroHeading: 'Fresh Artisanal Cakes & Gourmet Bakes in Gurugram',
    homeKeywords: [
      'bakery in Sector 46 Gurugram',
      '24/7 cake delivery Gurgaon',
      'fresh artisanal cakes',
      'midnight cake delivery Gurugram',
      'best chocolate truffle cake Gurgaon',
      'blueberry cheesecake Gurugram',
      'Ferrero Rocher cake delivery',
    ],
  },
  taglines: {
    primary: 'Har Khushi Mein Meetha',
    secondary: 'Sweetness in Every Bite',
  },
  address: {
    line1: 'House No. 540 LGF',
    line2: 'Sector 46, Gurugram, Haryana',
    full: 'House No. 540 LGF, Sector 46, Gurugram, Haryana',
    locality: 'Sector 46',
    city: 'Gurugram',
    region: 'Haryana',
    postalCode: '122003',
  },
  contact: {
    /** Display form for the UI */
    whatsappDisplay: '+91 92118 87308',
    /** E.164 form for schema.org / tel: links */
    telephone: '+919211887308',
  },
  team: {
    cofounder: {
      name: 'Rahul Kumar Jangra',
      role: 'Co-Founder',
      image: '/brand/cofounder.jpg',
      imageAlt: 'Rahul Kumar Jangra, Co-Founder of Mithaava',
    },
  },
  socials: {
    instagram: 'https://www.instagram.com/mithaavastudio',
    facebook: 'https://www.facebook.com/mithaavastudio',
    /** TODO(owner): replace with the verified Google Business Profile place link */
    googleMaps: '',
    /**
     * TODO(owner): paste the `src` from Google Maps → Share → Embed a map for the
     * verified GMB pin. Falls back to a brand + address search embed when empty.
     */
    googleMapsEmbed: '',
    /** TODO(owner): replace with Google Business Profile link */
    googleBusinessProfile: '',
  },
  /** FSSAI registration / licence number */
  fssai: '20826002001189',
  fssaiApproved: true,
  /** Open 24 hours — delivery still respects cake lead times. */
  businessHours: {
    open: '00:00',
    close: '23:59',
    label: 'Open 24 hours',
    days: 'Every day' as const,
    is24Hours: true,
  },
  /** Base lead time before delivery (hours). TODO(owner): confirm. */
  baseLeadTimeHours: 2,
  /** Preferred size when a product offers it; otherwise first available. */
  defaultSize: 'halfKg' as const,
  /**
   * Exactly three Mithaava Specials for the landing hero (shown one by one).
   */
  heroFeaturedSlugs: [
    'ferrero-rocher',
    'red-velvet',
    'philippines-blueberry-cheese',
  ] as const,
  /** Optional longer blurbs for hero specials (falls back to product.note). */
  heroSpecialBlurbs: {
    'ferrero-rocher':
      'Layers of hazelnut, cashew, chocolate truffle and crunchy wafers — a luxurious bite for your special moments.',
    'red-velvet':
      'Soft crimson layers with cream cheese frosting — our signature celebration cake.',
    'philippines-blueberry-cheese':
      'Silky blueberry cheese cake with a bright berry finish — light, rich, unforgettable.',
  } as const,
  sizeLabels: {
    halfKg: { label: '500 gm' },
    oneKg: { label: '1 kg' },
    uAndMe: {
      label: 'Bento (200g)',
      note: 'Bento cake — our 200 g cake, just right for 2 people.',
    },
    piece: { label: 'Each' },
  },
} as const;

export type SiteConfig = typeof siteConfig;
