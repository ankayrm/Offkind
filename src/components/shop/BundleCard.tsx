"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Bundle } from "@/types";
import { cn, formatPrice } from "@/lib/utils";
import { genderHref } from "@/lib/gender";

interface BundleCardProps {
  bundle: Bundle;
}

export function BundleCard({ bundle }: BundleCardProps) {
  const [hovered, setHovered] = useState(false);
  const look = bundle.lookImage;
  const showLook = hovered && !!look;

  return (
    <Link
      href={genderHref(bundle.gender, `/bundles/${bundle.slug}`)}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        <Image
          src={bundle.image}
          alt={bundle.name}
          fill
          sizes="(max-width: 768px) 90vw, 33vw"
          className={cn(
            "object-contain p-4 transition-all duration-500 ease-out md:p-5",
            showLook
              ? "opacity-0 scale-105"
              : "opacity-100 scale-100 group-hover:scale-[1.03]"
          )}
        />
        {look && (
          <Image
            src={look}
            alt=""
            fill
            sizes="(max-width: 768px) 90vw, 33vw"
            className={cn(
              "object-cover object-top transition-all duration-500 ease-out",
              showLook ? "opacity-100 scale-100" : "opacity-0 scale-105"
            )}
          />
        )}
      </div>
      <div className="mt-3.5">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ok-muted">
          {bundle.pieceCount} pieces · {formatPrice(bundle.price)}
        </p>
        <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-ok-black transition-colors group-hover:text-ok-muted">
          {bundle.name}
        </h3>
      </div>
    </Link>
  );
}
