import Image from "next/image";
import Link from "next/link";
import { brand } from "@/data/brand";
import { getFeaturedProducts, products } from "@/data/products";
import { bundles } from "@/data/bundles";
import { mysteryOptions } from "@/data/mystery";
import { ProductCard } from "@/components/shop/ProductCard";
import { BundleCard } from "@/components/shop/BundleCard";
import { ButtonLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { formatPrice } from "@/lib/utils";

const categories = [
  { href: "/shop?cat=knitwear", label: "Knitwear", key: "knitwear" },
  { href: "/shop?cat=hoodies", label: "Hoodies", key: "hoodies" },
  { href: "/shop?cat=tees", label: "Tees", key: "tees" },
  { href: "/shop?cat=shorts", label: "Shorts", key: "shorts" },
] as const;

export function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8);
  const featuredBundles = bundles.filter((b) => b.featured).slice(0, 3);

  return (
    <>
      {/* Hero — full bleed, editorial */}
      <section className="relative min-h-[85svh] overflow-hidden bg-ok-black text-ok-off md:min-h-[88vh]">
        <Image
          src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1600&q=80"
          alt=""
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ok-black via-ok-black/70 to-ok-black/20" />

        <div className="relative mx-auto flex min-h-[85svh] max-w-[1400px] flex-col justify-end px-4 pb-12 pt-24 md:min-h-[88vh] md:justify-center md:px-6 md:pb-16">
          <div className="max-w-2xl">
            <div data-enter className="mb-6 flex items-center gap-3 md:hidden">
              <BrandLogo size={72} href={false} />
            </div>
            <p
              data-enter
              className="font-mono text-[11px] uppercase tracking-[0.28em] text-ok-yellow"
            >
              {brand.registeredName}
            </p>
            <h1
              data-enter
              className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.75rem,10vw,6.5rem)] font-bold leading-[0.9] uppercase tracking-[-0.03em]"
            >
              Good fits.
              <br />
              Without the
              <br />
              <span className="text-ok-yellow">crazy price.</span>
            </h1>
            <p
              data-enter
              className="mt-6 max-w-md text-sm leading-relaxed text-ok-off/70 md:text-base"
            >
              Catalog of real pieces. Combos & Mystery priced up front. Message
              on Instagram or WhatsApp to buy — no online checkout.
            </p>
            <div data-enter className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/shop" variant="yellow">
                Shop catalog
              </ButtonLink>
              <ButtonLink
                href="/mystery"
                variant="outline"
                className="border-ok-off/35 text-ok-off hover:bg-ok-off hover:text-ok-black"
              >
                Mystery Combo
              </ButtonLink>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-10 right-6 hidden lg:block">
            <BrandLogo size={160} href={false} className="opacity-90" />
          </div>
        </div>
      </section>

      <Marquee
        items={[
          brand.tagline,
          "DM FOR PIECE PRICES",
          "COMBOS PRICED",
          "IG · WHATSAPP",
          "YOU WON'T KNOW UNTIL IT LANDS",
        ]}
      />

      {/* Categories — clean row */}
      <section className="border-b-2 border-ok-black">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 md:grid-cols-4">
          {categories.map((cat) => {
            const n = products.filter((p) => p.category === cat.key).length;
            return (
              <Link
                key={cat.key}
                href={cat.href}
                className="group border-b border-ok-line px-5 py-8 transition-colors hover:bg-ok-yellow md:border-b-0 md:border-r md:border-ok-line md:last:border-r-0 md:px-8 md:py-10"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ok-muted group-hover:text-ok-black/60">
                  {String(n).padStart(2, "0")} pieces
                </p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-tight md:text-3xl">
                  {cat.label}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured grid */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-6 md:py-20">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ok-muted">
                In stock
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight md:text-4xl">
                Catalog
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold uppercase tracking-[0.16em] underline decoration-ok-yellow underline-offset-4"
            >
              View all
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.04}>
              <ProductCard product={product} priority={i < 4} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mystery — asymmetric editorial */}
      <section className="border-y-2 border-ok-black bg-ok-black text-ok-off">
        <div className="mx-auto grid max-w-[1400px] md:grid-cols-12">
          <div className="flex flex-col justify-center px-4 py-14 md:col-span-5 md:px-8 md:py-20">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ok-yellow">
                Signature
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-5xl">
                Mystery
                <br />
                Combo
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-ok-off/65">
                Pick size. Spin. Get a drop reference. Exact pieces stay sealed
                until they land.
              </p>
              <div className="mt-8">
                <ButtonLink href="/mystery" variant="yellow">
                  Spin yours
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <div className="border-t-2 border-ok-grey md:col-span-7 md:border-l-2 md:border-t-0">
            {mysteryOptions.map((opt, i) => (
              <Link
                key={opt.id}
                href="/mystery"
                className={cnRow(
                  i < mysteryOptions.length - 1
                )}
              >
                <div>
                  <p className="font-[family-name:var(--font-display)] text-xl uppercase md:text-2xl">
                    {opt.name}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-ok-muted">
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

      {/* Combos */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-6 md:py-20">
        <Reveal>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ok-muted">
                Priced packs
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight md:text-4xl">
                Combo Packs
              </h2>
            </div>
            <Link
              href="/bundles"
              className="text-xs font-bold uppercase tracking-[0.16em] underline decoration-ok-yellow underline-offset-4"
            >
              All combos
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredBundles.map((bundle, i) => (
            <Reveal key={bundle.id} delay={i * 0.06}>
              <BundleCard bundle={bundle} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works — 3 clean steps */}
      <section className="border-y-2 border-ok-black bg-ok-cream/40">
        <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-6 md:py-20">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ok-muted">
              Process
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight md:text-4xl">
              How to order
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-0 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Browse",
                d: "Catalog pieces (ask for price) or priced combos / Mystery.",
              },
              {
                n: "02",
                t: "Bag it",
                d: "Pick sizes. Copy your order summary — saved on this device.",
              },
              {
                n: "03",
                t: "Message",
                d: "Instagram or WhatsApp. We confirm. You pay. Done.",
              },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 0.07}>
                <div
                  className={
                    i < 2
                      ? "border-b-2 border-ok-black py-8 md:border-b-0 md:border-r-2 md:py-0 md:pr-8 md:mr-8"
                      : "py-8 md:py-0"
                  }
                >
                  <span className="font-mono text-ok-yellow">{step.n}</span>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl uppercase tracking-tight">
                    {step.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ok-muted">
                    {step.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brand line */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-28">
        <Reveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.2rem,7vw,4.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em]">
              {brand.tagline}
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-ok-muted md:pb-2">
              Polo knits. Essentials fleece. Curated, not chaotic. Young and
              slightly offkind.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section className="border-t-2 border-ok-black bg-ok-black py-16 text-ok-off md:py-20">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-8 px-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ok-yellow">
              Hit us up
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight md:text-4xl">
              @{brand.contact.instagram}
            </h2>
            <p className="mt-3 max-w-sm text-sm text-ok-muted">
              DM or WhatsApp with your order summary. We reply fast.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={brand.contact.instagramUrl} variant="yellow">
              Instagram
            </ButtonLink>
            <ButtonLink
              href={brand.contact.whatsappUrl}
              variant="outline"
              className="border-ok-off/40 text-ok-off hover:bg-ok-off hover:text-ok-black"
            >
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

function cnRow(hasBorder: boolean) {
  return [
    "flex items-center justify-between gap-4 px-4 py-6 transition-colors hover:bg-ok-ink md:px-8 md:py-8",
    hasBorder ? "border-b border-ok-grey" : "",
  ].join(" ");
}
