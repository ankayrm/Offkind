"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products, searchProducts } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { categoryLabels } from "@/data/brand";
import type { Gender, ProductCategory } from "@/types";
import { cn } from "@/lib/utils";
import { genderLabels } from "@/lib/gender";
import {
  buildStyleVariantMap,
  groupProductsByStyle,
  pickDisplayVariant,
  productDisplayName,
  productStyleKey,
} from "@/lib/product-variants";

const PAGE_SIZE = 24;

const filters: Array<"all" | ProductCategory> = [
  "all",
  "knitwear",
  "hoodies",
  "tees",
  "jackets",
  "shorts",
  "pants",
];

export function ShopGrid({ gender }: { gender: Gender }) {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const initialCat = searchParams.get("cat");
  const validCats = filters.filter((f) => f !== "all");
  const startCat =
    initialCat && validCats.includes(initialCat as ProductCategory)
      ? (initialCat as ProductCategory)
      : "all";
  const [category, setCategory] = useState<"all" | ProductCategory>(startCat);
  const [query, setQuery] = useState(initialQ);
  const [sort, setSort] = useState<"featured" | "name">("featured");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const genderCatalog = useMemo(
    () => products.filter((p) => p.gender === gender),
    [gender]
  );

  const variantMap = useMemo(
    () => buildStyleVariantMap(genderCatalog),
    [genderCatalog]
  );

  const filtered = useMemo(() => {
    let list = query.trim()
      ? searchProducts(query, gender)
      : genderCatalog;
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }
    if (sort === "name") {
      list = [...list].sort((a, b) =>
        productDisplayName(a).localeCompare(productDisplayName(b))
      );
    } else {
      list = [...list].sort(
        (a, b) => Number(b.featured) - Number(a.featured)
      );
    }
    return groupProductsByStyle(list);
  }, [category, query, sort, gender, genderCatalog]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [category, query, sort, gender]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <div className="min-w-0">
      <div className="flex flex-col gap-6 border-b border-ok-line pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="kicker">{genderLabels[gender]} catalog</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Catalog
          </h1>
          <p className="mt-3 text-[15px] text-ok-muted">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} · Some
            pieces on request
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by name..."
            className="h-11 w-full bg-transparent px-3 text-sm outline-none ring-1 ring-inset ring-ok-line transition-shadow focus:ring-ok-black sm:w-52"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "featured" | "name")}
            className="h-11 bg-transparent px-3 text-xs uppercase tracking-[0.14em] outline-none ring-1 ring-inset ring-ok-line"
          >
            <option value="featured">Featured</option>
            <option value="name">A–Z</option>
          </select>
        </div>
      </div>

      <div className="mt-7 flex min-w-0 gap-2 overflow-x-auto overscroll-x-contain no-scrollbar pb-1">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setCategory(f)}
            className={cn(
              "shrink-0 min-h-11 px-4 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors",
              category === f
                ? "bg-ok-yellow text-ok-black"
                : "bg-transparent text-ok-muted ring-1 ring-inset ring-ok-line hover:text-ok-black hover:ring-ok-black/40"
            )}
          >
            {categoryLabels[f] ?? f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display text-2xl font-bold tracking-tight">
            No pieces found
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="mt-4 text-xs uppercase tracking-[0.16em] underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-14 lg:grid-cols-4">
            {shown.map((product, i) => {
              const variants =
                variantMap.get(
                  `${product.gender}:${productStyleKey(product)}`
                ) ?? [product];
              const display = pickDisplayVariant(variants, i);
              return (
                <ProductCard
                  key={`${product.gender}:${productStyleKey(product)}`}
                  product={display}
                  variants={variants}
                  priority={i < 4}
                />
              );
            })}
          </div>
          {hasMore && (
            <div className="mt-14 flex flex-col items-center gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ok-muted">
                Showing {shown.length} of {filtered.length}
              </p>
              <button
                type="button"
                onClick={() => setVisible((n) => n + PAGE_SIZE)}
                className="bg-ok-black px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ok-off transition-colors hover:bg-ok-yellow hover:text-ok-black"
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
