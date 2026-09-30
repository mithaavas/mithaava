import { siteConfig } from '@/config/site';

const placeQuery = `${siteConfig.brand}, ${siteConfig.address.full}`;

export function getMapEmbedUrl(): string {
  return (
    siteConfig.socials.googleMapsEmbed ||
    `https://www.google.com/maps?q=${encodeURIComponent(placeQuery)}&z=16&output=embed`
  );
}

export function getMapLinkUrl(): string {
  return (
    siteConfig.socials.googleMaps ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeQuery)}`
  );
}
