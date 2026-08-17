import Image from "next/image";
import { brand } from "@/data/brand";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export const metadata = {
  title: "About",
  description: "About OFFKIND THEORY — catalog streetwear and combo packs.",
};

export default function AboutPage() {
  return (
    <div>
      <div className="relative h-[46vh] min-h-[280px] overflow-hidden bg-ok-black md:h-[54vh]">
        <Image
          src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1400&q=80"
          alt=""
          fill
          className="object-cover opacity-50"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ok-black via-ok-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[1400px] px-4 pb-12 md:px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ok-yellow">
            About
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ok-off md:text-6xl">
            {brand.registeredName}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-[760px] px-4 py-16 md:px-6 md:py-24">
        <p className="font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-4xl">
          {brand.tagline}
        </p>
        <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ok-muted md:text-base">
          <p>
            OFFKIND THEORY is a streetwear / resale brand with a catalog-first
            vibe. Browse individual pieces (no prices on the site — message
            us), grab priced combo packs, or get a Mystery Combo drop number.
          </p>
          <p>
            Young. Confident. Slightly rebellious. Orders happen on Instagram
            or WhatsApp — not a fake checkout. See the fit. Hit us up. Done.
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
          <WhatsAppLink variant="outline">
            WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </div>
  );
}
