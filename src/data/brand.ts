/**
 * Central brand config — replace these with your real details.
 */
export const brand = {
  name: "OFFKIND THEORY",
  registeredName: "OFFKIND THEORY®",
  shortName: "OFFKIND",
  tagline: "THE FIT > THE PRICE TAG.",
  heroLine1: "GOOD FITS.",
  heroLine2: "WITHOUT THE",
  heroLine3: "CRAZY PRICE.",
  description:
    "Streetwear catalog + curated combos. Browse the pieces, then hit us on Instagram or WhatsApp to grab yours.",
  currency: "EUR" as const,
  currencySymbol: "€",
  logo: "/logo.png",
  contact: {
    // Replace with your real Instagram handle (without @)
    instagram: "offkindtheory",
    instagramUrl: "https://www.instagram.com/offkindtheory",
    // Replace with your real WhatsApp number (digits only for wa.me)
    whatsapp: "306900000000",
    whatsappUrl: "https://wa.me/306900000000",
    // Replace with your WhatsApp Community invite link
    whatsappCommunityUrl: "https://chat.whatsapp.com/REPLACE_WITH_YOUR_INVITE",
    // Optional phone
    phone: "+306900000000",
    phoneDisplay: "+30 690 000 0000",
    email: "hello@offkindtheory.com",
    location: "Europe",
  },
  announcement: "CATALOG LIVE — DM OR WHATSAPP TO GRAB. NO PRICES ON PIECES.",
  shippingNote:
    "Pieces: ask for price on IG / WhatsApp. Combo prices shown. Confirm → pay.",
} as const;

export const navLinks = [
  { href: "/shop", label: "Catalog" },
  { href: "/bundles", label: "Combos" },
  { href: "/mystery", label: "Mystery" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
] as const;

export const footerLinks = {
  shop: [
    { href: "/shop", label: "Catalog" },
    { href: "/bundles", label: "Combo Packs" },
    { href: "/mystery", label: "Mystery Combo" },
  ],
  info: [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;

export const categoryLabels: Record<string, string> = {
  hoodies: "Hoodies",
  tees: "Tees",
  knitwear: "Knitwear",
  shorts: "Shorts",
  pants: "Pants",
  jackets: "Jackets",
  accessories: "Accessories",
  shoes: "Shoes",
  all: "All",
};
