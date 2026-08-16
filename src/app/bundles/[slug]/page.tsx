import { notFound } from "next/navigation";
import { bundles, getBundleBySlug } from "@/data/bundles";
import { BundleDetail } from "@/components/shop/BundleDetail";
import type { Metadata } from "next";

export function generateStaticParams() {
  return bundles.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bundle = getBundleBySlug(slug);
  if (!bundle) return { title: "Bundle" };
  return {
    title: bundle.name,
    description: bundle.description,
  };
}

export default async function BundlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bundle = getBundleBySlug(slug);
  if (!bundle) notFound();
  return <BundleDetail bundle={bundle} />;
}
