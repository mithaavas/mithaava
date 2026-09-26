import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { ChocolateWave } from '@/components/brand/WaveDividers';
import { InstagramCta } from '@/components/brand/InstagramCta';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import { AggregatorButtons } from '@/components/aggregators/AggregatorButtons';
import { siteConfig } from '@/config/site';
import { copy } from '@/content/copy';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="visit" className="relative mt-auto">
      <div className="bg-cream-50 text-cocoa-800">
        <ChocolateWave />
      </div>

      <div className="bg-cocoa-800 text-cream-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-4 pb-12 sm:px-6 md:grid-cols-3">
          <div>
            <Logo href="/" size="md" />
            <p className="mt-3 text-sm text-cream-50/80">
              {siteConfig.taglines.primary}
            </p>
            <p className="text-sm text-gold-500">
              {siteConfig.taglines.secondary}
            </p>
            <InstagramCta variant="footer" />
          </div>

          <div className="text-sm">
            <p className="font-display text-lg text-icing-200">Visit us</p>
            <p className="mt-2 leading-relaxed">{siteConfig.address.full}</p>
            <p className="mt-3 font-medium text-cream-50">
              {siteConfig.businessHours.label}
            </p>
            <p className="text-cream-50/75">{siteConfig.businessHours.days}</p>
            <p className="mt-3 inline-flex items-center gap-2 text-cream-50/80">
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              WhatsApp {siteConfig.contact.whatsappDisplay}
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm text-cream-50/80">
              {copy.aggregators.strip}
            </p>
            <AggregatorButtons />
            <nav
              aria-label="Footer"
              className="mt-6 flex flex-wrap gap-4 text-sm"
            >
              <Link href="/menu/" className="underline-offset-2 hover:underline">
                Shop
              </Link>
              <Link href="/blog/" className="underline-offset-2 hover:underline">
                Blog
              </Link>
              <Link
                href="/contact/"
                className="underline-offset-2 hover:underline"
              >
                Contact
              </Link>
              <Link href="/cart/" className="underline-offset-2 hover:underline">
                Cart
              </Link>
              <Link
                href="/checkout/"
                className="underline-offset-2 hover:underline"
              >
                Checkout
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-cream-50/55">
          {copy.footer.copyright(year)}
          <span className="mx-2">·</span>
          Photos via Unsplash
        </div>
      </div>
    </footer>
  );
}
