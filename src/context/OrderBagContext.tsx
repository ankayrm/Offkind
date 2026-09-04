"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, CheckoutDetails, Size } from "@/types";
import { cartCount, cartTotal } from "@/lib/utils";
import { emptyCheckout, isCheckoutComplete } from "@/data/checkout";
import { DEFAULT_PHONE_COUNTRY, isPhoneCountry } from "@/data/countries";

const STORAGE_KEY = "offkind-order-bag";
const CHECKOUT_KEY = "offkind-checkout";

interface OrderBagContextValue {
  items: CartItem[];
  checkout: CheckoutDetails;
  checkoutComplete: boolean;
  count: number;
  total: number;
  isOpen: boolean;
  isHydrated: boolean;
  openBag: () => void;
  closeBag: () => void;
  toggleBag: () => void;
  addItem: (item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateSize: (id: string, size: Size) => void;
  updateCheckout: (next: CheckoutDetails) => void;
  clearBag: () => void;
}

const OrderBagContext = createContext<OrderBagContextValue | null>(null);

function makeId(): string {
  return `bag-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function parseCheckout(raw: string | null): CheckoutDetails {
  if (!raw) return emptyCheckout;
  try {
    const parsed = JSON.parse(raw) as Partial<CheckoutDetails>;
    return {
      email: typeof parsed.email === "string" ? parsed.email : "",
      phone: typeof parsed.phone === "string" ? parsed.phone : "",
      phoneCountry: isPhoneCountry(parsed.phoneCountry)
        ? parsed.phoneCountry
        : DEFAULT_PHONE_COUNTRY,
      city: typeof parsed.city === "string" ? parsed.city : "",
      details: typeof parsed.details === "string" ? parsed.details : "",
      deliveryMethod:
        parsed.deliveryMethod === "cash-on-delivery" ||
        parsed.deliveryMethod === "box-now" ||
        parsed.deliveryMethod === "regular-delivery"
          ? parsed.deliveryMethod
          : null,
    };
  } catch {
    return emptyCheckout;
  }
}

export function OrderBagProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [checkout, setCheckout] = useState<CheckoutDetails>(emptyCheckout);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
      setCheckout(parseCheckout(localStorage.getItem(CHECKOUT_KEY)));
    } catch {
      // ignore corrupt storage
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(CHECKOUT_KEY, JSON.stringify(checkout));
  }, [checkout, isHydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }) => {
      setItems((prev) => {
        const existing = prev.find(
          (p) =>
            p.type === item.type &&
            p.name === item.name &&
            p.size === item.size &&
            p.gender === item.gender &&
            p.reference === item.reference &&
            p.productId === item.productId &&
            p.bundleId === item.bundleId &&
            p.mysteryOptionId === item.mysteryOptionId
        );

        if (existing && item.type !== "mystery") {
          return prev.map((p) =>
            p.id === existing.id
              ? {
                  ...p,
                  quantity: p.quantity + (item.quantity ?? 1),
                  price: item.price,
                }
              : p
          );
        }

        return [
          ...prev,
          {
            ...item,
            id: makeId(),
            quantity: item.quantity ?? 1,
          },
        ];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((p) => p.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity } : p))
    );
  }, []);

  const updateSize = useCallback((id: string, size: Size) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, size } : p)));
  }, []);

  const updateCheckout = useCallback((next: CheckoutDetails) => {
    setCheckout(next);
  }, []);

  const clearBag = useCallback(() => setItems([]), []);

  const openBag = useCallback(() => setIsOpen(true), []);
  const closeBag = useCallback(() => setIsOpen(false), []);
  const toggleBag = useCallback(() => setIsOpen((open) => !open), []);

  const value = useMemo<OrderBagContextValue>(
    () => ({
      items,
      checkout,
      checkoutComplete: isCheckoutComplete(checkout),
      count: cartCount(items),
      total: cartTotal(items),
      isOpen,
      isHydrated,
      openBag,
      closeBag,
      toggleBag,
      addItem,
      removeItem,
      updateQuantity,
      updateSize,
      updateCheckout,
      clearBag,
    }),
    [
      items,
      checkout,
      isOpen,
      isHydrated,
      openBag,
      closeBag,
      toggleBag,
      addItem,
      removeItem,
      updateQuantity,
      updateSize,
      updateCheckout,
      clearBag,
    ]
  );

  return (
    <OrderBagContext.Provider value={value}>{children}</OrderBagContext.Provider>
  );
}

export function useOrderBag() {
  const ctx = useContext(OrderBagContext);
  if (!ctx) {
    throw new Error("useOrderBag must be used within OrderBagProvider");
  }
  return ctx;
}
