/**
 * Front-end switches. Keep the underlying code when a flag is off —
 * only hide the UI so it can be turned back on later.
 */
export const features = {
  /** Checkout that prefills WhatsApp/Viber with the bag and prints a receipt. */
  orderMessageAndReceipt: false,
  /** WhatsApp contact buttons, community, and prefilled send. */
  whatsapp: false,
} as const;
