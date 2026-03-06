"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type HomeHeroProps = {
  prefersReducedMotion?: boolean | null;
  flattenProgress?: MotionValue<number>;
  contactRightEdge?: number | null;
};

const HERO_DEFINITION_PARAGRAPHS = [
  "Someone who turns constraints into products that feel inevitable.",
  "They know when to respect limits, and when to push beyond boundaries in service of the end user.",
];

const HERO_SOCIAL_LABELS = ["LinkedIn", "Twitter/X", "Instagram"];

export function HomeHero({ prefersReducedMotion, flattenProgress }: HomeHeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const reducedMotion = prefersReducedMotion ?? false;
  const fallbackFlattenProgress = useMotionValue(0);
  const flattenSource = flattenProgress ?? fallbackFlattenProgress;
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const flattenRotateY = useTransform(flattenSource, [0, 0.86], [17, 0]);
  const flattenPerspective = useTransform(flattenSource, [0, 1], [1050, 22000]);

  const lineProgress = useTransform(heroScrollProgress, [0.05, 0.14], [0, 1]);
  const lineOpacity = useTransform(heroScrollProgress, [0.05, 0.07, 0.14], [0, 0, 1]);
  const textOpacity = useTransform(heroScrollProgress, [0.11, 0.2], [0, 1]);
  const pronunciationOpacity = useTransform(heroScrollProgress, [0.05, 0.11], [0, 1]);
  const pronunciationY = useTransform(heroScrollProgress, [0.05, 0.11], [10, 0]);
  // Early hero-intro choreography:
  // 1) axis labels dissolve into slashes, 2) descriptor rows collapse into designer.
  // Use the same flatten timeline so this starts immediately with the first scroll movement.
  const axisLabelX = useTransform(flattenSource, [0, 0.05], [0, -16]);
  const axisLabelOpacity = useTransform(flattenSource, [0, 0.045], [1, 0]);
  const descriptorRowOpacity = useTransform(flattenSource, [0.06, 0.19], [1, 0]);
  const descriptorRowScale = useTransform(flattenSource, [0.06, 0.19], [1, 0.986]);
  const industrialRowY = useTransform(flattenSource, [0.06, 0.19], [0, 176]);
  const productRowY = useTransform(flattenSource, [0.06, 0.19], [0, 88]);
  const experientialRowY = useTransform(flattenSource, [0.06, 0.19], [0, 10]);
  const desktopLineScale = reducedMotion ? 1 : lineProgress;
  const desktopLineOpacity = reducedMotion ? 1 : lineOpacity;
  const desktopTextOpacity = reducedMotion ? 1 : textOpacity;
  const desktopPronunciationOpacity = reducedMotion ? 1 : pronunciationOpacity;
  const desktopPronunciationY = reducedMotion ? 0 : pronunciationY;
  const shouldAnimateFlatten = isDesktop && !reducedMotion;
  const shouldAnimateDescriptorCollapse = isDesktop && !reducedMotion;

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);
    update();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero-home-root relative min-h-[calc(100vh-80px)] scroll-mt-24 pt-0 pb-10 md:pb-14"
    >
      <div className="relative min-h-[calc(100vh-80px)]">
        <div className="hero-main-column">
          <motion.div
            className="hero-tilt-stage"
            style={shouldAnimateFlatten ? { perspective: flattenPerspective } : undefined}
          >
            <motion.div
              className="hero-tilt-static"
              style={shouldAnimateFlatten ? { rotateY: flattenRotateY } : undefined}
            >
              <div className="hero-descriptor-stack hero-descriptor-stack-layer">
                <motion.div
                  className="hero-descriptor-row hero-entity-industrial"
                  style={
                    shouldAnimateDescriptorCollapse
                      ? {
                          y: industrialRowY,
                          opacity: descriptorRowOpacity,
                          scale: descriptorRowScale,
                        }
                      : undefined
                  }
                >
                  <p className="hero-outline-word">industrial</p>
                  <span className="hero-filled-slash" aria-hidden="true">
                    {"\\"}
                  </span>
                  <motion.span
                    className="hero-axis-label"
                    style={
                      shouldAnimateDescriptorCollapse
                        ? {
                            x: axisLabelX,
                            opacity: axisLabelOpacity,
                          }
                        : undefined
                    }
                  >
                    physical
                  </motion.span>
                </motion.div>

                <motion.div
                  className="hero-descriptor-row hero-entity-product"
                  style={
                    shouldAnimateDescriptorCollapse
                      ? {
                          y: productRowY,
                          opacity: descriptorRowOpacity,
                          scale: descriptorRowScale,
                        }
                      : undefined
                  }
                >
                  <p className="hero-outline-word">product</p>
                  <span className="hero-filled-slash" aria-hidden="true">
                    {"\\"}
                  </span>
                  <motion.span
                    className="hero-axis-label"
                    style={
                      shouldAnimateDescriptorCollapse
                        ? {
                            x: axisLabelX,
                            opacity: axisLabelOpacity,
                          }
                        : undefined
                    }
                  >
                    digital
                  </motion.span>
                </motion.div>

                <motion.div
                  className="hero-descriptor-row hero-entity-experiential"
                  style={
                    shouldAnimateDescriptorCollapse
                      ? {
                          y: experientialRowY,
                          opacity: descriptorRowOpacity,
                          scale: descriptorRowScale,
                        }
                      : undefined
                  }
                >
                  <p className="hero-outline-word">experiential</p>
                  <span className="hero-filled-slash" aria-hidden="true">
                    {"\\"}
                  </span>
                  <motion.span
                    className="hero-axis-label"
                    style={
                      shouldAnimateDescriptorCollapse
                        ? {
                            x: axisLabelX,
                            opacity: axisLabelOpacity,
                          }
                        : undefined
                    }
                  >
                    emotional
                  </motion.span>
                </motion.div>
              </div>

              <h1 className="hero-designer-word hero-designer-layer mt-2">designer</h1>
              <div>
                <p className="hero-pronunciation-line mt-[24px] md:hidden">
                  /də&apos;zīnər/
                  <span className="mx-2 font-semibold text-stone-600/74">•</span>
                  <span className="font-semibold text-stone-600/92">noun.</span>
                </p>
                <motion.p
                  className="hero-pronunciation-line hero-pronunciation-line-animated mt-[24px] hidden md:block"
                  style={
                    shouldAnimateDescriptorCollapse
                      ? { opacity: desktopPronunciationOpacity, y: desktopPronunciationY }
                      : undefined
                  }
                >
                  /də&apos;zīnər/
                  <span className="mx-2 font-semibold text-stone-600/74">•</span>
                  <span className="font-semibold text-stone-600/92">noun.</span>
                </motion.p>
              </div>

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
            </motion.div>
          </motion.div>
        </div>

        <div className="hero-right-rail-track hidden md:block">
          <aside className="hero-right-rail">
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
      </div>
    </section>
  );
}
