import { notFound } from "next/navigation";
import { getProductBySlug, getProductsByGender } from "@/data/products";
import { ProductDetail } from "@/components/shop/ProductDetail";
import { GENDERS, isGender, type Gender } from "@/lib/gender";
import type { Metadata } from "next";

export function generateStaticParams() {
  return GENDERS.flatMap((gender) =>
    getProductsByGender(gender).map((p) => ({ gender, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gender: string; slug: string }>;
}): Promise<Metadata> {
  const { gender, slug } = await params;
  if (!isGender(gender)) return { title: "Product" };
  const product = getProductBySlug(slug, gender);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function GenderProductPage({
  params,
}: {
  params: Promise<{ gender: string; slug: string }>;
}) {
  const { gender, slug } = await params;
  if (!isGender(gender)) notFound();
  const product = getProductBySlug(slug, gender as Gender);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
