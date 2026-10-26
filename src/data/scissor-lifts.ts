export interface ScissorLiftModel {
  slug: string;
  modelCode: string;
  name: string;
  brand: string;
  condition: "Brand New";
  powerType: "Electric Self-Propelled";
  isCeCertified: boolean;
  availability: string;
  nominalHeight: string;
  
  platformHeight: string; // e.g. "6 m"
  workingHeight: string; // e.g. "8 m"
  platformHeightNum: number;
  workingHeightNum: number;
  safeWorkingLoad: string; // e.g. "500 kg"
  capacityNum: number;
  weight: string; // e.g. "2100 kg"
  
  dimensions: {
    platformSize: string; // L × W × H
    tableExtensionSize: string; // 0.9 m
    wheelbase: string;
    turningRadiusInOut: string;
    overallLength: string;
    overallWidth: string;
    overallHeightFoldedUnfolded: string;
    minGroundClearance: string; // 0.1 / 0.02 m
  };

  specs: {
    motor: string;
    driveSpeedStowed: string;
    maxDriveSpeedRaised: string; // 0.8 km/h
    liftingSpeed: string; // 6-9 m/min
    gradeability: string; // 25%
    maxAllowableWorkingAngle: string; // 1.5° / 3°
    extendedPlatformSwl: string; // 113 kg
    solidTyres: string; // 0.381 × 0.127 m
    battery: string; // Lead acid, maintenance free
    charger: string; // 24 V / 30 A
  };

  images: string[];
  specSheetUrl: string;
}

export const COMMON_SCISSOR_FEATURES: string[] = [
  "Proportional control",
  "Continuous self-propelled",
  "Seamless tire",
  "Standard transport forklift holes",
  "Trouble shooting system",
  "Action beeping",
  "Oil pipe explosion-proof system",
  "Automatic brake system",
  "Emergency descent system",
  "Platform self-locking door",
  "Unidirectional extension platform",
  "Automatic pit protection system",
  "Tilt protection system",
  "Charging protection system",
  "Folding fence",
  "Emergency stop button",
  "Horn",
  "Safety maintenance support rod",
  "Strobe light",
];

export const SCISSOR_HIGHLIGHTS = [
  {
    title: "Best-in-Class Safety",
    description:
      "CE certified; automatic pothole protection, active tilt and load sensing; dual emergency ground & platform controls; basket lowering safety delay.",
  },
  {
    title: "Remarkable Productivity",
    description:
      "Fully proportional raise and drive controls; waterproof platform power outlet; quick-fold guard rails; highly visible charge level indicator.",
  },
  {
    title: "Durability & Reliability",
    description:
      "Heavy-duty reinforced steel scissor arms; motor and component shield protection; heavy wear pads to stop metal wear; maintenance-free battery pack.",
  },
  {
    title: "Access Heights with Ease",
    description:
      "Ergonomic joystick and cradle design; easy foot-pedal extension deck (0.9 m); swing-out battery & hydraulic doors; solid non-marking tyres.",
  },
];

