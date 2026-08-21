import Link from "next/link";
import { brand, footerLinks } from "@/data/brand";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ViberLink } from "@/components/ui/ViberLink";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ok-line bg-ok-black text-ok-off print:hidden">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-16 md:grid-cols-12 md:px-6 md:py-20">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <BrandLogo size={44} href={false} />
            <p className="font-display text-2xl font-bold tracking-tight">
              {brand.shortName}
              <span className="ml-0.5 text-ok-yellow">®</span>
            </p>
          </div>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ok-off/55">
            {brand.tagline}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 md:justify-items-end">
          {(
            [
              ["Men", footerLinks.men],
              ["Women", footerLinks.women],
              ["Info", footerLinks.info],
            ] as const
          ).map(([title, links]) => (
            <div key={title}>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ok-off/40">
                {title}
              </p>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-ok-off/80 transition-colors hover:text-ok-yellow"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-5 text-[11px] text-ok-off/40 md:flex-row md:items-center md:justify-between md:px-6">
          <p className="font-mono uppercase tracking-[0.14em]">
            © {new Date().getFullYear()} {brand.registeredName}
          </p>
          <div className="flex flex-wrap gap-5">
            <a
              href={brand.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase tracking-[0.14em] transition-colors hover:text-ok-yellow"
            >
              Instagram
            </a>
            <WhatsAppLink className="uppercase tracking-[0.14em] transition-colors hover:text-ok-yellow">
              WhatsApp
            </WhatsAppLink>
            <ViberLink className="uppercase tracking-[0.14em] transition-colors hover:text-ok-yellow">
              Viber
            </ViberLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
