import { deliveryConfig } from '@/config/delivery';
import { siteConfig } from '@/config/site';

// Address text searches resolve to other businesses until Mithaava has its own Google listing.
const { lat, lng } = deliveryConfig.storeLocation;
const coordinates = `${lat},${lng}`;

export function getMapEmbedUrl(): string {
  return (
    siteConfig.socials.googleMapsEmbed ||
    `https://www.google.com/maps?q=${coordinates}&z=17&output=embed`
  );
}

export function getMapLinkUrl(): string {
  return (
    siteConfig.socials.googleMaps ||
    `https://www.google.com/maps/search/?api=1&query=${coordinates}`
  );
}
