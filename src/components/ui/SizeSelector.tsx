"use client";

import { cn } from "@/lib/utils";
import type { Size } from "@/types";

interface SizeSelectorProps {
  sizes: Size[];
  value: Size | null;
  onChange: (size: Size) => void;
  className?: string;
  label?: string;
}

export function SizeSelector({
  sizes,
  value,
  onChange,
  className,
  label = "Size",
}: SizeSelectorProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between">
        <span className="text-xs uppercase tracking-[0.18em] text-ok-muted">
          {label}
        </span>
        {value && (
          <span className="font-mono text-xs text-ok-black">{value}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const selected = value === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => onChange(size)}
              className={cn(
                "min-w-11 h-11 px-3 text-sm font-medium transition-colors duration-200 ring-1 ring-inset",
                selected
                  ? "bg-ok-black text-ok-off ring-ok-black"
                  : "bg-transparent text-ok-black ring-ok-line hover:ring-ok-black"
              )}
              aria-pressed={selected}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
