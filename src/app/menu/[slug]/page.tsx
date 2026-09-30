import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { productRepository } from '@/services/productRepository';
import { ProductDetail } from '@/components/product/ProductDetail';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileCartBar } from '@/components/layout/MobileCartBar';
import { ProductDetailGate } from '@/components/product/ProductDetailGate';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import { getCategoryPageForCollection } from '@/data/categoryPages';
import {
  breadcrumbJsonLd,
  categoryPath,
  productJsonLd,
  productSeoDescription,
  productSeoTitle,
} from '@/lib/seo';

export async function generateStaticParams() {
  const products = await productRepository.getAll();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/menu/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const product = await productRepository.getBySlug(slug);
  if (!product) return { title: 'Cake' };
  const title = productSeoTitle(product);
  const description = productSeoDescription(product);
  const path = `/menu/${product.slug}/`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${siteConfig.brand}`,
      description,
      url: path,
      ...(product.image ? { images: [{ url: product.image.src, alt: product.image.alt }] } : {}),
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<'/menu/[slug]'>) {
  const { slug } = await params;
  const product = await productRepository.getBySlug(slug);
  if (!product) notFound();

  const related = (
    await productRepository.getByCollection(product.collections[0] ?? '')
  ).filter((p) => p.id !== product.id);

  const category = getCategoryPageForCollection(product.collections[0] ?? '');
  const crumbs = [
    { name: 'Home', path: '/' },
    category
      ? { name: category.navLabel, path: categoryPath(category.slug) }
      : { name: 'Menu', path: '/menu/' },
    { name: product.name, path: `/menu/${product.slug}/` },
  ];

  return (
    <>
      <JsonLd data={[productJsonLd(product), breadcrumbJsonLd(crumbs)]} />
      <Header variant="shop" />
      <ProductDetailGate>
        <ProductDetail product={product} related={related} />
      </ProductDetailGate>
      <MobileCartBar />
      <Footer />
    </>
  );
}
