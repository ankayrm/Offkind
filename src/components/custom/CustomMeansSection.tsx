"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Send a picture",
    body: "Upload a photo of the piece or look you want. Screenshot, street pic, product shot — we use it as the brief.",
  },
  {
    title: "Write the specifics",
    body: "A paragraph of what matters: color, fabric, logos, fit, size notes, anything you care about.",
  },
  {
    title: "We take it to the network",
    body: "We try to manufacture or source it with the 200+ companies we work with.",
  },
  {
    title: "We get back to you",
    body: "You hear the result: whether we can make it, the price, and next steps. Then you decide.",
  },
];

export function CustomMeansSection() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section className="mt-12">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-1 text-left"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <h2 className="font-display text-2xl font-bold tracking-tight text-ok-black">
          What custom means
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
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden" aria-hidden={!open}>
          <p className="mt-3 text-[15px] leading-relaxed text-ok-muted">
            Custom means we do not pull it off a rack here. You show us the
            look — a picture and a paragraph of the specifics — and we try to
            manufacture that piece through the 200+ companies we work with.
            Then we come back with the result.
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
                  <p className="mt-2 text-[15px] leading-relaxed text-ok-muted">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="border-l-2 border-ok-yellow pl-4 text-[15px] leading-relaxed text-ok-black">
            <span className="underline decoration-ok-yellow decoration-2 underline-offset-[5px]">
              It is not always 100% sure that you will get the piece. Some looks
              cannot be manufactured or sourced. 97% of our clients are happy and
              they get what they want.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
