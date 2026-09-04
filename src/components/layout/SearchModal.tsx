"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { searchProducts } from "@/data/products";
import { genderFromPath, genderHref, genderLabels } from "@/lib/gender";
import {
  getColorVariants,
  groupProductsByStyle,
  pickDisplayVariant,
  productDisplayName,
} from "@/lib/product-variants";
import { products } from "@/data/products";
import { ColorSwatches } from "@/components/shop/ColorSwatches";
import { formatCatalogPrice } from "@/lib/utils";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const pathname = usePathname();
  const gender = genderFromPath(pathname);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return groupProductsByStyle(
      searchProducts(query, gender ?? undefined)
    ).slice(0, 8);
  }, [query, gender]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] animate-fade-in">
      <div className="absolute inset-0 bg-ok-black/60" onClick={onClose} />
      <div className="relative mx-auto mt-0 max-h-[100dvh] w-full overflow-y-auto bg-ok-off pt-[env(safe-area-inset-top)] md:mt-16 md:max-h-[80vh] md:max-w-2xl md:pt-0 md:shadow-2xl">
        <div className="sticky top-0 flex items-center gap-3 border-b border-ok-line bg-ok-off px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-ok-muted" strokeWidth={1.5} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pieces, categories..."
            className="w-full bg-transparent text-base outline-none placeholder:text-ok-muted"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex h-11 w-11 items-center justify-center"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="p-4">
          {!query.trim() && (
            <p className="py-8 text-center text-sm text-ok-muted">
              Try “hoodie”, “cargo”, or “tee”
            </p>
          )}
          {query.trim() && results.length === 0 && (
            <p className="py-8 text-center text-sm text-ok-muted">
              No pieces matched “{query}”
            </p>
          )}
          <ul className="divide-y divide-ok-line">
            {results.map((product, i) => {
              const variants = getColorVariants(product, products);
              const display = pickDisplayVariant(variants, i);
              return (
              <li key={product.id}>
                <Link
                  href={genderHref(display.gender, `/shop/${display.slug}`)}
                  onClick={onClose}
                  className="flex items-center gap-4 py-3 transition-colors hover:bg-ok-cream/50"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden bg-white">
                    <Image
                      src={display.images[0]}
                      alt=""
                      fill
                      className="object-contain p-1"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">
                        {variants.length > 1
                          ? productDisplayName(display)
                          : display.name}
                      </p>
                      <ColorSwatches
                        product={display}
                        variants={variants}
                        maxVisible={3}
                      />
                    </div>
                    <p className="text-[11px] uppercase tracking-wider text-ok-muted">
                      {genderLabels[display.gender]} · {display.category} ·{" "}
                      {formatCatalogPrice(display.price)}
                    </p>
                  </div>
                </Link>
              </li>
              );
            })}
          </ul>
          {results.length > 0 && (
            <Link
              href={`${gender ? genderHref(gender, "/shop") : "/men/shop"}?q=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="mt-4 block text-center text-xs font-semibold uppercase tracking-[0.16em] text-ok-black underline decoration-ok-yellow underline-offset-4"
            >
              View all results
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
