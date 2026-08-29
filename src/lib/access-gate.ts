/** Cookie that lets this browser request through the server gate. */
export const ACCESS_COOKIE = "oft-gate";
export const ACCESS_TOKEN = "oft-v1";
/** Tab-only flag. Cleared when the tab is closed, so OFT is required again. */
export const ACCESS_SESSION_KEY = "oft-gate-tab";

export const accessCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

/** Only allow in-site paths so `next` cannot bounce people off-domain. */
export function safeNextPath(value: string | null | undefined): string {
  if (!value) return "/";
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return "/";
  }
  if (value.startsWith("/gate") || value.startsWith("/api/")) return "/";
  return value;
}
