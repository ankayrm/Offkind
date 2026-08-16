import { brand } from "@/data/brand";

export const metadata = {
  title: "Terms",
  description: "Terms of use for OFFKIND THEORY.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-10 md:px-6 md:py-14">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold uppercase tracking-tight">
        Terms
      </h1>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ok-muted">
        Last updated · 2026
      </p>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-ok-muted">
        <p>
          By using the {brand.registeredName} website, you agree to these terms.
          This site is a catalog and order-builder. Orders are confirmed
          separately via Instagram DM or phone.
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-xl uppercase text-ok-black">
          Products & availability
        </h2>
        <p>
          Prices and stock shown are indicative. Final confirmation happens when
          you contact us. We may adjust or cancel if an item is unavailable.
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-xl uppercase text-ok-black">
          Mystery Combos
        </h2>
        <p>
          Mystery Combos are curated surprise selections. Exact items are not
          revealed before fulfillment. Once confirmed, Mystery Combos are
          generally final except for damage or wrong size issues.
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-xl uppercase text-ok-black">
          Payment
        </h2>
        <p>
          No online payment is collected on this website. Payment methods are
          agreed when your order is confirmed.
        </p>
        <p>
          Replace this placeholder with your full legal terms before launch.
        </p>
      </div>
    </div>
  );
}
