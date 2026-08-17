import type { Gender, MysteryOption, Size } from "@/types";

/**
 * Mystery Combo options — customers pick size only; exact pieces stay hidden.
 */
const sharedMystery: Omit<MysteryOption, "gender" | "id">[] = [
  {
    slug: "starter",
    name: "Starter Combo",
    price: 69,
    pieceCount: 2,
    description: "Two pieces. One vibe. You pick the size — we pick the rest.",
    tagline: "Pick your size. We'll handle the rest.",
  },
  {
    slug: "full",
    name: "Full Combo",
    price: 109,
    pieceCount: 3,
    description:
      "Three pieces that land as a fit. You won't know until it lands.",
    tagline: "You won't know until it lands.",
  },
  {
    slug: "season",
    name: "Season Combo",
    price: 149,
    pieceCount: 4,
    description: "Four pieces. Maximum range. Still one coherent drop.",
    tagline: "More pieces. Same mystery.",
  },
];

export const mysteryOptions: MysteryOption[] = [
  ...sharedMystery.map((o) => ({
    ...o,
    id: `m-men-${o.slug}`,
    gender: "men" as const,
  })),
  ...sharedMystery.map((o) => ({
    ...o,
    id: `m-women-${o.slug}`,
    gender: "women" as const,
  })),
];

export const mysterySizesByGender: Record<Gender, Size[]> = {
  men: ["S", "M", "L", "XL", "2XL"],
  women: ["XS", "S", "M", "L", "XL", "2XL"],
};

export const mysterySizes: Size[] = ["S", "M", "L", "XL", "2XL"];

export function getMysteryOptionsByGender(gender: Gender): MysteryOption[] {
  return mysteryOptions.filter((o) => o.gender === gender);
}

export function getMysteryOptionById(id: string): MysteryOption | undefined {
  return mysteryOptions.find((o) => o.id === id);
}

export function getMysteryOptionBySlug(
  slug: string,
  gender?: Gender
): MysteryOption | undefined {
  if (gender) {
    return mysteryOptions.find((o) => o.slug === slug && o.gender === gender);
  }
  return mysteryOptions.find((o) => o.slug === slug);
}

export function generateMysteryReference(gender?: Gender): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  const prefix = gender === "women" ? "OTW" : gender === "men" ? "OTM" : "OT";
  return `${prefix}-${n}`;
}
