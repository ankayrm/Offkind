import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { genderLabels, isGender, type Gender } from "@/lib/gender";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gender: string }>;
}): Promise<Metadata> {
  const { gender } = await params;
  if (!isGender(gender)) return { title: "Catalog" };
  return {
    title: `${genderLabels[gender]} Catalog`,
    description: `Browse the OFFKIND THEORY ${genderLabels[gender].toLowerCase()} catalog.`,
  };
}

export default async function GenderShopPage({
  params,
}: {
  params: Promise<{ gender: string }>;
}) {
  const { gender } = await params;
  if (!isGender(gender)) notFound();

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <Suspense
        fallback={
          <div className="py-24 text-center font-mono text-sm text-ok-muted">
            Loading shop...
          </div>
        }
      >
        <ShopGrid gender={gender as Gender} />
      </Suspense>
    </div>
  );
}
