import { notFound } from "next/navigation";
import { CustomMeansSection } from "@/components/custom/CustomMeansSection";
import { CustomOrderForm } from "@/components/custom/CustomOrderForm";
import { genderLabels, isGender, type Gender } from "@/lib/gender";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gender: string }>;
}): Promise<Metadata> {
  const { gender } = await params;
  if (!isGender(gender)) return { title: "Custom Order" };
  return {
    title: `${genderLabels[gender]} Custom Order`,
    description: `Send a photo and a paragraph of what you want. OFFKIND THEORY tries to manufacture it with 200+ partner companies, then gets back to you with the result.`,
  };
}

export default async function GenderCustomPage({
  params,
}: {
  params: Promise<{ gender: string }>;
}) {
  const { gender } = await params;
  if (!isGender(gender)) notFound();
  const label = genderLabels[gender];

  return (
    <div className="mx-auto max-w-[900px] px-4 py-12 md:px-6 md:py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ok-muted">
        {label} · Made to request
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
        Custom Order
      </h1>
      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ok-muted">
        Catalog is the easy path. Custom is for the piece that is not on the
        site — the one you already have in your head.
      </p>

      <CustomMeansSection />

      <div className="mt-12">
        <CustomOrderForm gender={gender as Gender} />
      </div>
    </div>
  );
}
