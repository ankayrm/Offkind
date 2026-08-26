import type { Product } from "@/types";

const SIMPLE_COLORS = [
  "white",
  "black",
  "grey",
  "beige",
  "navy",
  "taupe",
  "cream",
  "olive",
  "red",
  "sky",
  "pink",
  "green",
  "brown",
  "charcoal",
  "blue",
  "purple",
  "tan",
  "lime",
  "sage",
  "yellow",
  "orange",
  "slate",
  "teal",
  "peach",
  "khaki",
  "lavender",
  "mint",
  "magenta",
  "mustard",
  "maroon",
  "turquoise",
] as const;

/** Print + garment pairs used as a single slug suffix. */
const COMPOUND_COLORS = [
  "black-purple",
  "black-yellow",
  "white-blue",
  "white-orange",
  "white-green",
  "white-black",
  "white-pink",
] as const;

export const GARMENT_COLORS = [...SIMPLE_COLORS, ...COMPOUND_COLORS] as const;

export type SimpleColor = (typeof SIMPLE_COLORS)[number];
export type GarmentColor = (typeof GARMENT_COLORS)[number];

const COLOR_SET = new Set<string>(GARMENT_COLORS);
const SIMPLE_SET = new Set<string>(SIMPLE_COLORS);

export const COLOR_LABEL: Record<GarmentColor, string> = {
  white: "White",
  black: "Black",
  grey: "Grey",
  beige: "Beige",
  navy: "Navy",
  taupe: "Taupe",
  cream: "Cream",
  olive: "Olive",
  red: "Red",
  sky: "Sky",
  pink: "Pink",
  green: "Green",
  brown: "Brown",
  charcoal: "Charcoal",
  blue: "Blue",
  purple: "Purple",
  tan: "Tan",
  lime: "Lime",
  sage: "Sage",
  yellow: "Yellow",
  orange: "Orange",
  slate: "Slate",
  teal: "Teal",
  peach: "Peach",
  khaki: "Khaki",
  lavender: "Lavender",
  mint: "Mint",
  magenta: "Magenta",
  mustard: "Mustard",
  maroon: "Maroon",
  turquoise: "Turquoise",
  "black-purple": "Black Purple",
  "black-yellow": "Black Yellow",
  "white-blue": "White Blue",
  "white-orange": "White Orange",
  "white-green": "White Green",
  "white-black": "White Black",
  "white-pink": "White Pink",
};

export const COLOR_SWATCH: Record<SimpleColor, string> = {
  white: "#f7f5f0",
  black: "#121212",
  grey: "#8a8a86",
  beige: "#d8c4a4",
  navy: "#1b2a4a",
  taupe: "#b5a48a",
  cream: "#efe6d4",
  olive: "#5b6b3c",
  red: "#c23030",
  sky: "#8ec4dc",
  pink: "#e8a4b8",
  green: "#2f6b48",
  brown: "#6b4e3a",
  charcoal: "#3a3a3a",
  blue: "#2c5aa0",
  purple: "#6b4c9a",
  tan: "#c4a574",
  lime: "#c6de3a",
  sage: "#8fa37a",
  yellow: "#e4c84a",
  orange: "#e07a2f",
  slate: "#6b7380",
  teal: "#2a7a74",
  peach: "#f0c4a8",
  khaki: "#b8a66a",
  lavender: "#b8a4d4",
  mint: "#8fd4b8",
  magenta: "#c43a7a",
  mustard: "#c9a227",
  maroon: "#6b2030",
  turquoise: "#2aa3a0",
};

const LIGHT_SWATCHES = new Set<SimpleColor>([
  "white",
  "cream",
  "beige",
  "taupe",
  "sky",
  "grey",
  "lime",
  "yellow",
  "peach",
  "tan",
  "khaki",
  "lavender",
  "mint",
  "sage",
]);

export function colorParts(color: GarmentColor): SimpleColor[] {
  if (color.includes("-")) {
    return color.split("-").filter((part): part is SimpleColor => SIMPLE_SET.has(part));
  }
  return SIMPLE_SET.has(color) ? [color as SimpleColor] : [];
}

export function swatchBackground(color: GarmentColor): string {
  const parts = colorParts(color);
  if (parts.length >= 2) {
    return `linear-gradient(135deg, ${COLOR_SWATCH[parts[0]]} 49%, ${COLOR_SWATCH[parts[1]]} 51%)`;
  }
  if (parts.length === 1) return COLOR_SWATCH[parts[0]];
  return "#d0d0d0";
}

export function parseProductColor(slug: string): GarmentColor | null {
  const parts = slug.split("-");
  if (parts.length >= 2) {
    const two = `${parts[parts.length - 2]}-${parts[parts.length - 1]}`;
    if (COLOR_SET.has(two)) return two as GarmentColor;
  }
  const last = parts[parts.length - 1];
  if (last && COLOR_SET.has(last)) return last as GarmentColor;
  return null;
}

export function productStyleKey(product: Product): string {
  const color = parseProductColor(product.slug);
  if (!color) return product.slug;
  return product.slug.slice(0, -(color.length + 1));
}

export function productDisplayName(product: Product): string {
  const color = parseProductColor(product.slug);
  if (!color) return product.name;
  const stripped = product.name.replace(
    new RegExp(`\\s+${COLOR_LABEL[color]}$`, "i"),
    ""
  );
  return stripped || product.name;
}

export function swatchNeedsBorder(color: GarmentColor): boolean {
  return colorParts(color).some((part) => LIGHT_SWATCHES.has(part));
}

export function getColorVariants(
  product: Product,
  catalog: Product[]
): Product[] {
  const key = productStyleKey(product);
  return catalog.filter(
    (p) => p.gender === product.gender && productStyleKey(p) === key
  );
}

/**
 * Front image colorway for a card. Cycles by grid index so neighbors don't
 * all land on the same first catalog color (grey/white).
 */
export function pickDisplayVariant(
  variants: Product[],
  index = 0
): Product {
  if (variants.length <= 1) return variants[0]!;
  const i = ((index % variants.length) + variants.length) % variants.length;
  return variants[i]!;
}

/** First product per design+gender, keeping the incoming list order. */
export function groupProductsByStyle(list: Product[]): Product[] {
  const seen = new Set<string>();
  const grouped: Product[] = [];
  for (const product of list) {
    const key = `${product.gender}:${productStyleKey(product)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    grouped.push(product);
  }
  return grouped;
}

/** One pass: style key → all colorways (same gender). */
export function buildStyleVariantMap(
  catalog: Product[]
): Map<string, Product[]> {
  const map = new Map<string, Product[]>();
  for (const product of catalog) {
    const key = `${product.gender}:${productStyleKey(product)}`;
    const bucket = map.get(key);
    if (bucket) bucket.push(product);
    else map.set(key, [product]);
  }
  return map;
}
