import { brand } from "@/data/brand";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { BrandLogo } from "@/components/ui/BrandLogo";

export const metadata = {
  title: "Contact",
  description: "Contact OFFKIND THEORY via Instagram or WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-10 md:px-6 md:py-14">
      <BrandLogo size={72} href={false} className="mb-6 animate-wiggle" />
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ok-muted">
        Reach us
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold uppercase tracking-tight md:text-5xl">
        Contact
      </h1>
      <p className="mt-4 max-w-md text-sm text-ok-muted">
        This site is a catalog. Message us on Instagram or WhatsApp to buy —
        we&apos;ll quote piece prices and confirm combos.
      </p>

      <div className="mt-12 space-y-0 border-y-2 border-ok-black">
        <a
          href={brand.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-4 border-b border-ok-line py-6 transition-colors hover:bg-ok-yellow/30"
        >
          <div className="flex items-center gap-4">
            <InstagramIcon className="h-5 w-5" />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-ok-muted">
                Instagram
              </p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-xl uppercase">
                @{brand.contact.instagram}
              </p>
            </div>
          </div>
          <span className="font-mono text-[11px] text-ok-black">OPEN →</span>
        </a>

        <a
          href={brand.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-4 border-b border-ok-line py-6 transition-colors hover:bg-ok-yellow/30"
        >
          <div className="flex items-center gap-4">
            <WhatsAppIcon className="h-5 w-5" />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-ok-muted">
                WhatsApp
              </p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-xl uppercase">
                Chat to order
              </p>
            </div>
          </div>
          <span className="font-mono text-[11px] text-ok-black">OPEN →</span>
        </a>

        <a
          href={brand.contact.whatsappCommunityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-4 py-6 transition-colors hover:bg-ok-yellow/30"
        >
          <div className="flex items-center gap-4">
            <WhatsAppIcon className="h-5 w-5" />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-ok-muted">
                Community
              </p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-xl uppercase">
                WhatsApp Community
              </p>
            </div>
          </div>
          <span className="font-mono text-[11px] text-ok-black">JOIN →</span>
        </a>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/order" variant="yellow">
          Order Summary
        </ButtonLink>
        <ButtonLink href="/how-it-works" variant="outline">
          How it works
        </ButtonLink>
      </div>
    </div>
  );
}
