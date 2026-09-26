export const siteConfig = {
  brand: 'Mithaava',
  taglines: {
    primary: 'Har Khushi Mein Meetha',
    secondary: 'Sweetness in Every Bite',
  },
  address: {
    line1: 'House No. 540 LGF',
    line2: 'Sector 46, Gurugram, Haryana',
    full: 'House No. 540 LGF, Sector 46, Gurugram, Haryana',
  },
  contact: {
    /** Display form for the UI */
    whatsappDisplay: '+91 92118 87308',
  },
  socials: {
    instagram: 'https://www.instagram.com/mithaavastudio',
    /** TODO(owner): replace with Google Maps place link */
    googleMaps: '',
    /** TODO(owner): replace with Google Business Profile link */
    googleBusinessProfile: '',
  },
  /** TODO(owner): replace with FSSAI licence number */
  fssai: '',
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
      'Hazelnut + cashew + truffle + wafers filling. A luxurious bite for your special moments.',
    'red-velvet':
      'Soft crimson layers with cream cheese frosting — our signature celebration cake.',
    'philippines-blueberry-cheese':
      'Silky blueberry cheese cake with a bright berry finish — light, rich, unforgettable.',
  } as const,
  sizeLabels: {
    halfKg: { label: '500 gm' },
    oneKg: { label: '1 kg' },
    uAndMe: {
      label: 'U & Me',
      note: 'Couple-size cake — a small cake meant for 2 people.',
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
