import { notFound } from "next/navigation";
import { GenderHome } from "@/components/home/GenderHome";
import { genderLabels, isGender, type Gender } from "@/lib/gender";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gender: string }>;
}): Promise<Metadata> {
  const { gender } = await params;
  if (!isGender(gender)) return { title: "Shop" };
  return {
    title: genderLabels[gender],
    description: `OFFKIND THEORY ${genderLabels[gender]}. Catalog, Mystery Combo Fit, and custom orders.`,
  };
}

export default async function GenderPage({
  params,
}: {
  params: Promise<{ gender: string }>;
}) {
  const { gender } = await params;
  if (!isGender(gender)) notFound();
  return <GenderHome gender={gender as Gender} />;
}
