import { FaqList } from "@/components/ui/FaqList";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about OFFKIND THEORY orders and Mystery Combos.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-10 md:px-6 md:py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ok-muted">
        Answers
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold uppercase tracking-tight md:text-5xl">
        FAQ
      </h1>
      <p className="mt-3 text-sm text-ok-muted">
        Short answers. If you need more — DM us.
      </p>
      <div className="mt-10">
        <FaqList />
      </div>
      <div className="mt-10">
        <ButtonLink href="/contact" variant="outline">
          Still stuck? Contact
        </ButtonLink>
      </div>
    </div>
  );
}
