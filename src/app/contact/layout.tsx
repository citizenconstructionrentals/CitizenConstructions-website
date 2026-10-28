import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Scissor Lift Rental Quote | Contact Citizen Construction Rentals",
  description:
    "Contact Citizen Construction Rentals for instant scissor lift and boom lift rental quotes across India. Connect via WhatsApp or call our rental desk directly.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: "Scissor Lift Rental Quote | Contact Citizen Construction Rentals",
    description:
      "Contact Citizen Construction Rentals for instant scissor lift and boom lift rental quotes across India. Connect via WhatsApp or call our rental desk directly.",
    url: `${siteConfig.url}/contact`,
    images: [{ url: `${siteConfig.url}/images/hero/hero-boom-lot.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scissor Lift Rental Quote | Contact Citizen Construction Rentals",
    description:
      "Contact Citizen Construction Rentals for instant scissor lift and boom lift rental quotes across India. Connect via WhatsApp or call our rental desk directly.",
    images: [`${siteConfig.url}/images/hero/hero-boom-lot.jpg`],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
