"use client";

import { useState } from "react";
import { faqs } from "@/data/faq";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-ok-line border-y border-ok-line">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <li key={faq.question}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg tracking-tight md:text-xl">
                {faq.question}
              </span>
              {isOpen ? (
                <Minus className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.5} />
              ) : (
                <Plus className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.5} />
              )}
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                isOpen ? "max-h-48 pb-5 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <p className="max-w-2xl text-sm leading-relaxed text-ok-muted">
                {faq.answer}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
