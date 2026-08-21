"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useOrderBag } from "@/context/OrderBagContext";
import { ButtonLink } from "@/components/ui/Button";
import { chatMessageForBag, viberUrl } from "@/lib/utils";
import type { CartItem } from "@/types";

type Variant = "primary" | "secondary" | "ghost" | "yellow" | "outline";

interface ViberLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  children: ReactNode;
  extraMessage?: string;
  items?: CartItem[];
  variant?: Variant;
  asButton?: boolean;
  requireCheckout?: boolean;
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
}

export function ViberLink({
  children,
  className,
  extraMessage,
  items,
  variant,
  asButton = false,
  requireCheckout = true,
  onClick,
  ...props
}: ViberLinkProps) {
  const bag = useOrderBag();
  const list = items ?? bag.items;
  const needsCheckout = requireCheckout && list.length > 0 && !bag.checkoutComplete;
  const message = chatMessageForBag(list, extraMessage, bag.checkout);
  const href = needsCheckout ? "/order" : viberUrl();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || needsCheckout) return;
    void copyText(message);
  };

  if (asButton || variant) {
    return (
      <ButtonLink
        href={href}
        variant={variant ?? "outline"}
        className={className}
        onClick={handleClick}
      >
        {children}
      </ButtonLink>
    );
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
