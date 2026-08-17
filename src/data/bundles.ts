import type { Bundle, Gender } from "@/types";

/**
 * Pre-made bundle options — update prices and copy as needed.
 */
const sharedBundles: Omit<Bundle, "gender" | "id">[] = [
  {
    slug: "starter-fit",
    name: "Starter Fit",
    price: 79,
    pieceCount: 2,
    description:
      "Two solid pieces that work together. Tee + bottom or hoodie + tee. We curate the match.",
    image: "/products/bundle-starter-box.png",
    includes: ["1 top", "1 bottom or second top", "Curated color story"],
    featured: true,
  },
  {
    slug: "full-combo",
    name: "Full Combo",
    price: 119,
    pieceCount: 3,
    description:
      "Three pieces. One complete fit. Tops, bottoms, and a layer — matched for silhouette.",
    image: "/products/bundle-full-box.png",
    includes: ["3 coordinated pieces", "Top + bottom + layer", "Ready to wear"],
    featured: true,
  },
  {
    slug: "season-pack",
    name: "Season Pack",
    price: 165,
    pieceCount: 4,
    description:
      "Four pieces for the season. More range, still coherent. Built for mixing.",
    image: "/products/bundle-season-box.png",
    includes: ["4 pieces", "Mix of categories", "Seasonal color palette"],
    featured: true,
  },
  {
    slug: "outerwear-focus",
    name: "Outerwear Focus",
    price: 145,
    pieceCount: 2,
    description:
      "Jacket or puffer plus a supporting piece. For when the shell makes the fit.",
    image: "/products/bundle-outerwear-box.png",
    includes: ["1 outerwear piece", "1 supporting piece", "Layer-ready"],
  },
];

const womenBundleLooks: Record<string, string> = {
  "starter-fit": "/products/essentials-tee-taupe-w.png",
  "full-combo": "/products/essentials-hoodie-grey-front-w.png",
  "season-pack": "/products/polo-white-crew-w.png",
  "outerwear-focus": "/products/polo-white-zip-w.png",
};

export const bundles: Bundle[] = [
  ...sharedBundles.map((b, i) => ({
    ...b,
    id: `b-m-${String(i + 1).padStart(2, "0")}`,
    gender: "men" as const,
  })),
  ...sharedBundles.map((b, i) => ({
    ...b,
    id: `b-w-${String(i + 1).padStart(2, "0")}`,
    gender: "women" as const,
    lookImage: womenBundleLooks[b.slug],
  })),
];

export function getBundlesByGender(gender: Gender): Bundle[] {
  return bundles.filter((b) => b.gender === gender);
}

export function getBundleBySlug(
  slug: string,
  gender?: Gender
): Bundle | undefined {
  if (gender) {
    return bundles.find((b) => b.slug === slug && b.gender === gender);
  }
  return bundles.find((b) => b.slug === slug);
}

export function getBundleById(id: string): Bundle | undefined {
  return bundles.find((b) => b.id === id);
}
