export interface PageKeywords {
  path: string;
  primary: string;
  secondary: string[];
  longTail: string[];
  intent: "commercial" | "local" | "informational";
}

export const SEO_KEYWORD_MAP: Record<string, PageKeywords> = {
  "/": {
    path: "/",
    primary: "scissor lift on rent",
    secondary: [
      "boom lift on rent",
      "scissor lift rental India",
      "boom lift rental India",
      "aerial work platform rental",
      "man lift on rent",
      "aerial lift on hire",
      "Citizen Construction Rentals",
    ],
    longTail: [
      "what is the rent of a scissor lift per day in India",
      "which scissor lift height do I need",
      "what is the difference between a scissor lift and a boom lift",
      "can I rent a brand new scissor lift",
      "do you rent lifts across India",
    ],
    intent: "commercial",
  },
  "/scissor-lift-on-rent": {
    path: "/scissor-lift-on-rent",
    primary: "scissor lift on rent in India",
    secondary: [
      "scissor lift rental",
      "scissor lift on hire",
      "electric scissor lift on rent",
      "self-propelled scissor lift rental",
      "man lift on rent",
      "scissor lift rent per month",
      "scissor lift rent per day",
    ],
    longTail: [
      "which scissor lift height do I need",
      "can scissor lifts be used indoors",
      "scissor lift kiraye par",
      "what is the rent of a scissor lift per day in India",
    ],
    intent: "commercial",
  },
  "/boom-lift-on-rent": {
    path: "/boom-lift-on-rent",
    primary: "boom lift on rent in India",
    secondary: [
      "boom lift rental",
      "boom lift on hire",
      "cherry picker on rent",
      "aerial work platform on rent",
      "boom lift for high reach work",
    ],
    longTail: [
      "what is the difference between a scissor lift and a boom lift",
      "boom lift kiraye par",
      "how to rent a boom lift for industrial maintenance",
    ],
    intent: "commercial",
  },
  "/rental-rates": {
    path: "/rental-rates",
    primary: "scissor lift rental rate",
    secondary: [
      "boom lift rental cost",
      "scissor lift rent per day",
      "scissor lift rent per month",
      "aerial work platform rental charges",
      "how much does it cost to rent a scissor lift",
    ],
    longTail: [
      "what is the rent of a scissor lift per day in India",
      "how are aerial work platform rental charges calculated",
      "monthly scissor lift rental cost comparison",
    ],
    intent: "commercial",
  },
  "/brand-new": {
    path: "/brand-new",
    primary: "brand new lift on rent",
    secondary: [
      "new scissor lift on rent",
      "new boom lift on rent",
      "CE certified lift on rent",
      "Straightline lift rental",
    ],
    longTail: [
      "benefits of renting brand new aerial work platforms",
      "zero breakdown CE certified lifts on hire",
      "fresh fleet rental mobilization",
    ],
    intent: "commercial",
  },
  "/brand-new/scissor-lifts": {
    path: "/brand-new/scissor-lifts",
    primary: "brand new scissor lift on rent",
    secondary: [
      "Straightline scissor lift rental",
      "CE certified scissor lift on rent",
      "electric scissor lift rental",
      "6m 8m 10m 12m 14m scissor lift on rent",
    ],
    longTail: [
      "electric self-propelled scissor lifts on hire",
      "non-marking tyre scissor lift rental for indoor warehouses",
    ],
    intent: "commercial",
  },
  "/brand-new/boom-lifts": {
    path: "/brand-new/boom-lifts",
    primary: "brand new boom lift on rent",
    secondary: [
      "Straightline boom lift rental",
      "CE certified boom lift on rent",
      "boom lift for high reach work on rent",
    ],
    longTail: [
      "high reach aerial work platform rental for industrial facilities",
      "Straightline boom lift hire across India",
    ],
    intent: "commercial",
  },
  "/brand-new/scissor-lifts/gtjz06": {
    path: "/brand-new/scissor-lifts/gtjz06",
    primary: "6 m scissor lift on rent",
    secondary: [
      "Straightline GTJZ06 on rent",
      "6 meter scissor lift rental",
      "6m scissor lift on hire",
      "electric scissor lift 6m",
    ],
    longTail: [
      "compact 6 meter scissor lift hire for warehouse maintenance",
      "8 meter working height electric scissor lift rental",
    ],
    intent: "commercial",
  },
  "/brand-new/scissor-lifts/gtjz08": {
    path: "/brand-new/scissor-lifts/gtjz08",
    primary: "8 m scissor lift on rent",
    secondary: [
      "Straightline GTJZ08 on rent",
      "8 meter scissor lift rental",
      "8m scissor lift on hire",
      "electric scissor lift 8m",
    ],
    longTail: [
      "10 meter working height scissor lift rental India",
      "8 meter electric scissor lift for logistics hubs",
    ],
    intent: "commercial",
  },
  "/brand-new/scissor-lifts/gtjz10": {
    path: "/brand-new/scissor-lifts/gtjz10",
    primary: "10 m scissor lift on rent",
    secondary: [
      "Straightline GTJZ10 on rent",
      "10 meter scissor lift rental",
      "10m scissor lift on hire",
      "electric scissor lift 10m",
    ],
    longTail: [
      "12 meter working height electric scissor lift hire",
      "10 meter industrial scissor lift on rent",
    ],
    intent: "commercial",
  },
  "/brand-new/scissor-lifts/gtjz12": {
    path: "/brand-new/scissor-lifts/gtjz12",
    primary: "12 m scissor lift on rent",
    secondary: [
      "Straightline GTJZ12 on rent",
      "12 meter scissor lift rental",
      "12m scissor lift on hire",
      "electric scissor lift 12m",
    ],
    longTail: [
      "13.7 meter working height scissor lift rental",
      "12 meter electric scissor lift on hire in India",
    ],
    intent: "commercial",
  },
  "/brand-new/scissor-lifts/gtjz14": {
    path: "/brand-new/scissor-lifts/gtjz14",
    primary: "14 m scissor lift on rent",
    secondary: [
      "Straightline GTJZ14 on rent",
      "14 meter scissor lift rental",
      "14m scissor lift on hire",
      "electric scissor lift 14m",
    ],
    longTail: [
      "15.7 meter high reach electric scissor lift on rent",
      "14 meter warehouse access platform hire",
    ],
    intent: "commercial",
  },
  "/brand-new/boom-lifts/sl28t": {
    path: "/brand-new/boom-lifts/sl28t",
    primary: "Straightline SL28T boom lift on rent",
    secondary: [
      "SL28T boom lift rental",
      "boom lift on rent",
      "28m working height boom lift hire",
      "high reach boom lift rental India",
    ],
    longTail: [
      "heavy industrial maintenance 28 meter boom lift rental",
      "Straightline SL28T high-altitude platform hire",
    ],
    intent: "commercial",
  },
  "/brand-new/boom-lifts/articulating-boom": {
    path: "/brand-new/boom-lifts/articulating-boom",
    primary: "Straightline articulating boom lift on rent",
    secondary: [
      "articulating boom lift rental",
      "boom lift on rent",
      "up and over boom lift hire",
      "16m working height boom lift rental",
    ],
    longTail: [
      "articulating boom lift for obstacle clearance on rent",
      "Straightline articulating aerial work platform hire",
    ],
    intent: "commercial",
  },
  "/used": {
    path: "/used",
    primary: "JLG and Genie lift on rent",
    secondary: [
      "used lift on rent",
      "JLG lift rental",
      "Genie lift rental",
      "trusted aerial platform hire",
    ],
    longTail: [
      "proven used JLG and Genie aerial platforms on rent",
      "cost effective used scissor and boom lift hire",
    ],
    intent: "commercial",
  },
  "/used/scissor-lifts": {
    path: "/used/scissor-lifts",
    primary: "JLG scissor lift on rent",
    secondary: [
      "Genie scissor lift on rent",
      "used scissor lift on rent",
      "Genie scissor lift rental India",
      "JLG electric scissor rental",
    ],
    longTail: [
      "tested JLG and Genie electric scissor lifts on hire",
      "reliable used scissor lift rentals across India",
    ],
    intent: "commercial",
  },
  "/used/boom-lifts": {
    path: "/used/boom-lifts",
    primary: "JLG boom lift on rent",
    secondary: [
      "Genie boom lift on rent",
      "used boom lift on rent",
      "Genie boom lift rental India",
      "JLG rough terrain boom rental",
    ],
    longTail: [
      "tested JLG and Genie boom lifts on hire for plant maintenance",
      "reliable high-reach used boom lift rentals",
    ],
    intent: "commercial",
  },
  "/about": {
    path: "/about",
    primary: "scissor lift rental company in India",
    secondary: [
      "aerial work platform rental company",
      "boom lift rental company since 2000",
      "Citizen Construction Rentals",
      "pan India lift rental operations",
    ],
    longTail: [
      "trusted access equipment rental partner since 2000",
      "experienced aerial lift equipment mobilizer in India",
    ],
    intent: "informational",
  },
  "/contact": {
    path: "/contact",
    primary: "scissor lift rental quote",
    secondary: [
      "boom lift rental contact",
      "scissor lift on rent contact number",
      "Citizen Construction Rentals contact",
      "instant rental quote on WhatsApp",
    ],
    longTail: [
      "how to request an aerial work platform rental quote",
      "direct phone numbers for scissor lift hire in India",
    ],
    intent: "commercial",
  },
};

export const BANNED_SALES_WORDS = [
  "buy",
  "purchase",
  "sale",
  "sell",
  "dealer",
  "dealers",
  "dealership",
  "distributor",
  "distributors",
  "catalogue",
  "warranty",
  "guarantee",
  "price to buy",
  "for sale",
];
