"use client";

import Image from "next/image";
import Link from "next/link";
import type { Bundle } from "@/types";
import { formatPrice } from "@/lib/utils";

interface BundleCardProps {
  bundle: Bundle;
}

export function BundleCard({ bundle }: BundleCardProps) {
  return (
    <Link href={`/bundles/${bundle.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-ok-cream">
        <Image
          src={bundle.image}
          alt={bundle.name}
          fill
          sizes="(max-width: 768px) 90vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ok-black/85 to-transparent p-4 pt-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ok-yellow">
            {bundle.pieceCount} pieces · {formatPrice(bundle.price)}
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl uppercase tracking-tight text-ok-off">
            {bundle.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
