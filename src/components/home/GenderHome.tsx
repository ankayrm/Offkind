import Image from "next/image";
import Link from "next/link";
import { brand } from "@/data/brand";
import { getFeaturedProducts, getProductsByGender } from "@/data/products";
import { getBundlesByGender } from "@/data/bundles";
import { getMysteryOptionsByGender } from "@/data/mystery";
import { ProductCard } from "@/components/shop/ProductCard";
import { BundleCard } from "@/components/shop/BundleCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { formatPrice } from "@/lib/utils";
import {
  genderHref,
  genderLabels,
  type Gender,
} from "@/lib/gender";

const categoryMeta = [
  {
    key: "knitwear",
    label: "Knitwear",
    image: "/products/polo-white-zip.png",
  },
  {
    key: "hoodies",
    label: "Hoodies",
    image: "/products/essentials-hoodie-grey-front.png",
  },
  {
    key: "tees",
    label: "Tees",
    image: "/products/essentials-tee-black.png",
  },
  {
    key: "shorts",
    label: "Shorts",
    image: "/products/essentials-shorts-black.png",
  },
] as const;

export function GenderHome({ gender }: { gender: Gender }) {
  const catalog = getProductsByGender(gender);
  const featured = getFeaturedProducts(gender).slice(0, 8);
  const featuredBundles = getBundlesByGender(gender)
    .filter((b) => b.featured)
    .slice(0, 3);
  const mystery = getMysteryOptionsByGender(gender);
  const label = genderLabels[gender];

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-4 pt-12 md:px-6 md:pt-16">
        <p className="kicker">{brand.registeredName}</p>
        <h1 className="mt-2 font-display text-5xl font-bold tracking-tight md:text-7xl">
          {label}
        </h1>
        <p className="mt-4 max-w-md text-[15px] text-ok-muted">
          Same unisex pieces, styled for {label.toLowerCase()}. Catalog, combo
          packs, and Mystery.
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {categoryMeta.map((cat) => {
            const n = catalog.filter((p) => p.category === cat.key).length;
            return (
              <Link
                key={cat.key}
                href={`${genderHref(gender, "/shop")}?cat=${cat.key}`}
                className="group relative overflow-hidden bg-white"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.05] md:p-7"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent px-4 pb-4 pt-10">
                  <p className="font-display text-xl font-bold tracking-tight md:text-2xl">
                    {cat.label}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ok-muted">
                    {String(n).padStart(2, "0")} pieces
                  </p>
                </div>
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
              <ProductCard product={product} priority={i < 4} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ok-black text-ok-off">
        <div className="mx-auto grid max-w-[1400px] md:grid-cols-12">
          <div className="flex flex-col justify-center px-4 py-16 md:col-span-5 md:px-10 md:py-24">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ok-yellow">
                {label} · Signature
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-[0.92] tracking-tight md:text-6xl">
                Mystery
                <br />
                Combo
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ok-off/60">
                Pick size. Get a drop number. Send it to us. We pack the
                surprise. Pieces stay sealed until they land.
              </p>
              <div className="mt-8">
                <ButtonLink href={genderHref(gender, "/mystery")} variant="yellow">
                  Get your number
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <div className="border-t border-white/10 md:col-span-7 md:border-l md:border-t-0">
            {mystery.map((opt, i) => (
              <Link
                key={opt.id}
                href={genderHref(gender, "/mystery")}
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

      <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-28">
        <Reveal>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="kicker">Priced packs</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
                Combo Packs
              </h2>
            </div>
            <Link
              href={genderHref(gender, "/bundles")}
              className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ok-muted transition-colors hover:text-ok-black"
            >
              All combos
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredBundles.map((bundle, i) => (
            <Reveal key={bundle.id} delay={i * 0.06}>
              <BundleCard bundle={bundle} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
