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
    "Streetwear catalog + curated combos. Browse the pieces, then hit us on Instagram, WhatsApp, or Viber to grab yours.",
  currency: "EUR" as const,
  currencySymbol: "€",
  logo: "/brand/wordmark.png",
  lockup: "/brand/lockup.jpg",
  contact: {
    // Replace with your real Instagram handle (without @)
    instagram: "offkindtheory",
    instagramUrl: "https://www.instagram.com/offkindtheory",
    // Greek mobile 6994919536 — wa.me needs country code
    whatsapp: "306994919536",
    whatsappUrl: "https://wa.me/306994919536",
    // Same number as WhatsApp — viber:// opens a chat in the Viber app
    viber: "306994919536",
    viberUrl: "viber://chat?number=%2B306994919536",
    // Replace with your real WhatsApp Community invite link
    whatsappCommunityUrl: "https://chat.whatsapp.com/REPLACE_WITH_YOUR_INVITE",
    phone: "+306994919536",
    phoneDisplay: "+30 699 491 9536",
    email: "hello@offkindtheory.com",
    location: "Europe",
  },
  announcement: "CATALOG LIVE. DM, WHATSAPP, OR VIBER TO GRAB. NO PRICES ON PIECES.",
  shippingNote:
    "Pieces: ask for price on IG / WhatsApp / Viber. Mystery Combo Fit prices shown. Location + delivery method required to send.",
} as const;

export const navLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
] as const;

export const footerLinks = {
  men: [
    { href: "/men/shop", label: "Catalog" },
    { href: "/men/bundles", label: "Mystery Combo Fit" },
    { href: "/men/custom", label: "Custom Order" },
  ],
  women: [
    { href: "/women/shop", label: "Catalog" },
    { href: "/women/bundles", label: "Mystery Combo Fit" },
    { href: "/women/custom", label: "Custom Order" },
  ],
  info: [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/custom", label: "Custom Order" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
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
