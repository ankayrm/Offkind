import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import { cookies, headers } from "next/headers";
import { Providers } from "@/components/layout/Providers";
import { AccessGuard } from "@/components/gate/AccessGuard";
import { brand } from "@/data/brand";
import { features } from "@/data/features";
import { ACCESS_COOKIE, ACCESS_TOKEN } from "@/lib/access-gate";
import "./globals.css";

const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: `${brand.registeredName} · ${brand.tagline}`,
    template: `%s · ${brand.shortName}`,
  },
  description: brand.description,
  metadataBase: new URL("https://offkindtheory.com"),
  openGraph: {
    title: brand.registeredName,
    description: brand.description,
    type: "website",
    siteName: brand.registeredName,
    locale: "en_US",
    url: "/",
    images: [
      {
        url: "https://offkindtheory.com/og.jpg",
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: `${brand.registeredName} — ${brand.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: brand.registeredName,
    description: brand.description,
    images: ["https://offkindtheory.com/og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#121212",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jar = await cookies();
  const pathname = (await headers()).get("x-ok-pathname") ?? "";
  const isGate = pathname === "/gate";
  const cookieUnlocked = jar.get(ACCESS_COOKIE)?.value === ACCESS_TOKEN;
  const gated = features.accessGate;
  const showChrome = !gated || (cookieUnlocked && !isGate);

  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body
        className={
          showChrome
            ? "flex min-h-full flex-col bg-ok-off text-ok-black font-sans"
            : "flex min-h-full flex-col bg-ok-black text-ok-off font-sans"
        }
      >
        {gated && showChrome ? (
          <AccessGuard>
            <Providers>{children}</Providers>
          </AccessGuard>
        ) : showChrome ? (
          <Providers>{children}</Providers>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
