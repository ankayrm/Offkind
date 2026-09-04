import Image from "next/image";
import { brand } from "@/data/brand";
import { ButtonLink } from "@/components/ui/Button";
import { ViberLink } from "@/components/ui/ViberLink";

export const metadata = {
  title: "About",
  description: "About OFFKIND THEORY. Catalog streetwear and Mystery Combo Fit.",
};

export default function AboutPage() {
  return (
    <div>
      <div className="ok-grain relative flex h-[46vh] min-h-[280px] items-end overflow-hidden bg-ok-black md:h-[54vh]">
        <Image
          src={brand.logo}
          alt=""
          width={971}
          height={291}
          className="pointer-events-none absolute left-1/2 top-1/2 w-[86vw] max-w-[640px] -translate-x-1/2 -translate-y-1/2 object-contain"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ok-black/80 via-transparent to-ok-black/30" />
        <div className="relative z-[2] mx-auto w-full max-w-[1400px] px-4 pb-10 md:px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ok-yellow">
            About
          </p>
          <h1 className="sr-only">{brand.registeredName}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-[760px] px-4 py-16 md:px-6 md:py-24">
        <p className="font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-4xl">
          {brand.tagline}
        </p>
        <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ok-muted md:text-base">
          <p>
            OFFKIND THEORY is a streetwear / resale brand with a catalog-first
            vibe. Browse individual pieces, or pick a Mystery Combo Fit and get
            a drop number.
          </p>
          <p>
            Young. Confident. Slightly rebellious. Orders happen on Instagram
            or Viber — not a fake checkout. See the fit. Hit us up. Done.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/men" variant="yellow">
            Shop men
          </ButtonLink>
          <ButtonLink href="/women" variant="outline">
            Shop women
          </ButtonLink>
          <ButtonLink href={brand.contact.instagramUrl} variant="outline">
            Instagram
          </ButtonLink>
          <ViberLink variant="outline">Viber</ViberLink>
        </div>
      </div>
    </div>
  );
}
