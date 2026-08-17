"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  countryFlag,
  getPhoneCountry,
  phoneCountries,
} from "@/data/countries";

interface PhoneCountrySelectProps {
  value: string;
  onChange: (iso: string) => void;
  invalid?: boolean;
  embedded?: boolean;
}

export function PhoneCountrySelect({
  value,
  onChange,
  invalid = false,
  embedded = false,
}: PhoneCountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const country = getPhoneCountry(value);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    searchRef.current?.focus();
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return phoneCountries;
    return phoneCountries.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.iso.toLowerCase().includes(q) ||
        item.dial.includes(q.replace(/^\+/, ""))
    );
  }, [query]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-label="Select country"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex h-full min-w-[7.5rem] items-center gap-2 bg-white px-3 py-3 text-left text-[15px] outline-none transition-shadow",
          embedded
            ? "ring-0"
            : invalid
              ? "ring-1 ring-inset ring-red-600"
              : cn(
                  "ring-1 ring-inset ring-ok-line hover:ring-ok-black",
                  open && "ring-ok-black"
                )
        )}
      >
        <span aria-hidden className="text-base leading-none">
          {countryFlag(country.iso)}
        </span>
        <span className="font-mono text-xs">+{country.dial}</span>
        <ChevronDown
          className={cn(
            "ml-auto h-3.5 w-3.5 shrink-0 text-ok-muted transition-transform",
            open && "rotate-180"
          )}
          strokeWidth={1.5}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-1 w-[min(100vw-2.5rem,20rem)] bg-ok-off shadow-xl ring-1 ring-inset ring-ok-line">
          <div className="border-b border-ok-line px-3 py-2">
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country"
              aria-label="Search country"
              className="w-full bg-transparent text-[15px] outline-none placeholder:text-ok-muted"
            />
          </div>
          <ul
            role="listbox"
            aria-label="Country"
            className="max-h-64 overflow-y-auto py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-3 text-sm text-ok-muted">
                No country matched.
              </li>
            ) : (
              filtered.map((item) => {
                const selected = item.iso === country.iso;
                return (
                  <li key={item.iso}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        onChange(item.iso);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors",
                        selected
                          ? "bg-ok-black text-ok-off"
                          : "hover:bg-ok-cream"
                      )}
                    >
                      <span aria-hidden className="w-6 text-base leading-none">
                        {countryFlag(item.iso)}
                      </span>
                      <span className="min-w-0 flex-1 truncate">{item.name}</span>
                      <span
                        className={cn(
                          "font-mono text-xs",
                          selected ? "text-ok-off/70" : "text-ok-muted"
                        )}
                      >
                        +{item.dial}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
