import { bundles } from "@/data/bundles";
import { BundleCard } from "@/components/shop/BundleCard";

export const metadata = {
  title: "Combo Packs",
  description: "Priced combo packs from OFFKIND THEORY.",
};

export default function BundlesPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-14">
      <p className="inline-flex rotate-[-2deg] sticker-yellow px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
        Prices shown
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold uppercase tracking-tight md:text-5xl">
        Combo Packs
      </h1>
      <p className="mt-3 max-w-md text-sm text-ok-muted">
        Curated sets with prices up front. You pick size. We match the pieces.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {bundles.map((bundle) => (
          <BundleCard key={bundle.id} bundle={bundle} />
        ))}
      </div>
    </div>
  );
}
