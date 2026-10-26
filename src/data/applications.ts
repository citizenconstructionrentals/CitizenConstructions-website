export interface ApplicationItem {
  id: string;
  title: string;
  description: string;
  icon: "warehouse" | "factory" | "building-2" | "wrench-screwdriver" | "shopping-bag" | "hard-hat" | "megaphone";
  image: string;
  enabled: boolean;
  whatsappMessage: string;
}

export interface InfoBarFeature {
  icon: "shield-check" | "wrench" | "clock" | "headset";
  line1: string;
  line2: string;
}

export const APPLICATIONS: ApplicationItem[] = [
  {
    id: "warehouse-logistics",
    title: "Warehouses & Logistics",
    description: "High-bay racking inspection, goods handling, overhead lighting, and barcode sensor maintenance.",
    icon: "warehouse",
    image: "/images/applications/01-warehouse.jpg",
    enabled: true,
    whatsappMessage:
      "Hello Citizen Construction Rentals, I need a lift on rent for Warehouses & Logistics. Please share availability and rental rates. Site location: , Duration: , Working height: ",
  },
  {
    id: "industrial-plants",
    title: "Industrial Plants & Facilities",
    description: "Machinery installation, overhead crane inspection, pipeline maintenance, and structural retrofitting.",
    icon: "factory",
    image: "/images/applications/02-factory.jpg",
    enabled: true,
    whatsappMessage:
      "Hello Citizen Construction Rentals, I need a lift on rent for Industrial Plants & Facilities. Please share availability and rental rates. Site location: , Duration: , Working height: ",
  },
  {
    id: "facade-painting",
    title: "Facade & Painting Work",
    description: "Exterior glazing, pressure washing, waterproof coating, and architectural façade finishing.",
    icon: "building-2",
    image: "/images/applications/03-facade.jpg",
    enabled: true,
    whatsappMessage:
      "Hello Citizen Construction Rentals, I need a lift on rent for Facade & Painting Work. Please share availability and rental rates. Site location: , Duration: , Working height: ",
  },
  {
    id: "hvac-electrical",
    title: "HVAC & Electrical Installation",
    description: "Cable tray routing, ventilation ducting, fire safety sprinkler systems, and electrical maintenance.",
    icon: "wrench-screwdriver",
    image: "/images/applications/06-hvac-electrical.jpg",
    enabled: true,
    whatsappMessage:
      "Hello Citizen Construction Rentals, I need a lift on rent for HVAC & Electrical Installation. Please share availability and rental rates. Site location: , Duration: , Working height: ",
  },
  {
    id: "malls-showrooms",
    title: "Malls & Showrooms",
    description: "Atrium décor, seasonal installations, ceiling lighting, and retail fit-outs with non-marking tyres.",
    icon: "shopping-bag",
    image: "/images/applications/05-mall-showroom.jpg",
    enabled: false,
    whatsappMessage:
      "Hello Citizen Construction Rentals, I need a lift on rent for Malls & Showrooms. Please share availability and rental rates. Site location: , Duration: , Working height: ",
  },
  {
    id: "construction-infra",
    title: "Construction & Infrastructure",
    description: "Steel erection, concrete work, structural installation, and large-scale project support.",
    icon: "hard-hat",
    image: "/images/applications/07-construction.jpg",
    enabled: false,
    whatsappMessage:
      "Hello Citizen Construction Rentals, I need a lift on rent for Construction & Infrastructure. Please share availability and rental rates. Site location: , Duration: , Working height: ",
  },
  {
    id: "signage-hoardings",
    title: "Signage & Hoardings",
    description: "Safe positioning for billboard installation, high-altitude LED signage mounting, and banner setup.",
    icon: "megaphone",
    image: "/images/applications/04-signage.jpg",
    enabled: false,
    whatsappMessage:
      "Hello Citizen Construction Rentals, I need a lift on rent for Signage & Hoardings. Please share availability and rental rates. Site location: , Duration: , Working height: ",
  },
];

export const INFO_BAR_FEATURES: InfoBarFeature[] = [
  {
    icon: "shield-check",
    line1: "CE Certified",
    line2: "Machines",
  },
  // CONFIRM WITH OWNER
  {
    icon: "wrench",
    line1: "Well-Maintained",
    line2: "Equipment",
  },
  // CONFIRM WITH OWNER
  {
    icon: "clock",
    line1: "On-Time",
    line2: "Delivery",
  },
  {
    icon: "headset",
    line1: "Quick Support",
    line2: "on WhatsApp",
  },
];

export function getEnabledApplications(): ApplicationItem[] {
  return APPLICATIONS.filter((app) => {
    if (!app.enabled) return false;

    // Build/SSR check for image file existence
    if (typeof window === "undefined") {
      try {
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        const fs = eval("require('fs')");
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        const path = eval("require('path')");
        const filePath = path.join(process.cwd(), "public", app.image.replace(/^\//, ""));
        if (!fs.existsSync(filePath)) {
          console.warn(
            `\x1b[33m[Applications Warning]\x1b[0m Card image missing on disk: "${filePath}". Card "${app.title}" will not be rendered.`
          );
          return false;
        }
      } catch {
        // Fallback if require is unavailable
      }
    }
    return true;
  });
}
