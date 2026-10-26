import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Scissor Lift Rental Quote | Contact Citizen Construction Rentals",
  description:
    "Request a scissor lift rental quote or boom lift rental contact. Call our scissor lift on rent contact number or connect with Citizen Construction Rentals contact for an instant rental quote on WhatsApp.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  keywords: [
    "scissor lift rental quote",
    "boom lift rental contact",
    "scissor lift on rent contact number",
    "Citizen Construction Rentals contact",
    "instant rental quote on WhatsApp",
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
