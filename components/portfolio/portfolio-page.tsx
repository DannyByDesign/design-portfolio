"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

const workSections: WorkSection[] = [
  {
    slug: "industrial-design",
    label: "Industrial Design",
    term: "industrial design",
    pronunciation: "in-du-stri-al de-sign",
    definition:
      "noun. the practice of shaping product form, utility, and material behavior into coherent objects.",
    summary:
      "Objects and systems explored through proportion, tactility, and manufacturing realism.",
    details:
      "Current studies cover concept-to-production workflows, from rough form discovery to refined prototype intent.",
    image: {
      src: "/window.svg",
      alt: "Placeholder thumbnail for industrial design projects",
    },
    tags: ["CMF", "Product Form", "Prototype"],
  },
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
          className="text-[13px] font-medium tracking-tight text-black/80"
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

  const definitionContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: reducedMotion ? 0 : 0.08,
        staggerChildren: reducedMotion ? 0 : 0.12,
      },
    },
  };

  const definitionRuleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.56, ease: easeOut },
    },
  };

  return (
    <motion.section
      id="home"
      className="scroll-mt-24 pt-[96px] md:pt-[120px]"
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="font-serif text-[44px] leading-[1] font-semibold tracking-[-0.03em] text-black/95 md:text-[64px] md:leading-[0.95]"
        variants={heroItemVariants}
      >
        designer
      </motion.h1>

      <motion.div variants={heroItemVariants}>
        <p className="mt-[10px] text-[14px] tracking-normal text-black/50">/dəˈzīnər/</p>
        <p className="mt-[28px] text-[12px] uppercase tracking-[0.22em] text-black/55">
          ENTRY NO. 01 · NOUN · /DANNY WANG/
        </p>
      </motion.div>

      <motion.div
        className="mt-10"
        variants={definitionContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="h-px w-full bg-black/10" variants={definitionRuleVariants} />
        {heroDefinitionSenses.map((sense) => (
          <motion.div
            key={sense.index}
            className="grid grid-cols-[30px_minmax(0,64ch)] gap-5 border-b border-black/5 py-5 md:py-6"
            variants={heroItemVariants}
          >
            <p className="pt-0.5 text-right text-[14px] font-medium text-black/55">{sense.index}</p>
            <p className="text-[18px] leading-[1.55] text-black/85">{sense.text}</p>
          </motion.div>
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

      <main className="mx-auto flex w-full max-w-[880px] flex-col gap-[96px] px-6 pb-24 md:gap-[116px] md:px-8 lg:gap-[136px]">
        <HeroDefinition prefersReducedMotion={prefersReducedMotion} />

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
