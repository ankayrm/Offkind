"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Gender } from "@/lib/gender";
import { genderLabels } from "@/lib/gender";
import { MysterySpinner } from "@/components/mystery/MysterySpinner";
import { MysteryPoolReadMore } from "@/components/mystery/MysteryPoolReadMore";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Choose your combo",
    body: "Starter, Full, or Season. You pick the pack. We pick the pieces.",
  },
  {
    title: "Pick your size",
    body: "That size is for every piece in the fit.",
  },
  {
    title: "Get a drop number",
    body: "We generate a unique number for the combo you chose.",
  },
  {
    title: "What's included",
    body: "Pieces are pulled at random from this pool. Starter is two, Full is three, Season is four. You will not know which ones until they land.",
    pool: true,
  },
  {
    title: "Add it to your bag",
    body: "Checkout from your bag. We pack a surprise around it. You see the pieces when they land.",
  },
];

export function MysteryComboFit({ gender }: { gender: Gender }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mx-auto max-w-[900px] px-4 py-12 md:px-6 md:py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ok-muted">
        {genderLabels[gender]} · Surprise fit
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
        Mystery Combo Fit
      </h1>
      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ok-muted">
        Pick the combo you want. After that, set your size and we generate your
        drop number. Add it to your bag and check out. We pack the surprise.
        You won&apos;t know until it lands.
      </p>

      <section className="mt-12">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 py-1 text-left"
          aria-expanded={open}
          aria-controls={panelId}
        >
          <h2 className="font-display text-2xl font-bold tracking-tight text-ok-black">
            How it works
          </h2>
          {open ? (
            <Minus className="h-5 w-5 shrink-0" strokeWidth={1.5} />
          ) : (
            <Plus className="h-5 w-5 shrink-0" strokeWidth={1.5} />
          )}
        </button>
        <div
          id={panelId}
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden" aria-hidden={!open}>
            <p className="mt-3 text-[15px] leading-relaxed text-ok-muted">
              Mystery Combo Fit means you choose the combo and your size. We
              generate a drop number, pack a surprise around it, and you see
              the pieces when they land. That&apos;s the point.
            </p>
            <ol className="mt-12 space-y-0">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="grid gap-2 border-t border-ok-line py-8 md:grid-cols-[100px_1fr] md:gap-10"
                >
                  <span className="font-display text-3xl font-bold text-ok-yellow">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight">
                      {step.title}
                    </h3>
                    {step.pool ? (
                      <MysteryPoolReadMore className="mt-2">
                        {step.body}
                      </MysteryPoolReadMore>
                    ) : (
                      <p className="mt-2 text-[15px] leading-relaxed text-ok-muted">
                        {step.body}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <p className="border-l-2 border-ok-yellow pl-4 text-[15px] leading-relaxed text-ok-black">
              Never once, across every Mystery Combo Fit we&apos;ve completed,
              has a customer come back and said it wasn&apos;t worth it.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-12">
        <MysterySpinner gender={gender} />
      </div>
    </div>
  );
}
