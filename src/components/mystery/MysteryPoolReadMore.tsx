"use client";

import { useId, useState, type ReactNode } from "react";
import { getMysteryPoolNames } from "@/data/mystery";
import type { Gender } from "@/lib/gender";
import { cn } from "@/lib/utils";

export function MysteryPoolReadMore({
  children,
  className,
  gender,
}: {
  children: ReactNode;
  className?: string;
  gender: Gender;
}) {
  const mysteryPoolList = getMysteryPoolNames(gender).join(", ");
  const [open, setOpen] = useState(false);
  const listId = useId();

  return (
    <div className={cn("text-[15px] leading-relaxed text-ok-muted", className)}>
      <p>
        {children}{" "}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((v) => !v)}
          className="underline decoration-ok-black/35 underline-offset-[5px] transition-colors hover:text-ok-black hover:decoration-ok-black"
        >
          {open ? "read less" : "read more"}
        </button>
      </p>
      <div
        id={listId}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <p className="overflow-hidden" aria-hidden={!open}>
          <span className="mt-3 block">{mysteryPoolList}.</span>
        </p>
      </div>
    </div>
  );
}
