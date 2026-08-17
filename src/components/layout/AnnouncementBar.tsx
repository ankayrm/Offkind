"use client";

import { usePathname } from "next/navigation";
import { brand } from "@/data/brand";

export function AnnouncementBar() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <div className="bg-ok-black text-ok-off">
      <p className="px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-ok-off/80 md:text-[11px]">
        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-ok-yellow align-middle" />
        {brand.announcement}
      </p>
    </div>
  );
}
