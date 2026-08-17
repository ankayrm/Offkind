import type { CheckoutDetails, DeliveryMethod } from "@/types";
import {
  DEFAULT_PHONE_COUNTRY,
  formatInternationalPhone,
  isPhoneCountry,
  nationalPhoneDigits,
} from "@/data/countries";

export const emptyCheckout: CheckoutDetails = {
  email: "",
  phone: "",
  phoneCountry: DEFAULT_PHONE_COUNTRY,
  city: "",
  details: "",
  deliveryMethod: null,
};

export const deliveryMethods: {
  id: DeliveryMethod;
  label: string;
  hint: string;
}[] = [
  {
    id: "cash-on-delivery",
    label: "Cash on Delivery",
    hint: "Pay when the order lands. We need your city and street address.",
  },
  {
    id: "box-now",
    label: "Box Now",
    hint: "Pick up from a Box Now locker. We need your city and locker name or code.",
  },
  {
    id: "regular-delivery",
    label: "Regular Delivery",
    hint: "Shipped to your door after we confirm. We need your city and street address.",
  },
];

export const deliveryMethodLabels: Record<DeliveryMethod, string> = {
  "cash-on-delivery": "Cash on Delivery",
  "box-now": "Box Now",
  "regular-delivery": "Regular Delivery",
};

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPhone(phone: string, countryIso?: string): boolean {
  const iso = isPhoneCountry(countryIso) ? countryIso : DEFAULT_PHONE_COUNTRY;
  const national = nationalPhoneDigits(phone, iso);
  const full = formatInternationalPhone(phone, iso).replace(/\D/g, "");
  return national.length >= 6 && full.length >= 8 && full.length <= 15;
}

export function checkoutPhoneDisplay(checkout: CheckoutDetails): string {
  return formatInternationalPhone(checkout.phone, checkout.phoneCountry);
}

export function isCheckoutComplete(checkout: CheckoutDetails): boolean {
  return (
    isValidEmail(checkout.email) &&
    isValidPhone(checkout.phone, checkout.phoneCountry) &&
    checkout.deliveryMethod !== null &&
    checkout.city.trim().length >= 2 &&
    checkout.details.trim().length >= 4
  );
}

export function detailsLabel(method: DeliveryMethod | null): string {
  return method === "box-now"
    ? "Box Now locker"
    : "Street address";
}

export function detailsPlaceholder(method: DeliveryMethod | null): string {
  return method === "box-now"
    ? "Locker name, code, or nearest Box Now"
    : "Street, number, floor";
}
