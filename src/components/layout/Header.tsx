"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { brand, navLinks } from "@/data/brand";
import { useOrderBag } from "@/context/OrderBagContext";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/components/layout/SearchModal";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Header() {
  const { count, openBag, isHydrated } = useOrderBag();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-colors duration-300",
          scrolled
            ? "border-ok-line bg-ok-off/95 backdrop-blur-sm"
            : "border-transparent bg-ok-off"
        )}
      >
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 md:h-16 md:px-6">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ok-black transition-colors hover:text-ok-muted"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
            <BrandLogo size={40} priority spin className="md:hidden" />
            <Link
              href="/"
              className="hidden items-center gap-2.5 md:flex"
            >
              <BrandLogo size={42} priority spin href={false} />
              <span className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-[-0.02em]">
                {brand.shortName}
                <span className="text-ok-yellow">®</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center"
              onClick={openBag}
              aria-label="Open order bag"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {isHydrated && count > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center bg-ok-yellow px-1 font-mono text-[10px] font-bold text-ok-black">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ok-black/50 transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 flex w-[min(100%,320px)] flex-col bg-ok-black text-ok-off transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
            menuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-14 items-center justify-between border-b border-ok-grey px-4">
            <div className="flex items-center gap-2">
              <BrandLogo size={36} href={false} />
              <span className="font-[family-name:var(--font-display)] text-lg font-bold uppercase">
                Menu
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-4 pt-8">
            {[
              ...navLinks,
              { href: "/faq", label: "FAQ" },
              { href: "/contact", label: "Contact" },
            ].map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-ok-grey py-4 font-[family-name:var(--font-display)] text-3xl uppercase tracking-tight transition-colors hover:text-ok-yellow"
                style={{
                  transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(8px)",
                  transition:
                    "opacity 0.35s ease, transform 0.35s ease, color 0.2s",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-ok-grey p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ok-muted">
            {brand.tagline}
          </div>
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
