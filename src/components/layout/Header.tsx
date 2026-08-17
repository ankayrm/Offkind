"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { brand, navLinks } from "@/data/brand";
import { useOrderBag } from "@/context/OrderBagContext";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/components/layout/SearchModal";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const mobileLinks = [
  ...navLinks,
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/order", label: "Order" },
];

export function Header() {
  const pathname = usePathname();
  const { count, openBag, isHydrated } = useOrderBag();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
          "sticky top-0 z-40 border-b-2 border-ok-black transition-colors duration-300",
          scrolled ? "bg-ok-off/95 backdrop-blur-md" : "bg-ok-off"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-4 md:h-[72px] md:px-6">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <BrandLogo size={40} priority spin href={false} />
            <span className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight md:text-xl">
              {brand.shortName}
              <span className="text-ok-yellow">®</span>
            </span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors",
                    active
                      ? "text-ok-black"
                      : "text-ok-muted hover:text-ok-black"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-3 right-3 h-[3px] origin-left bg-ok-yellow transition-transform",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1 md:ml-0">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center text-ok-black transition-colors hover:text-ok-muted"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              className="relative flex h-10 items-center gap-2 px-2 text-ok-black transition-colors hover:text-ok-muted"
              onClick={openBag}
              aria-label="Open order bag"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
              {isHydrated && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center bg-ok-yellow px-1 font-mono text-[9px] font-bold text-ok-black">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center md:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Funky accent line */}
        <div className="flex h-1 w-full">
          <div className="w-1/4 bg-ok-black" />
          <div className="w-1/4 bg-ok-yellow" />
          <div className="w-1/4 bg-ok-black" />
          <div className="w-1/4 bg-ok-yellow" />
        </div>
      </header>

      {/* Mobile drawer */}
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
            "absolute inset-y-0 right-0 flex w-[min(100%,340px)] flex-col border-l-2 border-ok-black bg-ok-off transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex h-16 items-center justify-between border-b-2 border-ok-black px-4">
            <span className="font-[family-name:var(--font-display)] text-xl font-bold uppercase">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center"
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col p-2">
            {mobileLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "border-b border-ok-line px-4 py-4 font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-tight transition-colors",
                    active
                      ? "bg-ok-yellow text-ok-black"
                      : "hover:bg-ok-cream"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="grid grid-cols-2 gap-2 border-t-2 border-ok-black p-4">
            <a
              href={brand.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-ok-black py-3 text-center text-[10px] font-bold uppercase tracking-[0.14em]"
            >
              Instagram
            </a>
            <a
              href={brand.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 border-2 border-ok-black bg-ok-black py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-ok-yellow"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
