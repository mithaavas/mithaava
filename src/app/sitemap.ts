import type { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/data/blogs';
import { getAllCategoryPages } from '@/data/categoryPages';
import { getAllLocalities } from '@/data/localities';
import { absoluteUrl, categoryPath, localityPath } from '@/lib/seo';
import { productRepository } from '@/services/productRepository';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/menu/'), changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/cake-delivery/'), changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/about/'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/contact/'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/blog/'), changeFrequency: 'weekly', priority: 0.6 },
  ];

  const categoryPages: MetadataRoute.Sitemap = getAllCategoryPages().map((c) => ({
    url: absoluteUrl(categoryPath(c.slug)),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const localityPages: MetadataRoute.Sitemap = getAllLocalities().map((l) => ({
    url: absoluteUrl(localityPath(l.slug)),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = productRepository
    .getAllSync()
    .map((p) => ({
      url: absoluteUrl(`/menu/${p.slug}/`),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  const blogPages: MetadataRoute.Sitemap = getAllBlogPosts().map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}/`),
    lastModified: p.date,
    changeFrequency: 'yearly',
    priority: p.keywords ? 0.7 : 0.5,
  }));

  return [...staticPages, ...categoryPages, ...localityPages, ...productPages, ...blogPages];
}
