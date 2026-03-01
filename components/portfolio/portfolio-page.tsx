"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

export function PortfolioPage() {
  const prefersReducedMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);
  const activeSectionRef = useRef<PortfolioSection>("home");
  const pendingSectionRef = useRef<PortfolioSection | null>(null);
  const programmaticScrollRef = useRef(false);

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
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    },
    [prefersReducedMotion, syncPath],
  );

  useEffect(() => {
    const initialSection = sectionFromPath(window.location.pathname);
    goToSection(initialSection, "none");
  }, [goToSection]);

  useEffect(() => {
    const onPopState = () => {
      const section = sectionFromPath(window.location.pathname);
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
          }
          return;
        }

        if (section === activeSectionRef.current) {
          return;
        }

        activeSectionRef.current = section;
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
    <div className="bg-background text-foreground">
      <header className="border-border bg-background/95 sticky top-0 z-20 border-b backdrop-blur-[1px]">
        <div className="mx-auto flex w-full max-w-[880px] items-center justify-between px-5 py-4 md:px-8">
          <Button
            variant="link"
            size="sm"
            className="h-auto px-0 text-[0.95rem] font-medium tracking-[-0.01em]"
            onClick={() => handleSectionNav("home")}
          >
            Danny Wang
          </Button>
          <nav className="flex items-center gap-6">
            <Button
              variant="link"
              size="sm"
              className="h-auto px-0 text-[0.95rem] font-medium tracking-[-0.01em]"
              onClick={() => handleSectionNav("industrial-design")}
            >
              Industrial Design
            </Button>
            <Button
              variant="link"
              size="sm"
              className="h-auto px-0 text-[0.95rem] font-medium tracking-[-0.01em]"
              onClick={() => handleSectionNav("design-engineering")}
            >
              Design Engineering
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[880px] flex-col gap-[96px] px-5 pt-[88px] pb-24 md:gap-[116px] md:px-8 md:pt-[104px] lg:gap-[136px] lg:pt-[120px]">
        <motion.section
          id="home"
          className="scroll-mt-24"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.65 }}
        >
          <div className="space-y-6">
            <motion.p className="definition-kicker" variants={itemVariants}>
              portfolio
            </motion.p>
            <motion.h1
              className="text-[2.4rem] leading-[1.08] font-[560] tracking-[-0.02em] md:text-[2.85rem] lg:text-[3.5rem]"
              variants={itemVariants}
            >
              Danny Wang
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-[1.125rem] leading-[1.5] font-[500] md:text-[1.25rem]"
              variants={itemVariants}
            >
              Designer
            </motion.p>
            <motion.p className="definition-line" variants={itemVariants}>
              noun. a multidisciplinary maker translating intent into products, systems, and
              measurable user outcomes.
            </motion.p>
            <motion.p
              className="max-w-[68ch] text-[1.35rem] leading-[1.42] font-[560] tracking-[-0.02em] md:text-[1.5rem]"
              variants={itemVariants}
            >
              My goal is to craft work that feels inevitable: clear in purpose, quiet in form, and
              durable in use.
            </motion.p>
            <motion.p className="paragraph-body" variants={itemVariants}>
              This portfolio combines industrial design and design engineering in one continuous
              reading flow, with direct section deep links and restrained motion.
            </motion.p>
            <motion.div className="hairline" variants={itemVariants} />
          </div>
        </motion.section>

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
