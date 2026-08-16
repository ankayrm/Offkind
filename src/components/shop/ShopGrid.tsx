"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products, searchProducts } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { categoryLabels } from "@/data/brand";
import type { ProductCategory } from "@/types";
import { cn } from "@/lib/utils";

const filters: Array<"all" | ProductCategory> = [
  "all",
  "knitwear",
  "hoodies",
  "tees",
  "shorts",
];

export function ShopGrid() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [category, setCategory] = useState<"all" | ProductCategory>("all");
  const [query, setQuery] = useState(initialQ);
  const [sort, setSort] = useState<"featured" | "name">("featured");

  const filtered = useMemo(() => {
    let list = query.trim() ? searchProducts(query) : [...products];
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }
    if (sort === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list = [...list].sort(
        (a, b) => Number(b.featured) - Number(a.featured)
      );
    }
    return list;
  }, [category, query, sort]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-ok-line pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ok-muted">
            No prices on pieces
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-4xl font-bold uppercase tracking-tight md:text-5xl">
            Catalog
          </h1>
          <p className="mt-2 text-sm text-ok-muted">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} · DM
            / WhatsApp for price
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by name..."
            className="h-11 w-full border-2 border-ok-line bg-transparent px-3 text-sm outline-none focus:border-ok-black sm:w-52"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "featured" | "name")}
            className="h-11 border-2 border-ok-line bg-transparent px-3 text-xs uppercase tracking-[0.14em] outline-none"
          >
            <option value="featured">Featured</option>
            <option value="name">A–Z</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setCategory(f)}
            className={cn(
              "shrink-0 border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors",
              category === f
                ? "sticker-yellow border-ok-black text-ok-black"
                : "border-ok-line hover:border-ok-black"
            )}
          >
            {categoryLabels[f] ?? f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-[family-name:var(--font-display)] text-2xl uppercase">
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
        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={i < 4}
            />
          ))}
        </div>
      )}
    </div>
  );
}
