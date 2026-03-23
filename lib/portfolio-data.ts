export type PortfolioImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  quality: 60 | 75;
  delivery: "next";
};

export type PortfolioProjectFrame = {
  id: string;
  src: string;
  alt: string;
  mediaType: "image" | "video";
  width: number;
  height: number;
  delivery: "static";
  loading: "eager" | "lazy";
  preload?: "none" | "metadata" | "auto";
  poster?: string;
};

export type IndustrialProjectFrame = PortfolioProjectFrame;

export type IndustrialProject = {
  slug: string;
  title: string;
  subtitle: string;
  href: string;
  image: PortfolioImageAsset;
  tone: string;
  frames: IndustrialProjectFrame[];
};

export type DesignEngineeringProjectImage = {
  src: string;
  alt: string;
  tone: string;
};

export type DesignEngineeringProject = {
  slug: string;
  title: string;
  description: string;
  href: string;
  image: DesignEngineeringProjectImage;
  frames: PortfolioProjectFrame[];
  externalHref?: string;
  githubHref?: string;
  figmaHref?: string;
  actionOrder?: Array<"external" | "github" | "figma">;
};

type FrameDescriptor = {
  src: string;
  width: number;
  height: number;
  poster?: string;
  loading?: "eager" | "lazy";
  preload?: "none" | "metadata" | "auto";
};

function getMediaType(src: string): PortfolioProjectFrame["mediaType"] {
  if (/\.(mp4|webm|mov)$/i.test(src)) {
    return "video";
  }

  return "image";
}

function createThumbnail(
  src: string,
  alt: string,
  width: number,
  height: number,
): PortfolioImageAsset {
  return {
    src,
    alt,
    width,
    height,
    quality: 75,
    delivery: "next",
  };
}

function createFrames(projectTitle: string, frames: FrameDescriptor[]): PortfolioProjectFrame[] {
  return frames.map((frame, index) => ({
    id: `frame-${String(index + 1).padStart(2, "0")}`,
    src: frame.src,
    alt: `${projectTitle} media ${index + 1}`,
    mediaType: getMediaType(frame.src),
    width: frame.width,
    height: frame.height,
    delivery: "static",
    loading: frame.loading ?? (index === 0 ? "eager" : "lazy"),
    preload: frame.preload,
    poster: frame.poster,
  }));
}

function createDesignEngineeringFrames(projectTitle: string, slug: string): PortfolioProjectFrame[] {
  return createFrames(projectTitle, [
    { src: `/portfolio/design-engineering/${slug}/1.jpg`, width: 1600, height: 1200 },
    { src: `/portfolio/design-engineering/${slug}/2.jpg`, width: 1600, height: 1200 },
    { src: `/portfolio/design-engineering/${slug}/3.jpg`, width: 1600, height: 1200 },
  ]);
}

