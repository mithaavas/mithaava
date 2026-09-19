# Mithaava

Fresh cakes from Sector 46, Gurugram. Customers browse the menu, then confirm a delivery pincode at checkout and send the order on WhatsApp. Open 24 hours. No payments or accounts in V1.

## Run locally

```bash
pnpm install
pnpm dev
```

Other scripts:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build   # static export → out/
```

## Stack

Next.js (App Router, `output: 'export'`), TypeScript, Tailwind CSS, Framer Motion, Zustand, React Hook Form + Zod, Vitest.

## Architecture notes

- UI talks to data only through `services/productRepository`, `deliveryService`, and `orderChannel`.
- Cart stores `{ productId, size, quantity }` only — prices are derived at read time.
- Delivery pincode is confirmed on the **checkout** page (menu and cart stay open). Menu HTML is still statically generated and crawlable.

### Soft-gate / SEO

Menu and cart are open to everyone. Delivery pincode is confirmed on the **checkout** page before the WhatsApp order is sent.

## Owner to-do

Fill these before launch (search the repo for `TODO(owner)`):

- [ ] Swiggy store URL (`src/config/aggregators.ts`)
- [ ] Zomato store URL (`src/config/aggregators.ts`)
- [ ] Verify serviceable pincodes within 10 km (`src/config/delivery.ts`)
- [ ] Verify store lat/lng for House No. 1918
- [ ] Confirm business hours and base lead time (`src/config/site.ts`)
- [ ] Google Maps place link
- [ ] Google Business Profile link
- [ ] FSSAI licence number
- [ ] Confirm Strawberry Cheese Cake 500 g price (650 vs 600)
- [ ] Confirm “Tiramishu” spelling vs “Tiramisu”
- [ ] Replace `https://mithaava.example` metadata base URL when the domain is ready
- [ ] Real product photography (stock Unsplash placeholders are in `public/cakes/` for V1)

WhatsApp number is set to **+91 92118 87308** (`919211887308`). Instagram: [mithaavastudio](https://www.instagram.com/mithaavastudio).

## Sitemap

Static export does not run a dynamic `app/sitemap.ts` server. A hand-maintained `public/sitemap.xml` lists core routes; regenerate product URLs when the menu changes (or automate in CI later).
