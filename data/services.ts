import type { ElementType } from "react";
import {
  CloudRain,
  Droplets,
  Fish,
  Flower2,
  Mountain,
  TreePine,
  Trees,
  Waves,
  Wrench,
} from "lucide-react";

export type ServiceSubFeature = {
  title: string;
  description: string;
  image: string;
};

export type Service = {
  id: number;
  slug: string;
  title: string;
  description: string;
  overview: string;
  image: string;
  icon: ElementType;
  highlights: string[];
  subFeatures: ServiceSubFeature[];
};

export const services: Service[] = [
  {
    id: 1,
    slug: "aquarium-solutions",
    title: "Aquarium Solutions",
    description:
      "Bespoke aquarium design and installation for residential and commercial spaces.",
    overview:
      "Transform your space with expertly designed aquarium systems that combine beauty, functionality, and long-term sustainability. From luxury residential installations to large-scale commercial displays, FishMeAqua delivers custom aquarium solutions tailored to your environment and vision.",
    image: "/assets/service-details/AquariumSolutionsVideo.png",
    icon: Fish,
    highlights: [
      "Residential & Commercial Aquariums",
      "Wall & Room Divider Systems",
      "Made-to-measure tank design",
      "Filtration and lighting planning",
    ],
    subFeatures: [
      {
        title: "Residential Aquariums",
        description:
          "Enhance your home with stunning aquatic displays designed to complement your interior style while creating a relaxing and captivating atmosphere.",
        image: "/assets/service-details/ResidentialAquariums.png",
      },
      {
        title: "Commercial Aquariums",
        description:
          "Create a memorable experience for clients, guests, and visitors with professionally designed aquariums for offices, hotels, restaurants, and hospitals.",
        image: "/assets/service-details/CommercialAquariums.png",
      },
      {
        title: "Wall Aquariums",
        description:
          "Space-saving built-in aquarium systems that seamlessly integrate into walls, adding elegance and a modern architectural feature to any environment.",
        image: "/assets/service-details/WallAquariums.png",
      },
      {
        title: "Room Divider Aquariums",
        description:
          "Functional living displays that beautifully separate spaces while maintaining openness, visibility, and dramatic visual impact.",
        image: "/assets/service-details/RoomDividerAquariums.png",
      },
      {
        title: "Luxury Custom Aquariums",
        description:
          "Fully bespoke aquarium solutions crafted to the highest standards, featuring ultra-clear opti-white glass, titanium heaters, and tailored cabinetry.",
        image: "/assets/service-details/LuxuryCustomAquariums.png",
      },
    ],
  },
  {
    id: 2,
    slug: "aquascaping",
    title: "Aquascaping",
    description:
      "Artistic underwater landscapes using plants, rocks, and driftwood.",
    overview:
      "We compose balanced underwater landscapes with living plants, natural hardscape, and a long-term plan for healthy growth. Inspired by natural riverbeds and mountains, each aquascape is a living work of art.",
    image: "/assets/services/aquascaping.png",
    icon: Waves,
    highlights: [
      "Nature-inspired compositions",
      "Plant and hardscape selection",
      "Growth and care guidance",
      "Pressurized CO2 & high-PAR lighting",
    ],
    subFeatures: [
      {
        title: "Nature Aquarium Landscapes",
        description:
          "Lush underwater forests and riverbank scenes with layered stem plants and driftwood branches.",
        image: "/assets/services/aquascaping.png",
      },
      {
        title: "Iwagumi Stone Formations",
        description:
          "Minimalist Japanese layouts centered around ancient stone formations and dense green carpet flora.",
        image: "/assets/services/wall.png",
      },
      {
        title: "Dutch Terraced Plant Displays",
        description:
          "Vibrant terraced plant gardens showcasing high contrast in color, leaf texture, and botanical variety.",
        image: "/assets/services/residential.png",
      },
      {
        title: "Hardscape & Wood Compositions",
        description:
          "Intricate structural layouts using Seiryu stone, Malaysian driftwood, and nutrient-dense volcanic substrates.",
        image: "/assets/services/luxury.png",
      },
    ],
  },
  {
    id: 3,
    slug: "landscaping",
    title: "Landscaping",
    description:
      "Complete outdoor garden planning and nature-inspired structural designs.",
    overview:
      "We shape outdoor spaces with cohesive planting, structural features, and water elements that feel intimately connected to nature and enhance property aesthetics.",
    image: "/assets/services/paludarium.png",
    icon: Trees,
    highlights: [
      "Garden layout planning",
      "Nature-led materials",
      "Water feature coordination",
      "Sustainable exterior planting",
    ],
    subFeatures: [
      {
        title: "Nature-Inspired Garden Spaces",
        description:
          "Harmonious outdoor environments blending lush vegetation with organic stone pathways and borders.",
        image: "/assets/services/paludarium.png",
      },
      {
        title: "Outdoor Water Courses",
        description:
          "Connecting streams, small ponds, and natural bio-swales that bring dynamic movement into outdoor gardens.",
        image: "/assets/services/pond.png",
      },
      {
        title: "Architectural Stone Accents",
        description:
          "Natural stone retaining walls, rock gardens, and paving designed to age gracefully alongside living plants.",
        image: "/assets/services/wall.png",
      },
      {
        title: "Ambient Landscape Illumination",
        description:
          "Energy-efficient low-voltage lighting that highlights botanical textures and water reflections after sunset.",
        image: "/assets/services/fountain.png",
      },
    ],
  },
  {
    id: 4,
    slug: "pond-design",
    title: "Pond Design",
    description:
      "Stunning koi ponds and garden water features for outdoor spaces.",
    overview:
      "Turn an outdoor area into a calm focal point with a pond designed for its setting, its inhabitants, and the seasons. Featuring heavy-duty biological filtration for crystal-clear water year-round.",
    image: "/assets/services/pond.png",
    icon: TreePine,
    highlights: [
      "Koi pond planning & construction",
      "Natural biological filtration systems",
      "Bottom drains & surface skimmers",
      "Garden integration & waterfalls",
    ],
    subFeatures: [
      {
        title: "Custom Koi Ponds",
        description:
          "Deep, insulated ponds designed to provide optimal swimming depth, shade, and thermal stability for Nishikigoi.",
        image: "/assets/services/pond.png",
      },
      {
        title: "Advanced Biological Filtration",
        description:
          "Moving bed biofilm reactors, bead filters, and UV clarifiers that ensure continuous zero-ammonia water purity.",
        image: "/assets/services/maintenance.png",
      },
      {
        title: "Natural Rock Waterfalls",
        description:
          "Dynamic multi-tier cascade waterfalls that aerate pond water while adding relaxing ambient acoustic textures.",
        image: "/assets/services/fountain.png",
      },
      {
        title: "Predator Protection & Netting",
        description:
          "Subtle underwater ledges, caves, and protective features that safeguard prize fish from birds and wildlife.",
        image: "/assets/services/commercial.png",
      },
    ],
  },
  {
    id: 5,
    slug: "fountain-designs",
    title: "Fountain Designs",
    description:
      "Indoor and outdoor fountain installations that create tranquil ambiance.",
    overview:
      "Our fountain installations bring gentle movement and soothing sound to interiors, entryways, courtyards, and commercial lobbies with custom water flow controls.",
    image: "/assets/services/fountain.png",
    icon: Droplets,
    highlights: [
      "Indoor and outdoor options",
      "Whisper-quiet water circulation",
      "Durable architectural finishing details",
      "Submersible LED illumination",
    ],
    subFeatures: [
      {
        title: "Architectural Wall Fountains",
        description:
          "Vertical sheer-descent water walls crafted from slate, granite, and tempered glass with zero-splash basins.",
        image: "/assets/services/fountain.png",
      },
      {
        title: "Interior Tranquil Water Features",
        description:
          "Calming desktop and lobby fountains designed to humidify air and provide relaxing acoustics.",
        image: "/assets/services/divider.png",
      },
      {
        title: "Outdoor Tiered Cascade Fountains",
        description:
          "Grand multi-tier stone fountains designed as centerpiece installations for gardens and courtyard entrances.",
        image: "/assets/services/pond.png",
      },
      {
        title: "Variable Flow Submersible Pumps",
        description:
          "Commercial-grade pumps equipped with electronic speed control and automated low-water safety cutoff.",
        image: "/assets/services/maintenance.png",
      },
    ],
  },
  {
    id: 6,
    slug: "rainforest-design",
    title: "Rainforest Design",
    description:
      "Lush tropical environments with high humidity plants and specialized lighting.",
    overview:
      "Create an immersive tropical environment with layered planting, automated humidity control, micro-rain systems, and specialized full-spectrum plant lighting.",
    image: "/assets/services/rainforest.png",
    icon: CloudRain,
    highlights: [
      "Tropical planting plans",
      "Climate and misting setup",
      "Habitat-focused styling",
      "Automated environmental control",
    ],
    subFeatures: [
      {
        title: "Tropical Vivariums & Biomes",
        description:
          "Enclosed tropical microclimates housing exotic ferns, bromeliads, mosses, and miniature jungle orchids.",
        image: "/assets/services/rainforest.png",
      },
      {
        title: "Automated Misting & Fogging",
        description:
          "High-pressure nozzle mist systems that replicate morning jungle dew and maintain precise 85%+ relative humidity.",
        image: "/assets/services/paludarium.png",
      },
      {
        title: "Living Epiphyte Bio-Walls",
        description:
          "Vertical cork bark and hygrolon panels supporting climbing vines, creeping figs, and tropical moss carpets.",
        image: "/assets/services/terrarium.png",
      },
      {
        title: "Full-Spectrum PAR Lighting",
        description:
          "Programmable sunrise, midday peak, and twilight LED cycles tailored for dense tropical canopy penetration.",
        image: "/assets/services/aquascaping.png",
      },
    ],
  },
  {
    id: 7,
    slug: "paludarium-design",
    title: "Paludarium Design",
    description:
      "A stunning combination of terrestrial land and aquatic habitats.",
    overview:
      "Our paludariums blend land and water into one vivid habitat, with every transition designed for visual impact, biological balance, and effortless maintenance.",
    image: "/assets/services/paludarium.png",
    icon: Mountain,
    highlights: [
      "Land-and-water habitat design",
      "Waterfall and circulation options",
      "Natural material selection",
      "Semi-aquatic fauna compatibility",
    ],
    subFeatures: [
      {
        title: "Dual Aquatic & Terrestrial Biotopes",
        description:
          "Seamless transitions between crystal-clear underwater shoals and lush emerse terrestrial moss riverbanks.",
        image: "/assets/services/paludarium.png",
      },
      {
        title: "Integrated Waterfall Inflows",
        description:
          "Natural stone waterfalls that trickle over hardscape, irrigating terrestrial plants while oxygenating water.",
        image: "/assets/services/fountain.png",
      },
      {
        title: "Semi-Aquatic Fauna Habitats",
        description:
          "Carefully engineered basking areas, shallow shallows, and safe climbing roots for crabs, frogs, and newts.",
        image: "/assets/services/rainforest.png",
      },
      {
        title: "Custom Glass Biotope Enclosures",
        description:
          "Heavy-duty rimless glass tanks with rear drainage bulkheads, ventilation grilles, and sliding glass access.",
        image: "/assets/services/luxury.png",
      },
    ],
  },
  {
    id: 8,
    slug: "terrarium-designs",
    title: "Terrarium Designs",
    description:
      "Self-sustaining mini ecosystems enclosed in beautiful glass containers.",
    overview:
      "Small in footprint and rich in detail, our terrariums are carefully planted glass ecosystems made to thrive indoors with minimal care and maximum visual charm.",
    image: "/assets/services/terrarium.png",
    icon: Flower2,
    highlights: [
      "Custom glass compositions",
      "Humidity-loving plant selection",
      "Bio-active soil & springtail colonies",
      "Simple care instructions",
    ],
    subFeatures: [
      {
        title: "Enclosed Self-Sustaining Spheres",
        description:
          "Sealed glass vessels with complete water and nutrient cycles that require watering only once every few months.",
        image: "/assets/services/terrarium.png",
      },
      {
        title: "Desktop Micro-Terrariums",
        description:
          "Compact geometric glass displays ideal for desks, reception counters, and contemporary bookshelf styling.",
        image: "/assets/services/residential.png",
      },
      {
        title: "Bioactive Forest Terrariums",
        description:
          "Complete micro-ecosystems featuring live moss carpets, micro-fauna clean-up crews, and dwarf tropical ferns.",
        image: "/assets/services/wall.png",
      },
      {
        title: "Artisan Glass Vessels",
        description:
          "Handblown recycled glass carboys, apothecary jars, and bespoke geometric showcases with cork stoppers.",
        image: "/assets/services/aquascaping.png",
      },
    ],
  },
  {
    id: 9,
    slug: "maintenance",
    title: "Maintenance",
    description:
      "Professional cleaning, water testing, and ecosystem upkeep services.",
    overview:
      "Keep your aquatic ecosystem clear, stable, and beautiful with dependable ongoing care from our certified team of aquarists and pond technicians.",
    image: "/assets/services/maintenance.png",
    icon: Wrench,
    highlights: [
      "Routine cleaning visits",
      "Water testing and chemical balancing",
      "Filter overhaul and media replacement",
      "Emergency 24/7 life support",
    ],
    subFeatures: [
      {
        title: "Routine Water Chemistry Balancing",
        description:
          "Comprehensive multi-parameter testing for ammonia, nitrite, nitrate, pH, GH, KH, and TDS with certified lab kits.",
        image: "/assets/services/maintenance.png",
      },
      {
        title: "Filter & Pump Overhauls",
        description:
          "Deep cleansing of impellers, biological media rinsing in tank water, and UV lamp replacements.",
        image: "/assets/services/commercial.png",
      },
      {
        title: "Botanical Trimming & Algae Control",
        description:
          "Precision plant pruning, aquasoil vacuuming, glass polishing with non-scratch pads, and natural algae control.",
        image: "/assets/services/aquascaping.png",
      },
      {
        title: "Emergency Support & Rapid Response",
        description:
          "Priority 24/7 technician callouts for equipment failure, leaks, or sudden water parameter emergencies.",
        image: "/assets/services/residential.png",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}