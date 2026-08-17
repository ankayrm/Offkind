import type { Metadata } from "next";
import { Syne, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import { brand } from "@/data/brand";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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
    default: `${brand.registeredName} — ${brand.tagline}`,
    template: `%s · ${brand.shortName}`,
  },
  description: brand.description,
  metadataBase: new URL("https://offkindtheory.com"),
  openGraph: {
    title: brand.registeredName,
    description: brand.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ok-off text-ok-black font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
