import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ProjectPageHeader } from "@/components/portfolio/project-page-header";
import { ProjectRouteLink } from "@/components/portfolio/project-route-link";
import { ViewportVideo } from "@/components/portfolio/viewport-video";
import type { PortfolioProjectFrame } from "@/lib/portfolio-data";

/* eslint-disable @next/next/no-img-element */
type ProjectLink = {
  href: string;
  title: string;
};

type ProjectDetailPageProps = {
  project: {
    title: string;
    frames: PortfolioProjectFrame[];
  };
  siblings: {
    previous: ProjectLink;
    next: ProjectLink;
  };
  isFirstProject: boolean;
  isLastProject: boolean;
};

export function ProjectDetailPage({
  project,
  siblings,
  isFirstProject,
  isLastProject,
}: ProjectDetailPageProps) {
  return (
    <div className="min-h-screen bg-white text-stone-600">
      <ProjectPageHeader />

      <main className="pb-28 md:pb-32">
        <section
          aria-label={`${project.title} gallery`}
          className="mx-auto w-full max-w-[1040px] px-6 pt-20 pb-20 md:px-8 md:pt-28 md:pb-24"
        >
          {project.frames.map((frame) => (
            <figure key={frame.id} className="w-full overflow-hidden bg-stone-50">
              {frame.mediaType === "video" ? (
                <ViewportVideo
                  className="block h-auto w-full"
                  src={frame.src}
                  poster={frame.poster}
                  width={frame.width}
                  height={frame.height}
                  preload={frame.preload}
                />
              ) : (
                <img
                  src={frame.src}
                  alt={frame.alt}
                  width={frame.width}
                  height={frame.height}
                  loading={frame.loading}
                  decoding="async"
                  fetchPriority={frame.loading === "eager" ? "high" : "auto"}
                  className="block h-auto w-full"
                />
              )}
            </figure>
          ))}
        </section>

        <nav
          aria-label="Project navigation"
          className="mx-auto mt-0 w-full max-w-[1040px] px-6 md:px-8"
        >
          <div className="border-t border-stone-600/10">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {isFirstProject ? (
                <Link
                  href="/"
                  className="group flex min-h-24 items-center border-b border-stone-600/10 py-5 transition-colors duration-200 hover:text-stone-700 md:min-h-28 md:border-r md:border-b-0 md:pr-6"
                >
                  <div className="flex max-w-full items-center gap-2.5">
                    <ChevronLeft
                      className="size-3.5 shrink-0 text-stone-600/58 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:text-stone-700"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-stone-600/42">
                        Back to Home
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <ProjectRouteLink
                  href={siblings.previous.href}
                  className="group flex min-h-24 items-center border-b border-stone-600/10 py-5 transition-colors duration-200 hover:text-stone-700 md:min-h-28 md:border-r md:border-b-0 md:pr-6"
                >
                  <div className="flex max-w-full items-center gap-2.5">
                    <ChevronLeft
                      className="size-3.5 shrink-0 text-stone-600/58 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:text-stone-700"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-stone-600/42">
                        Previous Project
                      </p>
                      <p className="mt-1.5 truncate text-[0.98rem] tracking-[-0.02em] text-stone-600/88 transition-colors duration-200 group-hover:text-stone-700">
                        {siblings.previous.title}
                      </p>
                    </div>
                  </div>
                </ProjectRouteLink>
              )}

              {isLastProject ? (
                <Link
                  href="/"
                  className="group flex min-h-24 items-center justify-end py-5 transition-colors duration-200 hover:text-stone-700 md:min-h-28 md:pl-6"
                >
                  <div className="flex max-w-full items-center gap-2.5">
                    <div className="min-w-0 text-right">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-stone-600/42">
                        Back to Home
                      </p>
                    </div>
                    <ChevronRight
                      className="size-3.5 shrink-0 text-stone-600/58 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-stone-700"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              ) : (
                <ProjectRouteLink
                  href={siblings.next.href}
                  className="group flex min-h-24 items-center justify-end py-5 transition-colors duration-200 hover:text-stone-700 md:min-h-28 md:pl-6"
                >
                  <div className="flex max-w-full items-center gap-2.5">
                    <div className="min-w-0 text-right">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-stone-600/42">
                        Next Project
                      </p>
                      <p className="mt-1.5 truncate text-[0.98rem] tracking-[-0.02em] text-stone-600/88 transition-colors duration-200 group-hover:text-stone-700">
                        {siblings.next.title}
                      </p>
                    </div>
                    <ChevronRight
                      className="size-3.5 shrink-0 text-stone-600/58 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-stone-700"
                      aria-hidden="true"
                    />
                  </div>
                </ProjectRouteLink>
              )}
            </div>
          </div>
        </nav>
      </main>
    </div>
  );
}
