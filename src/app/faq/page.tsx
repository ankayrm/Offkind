import { FaqList } from "@/components/ui/FaqList";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about OFFKIND THEORY orders and Mystery Combos.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12 md:px-6 md:py-16">
      <p className="kicker">Answers</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
        FAQ
      </h1>
      <p className="mt-4 text-[15px] text-ok-muted">
        Short answers. If you need more — DM us.
      </p>
      <div className="mt-12">
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
