import Image from "next/image";
import { brand } from "@/data/brand";
import { ButtonLink } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";

export const metadata = {
  title: "About",
  description: "About OFFKIND THEORY — catalog streetwear and combo packs.",
};

export default function AboutPage() {
  return (
    <div>
      <div className="relative h-[42vh] min-h-[260px] overflow-hidden bg-ok-black md:h-[50vh]">
        <Image
          src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1400&q=80"
          alt=""
          fill
          className="object-cover opacity-55"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ok-black/85 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-[1400px] px-4 pb-10 md:px-6">
          <BrandLogo size={72} href={false} className="mb-4" />
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ok-yellow">
            About
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold uppercase tracking-tight text-ok-off md:text-6xl">
            {brand.registeredName}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-[800px] px-4 py-14 md:px-6 md:py-20">
        <p className="font-[family-name:var(--font-display)] text-3xl font-bold uppercase leading-tight tracking-tight md:text-4xl">
          {brand.tagline}
        </p>
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-ok-muted md:text-base">
          <p>
            OFFKIND THEORY is a streetwear / resale brand with a catalog-first
            vibe. Browse individual pieces (no prices on the site — message
            us), grab priced combo packs, or spin a Mystery Combo.
          </p>
          <p>
            Young. Confident. Slightly rebellious. Orders happen on Instagram
            or WhatsApp — not a fake checkout. See the fit. Hit us up. Done.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/shop" variant="yellow">
            Browse catalog
          </ButtonLink>
          <ButtonLink href={brand.contact.instagramUrl} variant="outline">
            Instagram
          </ButtonLink>
          <ButtonLink href={brand.contact.whatsappUrl} variant="outline">
            WhatsApp
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
