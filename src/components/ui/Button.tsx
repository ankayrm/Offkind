import { cn } from "@/lib/utils";
import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "ghost" | "yellow" | "outline";

interface BaseProps {
  children: ReactNode;
  className?: string;
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-ok-black text-ok-off hover:bg-ok-ink",
  secondary:
    "bg-ok-cream text-ok-black hover:bg-ok-line",
  ghost: "bg-transparent text-ok-black hover:bg-ok-cream/80",
  yellow:
    "bg-ok-yellow text-ok-black hover:bg-ok-yellow-dim",
  outline:
    "bg-transparent text-ok-black ring-1 ring-inset ring-ok-black/15 hover:ring-ok-black hover:bg-ok-black hover:text-ok-off",
};

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none";

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  className,
  variant = "primary",
  href,
  ...props
}: BaseProps & { href: string } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
>) {
  const isExternal = href.startsWith("http") || href.startsWith("tel:");
  const classes = cn(base, variants[variant], className);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