export const scissorLiftsData: ScissorLiftModel[] = [
  {
    slug: "gtjz06",
    nominalHeight: "6 m",
    modelCode: "GTJZ06",
    name: "Straightline GTJZ06",
    brand: "Straightline",
    condition: "Brand New",
    powerType: "Electric Self-Propelled",
    isCeCertified: true,
    availability: "Available on Rent",
    // CONFIRM WITH OWNER
    // Delivered to Your Site
    platformHeight: "6 m",
    workingHeight: "8 m",
    platformHeightNum: 6,
    workingHeightNum: 8,
    safeWorkingLoad: "500 kg",
    capacityNum: 500,
    weight: "2100 kg",
    dimensions: {
      platformSize: "2.27 × 1.12 × 1.13 m",
      tableExtensionSize: "0.9 m",
      wheelbase: "1.89 m",
      turningRadiusInOut: "0.15 / 2.3 m",
      overallLength: "2.43 m",
      overallWidth: "1.22 m",
      overallHeightFoldedUnfolded: "1.71 / 2.28 m",
      minGroundClearance: "0.1 / 0.02 m",
    },
    specs: {
      motor: "24 V / 3.3 kW",
      driveSpeedStowed: "3.8 km/h",
      maxDriveSpeedRaised: "0.8 km/h",
      liftingSpeed: "6–9 m/min",
      gradeability: "25%",
      maxAllowableWorkingAngle: "1.5° / 3°",
      extendedPlatformSwl: "113 kg",
      solidTyres: "0.381 × 0.127 m",
      battery: "Lead acid, maintenance free",
      charger: "24 V / 30 A",
    },
    images: [
      "/images/machines/scissor/scissor-compact-warehouse.webp",
      "/images/machines/scissor/scissor-compact-outdoor.webp",
    ],
    specSheetUrl: "/spec-sheets/straightline-gtjz06.pdf",
  },
  {
    slug: "gtjz08",
    nominalHeight: "8 m",
    modelCode: "GTJZ08",
    name: "Straightline GTJZ08",
    brand: "Straightline",
    condition: "Brand New",
    powerType: "Electric Self-Propelled",
    isCeCertified: true,
    availability: "Available on Rent",
    // CONFIRM WITH OWNER
    // Delivered to Your Site
    platformHeight: "8 m",
    workingHeight: "10 m",
    platformHeightNum: 8,
    workingHeightNum: 10,
    safeWorkingLoad: "450 kg",
    capacityNum: 450,
    weight: "2300 kg",
    dimensions: {
      platformSize: "2.27 × 1.12 × 1.13 m",
      tableExtensionSize: "0.9 m",
      wheelbase: "1.89 m",
      turningRadiusInOut: "0.15 / 2.3 m",
      overallLength: "2.43 m",
      overallWidth: "1.22 m",
      overallHeightFoldedUnfolded: "1.85 / 2.42 m",
      minGroundClearance: "0.1 / 0.02 m",
    },
    specs: {
      motor: "24 V / 3.3 kW",
      driveSpeedStowed: "3.8 km/h",
      maxDriveSpeedRaised: "0.8 km/h",
      liftingSpeed: "6–9 m/min",
      gradeability: "25%",
      maxAllowableWorkingAngle: "1.5° / 3°",
      extendedPlatformSwl: "113 kg",
      solidTyres: "0.381 × 0.127 m",
      battery: "Lead acid, maintenance free",
      charger: "24 V / 30 A",
    },
    images: [
      "/images/machines/scissor/scissor-compact-warehouse.webp",
      "/images/machines/scissor/scissor-compact-outdoor.webp",
    ],
    specSheetUrl: "/spec-sheets/straightline-gtjz08.pdf",
  },
  {
    slug: "gtjz10",
    nominalHeight: "10 m",
    modelCode: "GTJZ10",
    name: "Straightline GTJZ10",
    brand: "Straightline",
    condition: "Brand New",
    powerType: "Electric Self-Propelled",
    isCeCertified: true,
    availability: "Available on Rent",
    // CONFIRM WITH OWNER
    // Delivered to Your Site
    platformHeight: "10 m",
    workingHeight: "12 m",
    platformHeightNum: 10,
    workingHeightNum: 12,
    safeWorkingLoad: "320 kg",
    capacityNum: 320,
    weight: "2500 kg",
    dimensions: {
      platformSize: "2.27 × 1.12 × 1.13 m",
      tableExtensionSize: "0.9 m",
      wheelbase: "1.89 m",
      turningRadiusInOut: "0.15 / 2.3 m",
      overallLength: "2.43 m",
      overallWidth: "1.22 m",
      overallHeightFoldedUnfolded: "1.974 / 2.55 m",
      minGroundClearance: "0.1 / 0.02 m",
    },
    specs: {
      motor: "24 V / 4.5 kW",
      driveSpeedStowed: "3.8 km/h",
      maxDriveSpeedRaised: "0.8 km/h",
      liftingSpeed: "6–9 m/min",
      gradeability: "25%",
      maxAllowableWorkingAngle: "1.5° / 3°",
      extendedPlatformSwl: "113 kg",
      solidTyres: "0.381 × 0.127 m",
      battery: "Lead acid, maintenance free",
      charger: "24 V / 30 A",
    },
    images: [
      "/images/machines/scissor/scissor-tall-studio.webp",
      "/images/machines/scissor/scissor-compact-warehouse.webp",
      "/images/machines/scissor/scissor-compact-outdoor.webp",
    ],
    specSheetUrl: "/spec-sheets/straightline-gtjz10.pdf",
  },
  {
    slug: "gtjz12",
    nominalHeight: "12 m",
    modelCode: "GTJZ12",
    name: "Straightline GTJZ12",
    brand: "Straightline",
    condition: "Brand New",
    powerType: "Electric Self-Propelled",
    isCeCertified: true,
    availability: "Available on Rent",
    // CONFIRM WITH OWNER
    // Delivered to Your Site
    platformHeight: "11.8 m",
    workingHeight: "13.8 m",
    platformHeightNum: 11.8,
    workingHeightNum: 13.8,
    safeWorkingLoad: "320 kg",
    capacityNum: 320,
    weight: "2700 kg",
    dimensions: {
      platformSize: "2.27 × 1.12 × 1.13 m",
      tableExtensionSize: "0.9 m",
      wheelbase: "1.89 m",
      turningRadiusInOut: "0.15 / 2.3 m",
      overallLength: "2.43 m",
      overallWidth: "1.22 m",
      overallHeightFoldedUnfolded: "2.105 / 2.68 m",
      minGroundClearance: "0.1 / 0.02 m",
    },
    specs: {
      motor: "24 V / 4.5 kW",
      driveSpeedStowed: "3.8 km/h",
      maxDriveSpeedRaised: "0.8 km/h",
      liftingSpeed: "6–9 m/min",
      gradeability: "25%",
      maxAllowableWorkingAngle: "1.5° / 3°",
      extendedPlatformSwl: "113 kg",
      solidTyres: "0.381 × 0.127 m",
      battery: "Lead acid, maintenance free",
      charger: "24 V / 30 A",
    },
    images: [
      "/images/machines/scissor/scissor-tall-studio.webp",
      "/images/machines/scissor/scissor-compact-warehouse.webp",
      "/images/machines/scissor/scissor-compact-outdoor.webp",
    ],
    specSheetUrl: "/spec-sheets/straightline-gtjz12.pdf",
  },
  {
    slug: "gtjz14",
    nominalHeight: "14 m",
    modelCode: "GTJZ14",
    name: "Straightline GTJZ14",
    brand: "Straightline",
    condition: "Brand New",
    powerType: "Electric Self-Propelled",
    isCeCertified: true,
    availability: "Available on Rent",
    // CONFIRM WITH OWNER
    // Delivered to Your Site
    platformHeight: "13.7 m",
    workingHeight: "15.7 m",
    platformHeightNum: 13.7,
    workingHeightNum: 15.7,
    safeWorkingLoad: "227 kg",
    capacityNum: 227,
    weight: "3200 kg",
    dimensions: {
      platformSize: "2.64 × 1.12 × 1.13 m",
      tableExtensionSize: "0.9 m",
      wheelbase: "2.26 m",
      turningRadiusInOut: "0.15 / 2.85 m",
      overallLength: "2.8 m",
      overallWidth: "1.39 m",
      overallHeightFoldedUnfolded: "2.096 / 2.67 m",
      minGroundClearance: "0.1 / 0.02 m",
    },
    specs: {
      motor: "24 V / 4.5 kW",
      driveSpeedStowed: "3.5 km/h",
      maxDriveSpeedRaised: "0.8 km/h",
      liftingSpeed: "6–9 m/min",
      gradeability: "25%",
      maxAllowableWorkingAngle: "1.5° / 3°",
      extendedPlatformSwl: "113 kg",
      solidTyres: "0.381 × 0.127 m",
      battery: "Lead acid, maintenance free",
      charger: "24 V / 30 A",
    },
    images: [
      "/images/machines/scissor/scissor-tall-studio.webp",
      "/images/machines/scissor/scissor-compact-warehouse.webp",
      "/images/machines/scissor/scissor-compact-outdoor.webp",
    ],
    specSheetUrl: "/spec-sheets/straightline-gtjz14.pdf",
  },
];
