import { MysterySpinner } from "@/components/mystery/MysterySpinner";

export const metadata = {
  title: "Mystery Combo",
  description:
    "Pick your size. Spin your combo. Get a Mystery Drop reference from OFFKIND THEORY.",
};

export default function MysteryPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-10 md:px-6 md:py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ok-yellow">
        Signature drop
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold uppercase tracking-tight md:text-6xl">
        Mystery Combo
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-ok-muted">
        Pick your size. We&apos;ll handle the rest. You won&apos;t know until it
        lands — that&apos;s the point. Not a game. A curated surprise fit.
      </p>
      <div className="mt-12">
        <MysterySpinner />
      </div>
    </div>
  );
}
