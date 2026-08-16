"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product, Size } from "@/types";
import { SizeSelector } from "@/components/ui/SizeSelector";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useOrderBag } from "@/context/OrderBagContext";
import { cn } from "@/lib/utils";
import { brand, categoryLabels } from "@/data/brand";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useOrderBag();
  const [size, setSize] = useState<Size | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!size) {
      setError("Select a size");
      return;
    }
    setError("");
    addItem({
      type: "product",
      name: product.name,
      price: 0,
      size,
      image: product.images[0],
      productId: product.id,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-8 md:grid-cols-2 md:gap-12 md:px-6 md:py-12">
      <div>
        <div className="relative aspect-[3/4] overflow-hidden bg-ok-cream sticker">
          <Image
            src={product.images[activeImage]}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        {product.images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
            {product.images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveImage(i)}
                className={cn(
                  "relative h-20 w-16 shrink-0 overflow-hidden border-2",
                  i === activeImage ? "border-ok-black" : "border-transparent"
                )}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col md:pt-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ok-muted">
          {categoryLabels[product.category]}
          {product.brand ? ` · ${product.brand}` : ""}
          {product.condition ? ` · ${product.condition}` : ""}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold uppercase tracking-tight md:text-5xl">
          {product.name}
        </h1>

        <span className="mt-4 inline-flex w-fit rotate-[-2deg] sticker-yellow px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ok-black">
          Price on request
        </span>

        <p className="mt-6 max-w-md text-sm leading-relaxed text-ok-muted">
          {product.description}
        </p>

        <div className="mt-8">
          <SizeSelector
            sizes={product.sizes}
            value={size}
            onChange={(s) => {
              setSize(s);
              setError("");
            }}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>

        <Button
          variant="yellow"
          className="mt-6 w-full md:w-auto md:min-w-[240px]"
          onClick={handleAdd}
        >
          {added ? "Added ✓" : "Add to Bag"}
        </Button>

        <div className="mt-4 flex flex-wrap gap-3">
          <ButtonLink
            href={brand.contact.instagramUrl}
            variant="outline"
            className="flex-1 sm:flex-none"
          >
            <InstagramIcon className="h-4 w-4" /> Instagram
          </ButtonLink>
          <ButtonLink
            href={brand.contact.whatsappUrl}
            variant="outline"
            className="flex-1 sm:flex-none"
          >
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </ButtonLink>
        </div>

        <p className="mt-4 text-xs text-ok-muted">
          Catalog piece — message us for the price. No online checkout.
        </p>
      </div>
    </div>
  );
}
