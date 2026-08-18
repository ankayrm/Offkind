"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product, Size } from "@/types";
import { SizeSelector } from "@/components/ui/SizeSelector";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useOrderBag } from "@/context/OrderBagContext";
import { cn, formatProductWhatsApp, whatsappUrl } from "@/lib/utils";
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
  const inquiryHref = whatsappUrl(formatProductWhatsApp(product, size));

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
      gender: product.gender,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-10 md:grid-cols-2 md:gap-16 md:px-6 md:py-16">
      <div>
        <div className="relative aspect-[3/4] overflow-hidden bg-white">
          <Image
            src={product.images[activeImage]}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className={
              activeImage === 0
                ? "object-contain p-4 md:p-8"
                : "object-cover object-[center_top]"
            }
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
                  "relative h-20 w-16 shrink-0 overflow-hidden bg-white ring-1 ring-inset transition-shadow",
                  i === activeImage ? "ring-ok-black" : "ring-transparent"
                )}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className={
                    i === 0 ? "object-contain p-1" : "object-cover object-top"
                  }
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col md:pt-6">
        <p className="kicker">
          {product.gender === "women" ? "Women" : "Men"} ·{" "}
          {categoryLabels[product.category]}
          {product.brand ? ` · ${product.brand}` : ""}
          {product.condition ? ` · ${product.condition}` : ""}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          {product.name}
        </h1>

        <span className="mt-5 inline-flex w-fit bg-ok-yellow px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ok-black">
          Price on request
        </span>

        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ok-muted">
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
            href={inquiryHref}
            variant="outline"
            className="flex-1 sm:flex-none"
          >
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </ButtonLink>
        </div>

        <p className="mt-5 text-xs text-ok-muted">
          Catalog piece. Message us for the price. No online checkout.
        </p>
      </div>
    </div>
  );
}
