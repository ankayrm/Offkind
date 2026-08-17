"use client";

import { useState } from "react";
import Image from "next/image";
import type { Bundle, Size } from "@/types";
import { SizeSelector } from "@/components/ui/SizeSelector";
import { Button } from "@/components/ui/Button";
import { useOrderBag } from "@/context/OrderBagContext";
import { formatPrice } from "@/lib/utils";
import { mysterySizesByGender } from "@/data/mystery";

interface BundleDetailProps {
  bundle: Bundle;
}

export function BundleDetail({ bundle }: BundleDetailProps) {
  const { addItem } = useOrderBag();
  const [size, setSize] = useState<Size | null>(null);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!size) {
      setError("Select a size");
      return;
    }
    setError("");
    addItem({
      type: "bundle",
      name: bundle.name,
      price: bundle.price,
      size,
      image: bundle.image,
      pieceCount: bundle.pieceCount,
      bundleId: bundle.id,
      gender: bundle.gender,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-8 md:grid-cols-2 md:gap-12 md:px-6 md:py-12">
      <div className="space-y-3">
        <div className="relative aspect-square overflow-hidden bg-white">
          <Image
            src={bundle.image}
            alt={bundle.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6"
          />
        </div>
        {bundle.lookImage && (
          <div className="relative aspect-[4/5] overflow-hidden bg-ok-cream">
            <Image
              src={bundle.lookImage}
              alt={`${bundle.name} look`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col md:pt-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ok-muted">
          {bundle.gender === "women" ? "Women" : "Men"} · Bundle · {bundle.pieceCount} pieces
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          {bundle.name}
        </h1>
        <p className="mt-4 font-display text-2xl font-bold">{formatPrice(bundle.price)}</p>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-ok-muted">
          {bundle.description}
        </p>

        <ul className="mt-6 space-y-2 border-t border-ok-line pt-6">
          {bundle.includes.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 text-sm text-ok-black"
            >
              <span className="h-1.5 w-1.5 bg-ok-yellow" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <SizeSelector
            sizes={mysterySizesByGender[bundle.gender]}
            value={size}
            onChange={(s) => {
              setSize(s);
              setError("");
            }}
            label="Your size (all pieces)"
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
          {added ? "Added ✓" : "Add Combo to Order"}
        </Button>

        <p className="mt-4 text-xs text-ok-muted">
          Combo price shown. Confirm via Instagram or WhatsApp.
        </p>
      </div>
    </div>
  );
}
