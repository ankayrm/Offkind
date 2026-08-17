import { notFound } from "next/navigation";
import { GENDERS, isGender } from "@/lib/gender";

export function generateStaticParams() {
  return GENDERS.map((gender) => ({ gender }));
}

export default async function GenderLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ gender: string }>;
}) {
  const { gender } = await params;
  if (!isGender(gender)) notFound();
  return children;
}
