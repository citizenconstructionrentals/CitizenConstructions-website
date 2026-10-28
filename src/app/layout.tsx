import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { TopInfoBar } from "@/components/layout/TopInfoBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { OrganizationJsonLd } from "@/components/shared/JsonLd";
import { RentalQuoteProvider } from "@/components/ui/RentalQuoteContext";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlowCondensedItalic = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["800"],
  style: ["italic"],
  variable: "--font-barlow-condensed-italic",
  display: "swap",
  preload: false,
});

const isPreviewEnv =
  process.env.NEXT_PUBLIC_ENV === "preview" || process.env.NEXT_PUBLIC_ENV === "staging";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Citizen Construction Rentals | Scissor & Boom Lifts on Rent in India",
    template: "%s | Citizen Construction Rentals",
  },
  description:
    "Pan-India aerial work platform rentals operating since 2000. Rent brand new CE-certified Straightline scissor lifts & boom lifts, and trusted used JLG & Genie machines.",
  alternates: {
    canonical: siteConfig.url,
  },
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: "Citizen Construction Rentals | Scissor & Boom Lifts on Rent in India",
    description:
      "Pan-India aerial work platform rentals operating since 2000. Rent brand new CE-certified Straightline scissor lifts & boom lifts, and trusted used JLG & Genie machines.",
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/images/hero/hero-boom-lot.jpg`,
        width: 1024,
        height: 576,
        alt: "Citizen Construction Rentals - Straightline Aerial Work Platforms Pan-India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Citizen Construction Rentals | Scissor & Boom Lifts on Rent in India",
    description:
      "Pan-India aerial work platform rentals operating since 2000. Rent brand new CE-certified Straightline scissor lifts & boom lifts, and trusted used JLG & Genie machines.",
    images: [`${siteConfig.url}/images/hero/hero-boom-lot.jpg`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/brand/favicon.png" }],
  },
  robots: isPreviewEnv
    ? {
        index: false,
        follow: false,
        nocache: true,
      }
    : {
        index: true,
        follow: true,
      },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable} ${barlowCondensedItalic.variable}`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero/hero-mobile.jpg"
          media="(max-width: 767px)"
        />
        <link
          rel="preload"
          as="image"
          href="/images/hero/hero-scissor-lift-hd.jpg"
          media="(min-width: 768px)"
        />
      </head>
      <body className="flex flex-col min-h-screen antialiased bg-white text-slate-900 font-sans">
        <RentalQuoteProvider>
          <OrganizationJsonLd />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileStickyBar />
          <FloatingWhatsApp />
        </RentalQuoteProvider>
      </body>
    </html>
  );
}
