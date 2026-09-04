import { brand } from "@/data/brand";
import { checkoutPhoneDisplay, deliveryMethodLabels } from "@/data/checkout";
import { getPhoneCountry } from "@/data/countries";
import {
  CATALOG_QUOTE_NOTICE,
  PRICE_NOT_FINAL_NOTICE,
  cartCount,
  cartHasCatalogPieces,
  cartTotal,
  formatPrice,
  formatReceiptDate,
  itemShowsPrice,
  itemTypeLabel,
} from "@/lib/utils";
import type { CartItem, CheckoutDetails } from "@/types";

interface OrderReceiptProps {
  items: CartItem[];
  checkout: CheckoutDetails;
  printedAt?: Date;
}

export function OrderReceipt({
  items,
  checkout,
  printedAt,
}: OrderReceiptProps) {
  const hasCatalog = cartHasCatalogPieces(items);
  const hasCombos = items.some(itemShowsPrice);
  const comboTotal = cartTotal(items);
  const count = cartCount(items);
  const dateLabel = formatReceiptDate(printedAt);
  const hasContact =
    checkout.email.trim().length > 0 || checkout.phone.trim().length > 0;
  const phone = checkoutPhoneDisplay(checkout);
  const country = getPhoneCountry(checkout.phoneCountry);

  return (
    <article className="receipt-sheet mx-auto w-full max-w-[640px] bg-white text-ok-black">
      <header className="border-b-2 border-ok-black pb-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${brand.printLogo}?v=2`}
              alt={brand.registeredName}
              height={36}
              decoding="async"
              draggable={false}
              className="block h-9 w-auto max-w-none select-none object-contain object-center"
            />
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ok-muted">
              Order receipt
            </p>
          </div>
          <p className="shrink-0 text-right font-mono text-[11px] text-ok-muted">
            {dateLabel}
          </p>
        </div>
        <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-ok-muted">
          Snapshot of your bag. Not a payment confirmation
        </p>
      </header>

      {(hasContact || checkout.deliveryMethod) && (
        <section className="grid gap-5 border-b border-dashed border-ok-line py-5 sm:grid-cols-2">
          {hasContact && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ok-muted">
                Contact
              </p>
              {checkout.email.trim() ? (
                <p className="mt-2 text-sm">{checkout.email.trim()}</p>
              ) : null}
              {checkout.phone.trim() ? (
                <p className="mt-1 text-sm">
                  {phone || checkout.phone.trim()}
                  {country ? ` · ${country.name}` : ""}
                </p>
              ) : null}
            </div>
          )}
          {checkout.deliveryMethod && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ok-muted">
                Delivery
              </p>
              <p className="mt-2 text-sm">
                {deliveryMethodLabels[checkout.deliveryMethod]}
              </p>
              {checkout.city.trim() ? (
                <p className="mt-1 text-sm">{checkout.city.trim()}</p>
              ) : null}
              {checkout.details.trim() ? (
                <p className="mt-1 text-sm">{checkout.details.trim()}</p>
              ) : null}
            </div>
          )}
        </section>
      )}

      <section className="py-5">
        <div className="mb-3 grid grid-cols-[1fr_auto] gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ok-muted">
          <span>Item</span>
          <span>Price</span>
        </div>
        <ul className="divide-y divide-ok-line border-y border-ok-line">
          {items.map((item, index) => (
            <li
              key={item.id}
              className="grid grid-cols-[1fr_auto] gap-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium leading-snug">
                  {index + 1}. {item.name}
                  {item.reference ? ` #${item.reference}` : ""}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ok-muted">
                  {itemTypeLabel(item.type)}
                  {" · "}Size {item.size}
                  {" · "}Qty {item.quantity}
                  {item.pieceCount ? ` · ${item.pieceCount} pieces` : ""}
                  {item.gender ? ` · ${item.gender}` : ""}
                </p>
              </div>
              <p className="shrink-0 font-mono text-sm">
                {itemShowsPrice(item)
                  ? formatPrice(item.price * item.quantity)
                  : "On request"}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2 border-b-2 border-ok-black pb-5">
        <div className="flex justify-between text-sm">
          <span className="text-ok-muted">Items</span>
          <span className="font-mono">{count}</span>
        </div>
        {hasCombos && (
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm text-ok-muted">
              Shown total
            </span>
            <span className="font-display text-2xl font-bold">
              {formatPrice(comboTotal)}
            </span>
          </div>
        )}
        {hasCatalog && (
          <div className="flex justify-between text-sm">
            <span className="text-ok-muted">Catalog pieces</span>
            <span className="font-mono uppercase tracking-wide">
              Quote in chat
            </span>
          </div>
        )}
        <p className="pt-1 text-right font-display text-lg font-bold uppercase tracking-wide">
          Not a final price
        </p>
      </section>

      <aside className="mt-5 border-l-4 border-ok-yellow bg-ok-cream/80 px-4 py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ok-muted">
          Important
        </p>
        <p className="mt-2 text-sm leading-relaxed">{PRICE_NOT_FINAL_NOTICE}</p>
        {hasCatalog && (
          <p className="mt-2 text-sm leading-relaxed">{CATALOG_QUOTE_NOTICE}</p>
        )}
      </aside>

      <footer className="mt-8 flex items-end justify-between gap-4 border-t border-dashed border-ok-line pt-4">
        <p className="max-w-[280px] text-[11px] leading-relaxed text-ok-muted">
          Keep this copy. Final amount, stock, and next steps are confirmed in
          chat, not on this page.
        </p>
        <p className="font-display text-sm font-bold tracking-tight">
          {brand.shortName}
          <span className="ml-0.5 text-ok-yellow">®</span>
        </p>
      </footer>
    </article>
  );
}
