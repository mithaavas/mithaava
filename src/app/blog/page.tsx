import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogCard } from '@/components/blog/BlogCard';
import { getAllBlogPosts } from '@/data/blogs';
import { copy } from '@/content/copy';

export const metadata: Metadata = {
  title: copy.blog.title,
  description: copy.blog.subline,
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <Header variant="shop" />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-xs font-semibold tracking-[0.16em] text-gold-500 uppercase">
          {copy.blog.eyebrow}
        </p>
        <h1 className="mt-2 font-display text-3xl text-teal-900 sm:text-4xl">
          {copy.blog.title}
        </h1>
        <p className="mt-3 max-w-2xl text-cocoa-800/75">{copy.blog.subline}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
