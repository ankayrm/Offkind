import Link from "next/link";
import { brand } from "@/data/brand";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  /** Height in pixels. Width follows the wordmark aspect ratio. */
  size?: number;
  priority?: boolean;
  href?: string | false;
}

/** Native <img> — keeps PNG alpha (the optimizer can flatten it). */
export function BrandLogo({
  className,
  size = 40,
  priority,
  href = "/",
}: BrandLogoProps) {
  const sizedByClass = Boolean(className);
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${brand.logo}?v=8`}
      alt={brand.registeredName}
      height={size}
      {...(priority ? { fetchPriority: "high" as const } : {})}
      decoding="async"
      draggable={false}
      className={cn(
        "block w-auto max-w-none select-none object-contain object-center",
        !sizedByClass && "h-10",
        className
      )}
      style={sizedByClass ? undefined : { height: size, width: "auto" }}
    />
  );

  if (href === false) return img;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center bg-transparent"
      aria-label={brand.name}
    >
      {img}
    </Link>
  );
}
