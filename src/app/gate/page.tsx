import type { Metadata } from "next";
import { AccessGate } from "@/components/gate/AccessGate";
import { safeNextPath } from "@/lib/access-gate";

export const metadata: Metadata = {
  title: "Enter code",
  robots: { index: false, follow: false },
};

export default async function GatePage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return <AccessGate nextPath={safeNextPath(next)} />;
}
