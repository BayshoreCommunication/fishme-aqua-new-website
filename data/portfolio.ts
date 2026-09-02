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
      "30-foot custom-built aquarium featuring exotic tropical fish, live coral reef, and automated life-support systems.",
    category: "Resort",
    image: "/assets/home/about-1.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
        "Engineers faced the challenge of supporting over 14 tons of water weight above a subterranean garage while maintaining pristine chemical parameters for delicate stony corals under intense public illumination.",
      image: "/assets/home/about-1.png",
    },
    solution: {
      title: "Reinforced Titanium Frame & Precision Life Support",
      description:
        "We implemented a bespoke vibration-damped structural steel cradle paired with a multi-stage bio-filtration sump, commercial protein skimmers, and automated trace element dosing.",
      image: "/assets/home/about-2.png",
    },
    gallery: [
      "/assets/home/WhyFishMeAqua-Main.png",
      "/assets/projects/project-1.png",
    ],
    installation:
      "The installation proceeded in scheduled night phases to minimize guest disturbance. Custom acrylic panels were bonded on-site, followed by dry rock aquascaping and bio-cycling.",
    outcome:
      "The lobby centerpiece has become the hotel's signature visual landmark, elevating guest check-in satisfaction and social media impressions.",
  },
  {
    id: 2,
    slug: "island-resort-underwater-lounge",
    title: "Island Resort Underwater Lounge",
    description:
      "An immersive underwater glass enclosure with panoramic marine ecosystem view and natural acoustic dampening.",
    category: "Resort",
    image: "/assets/projects/project-2.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
        "Integrating a curved 80mm thermoformed acrylic viewing cylinder with zero water refraction distortion while damping all pump vibrations from the guest relaxation lounge.",
      image: "/assets/projects/project-2.png",
    },
    solution: {
      title: "Isolated Mechanical Chamber & Ultra-Clear Acrylic",
      description:
        "We decoupled the filtration pumps into an acoustic-shielded basement vault and utilized optical-grade seamless acrylic sealed with elastomeric silicone joints.",
      image: "/assets/home/about-2.png",
    },
    gallery: [
      "/assets/projects/project-2.png",
      "/assets/projects/project-3.png",
    ],
    installation:
      "The cylindrical viewing portal was lowered into place via crane and sealed against hydrostatic pressure using redundant fail-safe gaskets.",
    outcome:
      "Guests enjoy a tranquil 360-degree perspective of marine life while dining, creating an unforgettable hospitality experience.",
  },
  {
    id: 3,
    slug: "private-residence-aquascape",
    title: "Private Residence Aquascape",
    description:
      "Nature-style freshwater aquascape with rare aquatic plants, driftwood hardscape, and custom LED sunrise lighting.",
    category: "Residential",
    image: "/assets/home/about-2.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
        "The client wanted a natural focal point next to floor-to-ceiling windows. Optimizing natural illumination without triggering algae blooms while concealing a high-flow filtration loop was essential.",
      image: "/assets/home/about-1.png",
    },
    solution: {
      title: "Pressurized CO2 Balancing & Ultra-Quiet Sump",
      description:
        "We calibrated a pressurized CO2 delivery system and dual high-PAR LED strips to outcompete algae with vigorous plant growth, alongside an insulated silent sump.",
      image: "/assets/home/about-2.png",
    },
    gallery: [
      "/assets/home/WhyFishMeAqua-Main.png",
      "/assets/home/about-1.png",
    ],
    installation:
      "Handcrafted driftwood root formations and volcanic soil terraces were built dry, flooded under gentle misting, and cycled with beneficial nitrifying bacteria.",
    outcome:
      "The lush underwater forest provides continuous relaxation and natural beauty, supported by our ongoing monthly maintenance program.",
  },
  {
    id: 4,
    slug: "penthouse-builtin-reef-tank",
    title: "Penthouse Built-in Reef Tank",
    description:
      "Modern wall-embedded saltwater tank designed seamlessly into interior living space with smart mobile monitoring.",
    category: "Residential",
    image: "/assets/projects/project-3.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
      title: "Narrow In-Wall Cavity & Humidity Management",
      description:
        "Fitting full biological filtration, skimmers, and dosing reactors inside a restricted wall partition without allowing humidity to penetrate drywall.",
      image: "/assets/projects/project-3.png",
    },
    solution: {
      title: "Sealed Extraction Ducting & Automated Top-Off",
      description:
        "We incorporated positive-pressure humidity extraction fans, insulated rear access panels, and reverse-osmosis automated water replenishment.",
      image: "/assets/home/about-1.png",
    },
    gallery: [
      "/assets/projects/project-3.png",
      "/assets/home/WhyFishMeAqua-Main.png",
    ],
    installation:
      "Precision cabinetry with flush-mount soft-close magnetic doors allowed seamless front viewing with complete rear servicing access.",
    outcome:
      "A stunning architectural living room divider that blends technology with aquatic elegance.",
  },
  {
    id: 5,
    slug: "corporate-hq-atrium-waterfall",
    title: "Corporate HQ Atrium Waterfall",
    description:
      "A multi-story indoor waterfall and living plant wall creating a serene, biophilic environment for employees.",
    category: "Corporate",
    image: "/assets/projects/project-1.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
      title: "Splash Prevention & Uniform Sheer Water Flow",
      description:
        "Maintaining a consistent laminar water sheet down a 45-foot vertical textured stone facade without mist drifting into reception seating areas.",
      image: "/assets/projects/project-1.png",
    },
    solution: {
      title: "Engineered Weir Baffles & Sub-Floor Catch Basin",
      description:
        "Precision laser-cut stainless-steel weir manifolds and anti-splash baffles coupled with variable-frequency pumps ensured zero droplet dispersal.",
      image: "/assets/home/about-2.png",
    },
    gallery: [
      "/assets/projects/project-1.png",
      "/assets/projects/project-2.png",
    ],
    installation:
      "Integrated with the building's central BMS for automated pump scheduling, UV sterilization, and automated chemical sanitization.",
    outcome:
      "Significantly improved indoor air humidity, reduced ambient acoustic echoes, and earned LEED platinum biophilic design credits.",
  },
  {
    id: 6,
    slug: "executive-boardroom-aquascape",
    title: "Executive Boardroom Aquascape",
    description:
      "High-end custom planted aquascape designed for a tranquil corporate experience and executive meeting wellness.",
    category: "Corporate",
    image: "/assets/projects/project-3.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
      title: "Whisper-Quiet Operation in Soundproof Room",
      description:
        "Ensuring complete acoustic silence during critical executive conferences and remote video calls.",
      image: "/assets/projects/project-3.png",
    },
    solution: {
      title: "Magnetic Levitation DC Pumps & Submerged Inlets",
      description:
        "We deployed mag-lev DC return pumps, silicone hose dampeners, and submerged siphon overflow boxes rated at less than 18 decibels.",
      image: "/assets/home/about-1.png",
    },
    gallery: [
      "/assets/projects/project-3.png",
      "/assets/home/about-2.png",
    ],
    installation:
      "Assembled during weekend hours, fully hardscaped with petrified wood and carpet plants, and tested for zero audible vibration.",
    outcome:
      "An inspiring natural focal point that elevates corporate presentations and provides a calm, focused ambiance.",
  },
  {
    id: 7,
    slug: "tech-campus-central-feature-tank",
    title: "Tech Campus Central Feature Tank",
    description:
      "Sleek minimalist aquarium integration providing biometric stress reduction for tech developers and visitors.",
    category: "Office Spaces",
    image: "/assets/projects/project-2.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
      "Traditional outdoor koi pond with custom bio-filtration, stepping stones, and natural rock waterfall cascades.",
    category: "Koi Ponds",
    image: "/assets/projects/project-3.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
      "Architectural geometric koi pond with glass viewing walls, floating walkways, and underwater LED mood lighting.",
    category: "Koi Ponds",
    image: "/assets/projects/project-1.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
      "Large-scale public exhibition displaying rainforest flora, emerse mosses, and freshwater aquatic species.",
    category: "Public Spaces",
    image: "/assets/projects/project-2.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
      "Custom rooftop fountain feature with infinity spillway overlooking the panoramic city skyline.",
    category: "Rooftop Water Features",
    image: "/assets/projects/project-3.png",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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

