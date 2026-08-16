"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useOrderBag } from "@/context/OrderBagContext";
import { brand } from "@/data/brand";
import { formatCartSummary, formatPrice, itemShowsPrice } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";

export function OrderSummary() {
  const { items, total, clearBag } = useOrderBag();
  const [copied, setCopied] = useState(false);

  const summary = formatCartSummary(items);
  const hasComboPrices = items.some(itemShowsPrice);

  const copyOrder = async () => {
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

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold uppercase tracking-tight">
          Nothing in your bag
        </h1>
        <p className="mt-4 text-sm text-ok-muted">
          Save catalog pieces or combo packs, then message us.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <ButtonLink href="/shop" variant="yellow">
            Browse catalog
          </ButtonLink>
          <ButtonLink href="/mystery" variant="outline">
            Mystery Combo
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ok-yellow">
        Almost there
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold uppercase tracking-tight md:text-5xl">
        Order Summary
      </h1>
      <p className="mt-3 max-w-md text-sm text-ok-muted">
        Copy your list, then hit Instagram or WhatsApp. Piece prices on request —
        combo prices are listed.
      </p>

      <div className="mt-10 border-2 border-ok-black bg-ok-black p-6 text-ok-off shadow-[4px_4px_0_#ffde00] md:p-8">
        <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
          {summary}
        </pre>
      </div>

      <ul className="mt-6 divide-y divide-ok-line border-2 border-ok-black">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-4 p-4">
            <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-ok-cream border border-ok-black">
              {item.image ? (
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-ok-charcoal font-mono text-[9px] text-ok-yellow">
                  MYSTERY
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {item.name}
                {item.reference ? ` #${item.reference}` : ""}
              </p>
              <p className="text-[11px] uppercase tracking-wider text-ok-muted">
                Size {item.size} · Qty {item.quantity}
              </p>
            </div>
            <span className="shrink-0 font-mono text-xs uppercase tracking-wide text-ok-muted">
              {itemShowsPrice(item)
                ? formatPrice(item.price * item.quantity)
                : "Ask"}
            </span>
          </li>
        ))}
      </ul>

      {hasComboPrices && (
        <div className="mt-4 flex justify-between border-t border-ok-line pt-4">
          <span className="text-xs uppercase tracking-[0.16em] text-ok-muted">
            Combo total
          </span>
          <span className="font-[family-name:var(--font-display)] text-2xl font-bold">
            {formatPrice(total)}
          </span>
        </div>
      )}

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Button variant="yellow" onClick={copyOrder} className="w-full">
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
          href={brand.contact.instagramUrl}
          variant="primary"
          className="w-full"
        >
          <InstagramIcon className="h-4 w-4" /> Order on Instagram
        </ButtonLink>
        <ButtonLink
          href={brand.contact.whatsappUrl}
          variant="outline"
          className="w-full"
        >
          <WhatsAppIcon className="h-4 w-4" /> Order on WhatsApp
        </ButtonLink>
        <ButtonLink
          href={brand.contact.whatsappCommunityUrl}
          variant="outline"
          className="w-full"
        >
          <WhatsAppIcon className="h-4 w-4" /> WhatsApp Community
        </ButtonLink>
      </div>

      <p className="mt-6 text-center text-xs text-ok-muted">
        Paste the copied order in your DM or WhatsApp.{" "}
        <button
          type="button"
          onClick={clearBag}
          className="underline underline-offset-2 hover:text-ok-black"
        >
          Clear bag
        </button>
        {" · "}
        <Link
          href="/shop"
          className="underline underline-offset-2 hover:text-ok-black"
        >
          Back to catalog
        </Link>
      </p>
    </div>
  );
}
