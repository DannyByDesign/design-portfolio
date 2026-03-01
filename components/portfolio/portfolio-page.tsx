"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type PortfolioSection = "home" | "industrial-design" | "design-engineering";

type WorkSection = {
  slug: Exclude<PortfolioSection, "home">;
  label: string;
  term: string;
  pronunciation: string;
  definition: string;
  summary: string;
  details: string;
  image: {
    src: string;
    alt: string;
  };
  tags: string[];
};

type IndustrialProject = {
  title: string;
  subtitle: string;
  image: {
    src: string;
    alt: string;
  };
  tone: string;
};

type DefinitionSense = {
  index: number;
  text: string;
};

const sectionIds: PortfolioSection[] = ["home", "industrial-design", "design-engineering"];

const routeBySection: Record<PortfolioSection, string> = {
  home: "/",
  "industrial-design": "/industrial-design",
  "design-engineering": "/design-engineering",
};

const sectionByPath: Record<string, PortfolioSection> = {
  "/": "home",
  "/industrial-design": "industrial-design",
  "/design-engineering": "design-engineering",
};

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const heroDefinitionSenses: DefinitionSense[] = [
  {
    index: 1,
    text: "Treats constraints as material — shaping products that feel inevitable.",
  },
  {
    index: 2,
    text: "Knows when to respect limits, and when to push beyond them in service of the user.",
  },
  {
    index: 3,
    text: "Believes great designers build products, but exceptional teams redefine possibilities.",
  },
];

const industrialProjects: IndustrialProject[] = [
  {
    title: "Concept Mobility System",
    subtitle: "Speculative direction introducing a bold new interaction language.",
    image: { src: "/window.svg", alt: "Placeholder visual for concept mobility system" },
    tone: "from-zinc-100 to-zinc-50",
  },
  {
    title: "Adaptive Kitchen Tooling",
    subtitle: "Early concepts exploring ergonomics, grip confidence, and modular forms.",
    image: { src: "/globe.svg", alt: "Placeholder visual for adaptive kitchen tooling" },
    tone: "from-stone-100 to-zinc-50",
  },
  {
    title: "Wearable Utility Concept",
    subtitle: "Form studies focused on movement comfort and intuitive attachment points.",
    image: { src: "/file.svg", alt: "Placeholder visual for wearable utility concept" },
    tone: "from-zinc-100 to-neutral-50",
  },
  {
    title: "Consumer Device Program",
    subtitle: "Sketch-to-shelf pipeline from concept architecture to production intent.",
    image: { src: "/window.svg", alt: "Placeholder visual for consumer device program" },
    tone: "from-zinc-100 to-zinc-50",
  },
  {
    title: "Household Product Line",
    subtitle: "End-to-end development balancing manufacturing, cost, and usability.",
    image: { src: "/globe.svg", alt: "Placeholder visual for household product line" },
    tone: "from-stone-100 to-zinc-50",
  },
  {
    title: "Accessory System Design",
    subtitle: "Detail-driven execution from rough ideation to final production handoff.",
    image: { src: "/file.svg", alt: "Placeholder visual for accessory system design" },
    tone: "from-zinc-100 to-neutral-50",
  },
];

const workSections: WorkSection[] = [
  {
    slug: "design-engineering",
    label: "Design Engineering",
    term: "design engineering",
    pronunciation: "de-sign en-juh-neer-ing",
    definition:
      "noun. the integration of interface design with implementation to ship usable, performant digital systems.",
    summary:
      "Front-end systems built with careful interaction, accessibility, and maintainable architecture.",
    details:
      "Projects emphasize stable routing behavior, motion discipline, and production-friendly component foundations.",
    image: {
      src: "/globe.svg",
      alt: "Placeholder thumbnail for design engineering projects",
    },
    tags: ["Next.js", "Motion", "Systems"],
  },
];

function sectionFromPath(pathname: string): PortfolioSection {
  return sectionByPath[pathname] ?? "home";
}

type HeaderProps = {
  activeSection: PortfolioSection;
  onNavigateSection: (section: PortfolioSection) => void;
};

