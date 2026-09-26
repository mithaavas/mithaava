import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/data/blogs';
import { getRelatedBlogPosts } from '@/data/blogs';
import { BlogCard } from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/format';
import { copy } from '@/content/copy';
import { cn } from '@/lib/cn';

export function BlogArticle({
  post,
  relatedProducts,
}: {
  post: BlogPost;
  relatedProducts: { slug: string; name: string; image?: string }[];
}) {
  const related = getRelatedBlogPosts(post.slug, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium tracking-wide text-gold-500 uppercase">
        {formatDate(post.date)} · {post.readMinutes} min read
      </p>
      <h1 className="mt-3 font-display text-3xl leading-tight text-teal-900 sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg text-cocoa-800/75">{post.excerpt}</p>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[var(--radius-xl)] border border-icing-300/50">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width:768px) 100vw, 768px"
        />
      </div>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-cocoa-800/90">
        {post.sections.map((section, i) => {
          if (section.type === 'h2') {
            return (
              <h2
                key={i}
                className="font-display text-2xl text-teal-900 pt-2"
              >
                {section.text}
              </h2>
            );
          }
          if (section.type === 'ul') {
            return (
              <ul key={i} className="list-disc space-y-2 pl-5 marker:text-berry-600">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          }
          return <p key={i}>{section.text}</p>;
        })}
      </div>

      {relatedProducts.length > 0 ? (
        <section className="mt-12 rounded-[var(--radius-xl)] border border-icing-300/60 bg-cream-100/80 p-5 sm:p-6">
          <h2 className="font-display text-xl text-teal-900">
            {copy.blog.tasteThese}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {relatedProducts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/menu/${p.slug}/`}
                  className={cn(
                    'flex items-center gap-3 rounded-[var(--radius-lg)] border border-icing-300/50 bg-cream-50 p-2 pr-3 transition-colors hover:border-teal-700/40',
                  )}
                >
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-cream-100">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : null}
                  </span>
                  <span className="text-sm font-medium text-teal-900">
                    {p.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <Link href="/menu/">
              <Button size="sm">{copy.blog.browseMenu}</Button>
            </Link>
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="font-display text-2xl text-teal-900">
            {copy.blog.moreStories}
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
