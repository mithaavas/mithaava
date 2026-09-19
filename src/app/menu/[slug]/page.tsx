import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { productRepository } from '@/services/productRepository';
import { ProductDetail } from '@/components/product/ProductDetail';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileCartBar } from '@/components/layout/MobileCartBar';
import { ProductDetailGate } from '@/components/product/ProductDetailGate';

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
  return {
    title: product.name,
    description: product.note ?? `${product.name} from Mithaava`,
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

  return (
    <>
      <Header variant="shop" />
      <ProductDetailGate>
        <ProductDetail product={product} related={related} />
      </ProductDetailGate>
      <MobileCartBar />
      <Footer />
    </>
  );
}
