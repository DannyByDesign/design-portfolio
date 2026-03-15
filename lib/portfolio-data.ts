export type IndustrialProjectFrame = {
  id: string;
  src: string;
  alt: string;
  tone: string;
};

export type IndustrialProject = {
  slug: string;
  title: string;
  subtitle: string;
  href: string;
  image: {
    src: string;
    alt: string;
  };
  tone: string;
  frames: IndustrialProjectFrame[];
};

const frameTones = [
  "from-[#f7f2ea] via-[#efe2cf] to-[#ddd0bc]",
  "from-[#ebe1d4] via-[#f4ede4] to-[#d7c7b5]",
  "from-[#e8ddd0] via-[#dfd1c2] to-[#f5eee4]",
  "from-[#ede4d8] via-[#f7f2ea] to-[#d9c6b0]",
] as const;

function createFrames(projectTitle: string): IndustrialProjectFrame[] {
  return [
    {
      id: "frame-01",
      src: "/window.svg",
      alt: `${projectTitle} gallery frame 1`,
      tone: frameTones[0],
    },
    {
      id: "frame-02",
      src: "/globe.svg",
      alt: `${projectTitle} gallery frame 2`,
      tone: frameTones[1],
    },
    {
      id: "frame-03",
      src: "/file.svg",
      alt: `${projectTitle} gallery frame 3`,
      tone: frameTones[2],
    },
    {
      id: "frame-04",
      src: "/window.svg",
      alt: `${projectTitle} gallery frame 4`,
      tone: frameTones[3],
    },
  ];
}

export const industrialProjects: IndustrialProject[] = [
  {
    slug: "concept-mobility-system",
    title: "Concept Mobility System",
    subtitle: "Bold interaction concept.",
    href: "/industrial-design/concept-mobility-system",
    image: { src: "/window.svg", alt: "Placeholder visual for concept mobility system" },
    tone: "from-zinc-100 to-zinc-50",
    frames: createFrames("Concept Mobility System"),
  },
  {
    slug: "adaptive-kitchen-tooling",
    title: "Adaptive Kitchen Tooling",
    subtitle: "Ergonomic modular studies.",
    href: "/industrial-design/adaptive-kitchen-tooling",
    image: { src: "/globe.svg", alt: "Placeholder visual for adaptive kitchen tooling" },
    tone: "from-stone-100 to-zinc-50",
    frames: createFrames("Adaptive Kitchen Tooling"),
  },
  {
    slug: "wearable-utility-concept",
    title: "Wearable Utility Concept",
    subtitle: "Comfort-first form studies.",
    href: "/industrial-design/wearable-utility-concept",
    image: { src: "/file.svg", alt: "Placeholder visual for wearable utility concept" },
    tone: "from-zinc-100 to-neutral-50",
    frames: createFrames("Wearable Utility Concept"),
  },
  {
    slug: "consumer-device-program",
    title: "Consumer Device Program",
    subtitle: "Sketch-to-shelf execution.",
    href: "/industrial-design/consumer-device-program",
    image: { src: "/window.svg", alt: "Placeholder visual for consumer device program" },
    tone: "from-zinc-100 to-zinc-50",
    frames: createFrames("Consumer Device Program"),
  },
  {
    slug: "household-product-line",
    title: "Household Product Line",
    subtitle: "Manufacturing-ready product line.",
    href: "/industrial-design/household-product-line",
    image: { src: "/globe.svg", alt: "Placeholder visual for household product line" },
    tone: "from-stone-100 to-zinc-50",
    frames: createFrames("Household Product Line"),
  },
  {
    slug: "accessory-system-design",
    title: "Accessory System Design",
    subtitle: "Detail-led production handoff.",
    href: "/industrial-design/accessory-system-design",
    image: { src: "/file.svg", alt: "Placeholder visual for accessory system design" },
    tone: "from-zinc-100 to-neutral-50",
    frames: createFrames("Accessory System Design"),
  },
];

export function getIndustrialProject(slug: string) {
  return industrialProjects.find((project) => project.slug === slug);
}

export function getIndustrialProjectSiblings(slug: string) {
  const projectIndex = industrialProjects.findIndex((project) => project.slug === slug);

  if (projectIndex === -1) {
    return null;
  }

  const previousIndex =
    (projectIndex - 1 + industrialProjects.length) % industrialProjects.length;
  const nextIndex = (projectIndex + 1) % industrialProjects.length;

  return {
    previous: industrialProjects[previousIndex],
    next: industrialProjects[nextIndex],
  };
}
