export interface PortfolioItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  videoUrl: string;
  specs: {
    aquariumType: string;
    scale: string;
    location: string;
    timeline: string;
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
  challenge: {
    title: string;
    description: string;
    image: string;
  };
  solution: {
    title: string;
    description: string;
    image: string;
  };
  gallery: string[];
  installation: string;
  outcome: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    slug: "luxury-hotel-lobby-aquarium",
    title: "Luxury Hotel Lobby Aquarium",
    description:
      "A 30 foot custom build packed with exotic marine life, a thriving live coral reef and a fully automated life support system working quietly behind the scenes.",
    category: "Resort",
    image: "/assets/home/about-1.png",
    videoUrl: "https://www.youtube.com/embed/OOAg7wpsl84",
    specs: {
      aquariumType: "Saltwater Reef & Marine Biotope",
      scale: "12,000 Liters / 3,170 Gallons",
      location: "Grand Hotel & Suites Atrium",
      timeline: "12 Weeks (Architectural Build to Living Stock)",
    },
    testimonial: {
      quote:
        "A strategic aquatic partner that delivers breathtaking design. Transparent communication, meticulous craftsmanship, and results that consistently exceed expectations.",
      author: "ELEANOR PENA",
      role: "CTO & Hospitality Director",
      avatar: "/assets/home/DavidCallahan.png",
    },
    challenge: {
      title: "Massive Structural Load & Live Coral Stability",
      description:
        "We had to safely support over 14 tons of water directly above an underground parking garage. On top of that, we needed to keep the water chemistry perfectly balanced for delicate stony corals sitting under intense, all day lobby lighting.",
      image: "/assets/home/about-1.png",
    },
    solution: {
      title: "Reinforced Titanium Frame & Precision Life Support",
      description:
        "Our engineers designed a custom, vibration damped steel cradle to handle the massive weight load safely. For water quality, we installed a multi stage bio filtration sump, heavy duty commercial protein skimmers, and a system that automatically doses trace elements to keep the reef healthy.",
      image: "/assets/home/about-2.png",
    },
    gallery: [
      "/assets/home/WhyFishMeAqua-Main.png",
      "/assets/projects/project-1.png",
    ],
    installation:
      "To keep the hotel running smoothly, we handled the heavy installation during scheduled night shifts. We bonded the massive acrylic panels on site, built out the dry rock framework, and carefully bio cycled the water.",
    outcome:
      "Today, the aquarium is the hotel's defining visual feature giving guests a memorable check in experience and acting as a major draw for social media photos.",
  },
  {
    id: 2,
    slug: "island-resort-underwater-lounge",
    title: "Island Resort Underwater Lounge",
    description:
      "The full acrylic enclosure allows visitors a bird's eye view of a lively marine world that's soundproofed from the outside world.",
    category: "Resort",
    image: "/assets/projects/project-2.png",
    videoUrl: "https://www.youtube.com/embed/5gIfi6zq59U",
    specs: {
      aquariumType: "Panoramic Marine Habitat Enclosure",
      scale: "8,500 Liters / 2,245 Gallons",
      location: "Coral Bay Ocean Resort",
      timeline: "10 Weeks (Custom Acrylic to Launch)",
    },
    testimonial: {
      quote:
        "The underwater lounge completely transformed our resort experience. Fish Me Aqua's engineering and artistic vision are truly world-class.",
      author: "Marcus Vance",
      role: "Managing Director, Coral Bay",
      avatar: "/assets/home/JaneCooper.png",
    },
    challenge: {
      title: "Submerged Pressure Seals & Acoustic Resonance",
      description:
        "The main hurdle was installing a curved, 80mm thermoformed acrylic cylinder without any visual distortion. We also had to figure out how to completely silence the heavy duty pump vibrations so the lounge remained a quiet, relaxing space for guests.",
      image: "/assets/projects/project-2.png",
    },
    solution: {
      title: "Isolated Mechanical Chamber & Ultra-Clear Acrylic",
      description:
        "We moved the entire filtration system into an acoustically shielded basement vault, entirely separate from the lounge area. For the viewing portal itself, we used optical grade, smooth acrylic locked in with high strength elastomeric silicone.",
      image: "/assets/home/about-2.png",
    },
    gallery: [
      "/assets/projects/project-2.png",
      "/assets/projects/project-3.png",
    ],
    installation:
      "We brought the main viewing cylinder in by crane, lowering it carefully into place before locking it down with redundant, fail safe pressure gaskets.",
    outcome:
      "What emerges is a stunning 360 degree dining experience in which diners can unwind and enjoy the action of the reef expanding around them.",
  },
  {
    id: 3,
    slug: "private-residence-aquascape",
    title: "Private Residence Aquascape",
    description:
      "A stunning natural style fresh water aquarium with rare plants, driftwood designs and a custom lighting system to create a natural sunrise every morning.",
    category: "Residential",
    image: "/assets/home/about-2.png",
    videoUrl: "https://www.youtube.com/embed/RPKQpYx56Z0",
    specs: {
      aquariumType: "Planted Freshwater Nature Aquascape",
      scale: "2,500 Liters / 660 Gallons",
      location: "Private Residence, Gulshan",
      timeline: "8 Weeks (Design to Full Cycling)",
    },
    testimonial: {
      quote:
        "A strategic aquatic partner that delivers breathtaking design. Transparent communication, meticulous craftsmanship, and results that consistently exceed expectations.",
      author: "ELEANOR PENA",
      role: "CTO & Homeowner",
      avatar: "/assets/home/DavidCallahan.png",
    },
    challenge: {
      title: "Algae-Free Sunlight Integration & Cabinetry",
      description:
        "The homeowner wanted the tank positioned right next to floor to ceiling windows. The trick was taking advantage of that natural sunlight without turning the tank into an algae farm, all while hiding a high capacity filtration system inside custom cabinetry.",
      image: "/assets/home/about-1.png",
    },
    solution: {
      title: "Pressurized CO2 Balancing & Ultra-Quiet Sump",
      description:
        "We dialed in a pressurized CO2 delivery system and paired it with high PAR LED lighting. This forces the plants to grow vigorously, which naturally starves out any algae. We also installed a fully insulated, whisper quiet sump underneath to keep the living room completely silent.",
      image: "/assets/home/about-2.png",
    },
    gallery: [
      "/assets/home/WhyFishMeAqua-Main.png",
      "/assets/home/about-1.png",
    ],
    installation:
      "The driftwood hardscape and volcanic soil raised garden beds were installed into a dry tank. The tank was slowly filled with water using a fine mist system, and the water cycled with good bacteria.",
    outcome:
      "The homeowner now has a beautiful underwater forest in their living room, and we provide a monthly maintenance service to keep it looking amazing.",
  },
  {
    id: 4,
    slug: "penthouse-builtin-reef-tank",
    title: "Penthouse Built-in Reef Tank",
    description:
      "A custom saltwater aquarium built into a penthouse wall, complete with smart mobile monitoring.",
    category: "Residential",
    image: "/assets/projects/project-3.png",
    videoUrl: "https://www.youtube.com/embed/yIxVEyBaUyU",
    specs: {
      aquariumType: "In-Wall Saltwater Living Reef",
      scale: "3,800 Liters / 1,000 Gallons",
      location: "Skyline Penthouse Suites",
      timeline: "6 Weeks (Installation & Balancing)",
    },
    testimonial: {
      quote:
        "Fish Me Aqua executed our in-wall reef flawlessly. The automated mobile alerts and crystal water clarity make ownership an absolute joy.",
      author: "David Callahan",
      role: "Private Homeowner",
      avatar: "/assets/home/DavidCallahan.png",
    },
    challenge: {
      title: "Limited Wall Space and Humidity Control",
      description:
        "The narrow wall cavity needed to house biological filtration, skimmers and dosing reactors while keeping moisture away from the drywall.",
      image: "/assets/projects/project-3.png",
    },
    solution: {
      title: "Sealed Ventilation and Automatic Water Top Off",
      description:
        "We installed positive pressure extraction fans, insulated rear access panels and an automated reverse osmosis water replenishment system.",
      image: "/assets/home/about-1.png",
    },
    gallery: [
      "/assets/projects/project-3.png",
      "/assets/home/WhyFishMeAqua-Main.png",
    ],
    installation:
      "We fitted custom cabinetry with flush mounted, soft close magnetic doors. The design provides a clear front view and full access for rear maintenance.",
    outcome:
      "The finished aquarium serves as an architectural living room divider, combining modern design with aquatic beauty.",
  },
  {
    id: 5,
    slug: "corporate-hq-atrium-waterfall",
    title: "Corporate HQ Atrium Waterfall",
    description:
      "A multi story indoor waterfall and living plant wall designed to create a calm natural setting for employees.",
    category: "Corporate",
    image: "/assets/projects/project-1.png",
    videoUrl: "https://www.youtube.com/embed/B8DJZaeq70A",
    specs: {
      aquariumType: "Biophilic Waterfall & Living Eco-Wall",
      scale: "4-Story Vertical Cascade",
      location: "FinTech Innovation Tower",
      timeline: "14 Weeks (Architectural Integration)",
    },
    testimonial: {
      quote:
        "The atrium waterfall is the crown jewel of our global headquarters. It creates an aura of tranquility that our employees and clients love.",
      author: "Sophia Sterling",
      role: "Chief Operating Officer",
      avatar: "/assets/home/JaneCooper.png",
    },
    challenge: {
      title: "Splash Control and Consistent Water Flow",
      description:
        "We needed to maintain an even sheet of water across a 45 foot textured stone wall without allowing mist to reach the reception seating area.",
      image: "/assets/projects/project-1.png",
    },
    solution: {
      title: "Precision Weir Baffles and a Subfloor Catch Basin",
      description:
        "We installed laser cut stainless steel weir manifolds, anti splash baffles and variable frequency pumps to control water flow and prevent droplet dispersal.",
      image: "/assets/home/about-2.png",
    },
    gallery: [
      "/assets/projects/project-1.png",
      "/assets/projects/project-2.png",
    ],
    installation:
      "We connected the system to the building's central BMS for scheduled pump operation, UV sterilization and automatic chemical sanitization.",
    outcome:
      "The installation significantly improved indoor air humidity, reduced acoustic echoes and earned LEED Platinum biophilic design credits.",
  },
  {
    id: 6,
    slug: "executive-boardroom-aquascape",
    title: "Executive Boardroom Aquascape",
    description:
      "A custom planted aquarium designed to create a calm setting for corporate meetings and executive presentations.",
    category: "Corporate",
    image: "/assets/projects/project-3.png",
    videoUrl: "https://www.youtube.com/embed/ziotru-2clI",
    specs: {
      aquariumType: "Ultra-Clear Rimless Boardroom Aquascape",
      scale: "1,800 Liters / 475 Gallons",
      location: "Apex Capital Headquarters",
      timeline: "5 Weeks (Design to Unveiling)",
    },
    testimonial: {
      quote:
        "Meticulous attention to detail and zero noise. Fish Me Aqua understood our boardroom needs perfectly.",
      author: "Alexander Ross",
      role: "Executive Chairman",
      avatar: "/assets/home/DavidCallahan.png",
    },
    challenge: {
      title: "Silent Operation in a Soundproof Room",
      description:
        "The aquarium needed to operate without audible noise during executive meetings and remote video calls.",
      image: "/assets/projects/project-3.png",
    },
    solution: {
      title: "Magnetic Levitation DC Pumps and Submerged Inlets",
      description:
        "We installed magnetic levitation DC return pumps, silicone hose dampeners and submerged siphon overflow boxes rated below 18 decibels.",
      image: "/assets/home/about-1.png",
    },
    gallery: [
      "/assets/projects/project-3.png",
      "/assets/home/about-2.png",
    ],
    installation:
      "We completed the hardscape with petrified wood and carpet plants over the weekend. Our team tested the system for zero audible vibration.",
    outcome:
      "The finished aquascape adds a natural focal point to the boardroom and creates a calm, focused atmosphere for corporate presentations.",
  },
  {
    id: 7,
    slug: "tech-campus-central-feature-tank",
    title: "Tech Campus Central Feature Tank",
    description:
      "A simple, modern aquarium for providing a natural mental respite for staff. The massive filtration system was hidden behind special acoustic panels, ensuring a completely silent workspace, despite crystal-clear water.",
    category: "Office Spaces",
    image: "/assets/projects/project-2.png",
    videoUrl: "https://www.youtube.com/embed/NWsuP_bheSY",
    specs: {
      aquariumType: "Minimalist High-Tech Ecosystem",
      scale: "4,200 Liters / 1,110 Gallons",
      location: "Silicon Central Innovation Hub",
      timeline: "7 Weeks (End-to-End Build)",
    },
    testimonial: {
      quote:
        "The biophilic impact on our team's creative focus has been remarkable. Fish Me Aqua delivered beyond our expectations.",
      author: "Rachel Zhang",
      role: "VP of Workplace Experience",
      avatar: "/assets/home/JaneCooper.png",
    },
    challenge: {
      title: "High-Traffic Interaction & Child-Safe Acrylic",
      description:
        "Positioned in a busy atrium, the installation needed scratch-resistant impact protection and seamless 360-degree viewing.",
      image: "/assets/projects/project-2.png",
    },
    solution: {
      title: "Hard-Coated Opti-Clear Acrylic & Smart Lighting",
      description:
        "We utilized specialized polymer hard-coat acrylic and integrated IoT sensors that modulate spectrum and flow dynamically.",
      image: "/assets/home/about-2.png",
    },
    gallery: [
      "/assets/projects/project-2.png",
      "/assets/projects/project-1.png",
    ],
    installation:
      "Fabricated with dual redundant filtration circuits ensuring uninterrupted biological balance even during maintenance.",
    outcome:
      "A beloved workplace centerpiece that boosts productivity and employee well-being.",
  },
  {
    id: 8,
    slug: "zen-garden-japanese-koi-pond",
    title: "Zen Garden Japanese Koi Pond",
    description:
      "A natural waterfall that creates a low noise level in the neighborhood, hidden bio-filtration, and hand-placed stepping stones make for a traditional outdoor koi habitat. The plumbing is completely concealed and hidden to maintain the aesthetic and clarity of the water for the imported fish all year round.",
    category: "Koi Ponds",
    image: "/assets/projects/project-3.png",
    videoUrl: "https://www.youtube.com/embed/-rXM16UX6Pg",
    specs: {
      aquariumType: "Traditional Japanese Koi Ecosystem",
      scale: "25,000 Liters / 6,600 Gallons",
      location: "Zen Garden Estate",
      timeline: "9 Weeks (Excavation to Stocking)",
    },
    testimonial: {
      quote:
        "The harmony of running water, healthy koi, and authentic Japanese stone landscaping is simply magical.",
      author: "Kenji Takahashi",
      role: "Estate Architect",
      avatar: "/assets/home/DavidCallahan.png",
    },
    challenge: {
      title: "Seasonal Thermal Control & Crystal Water Purity",
      description:
        "Preventing heavy biological waste buildup from 30+ champion Nishikigoi while shielding the pool from leaves and intense summer heat.",
      image: "/assets/projects/project-3.png",
    },
    solution: {
      title: "Bottom Aeration Drains & Multi-Chamber Bio-Sump",
      description:
        "Equipped with dual bottom aerated drains, vortex settlement chambers, Japanese filter matting, and UV sterilizers.",
      image: "/assets/home/about-1.png",
    },
    gallery: [
      "/assets/projects/project-3.png",
      "/assets/projects/project-2.png",
    ],
    installation:
      "Reinforced gunite concrete lined with food-grade polyurea membrane and faced with hand-placed granite river boulders.",
    outcome:
      "A serene outdoor retreat with pristine gin-clear water where prize koi thrive through every season.",
  },
  {
    id: 9,
    slug: "modern-courtyard-reflecting-koi-pond",
    title: "Modern Courtyard Reflecting Koi Pond",
    description:
      "Architectural, geometric pond with structure built of glass experience walls, floating concrete walkways and integrated smart lighting. Guests will be able to see the fishes from below the water surface, and this will make the fish a focal point of the courtyard and the whole event, transforming the typical corporate courtyard into an interactive area.",
    category: "Koi Ponds",
    image: "/assets/projects/project-1.png",
    videoUrl: "https://www.youtube.com/embed/wRDTxjKUJBU",
    specs: {
      aquariumType: "Contemporary Glass-Sided Pond",
      scale: "15,000 Liters / 3,960 Gallons",
      location: "Modern Villa Courtyard",
      timeline: "8 Weeks (Civil Works to Commissioning)",
    },
    testimonial: {
      quote:
        "The glass-walled koi pond seamlessly blends contemporary architecture with living nature. Exceeded all our expectations.",
      author: "Oliver Bennett",
      role: "Landscape Architect",
      avatar: "/assets/home/JaneCooper.png",
    },
    challenge: {
      title: "Glass-to-Concrete Hydrostatic Bonding",
      description:
        "Creating a leak-proof structural seal between structural tempered laminated glass panels and cast-in-place concrete walls.",
      image: "/assets/projects/project-1.png",
    },
    solution: {
      title: "Stainless Channel Frames & Polymer Sealants",
      description:
        "Custom 316-grade stainless steel embedding channels paired with structural underwater polymer bonding resins.",
      image: "/assets/home/about-2.png",
    },
    gallery: [
      "/assets/projects/project-1.png",
      "/assets/projects/project-3.png",
    ],
    installation:
      "Hydrostatic testing over 14 days confirmed zero deflection or leakage before final stone cladding and bio-filtration activation.",
    outcome:
      "A breathtaking modern centerpiece offering both top-down and lateral underwater viewing of koi.",
  },
  {
    id: 10,
    slug: "city-botanical-garden-paludarium",
    title: "City Botanical Garden Paludarium",
    description:
      "A tremendous public exhibition that merges land and water. It is an area of dense rainforest vegetation, submerged mosses and native Amazonian fish. We designed an automatic misting system to maintain a stable humidity level in the enclosure, so that the land-dwelling orchids are as healthy as the aquatic plants that live below them.",
    category: "Public Spaces",
    image: "/assets/projects/project-2.png",
    videoUrl: "https://www.youtube.com/embed/iKiYlps-Bm0",
    specs: {
      aquariumType: "Public Biotope Paludarium & Mist Wall",
      scale: "7,000 Liters / 1,850 Gallons",
      location: "Metropolitan Botanical Conservatory",
      timeline: "11 Weeks (Exhibition Construction)",
    },
    testimonial: {
      quote:
        "A monumental educational installation. Fish Me Aqua's mastery of both terrestrial and aquatic ecosystems is second to none.",
      author: "Dr. Evelyn Ward",
      role: "Curator of Tropical Botany",
      avatar: "/assets/home/DavidCallahan.png",
    },
    challenge: {
      title: "Multi-Zone Climate & High Humidity Management",
      description:
        "Maintaining 90% humidity on vertical moss walls while ensuring adequate air circulation to prevent glass fogging.",
      image: "/assets/projects/project-2.png",
    },
    solution: {
      title: "Automated Micro-Mist & Cross-Flow Air Scavenging",
      description:
        "We designed a computerized high-pressure fogging system with warm air sweep nozzles to keep viewing glass perfectly clear.",
      image: "/assets/home/about-1.png",
    },
    gallery: [
      "/assets/projects/project-2.png",
      "/assets/projects/project-1.png",
    ],
    installation:
      "Epiphytic roots, living ferns, and miniature orchids were seeded onto hygrolon fabric over volcanic lava rock formations.",
    outcome:
      "The most visited exhibit in the botanical conservatory, educating thousands of visitors annually.",
  },
  {
    id: 11,
    slug: "sky-lounge-infinity-water-cascade",
    title: "Sky Lounge Infinity Water Cascade",
    description:
      "A personalized roof top cascade that cascades into the view of the downtown cityscape. The basin was constructed of lightweight fiberglass composites and fitted with a wind sensing pump system to prevent any splash out due to high winds and strict structural weight restrictions.",
    category: "Rooftop Water Features",
    image: "/assets/projects/project-3.png",
    videoUrl: "https://www.youtube.com/embed/VlqnpLRPd3Q",
    specs: {
      aquariumType: "Infinity Spillway Water Feature",
      scale: "5,000 Liters / 1,320 Gallons",
      location: "Skyline Tower 52nd Floor",
      timeline: "7 Weeks (Structural Roof Mount)",
    },
    testimonial: {
      quote:
        "The infinity water cascade created an iconic rooftop vibe that our high-profile guests talk about endlessly.",
      author: "Julian Cross",
      role: "Nightlife & Hospitality Director",
      avatar: "/assets/home/JaneCooper.png",
    },
    challenge: {
      title: "High-Altitude Wind Shear & Splash Containment",
      description:
        "Preventing strong rooftop wind gusts from blowing water sheets off the building edge while preserving the glass reflection.",
      image: "/assets/projects/project-3.png",
    },
    solution: {
      title: "Recessed Spillway Weir & Auto-Level Sensors",
      description:
        "We calculated windbreak deflector angles and integrated high-flow sub-weir drainage channels to capture all surface runoff.",
      image: "/assets/home/about-2.png",
    },
    gallery: [
      "/assets/projects/project-3.png",
      "/assets/projects/project-2.png",
    ],
    installation:
      "Engineered with lightweight composite materials and isolated dampening pads to eliminate roof vibrations.",
    outcome:
      "A stunning infinity water installation that mirrors the evening skyline and elevates the rooftop cocktail experience.",
  },
];

export function getPortfolioItem(slug: string): PortfolioItem | undefined {
  return portfolioItems.find(
    (item) => item.slug === slug || String(item.id) === slug,
  );
}

export function getAllPortfolioItems(): PortfolioItem[] {
  return portfolioItems;
}

