"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Menu, Sparkles } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type PortfolioSection = "home" | "industrial-design" | "design-engineering" | "contact";

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

type AiTimelineEntry = {
  title: string;
  detail: string;
};

const sectionIds: PortfolioSection[] = ["home", "industrial-design", "design-engineering", "contact"];

const routeBySection: Record<PortfolioSection, string> = {
  home: "/",
  "industrial-design": "/industrial-design",
  "design-engineering": "/design-engineering",
  contact: "/contact",
};

const sectionByPath: Record<string, PortfolioSection> = {
  "/": "home",
  "/industrial-design": "industrial-design",
  "/design-engineering": "design-engineering",
  "/contact": "contact",
};

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const heroDefinitionSenses: DefinitionSense[] = [
  {
    index: 1,
    text: "Treats constraints as material and shapes products that feel inevitable.",
  },
  {
    index: 2,
    text: "Knows when to respect limits, and when to push beyond them in service of the user.",
  },
  {
    index: 3,
    text: "Believes exceptional teams can create and redefine possibilities.",
  },
];

const industrialProjects: IndustrialProject[] = [
  {
    title: "Concept Mobility System",
    subtitle: "Bold interaction concept.",
    image: { src: "/window.svg", alt: "Placeholder visual for concept mobility system" },
    tone: "from-zinc-100 to-zinc-50",
  },
  {
    title: "Adaptive Kitchen Tooling",
    subtitle: "Ergonomic modular studies.",
    image: { src: "/globe.svg", alt: "Placeholder visual for adaptive kitchen tooling" },
    tone: "from-stone-100 to-zinc-50",
  },
  {
    title: "Wearable Utility Concept",
    subtitle: "Comfort-first form studies.",
    image: { src: "/file.svg", alt: "Placeholder visual for wearable utility concept" },
    tone: "from-zinc-100 to-neutral-50",
  },
  {
    title: "Consumer Device Program",
    subtitle: "Sketch-to-shelf execution.",
    image: { src: "/window.svg", alt: "Placeholder visual for consumer device program" },
    tone: "from-zinc-100 to-zinc-50",
  },
  {
    title: "Household Product Line",
    subtitle: "Manufacturing-ready product line.",
    image: { src: "/globe.svg", alt: "Placeholder visual for household product line" },
    tone: "from-stone-100 to-zinc-50",
  },
  {
    title: "Accessory System Design",
    subtitle: "Detail-led production handoff.",
    image: { src: "/file.svg", alt: "Placeholder visual for accessory system design" },
    tone: "from-zinc-100 to-neutral-50",
  },
];

