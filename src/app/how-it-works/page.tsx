import { ButtonLink } from "@/components/ui/Button";

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
    title: "Checkout",
    body: "Add your email and phone (for identification and to verify the order is genuine), plus your city and how you receive it: Cash on Delivery, Box Now, or Regular Delivery. This is required — you can't send without it.",
  },
  {
    title: "Send on WhatsApp",
    body: "Tap WhatsApp. Your full list — names, sizes, contact details, location, delivery method, drop numbers, combo totals — is already in the message. Just hit send. We quote piece prices, confirm, then you pay. You can also print a receipt of the bag for yourself — that total is not final.",
  },
];

const mysterySteps = [
  "Choose Starter, Full, or Season combo.",
  "Choose only your clothing size.",
  "Generate a unique drop number (e.g. #OTM-4821).",
  "Send that number on WhatsApp — the message is already written. Just hit send.",
  "We pack a surprise fit around it. Exact pieces stay sealed until delivery.",
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-[860px] px-4 py-12 md:px-6 md:py-16">
      <p className="kicker">Process</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
        How It Works
      </h1>
      <p className="mt-4 max-w-md text-[15px] text-ok-muted">
        Not a checkout site. A catalog with a bag — then a real message to buy.
      </p>

      <ol className="mt-14 space-y-0">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="grid gap-2 border-t border-ok-line py-8 md:grid-cols-[100px_1fr] md:gap-10"
          >
            <span className="font-display text-3xl font-bold text-ok-yellow">
              0{i + 1}
            </span>
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                {step.title}
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ok-muted">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 bg-ok-black p-7 text-ok-off md:p-10">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          Mystery Combos
        </h2>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ok-off/70">
          You generate a unique drop number and send it to us. That number is
          your ticket — we pack a surprise fit around it. You don&apos;t see
          the pieces until they land.
        </p>
        <ul className="mt-6 space-y-3">
          {mysterySteps.map((s) => (
            <li key={s} className="flex gap-3 text-[15px] text-ok-off/75">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ok-yellow" />
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-7 border-l-2 border-ok-yellow pl-4 text-[15px] leading-relaxed text-ok-off">
          Never once — across every Mystery order we&apos;ve completed — has a
          customer come back and said it wasn&apos;t worth it.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/men" variant="yellow">
          Shop men
        </ButtonLink>
        <ButtonLink href="/women" variant="outline">
          Shop women
        </ButtonLink>
      </div>
    </div>
  );
}
