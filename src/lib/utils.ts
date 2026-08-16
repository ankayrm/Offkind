import { brand } from "@/data/brand";
import type { CartItem } from "@/types";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(amount: number): string {
  return `${brand.currencySymbol}${amount}`;
}

/** Individual pieces are catalog-only — prices only on combo / mystery items */
export function itemShowsPrice(item: CartItem): boolean {
  return item.type === "bundle" || item.type === "mystery";
}

export function formatCartSummary(items: CartItem[]): string {
  const lines = items.map((item) => {
    const qty = item.quantity > 1 ? ` ×${item.quantity}` : "";
    const ref = item.reference ? ` #${item.reference}` : "";
    const priceBit = itemShowsPrice(item)
      ? ` — ${formatPrice(item.price * item.quantity)}`
      : " — ask for price";
    return `${item.name}${ref} — Size ${item.size}${qty}${priceBit}`;
  });

  const comboTotal = cartTotal(items);
  const hasPieces = items.some((i) => !itemShowsPrice(i));
  const hasCombos = items.some((i) => itemShowsPrice(i));

  const footer: string[] = [];
  if (hasCombos) {
    footer.push(`Combo total: ${formatPrice(comboTotal)}`);
  }
  if (hasPieces) {
    footer.push("Piece prices: DM / WhatsApp");
  }
  if (!hasCombos && !hasPieces) {
    footer.push("Empty order");
  }

  return ["OFFKIND THEORY ORDER", "", ...lines, "", ...footer].join("\n");
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    if (!itemShowsPrice(item)) return sum;
    return sum + item.price * item.quantity;
  }, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
