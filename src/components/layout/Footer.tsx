import Link from "next/link";
import { brand, footerLinks } from "@/data/brand";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-ok-black bg-ok-black text-ok-off">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-12 md:px-6 md:py-16">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <BrandLogo size={48} href={false} />
            <p className="font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-tight">
              {brand.shortName}
              <span className="text-ok-yellow">®</span>
            </p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ok-muted">
            {brand.tagline}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 md:justify-items-end">
          {(
            [
              ["Shop", footerLinks.shop],
              ["Info", footerLinks.info],
              ["Legal", footerLinks.legal],
            ] as const
          ).map(([title, links]) => (
            <div key={title}>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ok-muted">
                {title}
              </p>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-ok-off/90 transition-colors hover:text-ok-yellow"
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

      <div className="border-t border-ok-grey">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-5 text-[11px] text-ok-muted md:flex-row md:items-center md:justify-between md:px-6">
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
            <a
              href={brand.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase tracking-[0.14em] transition-colors hover:text-ok-yellow"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
