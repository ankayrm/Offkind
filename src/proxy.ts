import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { features } from "@/data/features";
import { ACCESS_COOKIE, ACCESS_TOKEN } from "@/lib/access-gate";

function nextWithPath(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-ok-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export function proxy(request: NextRequest) {
  if (!features.accessGate) return nextWithPath(request);

  const { pathname, search } = request.nextUrl;
  const unlocked = request.cookies.get(ACCESS_COOKIE)?.value === ACCESS_TOKEN;

  if (pathname === "/gate") {
    return nextWithPath(request);
  }

  if (unlocked) return nextWithPath(request);

  const gate = request.nextUrl.clone();
  gate.pathname = "/gate";
  gate.search = "";
  const from = `${pathname}${search}`;
  if (from && from !== "/") {
    gate.searchParams.set("next", from);
  }
  return NextResponse.redirect(gate);
}

export const config = {
  matcher: [
    "/((?!api/gate|_next/static|_next/image|_next/webpack-hmr|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml|og.jpg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)$).*)",
  ],
};
