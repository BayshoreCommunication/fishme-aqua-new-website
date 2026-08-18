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

export type Service = {
  id: number;
  slug: string;
  title: string;
  description: string;
  overview: string;
  image: string;
  icon: ElementType;
  highlights: string[];
};

export const services: Service[] = [
  {
    id: 1,
    slug: "aquarium-solutions",
    title: "Aquarium Solutions",
    description: "Bespoke aquarium design and installation for residential and commercial spaces.",
    overview: "Transform your space with expertly designed aquarium systems that combine beauty, functionality, and long-term sustainability. From luxury residential installations to large-scale commercial displays, FishMeAqua delivers custom aquarium solutions tailored to your environment and vision.",
    image: "/assets/home/about-1.png",
    icon: Fish,
    highlights: ["Residential & Commercial Aquariums", "Wall & Room Divider Systems", "Made-to-measure tank design", "Filtration and lighting planning"]
  },
  {
    id: 2,
    slug: "aquascaping",
    title: "Aquascaping",
    description: "Artistic underwater landscapes using plants, rocks, and driftwood.",
    overview: "We compose balanced underwater landscapes with living plants, natural hardscape and a long-term plan for healthy growth.",
    image: "/assets/home/about-2.png",
    icon: Waves,
    highlights: ["Nature-inspired compositions", "Plant and hardscape selection", "Growth and care guidance"]
  },
  {
    id: 3,
    slug: "landscaping",
    title: "Landscaping",
    description: "Complete outdoor garden planning and nature-inspired structural designs.",
    overview: "We shape outdoor spaces with cohesive planting, structural features and water elements that feel connected to nature.",
    image: "/assets/home/WhyFishMeAqua-bg.png",
    icon: Trees,
    highlights: ["Garden layout planning", "Nature-led materials", "Water feature coordination"]
  },
  {
    id: 4,
    slug: "pond-design",
    title: "Pond Design",
    description: "Stunning koi ponds and garden water features for outdoor spaces.",
    overview: "Turn an outdoor area into a calm focal point with a pond designed for its setting, its inhabitants and the seasons.",
    image: "/assets/projects/project-1.png",
    icon: TreePine,
    highlights: ["Koi pond planning", "Natural filtration systems", "Garden integration"]
  },
  {
    id: 5,
    slug: "fountain-designs",
    title: "Fountain Designs",
    description: "Indoor and outdoor fountain installations that create tranquil ambiance.",
    overview: "Our fountain installations bring gentle movement and sound to interiors, entryways, courtyards and gardens.",
    image: "/assets/projects/project-2.png",
    icon: Droplets,
    highlights: ["Indoor and outdoor options", "Quiet water circulation", "Durable finishing details"]
  },
  {
    id: 6,
    slug: "rainforest-design",
    title: "Rainforest Design",
    description: "Lush tropical environments with high humidity plants and specialized lighting.",
    overview: "Create an immersive tropical environment with layered planting, controlled humidity and specialized lighting.",
    image: "/assets/home/WhyFishMeAqua-Main.png",
    icon: CloudRain,
    highlights: ["Tropical planting plans", "Climate and lighting setup", "Habitat-focused styling"]
  },
  {
    id: 7,
    slug: "paludarium-design",
    title: "Paludarium Design",
    description: "A stunning combination of terrestrial land and aquatic habitats.",
    overview: "Our paludariums blend land and water into one vivid habitat, with every transition designed for visual impact and practical care.",
    image: "/assets/home/services-section-background.png",
    icon: Mountain,
    highlights: ["Land-and-water habitat design", "Waterfall and circulation options", "Natural material selection"]
  },
  {
    id: 8,
    slug: "terrarium-designs",
    title: "Terrarium Designs",
    description: "Self-sustaining mini ecosystems enclosed in beautiful glass containers.",
    overview: "Small in footprint and rich in detail, our terrariums are carefully planted glass ecosystems made to thrive indoors.",
    image: "/assets/projects/project-3.png",
    icon: Flower2,
    highlights: ["Custom glass compositions", "Humidity-loving plant selection", "Simple care instructions"]
  },
  {
    id: 9,
    slug: "maintenance",
    title: "Maintenance",
    description: "Professional cleaning, water testing, and ecosystem upkeep services.",
    overview: "Keep your aquatic ecosystem clear, stable and beautiful with dependable ongoing care from our experienced team.",
    image: "/assets/home/StatsSection.png",
    icon: Wrench,
    highlights: ["Routine cleaning visits", "Water testing and balancing", "Equipment health checks"]
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}