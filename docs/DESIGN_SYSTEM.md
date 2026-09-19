# Mithaava Design System (V1)

One memorable idea: the **icing drip**. Reuse it for hero reveal, section dividers, cake placeholders, and loading. Everything else stays quiet.

## Colour tokens

| Token | Hex | Role |
|---|---|---|
| `teal-700` | `#0E6B75` | Primary actions, headings |
| `teal-900` | `#08434B` | Primary button depth |
| `icing-300` | `#F6C1BC` | Soft surfaces, drip |
| `icing-200` | `#FADAD6` | Softer icing wash |
| `berry-600` | `#C2255C` | Badges, promotional emphasis |
| `cocoa-800` | `#4E2420` | Body text on light, footer |
| `marigold-500` | `#E9963E` | Flower accents |
| `gold-500` | `#B99560` | Tagline, hairlines |
| `cream-50` | `#FFF9F3` | Page background |
| `cream-100` | `#FDF3E8` | Section background |

Body text on cream meets WCAG AA. Selection colour: icing-tinted teal wash.

## Gradients

- **Hero mesh:** cream base + teal radial top-left + icing radial bottom-right (low contrast).
- **Primary button:** vertical `teal-700 → teal-900` with 1px top highlight + teal glow.
- **Collection washes:** chocolate, cheese, signature, fruit, best-sellers, favourites (see CSS vars).
- **Glass:** translucent cream + backdrop blur + thin gradient border.
- **Footer:** cocoa → deeper cocoa with icing-drip top edge.

## Typography

- **Display:** Fraunces (optical size), weight 600–700, tight leading.
- **UI/Body:** Figtree, 16px min, line-height 1.6, measure &lt; 75ch.
- Sentence case everywhere.

### Type scale

| Token | Size | Line height | Use |
|---|---|---|---|
| `display` | clamp(2.25rem, 5vw, 3.5rem) | 1.1 | Hero brand / H1 |
| `h1` | 2rem | 1.2 | Page titles |
| `h2` | 1.5rem | 1.25 | Section titles |
| `h3` | 1.25rem | 1.3 | Card titles |
| `body` | 1rem | 1.6 | Body |
| `sm` | 0.875rem | 1.5 | Meta, helpers |
| `xs` | 0.75rem | 1.4 | Badges, captions |

## Spacing & radius

4px grid. Radii by role: `xl` (1.5rem) hero surfaces, `lg` (1rem) cards, `md` (0.75rem) inputs, `full` chips/buttons.

## Motion tokens (`lib/motion.ts`)

| Token | Value |
|---|---|
| `fast` | 150ms |
| `base` | 250ms |
| `slow` | 400ms |
| `ease` | `[0.22, 1, 0.36, 1]` |
| `springSoft` | `{ type: 'spring', stiffness: 380, damping: 32 }` |
| `springBounce` | `{ type: 'spring', stiffness: 520, damping: 22 }` |

Respect `prefers-reduced-motion`: fade only.

## Component inventory

**ui:** Button, Chip, Input, Sheet, Toast, Skeleton, Badge, Stepper, SegmentedControl  
**brand:** Logo, IcingDrip, CakeArt, SprinkleBurst  
**layout:** Header, Footer, MobileCartBar, AnnouncementBar, PageTransition  
**delivery:** PincodeCard, PincodeChip, ServiceableResult, NotServiceableResult  
**aggregators:** AggregatorButtons, AggregatorStrip  
**menu / product / cart / checkout:** as in architecture brief
