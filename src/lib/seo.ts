import { siteConfig } from '@/config/site';
import { deliveryConfig } from '@/config/delivery';
import { getAllLocalities, type Locality } from '@/data/localities';
import { getMapLinkUrl } from '@/lib/maps';
import { whatsappConfig } from '@/config/whatsapp';
import { isSoldByPiece, lowestAvailablePrice } from '@/domain/pricing';
import type { Product, SizeKey } from '@/domain/types';
import type { BlogPost } from '@/data/blogs';
import { productBlurbs } from '@/data/productSeo';

export function absoluteUrl(path = '/'): string {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}

export function localityPath(slug: string): string {
  return `/cake-delivery/${slug}/`;
}

export function categoryPath(slug: string): string {
  return `/cakes/${slug}/`;
}

/** Stable entity ids shared by every schema that references the bakery / site. */
export const bakeryId = `${siteConfig.url}/#bakery`;
export const websiteId = `${siteConfig.url}/#website`;
export const personId = `${siteConfig.url}/#cofounder`;

export function siteGraphJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [bakeryEntity(), websiteEntity(), personEntity()],
  };
}

function websiteEntity() {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    url: siteConfig.url,
    name: siteConfig.brand,
    inLanguage: 'en-IN',
    publisher: { '@id': bakeryId },
    potentialAction: {
      '@type': 'ReadAction',
      target: absoluteUrl('/menu/'),
      name: 'Browse the cake menu',
    },
  };
}

function personEntity() {
  const { cofounder } = siteConfig.team;
  return {
    '@type': 'Person',
    '@id': personId,
    name: cofounder.name,
    jobTitle: cofounder.role,
    image: absoluteUrl(cofounder.image),
    worksFor: { '@id': bakeryId },
    url: absoluteUrl('/about/'),
  };
}

function bakeryEntity() {
  return {
    '@type': 'Bakery',
    '@id': bakeryId,
    name: siteConfig.brand,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    image: absoluteUrl(siteConfig.heroImage),
    telephone: siteConfig.contact.telephone,
    priceRange: '₹₹',
    servesCuisine: ['Bakery', 'Cakes', 'Desserts', 'Eggless cakes'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.locality}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: deliveryConfig.storeLocation.lat,
      longitude: deliveryConfig.storeLocation.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    sameAs: [
      siteConfig.socials.instagram,
      `https://wa.me/${whatsappConfig.number}`,
      siteConfig.socials.googleBusinessProfile,
    ].filter(Boolean),
    description: siteConfig.seo.homeDescription,
    slogan: siteConfig.taglines.primary,
    hasMap: getMapLinkUrl(),
    founder: { '@id': personId },
    areaServed: [
      { '@type': 'AdministrativeArea', name: deliveryConfig.serviceArea },
      ...deliveryConfig.serviceablePrefixes.map((entry) => ({
        '@type': 'Place',
        name: entry.area,
      })),
      { '@type': 'Place', name: `${siteConfig.address.locality}, ${siteConfig.address.city}` },
      ...getAllLocalities().map((l) => ({
        '@type': 'Place',
        name: `${l.name}, ${l.city ?? siteConfig.address.city}`,
        url: absoluteUrl(localityPath(l.slug)),
      })),
    ],
    ...(siteConfig.fssai ? { identifier: `FSSAI ${siteConfig.fssai}` } : {}),
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function contactPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${siteConfig.brand}`,
    url: absoluteUrl('/contact/'),
    mainEntity: { '@id': bakeryId },
  };
}

export function aboutPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${siteConfig.brand}`,
    url: absoluteUrl('/about/'),
    mainEntity: { '@id': bakeryId },
    about: [{ '@id': bakeryId }, { '@id': personId }],
  };
}

export function collectionPageJsonLd(
  name: string,
  url: string,
  items: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    url: absoluteUrl(url),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        url: absoluteUrl(item.url),
      })),
    },
  };
}

export function howToJsonLd(opts: {
  name: string;
  description: string;
  steps: string[];
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.url),
    step: opts.steps.map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: `Step ${i + 1}`,
      text,
    })),
  };
}

/** Full product title: "Ferrero Rocher Cake (₹700) | Order Online in Gurugram - Mithaava". */
export function productSeoTitle(product: Product): string {
  const from = lowestAvailablePrice(product);
  const price = from != null ? ` (₹${from})` : '';
  return `${product.name}${price} | Order Online in ${siteConfig.address.city} - ${siteConfig.brand}`;
}

export const META_DESCRIPTION_MAX = 155;

/** First candidate that fits the snippet limit (falls back to the shortest). */
function fitDescription(candidates: string[]): string {
  return (
    candidates.find((c) => c.length <= META_DESCRIPTION_MAX) ??
    candidates.reduce((a, b) => (a.length <= b.length ? a : b))
  );
}

export function productSeoDescription(product: Product): string {
  const from = lowestAvailablePrice(product);
  const price = from != null ? ` from ₹${from}` : '';
  const blurb = productBlurbs[product.slug];
  const lead = blurb
    ? `${product.name}${price} — ${blurb}.`
    : `${product.name}${price}.`;
  return fitDescription([
    `${lead} Baked fresh at Mithaava, Sector 46 Gurugram & delivered 24/7 across Delhi NCR.`,
    `${lead} Fresh from Mithaava, Sector 46 Gurugram. 24/7 Delhi NCR delivery.`,
    `${lead} Fresh from Mithaava, Sector 46 Gurugram. 24/7 delivery.`,
  ]);
}

