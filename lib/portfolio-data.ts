export type IndustrialProjectFrame = {
  id: string;
  src: string;
  alt: string;
  mediaType: "image" | "video";
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

function getMediaType(src: string): IndustrialProjectFrame["mediaType"] {
  if (/\.(mp4|webm|mov)$/i.test(src)) {
    return "video";
  }

  return "image";
}

function createFrames(projectTitle: string, sources: string[]): IndustrialProjectFrame[] {
  return sources.map((src, index) => ({
    id: `frame-${String(index + 1).padStart(2, "0")}`,
    src,
    alt: `${projectTitle} media ${index + 1}`,
    mediaType: getMediaType(src),
  }));
}

export const industrialProjects: IndustrialProject[] = [
  {
    slug: "tiara",
    title: "Tiara",
    subtitle: "AI powered migraine tracker",
    href: "/industrial-design/tiara",
    image: {
      src: "/portfolio/industrial-design/thumbnails/Tiara.jpg",
      alt: "Tiara thumbnail",
    },
    tone: "from-zinc-100 to-zinc-50",
    frames: createFrames("Tiara", [
      "/portfolio/industrial-design/tiara/1Tiara.jpg",
      "/portfolio/industrial-design/tiara/2Tiara.jpg",
      "/portfolio/industrial-design/tiara/3Tiara.jpg",
      "/portfolio/industrial-design/tiara/4Tiara.jpg",
      "/portfolio/industrial-design/tiara/5Tiara.jpg",
      "/portfolio/industrial-design/tiara/6Tiara.jpg",
      "/portfolio/industrial-design/tiara/7Tiara.jpg",
      "/portfolio/industrial-design/tiara/8Tiara.jpg",
      "/portfolio/industrial-design/tiara/9Tiara.jpg",
      "/portfolio/industrial-design/tiara/10Animation.mp4",
      "/portfolio/industrial-design/tiara/10.jpg",
      "/portfolio/industrial-design/tiara/11.jpg",
      "/portfolio/industrial-design/tiara/12.jpg",
      "/portfolio/industrial-design/tiara/13.jpg",
      "/portfolio/industrial-design/tiara/14.jpg",
      "/portfolio/industrial-design/tiara/15.jpg",
      "/portfolio/industrial-design/tiara/16.jpg",
    ]),
  },
  {
    slug: "timer-02",
    title: "Timer 02",
    subtitle: "Gestural kitchen timer",
    href: "/industrial-design/timer-02",
    image: {
      src: "/portfolio/industrial-design/thumbnails/Timer 02.jpg",
      alt: "Timer 02 thumbnail",
    },
    tone: "from-stone-100 to-zinc-50",
    frames: createFrames("Timer 02", [
      "/portfolio/industrial-design/timer-02/1.jpg",
      "/portfolio/industrial-design/timer-02/2.jpg",
      "/portfolio/industrial-design/timer-02/3.jpg",
      "/portfolio/industrial-design/timer-02/4.jpg",
      "/portfolio/industrial-design/timer-02/5.jpg",
      "/portfolio/industrial-design/timer-02/6.jpg",
      "/portfolio/industrial-design/timer-02/7.jpg",
      "/portfolio/industrial-design/timer-02/8.jpg",
      "/portfolio/industrial-design/timer-02/9.jpg",
      "/portfolio/industrial-design/timer-02/10.png",
      "/portfolio/industrial-design/timer-02/11.jpg",
      "/portfolio/industrial-design/timer-02/12.jpg",
    ]),
  },
  {
    slug: "adaptable-micro-mobility",
    title: "Adaptable Micro-mobility",
    subtitle: "City-highway mobility solution",
    href: "/industrial-design/adaptable-micro-mobility",
    image: {
      src: "/portfolio/industrial-design/thumbnails/Adaptable Micro-mobility.jpg",
      alt: "Adaptable Micro-mobility thumbnail",
    },
    tone: "from-zinc-100 to-neutral-50",
    frames: createFrames("Adaptable Micro-mobility", [
      "/portfolio/industrial-design/adaptable-micro-mobility/1.jpg",
      "/portfolio/industrial-design/adaptable-micro-mobility/2.jpg",
      "/portfolio/industrial-design/adaptable-micro-mobility/3.gif",
      "/portfolio/industrial-design/adaptable-micro-mobility/4.jpg",
      "/portfolio/industrial-design/adaptable-micro-mobility/5.jpg",
      "/portfolio/industrial-design/adaptable-micro-mobility/6.jpg",
      "/portfolio/industrial-design/adaptable-micro-mobility/7.jpg",
      "/portfolio/industrial-design/adaptable-micro-mobility/8.jpg",
      "/portfolio/industrial-design/adaptable-micro-mobility/9.jpg",
      "/portfolio/industrial-design/adaptable-micro-mobility/10.jpg",
      "/portfolio/industrial-design/adaptable-micro-mobility/11.jpg",
      "/portfolio/industrial-design/adaptable-micro-mobility/12.jpg",
      "/portfolio/industrial-design/adaptable-micro-mobility/13.jpg",
      "/portfolio/industrial-design/adaptable-micro-mobility/14.jpg",
    ]),
  },
  {
    slug: "milwaukee-tool",
    title: "Milwaukee Tool",
    subtitle: "Internship project",
    href: "/industrial-design/milwaukee-tool",
    image: {
      src: "/portfolio/industrial-design/thumbnails/Milwaukee Tool.jpg",
      alt: "Milwaukee Tool thumbnail",
    },
    tone: "from-zinc-100 to-zinc-50",
    frames: createFrames("Milwaukee Tool", [
      "/portfolio/industrial-design/milwaukee-tool/1.jpg",
      "/portfolio/industrial-design/milwaukee-tool/2.jpg",
      "/portfolio/industrial-design/milwaukee-tool/3.jpg",
      "/portfolio/industrial-design/milwaukee-tool/4.jpg",
      "/portfolio/industrial-design/milwaukee-tool/5.jpg",
      "/portfolio/industrial-design/milwaukee-tool/6.jpg",
      "/portfolio/industrial-design/milwaukee-tool/7.jpg",
      "/portfolio/industrial-design/milwaukee-tool/8.jpg",
      "/portfolio/industrial-design/milwaukee-tool/9.jpg",
      "/portfolio/industrial-design/milwaukee-tool/10.jpg",
    ]),
  },
  {
    slug: "garmin-descent",
    title: "Garmin Descent",
    subtitle: "Internship project",
    href: "/industrial-design/garmin-descent",
    image: {
      src: "/portfolio/industrial-design/thumbnails/Garmin Descent.jpg",
      alt: "Garmin Descent thumbnail",
    },
    tone: "from-stone-100 to-zinc-50",
    frames: createFrames("Garmin Descent", [
      "/portfolio/industrial-design/garmin-descent/1.jpg",
      "/portfolio/industrial-design/garmin-descent/1Animation.mp4",
      "/portfolio/industrial-design/garmin-descent/2.jpg",
      "/portfolio/industrial-design/garmin-descent/3.jpg",
      "/portfolio/industrial-design/garmin-descent/4.jpg",
      "/portfolio/industrial-design/garmin-descent/5.jpg",
      "/portfolio/industrial-design/garmin-descent/6.jpg",
      "/portfolio/industrial-design/garmin-descent/7.jpg",
      "/portfolio/industrial-design/garmin-descent/8.jpg",
      "/portfolio/industrial-design/garmin-descent/9.jpg",
      "/portfolio/industrial-design/garmin-descent/10.jpg",
      "/portfolio/industrial-design/garmin-descent/11.jpg",
    ]),
  },
  {
    slug: "sketch-gallery",
    title: "Sketch Gallery",
    subtitle: "Ideation & proccess",
    href: "/industrial-design/sketch-gallery",
    image: {
      src: "/portfolio/industrial-design/thumbnails/Sketch Gallery.jpg",
      alt: "Sketch Gallery thumbnail",
    },
    tone: "from-zinc-100 to-neutral-50",
    frames: createFrames("Sketch Gallery", [
      "/portfolio/industrial-design/sketch-gallery/1.jpg",
      "/portfolio/industrial-design/sketch-gallery/2.png",
      "/portfolio/industrial-design/sketch-gallery/3.png",
      "/portfolio/industrial-design/sketch-gallery/4.png",
      "/portfolio/industrial-design/sketch-gallery/5.jpg",
      "/portfolio/industrial-design/sketch-gallery/6.png",
      "/portfolio/industrial-design/sketch-gallery/7.jpg",
      "/portfolio/industrial-design/sketch-gallery/8.jpg",
      "/portfolio/industrial-design/sketch-gallery/9.jpg",
      "/portfolio/industrial-design/sketch-gallery/10.jpg",
      "/portfolio/industrial-design/sketch-gallery/11.jpg",
      "/portfolio/industrial-design/sketch-gallery/12.jpg",
      "/portfolio/industrial-design/sketch-gallery/13.jpg",
      "/portfolio/industrial-design/sketch-gallery/14.jpg",
      "/portfolio/industrial-design/sketch-gallery/15.jpg",
      "/portfolio/industrial-design/sketch-gallery/16.jpg",
      "/portfolio/industrial-design/sketch-gallery/17.jpg",
      "/portfolio/industrial-design/sketch-gallery/18.jpg",
      "/portfolio/industrial-design/sketch-gallery/19.jpg",
      "/portfolio/industrial-design/sketch-gallery/20.jpg",
      "/portfolio/industrial-design/sketch-gallery/21.jpg",
      "/portfolio/industrial-design/sketch-gallery/22.jpg",
      "/portfolio/industrial-design/sketch-gallery/23.jpeg",
      "/portfolio/industrial-design/sketch-gallery/24.jpg",
      "/portfolio/industrial-design/sketch-gallery/25.jpg",
      "/portfolio/industrial-design/sketch-gallery/26.jpg",
      "/portfolio/industrial-design/sketch-gallery/27.jpg",
      "/portfolio/industrial-design/sketch-gallery/28.jpg",
      "/portfolio/industrial-design/sketch-gallery/29.jpg",
      "/portfolio/industrial-design/sketch-gallery/30.jpg",
      "/portfolio/industrial-design/sketch-gallery/31.jpg",
      "/portfolio/industrial-design/sketch-gallery/32.jpg",
      "/portfolio/industrial-design/sketch-gallery/33.jpg",
      "/portfolio/industrial-design/sketch-gallery/34.jpg",
      "/portfolio/industrial-design/sketch-gallery/35.jpg",
      "/portfolio/industrial-design/sketch-gallery/38.jpg",
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
