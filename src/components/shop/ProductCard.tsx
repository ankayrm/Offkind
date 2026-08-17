"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";
import { categoryLabels } from "@/data/brand";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const secondary = product.images[1];
  const showSecondary = hovered && !!secondary;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-ok-cream">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          priority={priority}
          className={cn(
            "object-cover transition-all duration-500 ease-out",
            showSecondary
              ? "opacity-0 scale-105"
              : "opacity-100 scale-100 group-hover:scale-[1.03]"
          )}
        />
        {secondary && (
          <Image
            src={secondary}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={cn(
              "object-cover transition-all duration-500 ease-out",
              showSecondary ? "opacity-100 scale-100" : "opacity-0 scale-105"
            )}
          />
        )}
        <div className="absolute left-0 top-0 bg-ok-black px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ok-off">
          {categoryLabels[product.category] ?? product.category}
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium tracking-tight text-ok-black group-hover:underline underline-offset-4 decoration-ok-yellow">
          {product.name}
        </h3>
        {product.brand && (
          <p className="mt-0.5 text-[11px] uppercase tracking-wider text-ok-muted">
            {product.brand}
            {product.condition ? ` · ${product.condition}` : ""}
          </p>
        )}
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ok-muted">
          DM for price
        </p>
      </div>
    </Link>
  );
}
