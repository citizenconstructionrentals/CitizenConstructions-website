export type CategoryStatus = "live" | "coming-soon";

export interface ContactPhone {
  display: string;
  raw: string; // digits only with country code
  label: string;
  isPrimary?: boolean;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  alternateName: string[];
  tagline: string;
  description: string;
  url: string;
  domain: string;
  foundingYear: number;
  areaServed: string;
  
  // Contact details - Single source of truth
  phones: {
    primary: ContactPhone;
    secondary: ContactPhone;
  };
  email: string;
  
  // Social Links
  social: {
    facebook: string;
    instagram: string;
  };

  address: string;
  postalAddress: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  mapEmbedUrl?: string;

  // Category status flags ("live" | "coming-soon")
  // Default: ALL categories "live"
  categoryStatus: {
    brandNewScissor: CategoryStatus;
    brandNewBoom: CategoryStatus;
    usedScissor: CategoryStatus;
    usedBoom: CategoryStatus;
  };
}

const resolvedSiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? "https://citizenconstructions.com" : "http://localhost:3000")
).replace(/\/$/, "");

export const siteConfig: SiteConfig = {
  name: "Citizen Construction Rentals",
  legalName: "Citizen Construction Rentals",
  alternateName: ["Citizen Constructions"],
  tagline: "Scissor lift & boom lift rental across India. Since 2000.",
  description:
    "Citizen Construction Rentals rents scissor lifts and boom lifts across India. Brand new Straightline and trusted JLG and Genie fleet, delivered to your site. Operating since 2000.",
  url: resolvedSiteUrl,
  domain: "citizenconstructions.com",
  foundingYear: 2000,
  areaServed: "India",

  phones: {
    primary: {
      display: "+91 98112 03530",
      raw: "919811203530",
      label: "98112 03530",
      isPrimary: true,
    },
    secondary: {
      display: "+91 81783 86750",
      raw: "918178386750",
      label: "81783 86750",
      isPrimary: false,
    },
  },

  email: "rentalscitizen@gmail.com",

  social: {
    facebook: "https://www.facebook.com/profile.php?id=61594931858571",
    instagram: "https://www.instagram.com/citizenconstructionrentals/",
  },

  address: "#13, Ground Floor, Block 20, Moti Nagar, New Delhi - 110015, India",
  postalAddress: {
    streetAddress: "#13, Ground Floor, Block 20, Moti Nagar",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110015",
    addressCountry: "IN",
  },
  mapEmbedUrl: "",

  categoryStatus: {
    brandNewScissor: "live",
    brandNewBoom: "live",
    usedScissor: "live",
    usedBoom: "live",
  },
};