export const industrialProjects: IndustrialProject[] = [
  {
    slug: "tiara",
    title: "Tiara",
    subtitle: "AI powered migraine tracker",
    href: "/industrial-design/tiara",
    image: createThumbnail(
      "/portfolio/industrial-design/thumbnails/Tiara.jpg",
      "Tiara thumbnail",
      1325,
      929,
    ),
    tone: "from-zinc-100 to-zinc-50",
    frames: createFrames("Tiara", [
      { src: "/portfolio/industrial-design/tiara/1Tiara.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/tiara/2Tiara.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/tiara/3Tiara.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/tiara/4Tiara.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/tiara/5Tiara.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/tiara/6Tiara.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/tiara/7Tiara.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/tiara/8Tiara.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/tiara/9Tiara.jpg", width: 2275, height: 2560 },
      {
        src: "/portfolio/industrial-design/tiara/10Animation.mp4",
        width: 1920,
        height: 1080,
        poster: "/portfolio/industrial-design/tiara/10.jpg",
        preload: "metadata",
      },
      { src: "/portfolio/industrial-design/tiara/10.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/tiara/11.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/tiara/12.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/tiara/13.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/tiara/14.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/tiara/15.jpg", width: 2560, height: 1412 },
      { src: "/portfolio/industrial-design/tiara/16.jpg", width: 2560, height: 1429 },
    ]),
  },
  {
    slug: "timer-02",
    title: "Timer 02",
    subtitle: "Gestural kitchen timer",
    href: "/industrial-design/timer-02",
    image: createThumbnail(
      "/portfolio/industrial-design/thumbnails/Timer 02.jpg",
      "Timer 02 thumbnail",
      2380,
      1657,
    ),
    tone: "from-stone-100 to-zinc-50",
    frames: createFrames("Timer 02", [
      { src: "/portfolio/industrial-design/timer-02/1.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/timer-02/2.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/timer-02/3.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/timer-02/4.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/timer-02/5.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/timer-02/6.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/timer-02/7.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/timer-02/8.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/timer-02/9.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/timer-02/10.png", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/timer-02/11.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/timer-02/12.jpg", width: 2560, height: 1441 },
    ]),
  },
  {
    slug: "adaptable-micro-mobility",
    title: "Adaptable Micro-mobility",
    subtitle: "City-highway mobility solution",
    href: "/industrial-design/adaptable-micro-mobility",
    image: createThumbnail(
      "/portfolio/industrial-design/thumbnails/Adaptable Micro-mobility.jpg",
      "Adaptable Micro-mobility thumbnail",
      1244,
      973,
    ),
    tone: "from-zinc-100 to-neutral-50",
    frames: createFrames("Adaptable Micro-mobility", [
      { src: "/portfolio/industrial-design/adaptable-micro-mobility/1.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/adaptable-micro-mobility/2.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/adaptable-micro-mobility/3.gif", width: 1080, height: 608 },
      { src: "/portfolio/industrial-design/adaptable-micro-mobility/4.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/adaptable-micro-mobility/5.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/adaptable-micro-mobility/6.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/adaptable-micro-mobility/7.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/adaptable-micro-mobility/8.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/adaptable-micro-mobility/9.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/adaptable-micro-mobility/10.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/adaptable-micro-mobility/11.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/adaptable-micro-mobility/12.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/adaptable-micro-mobility/13.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/adaptable-micro-mobility/14.jpg", width: 2560, height: 1440 },
    ]),
  },
  {
    slug: "milwaukee-tool",
    title: "Milwaukee Tool",
    subtitle: "Internship project",
    href: "/industrial-design/milwaukee-tool",
    image: createThumbnail(
      "/portfolio/industrial-design/thumbnails/Milwaukee Tool.jpg",
      "Milwaukee Tool thumbnail",
      973,
      675,
    ),
    tone: "from-zinc-100 to-zinc-50",
    frames: createFrames("Milwaukee Tool", [
      { src: "/portfolio/industrial-design/milwaukee-tool/1.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/milwaukee-tool/2.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/milwaukee-tool/3.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/milwaukee-tool/4.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/milwaukee-tool/5.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/milwaukee-tool/6.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/milwaukee-tool/7.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/milwaukee-tool/8.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/milwaukee-tool/9.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/milwaukee-tool/10.jpg", width: 2560, height: 1440 },
    ]),
  },
  {
    slug: "garmin-descent",
    title: "Garmin Descent",
    subtitle: "Internship project",
    href: "/industrial-design/garmin-descent",
    image: createThumbnail(
      "/portfolio/industrial-design/thumbnails/Garmin Descent.jpg",
      "Garmin Descent thumbnail",
      1200,
      675,
    ),
    tone: "from-stone-100 to-zinc-50",
    frames: createFrames("Garmin Descent", [
      { src: "/portfolio/industrial-design/garmin-descent/1.jpg", width: 2560, height: 1440 },
      {
        src: "/portfolio/industrial-design/garmin-descent/1Animation.mp4",
        width: 1936,
        height: 1080,
        poster: "/portfolio/industrial-design/garmin-descent/1.jpg",
        preload: "metadata",
      },
      { src: "/portfolio/industrial-design/garmin-descent/2.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/garmin-descent/3.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/garmin-descent/4.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/garmin-descent/5.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/garmin-descent/6.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/garmin-descent/7.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/garmin-descent/8.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/garmin-descent/9.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/garmin-descent/10.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/garmin-descent/11.jpg", width: 2560, height: 1440 },
    ]),
  },
  {
    slug: "sketch-gallery",
    title: "Sketch Gallery",
    subtitle: "Ideation & proccess",
    href: "/industrial-design/sketch-gallery",
    image: createThumbnail(
      "/portfolio/industrial-design/thumbnails/Sketch Gallery.jpg",
      "Sketch Gallery thumbnail",
      2560,
      1024,
    ),
    tone: "from-zinc-100 to-neutral-50",
    frames: createFrames("Sketch Gallery", [
      { src: "/portfolio/industrial-design/sketch-gallery/1.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/sketch-gallery/2.png", width: 4800, height: 2700 },
      { src: "/portfolio/industrial-design/sketch-gallery/3.png", width: 4800, height: 2700 },
      { src: "/portfolio/industrial-design/sketch-gallery/4.png", width: 4800, height: 2700 },
      { src: "/portfolio/industrial-design/sketch-gallery/5.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/sketch-gallery/6.png", width: 4800, height: 2700 },
      { src: "/portfolio/industrial-design/sketch-gallery/7.jpg", width: 2560, height: 1441 },
      { src: "/portfolio/industrial-design/sketch-gallery/8.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/sketch-gallery/9.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/sketch-gallery/10.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/sketch-gallery/11.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/sketch-gallery/12.jpg", width: 2560, height: 1396 },
      { src: "/portfolio/industrial-design/sketch-gallery/13.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/sketch-gallery/14.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/sketch-gallery/15.jpg", width: 2560, height: 1656 },
      { src: "/portfolio/industrial-design/sketch-gallery/16.jpg", width: 2560, height: 1656 },
      { src: "/portfolio/industrial-design/sketch-gallery/17.jpg", width: 2388, height: 1668 },
      { src: "/portfolio/industrial-design/sketch-gallery/18.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/sketch-gallery/19.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/sketch-gallery/20.jpg", width: 2560, height: 1656 },
      { src: "/portfolio/industrial-design/sketch-gallery/21.jpg", width: 2560, height: 1656 },
      { src: "/portfolio/industrial-design/sketch-gallery/22.jpg", width: 2560, height: 1656 },
      { src: "/portfolio/industrial-design/sketch-gallery/23.jpeg", width: 2560, height: 1566 },
      { src: "/portfolio/industrial-design/sketch-gallery/24.jpg", width: 2388, height: 1379 },
      { src: "/portfolio/industrial-design/sketch-gallery/25.jpg", width: 2560, height: 1656 },
      { src: "/portfolio/industrial-design/sketch-gallery/26.jpg", width: 2560, height: 1656 },
      { src: "/portfolio/industrial-design/sketch-gallery/27.jpg", width: 2560, height: 1656 },
      { src: "/portfolio/industrial-design/sketch-gallery/28.jpg", width: 2560, height: 1440 },
      { src: "/portfolio/industrial-design/sketch-gallery/29.jpg", width: 2560, height: 1656 },
      { src: "/portfolio/industrial-design/sketch-gallery/30.jpg", width: 2560, height: 1656 },
      { src: "/portfolio/industrial-design/sketch-gallery/31.jpg", width: 2560, height: 1656 },
      { src: "/portfolio/industrial-design/sketch-gallery/32.jpg", width: 2244, height: 1452 },
      { src: "/portfolio/industrial-design/sketch-gallery/33.jpg", width: 2560, height: 1667 },
      { src: "/portfolio/industrial-design/sketch-gallery/34.jpg", width: 2560, height: 1699 },
      { src: "/portfolio/industrial-design/sketch-gallery/35.jpg", width: 2560, height: 1656 },
      { src: "/portfolio/industrial-design/sketch-gallery/38.jpg", width: 2560, height: 1920 },
    ]),
  },
];

export const designEngineeringProjects: DesignEngineeringProject[] = [
  {
    slug: "kiku-website",
    title: "Kiku Website",
    description: "Designed and built a marketing site for a North Carolina hydroponics startup.",
    href: "/design-engineering/kiku-website",
    externalHref: "https://www.kikuinc.com/",
    figmaHref: "https://www.figma.com/file/example-kiku-website",
    actionOrder: ["figma", "external"],
    image: {
      src: "/portfolio/design-engineering/thumbnails/kiku-website.jpg",
      alt: "Homepage thumbnail for the Kiku website project",
      tone: "from-[#121714] via-[#1a241e] to-[#2a3a2b]",
    },
    frames: createDesignEngineeringFrames("Kiku Website", "workflow-automation-suite"),
  },
  {
    slug: "magic-orb",
    title: "Magic Orb",
    description: "A Three.js particle experiment exploring interface ideas for voice-based AI agents.",
    href: "/design-engineering/magic-orb",
    externalHref: "https://magic-orb-seven.vercel.app/",
    githubHref: "https://github.com/example/magic-orb",
    actionOrder: ["github", "external"],
    image: {
      src: "/portfolio/design-engineering/thumbnails/magic-orb.jpg",
      alt: "Homepage thumbnail for the Magic Orb project",
      tone: "from-[#efe9fb] via-[#d4c1fb] to-[#b48cf5]",
    },
    frames: createDesignEngineeringFrames("Magic Orb", "ux-research-copilot"),
  },
  {
    slug: "catalon-landing-page",
    title: "Catalon Landing Page",
    description: "A freelance landing page focused on clearer messaging and stronger conversion.",
    href: "/design-engineering/catalon-landing-page",
    externalHref: "https://usecatalon.com/",
    figmaHref: "https://www.figma.com/file/example-catalon-landing-page",
    actionOrder: ["figma", "external"],
    image: {
      src: "/portfolio/design-engineering/thumbnails/catalon-landing-page.jpg",
      alt: "Homepage thumbnail for the Catalon landing page project",
      tone: "from-[#f8f7f4] via-[#efede7] to-[#ddd8ce]",
    },
    frames: createDesignEngineeringFrames("Catalon Landing Page", "content-system-generator"),
  },
  {
    slug: "amodel-branding",
    title: "Amodel Branding",
    description: "Brand identity for a consumer-facing platform that brings AI models into one place.",
    href: "/design-engineering/amodel-branding",
    image: {
      src: "/portfolio/design-engineering/amodel-branding/thumbnail.jpg",
      alt: "Visualization for Amodel Branding project",
      tone: "from-[#211321] via-[#2b1730] to-[#140d17]",
    },
    frames: createFrames("Amodel Branding", [
      { src: "/portfolio/design-engineering/amodel-branding/1.jpg", width: 3840, height: 2160 },
      { src: "/portfolio/design-engineering/amodel-branding/2.jpg", width: 3840, height: 2160 },
      { src: "/portfolio/design-engineering/amodel-branding/3.jpg", width: 3840, height: 2160 },
      { src: "/portfolio/design-engineering/amodel-branding/4.jpg", width: 3840, height: 2160 },
      { src: "/portfolio/design-engineering/amodel-branding/5.jpg", width: 3840, height: 2160 },
      { src: "/portfolio/design-engineering/amodel-branding/6.jpg", width: 3840, height: 2160 },
      { src: "/portfolio/design-engineering/amodel-branding/7.jpg", width: 3840, height: 2160 },
      { src: "/portfolio/design-engineering/amodel-branding/8.jpg", width: 3840, height: 2160 },
      { src: "/portfolio/design-engineering/amodel-branding/9.jpg", width: 3840, height: 2160 },
    ]),
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

export function getDesignEngineeringProject(slug: string) {
  return designEngineeringProjects.find((project) => project.slug === slug);
}

export function getDesignEngineeringProjectSiblings(slug: string) {
  const projectIndex = designEngineeringProjects.findIndex((project) => project.slug === slug);

  if (projectIndex === -1) {
    return null;
  }

  const previousIndex =
    (projectIndex - 1 + designEngineeringProjects.length) % designEngineeringProjects.length;
  const nextIndex = (projectIndex + 1) % designEngineeringProjects.length;

  return {
    previous: designEngineeringProjects[previousIndex],
    next: designEngineeringProjects[nextIndex],
  };
}
