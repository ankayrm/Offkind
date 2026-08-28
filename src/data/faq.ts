import { features } from "@/data/features";

export const faqs: {
  question: string;
  answer: string;
  feature?: keyof typeof features;
}[] = [
  {
    question: "How do I order?",
    answer:
      "Browse the catalog, add what you want to your bag, then message us on Instagram or Viber with the pieces, sizes, and how you want to receive it (Cash on Delivery, Box Now, or Regular Delivery). We quote piece prices, confirm, then you pay.",
  },
  {
    question: "Why do you ask for email and phone?",
    answer:
      "We use your email and phone number to identify your order and to verify that the request is genuine before we proceed. They are required at checkout and are included in the Viber or Instagram message we receive.",
    feature: "orderMessageAndReceipt",
  },
  {
    question: "Why aren’t there prices on pieces?",
    answer:
      "The catalog is meant to show the fits, like our posts. Message us for the price. Mystery Combo Fit shows the number up front. Any number you see is not a final price. If a catalog piece needs an official quote from the brand, we confirm the real total in chat.",
  },
  {
    question: "Is there online payment?",
    answer:
      "No. Everything goes through Instagram DM or Viber. You pay after we confirm, or cash when it lands.",
  },
  {
    question: "What is a Mystery Combo Fit?",
    answer:
      "You choose the combo you want, pick your clothing size, and we generate a unique drop number for that combo. Add it to your bag, then message us. We pack a surprise fit around it. Exact items stay hidden until they land. Across every Mystery Combo Fit we've completed, no customer has ever said it wasn't worth it.",
  },
  {
    question: "What is a custom order?",
    answer:
      "Custom means we are not limited to the catalog. You send a photo of the piece or look you want, plus a paragraph of the specifics. We take that request to the 200+ companies we work with and try to manufacture or source it. Then we get back to you with the result. It is not always 100% sure you will get the piece, but 97% of our clients are happy and they get what they want.",
  },
  {
    question: "How do I send a custom order?",
    answer:
      "Open Custom, upload a photo, write a paragraph of what you want, then tap Viber or copy the text for Instagram. Attach the same photo in the chat — the site cannot send the picture for you.",
  },
  {
    question: "Can I return a Mystery Combo Fit?",
    answer:
      "Mystery Combo Fits are final once confirmed, unless something arrives damaged or wrong size. Reach out and we'll sort it.",
  },
  {
    question: "What sizes do you carry?",
    answer:
      "Most pieces run S–2XL (women also have XS). Check each product page. Mystery Combo Fit uses the same range, up to 2XL.",
  },
  {
    question: "Are items new or resale?",
    answer:
      "Both. OFFKIND pieces are new. Curated items may be excellent or like-new resale, always listed on the product page.",
  },
  {
    question: "How do I receive my order?",
    answer:
      "Tell us when you message: Cash on Delivery (pay when it lands), Box Now locker pickup, or Regular Delivery to your address. Include your city and street or locker details.",
  },
  {
    question: "How long until I hear back?",
    answer:
      "Usually same day on Instagram or Viber.",
  },
  {
    question: "Can I print a receipt?",
    answer:
      "Yes. On the order page, tap Print receipt. Keep that copy for yourself. It is not a payment confirmation. The total on it is not final. Catalog pieces that need an official quote are settled in chat before you pay.",
    feature: "orderMessageAndReceipt",
  },
];
