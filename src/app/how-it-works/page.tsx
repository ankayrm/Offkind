import { ButtonLink } from "@/components/ui/Button";

export const metadata = {
  title: "How It Works",
  description:
    "How the OFFKIND THEORY catalog, Mystery Combo Fit, and custom orders work.",
};

const steps = [
  {
    title: "Browse the catalog",
    body: "Check individual pieces or a Mystery Combo Fit. Most piece prices are on the page. Some pieces stay on request. Mystery Combo Fit shows the combo number.",
  },
  {
    title: "Save to your bag",
    body: "Pick sizes. Add what you want. Your bag saves on this device so you can bounce and come back.",
  },
  {
    title: "Message us",
    body: "Hit Instagram or Viber with what you want, your size, and how you receive it: Cash on Delivery, Box Now, or Regular Delivery. We confirm, then you pay.",
  },
];

const mysterySteps = [
  "Choose the combo you want: Starter, Full, or Season.",
  "Pick your clothing size.",
  "We generate a unique drop number for that combo (e.g. #OTM-4821).",
  "What's included: pieces are pulled at random from the catalog. The full name list is on the Mystery Combo Fit page.",
  "Add it to your bag, then message us. Payment happens after we confirm, not on this page.",
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
        Not a checkout site. A catalog, then a real message to buy. Custom is
        for looks that are not on the site yet.
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
          Mystery Combo Fit
        </h2>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ok-off/70">
          Pick the combo you want first. Then we generate a unique drop number
          for it. That number is your ticket. We pack a surprise fit around it.
          You don&apos;t see the pieces until they land.
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
          Never once, across every Mystery Combo Fit we&apos;ve completed, has a
          customer come back and said it wasn&apos;t worth it.
        </p>
      </div>

      <div className="mt-6 ring-1 ring-inset ring-ok-line p-7 md:p-10">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          Custom orders
        </h2>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ok-muted">
          Custom means the piece is not in the catalog. You send a photo and a
          paragraph of the specifics. We try to manufacture it with the 200+
          companies we work with, then get back to you with the result.
        </p>
        <ul className="mt-6 space-y-3">
          {[
            "Upload a picture of the look you want.",
            "Write a paragraph: color, fabric, logos, fit, size notes.",
            "Send it on Viber or Instagram and attach the photo in the chat.",
            "We run it through the network and reply with whether we can make it, the price, and next steps.",
          ].map((s) => (
            <li key={s} className="flex gap-3 text-[15px] text-ok-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ok-yellow" />
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-7 border-l-2 border-ok-yellow pl-4 text-[15px] leading-relaxed text-ok-black">
          <span className="underline decoration-ok-yellow decoration-2 underline-offset-[5px]">
            It is not always 100% sure that you will get the piece. 97% of our
            clients are happy and they get what they want.
          </span>
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/men" variant="yellow">
          Shop men
        </ButtonLink>
        <ButtonLink href="/women" variant="outline">
          Shop women
        </ButtonLink>
        <ButtonLink href="/custom" variant="outline">
          Custom order
        </ButtonLink>
      </div>
    </div>
  );
}