function Header({ activeSection, onNavigateSection }: HeaderProps) {
  const navItems: Array<{ section: PortfolioSection; label: string }> = [
    { section: "home", label: "Home" },
    { section: "industrial-design", label: "Industrial Design" },
    { section: "design-engineering", label: "Design Engineering" },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-black/5 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-full w-full max-w-[1040px] items-center justify-between px-6 md:px-8">
        <button
          type="button"
          className="text-[17px] font-medium tracking-tight text-black/80"
          onClick={() => onNavigateSection("home")}
          aria-label="Navigate to Home"
        >
          Danny Wang
        </button>

        <nav className="hidden items-center gap-5 md:flex lg:gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.section;

            return (
              <button
                key={item.section}
                type="button"
                onClick={() => onNavigateSection(item.section)}
                className={cn(
                  "group relative pb-[8px] text-[13px] font-normal transition-colors",
                  isActive ? "text-black/90" : "text-black/60 hover:text-black/90",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute right-0 -bottom-[7px] left-0 h-px origin-left bg-black/60 transition-transform duration-200",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                  aria-hidden="true"
                />
              </button>
            );
          })}

          <Link
            href="/about"
            className="pb-[8px] text-[13px] font-normal text-black/60 transition-colors hover:text-black/90"
          >
            About
          </Link>
        </nav>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation menu"
                className="inline-flex h-8 items-center justify-center text-black/65 transition-colors hover:text-black/90"
              >
                <Menu className="size-4" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 border-black/10">
              {navItems.map((item) => (
                <DropdownMenuItem
                  key={item.section}
                  onSelect={() => onNavigateSection(item.section)}
                  className={cn(
                    "text-[13px]",
                    activeSection === item.section ? "text-black/90" : "text-black/65",
                  )}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="text-[13px] text-black/65">
                <Link href="/about">About</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

function HeroDefinition({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  const reducedMotion = prefersReducedMotion ?? false;

  const heroItemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.62, ease: easeOut },
    },
  };

  const heroContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.12,
      },
    },
  };

  const senseListVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: reducedMotion ? 0 : 0.72,
        staggerChildren: reducedMotion ? 0 : 0.12,
      },
    },
  };

  const senseRowVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: easeOut },
    },
  };

  return (
    <motion.section
      id="home"
      className="scroll-mt-24 flex min-h-[calc(100vh-64px)] flex-col items-center pt-[96px] pb-10 text-center md:pt-[120px] md:pb-14"
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col items-center">
        <motion.h1
          className="font-serif text-[44px] leading-[1] font-semibold tracking-[-0.03em] text-black/95 md:text-[64px] md:leading-[0.95]"
          variants={heroItemVariants}
        >
          designer
        </motion.h1>
        <motion.p className="mt-[10px] text-[14px] tracking-normal text-black/50" variants={heroItemVariants}>
          /dəˈzīnər/
        </motion.p>
      </div>

      <motion.div className="mt-[28px]" variants={heroItemVariants}>
        <p className="text-[12px] uppercase tracking-[0.22em] text-black/55">
          ENTRY NO. 01 · NOUN · /DANNY WANG/
        </p>
      </motion.div>

      <div className="mt-10 w-full max-w-[820px]">
        <div className="h-px w-full bg-black/10" />
        <motion.ol
          className="mx-auto max-w-[760px] space-y-[24px] pb-8 pt-8 md:space-y-[26px] md:pb-10 md:pt-9"
          variants={senseListVariants}
          initial="hidden"
          animate="visible"
        >
          {heroDefinitionSenses.map((sense) => (
            <motion.li
              key={sense.index}
              className="mx-auto max-w-[66ch]"
              variants={senseRowVariants}
            >
              <p className="text-center text-[16px] leading-[1.65] font-normal text-black/55 md:text-[17px]">
                <span className="mr-3 inline-block font-normal tracking-[0.08em] md:mr-4">
                  {sense.index}
                </span>
                {sense.text}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </motion.section>
  );
}

function IndustrialDesignSection({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  const reducedMotion = prefersReducedMotion ?? false;

  const introVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: easeOut },
    },
  };

  const cardGridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.08,
      },
    },
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: easeOut },
    },
  };

  return (
    <motion.section
      id="industrial-design"
      className="scroll-mt-24 pt-2 md:pt-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.24 }}
    >
      <motion.p className="definition-kicker" variants={introVariants}>
        physical experiences
      </motion.p>
      <motion.h2
        className="mt-2 text-[2rem] leading-[1.12] font-[560] tracking-[-0.02em] md:text-[2.65rem]"
        variants={introVariants}
      >
        industrial design
      </motion.h2>
      <motion.p
        className="mt-4 max-w-[56ch] px-1 py-1 text-[16px] leading-[1.58] text-black/55"
        variants={introVariants}
      >
        I work on both conceptual projects that introduce bold ideas and sketch-to-shelf projects
        that showcase my end-to-end design capabilities.
      </motion.p>

      <motion.div
        className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-10 xl:grid-cols-3"
        variants={cardGridVariants}
      >
        {industrialProjects.map((project) => (
          <motion.article key={project.title} variants={cardItemVariants}>
            <Card className="group relative overflow-hidden rounded-none border-black/10 bg-white p-0">
              <div
                className={cn(
                  "relative aspect-[1/1] overflow-hidden bg-gradient-to-b",
                  project.tone,
                )}
              >
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 768px) 45vw, 100vw"
                  className="object-contain p-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:p-11 md:group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-black/5 transition-colors duration-500 md:group-hover:bg-black/45" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white opacity-100 transition-all duration-500 md:translate-y-2 md:p-6 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <p className="text-[15px] leading-tight font-medium tracking-[-0.01em]">
                    {project.title}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-[1.45] text-white/86">
                    {project.subtitle}
                  </p>
                </div>
              </div>
            </Card>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}

export function PortfolioPage() {
  const prefersReducedMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);
  const activeSectionRef = useRef<PortfolioSection>("home");
  const pendingSectionRef = useRef<PortfolioSection | null>(null);
  const programmaticScrollRef = useRef(false);
  const [activeSection, setActiveSection] = useState<PortfolioSection>(() =>
    typeof window === "undefined" ? "home" : sectionFromPath(window.location.pathname),
  );

  const syncPath = useCallback((section: PortfolioSection, mode: "push" | "replace") => {
    const nextPath = routeBySection[section];

    if (window.location.pathname === nextPath) {
      return;
    }

    if (mode === "push") {
      window.history.pushState({ section }, "", nextPath);
      return;
    }

    window.history.replaceState(window.history.state, "", nextPath);
  }, []);

  const goToSection = useCallback(
    (section: PortfolioSection, mode: "push" | "replace" | "none") => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = window.requestAnimationFrame(() => {
        const target = document.getElementById(section);

        if (!target) {
          return;
        }

        if (mode !== "none") {
          syncPath(section, mode);
        }

        programmaticScrollRef.current = true;
        pendingSectionRef.current = section;
        target.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
      });
    },
    [syncPath],
  );

  useEffect(() => {
    const initialSection = sectionFromPath(window.location.pathname);
    activeSectionRef.current = initialSection;
    goToSection(initialSection, "none");
  }, [goToSection]);

  useEffect(() => {
    const onPopState = () => {
      const section = sectionFromPath(window.location.pathname);
      setActiveSection(section);
      activeSectionRef.current = section;
      goToSection(section, "none");
    };

    window.addEventListener("popstate", onPopState);

    return () => window.removeEventListener("popstate", onPopState);
  }, [goToSection]);

  useEffect(() => {
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (!visible) {
          return;
        }

        const section = visible.target.id as PortfolioSection;

        if (programmaticScrollRef.current) {
          if (section === pendingSectionRef.current) {
            programmaticScrollRef.current = false;
            pendingSectionRef.current = null;
            activeSectionRef.current = section;
            setActiveSection(section);
          }
          return;
        }

        if (section === activeSectionRef.current) {
          return;
        }

        activeSectionRef.current = section;
        setActiveSection(section);
        syncPath(section, "replace");
      },
      {
        threshold: [0.35, 0.6, 0.85],
        rootMargin: "-15% 0px -45% 0px",
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [syncPath]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleSectionNav = useCallback(
    (section: PortfolioSection) => {
      setActiveSection(section);
      activeSectionRef.current = section;
      goToSection(section, "push");
    },
    [goToSection],
  );

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.58, ease: easeOut },
    },
  };

  const sectionVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  return (
    <div className="bg-white text-black">
      <Header activeSection={activeSection} onNavigateSection={handleSectionNav} />

      <main className="mx-auto flex w-full max-w-[1040px] flex-col gap-[56px] px-6 pb-24 md:gap-[72px] md:px-8 lg:gap-[88px]">
        <HeroDefinition prefersReducedMotion={prefersReducedMotion} />
        <IndustrialDesignSection prefersReducedMotion={prefersReducedMotion} />

        {workSections.map((section) => (
          <motion.section
            key={section.slug}
            id={section.slug}
            className="scroll-mt-24"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="space-y-6">
              <motion.p className="definition-kicker" variants={itemVariants}>
                {section.label}
              </motion.p>
              <motion.h2
                className="text-[2rem] leading-[1.12] font-[560] tracking-[-0.02em] md:text-[2.65rem]"
                variants={itemVariants}
              >
                {section.term}
              </motion.h2>
              <motion.p
                className="text-muted-foreground text-[0.86rem] uppercase"
                variants={itemVariants}
              >
                {section.pronunciation}
              </motion.p>
              <motion.p className="definition-line" variants={itemVariants}>
                {section.definition}
              </motion.p>
              <motion.p
                className="max-w-[70ch] text-[1.25rem] leading-[1.45] font-[540]"
                variants={itemVariants}
              >
                {section.summary}
              </motion.p>
              <motion.p className="paragraph-body" variants={itemVariants}>
                {section.details}
              </motion.p>

              <motion.figure
                className="ring-border relative mt-2 aspect-[16/9] w-full overflow-hidden bg-white ring-1"
                variants={itemVariants}
              >
                <Image
                  src={section.image.src}
                  alt={section.image.alt}
                  fill
                  sizes="(min-width: 1024px) 880px, 100vw"
                  className="object-contain p-12 opacity-80"
                />
              </motion.figure>

              <motion.div className="flex flex-wrap gap-2" variants={itemVariants}>
                {section.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto px-0 text-[0.95rem]"
                  onClick={() => handleSectionNav(section.slug)}
                >
                  Open section URL
                  <ArrowUpRight aria-hidden="true" />
                </Button>
              </motion.div>

              <motion.div className="hairline" variants={itemVariants} />
            </div>
          </motion.section>
        ))}
      </main>
    </div>
  );
}
