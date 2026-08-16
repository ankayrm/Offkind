import { ButtonLink } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";

export const metadata = {
  title: "How It Works",
  description: "How the OFFKIND THEORY catalog and ordering works.",
};

const steps = [
  {
    title: "Browse the catalog",
    body: "Check individual pieces, combo packs, or Mystery. Piece prices stay off the page — like our posts. Combos show the number.",
  },
  {
    title: "Save to your bag",
    body: "Pick sizes. Add what you want. Your bag saves on this device so you can bounce and come back.",
  },
  {
    title: "Copy Order Summary",
    body: "We build a clean list with names, sizes, Mystery refs, and combo totals.",
  },
  {
    title: "Instagram or WhatsApp",
    body: "DM us, WhatsApp chat, or the community. We quote piece prices, confirm combos, then you pay.",
  },
];

const mysterySteps = [
  "Choose Starter, Full, or Season combo.",
  "Choose only your clothing size.",
  "Press SPIN YOUR COMBO — categories fly past.",
  "Receive a Mystery Drop reference (e.g. #OT-4821).",
  "Add to bag. Exact pieces stay sealed until delivery.",
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-10 md:px-6 md:py-14">
      <BrandLogo size={64} href={false} className="mb-6" />
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ok-muted">
        Process
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold uppercase tracking-tight md:text-5xl">
        How It Works
      </h1>
      <p className="mt-4 max-w-md text-sm text-ok-muted">
        Not a checkout site. A catalog with a bag — then a real message to buy.
      </p>

      <ol className="mt-12 space-y-0">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="grid gap-2 border-t-2 border-ok-black py-8 md:grid-cols-[80px_1fr] md:gap-8"
          >
            <span className="font-mono text-ok-yellow">0{i + 1}</span>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-tight">
                {step.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ok-muted">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 border-2 border-ok-black bg-ok-black p-6 text-ok-off shadow-[4px_4px_0_#ffde00] md:p-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-tight">
          Mystery Combos
        </h2>
        <ul className="mt-5 space-y-3">
          {mysterySteps.map((s) => (
            <li key={s} className="flex gap-3 text-sm text-ok-off/80">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ok-yellow" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/mystery" variant="yellow">
          Try Mystery
        </ButtonLink>
        <ButtonLink href="/shop" variant="outline">
          Catalog
        </ButtonLink>
      </div>
    </div>
  );
}
