import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { brand, categoryLabels } from "@/data/brand";
import { getFeaturedProducts, getProductsByGender } from "@/data/products";
import { getMysteryOptionsByGender } from "@/data/mystery";
import { ProductCard } from "@/components/shop/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { formatPrice } from "@/lib/utils";
import {
  genderHref,
  genderLabels,
  type Gender,
} from "@/lib/gender";
import type { ProductCategory } from "@/types";
import {
  buildStyleVariantMap,
  groupProductsByStyle,
  productStyleKey,
} from "@/lib/product-variants";

const homeCategories: ProductCategory[] = [
  "knitwear",
  "hoodies",
  "tees",
  "jackets",
  "shorts",
  "pants",
];

export function GenderHome({ gender }: { gender: Gender }) {
  const catalog = getProductsByGender(gender);
  const variantMap = buildStyleVariantMap(catalog);
  const featured = groupProductsByStyle(
    getFeaturedProducts(gender).slice(0, 7)
  );
  const mystery = getMysteryOptionsByGender(gender);
  const label = genderLabels[gender];

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-4 pt-12 md:px-6 md:pt-16">
        <p className="kicker">{brand.registeredName}</p>
        <h1 className="mt-2 font-display text-5xl font-extrabold uppercase tracking-tight md:text-7xl">
          {label}
        </h1>
        <p className="mt-4 max-w-md text-[15px] text-ok-muted">
          Same unisex pieces, styled for {label.toLowerCase()}. Catalog,
          Mystery Combo Fit, and custom orders.
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
        <div className="flex flex-wrap gap-2">
          {homeCategories.map((key) => {
            const n = groupProductsByStyle(
              catalog.filter((p) => p.category === key)
            ).length;
            return (
              <Link
                key={key}
                href={`${genderHref(gender, "/shop")}?cat=${key}`}
                className="group flex items-baseline gap-3 bg-white px-5 py-3.5 ring-1 ring-inset ring-ok-line transition-colors hover:bg-ok-yellow hover:ring-ok-yellow"
              >
                <span className="font-display text-lg font-bold tracking-tight md:text-xl">
                  {categoryLabels[key]}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ok-muted transition-colors group-hover:text-ok-black">
                  {String(n).padStart(2, "0")} pieces
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pb-20 md:px-6 md:pb-28">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="kicker">In stock</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
                Catalog
              </h2>
            </div>
            <Link
              href={genderHref(gender, "/shop")}
              className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ok-muted transition-colors hover:text-ok-black"
            >
              View all
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6 md:gap-y-14">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.04}>
              <ProductCard
                product={product}
                variants={
                  variantMap.get(
                    `${product.gender}:${productStyleKey(product)}`
                  ) ?? [product]
                }
                priority={i < 4}
              />
            </Reveal>
          ))}
          <Reveal delay={0.28}>
            <Link
              href={genderHref(gender, "/shop")}
              className="group block h-full"
            >
              <div className="relative flex aspect-square flex-col items-center justify-center gap-5 bg-white ring-1 ring-inset ring-ok-line transition-colors duration-300 group-hover:bg-ok-yellow group-hover:ring-ok-yellow">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ok-muted transition-colors group-hover:text-ok-black">
                  Catalog
                </p>
                <ArrowRight
                  className="h-12 w-12 text-ok-black transition-transform duration-300 group-hover:translate-x-2 md:h-16 md:w-16"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <p className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  More
                </p>
              </div>
              <div className="mt-3.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ok-muted">
                  All pieces
                </p>
                <h3 className="mt-1 text-[15px] font-medium tracking-tight text-ok-black transition-colors group-hover:text-ok-muted">
                  View full catalog
                </h3>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="ok-grain bg-ok-black text-ok-off">
        <div className="relative z-[2] mx-auto grid max-w-[1400px] md:grid-cols-12">
          <div className="flex flex-col justify-center px-4 py-16 md:col-span-5 md:px-10 md:py-24">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ok-yellow">
                {label} · Signature
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[0.92] tracking-tight md:text-6xl">
                Mystery
                <br />
                Combo Fit
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ok-off/60">
                Pick the combo you want. Then pick size. We generate a drop
                number. Send it to us. Pieces stay sealed until they land.
              </p>
              <div className="mt-8">
                <ButtonLink href={genderHref(gender, "/bundles")} variant="yellow">
                  Pick a combo
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <div className="border-t border-white/10 md:col-span-7 md:border-l md:border-t-0">
            {mystery.map((opt, i) => (
              <Link
                key={opt.id}
                href={genderHref(gender, "/bundles")}
                className={[
                  "group flex items-center justify-between gap-4 px-4 py-7 transition-colors hover:bg-white/5 md:px-10 md:py-9",
                  i < mystery.length - 1 ? "border-b border-white/10" : "",
                ].join(" ")}
              >
                <div>
                  <p className="font-display text-xl tracking-tight md:text-2xl">
                    {opt.name}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-ok-off/40">
                    {opt.pieceCount} pieces · {opt.tagline}
                  </p>
                </div>
                <span className="font-mono text-ok-yellow">
                  {formatPrice(opt.price)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ok-line bg-ok-cream/50">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-16 md:grid-cols-12 md:px-6 md:py-24">
          <div className="md:col-span-5">
            <Reveal>
              <p className="kicker">{label} · Made to request</p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
                Custom
                <br />
                Order
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ok-muted">
                Saw a piece that is not in the catalog? Send a photo and a
                paragraph. We try to manufacture it with 200+ companies, then
                get back to you with the result.
              </p>
              <div className="mt-8">
                <ButtonLink href={genderHref(gender, "/custom")} variant="yellow">
                  Start a custom order
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={0.08}>
              <p className="border-l-2 border-ok-yellow pl-4 text-[15px] leading-relaxed text-ok-black">
                <span className="underline decoration-ok-yellow decoration-2 underline-offset-[5px]">
                  Not always 100% sure you will get it. 97% of our clients are
                  happy and they get what they want.
                </span>
              </p>
              <ul className="mt-8 divide-y divide-ok-line border-y border-ok-line">
                {[
                  ["01", "Drop a photo of the look"],
                  ["02", "Write the specifics"],
                  ["03", "We run it through 200+ companies"],
                  ["04", "We reply with the result"],
                ].map(([n, t]) => (
                  <li
                    key={n}
                    className="flex items-baseline gap-5 py-4"
                  >
                    <span className="font-display text-2xl font-bold text-ok-yellow">
                      {n}
                    </span>
                    <span className="text-[15px] text-ok-muted">{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
