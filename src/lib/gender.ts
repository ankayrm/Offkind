import type { Gender } from "@/types";

export type { Gender };

export const GENDERS = ["men", "women"] as const;

export const genderLabels: Record<Gender, string> = {
  men: "Men",
  women: "Women",
};

export function isGender(value: string | undefined): value is Gender {
  return value === "men" || value === "women";
}

export function parseGender(value: string | undefined): Gender | null {
  return isGender(value) ? value : null;
}

export function genderFromPath(pathname: string): Gender | null {
  const segment = pathname.split("/").filter(Boolean)[0];
  return parseGender(segment);
}

export function genderHref(gender: Gender, path = ""): string {
  const suffix = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `/${gender}${suffix}`;
}

/** Keep catalog / combos / mystery when switching Men ↔ Women. */
export function switchGenderHref(pathname: string, to: Gender): string {
  const from = genderFromPath(pathname);
  if (!from) return genderHref(to);
  const rest = pathname.slice(`/${from}`.length);
  return genderHref(to, rest);
}

export function genderNav(gender: Gender) {
  return [
    { href: genderHref(gender, "/shop"), label: "Catalog" },
    { href: genderHref(gender, "/bundles"), label: "Combos" },
    { href: genderHref(gender, "/mystery"), label: "Mystery" },
  ] as const;
}
