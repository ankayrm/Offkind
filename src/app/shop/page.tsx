import { Suspense } from "react";
import { ShopGrid } from "@/components/shop/ShopGrid";

export const metadata = {
  title: "Catalog",
  description:
    "Browse the OFFKIND THEORY catalog. Piece prices on request via Instagram or WhatsApp.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 md:py-14">
      <Suspense
        fallback={
          <div className="py-24 text-center font-mono text-sm text-ok-muted">
            Loading shop...
          </div>
        }
      >
        <ShopGrid />
      </Suspense>
    </div>
  );
}
