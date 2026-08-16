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
    "bg-ok-black text-ok-off hover:bg-ok-charcoal border-2 border-ok-black shadow-[3px_3px_0_#ffde00]",
  secondary:
    "bg-ok-off text-ok-black hover:bg-ok-cream border-2 border-ok-black",
  ghost: "bg-transparent text-ok-black hover:bg-ok-cream/60 border border-transparent",
  yellow:
    "bg-ok-yellow text-ok-black hover:bg-ok-yellow-dim border-2 border-ok-black shadow-[3px_3px_0_#0a0a0a] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#0a0a0a]",
  outline:
    "bg-transparent text-ok-black border-2 border-ok-black hover:bg-ok-black hover:text-ok-off",
};

const base =
  "inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none";

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
