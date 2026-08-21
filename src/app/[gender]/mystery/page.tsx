import { notFound, redirect } from "next/navigation";
import { isGender } from "@/lib/gender";

export default async function GenderMysteryPage({
  params,
}: {
  params: Promise<{ gender: string }>;
}) {
  const { gender } = await params;
  if (!isGender(gender)) notFound();
  redirect(`/${gender}/bundles`);
}
