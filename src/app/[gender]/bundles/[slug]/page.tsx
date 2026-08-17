import { notFound } from "next/navigation";
import { getBundleBySlug, getBundlesByGender } from "@/data/bundles";
import { BundleDetail } from "@/components/shop/BundleDetail";
import { GENDERS, isGender, type Gender } from "@/lib/gender";
import type { Metadata } from "next";

export function generateStaticParams() {
  return GENDERS.flatMap((gender) =>
    getBundlesByGender(gender).map((b) => ({ gender, slug: b.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gender: string; slug: string }>;
}): Promise<Metadata> {
  const { gender, slug } = await params;
  if (!isGender(gender)) return { title: "Bundle" };
  const bundle = getBundleBySlug(slug, gender);
  if (!bundle) return { title: "Bundle" };
  return {
    title: bundle.name,
    description: bundle.description,
  };
}

export default async function GenderBundlePage({
  params,
}: {
  params: Promise<{ gender: string; slug: string }>;
}) {
  const { gender, slug } = await params;
  if (!isGender(gender)) notFound();
  const bundle = getBundleBySlug(slug, gender as Gender);
  if (!bundle) notFound();
  return <BundleDetail bundle={bundle} />;
}
