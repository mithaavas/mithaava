import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/data/blogs';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/cn';

export function BlogCard({
  post,
  className,
}: {
  post: BlogPost;
  className?: string;
}) {
  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-icing-300/50 bg-cream-50/90 shadow-[var(--shadow-soft)]',
        className,
      )}
    >
      <Link
        href={`/blog/${post.slug}/`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <p className="text-xs font-medium tracking-wide text-gold-500 uppercase">
          {formatDate(post.date)} · {post.readMinutes} min read
        </p>
        <h2 className="font-display text-xl leading-snug text-teal-900">
          <Link href={`/blog/${post.slug}/`} className="hover:underline">
            {post.title}
          </Link>
        </h2>
        <p className="text-sm leading-relaxed text-cocoa-800/70">{post.excerpt}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cream-100 px-2.5 py-1 text-[11px] font-medium text-cocoa-800/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
