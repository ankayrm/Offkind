import { brand } from "@/data/brand";
import type { CartItem, Gender, MysteryResult, Product, Size } from "@/types";
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

function typeLabel(type: CartItem["type"]): string {
  if (type === "bundle") return "Combo pack";
  if (type === "mystery") return "Mystery Combo";
  return "Catalog piece";
}

function sectionLabel(gender?: Gender): string {
  if (gender === "women") return "Women";
  if (gender === "men") return "Men";
  return "Unisex";
}

function formatOrderItem(item: CartItem, index: number, total: number): string {
  const lines = [
    `— ${index + 1} of ${total} —`,
    `Type: ${typeLabel(item.type)}`,
    `Section: ${sectionLabel(item.gender)}`,
    `Item: ${item.name}`,
  ];
  if (item.reference) lines.push(`Drop number: ${item.reference}`);
  if (item.pieceCount) lines.push(`Pieces: ${item.pieceCount}`);
  lines.push(`Size: ${item.size}`);
  lines.push(`Qty: ${item.quantity}`);
  lines.push(
    itemShowsPrice(item)
      ? `Price: ${formatPrice(item.price * item.quantity)}`
      : "Price: on request"
  );
  return lines.join("\n");
}

export function formatCartSummary(items: CartItem[]): string {
  if (items.length === 0) {
    return [
      "OFFKIND THEORY — NEW ORDER",
      "",
      "Bag is empty.",
    ].join("\n");
  }

  const blocks = items.map((item, i) => formatOrderItem(item, i, items.length));
  const comboTotal = cartTotal(items);
  const hasPieces = items.some((i) => !itemShowsPrice(i));
  const hasCombos = items.some((i) => itemShowsPrice(i));
  const pieceCount = cartCount(items);

  const footer: string[] = ["————————————"];
  footer.push(`Items: ${pieceCount}`);
  if (hasCombos) {
    footer.push(`Combo / Mystery total: ${formatPrice(comboTotal)}`);
  }
  if (hasPieces) {
    footer.push("Catalog pieces: quote piece prices please");
  }
  footer.push("");
  footer.push("Please confirm stock and send next steps. Ready to pay after you confirm.");

  return [
    "OFFKIND THEORY — NEW ORDER",
    "",
    ...blocks,
    "",
    ...footer,
  ].join("\n");
}

export function formatMysteryWhatsApp(
  result: MysteryResult,
  gender: Gender
): string {
  return [
    "OFFKIND THEORY — MYSTERY DROP",
    "",
    `Drop number: ${result.reference}`,
    `Section: ${sectionLabel(gender)}`,
    `Combo: ${result.optionName}`,
    `Size: ${result.size}`,
    `Pieces: ${result.pieceCount}`,
    `Price: ${formatPrice(result.price)}`,
    "",
    "Please pack this surprise and confirm.",
  ].join("\n");
}

export function formatProductWhatsApp(
  product: Product,
  size: Size | null
): string {
  return [
    "OFFKIND THEORY — PIECE INQUIRY",
    "",
    `Section: ${sectionLabel(product.gender)}`,
    `Item: ${product.name}`,
    product.brand ? `Brand: ${product.brand}` : null,
    `Category: ${product.category}`,
    size ? `Size: ${size}` : "Size: not selected yet",
    "Price: on request",
    "",
    "Please quote this piece.",
  ]
    .filter(Boolean)
    .join("\n");
}

export const defaultWhatsAppHello =
  "Hi OFFKIND THEORY — I'd like to place an order.";

export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${brand.contact.whatsapp}`;
  if (!text?.trim()) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function whatsappHrefForBag(
  items: CartItem[],
  extraMessage?: string
): string {
  const body =
    items.length > 0
      ? extraMessage
        ? `${formatCartSummary(items)}\n\n${extraMessage}`
        : formatCartSummary(items)
      : extraMessage || defaultWhatsAppHello;
  return whatsappUrl(body);
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
