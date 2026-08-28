import { redirect } from "next/navigation";
import { features } from "@/data/features";
import { OrderSummary } from "@/components/order/OrderSummary";

export const metadata = {
  title: "Order Summary",
  description:
    "Review your OFFKIND THEORY order, add contact details, location, and delivery, then send on WhatsApp or Viber.",
};

export default function OrderPage() {
  if (!features.orderMessageAndReceipt) {
    redirect("/");
  }
  return <OrderSummary />;
}
