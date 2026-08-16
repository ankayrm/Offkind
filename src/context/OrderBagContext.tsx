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
import type { CartItem, Size } from "@/types";
import { cartCount, cartTotal } from "@/lib/utils";

const STORAGE_KEY = "offkind-order-bag";

interface OrderBagContextValue {
  items: CartItem[];
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
  clearBag: () => void;
}

const OrderBagContext = createContext<OrderBagContextValue | null>(null);

function makeId(): string {
  return `bag-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function OrderBagProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore corrupt storage
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isHydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }) => {
      setItems((prev) => {
        const existing = prev.find(
          (p) =>
            p.type === item.type &&
            p.name === item.name &&
            p.size === item.size &&
            p.reference === item.reference &&
            p.productId === item.productId &&
            p.bundleId === item.bundleId &&
            p.mysteryOptionId === item.mysteryOptionId
        );

        if (existing && item.type !== "mystery") {
          return prev.map((p) =>
            p.id === existing.id
              ? { ...p, quantity: p.quantity + (item.quantity ?? 1) }
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

  const clearBag = useCallback(() => setItems([]), []);

  const value = useMemo<OrderBagContextValue>(
    () => ({
      items,
      count: cartCount(items),
      total: cartTotal(items),
      isOpen,
      isHydrated,
      openBag: () => setIsOpen(true),
      closeBag: () => setIsOpen(false),
      toggleBag: () => setIsOpen((o) => !o),
      addItem,
      removeItem,
      updateQuantity,
      updateSize,
      clearBag,
    }),
    [
      items,
      isOpen,
      isHydrated,
      addItem,
      removeItem,
      updateQuantity,
      updateSize,
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
