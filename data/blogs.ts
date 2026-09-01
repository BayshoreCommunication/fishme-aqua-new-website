export interface BlogSectionContent {
  heading?: string;
  paragraphs: string[];
  bulletPoints?: string[];
  callout?: {
    title: string;
    text: string;
  };
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  keyTakeaways: string[];
  content: BlogSectionContent[];
  featured?: boolean;
}

export const allBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Beginner’s Guide to Aquascaping",
    slug: "beginners-guide-to-aquascaping",
    excerpt:
      "Learn the fundamentals of creating stunning underwater landscapes with our comprehensive guide for beginners.",
    image: "/assets/blog/blog-1.png",
    category: "Aquarium Health",
    readTime: "8 min Read",
    publishDate: "August 24, 2026",
    author: {
      name: "Tanvir Ahmed",
      role: "Lead Aquascaper & Aquatic Botanist",
      avatar: "/assets/home/avatar1.png",
    },
    tags: ["Aquascaping", "Hardscape", "Aquatic Plants", "Nature Aquarium"],
    keyTakeaways: [
      "Choose the right style: Nature Aquarium, Iwagumi, or Dutch Aquascape before purchasing hardscape materials.",
      "The Golden Ratio (1:1.618) and Rule of Thirds create a natural, harmonious underwater focal point.",
      "Use nutrient-rich aquasoil paired with volcanic lava rock crushed base for optimal root development.",
      "Balanced lighting and pressurized CO2 are critical to prevent unsightly green dust and hair algae.",
    ],
    content: [
      {
        heading: "1. Introduction to the Art of Aquascaping",
        paragraphs: [
          "Aquascaping is the craft of arranging aquatic plants, rocks, stones, driftwood, and substrates in an aesthetically pleasing manner within an aquarium. More than a fish tank, an aquascape is a living work of underwater art that mimics the serenity and vitality of untouched natural landscapes.",
          "Unlike traditional fishkeeping where livestock is the sole focus, modern aquascaping places equal emphasis on plant physiology, geological aesthetics, and bio-chemical balance. With proper planning and patience, anyone can construct a thriving natural ecosystem in their home or office.",
        ],
      },
      {
        heading: "2. Selecting Your Aquascaping Style",
        paragraphs: [
          "Before pouring substrate or purchasing plants, deciding on an aesthetic style helps maintain visual harmony throughout the tank layout:",
        ],
        bulletPoints: [
          "Nature Aquarium (IAPLC Style): Popularized by Takashi Amano, mimicking terrestrial forests, valleys, and riverbanks using roots and dense vegetation.",
          "Iwagumi Style: A minimalist Japanese stone layout centered around a primary 'Oyaishi' stone with low carpet plants like Monte Carlo or Glossostigma.",
          "Dutch Style: Lush, terraced flowerbed-like plant arrangements focusing solely on contrasting stem colors, leaf textures, and heights without stones or wood.",
          "Jungle Style: A wild, untamed ecosystem combining tall Valisneria, floating plants, and dark driftwood for a raw Amazonian riverbed feel.",
        ],
        callout: {
          title: "Pro Aquascaper Tip",
          text: "Always sketch your layout on paper or use a cardboard dry-box matching your tank dimensions to experiment with stone angles before adding water.",
        },
      },
      {
        heading: "3. Hardscape Composition and the Golden Ratio",
        paragraphs: [
          "The hardscape (driftwood and stones) forms the permanent skeletal backbone of your layout. To avoid symmetry that looks artificial to the human eye, place your main focal point roughly 1/3 of the distance from one side of the tank rather than directly in the center.",
          "When stacking Seiryu Stone, Frodo Stone, or Malaysian Driftwood, ensure all stone grain lines and branch vectors flow in a unified direction. This simulates decades of natural water erosion and wind currents.",
        ],
      },
      {
        heading: "4. Lighting, CO2, and Nutrient Delivery",
        paragraphs: [
          "Healthy aquatic plants require three pillars of photosynthesis: High-PAR full-spectrum LED lighting, dissolved carbon dioxide (CO2), and micro/macro fertilizers (NPK + Iron).",
          "During the initial 4 weeks of cycling, keep your photoperiod limited to 6 hours daily. Perform 50% water changes every 3 to 4 days to export excess nutrients released by fresh aquasoil, preventing common diatoms and green hair algae outbreaks.",
        ],
      },
    ],
    featured: true,
  },
  {
    id: 2,
    title: "How to Maintain a Healthy Koi Pond",
    slug: "maintain-healthy-koi-pond",
    excerpt:
      "Essential seasonal tips for keeping your koi pond clean, balanced, and fish thriving throughout the year.",
    image: "/assets/blog/blog-2.png",
    category: "Pond Care",
    readTime: "6 min Read",
    publishDate: "August 18, 2026",
    author: {
      name: "Sayed Mahmud",
      role: "Pond Architect & Bio-Filtration Specialist",
      avatar: "/assets/home/avatar2.png",
    },
    tags: ["Koi Care", "Outdoor Ponds", "Biological Filtration", "Water Quality"],
    keyTakeaways: [
      "Maintain oxygen saturation with high-output bottom aerators, especially during warm summer nights.",
      "Mechanical filtration removes suspended fish waste before it breaks down into harmful ammonia.",
      "Test ammonia, nitrite, and pH weekly; keep dissolved ammonia strictly at 0.0 ppm.",
      "Adjust feeding schedules according to water temperature to prevent swim bladder and digestive failure.",
    ],
    content: [
      {
        heading: "1. The Biological Lifecycle of a Koi Pond",
        paragraphs: [
          "Nishikigoi (Koi) are magnificent, long-lived aquatic jewels that can thrive for decades when provided with pristine water conditions. However, because koi produce significant metabolic waste, outdoor ponds require heavy-duty biological filtration and continuous aeration.",
          "A healthy pond is not a sterile swimming pool; it is a complex biological ecosystem where beneficial Nitrosomonas and Nitrobacter bacteria constantly neutralize toxic ammonia into harmless nitrates.",
        ],
      },
      {
        heading: "2. Mechanical and Biological Filtration Essentials",
        paragraphs: [
          "A dual-stage filtration system is paramount for crystal-clear koi water:",
        ],
        bulletPoints: [
          "Rotary Drum Filters or Bottom Drains: Intercept feces and decaying foliage immediately before organic matter dissolves into water.",
          "Moving Bed Biofilm Reactors (MBBR) & Bakki Showers: High-surface area media fluidized by air pumps where trillions of nitrifying bacteria consume organic toxins.",
          "UV Clarifiers: Ultraviolet light lamps destroy free-floating single-cell green algae blooms without chemical algicides.",
        ],
      },
      {
        heading: "3. Seasonal Feeding and Temperature Management",
        paragraphs: [
          "Koi are poikilothermic (cold-blooded) animals whose metabolic rate is determined entirely by surrounding water temperature. When pond water drops below 10°C (50°F), reduce feedings to wheatgerm-based pellets or halt feedings completely to avoid gut compaction.",
          "During hot tropical summer peaks, ensure waterfalls and venturi air injectors run 24/7 to maintain dissolved oxygen levels above 6.0 mg/L.",
        ],
        callout: {
          title: "Safety Reminder",
          text: "Never overfeed your koi. Any uneaten food remaining after 5 minutes should be skimmed out immediately to protect water parameters.",
        },
      },
    ],
  },
  {
    id: 3,
    title: "Choosing the Right Plants for Your Aquarium",
    slug: "choosing-right-plants",
    excerpt:
      "Discover which aquatic plants work best for different tank types, substrate options, and lighting levels.",
    image: "/assets/blog/blog-3.png",
    category: "Lighting",
    readTime: "7 min Read",
    publishDate: "August 10, 2026",
    author: {
      name: "Dr. Jennifer Rivers",
      role: "Aquatic Flora Researcher",
      avatar: "/assets/home/avatar1.png",
    },
    tags: ["Aquatic Flora", "Low Tech Plants", "Carpeting Plants", "Stem Plants"],
    keyTakeaways: [
      "Categorize plants into Foreground (carpets), Midground (ferns/crypts), and Background (stem plants).",
      "Epiphytic plants like Anubias and Java Fern must be glued or tied to hardscape, never buried in soil.",
      "Low-tech setups without CO2 thrive with Cryptocoryne, Bucephalandra, and Amazon Swords.",
      "High-tech plants (Rotala Macrandra, Ludwigia Pantanal) demand intense lighting and iron fertilization.",
    ],
    content: [
      {
        heading: "1. Understanding Plant Needs and Light Zones",
        paragraphs: [
          "Aquatic plants not only oxygenate the water and absorb nitrates from fish waste, but they also outcompete algae and provide natural hiding grounds that reduce livestock stress.",
          "When selecting flora for your tank, match your plant species with the equipment tier of your aquarium setup. Low-demand species flourish with ambient illumination, while high-red stem species demand high PAR output.",
        ],
      },
      {
        heading: "2. The Three Aquarium Zones",
        paragraphs: [
          "To achieve depth and perspective in your aquarium layout, organize your plants into structural tiers:",
        ],
        bulletPoints: [
          "Foreground: Low-growing carpeting species like Micranthemum 'Monte Carlo', Eleocharis parvula (Dwarf Hairgrass), and Marsilea crenata.",
          "Midground: Medium-height plants that soften transitions around wood and rock, including Anubias nana petite, Java Fern Trident, and Bucephalandra.",
          "Background: Fast-growing vertical stems like Rotala rotundifolia, Ludwigia super red, and Pogostemon erectus that create dense colorful curtains.",
        ],
        callout: {
          title: "Root Feeder vs Water Column Feeder",
          text: "Cryptocorynes and Swords feed primarily through their roots via nutrient-rich substrate, while Mosses and Stem plants absorb minerals directly from the water column.",
        },
      },
      {
        heading: "3. Planting and Acclimation Tips",
        paragraphs: [
          "Tissue culture plants come sterile and snail-free in gel cups. Always rinse off the nutrient agar gel in lukewarm water before planting small individual clumps with fine aquascaping tweezers.",
          "During the first week, many tissue culture plants will shed their emersed leaves (melt) and sprout submersed foliage. Do not panic — remove decaying leaves with a siphon and ensure consistent lighting.",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "How to Maintain a Healthy Koi Pond",
    slug: "maintain-healthy-koi-pond-2",
    excerpt:
      "Essential seasonal tips for keeping your koi pond clean, balanced, and fish thriving throughout the year.",
    image: "/assets/blog/blog-2.png",
    category: "Pond Care",
    readTime: "6 min Read",
    publishDate: "July 28, 2026",
    author: {
      name: "Sayed Mahmud",
      role: "Pond Architect",
      avatar: "/assets/home/avatar2.png",
    },
    tags: ["Koi Care", "Pond Filters", "Ecosystem"],
    keyTakeaways: [
      "Keep aeration pumps running non-stop to protect biological bacteria.",
      "Check pH swings between morning and sunset.",
      "Treat seasonal parasites with quarantine protocols before introducing new stock.",
    ],
    content: [
      {
        heading: "Water Chemistry and Biological Filtration",
        paragraphs: [
          "Maintaining crystal-clear koi pond water requires consistent attention to ammonia, nitrite, and dissolved oxygen levels.",
          "Perform routine backwashes of your bead filter and skim organic debris to prevent nitrate buildup.",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Choosing the Right Plants for Your Aquarium",
    slug: "choosing-right-plants-2",
    excerpt:
      "Discover which aquatic plants work best for different tank types, substrate options, and lighting levels.",
    image: "/assets/blog/blog-3.png",
    category: "Lighting",
    readTime: "7 min Read",
    publishDate: "July 15, 2026",
    author: {
      name: "Dr. Jennifer Rivers",
      role: "Aquatic Botanist",
      avatar: "/assets/home/avatar1.png",
    },
    tags: ["Aquatic Plants", "Lighting", "Flora"],
    keyTakeaways: [
      "Match plant requirements to lighting levels.",
      "Fertilize with all-in-one macro and micro liquid feeds.",
    ],
    content: [
      {
        heading: "Selecting the Best Flora for Beginners",
        paragraphs: [
          "Beginner-friendly plants like Java Fern, Anubias, and Cryptocorynes provide high survival rates and fast growth with minimal maintenance.",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Beginner’s Guide to Aquascaping",
    slug: "beginners-guide-to-aquascaping-2",
    excerpt:
      "Learn the fundamentals of creating stunning underwater landscapes with our comprehensive guide for beginners.",
    image: "/assets/blog/blog-1.png",
    category: "Aquarium Health",
    readTime: "8 min Read",
    publishDate: "June 30, 2026",
    author: {
      name: "Tanvir Ahmed",
      role: "Lead Aquascaper",
      avatar: "/assets/home/avatar1.png",
    },
    tags: ["Aquascaping", "Substrate", "Hardscape"],
    keyTakeaways: [
      "Plan your hardscape before buying livestock.",
      "Maintain a 6-8 hour photoperiod to avoid green dust algae.",
    ],
    content: [
      {
        heading: "The Fundamentals of Underwater Landscaping",
        paragraphs: [
          "Creating a breathtaking aquascape is all about visual balance, patient plant growth, and steady water chemistry.",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Beginner’s Guide to Aquascaping",
    slug: "beginners-guide-to-aquascaping-3",
    excerpt:
      "Learn the fundamentals of creating stunning underwater landscapes with our comprehensive guide for beginners.",
    image: "/assets/blog/blog-1.png",
    category: "Aquarium Health",
    readTime: "8 min Read",
    publishDate: "June 14, 2026",
    author: {
      name: "Tanvir Ahmed",
      role: "Lead Aquascaper",
      avatar: "/assets/home/avatar1.png",
    },
    tags: ["Aquascaping", "Co2", "Lighting"],
    keyTakeaways: [
      "Keep lighting and CO2 in balance with fertilizer doses.",
    ],
    content: [
      {
        heading: "Achieving Long-Term Ecosystem Stability",
        paragraphs: [
          "A mature planted aquarium becomes self-sustaining once beneficial bacteria colonies establish across the substrate and filter media.",
        ],
      },
    ],
  },
  {
    id: 8,
    title: "How to Maintain a Healthy Koi Pond",
    slug: "maintain-healthy-koi-pond-3",
    excerpt:
      "Essential seasonal tips for keeping your koi pond clean, balanced, and fish thriving throughout the year.",
    image: "/assets/blog/blog-2.png",
    category: "Pond Care",
    readTime: "6 min Read",
    publishDate: "May 25, 2026",
    author: {
      name: "Sayed Mahmud",
      role: "Pond Architect",
      avatar: "/assets/home/avatar2.png",
    },
    tags: ["Koi Care", "Pond Pumps", "Water Testing"],
    keyTakeaways: [
      "Keep pond water aerated and avoid sudden temperature shifts.",
    ],
    content: [
      {
        heading: "Seasonal Pond Maintenance Checklist",
        paragraphs: [
          "Regular filter cleaning, pond netting to catch falling autumn leaves, and UV tube replacement ensure clean and clear water all season.",
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Choosing the Right Plants for Your Aquarium",
    slug: "choosing-right-plants-3",
    excerpt:
      "Discover which aquatic plants work best for different tank types, substrate options, and lighting levels.",
    image: "/assets/blog/blog-3.png",
    category: "Lighting",
    readTime: "7 min Read",
    publishDate: "May 10, 2026",
    author: {
      name: "Dr. Jennifer Rivers",
      role: "Aquatic Botanist",
      avatar: "/assets/home/avatar1.png",
    },
    tags: ["Aquatic Plants", "Lighting", "Substrate"],
    keyTakeaways: [
      "Select high-grade active soil for root-feeding species.",
    ],
    content: [
      {
        heading: "Aquarium Flora Selection Guide",
        paragraphs: [
          "Understanding how different aquatic species feed and reproduce allows you to create vibrant, self-balancing planted aquariums.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  const normalizedSlug = (slug || '').toLowerCase().trim();
  return allBlogPosts.find((post) => post.slug.toLowerCase() === normalizedSlug);
}

export function getRelatedBlogPosts(currentSlug: string, limit = 3): BlogPost[] {
  const normalizedSlug = (currentSlug || '').toLowerCase().trim();
  const currentPost = getBlogPost(normalizedSlug);

  if (!currentPost) {
    return allBlogPosts.slice(0, limit);
  }

  const categoryMatches = allBlogPosts.filter(
    (post) =>
      post.slug.toLowerCase() !== normalizedSlug &&
      post.category.toLowerCase() === currentPost.category.toLowerCase(),
  );

  if (categoryMatches.length >= limit) {
    return categoryMatches.slice(0, limit);
  }

  const otherPosts = allBlogPosts.filter(
    (post) =>
      post.slug.toLowerCase() !== normalizedSlug &&
      post.category.toLowerCase() !== currentPost.category.toLowerCase(),
  );

  return [...categoryMatches, ...otherPosts].slice(0, limit);
}
