import Image from "next/image";
import Link from "next/link";
import { brand } from "@/data/brand";
import { ButtonLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { ViberLink } from "@/components/ui/ViberLink";
import { cn } from "@/lib/utils";

const genderSplits = [
  {
    href: "/men",
    src: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1600&q=80",
    title: "Men",
    cta: "Shop men",
    imageClass:
      "object-[50%_30%] scale-[1.14] origin-[center_26%] group-hover:scale-[1.2] md:origin-center md:scale-100 md:object-center md:group-hover:scale-[1.04]",
  },
  {
    href: "/women",
    src: "/heroes/women-hero.png",
    title: "Women",
    cta: "Shop women",
    imageClass:
      "object-[50%_16%] scale-[1.12] origin-[center_14%] group-hover:scale-[1.18] md:origin-center md:scale-100 md:object-[center_18%] md:group-hover:scale-[1.04]",
  },
] as const;

export function HomePage() {
  return (
    <>
      <section
        data-home-hero
        className="relative bg-ok-black text-ok-off md:h-[100svh]"
      >
        <h1 className="sr-only">{brand.registeredName}</h1>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-black/55 to-transparent md:h-36" />
        <div className="grid md:h-full md:grid-cols-2 md:grid-rows-1">
          {genderSplits.map((panel) => (
            <Link
              key={panel.href}
              href={panel.href}
              className="group relative isolate block h-[72svh] min-h-[30rem] overflow-hidden md:h-full md:min-h-0"
            >
              <Image
                src={panel.src}
                alt=""
                fill
                priority
                className={cn(
                  "object-cover transition-transform duration-700 ease-out",
                  panel.imageClass
                )}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/10" />
              <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:h-44 md:via-transparent" />
              <div className="absolute inset-x-0 bottom-0 px-5 pb-8 pt-20 md:inset-x-auto md:bottom-10 md:left-8 md:px-0 md:pb-0 md:pt-0">
                <p className="text-[10px] font-medium uppercase leading-relaxed tracking-[0.14em] text-white/75 md:tracking-[0.28em]">
                  Catalog · Mystery Combo Fit · Custom
                </p>
                <p className="mt-1.5 font-display text-[2.75rem] font-extrabold uppercase leading-[0.82] tracking-tight text-white md:mt-2 md:text-6xl">
                  {panel.title}
                </p>
                <span className="mt-4 inline-flex border border-white px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-200 group-hover:bg-white group-hover:text-ok-black md:mt-5 md:px-6 md:py-3">
                  {panel.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Marquee
        items={[
          brand.tagline,
          "MEN · WOMEN",
          "PIECE PRICES ON THE CATALOG",
          "MYSTERY COMBO FIT",
          "CUSTOM ORDERS",
          "IG · VIBER",
        ]}
      />

      <section className="border-y border-ok-line bg-ok-cream/50">
        <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-24">
          <Reveal>
            <p className="kicker">Process</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
              How to order
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
            {[
              {
                n: "01",
                t: "Pick a side",
                d: "Men or Women. Each has its own catalog, Mystery Combo Fit, and Custom.",
              },
              {
                n: "02",
                t: "Bag it",
                d: "Pick sizes. Save your bag. Message us with what you want: Cash on Delivery, Box Now, or Regular Delivery.",
              },
              {
                n: "03",
                t: "Message",
                d: "Hit us on Instagram or Viber. We confirm. You pay. Done.",
              },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 0.07}>
                <div>
                  <span className="font-display text-5xl font-bold text-ok-yellow md:text-6xl">
                    {step.n}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
                    {step.t}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ok-muted">
                    {step.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ok-yellow">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-8 px-4 py-14 md:flex-row md:items-center md:justify-between md:px-6 md:py-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ok-black/50">
              Hit us up
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
              @{brand.contact.instagram}
            </h2>
            <p className="mt-3 max-w-sm text-[15px] text-ok-black/60">
              Instagram or Viber. See the fit. Hit us up.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={brand.contact.instagramUrl} variant="primary">
              Instagram
            </ButtonLink>
            <ViberLink
              variant="outline"
              className="ring-ok-black/20 hover:bg-ok-black hover:text-ok-yellow hover:ring-ok-black"
            >
              Viber
            </ViberLink>
          </div>
        </div>
      </section>
    </>
  );
}
