export interface CityInfo {
  name: string;
  slug: string;
  tier: 1 | 2;
  state: string;
  industrialHubs: string[];
  distanceBase: string;
  deliveryWording: string;
  scissorIntro: string;
  boomIntro: string;
}

export const CITIES: CityInfo[] = [
  {
    name: "Delhi",
    slug: "delhi",
    tier: 1,
    state: "Delhi NCR",
    industrialHubs: [
      "Okhla Industrial Area (Phases I–III)",
      "Mayapuri Industrial Area",
      "Narela Industrial Complex",
      "Bawana Industrial Area",
      "Patparganj Industrial Area",
      "Kirti Nagar Industrial & Timber Market",
      "Mohan Cooperative Industrial Estate",
      "Wazirpur Industrial Area",
    ],
    distanceBase: "Local Delhi dispatch from our central yard in Moti Nagar",
    deliveryWording:
      "Dispatched directly from our headquarters and central rental yard in Moti Nagar, New Delhi. Equipment reaches project sites across North, South, East, West, and Central Delhi within hours on dedicated tilt-bed haulers.",
    scissorIntro:
      "Citizen Construction Rentals provides brand new CE-certified Straightline electric scissor lifts and dependable used JLG and Genie machines on rent across Delhi. Whether your job involves warehouse pallet racking inspection in Narela, retail lighting retrofit in South Delhi, or electrical MEP cabling in Okhla, our battery-powered scissor lifts deliver clean, zero-emission vertical access with non-marking tyres that safeguard polished flooring.",
    boomIntro:
      "For elevated outdoor structural installation, facade glazing, and high-mast infrastructure across Delhi, Citizen Construction Rentals supplies heavy-duty Straightline telescopic and articulating boom lifts along with certified used Genie and JLG aerial work platforms. Dispatched directly from our Moti Nagar base, our boom lift fleet provides up to 28 m working height with exceptional horizontal outreach for tight urban job sites.",
  },
  {
    name: "Gurgaon",
    slug: "gurgaon",
    tier: 1,
    state: "Haryana (Delhi NCR)",
    industrialHubs: [
      "Udyog Vihar (Phases I–V)",
      "IMT Manesar Mega Industrial Zone",
      "DLF Cyber City & Cyber Hub",
      "Golf Course Extension Road Commercial Belt",
      "Sohna Road Commercial Hub",
      "Pace City I & II",
      "Sector 37 Industrial Cluster",
      "Dharuhera & Bilaspur Logistics Corridors",
    ],
    distanceBase: "Dispatched from Moti Nagar, New Delhi (approx. 25–40 km)",
    deliveryWording:
      "Mobilized rapidly from our Moti Nagar yard via NH-48 and the Delhi-Gurgaon Expressway. Dedicated carriers ensure same-day or next-day site delivery across corporate towers in Cyber City and manufacturing plants in IMT Manesar.",
    scissorIntro:
      "Citizen Construction Rentals delivers CE-certified Straightline electric scissor lifts on rent across Gurgaon and Manesar. From Fortune 500 corporate interior fit-outs in Cyber City to high-density FMCG distribution centers along the Bilaspur-Tauru road, our compact, quiet electric scissor lifts provide safe working heights from 8 m to 15.7 m with zero exhaust emissions.",
    boomIntro:
      "High-rise facade maintenance, steel structure assembly, and infrastructure construction in Gurgaon demand stable aerial reach. Citizen Construction Rentals supplies Straightline SL28T telescopic booms (28 m working height) and articulating boom lifts across Gurgaon, Udyog Vihar, and IMT Manesar, mobilized quickly from our nearby Delhi headquarters.",
  },
  {
    name: "Noida",
    slug: "noida",
    tier: 1,
    state: "Uttar Pradesh (Delhi NCR)",
    industrialHubs: [
      "Sector 57 to 68 Industrial Sectors",
      "Sector 62 & 63 IT / Corporate Parks",
      "Noida Special Economic Zone (NSEZ)",
      "Greater Noida Ecotech Industrial Zones (Ecotech I–XI)",
      "Surajpur Industrial Area",
      "Yamuna Expressway Logistics & Electronics Hub",
      "Sector 80–85 Manufacturing Cluster",
    ],
    distanceBase: "Dispatched from Moti Nagar, New Delhi (approx. 30–45 km)",
    deliveryWording:
      "Transported from our New Delhi base via the DND Flyway and the Noida-Greater Noida Expressway. We provide prompt equipment mobilization directly to factory floors in Noida sectors and expansive warehouses in Greater Noida.",
    scissorIntro:
      "Rent reliable electric scissor lifts in Noida and Greater Noida from Citizen Construction Rentals. Our Straightline GTJZ series (6 m to 14 m platform height) and inspected used JLG/Genie scissor lifts support electronics assembly plants, IT campus HVAC maintenance, and logistics fulfillment centers throughout the Noida and Yamuna Expressway industrial belt.",
    boomIntro:
      "For expansive industrial sheds in Ecotech Greater Noida and commercial facade installations along the Noida Expressway, Citizen Construction Rentals delivers high-reach Straightline and Genie boom lifts. Our machines feature rugged drivetrains, smooth proportional controls, and extensive outreach to maneuver over complex pipe racks and structural steelwork.",
  },
  {
    name: "Ghaziabad",
    slug: "ghaziabad",
    tier: 1,
    state: "Uttar Pradesh (Delhi NCR)",
    industrialHubs: [
      "Sahibabad Industrial Area (Sites 1–4)",
      "Loni Road Industrial Corridor",
      "Kavi Nagar Industrial Area",
      "Bulandshahr Road Industrial Area",
      "Meerut Road Industrial Belt",
      "Dasna & Masuri Logistics Centers",
      "South Side GT Road Industrial Area",
    ],
    distanceBase: "Dispatched from Moti Nagar, New Delhi (approx. 30–40 km)",
    deliveryWording:
      "Dispatched from our Moti Nagar, New Delhi facility via the Delhi-Meerut Expressway. Fast transit times allow swift deployment to manufacturing units in Sahibabad and warehousing facilities along GT Road.",
    scissorIntro:
      "Access heavy-duty Straightline electric scissor lifts on hire in Ghaziabad through Citizen Construction Rentals. Ideal for steel fabrication units, food processing facilities, and manufacturing factories across Sahibabad and Bulandshahr Road, our scissor lifts offer spacious platforms with high payload capacities up to 320 kg for operators, tools, and materials.",
    boomIntro:
      "Citizen Construction Rentals provides articulating and telescopic boom lifts on rent across Ghaziabad industrial zones. Whether your team requires 16 m articulating reach for factory roof repair in Sahibabad or 28 m telescopic reach for structural steel erection along Meerut Road, our fleet is fully serviced, certified, and ready for deployment.",
  },
  {
    name: "Faridabad",
    slug: "faridabad",
    tier: 1,
    state: "Haryana (Delhi NCR)",
    industrialHubs: [
      "Sector 24 & 25 Industrial Areas",
      "Sector 6 Industrial Area",
      "Ballabhgarh Industrial Belt",
      "NIT Faridabad Industrial Corridor",
      "Prithla Industrial & Warehousing Cluster",
      "Mathura Road Manufacturing Strip",
      "Sector 58 & 59 Heavy Engineering Hubs",
    ],
    distanceBase: "Dispatched from Moti Nagar, New Delhi (approx. 35–50 km)",
    deliveryWording:
      "Dispatched from our Moti Nagar base via Mathura Road / Delhi-Agra Highway directly to industrial plants and logistics parks in Faridabad and Ballabhgarh with prompt transit schedules.",
    scissorIntro:
      "Citizen Construction Rentals supplies brand new Straightline electric scissor lifts on rent in Faridabad. Designed for automotive parts manufacturers, heavy engineering plants, and modern supply-chain godowns across Sector 24, Sector 25, and Ballabhgarh, our lifts ensure dependable vertical elevation with zero emissions and non-marking tyres.",
    boomIntro:
      "Rent certified diesel and electric boom lifts in Faridabad from Citizen Construction Rentals. Our Straightline articulating boom lifts and SL28T telescopic machines provide superior outreach over heavy machinery, production lines, and high-bay pipe networks across Faridabad engineering and manufacturing facilities.",
  },
  {
    name: "Mumbai",
    slug: "mumbai",
    tier: 2,
    state: "Maharashtra",
    industrialHubs: [
      "Bhiwandi Warehousing & Distribution Hub",
      "Navi Mumbai (TTC & Rabale MIDC)",
      "Taloja MIDC Industrial Area",
      "Thane-Belapur Industrial Corridor",
      "Bandra Kurla Complex (BKC) Commercial Center",
      "Andheri MIDC & SEEPZ",
      "JNPT Port Logistics & Container Terminals",
    ],
    distanceBase: "Delivered from our Delhi base to your site in Mumbai via dedicated transport",
    deliveryWording:
      "Delivered directly from our Delhi base to your site in Mumbai, Navi Mumbai, and Bhiwandi via dedicated heavy road transport trailers. Shipments include comprehensive transit protection, CE certification, and full mobilization documentation.",
    scissorIntro:
      "Citizen Construction Rentals provides electric scissor lift rentals for logistics hubs, pharmaceutical facilities, and commercial developments across Mumbai and the Mumbai Metropolitan Region (MMR). From multi-tier racking installation in Bhiwandi mega-warehouses to architectural maintenance in BKC corporate headquarters, our Straightline electric scissor lifts offer quiet, emission-free operation and compact maneuverability.",
    boomIntro:
      "For port infrastructure at JNPT, petrochemical refineries in Taloja, and high-rise commercial structures across Mumbai and Navi Mumbai, Citizen Construction Rentals delivers high-capacity boom lifts on rent. Our fleet features 16 m articulating booms and 28 m Straightline SL28T telescopic lifts, engineered to overcome challenging obstacles with maximum stability.",
  },
  {
    name: "Pune",
    slug: "pune",
    tier: 2,
    state: "Maharashtra",
    industrialHubs: [
      "Chakan MIDC Automotive Cluster (Phases I–IV)",
      "Talegaon MIDC Industrial & Electronics Hub",
      "Hinjewadi IT & Biotech Park",
      "Bhosari & Pimpri-Chinchwad (PCMC) Industrial Belt",
      "Ranjangaon MIDC Industrial Area",
      "Hadapsar Industrial Estate",
      "Markal & Alandi Industrial Belts",
    ],
    distanceBase: "Delivered from our Delhi base to your site in Pune via dedicated transport",
    deliveryWording:
      "Delivered directly from our Delhi operational base to your facility or construction site in Pune, Chakan, Talegaon, and Hinjewadi with specialized road freight carriers and full pre-dispatch inspection.",
    scissorIntro:
      "Support your automotive assembly, electronics production, and IT campus operations in Pune with CE-certified electric scissor lifts on rent from Citizen Construction Rentals. Featuring smooth proportional controls, extendable cantilever decks, and zero emissions, our Straightline scissor lifts are trusted across Chakan, Talegaon, and PCMC industrial facilities.",
    boomIntro:
      "Pune industrial projects require reliable horizontal outreach and substantial vertical elevation. Citizen Construction Rentals supplies Straightline and Genie boom lifts on rent across Pune manufacturing corridors. From stamping plant crane maintenance in Chakan to outdoor infrastructure construction in Ranjangaon, our rugged boom lifts ensure safe, steady high-reach access.",
  },
  {
    name: "Bengaluru",
    slug: "bengaluru",
    tier: 2,
    state: "Karnataka",
    industrialHubs: [
      "Peenya Industrial Area (Asia's largest MSME hub)",
      "Whitefield IT & Export Promotion Industrial Park (EPIP)",
      "Electronic City Phases I & II",
      "Bommasandra Industrial Area & Jigani",
      "Doddaballapur Integrated Textile & Industrial Park",
      "Bidadi Industrial Area (Auto Cluster)",
      "Hosakote & Nelamangala Logistics Clusters",
    ],
    distanceBase: "Delivered from our Delhi base to your site in Bengaluru via dedicated transport",
    deliveryWording:
      "Delivered directly from our Delhi base to your facility or construction site in Bengaluru, Peenya, Whitefield, and Bommasandra via dedicated long-haul transport trailers with verified safety certificates.",
    scissorIntro:
      "Rent premium electric scissor lifts in Bengaluru from Citizen Construction Rentals. Whether managing cleanroom ceiling fit-outs in Electronic City, automated warehouse shelving in Nelamangala, or precision manufacturing in Peenya, our brand new Straightline electric scissor lifts guarantee clean battery power, non-marking tyres, and dependable performance.",
    boomIntro:
      "For aerospace facilities, tech park facade retrofits, and industrial plant construction throughout Bengaluru, Citizen Construction Rentals supplies telescopic and articulating boom lifts on rent. Our Straightline SL28T telescopic model delivers 28 m working height, while articulating booms provide flexible up-and-over access around structural obstacles.",
  },
  {
    name: "Hyderabad",
    slug: "hyderabad",
    tier: 2,
    state: "Telangana",
    industrialHubs: [
      "HITEC City & Madhapur IT Corridor",
      "Jeedimetla Industrial Area",
      "Patancheru Industrial Area & Pashamylaram",
      "Sanathnagar & Balanagar Industrial Belts",
      "Cherlapally Industrial Park",
      "Gachibowli Financial District",
      "Shamshabad Cargo & Aerospace Hub",
      "Genome Valley Life Sciences Cluster",
    ],
    distanceBase: "Delivered from our Delhi base to your site in Hyderabad via dedicated transport",
    deliveryWording:
      "Delivered directly from our Delhi operational base to your site in Hyderabad, HITEC City, Patancheru, and Jeedimetla via dedicated road logistics mobilization with comprehensive machinery health reports.",
    scissorIntro:
      "Citizen Construction Rentals provides high-performance electric scissor lifts on hire in Hyderabad. From cleanroom installations in Genome Valley pharmaceutical labs to data center construction in HITEC City and heavy engineering plants in Patancheru, our Straightline electric scissor lifts deliver quiet, emission-free elevation from 8 m to 15.7 m.",
    boomIntro:
      "High-reach industrial maintenance and infrastructure projects in Hyderabad rely on boom lifts from Citizen Construction Rentals. We deliver Straightline 28 m telescopic and 16 m articulating boom lifts, along with tested used JLG/Genie machines, to sites across Hyderabad, Shamshabad, and Cherlapally with professional mobilization support.",
  },
  {
    name: "Chennai",
    slug: "chennai",
    tier: 2,
    state: "Tamil Nadu",
    industrialHubs: [
      "Sriperumbudur Automotive & Electronics Corridor",
      "Oragadam Industrial Mega-Cluster",
      "Ambattur Industrial Estate",
      "Guindy Industrial Estate",
      "Maraimalai Nagar Auto Hub",
      "Ennore & Kattupalli Port Logistics Hubs",
      "Tiruvallur & Gummidipoondi Industrial Belts",
    ],
    distanceBase: "Delivered from our Delhi base to your site in Chennai via dedicated transport",
    deliveryWording:
      "Delivered directly from our Delhi base to your automotive plant, warehouse, or commercial site in Chennai, Sriperumbudur, and Oragadam via dedicated transport carriers with full transit coverage.",
    scissorIntro:
      "Power your automotive assembly lines, electronics manufacturing facilities, and port warehouses in Chennai with Straightline electric scissor lifts on rent from Citizen Construction Rentals. Featuring dual front-wheel electric drive, roll-out deck extensions, and non-marking solid tyres, our lifts are suited for indoor plant maintenance across Sriperumbudur and Ambattur.",
    boomIntro:
      "For shipyards at Ennore, heavy manufacturing facilities in Oragadam, and commercial building envelopes across Chennai, Citizen Construction Rentals provides heavy-duty boom lifts on rent. Our Straightline telescopic and articulating booms offer up to 28 m working height to reach exterior facades, tall piperacks, and overhead utility lines.",
  },
  {
    name: "Ahmedabad",
    slug: "ahmedabad",
    tier: 2,
    state: "Gujarat",
    industrialHubs: [
      "Sanand GIDC Industrial Estate (Auto & Engineering)",
      "Vatva GIDC Chemical & Manufacturing Zone",
      "Changodar Industrial & Warehousing Hub",
      "Naroda GIDC Industrial Estate",
      "Odhav Industrial Area",
      "Sarkhej-Bavla Road Logistics Belt",
      "Kadi-Chhatral Engineering Corridor",
    ],
    distanceBase: "Delivered from our Delhi base to your site in Ahmedabad via dedicated transport",
    deliveryWording:
      "Delivered directly from our Delhi base to your manufacturing unit or logistics facility in Ahmedabad, Sanand, Changodar, and Vatva via dedicated flatbed transport trailers.",
    scissorIntro:
      "Citizen Construction Rentals supplies brand new CE-certified Straightline electric scissor lifts on rent across Ahmedabad. Whether you are outfitting e-commerce fulfillment hubs along Sarkhej-Bavla Road or running routine maintenance inside Sanand manufacturing plants, our electric scissor lifts provide safe, stable elevation with zero exhaust emissions.",
    boomIntro:
      "High-reach structural tasks and industrial facility expansions across Ahmedabad demand proven aerial lift equipment. Citizen Construction Rentals rents Straightline SL28T 28 m telescopic boom lifts and 16 m articulating cherry pickers across Sanand, Changodar, and Vatva GIDC, dispatched directly from our New Delhi hub.",
  },
];

