import Image from "next/image";
import Link from "next/link";
import { brand } from "@/data/brand";
import { ButtonLink } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export function HomePage() {
  return (
    <>
      <section className="relative h-[100svh] bg-ok-black text-ok-off">
        <h1 className="sr-only">{brand.registeredName}</h1>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-36 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="grid h-full grid-rows-2 md:grid-cols-2 md:grid-rows-1">
          <Link href="/men" className="group relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1600&q=80"
              alt=""
              fill
              priority
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/10" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-7 left-5 md:bottom-10 md:left-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/75">
                Catalog · Combos · Mystery
              </p>
              <p className="mt-2 font-display text-4xl font-bold uppercase tracking-tight text-white md:text-6xl">
                Men
              </p>
              <span className="mt-5 inline-flex border border-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-200 group-hover:bg-white group-hover:text-ok-black">
                Shop men
              </span>
            </div>
          </Link>

          <Link href="/women" className="group relative overflow-hidden">
            <Image
              src="/heroes/women-hero.png"
              alt=""
              fill
              priority
              className="object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/25 transition-colors duration-500 group-hover:bg-black/10" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-7 left-5 md:bottom-10 md:left-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/75">
                Catalog · Combos · Mystery
              </p>
              <p className="mt-2 font-display text-4xl font-bold uppercase tracking-tight text-white md:text-6xl">
                Women
              </p>
              <span className="mt-5 inline-flex border border-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-200 group-hover:bg-white group-hover:text-ok-black">
                Shop women
              </span>
            </div>
          </Link>
        </div>
      </section>

      <Marquee
        items={[
          brand.tagline,
          "MEN · WOMEN",
          "DM FOR PIECE PRICES",
          "COMBOS PRICED",
          "IG · WHATSAPP",
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
                d: "Men or Women. Each has its own catalog, combos, and Mystery.",
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
              WhatsApp opens with your order already written. Just hit send.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={brand.contact.instagramUrl} variant="primary">
              Instagram
            </ButtonLink>
            <WhatsAppLink
              variant="outline"
              className="ring-ok-black/20 hover:bg-ok-black hover:text-ok-yellow hover:ring-ok-black"
            >
              WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </section>
    </>
  );
}
