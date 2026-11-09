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
      "We design and install aquariums for homes and businesses.",
    overview:
      "We build aquarium systems with beauty, function and long term care in mind. Fish Me Aqua plans custom installations for luxury homes and large commercial displays to suit your space and vision. Our team plans tank size, filtration, lighting and access for routine care.",
    image: "/assets/service-details/AquariumSolutionsVideo.png",
    icon: Fish,
    highlights: [
      "Residential and commercial aquariums",
      "Wall and room divider systems",
      "Tanks made to measure",
      "Filtration and lighting plans",
    ],
    subFeatures: [
      {
        title: "Residential Aquariums",
        description:
          "We add aquatic displays to homes, with designs suited to your interior style and a calm, engaging atmosphere.",
        image: "/assets/service-details/ResidentialAquariums.png",
      },
      {
        title: "Commercial Aquariums",
        description:
          "We design amazing in-office, hotel, restaurant and hospital aquariums and create special experiences for your guests. We consider visitor flow, available space and other needs.",
        image: "/assets/service-details/CommercialAquariums.png",
      },
      {
        title: "Wall Aquariums",
        description:
          "Our built in tanks save floor space and fit into walls. They add elegance and a modern architectural detail.",
        image: "/assets/service-details/WallAquariums.png",
      },
      {
        title: "Room Divider Aquariums",
        description:
          "These living displays separate spaces while keeping rooms open and views clear.",
        image: "/assets/service-details/RoomDividerAquariums.png",
      },
      {
        title: "Luxury Custom Aquariums",
        description:
          "We build custom aquariums with opti white glass, titanium heaters and cabinetry made for each space.",
        image: "/assets/service-details/LuxuryCustomAquariums.png",
      },
    ],
  },
  {
    id: 2,
    slug: "aquascaping",
    title: "Aquascaping",
    description:
      "We create underwater scenes with plants, rocks and driftwood.",
    overview:
      "We create balanced underwater scenes with live plants, natural stone, wood and a plan for healthy growth. Each aquascape takes inspiration from rivers and mountains to create a natural underwater display.",
    image: "/assets/services/aquascaping.png",
    icon: Waves,
    highlights: [
      "Nature inspired layouts",
      "Plant and hardscape selection",
      "Plant care and growth advice",
      "Pressurized CO2 and high PAR lighting",
    ],
    subFeatures: [
      {
        title: "Nature Aquarium Landscapes",
        description:
          "We sculpt our stems and driftwood into oases of water with dense underwater forests and tranquil river banks.",
        image: "/assets/services/aquascaping.png",
      },
      {
        title: "Iwagumi Stone Formations",
        description:
          "We create simple Japanese layouts with natural stones and dense green carpet plants.",
        image: "/assets/services/wall.png",
      },
      {
        title: "Dutch Terraced Plant Displays",
        description:
          "We arrange colorful plant terraces with varied leaf shapes, textures and tones.",
        image: "/assets/services/residential.png",
      },
      {
        title: "Hardscape & Wood Compositions",
        description:
          "We use Seiryu stone, Malaysian driftwood and volcanic substrate in structured layouts.",
        image: "/assets/services/luxury.png",
      },
    ],
  },
  {
    id: 3,
    slug: "landscaping",
    title: "Landscaping",
    description:
      "We plan outdoor gardens and nature inspired structures.",
    overview:
      "We create contemporary gardens through cohesive planting, dramatic features and soothing water features. Every garden is built into the landscape and tailored to the individual style of the property.",
    image: "/assets/services/paludarium.png",
    icon: Trees,
    highlights: [
      "Garden layout planning",
      "Nature-led materials",
      "Water feature planning",
      "Sustainable outdoor planting",
    ],
    subFeatures: [
      {
        title: "Nature Inspired Garden Spaces",
        description:
          "We pair lush plants with natural stone paths and borders.",
        image: "/assets/services/paludarium.png",
      },
      {
        title: "Outdoor Water Courses",
        description:
          "We add streams, ponds and natural bio swales to bring movement to gardens.",
        image: "/assets/services/pond.png",
      },
      {
        title: "Architectural Stone Accents",
        description:
          "We build stone walls, rock gardens and paths beside living plants.",
        image: "/assets/services/wall.png",
      },
      {
        title: "Ambient Landscape Illumination",
        description:
          "Our low voltage lights bring out plant textures and water reflections after sunset.",
        image: "/assets/services/fountain.png",
      },
    ],
  },
  {
    id: 4,
    slug: "pond-design",
    title: "Pond Design",
    description:
      "We build koi ponds and garden water features for outdoor areas.",
    overview:
      "A peaceful pond a suitable size for your garden, your fish and the seasons. Our unique bio filtration system guarantees clear water throughout the year. We measure your pond's depth, circulation and fish requirements and seasonal exposure to start work.",
    image: "/assets/services/pond.png",
    icon: TreePine,
    highlights: [
      "Koi pond planning and construction",
      "Biological filtration systems",
      "Bottom drains and surface skimmers",
      "Garden features and waterfalls",
    ],
    subFeatures: [
      {
        title: "Custom Koi Ponds",
        description:
          "We construct deep, insulated ponds which offer room to swim, shade and temperature stability for your cherished Nishikigoi.",
        image: "/assets/services/pond.png",
      },
      {
        title: "Advanced Biological Filtration",
        description:
          "Using moving bed biofilm reactors, bead filters and UV clarifiers, we are able to achieve and maintain the perfect water quality along with the best possible ammonia control.",
        image: "/assets/services/maintenance.png",
      },
      {
        title: "Natural Rock Waterfalls",
        description:
          "We build tiered cascades to aerate pond water and create the sound of flowing water.",
        image: "/assets/services/fountain.png",
      },
      {
        title: "Predator Protection & Netting",
        description:
          "We add underwater ledges, caves and covers to protect valuable fish from birds and wildlife.",
        image: "/assets/services/commercial.png",
      },
    ],
  },
  {
    id: 5,
    slug: "fountain-designs",
    title: "Fountain Designs",
    description:
      "We install indoor and outdoor fountains for a peaceful setting.",
    overview:
      "We provide softly flowing water and the relaxation, stimulation and the acoustic impact to your interior, your entrance, your courtyard and your commercial lobby. We adjust the flow rate of the water.",
    image: "/assets/services/fountain.png",
    icon: Droplets,
    highlights: [
      "Indoor and outdoor fountains",
      "Quiet water circulation",
      "Durable architectural finishes",
      "Submersible LED lighting",
    ],
    subFeatures: [
      {
        title: "Architectural Wall Fountains",
        description:
          "We construct water walls from vertically installed marble, granite and tempered glass, with basins to contain splash.",
        image: "/assets/services/fountain.png",
      },
      {
        title: "Interior Tranquil Water Features",
        description:
          "Our desktop and lobby fountains create a calm setting with the sound of flowing water.",
        image: "/assets/services/divider.png",
      },
      {
        title: "Outdoor Tiered Cascade Fountains",
        description:
          "We install multi tier stone fountains as garden and courtyard centerpieces.",
        image: "/assets/services/pond.png",
      },
      {
        title: "Variable Flow Submersible Pumps",
        description:
          "Our commercial pumps have electronic speed controls and automatic low water shutoff.",
        image: "/assets/services/maintenance.png",
      },
    ],
  },
  {
    id: 6,
    slug: "rainforest-design",
    title: "Rainforest Design",
    description:
      "We create tropical spaces with humidity loving plants and special lighting.",
    overview:
      "Add the ambiance of a tropical rainforest to your interior by creating a multi-level planting scheme, a humid environment, a soothing rainforest sound system and tropical full-spectrum lighting.",
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
          "We establish enclosed tropical environments using exotic ferns, bromeliads, mosses and miniature jungle orchids to name a few. Each setup is to be used for an appropriate growing environment.",
        image: "/assets/services/rainforest.png",
      },
      {
        title: "Automated Misting & Fogging",
        description:
          "We have misting systems with a high pressure nozzle that spray a natural look mist. They keep the humidity in the air above 85%, so moisture-loving tropical plants can get the moisture they need.",
        image: "/assets/services/paludarium.png",
      },
      {
        title: "Living Epiphyte Bio-Walls",
        description:
          "The vertical panels are constructed of cork bark and Hygrolon to support climbing vines, creeping figs and tropical mosses. These living walls are an addition to the depth and greenery and utilise vertical space.",
        image: "/assets/services/terrarium.png",
      },
      {
        title: "Full-Spectrum PAR Lighting",
        description:
          "Programmable LED lighting mimics sunrise, midday and sunset. The set-up is designed to offer appropriate light levels for plants under the canopy of dense tropical vegetation.",
        image: "/assets/services/aquascaping.png",
      },
    ],
  },
  {
    id: 7,
    slug: "paludarium-design",
    title: "Paludarium Design",
    description:
      "We combine land and water habitats in one environment.",
    overview:
      "Composed by land and water, each of our paludariums creates a single, rich environment that is both visually striking and ecologically balanced and easy to maintain.",
    image: "/assets/services/paludarium.png",
    icon: Mountain,
    highlights: [
      "Land and water habitat design",
      "Waterfall and circulation options",
      "Natural material selection",
      "Semi aquatic fauna compatibility",
    ],
    subFeatures: [
      {
        title: "Dual Aquatic & Terrestrial Biotopes",
        description:
          "Smooth passage from crystal clear underwater shoals to rich, emergent landside moss river banks.",
        image: "/assets/services/paludarium.png",
      },
      {
        title: "Integrated Waterfall Inflows",
        description:
          "The natural stone hardscape gently cascades water over the plants, ensuring they are always watered and providing natural oxygen to the water below.",
        image: "/assets/services/fountain.png",
      },
      {
        title: "Semi-Aquatic Fauna Habitats",
        description:
          "Special care has been taken to ensure that basking areas, shallows and safe climbing spots for crabs, frogs and newts are well designed.",
        image: "/assets/services/rainforest.png",
      },
      {
        title: "Custom Glass Biotope Enclosures",
        description:
          "These habitats are made of sturdy, edgeless glass and are designed to facilitate a healthy environment. They are equipped with easy to slide doors, built-in ventilation and smooth drainage on the back.",
        image: "/assets/services/luxury.png",
      },
    ],
  },
  {
    id: 8,
    slug: "terrarium-designs",
    title: "Terrarium Designs",
    description:
      "We build small plant ecosystems inside glass containers.",
    overview:
      "Though small in size, our terrariums are bursting with intricate details. Each glass ecosystem is carefully planted to grow indoors. They add easy elegance to your home and require little maintenance.",
    image: "/assets/services/terrarium.png",
    icon: Flower2,
    highlights: [
      "Custom glass compositions",
      "Humidity-loving plant selection",
      "Bio active soil & springtail colonies",
      "Simple care instructions",
    ],
    subFeatures: [
      {
        title: "Enclosed Self-Sustaining Spheres",
        description:
          "Each of these enclosed glass containers has its own natural nutrient and water cycle. Very independent and only require light watering once or twice a month.",
        image: "/assets/services/terrarium.png",
      },
      {
        title: "Desktop Micro-Terrariums",
        description:
          "Take nature to the office with these mini geometric decorations. They fit just fine on an office desk or onto a reception counter and will give a new modern appearance to any bookshelf.",
        image: "/assets/services/residential.png",
      },
      {
        title: "Bioactive Forest Terrariums",
        description:
          "Discover a very small forest world. These full ecosystems have abundant live moss and delicate dwarf tropical ferns. A natural cleanup crew is working efficiently in the background to maintain the good health and balance of the environment.",
        image: "/assets/services/wall.png",
      },
      {
        title: "Artisan Glass Vessels",
        description:
          "Unique habitats are formed within hand blown recycled glass carboys and lovely apothecary jars. Custom geometric showcases with traditional natural cork stoppers are also available.",
        image: "/assets/services/aquascaping.png",
      },
    ],
  },
  {
    id: 9,
    slug: "maintenance",
    title: "Maintenance",
    description:
      "We thoroughly clean aquariums, monitor water quality and help create stunning aquatic environments.",
    overview:
      "A healthy tank or pond requires proper maintenance. Our certified aquarists and technicians take care of the dirty and technical aspects allowing you to sit back and enjoy the show. Weekly, we do what's necessary to maintain the water clear and the environment totally stable.",
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
          "All the vital signs are checked to ensure that the water is in fact safe for the animals. We use all the water levels, from ammonia, nitrites, nitrates, pH, full water hardness tests with a professional lab kit.",
        image: "/assets/services/maintenance.png",
      },
      {
        title: "Filter & Pump Overhauls",
        description:
          "Over time, the equipment is covered with debris. The pumps are disassembled to remove the impellers and to gently rinse your filter media in old tank water. We also change out old UV lamps when they are not working as well as they used to be.",
        image: "/assets/services/commercial.png",
      },
      {
        title: "Botanical Trimming & Algae Control",
        description:
          "Live plants grow wild and algae just grows. We intervene and carefully cut back overgrown stems and gently vacuum the substrate. Once the glass is shiny and free of any scratches, we address any remaining algae problem in a natural way.",
        image: "/assets/services/aquascaping.png",
      },
      {
        title: "Emergency Support & Rapid Response",
        description:
          "Sometimes it's just not working. No matter if the pump goes down in the middle of the night, a seal leaks or the water chemistry all of a sudden runs out of the woods, our staff is available 24 hours a day. We are always available to resolve the issue before it escalates to a disaster.",
        image: "/assets/services/residential.png",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}