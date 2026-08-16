import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[600px] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ok-yellow">
        404
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl font-bold uppercase tracking-tight md:text-6xl">
        Off the map
      </h1>
      <p className="mt-4 text-sm text-ok-muted">
        This page doesn&apos;t exist. The fit might be elsewhere.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" variant="yellow">
          Home
        </ButtonLink>
        <ButtonLink href="/shop" variant="outline">
          Shop
        </ButtonLink>
      </div>
    </div>
  );
}
