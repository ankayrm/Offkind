import { NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  ACCESS_TOKEN,
  accessCookieOptions,
} from "@/lib/access-gate";

/** Invite code. Override with ACCESS_CODE in env if needed. */
const ACCESS_CODE = (process.env.ACCESS_CODE ?? "OFT").trim().toUpperCase();

function normalizeCode(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, "").toUpperCase();
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Enter the code." },
      { status: 400 }
    );
  }

  const code =
    typeof body === "object" && body && "code" in body
      ? normalizeCode((body as { code: unknown }).code)
      : "";

  if (!code || code !== ACCESS_CODE) {
    return NextResponse.json(
      { ok: false, error: "Wrong code." },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ACCESS_COOKIE, ACCESS_TOKEN, accessCookieOptions);
  return res;
}
