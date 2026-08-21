import { notFound } from "next/navigation";
import { MysteryComboFit } from "@/components/mystery/MysteryComboFit";
import { genderLabels, isGender, type Gender } from "@/lib/gender";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gender: string }>;
}): Promise<Metadata> {
  const { gender } = await params;
  if (!isGender(gender)) return { title: "Mystery Combo Fit" };
  return {
    title: `${genderLabels[gender]} Mystery Combo Fit`,
    description: `Pick a combo, then get a drop number for a ${genderLabels[gender]} Mystery Combo Fit from OFFKIND THEORY.`,
  };
}

export default async function GenderBundlesPage({
  params,
}: {
  params: Promise<{ gender: string }>;
}) {
  const { gender } = await params;
  if (!isGender(gender)) notFound();

  return <MysteryComboFit gender={gender as Gender} />;
}
