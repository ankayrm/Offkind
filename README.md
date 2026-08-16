# OFFKIND THEORY®

Modern streetwear / reselling brand site — Next.js, TypeScript, Tailwind CSS, GSAP.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Replace before launch

Edit these centralized files:

| File | What to change |
|------|----------------|
| `src/data/brand.ts` | Instagram, WhatsApp number, WhatsApp Community invite, phone, copy |
| `public/logo.png` | Brand logo (already set) |
| `src/data/products.ts` | Catalog pieces + images (prices optional / not shown) |
| `src/data/bundles.ts` | Combo packs **with prices** |
| `src/data/mystery.ts` | Mystery tiers **with prices** |
| `src/data/faq.ts` | FAQ copy |

### Pricing model
- **Individual pieces:** no prices on site — “DM for price”
- **Combo packs & Mystery:** prices shown
- Orders finish via **Instagram** or **WhatsApp** (no online payment)


## Features

- Full multi-page site (Shop, Bundles, Mystery Combo, Order, FAQ, etc.)
- Order bag with localStorage persistence
- Mystery Combo spin reel (no casino look, no product reveal)
- Order Summary → Copy / Instagram / Call (`tel:`)
- Search, category filters, responsive mobile-first UI
- GSAP scroll + page animations

## Scripts

- `npm run dev` — development
- `npm run build` — production build
- `npm start` — serve production build
