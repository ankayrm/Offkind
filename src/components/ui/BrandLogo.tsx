import Link from "next/link";
import { brand } from "@/data/brand";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: number;
  priority?: boolean;
  href?: string | false;
  spin?: boolean;
}

/** Native <img> — preserves PNG alpha (Next/Image optimizer can flatten it). */
export function BrandLogo({
  className,
  size = 44,
  priority,
  href = "/",
  spin = false,
}: BrandLogoProps) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${brand.logo}?v=3`}
      alt={brand.registeredName}
      width={size}
      height={size}
      {...(priority ? { fetchPriority: "high" as const } : {})}
      decoding="async"
      draggable={false}
      className={cn(
        "block max-w-none select-none bg-transparent object-contain",
        "mix-blend-normal",
        spin && "transition-transform duration-300 hover:rotate-12 hover:scale-110",
        className
      )}
      style={{
        backgroundColor: "transparent",
        background: "none",
        width: size,
        height: size,
      }}
    />
  );

  if (href === false) return img;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 bg-transparent"
      aria-label={brand.name}
    >
      {img}
    </Link>
  );
}
