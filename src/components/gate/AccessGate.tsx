"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Button } from "@/components/ui/Button";
import { brand } from "@/data/brand";
import { ACCESS_SESSION_KEY, ACCESS_TOKEN, safeNextPath } from "@/lib/access-gate";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const SLOTS = 3;

export function AccessGate({ nextPath }: { nextPath: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [chars, setChars] = useState<string[]>(["", "", ""]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(ACCESS_SESSION_KEY) === ACCESS_TOKEN) {
      window.location.replace(safeNextPath(nextPath));
    }
  }, [nextPath]);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const nodes = rootRef.current?.querySelectorAll("[data-gate-enter]");
      if (nodes?.length) {
        if (reduce) {
          gsap.set(nodes, { opacity: 1, y: 0 });
        } else {
          gsap.fromTo(
            nodes,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              delay: 0.08,
            }
          );
        }
      }
      inputsRef.current[0]?.focus();
    },
    { scope: rootRef }
  );

  function focusSlot(index: number) {
    inputsRef.current[index]?.focus();
    inputsRef.current[index]?.select();
  }

  function updateSlot(index: number, raw: string) {
    const letter = raw.replace(/[^a-zA-Z0-9]/g, "").slice(-1).toUpperCase();
    const next = [...chars];
    next[index] = letter;
    setChars(next);
    setError("");
    if (letter && index < SLOTS - 1) focusSlot(index + 1);
    if (letter && index === SLOTS - 1 && next.every(Boolean)) {
      void submitCode(next.join(""));
    }
  }

  function onKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !chars[index] && index > 0) {
      event.preventDefault();
      const next = [...chars];
      next[index - 1] = "";
      setChars(next);
      focusSlot(index - 1);
    }
    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusSlot(index - 1);
    }
    if (event.key === "ArrowRight" && index < SLOTS - 1) {
      event.preventDefault();
      focusSlot(index + 1);
    }
  }

  function onPaste(raw: string) {
    const letters = raw
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, SLOTS)
      .split("");
    if (!letters.length) return;
    const next = ["", "", ""];
    letters.forEach((letter, i) => {
      next[i] = letter;
    });
    setChars(next);
    setError("");
    focusSlot(Math.min(letters.length, SLOTS - 1));
    if (letters.length === SLOTS) void submitCode(next.join(""));
  }

  async function submitCode(code: string) {
    if (pending) return;
    const trimmed = code.replace(/\s+/g, "");
    if (trimmed.length < SLOTS) {
      setError("Enter the 3-letter code.");
      focusSlot(trimmed.length);
      return;
    }

    setPending(true);
    setError("");
    try {
      const res = await fetch("/api/gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmed }),
      });
      if (!res.ok) {
        shake();
        setChars(["", "", ""]);
        setError("Wrong code.");
        focusSlot(0);
        return;
      }
      sessionStorage.setItem(ACCESS_SESSION_KEY, ACCESS_TOKEN);
      window.location.assign(safeNextPath(nextPath));
    } catch {
      setError("Could not check the code. Try again.");
    } finally {
      setPending(false);
    }
  }

  function shake() {
    const el = formRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      el,
      { x: -10 },
      { x: 0, duration: 0.45, ease: "elastic.out(1, 0.45)" }
    );
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void submitCode(chars.join(""));
  }

  return (
    <div
      ref={rootRef}
      className="ok-grain relative flex min-h-[100svh] flex-col items-center justify-center bg-ok-black px-5 py-16 text-ok-off"
    >
      <div className="relative z-[2] flex w-full max-w-sm flex-col items-center text-center">
        <div data-gate-enter>
          <BrandLogo href={false} className="h-10 md:h-12" />
        </div>
        <p
          data-gate-enter
          className="mt-10 font-mono text-[10px] uppercase tracking-[0.28em] text-ok-yellow"
        >
          Private access
        </p>
        <h1
          data-gate-enter
          className="mt-3 font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-5xl"
        >
          Enter code
        </h1>
        <p
          data-gate-enter
          className="mt-4 max-w-[22rem] text-[13px] leading-relaxed text-ok-off/55 md:text-sm"
        >
          This catalog is locked. Type the 3-letter code to walk in.
        </p>

        <form
          ref={formRef}
          data-gate-enter
          onSubmit={onSubmit}
          className="mt-10 w-full"
        >
          <div className="flex justify-center gap-3">
            {chars.map((char, index) => (
              <input
                key={index}
                ref={(node) => {
                  inputsRef.current[index] = node;
                }}
                value={char}
                onChange={(event) => updateSlot(index, event.target.value)}
                onKeyDown={(event) => onKeyDown(index, event)}
                onPaste={(event) => {
                  event.preventDefault();
                  onPaste(event.clipboardData.getData("text"));
                }}
                onFocus={(event) => event.target.select()}
                autoComplete="off"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
                inputMode="text"
                maxLength={1}
                aria-label={`Code letter ${index + 1}`}
                className={cn(
                  "h-[4.25rem] w-[3.35rem] border bg-transparent text-center font-display text-3xl font-extrabold uppercase tracking-tight text-ok-off outline-none transition-colors md:h-[4.75rem] md:w-[3.75rem] md:text-4xl",
                  error
                    ? "border-ok-yellow"
                    : "border-white/25 focus:border-ok-yellow"
                )}
              />
            ))}
          </div>
          <p
            className="mt-4 min-h-[1.25rem] font-mono text-[11px] uppercase tracking-[0.16em] text-ok-yellow"
            role="status"
            aria-live="polite"
          >
            {error}
          </p>
          <Button
            type="submit"
            variant="yellow"
            disabled={pending}
            className="mt-2 w-full"
          >
            {pending ? "Checking" : "Enter"}
          </Button>
        </form>

        <a
          data-gate-enter
          href={brand.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-ok-off/40 transition-colors hover:text-ok-yellow"
        >
          No code? Ask on Instagram
        </a>
      </div>
    </div>
  );
}
