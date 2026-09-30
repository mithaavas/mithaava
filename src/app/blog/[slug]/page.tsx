import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogArticle } from '@/components/blog/BlogArticle';
import { getAllBlogPosts, getBlogBySlug } from '@/data/blogs';
import { productRepository } from '@/services/productRepository';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: 'Blog' };
  const title = post.metaTitle ?? post.title;
  const description = post.metaDescription ?? post.excerpt;
  const path = `/blog/${post.slug}/`;
  return {
    title,
    description,
    ...(post.keywords ? { keywords: post.keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title,
      description,
      url: path,
      publishedTime: post.date,
      images: [{ url: post.cover.src, alt: post.cover.alt }],
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
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog/' },
            { name: post.title, path: `/blog/${post.slug}/` },
          ]),
        ]}
      />
      <Header variant="shop" />
      <main>
        <BlogArticle post={post} relatedProducts={relatedProducts} />
      </main>
      <Footer />
    </>
  );
}
