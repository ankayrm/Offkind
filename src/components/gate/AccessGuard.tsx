"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ACCESS_SESSION_KEY, ACCESS_TOKEN } from "@/lib/access-gate";

export function AccessGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(ACCESS_SESSION_KEY) === ACCESS_TOKEN) {
      setAllowed(true);
      return;
    }
    const next =
      pathname && pathname !== "/"
        ? `?next=${encodeURIComponent(pathname)}`
        : "";
    window.location.replace(`/gate${next}`);
  }, [pathname]);

  if (!allowed) {
    return <div className="min-h-[100svh] bg-ok-black" aria-hidden />;
  }

  return children;
}
