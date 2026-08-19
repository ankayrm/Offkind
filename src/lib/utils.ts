import { brand } from "@/data/brand";
import { checkoutPhoneDisplay, deliveryMethodLabels } from "@/data/checkout";
import { getPhoneCountry } from "@/data/countries";
import type {
  CartItem,
  CheckoutDetails,
  Gender,
  MysteryResult,
  Product,
  Size,
} from "@/types";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const PRODUCT_IMAGE_LABELS: Record<string, string> = {
  front: "Front",
  back: "Back",
  hover: "Back",
  tag: "Tag",
  neck: "Neck",
  hood: "Hood",
  logo: "Logo",
  detail: "Detail",
  patch: "Patch",
  label: "Label",
  zip: "Zip",
};

/** Original street looks of men. Keep on Men; never show on Women. */
export const maleOnModelExtras = new Set([
  "/products/polo-white-zip-hover.png",
  "/products/polo-black-quarterzip-hover.png",
  "/products/polo-white-crew-hover.png",
  "/products/polo-navy-crew-hover.png",
  "/products/essentials-tee-black-hover.png",
  "/products/essentials-tee-taupe-hover.png",
  "/products/essentials-shorts-black-hover.png",
  "/products/essentials-shorts-grey-hover.png",
]);

export function isOnModelProductImage(src: string): boolean {
  const path = src.split("?")[0];
  return /-(?:w|m)\.(png|jpe?g|webp)$/i.test(path) || maleOnModelExtras.has(path);
}

export function productImageLabel(src: string, index: number): string {
  const path = src.split("?")[0];
  if (maleOnModelExtras.has(path)) return "Street";
  if (isOnModelProductImage(src)) return "Look";
  const file = (src.split("/").pop() ?? "").toLowerCase();
  const match = file.match(/-([a-z0-9]+)\.(png|jpe?g|webp)$/);
  const suffix = match?.[1];
  if (suffix && PRODUCT_IMAGE_LABELS[suffix]) return PRODUCT_IMAGE_LABELS[suffix];
  if (index === 0) return "Front";
  return `Photo ${index + 1}`;
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
    `${index + 1} of ${total}`,
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

export function formatCartSummary(
  items: CartItem[],
  checkout?: CheckoutDetails | null
): string {
  if (items.length === 0) {
    return [
      "OFFKIND THEORY NEW ORDER",
      "",
      "Bag is empty.",
    ].join("\n");
  }

  const blocks = items.map((item, i) => formatOrderItem(item, i, items.length));
  const comboTotal = cartTotal(items);
  const hasPieces = items.some((i) => !itemShowsPrice(i));
  const hasCombos = items.some((i) => itemShowsPrice(i));
  const pieceCount = cartCount(items);

  const delivery: string[] = [];
  if (checkout) {
    const hasContact =
      checkout.email.trim().length > 0 || checkout.phone.trim().length > 0;
    if (hasContact) {
      delivery.push("CONTACT");
      if (checkout.email.trim()) {
        delivery.push(`Email: ${checkout.email.trim()}`);
      }
      if (checkout.phone.trim()) {
        const formatted = checkoutPhoneDisplay(checkout);
        const country = getPhoneCountry(checkout.phoneCountry);
        delivery.push(
          formatted
            ? `Phone: ${formatted} (${country.name})`
            : `Phone: ${checkout.phone.trim()}`
        );
      }
      delivery.push("");
    }
    if (checkout.deliveryMethod) {
      delivery.push("DELIVERY");
      delivery.push(`Method: ${deliveryMethodLabels[checkout.deliveryMethod]}`);
      if (checkout.city.trim()) delivery.push(`City: ${checkout.city.trim()}`);
      if (checkout.details.trim()) {
        delivery.push(
          checkout.deliveryMethod === "box-now"
            ? `Locker: ${checkout.details.trim()}`
            : `Address: ${checkout.details.trim()}`
        );
      }
      delivery.push("");
    }
  }

  const footer: string[] = ["------------"];
  footer.push(`Items: ${pieceCount}`);
  if (hasCombos) {
    footer.push(`Shown total (combos / mystery): ${formatPrice(comboTotal)}`);
  }
  footer.push("THIS TOTAL IS NOT FINAL.");
  if (hasPieces) {
    footer.push(
      "Catalog pieces need an official quote. We confirm the real price in chat."
    );
  } else {
    footer.push(
      "If any piece needs an official brand quote, the real price is discussed in chat."
    );
  }
  footer.push("");
  footer.push("Please confirm stock and send next steps. Ready to pay after you confirm.");

  return [
    "OFFKIND THEORY NEW ORDER",
    "",
    ...delivery,
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
    "OFFKIND THEORY MYSTERY DROP",
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
    "OFFKIND THEORY PIECE INQUIRY",
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
  "Hi OFFKIND THEORY. I'd like to place an order.";

export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${brand.contact.whatsapp}`;
  if (!text?.trim()) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function whatsappHrefForBag(
  items: CartItem[],
  extraMessage?: string,
  checkout?: CheckoutDetails | null
): string {
  const body =
    items.length > 0
      ? extraMessage
        ? `${formatCartSummary(items, checkout)}\n\n${extraMessage}`
        : formatCartSummary(items, checkout)
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

export function cartHasCatalogPieces(items: CartItem[]): boolean {
  return items.some((item) => !itemShowsPrice(item));
}

export function itemTypeLabel(type: CartItem["type"]): string {
  return typeLabel(type);
}

export function formatReceiptDate(date = new Date()): string {
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Always shown — catalog piece prices are quoted in chat, not on this receipt. */
export const PRICE_NOT_FINAL_NOTICE =
  "This total is not a final price. If your bag includes catalog pieces that need an official quote from the brand, the real amount is discussed and confirmed in chat (WhatsApp or Instagram) before you pay.";

export const CATALOG_QUOTE_NOTICE =
  "Your bag includes catalog pieces marked on request. Those need an official quote. We settle the final amount in chat.";
