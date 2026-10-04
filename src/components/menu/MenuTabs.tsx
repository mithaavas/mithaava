'use client';

import { Gift, PartyPopper } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { whatsappConfig } from '@/config/whatsapp';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { copy } from '@/content/copy';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

export type MenuTabId = 'cake' | 'decoration' | 'gifts';

const tabs: { id: MenuTabId; label: string; comingSoon?: boolean }[] = [
  { id: 'cake', label: copy.menu.tabs.cake },
  { id: 'decoration', label: copy.menu.tabs.decoration, comingSoon: true },
  { id: 'gifts', label: copy.menu.tabs.gifts, comingSoon: true },
];

export function MenuTabs({
  value,
  onChange,
}: {
  value: MenuTabId;
  onChange: (tab: MenuTabId) => void;
}) {
  return (
    <div role="tablist" aria-label={copy.menu.heading} className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const selected = value === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`menu-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`menu-panel-${tab.id}`}
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex h-11 items-center gap-2 rounded-full border px-5 font-display text-lg transition-colors',
              selected
                ? 'border-teal-700 bg-teal-700 text-white'
                : 'border-icing-300/70 bg-cream-50 text-teal-900 hover:bg-icing-200/60',
            )}
          >
            {tab.label}
            {tab.comingSoon ? (
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 font-sans text-[10px] font-semibold tracking-wide uppercase',
                  selected ? 'bg-white/20 text-white' : 'bg-berry-600/10 text-berry-600',
                )}
              >
                {copy.menu.tabs.comingSoon}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export function ComingSoonPanel({ tab }: { tab: Exclude<MenuTabId, 'cake'> }) {
  const label = tab === 'decoration' ? copy.menu.tabs.decoration : copy.menu.tabs.gifts;
  const Icon = tab === 'decoration' ? PartyPopper : Gift;
  const whatsappUrl = buildWhatsAppUrl(
    whatsappConfig.number,
    `Hi ${siteConfig.brand}! I'd like to know about ${label.toLowerCase()} along with my cake.`,
  );
  return (
    <section
      role="tabpanel"
      id={`menu-panel-${tab}`}
      aria-labelledby={`menu-tab-${tab}`}
      className="wash-signature mt-6 flex flex-col items-center rounded-[var(--radius-xl)] px-6 py-14 text-center"
    >
      <Icon className="h-10 w-10 text-teal-700" aria-hidden />
      <h2 className="mt-4 font-display text-3xl text-teal-900">
        {copy.menu.comingSoonTitle(label)}
      </h2>
      <p className="mt-3 max-w-md text-cocoa-800/80">{copy.menu.comingSoonBody}</p>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6">
        <Button size="lg" variant="whatsapp" className="gap-2">
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp
        </Button>
      </a>
    </section>
  );
}
