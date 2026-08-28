"use client";

import { OrderBagProvider } from "@/context/OrderBagContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { OrderDrawer } from "@/components/order/OrderDrawer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <OrderBagProvider>
      <AnnouncementBar />
      <Header />
      <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
      <Footer />
      <OrderDrawer />
    </OrderBagProvider>
  );
}
