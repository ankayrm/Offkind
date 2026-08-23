"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/types";
import { cn, isOnModelProductImage } from "@/lib/utils";
import { categoryLabels } from "@/data/brand";
import { genderHref } from "@/lib/gender";
import { products } from "@/data/products";
import {
  getColorVariants,
  productDisplayName,
} from "@/lib/product-variants";
import { ColorSwatches } from "@/components/shop/ColorSwatches";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const secondary = product.images[1];
  const showSecondary = hovered && !!secondary;
  const href = genderHref(product.gender, `/shop/${product.slug}`);
  const variants = useMemo(
    () => getColorVariants(product, products),
    [product]
  );
  const title =
    variants.length > 1 ? productDisplayName(product) : product.name;

  return (
    <article className="group">
      <Link
        href={href}
        className="block"
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
              "object-contain p-3 transition-all duration-500 ease-out md:p-4",
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
                isOnModelProductImage(secondary)
                  ? "object-cover object-top"
                  : "object-contain p-3 md:p-4",
                "transition-all duration-500 ease-out",
                showSecondary ? "opacity-100 scale-100" : "opacity-0 scale-105"
              )}
            />
          )}
        </div>
      </Link>
      <div className="mt-3.5">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ok-muted">
          {categoryLabels[product.category] ?? product.category}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="text-[15px] font-medium tracking-tight text-ok-black transition-colors group-hover:text-ok-muted">
            <Link href={href}>{title}</Link>
          </h3>
          <ColorSwatches
            product={product}
            variants={variants}
            maxVisible={3}
            interactive
          />
        </div>
        {product.brand && (
          <p className="mt-0.5 text-[12px] text-ok-muted">
            {product.brand}
            {product.condition ? ` · ${product.condition}` : ""}
          </p>
        )}
        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ok-muted">
          DM for price
        </p>
      </div>
    </article>
  );
}
