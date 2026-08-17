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
}

export function WhatsAppLink({
  children,
  className,
  extraMessage,
  items,
  variant,
  asButton = false,
  ...props
}: WhatsAppLinkProps) {
  const bag = useOrderBag();
  const href = whatsappHrefForBag(items ?? bag.items, extraMessage);

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
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
