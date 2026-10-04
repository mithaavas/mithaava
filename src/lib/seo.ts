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

/** Stable entity ids shared by every schema that references the bakery / site. */
export const bakeryId = `${siteConfig.url}/#bakery`;
export const websiteId = `${siteConfig.url}/#website`;

export function siteGraphJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [bakeryEntity(), websiteEntity()],
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
    servesCuisine: ['Bakery', 'Cakes', 'Desserts'],
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
    areaServed: [
      { '@type': 'Place', name: `${siteConfig.address.locality}, ${siteConfig.address.city}` },
      ...getAllLocalities().map((l) => ({
        '@type': 'Place',
        name: `${l.name}, ${siteConfig.address.city}`,
        url: absoluteUrl(localityPath(l.slug)),
      })),
    ],
    ...(siteConfig.fssai ? { identifier: `FSSAI ${siteConfig.fssai}` } : {}),
  };
}

export function categoryPath(slug: string): string {
  return `/cakes/${slug}/`;
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
    `${lead} Baked fresh at Mithaava, Sector 46 Gurugram & delivered 24/7. Order online or on WhatsApp.`,
    `${lead} Baked fresh at Mithaava, Sector 46 Gurugram & delivered 24/7.`,
    `${lead} Fresh from Mithaava, Sector 46 Gurugram. 24/7 delivery.`,
  ]);
}

export function productJsonLd(product: Product) {
  const offers = (Object.keys(product.prices) as SizeKey[])
    .map((size) => ({ size, price: product.prices[size] }))
    .filter((o): o is { size: SizeKey; price: number } => o.price != null && o.price > 0)
    .map((o) => ({
      '@type': 'Offer',
      name: `${product.name} — ${siteConfig.sizeLabels[o.size].label}`,
      price: o.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: absoluteUrl(`/menu/${product.slug}/`),
      seller: { '@id': bakeryId },
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: productSeoDescription(product),
    ...(product.image ? { image: absoluteUrl(product.image.src) } : {}),
    brand: { '@type': 'Brand', name: siteConfig.brand },
    category: isSoldByPiece(product) ? 'Bakery' : 'Cakes',
    url: absoluteUrl(`/menu/${product.slug}/`),
    offers,
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
    author: { '@type': 'Organization', name: siteConfig.brand, url: siteConfig.url },
    publisher: { '@id': bakeryId },
  };
}

export function localityJsonLd(locality: Locality) {
  const url = absoluteUrl(localityPath(locality.slug));
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Cake delivery in ${locality.name}, ${siteConfig.address.city}`,
      serviceType: 'Cake delivery',
      url,
      provider: { '@id': bakeryId },
      areaServed: {
        '@type': 'Place',
        name: `${locality.name}, ${siteConfig.address.city}, ${siteConfig.address.region}`,
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
