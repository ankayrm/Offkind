"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Product, Size } from "@/types";
import { SizeSelector } from "@/components/ui/SizeSelector";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useOrderBag } from "@/context/OrderBagContext";
import {
  cn,
  formatProductWhatsApp,
  isOnModelProductImage,
  productImageLabel,
  whatsappUrl,
} from "@/lib/utils";
import { brand, categoryLabels } from "@/data/brand";
import { products } from "@/data/products";
import {
  COLOR_LABEL,
  getColorVariants,
  parseProductColor,
  productDisplayName,
} from "@/lib/product-variants";
import { ColorSwatches } from "@/components/shop/ColorSwatches";
import { ViberIcon } from "@/components/ui/ViberIcon";
import { ViberLink } from "@/components/ui/ViberLink";
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
  const variants = useMemo(
    () => getColorVariants(product, products),
    [product]
  );
  const title =
    variants.length > 1 ? productDisplayName(product) : product.name;
  const currentColor = parseProductColor(product.slug);

  useEffect(() => {
    setActiveImage(0);
  }, [product.id]);

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
        <div className="relative aspect-[3/4] overflow-hidden bg-ok-cream">
          <Image
            src={product.images[activeImage]}
            alt={`${product.name} — ${productImageLabel(product.images[activeImage], activeImage)}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className={
              isOnModelProductImage(product.images[activeImage])
                ? "object-cover object-[center_top]"
                : "object-contain p-4 md:p-8"
            }
          />
        </div>
        {product.images.length > 1 && (
          <div
            className="mt-3 flex gap-2 overflow-x-auto no-scrollbar"
            role="tablist"
            aria-label="Product photos"
          >
            {product.images.map((img, i) => {
              const label = productImageLabel(img, i);
              const selected = i === activeImage;
              return (
                <button
                  key={`${img}-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-label={label}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "shrink-0 bg-white text-left transition-shadow",
                    selected ? "ring-1 ring-ok-black" : "ring-1 ring-ok-line"
                  )}
                >
                  <span className="relative block h-20 w-[4.5rem] overflow-hidden">
                    <Image
                      src={img}
                      alt=""
                      fill
                      className={
                        isOnModelProductImage(img)
                          ? "object-cover object-top"
                          : "object-contain p-1"
                      }
                      sizes="72px"
                    />
                  </span>
                  <span className="block px-1 py-1 text-center font-mono text-[9px] uppercase tracking-[0.12em] text-ok-muted">
                    {label}
                  </span>
                </button>
              );
            })}
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
          {title}
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

        {variants.length > 1 && (
          <div className="mt-6 space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-[0.18em] text-ok-muted">
                Color
              </span>
              {currentColor && (
                <span className="font-mono text-xs text-ok-black">
                  {COLOR_LABEL[currentColor]}
                </span>
              )}
            </div>
            <ColorSwatches
              product={product}
              variants={variants}
              size="md"
              interactive
            />
          </div>
        )}

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
          <ViberLink
            items={[]}
            extraMessage={formatProductWhatsApp(product, size)}
            requireCheckout={false}
            variant="outline"
            className="flex-1 sm:flex-none"
          >
            <ViberIcon className="h-4 w-4" /> Viber
          </ViberLink>
        </div>

        <p className="mt-5 text-xs text-ok-muted">
          Catalog piece. Message us for the price. No online checkout.
        </p>
      </div>
    </div>
  );
}
