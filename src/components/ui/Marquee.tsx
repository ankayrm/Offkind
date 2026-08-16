import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: "normal" | "slow";
  separator?: string;
}

export function Marquee({
  items,
  className,
  speed = "normal",
  separator = "·",
}: MarqueeProps) {
  const content = items.join(`  ${separator}  `);
  const doubled = `${content}  ${separator}  ${content}  ${separator}  `;

  return (
    <div
      className={cn(
        "overflow-hidden border-y border-ok-line bg-ok-black text-ok-off",
        className
      )}
      aria-hidden
    >
      <div
        className={cn(
          "flex whitespace-nowrap py-2.5 font-mono text-[11px] uppercase tracking-[0.22em]",
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee"
        )}
      >
        <span className="px-4">{doubled}</span>
        <span className="px-4">{doubled}</span>
      </div>
    </div>
  );
}
