import { OrderSummary } from "@/components/order/OrderSummary";

export const metadata = {
  title: "Order Summary",
  description:
    "Review your OFFKIND THEORY order, add contact details, location, and delivery, then send on WhatsApp.",
};

export default function OrderPage() {
  return <OrderSummary />;
}
