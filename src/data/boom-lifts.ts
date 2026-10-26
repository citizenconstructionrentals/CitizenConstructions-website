export interface BoomLiftModel {
  slug: string;
  modelCode: string;
  name: string; // editable title
  brand: string;
  condition: "Brand New";
  type: "Telescopic Boom Lift" | "Articulating Boom Lift";
  isCeCertified: boolean;
  availability: string;
  
  // Optional spec fields - NEVER invented; rendered only when defined
  platformHeight?: string;
  workingHeight?: string;
  horizontalOutreach?: string;
  capacity?: string;
  weight?: string;
  powerType?: string;
  specSheetUrl?: string;
  specs?: { label: string; value: string }[];

  images: string[];
  theme?: "light" | "dark";
  summary: string;
}

export const boomLiftsData: BoomLiftModel[] = [
  {
    slug: "sl28t",
    modelCode: "SL28T",
    name: "Straightline SL28T Telescopic Boom Lift",
    brand: "Straightline",
    condition: "Brand New",
    type: "Telescopic Boom Lift",
    isCeCertified: true,
    availability: "Available on Rent",
    // CONFIRM WITH OWNER
    // Delivered to Your Site
    images: ["/images/machines/boom/sl28t.webp"],
    theme: "light",
    summary:
      "Brand new CE-certified Straightline SL28T telescopic boom lift for high-reach industrial, construction, and maintenance projects across India. Delivered to your site across India.",
  },
  {
    slug: "articulating-boom",
    modelCode: "Articulating",
    name: "Straightline Articulating Boom Lift",
    brand: "Straightline",
    condition: "Brand New",
    type: "Articulating Boom Lift",
    isCeCertified: true,
    availability: "Available on Rent",
    // CONFIRM WITH OWNER
    // Delivered to Your Site
    images: ["/images/machines/boom/boom-articulating-raised.webp"],
    theme: "light",
    summary:
      "Straightline articulated boom lift with dual-joint up-and-over reach, engineered for navigating around obstacles in crowded industrial plants and facilities.",
  },
];
