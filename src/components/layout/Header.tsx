"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { brand } from "@/data/brand";
import { features } from "@/data/features";
import { useOrderBag } from "@/context/OrderBagContext";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/components/layout/SearchModal";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ViberIcon } from "@/components/ui/ViberIcon";
import { ViberLink } from "@/components/ui/ViberLink";
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
  const { count, openBag, closeBag, isHydrated } = useOrderBag();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const overlay = isHome && !scrolled;
  const gender = genderFromPath(pathname);
  const shopLinks = gender ? genderNav(gender) : [];

  const mobileLinks = (
    gender
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
          { href: "/custom", label: "Custom Order" },
          { href: "/how-it-works", label: "How It Works" },
          { href: "/about", label: "About" },
          { href: "/faq", label: "FAQ" },
          { href: "/contact", label: "Contact" },
          { href: "/order", label: "Order" },
        ]
  ).filter(
    (link) => features.orderMessageAndReceipt || link.href !== "/order"
  );

  useEffect(() => {
    const onScroll = () => {
      if (pathname === "/") {
        const hero = document.querySelector("[data-home-hero]");
        if (hero) {
          const rect = hero.getBoundingClientRect();
          // Hero can report 0 height before layout; don't lock the overlay off.
          if (rect.height > 80) {
            setScrolled(rect.bottom <= 80);
            return;
          }
          setScrolled(false);
          return;
        }
      }
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
    closeBag();
  }, [pathname, closeBag]);

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
          "z-40 w-full min-w-0 print:hidden pt-[env(safe-area-inset-top)] transition-all duration-300",
          isHome ? "fixed inset-x-0 top-0" : "sticky top-0",
          overlay
            ? "border-transparent bg-transparent text-ok-off"
            : "border-b border-white/10 bg-ok-black/92 text-ok-off backdrop-blur-xl"
        )}
      >
        {overlay ? (
          <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-4 md:h-24 md:px-7">
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
              className="flex h-11 w-11 items-center justify-center md:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.6} />
            </button>

            <Link
              href="/"
              aria-label={brand.name}
              className="flex items-center justify-center justify-self-center"
            >
              <BrandLogo
                size={40}
                priority
                href={false}
                className="h-8 drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] md:h-12"
              />
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
                className="flex h-11 w-11 items-center justify-center md:hidden"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" strokeWidth={1.6} />
              </button>
              <button
                type="button"
                className="relative flex h-11 w-11 items-center justify-center text-ok-off/85 transition-colors hover:text-ok-off md:h-10 md:w-auto md:gap-2 md:px-2 md:text-[11px] md:font-medium md:uppercase md:tracking-[0.22em] md:[text-shadow:0_1px_10px_rgba(0,0,0,0.45)]"
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
          <div className="mx-auto flex h-[68px] w-full min-w-0 max-w-[1400px] items-center gap-3 px-4 md:h-[76px] md:gap-6 md:px-6">
            <Link href="/" aria-label={brand.name} className="flex shrink-0 items-center">
              <BrandLogo
                size={36}
                priority
                href={false}
                className="h-9 w-auto max-w-[min(46vw,11rem)] md:h-11 md:max-w-none"
              />
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
                      : "text-ok-off/55 hover:text-ok-off"
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
                      "group relative px-2.5 py-2 text-[13px] font-medium tracking-wide transition-colors lg:px-3.5",
                      active
                        ? "text-ok-off"
                        : "text-ok-off/55 hover:text-ok-off"
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute bottom-1 left-2.5 right-2.5 h-[2px] origin-left bg-ok-yellow transition-transform duration-300 lg:left-3.5 lg:right-3.5",
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
                className="flex h-11 w-11 items-center justify-center text-ok-off transition-colors hover:text-ok-off/60"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" strokeWidth={1.6} />
              </button>
              <button
                type="button"
                className="relative flex h-11 w-11 items-center justify-center text-ok-off transition-colors hover:text-ok-off/60"
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
                className="ml-1 flex h-11 w-11 items-center justify-center md:hidden"
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
            "absolute inset-0 bg-ok-black/70 backdrop-blur-sm transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-[min(100%,340px)] flex-col overflow-hidden bg-ok-black text-ok-off transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex min-h-[68px] shrink-0 items-center justify-between px-5 pt-[env(safe-area-inset-top)]">
            <span className="font-display text-xl font-bold tracking-tight">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center"
            >
              <X className="h-5 w-5" strokeWidth={1.6} />
            </button>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-2 px-5 pb-4">
            {GENDERS.map((g) => (
              <Link
                key={g}
                href={isHome ? genderHref(g) : switchGenderHref(pathname, g)}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.16em]",
                  gender === g
                    ? "bg-ok-yellow text-ok-black"
                    : "ring-1 ring-inset ring-white/20 text-ok-off/80"
                )}
              >
                {genderLabels[g]}
              </Link>
            ))}
          </div>

          <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-3">
            {mobileLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "border-b border-white/10 px-4 py-4 font-display text-[1.65rem] font-bold tracking-tight transition-colors",
                    active
                      ? "text-ok-yellow"
                      : "text-ok-off/85 hover:text-ok-off"
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

          <div className="grid shrink-0 grid-cols-2 gap-2 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <a
              href={brand.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-ok-yellow py-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-ok-black"
            >
              Instagram
            </a>
            <ViberLink className="flex items-center justify-center gap-1.5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] ring-1 ring-inset ring-white/20">
              <ViberIcon className="h-3.5 w-3.5" /> Viber
            </ViberLink>
          </div>
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
