"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Minus, Plus, X } from "lucide-react";
import { useOrderBag } from "@/context/OrderBagContext";
import { formatPrice, itemShowsPrice } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";

export function OrderDrawer() {
  const {
    items,
    total,
    count,
    isOpen,
    closeBag,
    removeItem,
    updateQuantity,
  } = useOrderBag();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBag();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeBag]);

  if (!isOpen) return null;

  const hasComboPrices = items.some(itemShowsPrice);
  const lastGender = [...items].reverse().find((item) => item.gender)?.gender;
  const catalogHref = lastGender ? `/${lastGender}/shop` : "/";

  return (
    <div className="fixed inset-0 z-[70] print:hidden">
      <div
        className="absolute inset-0 bg-ok-black/50 animate-fade-in"
        onClick={closeBag}
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ok-off shadow-2xl animate-drawer-in">
        <div className="flex h-16 items-center justify-between border-b border-ok-line px-5">
          <div>
            <p className="font-display text-lg font-bold tracking-tight">
              Order Bag
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ok-muted">
              {count} {count === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            type="button"
            onClick={closeBag}
            aria-label="Close bag"
            className="flex h-10 w-10 items-center justify-center"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
              <p className="font-display text-2xl font-bold tracking-tight">
                Bag is empty
              </p>
              <p className="max-w-[220px] text-sm text-ok-muted">
                Save catalog pieces or combo packs, then hit us up.
              </p>
              <Button variant="outline" onClick={closeBag} className="mt-2">
                Keep browsing
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 border-b border-ok-line pb-4"
                >
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-ok-cream">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-ok-black font-mono text-[10px] text-ok-yellow">
                        MYSTERY
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium leading-snug">
                          {item.name}
                          {item.reference ? (
                            <span className="mt-0.5 block font-mono text-[11px] text-ok-muted">
                              #{item.reference}
                            </span>
                          ) : null}
                        </p>
                        <p className="mt-1 text-[11px] uppercase tracking-wider text-ok-muted">
                          Size {item.size}
                          {item.gender
                            ? ` · ${item.gender}`
                            : ""}
                          {item.pieceCount
                            ? ` · ${item.pieceCount} pieces`
                            : ""}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-ok-muted transition-colors hover:text-ok-black"
                        aria-label="Remove"
                      >
                        <X className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center ring-1 ring-inset ring-ok-line">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          aria-label="Decrease"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center font-mono text-xs">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          aria-label="Increase"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-mono text-xs uppercase tracking-wide text-ok-muted">
                        {itemShowsPrice(item)
                          ? formatPrice(item.price * item.quantity)
                          : "Ask"}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-3 border-t border-ok-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {hasComboPrices ? (
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.16em] text-ok-muted">
                  Shown total (combos / mystery)
                </span>
                <span className="font-display text-2xl font-bold">
                  {formatPrice(total)}
                </span>
              </div>
            ) : (
              <p className="text-xs text-ok-muted">
                Piece prices via Instagram or WhatsApp.
              </p>
            )}
            <p className="text-[11px] leading-relaxed text-ok-muted">
              This total is not final. Catalog pieces that need an official
              quote are confirmed in chat. Add contact details, location, and
              delivery on the next step — required to send.
            </p>
            <ButtonLink
              href="/order"
              variant="yellow"
              className="w-full"
              onClick={closeBag}
            >
              Complete order
            </ButtonLink>
            <ButtonLink
              href="/order#order-receipt"
              variant="outline"
              className="w-full"
              onClick={closeBag}
            >
              View / print receipt
            </ButtonLink>
            <Link
              href={catalogHref}
              onClick={closeBag}
              className="block text-center text-[11px] uppercase tracking-[0.16em] text-ok-muted hover:text-ok-black"
            >
              Back to catalog
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
