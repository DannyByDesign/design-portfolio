"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type HomeHeroProps = {
  prefersReducedMotion?: boolean | null;
  contactRightEdge?: number | null;
};

const HERO_DEFINITION_PARAGRAPHS = [
  "Someone who turns constraints into products that feel inevitable.",
  "They know when to respect limits, and when to push beyond boundaries in service of the end user.",
];

const HERO_SOCIAL_LABELS = ["LinkedIn", "Twitter/X", "Instagram"];

export function HomeHero({ prefersReducedMotion }: HomeHeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const reducedMotion = prefersReducedMotion ?? false;
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const lineProgress = useTransform(heroScrollProgress, [0.1, 0.28], [0, 1]);
  const lineOpacity = useTransform(heroScrollProgress, [0.1, 0.13, 0.28], [0, 0, 1]);
  const textOpacity = useTransform(heroScrollProgress, [0.24, 0.39], [0, 1]);
  const desktopLineScale = reducedMotion ? 1 : lineProgress;
  const desktopLineOpacity = reducedMotion ? 1 : lineOpacity;
  const desktopTextOpacity = reducedMotion ? 1 : textOpacity;

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero-home-root relative min-h-[calc(100vh-80px)] scroll-mt-24 pt-0 pb-10 md:pb-14"
    >
      <div className="relative min-h-[calc(100vh-80px)]">
        <div className="hero-main-column">
          <div className="hero-tilt-stage">
            <div className="hero-tilt-static">
              <div className="hero-descriptor-stack">
                <div className="hero-descriptor-row hero-entity-industrial">
                  <p className="hero-outline-word">industrial</p>
                  <span className="hero-filled-slash" aria-hidden="true">
                    {"\\"}
                  </span>
                  <span className="hero-axis-label">physical</span>
                </div>

                <div className="hero-descriptor-row hero-entity-product">
                  <p className="hero-outline-word">product</p>
                  <span className="hero-filled-slash" aria-hidden="true">
                    {"\\"}
                  </span>
                  <span className="hero-axis-label">digital</span>
                </div>

                <div className="hero-descriptor-row hero-entity-experiential">
                  <p className="hero-outline-word">experiential</p>
                  <span className="hero-filled-slash" aria-hidden="true">
                    {"\\"}
                  </span>
                  <span className="hero-axis-label">emotional</span>
                </div>
              </div>

              <h1 className="hero-designer-word mt-2">designer</h1>
              <p className="hero-pronunciation-line mt-[24px]">
                /də&apos;zīnər/
                <span className="mx-2 font-semibold text-stone-600/74">•</span>
                <span className="font-semibold text-stone-600/92">noun.</span>
              </p>

              <div className="hero-definition-block hero-definition-block-static mt-[56px] md:hidden">
                <p className="hero-definition-line hero-definition-line-single">
                  {HERO_DEFINITION_PARAGRAPHS[0]}
                </p>
                <p className="hero-definition-line mt-4">{HERO_DEFINITION_PARAGRAPHS[1]}</p>
              </div>

              <motion.div
                className="hero-definition-block hero-definition-block-animated mt-[56px] hidden md:block"
              >
                <motion.div
                  aria-hidden="true"
                  className="hero-definition-line-animated"
                  style={{ scaleY: desktopLineScale, opacity: desktopLineOpacity }}
                />
                <motion.div
                  className="hero-definition-copy"
                  style={{ opacity: desktopTextOpacity }}
                >
                  <p className="hero-definition-line hero-definition-line-single">
                    {HERO_DEFINITION_PARAGRAPHS[0]}
                  </p>
                  <p className="hero-definition-line mt-4">{HERO_DEFINITION_PARAGRAPHS[1]}</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <aside className="hero-right-rail hidden md:block">
          <div className="hero-name-rail">
            <p className="hero-rail-name">Danny</p>
            <p className="hero-rail-name">Wang</p>
            <span aria-hidden="true" className="hero-accent-bar" />
          </div>

          <div className="hero-social-stack mt-9 space-y-1.5">
            {HERO_SOCIAL_LABELS.map((label) => (
              <p key={label} className="hero-social-link">
                {label}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
