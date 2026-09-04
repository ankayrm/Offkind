"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Product, Size } from "@/types";
import { SizeSelector } from "@/components/ui/SizeSelector";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useOrderBag } from "@/context/OrderBagContext";
import {
  cn,
  formatPrice,
  formatProductWhatsApp,
  hasCatalogPrice,
  isOnModelProductImage,
  productImageLabel,
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
import { Check, Copy } from "lucide-react";
import { ViberIcon } from "@/components/ui/ViberIcon";
import { ViberLink } from "@/components/ui/ViberLink";
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
  const [copied, setCopied] = useState(false);
  const inquiry = formatProductWhatsApp(product, size);
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
      price: product.price,
      size,
      image: product.images[0],
      productId: product.id,
      gender: product.gender,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const copyInquiry = async () => {
    try {
      await navigator.clipboard.writeText(inquiry);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = inquiry;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto grid w-full min-w-0 max-w-[1400px] gap-10 px-4 py-10 md:grid-cols-2 md:gap-16 md:px-6 md:py-16">
      <div className="min-w-0">
        <div className="relative aspect-square overflow-hidden bg-white">
          <Image
            src={product.images[activeImage]}
            alt={`${product.name} — ${productImageLabel(product.images[activeImage], activeImage)}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className={
              isOnModelProductImage(product.images[activeImage])
                ? "object-cover object-[center_top]"
                : "object-contain p-3 md:p-5"
            }
          />
        </div>
        {product.images.length > 1 && (
          <div
            className="mt-3 flex w-full min-w-0 gap-1.5 overflow-x-auto overscroll-x-contain no-scrollbar sm:gap-2"
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
                    "min-w-0 flex-1 basis-0 bg-white text-left transition-shadow sm:w-20 sm:flex-none sm:shrink-0",
                    selected ? "ring-1 ring-ok-black" : "ring-1 ring-ok-line"
                  )}
                >
                  <span className="relative block aspect-square w-full overflow-hidden">
                    <Image
                      src={img}
                      alt=""
                      fill
                      className={
                        isOnModelProductImage(img)
                          ? "object-cover object-top"
                          : "object-contain p-1"
                      }
                      sizes="(max-width: 640px) 20vw, 80px"
                    />
                  </span>
                  <span className="block truncate px-0.5 py-1 text-center font-mono text-[8px] uppercase tracking-[0.08em] text-ok-muted sm:px-1 sm:text-[9px] sm:tracking-[0.12em]">
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col md:pt-6">
        <p className="kicker break-words">
          {product.gender === "women" ? "Women" : "Men"} ·{" "}
          {categoryLabels[product.category]}
          {product.brand ? ` · ${product.brand}` : ""}
          {product.condition ? ` · ${product.condition}` : ""}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>

        <span className="mt-5 inline-flex w-fit bg-ok-yellow px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ok-black">
          {hasCatalogPrice(product.price)
            ? formatPrice(product.price)
            : "Price on request"}
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

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink
            href={brand.contact.instagramUrl}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <InstagramIcon className="h-4 w-4" /> Instagram
          </ButtonLink>
          <ViberLink
            items={[]}
            extraMessage={inquiry}
            requireCheckout={false}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <ViberIcon className="h-4 w-4" /> Viber
          </ViberLink>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => void copyInquiry()}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" /> Copy
              </>
            )}
          </Button>
        </div>

        <p className="mt-5 text-xs text-ok-muted">
          {hasCatalogPrice(product.price)
            ? "No online checkout. Confirm via Instagram or Viber."
            : "Catalog piece. Message us for the price. No online checkout."}
        </p>
      </div>
    </div>
  );
}
