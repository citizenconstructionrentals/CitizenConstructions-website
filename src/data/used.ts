export interface UsedUnit {
  id: string;
  brand: "JLG" | "Genie";
  model: string;
  type: "Scissor Lift" | "Boom Lift";
  platformHeight?: string;
  workingHeight?: string;
  notes?: string;
  images: string[];
}

export interface UsedBrandCategory {
  brand: "JLG" | "Genie";
  machineType: "Scissor Lift" | "Boom Lift";
  title: string;
  description: string;
  image: string;
  whatsappMessage: string;
}

export const USED_TRADEMARK_DISCLAIMER =
  "JLG and Genie are trademarks of their respective owners. Citizen Construction Rentals is an independent rental company and is not affiliated with or endorsed by them.";

// Individual used fleet units list
export const usedFleetUnits: UsedUnit[] = [];

export const usedScissorBrands: UsedBrandCategory[] = [
  {
    brand: "JLG",
    machineType: "Scissor Lift",
    title: "JLG Scissor Lifts on Rent",
    // CONFIRM WITH OWNER
    description:
      "Reliable electric slab scissor lifts from JLG available on rent across India. A cost-effective rental solution for warehouses, commercial buildings, and industrial facilities.",
    image: "/images/used/jlg-scissor-hd.png",
    whatsappMessage:
      "Hello Citizen Construction Rentals, I'm looking for a used JLG scissor lift on rent. Please share available models and rental rates. Site location: , Duration: ",
  },
  {
    brand: "Genie",
    machineType: "Scissor Lift",
    title: "Genie Scissor Lifts on Rent",
    // CONFIRM WITH OWNER
    description:
      "Proven electric slab scissor lifts from Genie available on rent. Compact dimensions and smooth proportional controls make them ideal for indoor maintenance, HVAC, and fit-out works.",
    image: "/images/used/genie-scissor.jpg",
    whatsappMessage:
      "Hello Citizen Construction Rentals, I'm looking for a used Genie scissor lift on rent. Please share available models and rental rates. Site location: , Duration: ",
  },
];

export const usedBoomBrands: UsedBrandCategory[] = [
  {
    brand: "JLG",
    machineType: "Boom Lift",
    title: "JLG Boom Lifts on Rent",
    // CONFIRM WITH OWNER
    description:
      "High-reach telescopic and articulating boom lifts from JLG on rent. Dependable reach for industrial, construction, and exterior maintenance projects across India.",
    image: "/images/used/jlg-boom-hd.png",
    whatsappMessage:
      "Hello Citizen Construction Rentals, I'm looking for a used JLG boom lift on rent. Please share available models and rental rates. Site location: , Duration: ",
  },
  {
    brand: "Genie",
    machineType: "Boom Lift",
    title: "Genie Boom Lifts on Rent",
    // CONFIRM WITH OWNER
    description:
      "High-reach Genie boom lifts on rent with flexible articulating and straight telescopic reach, delivering stable access over obstacles for plant maintenance and structural work.",
    image: "/images/used/genie-boom-hd.png",
    whatsappMessage:
      "Hello Citizen Construction Rentals, I'm looking for a used Genie boom lift on rent. Please share available models and rental rates. Site location: , Duration: ",
  },
];
