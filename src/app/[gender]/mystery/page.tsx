import { notFound } from "next/navigation";
import { MysterySpinner } from "@/components/mystery/MysterySpinner";
import { genderLabels, isGender, type Gender } from "@/lib/gender";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gender: string }>;
}): Promise<Metadata> {
  const { gender } = await params;
  if (!isGender(gender)) return { title: "Mystery Combo" };
  return {
    title: `${genderLabels[gender]} Mystery Combo`,
    description: `Pick your size. Get a drop number. Send it to us for a ${genderLabels[gender]} Mystery surprise from OFFKIND THEORY.`,
  };
}

export default async function GenderMysteryPage({
  params,
}: {
  params: Promise<{ gender: string }>;
}) {
  const { gender } = await params;
  if (!isGender(gender)) notFound();

  return (
    <div className="mx-auto max-w-[900px] px-4 py-12 md:px-6 md:py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ok-muted">
        {genderLabels[gender]} · Signature drop
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
        Mystery Combo
      </h1>
      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ok-muted">
        Pick your size. Generate a drop number. Send it to us — we pack the
        surprise. You won&apos;t know until it lands. That&apos;s the point.
      </p>
      <div className="mt-12">
        <MysterySpinner gender={gender as Gender} />
      </div>
    </div>
  );
}
