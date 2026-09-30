import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.brand} — ${siteConfig.taglines.primary}`,
    short_name: siteConfig.brand,
    description: siteConfig.seo.homeDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF4E8',
    theme_color: '#0E6B75',
    icons: [
      { src: '/icons/mithaava-icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/mithaava-icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
