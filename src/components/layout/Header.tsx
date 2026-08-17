"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { brand } from "@/data/brand";
import { useOrderBag } from "@/context/OrderBagContext";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/components/layout/SearchModal";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import {
  GENDERS,
  genderFromPath,
  genderHref,
  genderLabels,
  genderNav,
  switchGenderHref,
} from "@/lib/gender";

export function Header() {
  const pathname = usePathname();
  const { count, openBag, isHydrated } = useOrderBag();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const overlay = isHome && !scrolled;
  const gender = genderFromPath(pathname);
  const shopLinks = gender ? genderNav(gender) : [];

  const mobileLinks = gender
    ? [
        ...genderNav(gender),
        { href: "/how-it-works", label: "How It Works" },
        { href: "/about", label: "About" },
        { href: "/faq", label: "FAQ" },
        { href: "/contact", label: "Contact" },
        { href: "/order", label: "Order" },
      ]
    : [
        { href: "/men", label: "Men" },
        { href: "/women", label: "Women" },
        { href: "/how-it-works", label: "How It Works" },
        { href: "/about", label: "About" },
        { href: "/faq", label: "FAQ" },
        { href: "/contact", label: "Contact" },
        { href: "/order", label: "Order" },
      ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
          "z-40 print:hidden transition-all duration-300",
          isHome ? "fixed inset-x-0 top-0" : "sticky top-0",
          overlay
            ? "border-transparent bg-transparent text-ok-off"
            : "border-b border-ok-line/80 bg-ok-off/85 text-ok-black backdrop-blur-xl"
        )}
      >
        {overlay ? (
          <div className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-24 md:px-7">
            <nav className="hidden items-center gap-6 md:flex">
              {GENDERS.map((g) => (
                <Link
                  key={g}
                  href={genderHref(g)}
                  className="text-[11px] font-medium uppercase tracking-[0.22em] text-ok-off/85 transition-colors hover:text-ok-off [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]"
                >
                  {genderLabels[g]}
                </Link>
              ))}
            </nav>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center md:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.6} />
            </button>

            <Link
              href="/"
              className="flex items-center justify-center gap-2.5 justify-self-center"
            >
              <BrandLogo size={34} priority spin href={false} />
              <span className="font-display text-[1.65rem] font-bold uppercase tracking-[-0.04em] [text-shadow:0_2px_18px_rgba(0,0,0,0.45)] md:text-4xl lg:text-[2.75rem]">
                {brand.shortName}
              </span>
            </Link>

            <div className="flex items-center justify-end gap-1">
              <button
                type="button"
                className="hidden h-10 items-center px-2 text-[11px] font-medium uppercase tracking-[0.22em] text-ok-off/85 transition-colors hover:text-ok-off [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] md:flex"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                Search
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center md:hidden"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" strokeWidth={1.6} />
              </button>
              <button
                type="button"
                className="relative flex h-10 items-center gap-2 px-2 text-[11px] font-medium uppercase tracking-[0.22em] text-ok-off/85 transition-colors hover:text-ok-off [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]"
                onClick={openBag}
                aria-label="Open order bag"
              >
                <span className="hidden md:inline">Bag</span>
                <ShoppingBag className="h-5 w-5 md:hidden" strokeWidth={1.6} />
                {isHydrated && count > 0 && (
                  <span className="absolute right-0 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-ok-yellow px-1 font-mono text-[9px] font-medium text-ok-black md:static md:ml-0.5">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex h-[68px] max-w-[1400px] items-center gap-6 px-4 md:h-[76px] md:px-6">
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <BrandLogo size={38} priority spin href={false} />
              <span className="font-display text-[17px] font-bold tracking-tight md:text-lg">
                {brand.shortName}
                <span className="ml-0.5 text-ok-yellow">®</span>
              </span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {GENDERS.map((g) => (
                <Link
                  key={g}
                  href={switchGenderHref(pathname, g)}
                  className={cn(
                    "px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors",
                    gender === g
                      ? "bg-ok-yellow text-ok-black"
                      : "text-ok-muted hover:text-ok-black"
                  )}
                >
                  {genderLabels[g]}
                </Link>
              ))}
            </div>

            <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
              {(gender ? shopLinks : []).map((link) => {
                const active =
                  pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "group relative px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors",
                      active
                        ? "text-ok-black"
                        : "text-ok-muted hover:text-ok-black"
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute bottom-1 left-3.5 right-3.5 h-[2px] origin-left bg-ok-yellow transition-transform duration-300",
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="ml-auto flex items-center gap-0.5">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center text-ok-black transition-colors hover:text-ok-muted"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" strokeWidth={1.6} />
              </button>
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center text-ok-black transition-colors hover:text-ok-muted"
                onClick={openBag}
                aria-label="Open order bag"
              >
                <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />
                {isHydrated && count > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-ok-yellow px-1 font-mono text-[9px] font-medium text-ok-black">
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
                <Menu className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        )}
      </header>

      <div
        className={cn(
          "fixed inset-0 z-50 print:hidden md:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ok-black/40 backdrop-blur-sm transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-[min(100%,340px)] flex-col bg-ok-off transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex h-[68px] items-center justify-between px-5">
            <span className="font-display text-xl font-bold tracking-tight">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center"
            >
              <X className="h-5 w-5" strokeWidth={1.6} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 px-5 pb-4">
            {GENDERS.map((g) => (
              <Link
                key={g}
                href={isHome ? genderHref(g) : switchGenderHref(pathname, g)}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.16em]",
                  gender === g
                    ? "bg-ok-yellow text-ok-black"
                    : "ring-1 ring-inset ring-ok-black/15"
                )}
              >
                {genderLabels[g]}
              </Link>
            ))}
          </div>

          <nav className="flex flex-1 flex-col px-3">
            {mobileLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "border-b border-ok-line/70 px-4 py-4 font-display text-[1.65rem] font-bold tracking-tight transition-colors",
                    active
                      ? "text-ok-black"
                      : "text-ok-black/80 hover:text-ok-black"
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="ml-2 inline-block h-2 w-2 rounded-full bg-ok-yellow align-middle" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="grid grid-cols-2 gap-2 p-5">
            <a
              href={brand.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] ring-1 ring-inset ring-ok-black/15"
            >
              Instagram
            </a>
            <WhatsAppLink
              className="flex items-center justify-center gap-1.5 bg-ok-black py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-ok-yellow"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
