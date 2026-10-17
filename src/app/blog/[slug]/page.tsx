import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogArticle } from '@/components/blog/BlogArticle';
import { getAllBlogPosts, getBlogBySlug } from '@/data/blogs';
import { productRepository } from '@/services/productRepository';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleJsonLd, breadcrumbJsonLd, howToJsonLd } from '@/lib/seo';

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

  const schema: unknown[] = [
    articleJsonLd(post),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog/' },
      { name: post.title, path: `/blog/${post.slug}/` },
    ]),
  ];
  if (post.slug === 'order-cakes-whatsapp-guide') {
    schema.push(
      howToJsonLd({
        name: 'How to order a cake from Mithaava on WhatsApp',
        description:
          'Order a fresh eggless cake from Mithaava in Sector 46, Gurugram and get it delivered across Delhi NCR.',
        url: `/blog/${post.slug}/`,
        steps: [
          'Open the Mithaava menu and choose your cake and size.',
          'Add the cake to your cart and enter your delivery pincode.',
          'Pick a delivery date and time slot at checkout.',
          'Send the order on WhatsApp and confirm the address, message and slot with us.',
        ],
      }),
    );
  }

  return (
    <>
      <JsonLd data={schema} />
      <Header variant="shop" />
      <main>
        <BlogArticle post={post} relatedProducts={relatedProducts} />
      </main>
      <Footer />
    </>
  );
}
