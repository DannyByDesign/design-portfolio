export type PortfolioImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  quality: 60 | 75;
  delivery: "next";
};

export type IndustrialProjectFrame = {
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

export type IndustrialProject = {
  slug: string;
  title: string;
  subtitle: string;
  href: string;
  image: PortfolioImageAsset;
  tone: string;
  frames: IndustrialProjectFrame[];
};

type FrameDescriptor = {
  src: string;
  width: number;
  height: number;
  poster?: string;
  loading?: "eager" | "lazy";
  preload?: "none" | "metadata" | "auto";
};

function getMediaType(src: string): IndustrialProjectFrame["mediaType"] {
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

function createFrames(projectTitle: string, frames: FrameDescriptor[]): IndustrialProjectFrame[] {
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
