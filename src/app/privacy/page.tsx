import { brand } from "@/data/brand";

export const metadata = {
  title: "Privacy",
  description: "Privacy policy for OFFKIND THEORY.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-10 md:px-6 md:py-14">
      <h1 className="font-display text-4xl font-bold tracking-tight">
        Privacy
      </h1>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ok-muted">
        Last updated · 2026
      </p>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-ok-muted">
        <p>
          {brand.registeredName} (“we”) runs this website to showcase products
          and help you build an order bag. We do not process online payments on
          this site.
        </p>
        <h2 className="font-display text-xl font-bold text-ok-black">
          What we store
        </h2>
        <p>
          Your order bag is saved in your browser via localStorage. It stays on
          your device. We do not receive that data until you choose to share an
          order summary via Instagram, phone, or email.
        </p>
        <h2 className="font-display text-xl font-bold text-ok-black">
          Contact data
        </h2>
        <p>
          When you complete checkout, we receive the email and phone number you
          provide so we can identify your order and verify that the request is
          genuine. We use this information only to fulfill and support your
          order. Replace this section with your full legal privacy policy
          before launch.
        </p>
        <h2 className="font-display text-xl font-bold text-ok-black">
          Questions
        </h2>
        <p>
          Contact @{brand.contact.instagram} or {brand.contact.email}.
        </p>
      </div>
    </div>
  );
}