function priceValidUntil(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

export function productJsonLd(product: Product) {
  const validThrough = priceValidUntil();
  const offerList = (Object.keys(product.prices) as SizeKey[])
    .map((size) => ({ size, price: product.prices[size] }))
    .filter((o): o is { size: SizeKey; price: number } => o.price != null && o.price > 0)
    .map((o) => ({
      '@type': 'Offer' as const,
      name: `${product.name} — ${siteConfig.sizeLabels[o.size].label}`,
      price: o.price,
      priceCurrency: 'INR',
      priceValidUntil: validThrough,
      availability: 'https://schema.org/InStock',
      url: absoluteUrl(`/menu/${product.slug}/`),
      seller: { '@id': bakeryId },
    }));

  const prices = offerList.map((o) => o.price);
  const offers =
    offerList.length > 1
      ? {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          lowPrice: Math.min(...prices),
          highPrice: Math.max(...prices),
          offerCount: offerList.length,
          priceValidUntil: validThrough,
          availability: 'https://schema.org/InStock',
          offers: offerList,
        }
      : offerList[0] ?? undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: productSeoDescription(product),
    ...(product.image ? { image: absoluteUrl(product.image.src) } : {}),
    brand: { '@type': 'Brand', name: siteConfig.brand },
    category: isSoldByPiece(product) ? 'Bakery' : 'Cakes',
    url: absoluteUrl(`/menu/${product.slug}/`),
    ...(offers ? { offers } : {}),
  };
}

export function itemListJsonLd(name: string, products: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`/menu/${p.slug}/`),
      name: p.name,
    })),
  };
}

export function articleJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    image: absoluteUrl(post.cover.src),
    datePublished: post.date,
    dateModified: post.date,
    ...(post.keywords ? { keywords: post.keywords.join(', ') } : {}),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}/`),
    author: [
      { '@type': 'Person', '@id': personId, name: siteConfig.team.cofounder.name },
      { '@type': 'Organization', name: siteConfig.brand, url: siteConfig.url },
    ],
    publisher: {
      '@id': bakeryId,
      '@type': 'Organization',
      name: siteConfig.brand,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(siteConfig.logo),
      },
    },
  };
}

export function localityJsonLd(locality: Locality) {
  const url = absoluteUrl(localityPath(locality.slug));
  const city = locality.city ?? siteConfig.address.city;
  const region = locality.region ?? siteConfig.address.region;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Cake delivery in ${locality.name}, ${city}`,
      serviceType: 'Cake delivery',
      url,
      provider: { '@id': bakeryId },
      areaServed: {
        '@type': 'Place',
        name: `${locality.name}, ${city}, ${region}`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Cake delivery',
          item: absoluteUrl('/cake-delivery/'),
        },
        { '@type': 'ListItem', position: 3, name: locality.name, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: locality.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];
}

/** Homepage FAQs — visible + FAQPage JSON-LD for AI/search extractability. */
export const homeFaqs = [
  {
    q: 'Where is Mithaava bakery located?',
    a: 'Mithaava is at House No. 540 LGF, Sector 46, Gurugram, Haryana 122003. We bake every cake fresh in this kitchen.',
  },
  {
    q: 'Are you open 24 hours?',
    a: 'Yes. Mithaava is open 24 hours every day. You can order online or on WhatsApp any time, including midnight cake delivery.',
  },
  {
    q: 'Do you deliver cakes across Delhi NCR?',
    a: 'Yes. We deliver across Delhi NCR from Sector 46, Gurugram — including Delhi (110xxx), Gurugram (122xxx), Faridabad (121xxx), and Noida, Greater Noida and Ghaziabad (201xxx).',
  },
  {
    q: 'How do I order a cake from Mithaava?',
    a: 'Browse the menu, add cakes to your cart, enter your pincode at checkout and send the order on WhatsApp. We confirm the slot, address and cake message with you in chat.',
  },
  {
    q: 'Are Mithaava cakes eggless?',
    a: 'Yes. All Mithaava cakes are Pure Veg, eggless and alcohol-free — including chocolate cakes, cheesecakes, pastries, brownies, cupcakes and jar cakes.',
  },
] as const;

export const deliveryHubFaqs = [
  {
    q: 'Which areas in Delhi NCR do you deliver to?',
    a: 'We deliver to Delhi (pincodes starting 110), Gurugram (122), Faridabad (121), and Noida, Greater Noida and Ghaziabad (201). Enter your pincode at checkout to confirm.',
  },
  {
    q: 'How long does cake delivery take from Sector 46?',
    a: 'Nearby Gurugram areas like Sector 45, 46, 47 and 50 are the quickest. Delhi, Noida, Faridabad and Ghaziabad need a little more travel time — order earlier so we can plan the drive.',
  },
  {
    q: 'Do you deliver at midnight across Delhi NCR?',
    a: 'Yes. We are open 24 hours and can time delivery for midnight celebrations across Delhi NCR. Order a few hours ahead, especially for cheesecakes.',
  },
  {
    q: 'How do I place a delivery order?',
    a: 'Pick your cake on the menu, check your pincode, choose a delivery slot and send the order on WhatsApp. We confirm everything with you before baking finishes.',
  },
] as const;
