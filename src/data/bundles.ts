import type { Bundle } from "@/types";

/**
 * Pre-made bundle options — update prices and copy as needed.
 */
export const bundles: Bundle[] = [
  {
    id: "b-01",
    slug: "starter-fit",
    name: "Starter Fit",
    price: 79,
    pieceCount: 2,
    description:
      "Two solid pieces that work together. Tee + bottom or hoodie + tee. We curate the match.",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=900&q=80",
    includes: ["1 top", "1 bottom or second top", "Curated color story"],
    featured: true,
  },
  {
    id: "b-02",
    slug: "full-combo",
    name: "Full Combo",
    price: 119,
    pieceCount: 3,
    description:
      "Three pieces. One complete fit. Tops, bottoms, and a layer — matched for silhouette.",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b241548ffc?w=900&q=80",
    includes: ["3 coordinated pieces", "Top + bottom + layer", "Ready to wear"],
    featured: true,
  },
  {
    id: "b-03",
    slug: "season-pack",
    name: "Season Pack",
    price: 165,
    pieceCount: 4,
    description:
      "Four pieces for the season. More range, still coherent. Built for mixing.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80",
    includes: [
      "4 pieces",
      "Mix of categories",
      "Seasonal color palette",
    ],
    featured: true,
  },
  {
    id: "b-04",
    slug: "outerwear-focus",
    name: "Outerwear Focus",
    price: 145,
    pieceCount: 2,
    description:
      "Jacket or puffer plus a supporting piece. For when the shell makes the fit.",
    image:
      "https://images.unsplash.com/photo-1467043153537-a4fba1f34770?w=900&q=80",
    includes: ["1 outerwear piece", "1 supporting piece", "Layer-ready"],
  },
];

export function getBundleBySlug(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug);
}

export function getBundleById(id: string): Bundle | undefined {
  return bundles.find((b) => b.id === id);
}