const aiTimelineEntries: AiTimelineEntry[] = [
  {
    title: "Workflow Automation",
    detail: "I build AI tools that remove repetitive work and keep project momentum high.",
  },
  {
    title: "Rapid Prototyping",
    detail: "From idea to interactive proof, I use AI to test directions and validate decisions fast.",
  },
  {
    title: "Production Delivery",
    detail: "I translate AI-assisted concepts into practical applications teams can adopt and scale.",
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
    { section: "contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-30 h-20 border-b border-stone-600/5 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-full w-full max-w-[1040px] items-center justify-between px-6 md:px-8">
        <button
          type="button"
          className="text-[17px] font-medium tracking-tight text-stone-600/80"
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
                  "group relative pb-[6px] text-[13px] font-normal transition-colors",
                  isActive ? "text-stone-600/90" : "text-stone-600/60 hover:text-stone-600/90",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute right-0 -bottom-[3px] left-0 h-px origin-left bg-stone-600/60 transition-transform duration-200",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </nav>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center text-stone-600/70 transition-colors hover:text-stone-600/90"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 border-stone-600/10">
              {navItems.map((item) => (
                <DropdownMenuItem
                  key={item.section}
                  onSelect={() => onNavigateSection(item.section)}
                  className={cn(
                    "text-[13px]",
                    activeSection === item.section ? "text-stone-600/90" : "text-stone-600/65",
                  )}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
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
        delayChildren: reducedMotion ? 0 : 0.9,
        staggerChildren: reducedMotion ? 0 : 0.11,
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
      className="scroll-mt-24 relative flex min-h-[calc(100vh-80px)] flex-col items-center pt-[96px] pb-10 text-center md:pt-[120px] md:pb-14"
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 inset-y-0">
        <span className="absolute inset-y-8 left-0 w-px bg-stone-600/10 md:inset-y-10" />
        <span className="absolute inset-y-8 right-0 w-px bg-stone-600/10 md:inset-y-10" />
      </div>

      <div className="flex flex-col items-center">
        <motion.h1
          className="font-serif text-[44px] leading-[1] font-semibold tracking-[-0.03em] text-stone-600/95 md:text-[64px] md:leading-[0.95]"
          variants={heroItemVariants}
        >
          designer
        </motion.h1>
        <motion.p className="mt-[10px] text-[14px] tracking-normal text-stone-600/50" variants={heroItemVariants}>
          /dəˈzīnər/
        </motion.p>
      </div>

      <motion.div className="mt-[28px]" variants={heroItemVariants}>
        <p className="text-[12px] uppercase tracking-[0.22em] text-stone-600/55">
          SAN FRANCISCO · REMOTE · /DANNY WANG/
        </p>
      </motion.div>

      <div className="mt-10 w-full max-w-[820px]">
        <div className="h-px w-full bg-stone-600/10" />
        <motion.div
          className="mx-auto mt-6 w-full max-w-[720px] px-1 pb-8 pl-8 text-left md:mt-8 md:pb-10 md:pl-[44px]"
          variants={senseListVariants}
          initial="hidden"
          animate="visible"
        >
          {heroDefinitionSenses.map((sense, index) => (
            <Fragment key={sense.index}>
              <motion.div
                className="grid grid-cols-[28px_1fr] items-baseline gap-x-[18px] py-2 text-left md:gap-x-5"
                variants={senseRowVariants}
              >
                <span className="text-[16px] leading-[1.7] font-normal text-stone-600/38 tabular-nums md:text-[17px]">
                  {sense.index}
                </span>
                <p className="max-w-[66ch] text-[16px] leading-[1.7] font-normal text-stone-600/78 md:text-[17px]">
                  {sense.text}
                </p>
              </motion.div>
              {index < heroDefinitionSenses.length - 1 ? (
                <motion.div
                  className="my-4 ml-[46px] w-[80%] border-t border-stone-600/5 md:my-5 md:ml-[48px]"
                  variants={senseRowVariants}
                />
              ) : null}
            </Fragment>
          ))}
        </motion.div>
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
      className="scroll-mt-24 pt-14 md:pt-20"
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
        className="mt-4 max-w-[42ch] px-1 py-1 text-[16px] leading-[1.58] text-stone-600/55 md:max-w-[46ch]"
        variants={introVariants}
      >
        I design both concept explorations and production-ready products, from early form studies
        to manufacturing handoff.
      </motion.p>

      <motion.div
        className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-10 xl:grid-cols-3"
        variants={cardGridVariants}
      >
        {industrialProjects.map((project) => (
          <motion.article key={project.title} variants={cardItemVariants}>
            <Card className="group relative overflow-hidden rounded-none border-stone-600/10 bg-white p-0">
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
                  className="object-contain p-10 transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] md:p-11 md:group-hover:scale-[1.14]"
                />
                <div className="absolute inset-0 bg-stone-600/5 transition-colors duration-500 md:group-hover:bg-stone-600/58" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white opacity-100 transition-opacity duration-700 md:opacity-0 md:group-hover:opacity-100">
                  <p className="text-[17px] leading-tight font-bold tracking-[-0.01em]">
                    {project.title}
                  </p>
                  <p className="mt-2 max-w-[18ch] text-[14px] leading-[1.3] text-white/88">
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

function DesignEngineeringSection({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  const reducedMotion = prefersReducedMotion ?? false;
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 92%", "end 20%"],
  });
  const timelineProgress = scrollYProgress;
  const lineFillScale = useTransform(timelineProgress, [0.06, 0.62], [0, 1]);
  const nodeOneFill = useTransform(lineFillScale, [0.04, 0.16], [0, 1]);
  const nodeTwoFill = useTransform(lineFillScale, [0.5, 0.64], [0, 1]);
  const nodeThreeFillRaw = useTransform(lineFillScale, [0.97, 1], [0, 1]);
  const nodeThreeFill = useTransform(nodeThreeFillRaw, (value) => value ** 3);
  const nodeFillStates = [nodeOneFill, nodeTwoFill, nodeThreeFill];

  const introVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: easeOut },
    },
  };

  return (
    <motion.section
      id="design-engineering"
      className="scroll-mt-24 pt-14 md:pt-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.24 }}
    >
      <motion.p className="definition-kicker" variants={introVariants}>
        AI-enabled problem solving
      </motion.p>
      <motion.h2
        className="mt-2 text-[2rem] leading-[1.12] font-[560] tracking-[-0.02em] md:text-[2.65rem]"
        variants={introVariants}
      >
        design engineering
      </motion.h2>
      <motion.p
        className="mt-4 max-w-[42ch] px-1 py-1 text-[16px] leading-[1.58] text-stone-600/55 md:max-w-[46ch]"
        variants={introVariants}
      >
        I build tools and applications with AI to remove friction from my workflow and accelerate
        real-world problem solving.
      </motion.p>

      <motion.div
        ref={timelineRef}
        className="relative mt-10 w-full max-w-[980px] py-4 md:mt-12 md:py-5"
        variants={introVariants}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-[58px] left-[17px] w-px bg-stone-600/14 md:inset-y-[72px] md:left-1/2 md:-translate-x-1/2"
        />
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-[58px] left-[17px] w-[2px] origin-top bg-[#f25c2a] md:inset-y-[72px] md:left-1/2 md:-translate-x-1/2"
          style={{ scaleY: lineFillScale }}
        />

        <div className="space-y-[5.5rem] md:space-y-[7.5rem]">
          {aiTimelineEntries.map((entry, index) => {
            const isLeftCard = index % 2 === 0;
            const nodeFill = nodeFillStates[index];

            return (
              <div
                key={entry.title}
                className="grid grid-cols-[34px_1fr] items-center gap-x-5 md:grid-cols-[1fr_auto_1fr] md:gap-x-10"
              >
                <div
                  className={cn(
                    "hidden rounded-none border border-stone-600/10 bg-stone-50/60 p-5 md:block md:max-w-[33ch] md:p-6",
                    isLeftCard ? "md:col-start-1 md:justify-self-end md:text-right" : "md:col-start-3",
                  )}
                >
                  <p className="text-[18px] leading-tight font-semibold text-stone-600/88">{entry.title}</p>
                  <p className="mt-2 text-[14px] leading-[1.5] text-stone-600/66">{entry.detail}</p>
                </div>

                <div className="relative z-10 col-start-1 row-start-1 md:col-start-2 md:justify-self-center">
                  <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-stone-600/22 bg-white shadow-[0_0_0_6px_rgba(250,250,249,0.95)] md:h-11 md:w-11">
                    <motion.span className="absolute inset-0 rounded-full bg-[#f25c2a]" style={{ scale: nodeFill }} />
                    <Sparkles className="relative z-10 size-[15px] text-stone-600/55 md:size-[17px]" />
                    <motion.span
                      className="absolute inset-0 z-20 flex items-center justify-center"
                      style={{ opacity: nodeFill }}
                    >
                      <Sparkles className="size-[15px] text-white md:size-[17px]" />
                    </motion.span>
                  </div>
                </div>

                <div className="col-start-2 row-start-1 rounded-none border border-stone-600/10 bg-stone-50/60 p-4 md:hidden">
                  <p className="text-[16px] leading-tight font-semibold text-stone-600/88">{entry.title}</p>
                  <p className="mt-1.5 text-[13px] leading-[1.45] text-stone-600/66">{entry.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.section>
  );
}

function ContactSection({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  const reducedMotion = prefersReducedMotion ?? false;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: easeOut },
    },
  };

  return (
    <motion.section
      id="contact"
      className="scroll-mt-24 min-h-[52vh] pt-14 pb-4 md:pt-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.p className="definition-kicker" variants={itemVariants}>
        contact
      </motion.p>
      <motion.h2
        className="mt-2 text-[2rem] leading-[1.12] font-[560] tracking-[-0.02em] md:text-[2.65rem]"
        variants={itemVariants}
      >
        Let&apos;s build something meaningful.
      </motion.h2>
      <motion.p className="mt-4 max-w-[64ch] text-[1.05rem] leading-[1.62] text-stone-600/65" variants={itemVariants}>
        I&apos;m open to internships, full-time roles, and collaborative projects across industrial
        design and product engineering.
      </motion.p>
      <motion.p className="mt-5 text-[0.95rem] text-stone-600/70" variants={itemVariants}>
        Email: dannywang.design@gmail.com
      </motion.p>
      <motion.div className="mt-8 h-px w-full bg-stone-600/8" variants={itemVariants} />
    </motion.section>
  );
}

export function PortfolioPage() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);
  const programmaticTimerRef = useRef<number | null>(null);
  const activeSectionRef = useRef<PortfolioSection>("home");
  const pendingSectionRef = useRef<PortfolioSection | null>(null);
  const programmaticScrollRef = useRef(false);
  const [activeSection, setActiveSection] = useState<PortfolioSection>(() =>
    sectionFromPath(pathname ?? "/"),
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

        if (programmaticTimerRef.current !== null) {
          window.clearTimeout(programmaticTimerRef.current);
        }

        // Failsafe: never leave the observer in permanent programmatic mode.
        programmaticTimerRef.current = window.setTimeout(() => {
          programmaticScrollRef.current = false;
          pendingSectionRef.current = null;
          programmaticTimerRef.current = null;
        }, 900);

        target.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
      });
    },
    [syncPath],
  );

  useEffect(() => {
    const initialSection = sectionFromPath(pathname ?? "/");
    activeSectionRef.current = initialSection;
    goToSection(initialSection, "none");
  }, [goToSection, pathname]);

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

    const sectionRatios = new Map<PortfolioSection, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target.id as PortfolioSection;
          if (entry.isIntersecting) {
            sectionRatios.set(section, entry.intersectionRatio);
            return;
          }
          sectionRatios.delete(section);
        });

        const nextVisible = [...sectionRatios.entries()].sort((a, b) => b[1] - a[1])[0];

        if (!nextVisible) {
          return;
        }

        let [section] = nextVisible;

        // Ensure the last section can become active near page bottom.
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
          section = "contact";
        }

        if (programmaticScrollRef.current) {
          if (section === pendingSectionRef.current) {
            programmaticScrollRef.current = false;
            pendingSectionRef.current = null;
            if (programmaticTimerRef.current !== null) {
              window.clearTimeout(programmaticTimerRef.current);
              programmaticTimerRef.current = null;
            }
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
        threshold: [0, 0.2, 0.4, 0.6],
        rootMargin: "-15% 0px -20% 0px",
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
      if (programmaticTimerRef.current !== null) {
        window.clearTimeout(programmaticTimerRef.current);
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

  return (
    <div className="bg-white text-stone-600">
      <Header activeSection={activeSection} onNavigateSection={handleSectionNav} />

      <main className="mx-auto flex w-full max-w-[1040px] flex-col gap-[56px] px-6 pb-40 md:gap-[72px] md:px-8 md:pb-48 lg:gap-[88px]">
        <HeroDefinition prefersReducedMotion={prefersReducedMotion} />
        <IndustrialDesignSection prefersReducedMotion={prefersReducedMotion} />
        <DesignEngineeringSection prefersReducedMotion={prefersReducedMotion} />

        <ContactSection prefersReducedMotion={prefersReducedMotion} />
      </main>
    </div>
  );
}
