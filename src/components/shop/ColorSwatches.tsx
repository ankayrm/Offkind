import Link from "next/link";
import type { Product } from "@/types";
import { genderHref } from "@/lib/gender";
import { cn } from "@/lib/utils";
import {
  COLOR_LABEL,
  parseProductColor,
  swatchBackground,
  swatchNeedsBorder,
} from "@/lib/product-variants";

interface ColorSwatchesProps {
  product: Product;
  variants: Product[];
  size?: "sm" | "md";
  /** How many circles to show before collapsing the rest into +N. */
  maxVisible?: number;
  interactive?: boolean;
}

export function ColorSwatches({
  product,
  variants,
  size = "sm",
  maxVisible,
  interactive = false,
}: ColorSwatchesProps) {
  if (variants.length < 2) return null;

  const currentColor = parseProductColor(product.slug);
  const ordered = [
    product,
    ...variants.filter((item) => item.id !== product.id),
  ];
  const limit = maxVisible ?? ordered.length;
  const visible = ordered.slice(0, Math.max(1, limit));
  const extra = ordered.length - visible.length;
  const dim = size === "md" ? "h-5 w-5" : "h-3.5 w-3.5";

  return (
    <span
      className="inline-flex items-center gap-1.5"
      aria-label={`${variants.length} colors`}
    >
      {visible.map((item) => {
        const color = parseProductColor(item.slug);
        if (!color) return null;
        const selected = item.id === product.id;
        const label = COLOR_LABEL[color];
        const swatch = (
          <span
            className={cn(
              "block rounded-full",
              dim,
              selected && "ring-1 ring-ok-black ring-offset-1",
              swatchNeedsBorder(color) && !selected && "ring-1 ring-ok-line"
            )}
            style={{ background: swatchBackground(color) }}
          />
        );

        if (!interactive) {
          return (
            <span
              key={item.id}
              title={label}
              className="inline-flex"
              aria-hidden={currentColor ? color !== currentColor : undefined}
            >
              {swatch}
            </span>
          );
        }

        if (selected) {
          return (
            <span
              key={item.id}
              title={label}
              className="inline-flex"
              aria-current="true"
            >
              {swatch}
              <span className="sr-only">{label}, selected</span>
            </span>
          );
        }

        return (
          <Link
            key={item.id}
            href={genderHref(item.gender, `/shop/${item.slug}`)}
            title={label}
            aria-label={`View ${label}`}
            className="inline-flex rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ok-black"
          >
            {swatch}
          </Link>
        );
      })}
      {extra > 0 && (
        <span className="font-sans text-[12px] font-medium leading-none text-ok-black">
          +{extra}
        </span>
      )}
    </span>
  );
}
