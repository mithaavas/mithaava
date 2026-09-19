import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { copy } from '@/content/copy';

export default function NotFound() {
  return (
    <main className="hero-mesh flex min-h-[100dvh] flex-col items-center justify-center px-4 text-center">
      <Logo href="/" size="lg" />
      <h1 className="mt-8 font-display text-3xl text-teal-900">
        {copy.notFound.title}
      </h1>
      <p className="mt-3 max-w-md text-cocoa-800/80">{copy.notFound.body}</p>
      <Link
        href="/menu/"
        className="btn-primary mt-8 inline-flex h-12 items-center rounded-full px-6 font-medium"
      >
        {copy.notFound.action}
      </Link>
    </main>
  );
}
