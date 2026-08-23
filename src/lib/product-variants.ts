import type { Product } from "@/types";

export const GARMENT_COLORS = [
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
] as const;

export type GarmentColor = (typeof GARMENT_COLORS)[number];

const COLOR_SET = new Set<string>(GARMENT_COLORS);

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
};

export const COLOR_SWATCH: Record<GarmentColor, string> = {
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
};

const LIGHT_SWATCHES = new Set<GarmentColor>([
  "white",
  "cream",
  "beige",
  "taupe",
  "sky",
  "grey",
]);

export function parseProductColor(slug: string): GarmentColor | null {
  const last = slug.split("-").pop();
  if (!last || !COLOR_SET.has(last)) return null;
  return last as GarmentColor;
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
  return LIGHT_SWATCHES.has(color);
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
