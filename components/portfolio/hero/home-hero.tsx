"use client";

type HomeHeroProps = {
  prefersReducedMotion?: boolean | null;
  contactRightEdge?: number | null;
};

const HERO_DEFINITION_PARAGRAPHS = [
  "Someone who turns constraints into products that feel inevitable.",
  "They know when to respect limits, and when to push beyond boundaries in service of the end user.",
];

const HERO_SOCIAL_LABELS = ["LinkedIn", "Twitter/X", "Instagram"];

export function HomeHero({}: HomeHeroProps) {
  return (
    <section
      id="home"
      className="hero-home-root scroll-mt-24 relative min-h-[calc(100vh-80px)] pt-0 pb-10 md:pb-14"
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

              <div className="hero-definition-block mt-[56px]">
                <p className="hero-definition-line hero-definition-line-single">{HERO_DEFINITION_PARAGRAPHS[0]}</p>
                <p className="hero-definition-line mt-4">{HERO_DEFINITION_PARAGRAPHS[1]}</p>
              </div>
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

      <div className="mt-10 flex items-center gap-6 text-[12px] text-stone-600/72 md:hidden">
        {HERO_SOCIAL_LABELS.map((label) => (
          <p key={label}>{label}</p>
        ))}
      </div>
    </section>
  );
}
