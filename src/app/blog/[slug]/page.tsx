import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogArticle } from '@/components/blog/BlogArticle';
import { getAllBlogPosts, getBlogBySlug } from '@/data/blogs';
import { productRepository } from '@/services/productRepository';

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: 'Blog' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.cover.src }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<'/blog/[slug]'>) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const products = await productRepository.getAll();
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const relatedProducts = post.relatedProductSlugs
    .map((s) => bySlug.get(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      image: p.image?.src,
    }));

  return (
    <>
      <Header variant="shop" />
      <main>
        <BlogArticle post={post} relatedProducts={relatedProducts} />
      </main>
      <Footer />
    </>
  );
}
