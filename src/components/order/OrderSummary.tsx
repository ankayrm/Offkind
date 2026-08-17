"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Copy, Minus, Plus, Printer, X } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { CheckoutForm } from "@/components/order/CheckoutForm";
import { OrderReceipt } from "@/components/order/OrderReceipt";
import { useOrderBag } from "@/context/OrderBagContext";
import { brand } from "@/data/brand";
import {
  CATALOG_QUOTE_NOTICE,
  PRICE_NOT_FINAL_NOTICE,
  cartHasCatalogPieces,
  formatCartSummary,
  formatPrice,
  itemShowsPrice,
} from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";

export function OrderSummary() {
  const {
    items,
    total,
    clearBag,
    checkout,
    updateCheckout,
    checkoutComplete,
    removeItem,
    updateQuantity,
  } = useOrderBag();
  const [copied, setCopied] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const lastGender = [...items].reverse().find((item) => item.gender)?.gender;
  const catalogHref = lastGender ? `/${lastGender}/shop` : "/";
  const summary = formatCartSummary(items, checkout);
  const hasComboPrices = items.some(itemShowsPrice);
  const hasCatalogPieces = cartHasCatalogPieces(items);

  const copyOrder = async () => {
    if (!checkoutComplete) {
      setShowErrors(true);
      return;
    }
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = summary;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const blockIfIncomplete = () => {
    if (checkoutComplete) return;
    setShowErrors(true);
  };

  const printReceipt = () => {
    window.print();
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight">
          Nothing in your bag
        </h1>
        <p className="mt-4 text-sm text-ok-muted">
          Save catalog pieces or combo packs, then message us.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <ButtonLink href="/men" variant="yellow">
            Shop men
          </ButtonLink>
          <ButtonLink href="/women" variant="outline">
            Shop women
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-10 print:hidden md:px-6 md:py-16">
      <p className="kicker">Almost there</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
        Order Summary
      </h1>
      <p className="mt-3 max-w-md text-sm text-ok-muted">
        Add your contact details, location, and how you receive the order. Then
        tap WhatsApp — the full list is already in the message. Print a receipt
        to keep. That total is not final.
      </p>

      <ul className="mt-10 divide-y divide-ok-line ring-1 ring-inset ring-ok-line">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4 p-4">
            <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-ok-cream">
              {item.image ? (
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-ok-charcoal font-mono text-[9px] text-ok-yellow">
                  MYSTERY
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-snug">
                    {item.name}
                    {item.reference ? ` #${item.reference}` : ""}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-ok-muted">
                    Size {item.size}
                    {item.pieceCount ? ` · ${item.pieceCount} pieces` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="shrink-0 text-ok-muted transition-colors hover:text-ok-black"
                  aria-label={`Remove ${item.name}`}
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-center ring-1 ring-inset ring-ok-line">
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center font-mono text-xs">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <span className="shrink-0 font-mono text-xs uppercase tracking-wide text-ok-muted">
                  {itemShowsPrice(item)
                    ? formatPrice(item.price * item.quantity)
                    : "Ask"}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {hasComboPrices && (
        <div className="mt-4 flex justify-between border-t border-ok-line pt-4">
          <span className="text-xs uppercase tracking-[0.16em] text-ok-muted">
            Shown total (combos / mystery)
          </span>
          <span className="font-display text-2xl font-bold">
            {formatPrice(total)}
          </span>
        </div>
      )}
      <p className="mt-3 text-sm leading-relaxed text-ok-muted">
        {PRICE_NOT_FINAL_NOTICE}
        {hasCatalogPieces ? ` ${CATALOG_QUOTE_NOTICE}` : ""}
      </p>

      <CheckoutForm
        value={checkout}
        onChange={(next) => {
          updateCheckout(next);
          if (showErrors) setShowErrors(false);
        }}
        showErrors={showErrors}
      />

      <section
        id="order-receipt"
        className="mt-10 scroll-mt-28 print:hidden"
      >
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="kicker">Keep a copy</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
              Your receipt
            </h2>
          </div>
          <Button variant="outline" onClick={printReceipt} className="shrink-0">
            <Printer className="h-4 w-4" /> Print
          </Button>
        </div>
        <div className="ring-1 ring-inset ring-ok-line">
          <div className="p-5 md:p-8">
            <OrderReceipt items={items} checkout={checkout} />
          </div>
        </div>
      </section>

      <div className="mt-8 bg-ok-black p-6 text-ok-off md:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ok-yellow">
          Message preview
        </p>
        <pre className="mt-3 whitespace-pre-wrap font-mono text-sm leading-relaxed">
          {summary}
        </pre>
      </div>

      {!checkoutComplete && (
        <p className="mt-4 text-sm text-ok-muted">
          Checkout is required. Add your email, phone, delivery method, and
          location before you can send.
        </p>
      )}

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {checkoutComplete ? (
          <WhatsAppLink variant="yellow" className="w-full">
            <WhatsAppIcon className="h-4 w-4" /> Send order on WhatsApp
          </WhatsAppLink>
        ) : (
          <Button
            variant="yellow"
            className="w-full"
            onClick={blockIfIncomplete}
          >
            <WhatsAppIcon className="h-4 w-4" /> Send order on WhatsApp
          </Button>
        )}
        {checkoutComplete ? (
          <ButtonLink
            href={brand.contact.instagramUrl}
            variant="primary"
            className="w-full"
          >
            <InstagramIcon className="h-4 w-4" /> Order on Instagram
          </ButtonLink>
        ) : (
          <Button
            variant="primary"
            className="w-full"
            onClick={blockIfIncomplete}
          >
            <InstagramIcon className="h-4 w-4" /> Order on Instagram
          </Button>
        )}
        <Button variant="outline" onClick={printReceipt} className="w-full">
          <Printer className="h-4 w-4" /> Print receipt
        </Button>
        <Button variant="outline" onClick={copyOrder} className="w-full">
          {copied ? (
            <>
              <Check className="h-4 w-4" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" /> Copy Order
            </>
          )}
        </Button>
        <ButtonLink
          href={brand.contact.whatsappCommunityUrl}
          variant="outline"
          className="w-full sm:col-span-2"
        >
          <WhatsAppIcon className="h-4 w-4" /> WhatsApp Community
        </ButtonLink>
      </div>

      <p className="mt-6 text-center text-xs text-ok-muted">
        WhatsApp opens with your order already written.{" "}
        <button
          type="button"
          onClick={clearBag}
          className="underline underline-offset-2 hover:text-ok-black"
        >
          Clear bag
        </button>
        {" · "}
        <Link
          href={catalogHref}
          className="underline underline-offset-2 hover:text-ok-black"
        >
          Back to catalog
        </Link>
      </p>
      </div>
      <div className="hidden print:block">
        <OrderReceipt items={items} checkout={checkout} />
      </div>
    </>
  );
}
