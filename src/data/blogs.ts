export type BlogSection =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  cover: { src: string; alt: string };
  tags: string[];
  relatedProductSlugs: string[];
  sections: BlogSection[];
};

/**
 * Mithaava bakery blog — static posts for SEO and customer education.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'perfect-cake-size-guide',
    title: 'How to pick the perfect cake size for your gathering',
    excerpt:
      'U & Me for two, 500 gm for a small celebration, 1 kg when the table is full — a simple size guide for Gurugram parties.',
    date: '2026-09-12',
    readMinutes: 5,
    cover: {
      src: '/blog/blog-cake-size-guide.jpg',
      alt: 'Three celebration cakes of different sizes on a cream counter',
    },
    tags: ['Ordering tips', 'Sizes'],
    relatedProductSlugs: ['ferrero-rocher', 'black-forest', 'red-velvet'],
    sections: [
      {
        type: 'p',
        text: 'The easiest way to disappoint a table is a cake that disappears in three minutes — or one that sits half-eaten. At Mithaava we offer three practical sizes so you can match the cake to the moment, not the other way around.',
      },
      { type: 'h2', text: 'U & Me — the couple cake' },
      {
        type: 'p',
        text: 'Our U & Me size is meant for two people. It is ideal for anniversaries, proposals, late-night sweet cravings, or when you want a proper celebration cake without leftovers. Think of it as a mini centrepiece.',
      },
      { type: 'h2', text: '500 gm — small gatherings' },
      {
        type: 'p',
        text: 'Half a kilo suits family tea, office desk celebrations, or a quiet birthday at home. Plan for about 4–6 modest slices. If children are involved, lean toward the larger size.',
      },
      { type: 'h2', text: '1 kg — the party standard' },
      {
        type: 'p',
        text: 'One kilogram is our most ordered size for birthday parties and house get-togethers in Sector 46. Expect roughly 8–12 slices depending on how generous you cut. For bigger guest lists, order two flavours instead of one oversized cake — more choice, happier guests.',
      },
      {
        type: 'ul',
        items: [
          '2 people → U & Me',
          '4–6 people → 500 gm',
          '8–12 people → 1 kg',
          'Larger groups → two cakes in different flavours',
        ],
      },
      {
        type: 'p',
        text: 'Still unsure? Message us on WhatsApp with your guest count and favourite flavours — we will recommend a size before you confirm the order.',
      },
    ],
  },
  {
    slug: 'red-velvet-vs-chocolate',
    title: 'Red velvet or chocolate? Choosing your celebration cake',
    excerpt:
      'Soft crimson layers versus deep cocoa — how to decide which classic belongs on your table.',
    date: '2026-09-08',
    readMinutes: 4,
    cover: {
      src: '/blog/blog-red-velvet-vs-chocolate.jpg',
      alt: 'Red velvet and chocolate cake slices side by side',
    },
    tags: ['Flavours', 'Signature'],
    relatedProductSlugs: ['red-velvet', 'chocolate', 'dark-chocolate-truffle'],
    sections: [
      {
        type: 'p',
        text: 'When someone says “just get a nice cake,” these two names usually appear first. Both feel festive. Both photograph beautifully. The difference is in the bite.',
      },
      { type: 'h2', text: 'Choose red velvet when…' },
      {
        type: 'ul',
        items: [
          'You want a soft, slightly tangy crumb with cream cheese frosting',
          'The occasion leans romantic — anniversaries, proposals, Valentine brunches',
          'Guests prefer something lighter than dense chocolate',
        ],
      },
      { type: 'h2', text: 'Choose chocolate when…' },
      {
        type: 'ul',
        items: [
          'The birthday person is a confirmed chocolate lover',
          'You want a richer, more indulgent centrepiece',
          'Kids are the main audience (chocolate rarely loses)',
        ],
      },
      {
        type: 'p',
        text: 'At Mithaava, Red Velvet is a signature cake with a longer lead time because we bake it to order. Classic Chocolate and Dark Chocolate Truffle are perfect when you want deep cocoa without waiting as long. For mixed crowds, order one of each in 500 gm — the safest dual win.',
      },
    ],
  },
  {
    slug: 'same-day-cake-gurugram',
    title: 'Same-day cakes in Gurugram: what you should know',
    excerpt:
      'We deliver within 10 km of Sector 46. Lead times still matter — especially for cheese and signature cakes.',
    date: '2026-09-05',
    readMinutes: 5,
    cover: {
      src: '/blog/blog-same-day-delivery.jpg',
      alt: 'Cake delivery through a Gurugram neighbourhood at golden hour',
    },
    tags: ['Delivery', 'Gurugram'],
    relatedProductSlugs: ['black-forest', 'belgium-pineapple', 'fresh-fruit'],
    sections: [
      {
        type: 'p',
        text: 'Gurugram plans change fast — surprise visits, last-minute office parties, a sudden “can you get a cake by evening?” text. Mithaava delivers within about 10 km of Sector 46, but fresh baking still needs a little runway.',
      },
      { type: 'h2', text: 'How delivery works' },
      {
        type: 'p',
        text: 'Browse the menu anytime, add cakes to your cart, then confirm your pincode at checkout. If we deliver to your area, you pick a date and time slot and send the order on WhatsApp. We confirm details, including delivery charges, in chat.',
      },
      { type: 'h2', text: 'Lead times to remember' },
      {
        type: 'ul',
        items: [
          'Many chocolate and fruit cakes: from our base lead time (about 2 hours)',
          'Cheese cakes: usually need extra hours',
          'Signature cakes like Red Velvet: plan further ahead',
        ],
      },
      {
        type: 'p',
        text: 'Outside our radius? You can still enjoy Mithaava through Swiggy or Zomato where listed. For the fullest menu and custom messages on cake, ordering directly with us works best.',
      },
    ],
  },
  {
    slug: 'birthday-cakes-sector-46',
    title: 'Birthday cake ideas beloved in Sector 46',
    excerpt:
      'From Black Forest classics to Kit Kat fun — flavours that keep showing up at neighbourhood parties.',
    date: '2026-08-28',
    readMinutes: 6,
    cover: {
      src: '/blog/blog-birthday-cakes.jpg',
      alt: 'Birthday cake with candles on a festive cream table',
    },
    tags: ['Birthdays', 'Best sellers'],
    relatedProductSlugs: ['black-forest', 'kit-kat', 'choco-oreo'],
    sections: [
      {
        type: 'p',
        text: 'Sector 46 birthdays have a rhythm: friends drop by, kids circle the table, someone asks for “a little extra chocolate.” These are the cakes that consistently earn applause.',
      },
      { type: 'h2', text: 'Crowd favourites' },
      {
        type: 'ul',
        items: [
          'Black Forest — cherries, cream, nostalgia; safe for almost every age group',
          'Kit Kat & Choco Oreo — playful textures kids (and adults) recognise',
          'Belgium Pineapple — bright and refreshing when the weather is warm',
          'Ferrero Rocher — when the birthday person wants something premium',
        ],
      },
      { type: 'h2', text: 'Make it feel personal' },
      {
        type: 'p',
        text: 'Add a short message on the cake at checkout (keep it under 40 characters). Pair the cake with a simple table: cream cloth, marigold or berry accents, and candles. You do not need a theme kit for the cake to feel special.',
      },
      {
        type: 'p',
        text: 'Ordering the night before is ideal. We are open 24 hours for messages, but baking and delivery slots still follow each cake’s lead time.',
      },
    ],
  },
  {
    slug: 'cheese-cake-flavours-guide',
    title: 'A gentle guide to our cheese cakes',
    excerpt:
      'Blueberry, mango, strawberry, rainbow — when to pick each silky slice.',
    date: '2026-08-20',
    readMinutes: 5,
    cover: {
      src: '/blog/blog-cheese-cakes.jpg',
      alt: 'Blueberry, mango and strawberry cheese cakes on a cream board',
    },
    tags: ['Cheese cakes', 'Flavours'],
    relatedProductSlugs: [
      'philippines-blueberry-cheese',
      'mango-cheese',
      'strawberry-cheese',
    ],
    sections: [
      {
        type: 'p',
        text: 'Cheese cakes at Mithaava are baked with care and usually need a little extra lead time. The reward is a cool, creamy finish that feels lighter than heavy chocolate sponges.',
      },
      { type: 'h2', text: 'Pick your fruit mood' },
      {
        type: 'ul',
        items: [
          'Philippines Blueberry — bright berry top, elegant for dinners and office treats',
          'Mango Cheese — summer favourite; sunny and fragrant',
          'Strawberry Cheese — classic pink appeal for birthdays',
          'Rainbow Cheese — when you want colour and conversation at the table',
        ],
      },
      {
        type: 'p',
        text: 'Serve chilled. Keep the cake away from direct afternoon sun during outdoor parties. If you are travelling across Gurugram traffic, choose an earlier delivery slot so it stays firm.',
      },
      {
        type: 'p',
        text: 'Cheese cakes are perfect when half the guests “don’t want anything too sweet” — until they ask for a second slice.',
      },
    ],
  },
  {
    slug: 'ferrero-rocher-celebration-cake',
    title: 'Ferrero Rocher cake: when the moment deserves luxury',
    excerpt:
      'Hazelnut, cashew, truffle and wafers — the Mithaava special that turns an ordinary evening into a memory.',
    date: '2026-08-14',
    readMinutes: 4,
    cover: {
      src: '/blog/blog-ferrero-rocher.jpg',
      alt: 'Chocolate hazelnut Ferrero-style cake on a marble stand',
    },
    tags: ['Specials', 'Chocolate'],
    relatedProductSlugs: ['ferrero-rocher', 'belgium-truffle', 'opera'],
    sections: [
      {
        type: 'p',
        text: 'Some cakes are for the room. This one is for the person you are celebrating. Our Ferrero Rocher cake layers hazelnut, cashew, truffle and wafers into a rich, textured bite — one of our three Mithaava Specials on the homepage.',
      },
      { type: 'h2', text: 'Best occasions' },
      {
        type: 'ul',
        items: [
          'Anniversaries and proposals',
          'Promotions and “we did it” dinners',
          'Hosting someone who already has everything — except this cake',
        ],
      },
      {
        type: 'p',
        text: 'It is available in U & Me, 500 gm and 1 kg. For a quiet dinner for two, U & Me feels extravagant without waste. For a larger table, 1 kg becomes the centrepiece — no other dessert required.',
      },
      {
        type: 'p',
        text: 'Pair it with coffee or a simple sparkling drink. Keep decorations minimal; the ganache and hazelnuts already do the talking.',
      },
    ],
  },
  {
    slug: 'cake-message-ideas',
    title: 'Cake message ideas that actually fit',
    excerpt:
      'Short, warm lines for birthdays, anniversaries and thank-yous — within our 40-character cake message limit.',
    date: '2026-08-07',
    readMinutes: 4,
    cover: {
      src: '/blog/blog-cake-messages.jpg',
      alt: 'White frosted cake with a berry-pink piped message',
    },
    tags: ['Ordering tips', 'Occasions'],
    relatedProductSlugs: ['strawberry', 'white-forest', 'butter-scotch'],
    sections: [
      {
        type: 'p',
        text: 'A message on cake is tiny real estate. At checkout we keep it to 40 characters so the piping stays neat and readable. Here are lines that land well.',
      },
      { type: 'h2', text: 'Birthdays' },
      {
        type: 'ul',
        items: [
          'Happy Birthday, [Name]!',
          'Make a wish',
          'Another year of sweetness',
        ],
      },
      { type: 'h2', text: 'Love & anniversaries' },
      {
        type: 'ul',
        items: [
          'Har khushi mein meetha',
          'Always us',
          'Happy Anniversary',
        ],
      },
      { type: 'h2', text: 'Thanks & office' },
      {
        type: 'ul',
        items: ['Thank you, team', 'You did it!', 'Welcome aboard'],
      },
      {
        type: 'p',
        text: 'Avoid long quotes and multiple hashtags — they crowd the top. If you need a longer note, put it in the extra notes field; we will see it on WhatsApp even if it is not piped on the cake.',
      },
    ],
  },
  {
    slug: 'fresh-cream-cakes-explained',
    title: 'Fresh cream cakes: soft, cool, celebration-ready',
    excerpt:
      'Why fresh cream cakes feel lighter, how to store them, and which Mithaava flavours lean this way.',
    date: '2026-07-30',
    readMinutes: 5,
    cover: {
      src: '/blog/blog-fresh-cream.jpg',
      alt: 'Fresh cream cake topped with strawberries',
    },
    tags: ['Flavours', 'Care tips'],
    relatedProductSlugs: ['truffle-fresh-cream', 'white-forest', 'pineapple'],
    sections: [
      {
        type: 'p',
        text: 'Buttercream is dense and sweet. Fresh cream is airy and cool. If your guests prefer a cake that does not feel heavy after dinner, fresh cream is usually the answer.',
      },
      { type: 'h2', text: 'How to keep it perfect' },
      {
        type: 'ul',
        items: [
          'Refrigerate until about 20–30 minutes before serving',
          'Avoid leaving the cake in a hot car or sunny balcony',
          'Use a clean knife wiped between slices for neat layers',
        ],
      },
      {
        type: 'p',
        text: 'White Forest, Pineapple, and Truffle Fresh Cream are popular fresh-cream leaning choices on our menu. Fruit-forward cakes also shine with cream rather than thick chocolate frosting.',
      },
      {
        type: 'p',
        text: 'Ordering tip: for afternoon outdoor parties in Gurugram heat, schedule delivery closer to serving time and keep a fridge spot ready.',
      },
    ],
  },
  {
    slug: 'open-24-hours-fresh-cakes',
    title: 'Open 24 hours: sweet plans on your schedule',
    excerpt:
      'Message us anytime. Baking and delivery still respect each cake’s lead time — here is how to plan overnight orders.',
    date: '2026-07-22',
    readMinutes: 3,
    cover: {
      src: '/blog/blog-open-24-hours.jpg',
      alt: 'Warmly lit bakery window at night with cakes on display',
    },
    tags: ['Mithaava', 'Ordering tips'],
    relatedProductSlugs: ['chocolate', 'fresh-fruit', 'choco-fudge'],
    sections: [
      {
        type: 'p',
        text: 'Inspiration does not only strike at noon. Midnight cravings, early-morning travel cakes, late party planning — Mithaava stays open 24 hours so you can browse and message us whenever you are ready.',
      },
      {
        type: 'p',
        text: 'Open 24 hours means conversation and order intake around the clock. Fresh cakes still need baking time. If you order at 1 a.m. for an 8 a.m. slot, check the lead-time chip on the product card first.',
      },
      { type: 'h2', text: 'A simple overnight plan' },
      {
        type: 'ul',
        items: [
          'Pick your cake and size on the menu',
          'Send the WhatsApp order with your preferred slot',
          'We confirm baking feasibility and delivery',
          'Wake up to a plan already in motion',
        ],
      },
      {
        type: 'p',
        text: 'Find us at House No. 540 LGF, Sector 46, Gurugram — or let us come to you within our delivery radius.',
      },
    ],
  },
  {
    slug: 'order-cakes-whatsapp-guide',
    title: 'How to order cakes on WhatsApp with Mithaava',
    excerpt:
      'A clear walkthrough: menu → cart → pincode → details → send. No app download, no checkout confusion.',
    date: '2026-07-15',
    readMinutes: 4,
    cover: {
      src: '/blog/blog-whatsapp-order.jpg',
      alt: 'Phone beside a boxed celebration cake ready to order',
    },
    tags: ['Ordering tips', 'WhatsApp'],
    relatedProductSlugs: ['ferrero-rocher', 'red-velvet', 'black-forest'],
    sections: [
      {
        type: 'p',
        text: 'We built ordering around WhatsApp because that is how Gurugram already talks. You shop on the website; you confirm with a human on chat.',
      },
      { type: 'h2', text: 'Step by step' },
      {
        type: 'ul',
        items: [
          'Browse /menu and add sizes to your cart',
          'Open checkout and confirm your 6-digit pincode',
          'Fill name, mobile, address, date and time slot',
          'Optional: cake message and notes',
          'Tap Send order on WhatsApp — review the prefilled message and hit send',
        ],
      },
      {
        type: 'p',
        text: 'We reply to confirm availability, delivery charges and payment. Nothing is final until that chat confirmation — so you can ask questions freely.',
      },
      {
        type: 'p',
        text: 'Not ordering a full cake? Use Contact Us with your name, address and message — same WhatsApp number, lighter template for custom questions and catering.',
      },
    ],
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedBlogPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogBySlug(slug);
  if (!current) return getAllBlogPosts().slice(0, limit);
  const tagSet = new Set(current.tags);
  return getAllBlogPosts()
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const score = (p: BlogPost) =>
        p.tags.filter((t) => tagSet.has(t)).length;
      return score(b) - score(a);
    })
    .slice(0, limit);
}