export function getCityFaqs(city: CityInfo, type: "scissor" | "boom") {
  if (type === "scissor") {
    return [
      {
        question: `How quickly can a scissor lift be delivered to sites in ${city.name}?`,
        answer: `${city.deliveryWording} For urgent requirements, reach out on WhatsApp with your exact site location for confirmed mobilization timelines.`,
      },
      {
        question: `What scissor lift platform heights are available for rent in ${city.name}?`,
        answer: `We rent brand new Straightline electric scissor lifts with platform heights of 6 m (GTJZ06), 8 m (GTJZ08), 10 m (GTJZ10), 11.8 m (GTJZ12), and 13.7 m (GTJZ14), reaching working heights from 8 m to 15.7 m, as well as inspected used JLG and Genie scissor lifts.`,
      },
      {
        question: `Are your scissor lifts suitable for indoor warehouse floors in ${city.name}?`,
        answer: `Yes. All our Straightline electric scissor lifts are equipped with non-marking solid tyres and battery-powered electric drivetrains that generate zero fumes and low operational noise, making them ideal for indoor warehouse racking, commercial showrooms, and clean factory floors in ${city.name}.`,
      },
      {
        question: `What are the scissor lift rental rates in ${city.name}?`,
        answer: `Rental rates in ${city.name} depend on the lift working height, rental duration (daily, weekly, or monthly hire contracts), and transportation mobilization. Monthly rentals offer our most competitive cost per day. Contact our rental desk on WhatsApp for a fast, itemized quote for your ${city.name} site.`,
      },
    ];
  }

  return [
    {
      question: `How quickly can a boom lift be mobilized to our site in ${city.name}?`,
      answer: `${city.deliveryWording} Dedicated flatbed carriers transport the equipment directly to your site. Contact us on WhatsApp with your project start date for immediate dispatch planning.`,
    },
    {
      question: `What boom lift models and reach heights are available for rent in ${city.name}?`,
      answer: `We provide brand new Straightline SL28T telescopic boom lifts (28 m working height, 21.8 m outreach), Straightline articulating boom lifts (16 m working height), and inspected used JLG and Genie boom lifts across ${city.name} industrial and infrastructure sites.`,
    },
    {
      question: `What is the difference between articulating and telescopic boom lifts for projects in ${city.name}?`,
      answer: `Telescopic boom lifts (such as our 28 m SL28T) extend straight outward and upward, offering superior outreach for open industrial yards, high-mast utilities, and tall building facades. Articulating boom lifts feature jointed arm sections that maneuver up, over, and around piping, structural steelwork, and indoor factory machinery.`,
    },
    {
      question: `How are boom lift rental charges calculated for ${city.name} sites?`,
      answer: `Boom lift rental charges are based on the required working height (16 m articulating or 28 m telescopic), the rental contract tenure (daily, weekly, or monthly), and freight mobilization from our Delhi base to ${city.name}. Contact our desk on WhatsApp for a complete, transparent quote.`,
    },
  ];
}
