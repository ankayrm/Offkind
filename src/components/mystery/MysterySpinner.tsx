"use client";

import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Check, Copy } from "lucide-react";
import {
  generateMysteryReference,
  getMysteryOptionsByGender,
  mysterySizesByGender,
} from "@/data/mystery";
import type { MysteryOption, MysteryResult, Size } from "@/types";
import type { Gender } from "@/lib/gender";
import { SizeSelector } from "@/components/ui/SizeSelector";
import { Button, ButtonLink } from "@/components/ui/Button";
import { formatPrice, cn, formatMysteryWhatsApp, whatsappUrl } from "@/lib/utils";
import { useOrderBag } from "@/context/OrderBagContext";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

gsap.registerPlugin(useGSAP);

function splitReference(reference: string) {
  const [prefix, digits] = reference.split("-");
  return { prefix: prefix ?? "OT", digits: digits ?? "0000" };
}

function randomDigits() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export function MysterySpinner({ gender }: { gender: Gender }) {
  const { addItem } = useOrderBag();
  const options = getMysteryOptionsByGender(gender);
  const sizes = mysterySizesByGender[gender];
  const [option, setOption] = useState<MysteryOption>(options[1] ?? options[0]);
  const [size, setSize] = useState<Size | null>(null);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<MysteryResult | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [displayDigits, setDisplayDigits] = useState("0000");
  const displayPrefix = gender === "women" ? "OTW" : "OTM";

  const boardRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<HTMLParagraphElement>(null);
  const { contextSafe } = useGSAP({ scope: boardRef });

  const generate = contextSafe(() => {
    if (generating) return;
    if (!size) {
      setError("Pick your size first.");
      return;
    }
    setError("");
    setResult(null);
    setCopied(false);
    setGenerating(true);

    const reference = generateMysteryReference(gender);
    const landed = splitReference(reference);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const digitsEl = digitsRef.current;

    const finish = () => {
      setDisplayDigits(landed.digits);
      setResult({
        reference,
        optionId: option.id,
        optionName: option.name,
        size,
        pieceCount: option.pieceCount,
        price: option.price,
      });
      setGenerating(false);
      if (digitsEl) {
        gsap.fromTo(
          digitsEl,
          { scale: 1.08 },
          { scale: 1, duration: 0.35, ease: "power3.out" }
        );
      }
    };

    if (reduce) {
      finish();
      return;
    }

    const ticker = { n: 0 };
    let lastTick = -1;
    gsap.to(ticker, {
      n: 24,
      duration: 1.6,
      ease: "power3.out",
      onUpdate: () => {
        const tick = Math.floor(ticker.n);
        if (tick === lastTick) return;
        lastTick = tick;
        setDisplayDigits(randomDigits());
      },
      onComplete: finish,
    });
  });

  const addToBag = useCallback(() => {
    if (!result) return;
    addItem({
      type: "mystery",
      name: `Mystery Drop`,
      price: result.price,
      size: result.size,
      reference: result.reference,
      pieceCount: result.pieceCount,
      mysteryOptionId: result.optionId,
      gender,
    });
  }, [addItem, result, gender]);

  const copyNumber = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.reference);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = result.reference;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result]);

  const reset = () => {
    setResult(null);
    setError("");
    setCopied(false);
    setDisplayDigits("0000");
  };

  return (
    <div className="space-y-10">
      {/* Option pick */}
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-ok-muted">
          1 · Choose combo
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {options.map((opt) => {
            const selected = option.id === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                disabled={generating}
                onClick={() => {
                  setOption(opt);
                  reset();
                }}
                className={cn(
                  "p-5 text-left transition-colors ring-1 ring-inset",
                  selected
                    ? "bg-ok-black text-ok-off ring-ok-black"
                    : "bg-transparent ring-ok-line hover:ring-ok-black"
                )}
              >
                <p className="font-display text-xl font-bold tracking-tight">
                  {opt.name}
                </p>
                <p className="mt-1 font-mono text-sm">
                  {formatPrice(opt.price)} · {opt.pieceCount} pcs
                </p>
                <p
                  className={cn(
                    "mt-2 text-xs leading-relaxed",
                    selected ? "text-ok-off/70" : "text-ok-muted"
                  )}
                >
                  {opt.tagline}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Size */}
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-ok-muted">
          2 · Your size
        </p>
        <SizeSelector
          sizes={sizes}
          value={size}
          onChange={(s) => {
            setSize(s);
            setError("");
            if (result) reset();
          }}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>

      {/* Number */}
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-ok-muted">
          3 · Get your number
        </p>

        <div className="mb-6 max-w-xl space-y-3 text-[15px] leading-relaxed text-ok-muted">
          <p>
            Pick your combo and size, then generate a unique drop number.
            Send that number to us on WhatsApp — the message is already written.
            Just hit send. We pack a surprise fit around it. You don&apos;t see
            the pieces until they land. That&apos;s the point.
          </p>
        </div>

        <div ref={boardRef} className="relative overflow-hidden bg-ok-charcoal px-6 py-10 text-center md:py-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ok-yellow">
            {result ? "Your drop number" : generating ? "Generating" : "Drop number"}
          </p>
          <p
            ref={digitsRef}
            className={cn(
              "mt-4 font-display text-5xl font-bold tracking-[0.12em] text-ok-off md:text-7xl",
              !result && !generating && "opacity-35"
            )}
            aria-live="polite"
          >
            {displayPrefix}-{displayDigits}
          </p>
          <p className="mx-auto mt-4 max-w-sm text-sm text-ok-off/55">
            {result
              ? "Send this number to us. We use it to pack your surprise."
              : "Hit the button. We give you a number. You send it. We send the surprise."}
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            variant="yellow"
            onClick={generate}
            disabled={generating}
            className="w-full sm:w-auto sm:min-w-[220px]"
          >
            {generating ? "Generating..." : result ? "Get a new number" : "Get Your Number"}
          </Button>
          {result && (
            <Button
              variant="outline"
              onClick={copyNumber}
              className="w-full sm:w-auto"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy number"}
            </Button>
          )}
        </div>

        <p className="mt-6 max-w-xl border-l-2 border-ok-yellow pl-4 text-[15px] leading-relaxed text-ok-black">
          Never once — across every Mystery order we&apos;ve completed — has a
          customer come back and said it wasn&apos;t worth it.
        </p>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-ok-black p-7 text-ok-off animate-rise-in md:p-9">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ok-yellow">
            Mystery Drop #{result.reference}
          </p>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            {result.optionName}
          </h3>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-ok-off/80">
            <span>Size {result.size}</span>
            <span>{result.pieceCount} Pieces</span>
            <span>{formatPrice(result.price)}</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-ok-muted">
            Tap WhatsApp — your drop number and combo details are already in the
            message. Just hit send.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={whatsappUrl(formatMysteryWhatsApp(result, gender))}
              variant="yellow"
            >
              <WhatsAppIcon className="h-4 w-4" /> Send on WhatsApp
            </ButtonLink>
            <Button
              variant="outline"
              onClick={addToBag}
              className="border-ok-grey text-ok-off hover:bg-ok-off hover:text-ok-black"
            >
              Add to Order Bag
            </Button>
            <Button
              variant="outline"
              onClick={reset}
              className="border-ok-grey text-ok-off hover:bg-ok-off hover:text-ok-black"
            >
              Start over
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
