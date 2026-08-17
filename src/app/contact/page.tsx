import { brand } from "@/data/brand";
import { ButtonLink } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export const metadata = {
  title: "Contact",
  description: "Contact OFFKIND THEORY via Instagram or WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12 md:px-6 md:py-16">
      <p className="kicker">Reach us</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
        Contact
      </h1>
      <p className="mt-4 max-w-md text-[15px] text-ok-muted">
        This site is a catalog. Tap WhatsApp and your order list is already in
        the chat — just hit send. We quote piece prices and confirm combos.
      </p>

      <div className="mt-12 space-y-0 border-y border-ok-line">
        <a
          href={brand.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 border-b border-ok-line py-7 transition-colors hover:bg-ok-yellow/20"
        >
          <div className="flex items-center gap-4">
            <InstagramIcon className="h-5 w-5" />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-ok-muted">
                Instagram
              </p>
              <p className="mt-1 font-display text-xl font-bold tracking-tight">
                @{brand.contact.instagram}
              </p>
            </div>
          </div>
          <span className="font-mono text-[11px] text-ok-muted transition-colors group-hover:text-ok-black">
            OPEN →
          </span>
        </a>

        <WhatsAppLink
          className="group flex items-center justify-between gap-4 border-b border-ok-line py-7 transition-colors hover:bg-ok-yellow/20"
        >
          <div className="flex items-center gap-4">
            <WhatsAppIcon className="h-5 w-5" />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-ok-muted">
                WhatsApp
              </p>
              <p className="mt-1 font-display text-xl font-bold tracking-tight">
                {brand.contact.phoneDisplay}
              </p>
            </div>
          </div>
          <span className="font-mono text-[11px] text-ok-muted transition-colors group-hover:text-ok-black">
            SEND ORDER →
          </span>
        </WhatsAppLink>

        <a
          href={brand.contact.whatsappCommunityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 py-7 transition-colors hover:bg-ok-yellow/20"
        >
          <div className="flex items-center gap-4">
            <WhatsAppIcon className="h-5 w-5" />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-ok-muted">
                Community
              </p>
              <p className="mt-1 font-display text-xl font-bold tracking-tight">
                WhatsApp Community
              </p>
            </div>
          </div>
          <span className="font-mono text-[11px] text-ok-muted transition-colors group-hover:text-ok-black">
            JOIN →
          </span>
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
