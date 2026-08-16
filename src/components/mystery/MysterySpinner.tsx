"use client";

import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  generateMysteryReference,
  mysteryOptions,
  mysteryReelItems,
  mysterySizes,
} from "@/data/mystery";
import type { MysteryOption, MysteryResult, Size } from "@/types";
import { SizeSelector } from "@/components/ui/SizeSelector";
import { Button } from "@/components/ui/Button";
import { formatPrice, cn } from "@/lib/utils";
import { useOrderBag } from "@/context/OrderBagContext";

gsap.registerPlugin(useGSAP);

const CARD_W = 140;
const GAP = 12;
const STEP = CARD_W + GAP;

function buildReel(cycles = 6): string[] {
  const base = [...mysteryReelItems];
  const out: string[] = [];
  for (let i = 0; i < cycles; i++) {
    const shuffled = [...base].sort(() => Math.random() - 0.5);
    out.push(...shuffled);
  }
  return out;
}

export function MysterySpinner() {
  const { addItem } = useOrderBag();
  const [option, setOption] = useState<MysteryOption>(mysteryOptions[1]);
  const [size, setSize] = useState<Size | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<MysteryResult | null>(null);
  const [reelItems, setReelItems] = useState(() => buildReel());
  const [error, setError] = useState("");

  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: viewportRef });

  const spin = contextSafe(() => {
    if (spinning) return;
    if (!size) {
      setError("Pick your size first.");
      return;
    }
    setError("");
    setResult(null);
    setSpinning(true);

    const items = buildReel(8);
    setReelItems(items);

    const stopIndex = Math.floor(items.length * 0.72);
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) {
      setSpinning(false);
      return;
    }

    const centerOffset = viewport.offsetWidth / 2 - CARD_W / 2;
    const targetX = -(stopIndex * STEP) + centerOffset;

    gsap.set(track, { x: 0 });
    gsap.to(track, {
      x: targetX,
      duration: 3.2,
      ease: "power3.out",
      onComplete: () => {
        const reference = generateMysteryReference();
        const next: MysteryResult = {
          reference,
          optionId: option.id,
          optionName: option.name,
          size,
          pieceCount: option.pieceCount,
          price: option.price,
        };
        setResult(next);
        setSpinning(false);
      },
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
    });
  }, [addItem, result]);

  const reset = () => {
    setResult(null);
    setError("");
    if (trackRef.current) gsap.set(trackRef.current, { x: 0 });
  };

  return (
    <div className="space-y-10">
      {/* Option pick */}
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-ok-muted">
          1 · Choose combo
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {mysteryOptions.map((opt) => {
            const selected = option.id === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                disabled={spinning}
                onClick={() => {
                  setOption(opt);
                  reset();
                }}
                className={cn(
                  "border p-4 text-left transition-colors",
                  selected
                    ? "border-ok-black bg-ok-black text-ok-off"
                    : "border-ok-line bg-transparent hover:border-ok-black"
                )}
              >
                <p className="font-[family-name:var(--font-display)] text-xl uppercase tracking-tight">
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
          sizes={mysterySizes}
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

      {/* Reel */}
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-ok-muted">
          3 · Spin your combo
        </p>
        <div
          ref={viewportRef}
          className="relative overflow-hidden border border-ok-black bg-ok-charcoal py-6"
        >
          {/* Center marker */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-ok-yellow" />
          <div className="pointer-events-none absolute left-1/2 top-2 z-10 -translate-x-1/2 bg-ok-yellow px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-ok-black">
            Drop
          </div>

          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{ gap: GAP, paddingLeft: 16 }}
          >
            {reelItems.map((label, i) => (
              <div
                key={`${label}-${i}`}
                className="flex shrink-0 items-center justify-center border border-ok-grey bg-ok-ink"
                style={{ width: CARD_W, height: 96 }}
              >
                <span className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.12em] text-ok-off">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ok-charcoal to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ok-charcoal to-transparent" />
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            variant="yellow"
            onClick={spin}
            disabled={spinning}
            className="w-full sm:w-auto sm:min-w-[220px]"
          >
            {spinning ? "Spinning..." : "Spin Your Combo"}
          </Button>
          <p className="text-xs text-ok-muted">
            Exact pieces stay hidden. You get a drop reference only.
          </p>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="border border-ok-black bg-ok-black p-6 text-ok-off animate-rise-in md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ok-yellow">
            Mystery Drop #{result.reference}
          </p>
          <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl uppercase tracking-tight md:text-4xl">
            {result.optionName}
          </h3>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-ok-off/80">
            <span>Size {result.size}</span>
            <span>{result.pieceCount} Pieces</span>
            <span>{formatPrice(result.price)}</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-ok-muted">
            You won&apos;t know until it lands. Add it to your bag and finish via
            Instagram or phone.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button variant="yellow" onClick={addToBag}>
              Add to Order Bag
            </Button>
            <Button variant="outline" onClick={reset} className="border-ok-grey text-ok-off hover:bg-ok-off hover:text-ok-black">
              Spin Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
