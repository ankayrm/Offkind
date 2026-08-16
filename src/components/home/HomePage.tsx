import Image from "next/image";
import Link from "next/link";
import { brand } from "@/data/brand";
import { getFeaturedProducts } from "@/data/products";
import { bundles } from "@/data/bundles";
import { mysteryOptions } from "@/data/mystery";
import { ProductCard } from "@/components/shop/ProductCard";
import { BundleCard } from "@/components/shop/BundleCard";
import { ButtonLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { formatPrice } from "@/lib/utils";

export function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4);
  const featuredBundles = bundles.filter((b) => b.featured).slice(0, 3);

  return (
    <>
      <section className="relative min-h-[88svh] overflow-hidden bg-ok-black text-ok-off md:min-h-[92vh]">
        <Image
          src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1600&q=80"
          alt=""
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ok-black via-ok-black/50 to-ok-black/40" />

        <div className="pointer-events-none absolute right-[-8%] top-[12%] z-10 hidden bg-transparent md:block lg:right-[6%]">
          <div className="animate-floaty bg-transparent">
            <BrandLogo size={220} href={false} priority />
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[88svh] max-w-[1400px] flex-col justify-end px-4 pb-12 pt-24 md:min-h-[92vh] md:px-6 md:pb-16">
          <div data-enter className="mb-5 md:hidden">
            <BrandLogo size={96} href={false} className="animate-wiggle" />
          </div>
          <p
            data-enter
            className="inline-flex w-fit rotate-[-2deg] sticker-yellow px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ok-black"
          >
            Catalog · Combos · Mystery
          </p>
          <h1
            data-enter
            className="mt-5 max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.8rem,12vw,7.5rem)] font-bold leading-[0.9] uppercase tracking-[-0.03em]"
          >
            {brand.heroLine1}
            <br />
            {brand.heroLine2}
            <br />
            <span className="text-ok-yellow">{brand.heroLine3}</span>
          </h1>
          <p
            data-enter
            className="mt-6 max-w-md text-sm leading-relaxed text-ok-off/75 md:text-base"
          >
            Browse the catalog. No prices on pieces — ask us. Combo packs show
            the number. Then Instagram or WhatsApp to grab.
          </p>
          <div data-enter className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/shop" variant="yellow">
              Browse Catalog
            </ButtonLink>
            <ButtonLink
              href="/mystery"
              variant="outline"
              className="border-ok-off/40 text-ok-off hover:bg-ok-off hover:text-ok-black"
            >
              Mystery Combo
            </ButtonLink>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          brand.tagline,
          "CATALOG NOT CHECKOUT",
          "DM FOR THE PRICE",
          "WHATSAPP TO GRAB",
          "COMBO PRICES LISTED",
          "YOU WON'T KNOW UNTIL IT LANDS",
        ]}
      />

      <section className="dot-grid mx-auto max-w-[1400px] px-4 py-16 md:px-6 md:py-24">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ok-muted">
                In the catalog
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight md:text-4xl">
                Featured Pieces
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden text-xs font-semibold uppercase tracking-[0.16em] underline decoration-ok-yellow underline-offset-4 sm:block"
            >
              Full catalog
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.05}>
              <ProductCard product={product} priority={i < 2} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <ButtonLink href="/shop" variant="outline">
            Full catalog
          </ButtonLink>
        </div>
      </section>

      <section className="border-y-2 border-ok-black bg-ok-black text-ok-off">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:gap-16 md:px-6 md:py-24">
          <Reveal>
            <p className="inline-flex rotate-[-2deg] sticker-yellow px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ok-black">
              Signature
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold uppercase leading-[0.95] tracking-tight md:text-6xl">
              Mystery
              <br />
              Combo
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ok-off/70">
              Pick your combo. Pick your size. Spin. Get a drop reference.
              Exact pieces stay sealed until they land.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/mystery" variant="yellow">
                Spin a Combo
              </ButtonLink>
              <ButtonLink
                href="/how-it-works"
                variant="outline"
                className="border-ok-off/30 text-ok-off hover:bg-ok-off hover:text-ok-black"
              >
                How it works
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-3">
              {mysteryOptions.map((opt) => (
                <Link
                  key={opt.id}
                  href="/mystery"
                  className="flex items-center justify-between border-2 border-ok-grey p-4 transition-colors hover:border-ok-yellow hover:bg-ok-ink"
                >
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-xl uppercase">
                      {opt.name}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-ok-muted">
                      {opt.pieceCount} pieces
                    </p>
                  </div>
                  <span className="font-mono text-ok-yellow">
                    {formatPrice(opt.price)}
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-6 md:py-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ok-muted">
            Simple
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight md:text-4xl">
            How Mystery Combos Work
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Choose combo + size",
              d: "Starter, Full, or Season. Then your clothing size — that's all we need.",
            },
            {
              n: "02",
              t: "Spin your combo",
              d: "Watch categories fly by. You get a Mystery Drop reference — not the exact pieces.",
            },
            {
              n: "03",
              t: "Bag → message → done",
              d: "Add it to your bag. Copy the summary. Instagram or WhatsApp to confirm.",
            },
          ].map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08}>
              <div className="border-t-2 border-ok-black pt-5">
                <span className="font-mono text-ok-yellow">{step.n}</span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl uppercase tracking-tight">
                  {step.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ok-muted">
                  {step.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-ok-black bg-ok-yellow py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6">
          <Reveal>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ok-black/70">
                  Priced packs
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight text-ok-black md:text-4xl">
                  Combo Packs
                </h2>
              </div>
              <Link
                href="/bundles"
                className="text-xs font-bold uppercase tracking-[0.16em] text-ok-black underline underline-offset-4"
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
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-28">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.9] uppercase tracking-[-0.03em] md:col-span-8">
              {brand.tagline}
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-ok-muted md:col-span-4 md:justify-self-end">
              See it in the catalog. Message for the price. Combos are the only
              packs with numbers up front. Young. Confident. Slightly offkind.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-t-2 border-ok-black bg-ok-black py-16 text-ok-off md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6">
          <Reveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight md:text-4xl">
              How to Order
            </h2>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ok-yellow">
              Browse. Message. Done.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              "Browse the catalog or pick a combo / Mystery.",
              "Save what you want. Copy your order summary.",
              "Instagram DM or WhatsApp. We quote pieces & confirm.",
            ].map((text, i) => (
              <Reveal key={text} delay={i * 0.07}>
                <p className="border-l-2 border-ok-yellow pl-4 text-sm leading-relaxed text-ok-off/80">
                  <span className="mb-2 block font-mono text-ok-yellow">
                    0{i + 1}
                  </span>
                  {text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-16 text-center md:px-6 md:py-24">
        <Reveal>
          <BrandLogo size={88} href={false} className="mx-auto mb-6 animate-wiggle" />
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ok-muted">
            Hit us up
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight md:text-5xl">
            @{brand.contact.instagram}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-ok-muted">
            Instagram DM, WhatsApp, or the community — wherever you already hang.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={brand.contact.instagramUrl} variant="yellow">
              Instagram
            </ButtonLink>
            <ButtonLink href={brand.contact.whatsappUrl} variant="outline">
              WhatsApp
            </ButtonLink>
            <ButtonLink
              href={brand.contact.whatsappCommunityUrl}
              variant="outline"
            >
              Community
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
