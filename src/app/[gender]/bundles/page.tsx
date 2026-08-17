import { notFound } from "next/navigation";
import { getBundlesByGender } from "@/data/bundles";
import { BundleCard } from "@/components/shop/BundleCard";
import { genderLabels, isGender, type Gender } from "@/lib/gender";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gender: string }>;
}): Promise<Metadata> {
  const { gender } = await params;
  if (!isGender(gender)) return { title: "Combo Packs" };
  return {
    title: `${genderLabels[gender]} Combo Packs`,
    description: `Priced combo packs from OFFKIND THEORY ${genderLabels[gender]}.`,
  };
}

export default async function GenderBundlesPage({
  params,
}: {
  params: Promise<{ gender: string }>;
}) {
  const { gender } = await params;
  if (!isGender(gender)) notFound();
  const bundles = getBundlesByGender(gender as Gender);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <p className="inline-flex bg-ok-yellow px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em]">
        {genderLabels[gender]} · Prices shown
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
        Combo Packs
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ok-muted">
        Curated sets with prices up front. You pick size. We match the pieces.
      </p>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {bundles.map((bundle) => (
          <BundleCard key={bundle.id} bundle={bundle} />
        ))}
      </div>
    </div>
  );
}
