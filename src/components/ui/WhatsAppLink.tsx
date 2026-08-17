"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useOrderBag } from "@/context/OrderBagContext";
import { ButtonLink } from "@/components/ui/Button";
import { whatsappHrefForBag } from "@/lib/utils";
import type { CartItem } from "@/types";

type Variant = "primary" | "secondary" | "ghost" | "yellow" | "outline";

interface WhatsAppLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  children: ReactNode;
  extraMessage?: string;
  items?: CartItem[];
  variant?: Variant;
  asButton?: boolean;
  /** When the bag has items, checkout must be complete or this goes to /order */
  requireCheckout?: boolean;
}

export function WhatsAppLink({
  children,
  className,
  extraMessage,
  items,
  variant,
  asButton = false,
  requireCheckout = true,
  ...props
}: WhatsAppLinkProps) {
  const bag = useOrderBag();
  const list = items ?? bag.items;
  const needsCheckout = requireCheckout && list.length > 0 && !bag.checkoutComplete;
  const href = needsCheckout
    ? "/order"
    : whatsappHrefForBag(list, extraMessage, bag.checkout);

  if (asButton || variant) {
    return (
      <ButtonLink href={href} variant={variant ?? "outline"} className={className}>
        {children}
      </ButtonLink>
    );
  }

  return (
    <a
      href={href}
      {...(href.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
