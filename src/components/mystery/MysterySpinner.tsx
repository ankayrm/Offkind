"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Check, Copy } from "lucide-react";
import {
  generateMysteryReference,
  getMysteryOptionsByGender,
  mysterySizesByGender,
} from "@/data/mystery";
import { MysteryPoolReadMore } from "@/components/mystery/MysteryPoolReadMore";
import type { MysteryOption, MysteryResult, Size } from "@/types";
import type { Gender } from "@/lib/gender";
import { SizeSelector } from "@/components/ui/SizeSelector";
import { Button } from "@/components/ui/Button";
import { formatPrice, cn } from "@/lib/utils";
import { useOrderBag } from "@/context/OrderBagContext";

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
  const [option, setOption] = useState<MysteryOption | null>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<MysteryResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);
  const [displayDigits, setDisplayDigits] = useState("0000");
  const displayPrefix = gender === "women" ? "OTW" : "OTM";

  const rootRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<HTMLParagraphElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const laterRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: rootRef });

  const generate = contextSafe((picked: MysteryOption, pickedSize: Size) => {
    tweenRef.current?.kill();
    setCopied(false);
    setAdded(false);
    setResult(null);
    setGenerating(true);

    const reference = generateMysteryReference(gender);
    const landed = splitReference(reference);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      setDisplayDigits(landed.digits);
      setResult({
        reference,
        optionId: picked.id,
        optionName: picked.name,
        size: pickedSize,
        pieceCount: picked.pieceCount,
        price: picked.price,
      });
      setGenerating(false);
      const digitsEl = digitsRef.current;
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
    tweenRef.current = gsap.to(ticker, {
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

  const pickCombo = (opt: MysteryOption) => {
    if (option?.id === opt.id) return;
    tweenRef.current?.kill();
    setOption(opt);
    setResult(null);
    setCopied(false);
    setAdded(false);
    setGenerating(false);
    setDisplayDigits("0000");
    if (size) {
      generate(opt, size);
    } else {
      requestAnimationFrame(() => {
        laterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  const pickSize = (next: Size) => {
    if (size === next) return;
    setSize(next);
    if (option) generate(option, next);
  };

  const addToBag = useCallback(() => {
    if (!result || !option) return;
    addItem({
      type: "mystery",
      name: "Mystery Combo Fit",
      price: result.price,
      size: result.size,
      reference: result.reference,
      pieceCount: result.pieceCount,
      mysteryOptionId: result.optionId,
      image: option.image,
      gender,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }, [addItem, result, option, gender]);

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

  return (
    <div ref={rootRef} className="space-y-10">
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-ok-muted">
          1 · Choose your combo
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {options.map((opt) => {
            const selected = option?.id === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => pickCombo(opt)}
                className={cn(
                  "overflow-hidden text-left transition-colors ring-1 ring-inset",
                  selected
                    ? "bg-ok-black text-ok-off ring-ok-black"
                    : "bg-transparent ring-ok-line hover:ring-ok-black"
                )}
              >
                <div className="relative aspect-square bg-white">
                  <Image
                    src={opt.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 90vw, 280px"
                    className="object-contain p-3 md:p-4"
                  />
                </div>
                <div className="p-5">
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
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {!option ? (
        <p className="max-w-xl border-l-2 border-ok-yellow pl-4 text-[15px] leading-relaxed text-ok-black">
          Pick a combo first. Your drop number is generated after that — once
          you also set your size.
        </p>
      ) : (
        <div ref={laterRef} className="space-y-10">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-ok-muted">
              2 · Your size
            </p>
            <p className="mb-4 text-sm text-ok-muted">
              {option.name} · {formatPrice(option.price)} · {option.pieceCount}{" "}
              pieces. Size is for every piece in the fit.
            </p>
            <SizeSelector sizes={sizes} value={size} onChange={pickSize} />
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-ok-muted">
              3 · Your drop number
            </p>
            <p className="mb-6 max-w-xl text-[13px] leading-relaxed text-ok-muted">
              {size
                ? "A unique ID for this combo and size. We pack the surprise against it."
                : "Choose a size and we generate a unique drop number for this combo."}
            </p>

            <div
              ref={boardRef}
              className="relative overflow-hidden bg-ok-charcoal px-6 py-10 text-center md:py-14"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ok-yellow">
                {result
                  ? "Your drop number"
                  : generating
                    ? "Generating"
                    : "Drop number"}
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
                  ? "Keep this number. Add it to your bag, then pay at checkout."
                  : generating
                    ? "Locking in your combo..."
                    : "Waiting on your size."}
              </p>
            </div>

            {result && option && size && (
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  variant="yellow"
                  onClick={addToBag}
                  className="w-full sm:w-auto sm:min-w-[220px]"
                >
                  {added ? "Added ✓" : "Add to bag"}
                </Button>
                <Button
                  variant="outline"
                  onClick={copyNumber}
                  className="w-full sm:w-auto"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy number"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => generate(option, size)}
                  disabled={generating}
                  className="w-full sm:w-auto"
                >
                  Get a new number
                </Button>
              </div>
            )}
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-ok-muted">
              4 · What&apos;s included
            </p>
            <MysteryPoolReadMore className="max-w-xl" gender={gender}>
              Pieces are pulled at random from this pool. You get{" "}
              {option.pieceCount} in this combo. You will not know which ones
              until they land.
            </MysteryPoolReadMore>
          </div>
        </div>
      )}
    </div>
  );
}
