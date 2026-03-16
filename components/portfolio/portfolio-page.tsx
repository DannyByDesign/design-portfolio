"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HomeHero } from "@/components/portfolio/hero/home-hero";
import { industrialProjects, type IndustrialProject } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

type PortfolioSection = "home" | "industrial-design" | "design-engineering" | "contact";

type DesignEngineeringProjectCard = {
  id: string;
  title: string;
  description: string;
  internalHref: string;
  image: {
    src: string;
    alt: string;
    tone: string;
  };
  externalHref?: string;
  githubHref?: string;
};

type DesignEngineeringTimelineRow = {
  id: string;
  leftCard: DesignEngineeringProjectCard;
  rightCard: DesignEngineeringProjectCard;
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

const designEngineeringTimelineRows: DesignEngineeringTimelineRow[] = [
  {
    id: "row-1",
    leftCard: {
      id: "workflow-automation-suite",
      title: "Workflow Automation Suite",
      description: "A collection of AI helpers that remove repetitive production and handoff tasks.",
      internalHref: "/design-engineering#workflow-automation-suite",
      externalHref: "https://example.com/workflow-automation-suite",
      githubHref: "https://github.com/example/workflow-automation-suite",
      image: {
        src: "/window.svg",
        alt: "Visualization for workflow automation suite project",
        tone: "from-zinc-100 via-stone-100 to-zinc-50",
      },
    },
    rightCard: {
      id: "ux-research-copilot",
      title: "UX Research Copilot",
      description: "A prompt-driven workspace for synthesis, tagging, and insight extraction from interviews.",
      internalHref: "/design-engineering#ux-research-copilot",
      externalHref: "https://example.com/ux-research-copilot",
      image: {
        src: "/globe.svg",
        alt: "Visualization for UX research copilot project",
        tone: "from-stone-100 via-zinc-100 to-neutral-50",
      },
    },
  },
  {
    id: "row-2",
    leftCard: {
      id: "rapid-prototype-lab",
      title: "Rapid Prototype Lab",
      description: "An AI-assisted prototyping flow used to validate interaction directions in hours.",
      internalHref: "/design-engineering#rapid-prototype-lab",
      image: {
        src: "/file.svg",
        alt: "Visualization for rapid prototype lab project",
        tone: "from-zinc-100 via-stone-100 to-zinc-50",
      },
    },
    rightCard: {
      id: "content-system-generator",
      title: "Content System Generator",
      description: "A pipeline that drafts and normalizes product content across feature surfaces.",
      internalHref: "/design-engineering#content-system-generator",
      externalHref: "https://example.com/content-system-generator",
      githubHref: "https://github.com/example/content-system-generator",
      image: {
        src: "/window.svg",
        alt: "Visualization for content system generator project",
        tone: "from-stone-100 via-zinc-100 to-zinc-50",
      },
    },
  },
  {
    id: "row-3",
    leftCard: {
      id: "delivery-readiness-tooling",
      title: "Delivery Readiness Tooling",
      description: "A quality gate utility that flags implementation risks before engineering handoff.",
      internalHref: "/design-engineering#delivery-readiness-tooling",
      externalHref: "https://example.com/delivery-readiness-tooling",
      image: {
        src: "/globe.svg",
        alt: "Visualization for delivery readiness tooling project",
        tone: "from-zinc-100 via-stone-100 to-neutral-50",
      },
    },
    rightCard: {
      id: "ai-support-console",
      title: "AI Support Console",
      description: "An internal operations interface that accelerates diagnosis and support workflows.",
      internalHref: "/design-engineering#ai-support-console",
      image: {
        src: "/file.svg",
        alt: "Visualization for AI support console project",
        tone: "from-stone-100 via-zinc-100 to-neutral-50",
      },
    },
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
                id="mobile-nav-trigger"
                aria-label="Open navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center text-stone-600/70 transition-colors hover:text-stone-600/90"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent id="mobile-nav-content" align="end" className="w-52 border-stone-600/10">
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

function IndustrialDesignSection({
  prefersReducedMotion,
  sectionRef,
}: {
  prefersReducedMotion: boolean | null;
  sectionRef?: RefObject<HTMLElement | null>;
}) {
  const reducedMotion = prefersReducedMotion ?? false;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

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

  const sectionViewport = isMobile
    ? { once: true, amount: 0.02 as const, margin: "0px 0px -8% 0px" }
    : { once: true, amount: 0.24 as const };

  const renderProjectCard = (project: IndustrialProject, mobile: boolean) => (
    <Link
      href={project.href}
      aria-label={`Open ${project.title} project`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600/30 focus-visible:ring-offset-2"
    >
      <Card className="group relative h-[300px] w-full max-w-full overflow-hidden rounded-none border-stone-600/10 bg-white p-0 md:h-[344px]">
        <div className="relative h-full w-full overflow-hidden bg-stone-100">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 768px) 48vw, 100vw"
            className={cn(
              "object-cover",
              !mobile &&
                "md:transition-transform md:duration-900 md:ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:scale-[1.14]",
            )}
          />
          {!mobile ? (
            <>
              <div className="absolute inset-0 bg-stone-600/5 md:transition-colors md:duration-500 md:group-hover:bg-stone-600/58" />
              <div className="absolute inset-0 hidden flex-col items-center justify-center px-6 text-center text-white md:flex md:opacity-0 md:transition-opacity md:duration-700 md:group-hover:opacity-100">
                <p className="text-[20px] leading-tight font-bold tracking-[-0.015em] md:text-[22px]">
                  {project.title}
                </p>
                <p className="mt-2 max-w-[20ch] text-[15px] leading-[1.35] text-white/88 md:text-[16px]">
                  {project.subtitle}
                </p>
              </div>
            </>
          ) : null}
        </div>
      </Card>
    </Link>
  );

  return (
    <motion.section
      ref={sectionRef}
      id="industrial-design"
      className="scroll-mt-20 pt-10 md:pt-14"
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
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
        className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-10"
        variants={cardGridVariants}
      >
        {industrialProjects.map((project) => (
          <motion.article key={project.title} variants={cardItemVariants}>
            {renderProjectCard(project, isMobile)}
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}

function DesignEngineeringSection({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  const reducedMotion = prefersReducedMotion ?? false;
  const router = useRouter();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [activeActionCardId, setActiveActionCardId] = useState<string | null>(null);
  const [activeActionKey, setActiveActionKey] = useState<string | null>(null);

  const renderDesignEngineeringCard = (project: DesignEngineeringProjectCard, mobile: boolean) => {
    const hasExternalLink = Boolean(project.externalHref);
    const hasGithubLink = Boolean(project.githubHref);
    const hasAnyAction = hasExternalLink || hasGithubLink;
    const isActionActive = activeActionCardId === project.id;
    const externalActionKey = `${project.id}:external`;
    const githubActionKey = `${project.id}:github`;
    const isExternalActive = activeActionKey === externalActionKey;
    const isGithubActive = activeActionKey === githubActionKey;

    return (
      <article
        role="link"
        tabIndex={0}
        aria-label={`Open ${project.title} project`}
        onClick={(event) => {
          const target = event.target as HTMLElement | null;
          if (target?.closest("[data-action-link='true']")) {
            return;
          }
          setActiveCardId(project.id);
          router.push(project.internalHref);
        }}
        onKeyDown={(event) => {
          const target = event.target as HTMLElement | null;
          if (target?.closest("[data-action-link='true']")) {
            return;
          }
          if (event.key !== "Enter" && event.key !== " ") {
            return;
          }
          event.preventDefault();
          setActiveCardId(project.id);
          router.push(project.internalHref);
        }}
        onFocus={(event) => {
          if (event.target === event.currentTarget) {
            setActiveCardId(project.id);
          }
        }}
        className={cn(
          "group relative h-[300px] w-full max-w-full cursor-pointer overflow-hidden rounded-none border border-stone-600/10 bg-white focus-visible:outline-none md:h-[344px] md:w-full",
          activeCardId === project.id && "ring-2 ring-stone-600/30 ring-offset-2",
          mobile ? "mx-0" : "",
        )}
      >
        <div
          className={cn(
            "group/image relative h-[194px] w-full overflow-hidden bg-gradient-to-br md:h-[224px]",
            project.image.tone,
          )}
        >
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 768px) 48vw, 256px"
            className={cn(
              "object-contain p-6 md:transition-transform md:duration-700 md:ease-[cubic-bezier(0.16,1,0.3,1)] md:p-7",
              !mobile && !isActionActive && "md:group-hover/image:scale-[1.06]",
            )}
          />
          <div className="absolute inset-0 bg-stone-600/7" />
        </div>

        <div className="relative grid h-[106px] grid-cols-[60%_40%] items-start px-3 pt-4 pb-2 md:h-[120px] md:px-3.5 md:pt-4.5 md:pb-2.5">
          <div className="min-w-0 self-start">
            <p className="text-[14px] leading-[1.18] font-semibold tracking-[-0.008em] text-stone-600/88 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden md:text-[16px]">
              {project.title}
            </p>
            <p className="mt-1.5 text-[12.5px] leading-[1.3] text-stone-600/70 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] overflow-hidden md:text-[13px]">
              {project.description}
            </p>
          </div>

          {hasAnyAction ? (
            <div
              className="relative z-20 flex h-full items-center justify-end gap-2.5 pr-1"
              onPointerLeave={() => {
                setActiveActionCardId((current) => (current === project.id ? null : current));
                setActiveActionKey((current) => (current?.startsWith(`${project.id}:`) ? null : current));
              }}
              onFocusCapture={() => setActiveActionCardId(project.id)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setActiveActionCardId((current) => (current === project.id ? null : current));
                  setActiveActionKey((current) => (current?.startsWith(`${project.id}:`) ? null : current));
                }
              }}
            >
              {hasExternalLink ? (
                <Link
                  href={project.externalHref as string}
                  target="_blank"
                  rel="noreferrer"
                  data-action-link="true"
                  className={cn(
                    "relative inline-flex h-9 w-9 items-center justify-center p-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600/30 focus-visible:ring-offset-1",
                    isExternalActive
                      ? "rounded-full bg-stone-500/20 text-stone-600/78"
                      : "rounded-full bg-transparent text-stone-600/68",
                    "active:rounded-full active:bg-stone-500/40 active:text-stone-600/85",
                  )}
                  aria-label={`Open external project link for ${project.title}`}
                  onPointerEnter={() => {
                    setActiveActionCardId(project.id);
                    setActiveActionKey(externalActionKey);
                  }}
                  onPointerLeave={() =>
                    setActiveActionKey((current) => (current === externalActionKey ? null : current))
                  }
                  onFocus={() => {
                    setActiveCardId((current) => (current === project.id ? null : current));
                    setActiveActionCardId(project.id);
                    setActiveActionKey(externalActionKey);
                  }}
                  onClick={(event) => {
                    setActiveCardId((current) => (current === project.id ? null : current));
                    event.stopPropagation();
                  }}
                >
                  <ArrowUpRight
                    className="relative z-10 size-5"
                    aria-hidden="true"
                  />
                </Link>
              ) : null}
              {hasGithubLink ? (
                <Link
                  href={project.githubHref as string}
                  target="_blank"
                  rel="noreferrer"
                  data-action-link="true"
                  className={cn(
                    "relative inline-flex h-9 w-9 items-center justify-center p-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600/30 focus-visible:ring-offset-1",
                    isGithubActive
                      ? "rounded-full bg-stone-500/20 text-stone-600/78"
                      : "rounded-full bg-transparent text-stone-600/68",
                    "active:rounded-full active:bg-stone-500/40 active:text-stone-600/85",
                  )}
                  aria-label={`Open GitHub repository for ${project.title}`}
                  onPointerEnter={() => {
                    setActiveActionCardId(project.id);
                    setActiveActionKey(githubActionKey);
                  }}
                  onPointerLeave={() =>
                    setActiveActionKey((current) => (current === githubActionKey ? null : current))
                  }
                  onFocus={() => {
                    setActiveCardId((current) => (current === project.id ? null : current));
                    setActiveActionCardId(project.id);
                    setActiveActionKey(githubActionKey);
                  }}
                  onClick={(event) => {
                    setActiveCardId((current) => (current === project.id ? null : current));
                    event.stopPropagation();
                  }}
                >
                  <Github
                    className="relative z-10 size-5"
                    aria-hidden="true"
                  />
                </Link>
              ) : null}
            </div>
          ) : (
            <div className="h-full" aria-hidden="true" />
          )}
        </div>

        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-0 hidden border border-transparent md:block",
            !isActionActive && "md:group-hover:border-stone-600/10",
          )}
        />
      </article>
    );
  };

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
      className="scroll-mt-20 pt-10 md:pt-14"
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

      <motion.div className="mt-10 w-full md:mt-12" variants={introVariants}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {designEngineeringTimelineRows.flatMap((row) => [
            <div key={`${row.id}-left`} className="md:justify-self-start">
              {renderDesignEngineeringCard(row.leftCard, false)}
            </div>,
            <div key={`${row.id}-right`} className="md:justify-self-end">
              {renderDesignEngineeringCard(row.rightCard, false)}
            </div>,
          ])}
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
      className="scroll-mt-20 min-h-[52vh] pt-10 pb-4 md:pt-14"
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
  const industrialSectionRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const programmaticTimerRef = useRef<number | null>(null);
  const activeSectionRef = useRef<PortfolioSection>("home");
  const pendingSectionRef = useRef<PortfolioSection | null>(null);
  const programmaticScrollRef = useRef(false);
  const [handoffScrollY, setHandoffScrollY] = useState(1);
  const { scrollY } = useScroll();
  // Shared choreography timeline:
  // - flatten starts immediately at scrollY=0
  // - flatten reaches 1 near industrial section handoff
  const heroFlattenProgress = useTransform(scrollY, [0, handoffScrollY], [0, 1]);
  const [activeSection, setActiveSection] = useState<PortfolioSection>(() =>
    sectionFromPath(pathname ?? "/"),
  );

  useEffect(() => {
    const measureHandoffTiming = () => {
      const industrialSection = industrialSectionRef.current;
      if (!industrialSection) {
        return;
      }

      const industrialTop = industrialSection.getBoundingClientRect().top + window.scrollY;
      // Match the previous industrial reveal anchor: section top reaching ~52% viewport height.
      const nextHandoff = Math.max(1, industrialTop - window.innerHeight * 0.52);
      setHandoffScrollY(nextHandoff);
    };

    measureHandoffTiming();
    const rafId = window.requestAnimationFrame(measureHandoffTiming);
    window.addEventListener("resize", measureHandoffTiming);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", measureHandoffTiming);
    };
  }, []);

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
        <HomeHero
          prefersReducedMotion={prefersReducedMotion}
          flattenProgress={heroFlattenProgress}
        />
        <IndustrialDesignSection
          prefersReducedMotion={prefersReducedMotion}
          sectionRef={industrialSectionRef}
        />
        <DesignEngineeringSection prefersReducedMotion={prefersReducedMotion} />

        <ContactSection prefersReducedMotion={prefersReducedMotion} />
      </main>
    </div>
  );
}
