import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

import { ProjectPageHeader } from "@/components/portfolio/project-page-header";
import { ViewportVideo } from "@/components/portfolio/viewport-video";
import {
  getIndustrialProject,
  getIndustrialProjectSiblings,
  industrialProjects,
} from "@/lib/portfolio-data";

/* eslint-disable @next/next/no-img-element */
type IndustrialProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return industrialProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: IndustrialProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getIndustrialProject(slug);

  if (!project) {
    return {
      title: "Industrial Design Project | Danny Wang",
    };
  }

  return {
    title: `${project.title} | Industrial Design | Danny Wang`,
    description: `${project.title} industrial design project gallery.`,
  };
}

export default async function IndustrialProjectPage({
  params,
}: IndustrialProjectPageProps) {
  const { slug } = await params;
  const project = getIndustrialProject(slug);

  if (!project) {
    notFound();
  }

  const siblings = getIndustrialProjectSiblings(project.slug);
  const projectIndex = industrialProjects.findIndex((entry) => entry.slug === project.slug);
  const isFirstProject = projectIndex === 0;
  const isLastProject = projectIndex === industrialProjects.length - 1;

  if (!siblings) {
    notFound();
  }

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
              <Link
                href={isFirstProject ? "/" : siblings.previous.href}
                className="group flex min-h-24 items-center border-b border-stone-600/10 py-5 transition-colors duration-200 hover:text-stone-700 md:min-h-28 md:border-r md:border-b-0 md:pr-6"
              >
                <div className="flex max-w-full items-center gap-2.5">
                  <ChevronLeft
                    className="size-3.5 shrink-0 text-stone-600/58 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:text-stone-700"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-stone-600/42">
                      {isFirstProject ? "Back to Home" : "Previous Project"}
                    </p>
                    {!isFirstProject ? (
                      <p className="mt-1.5 truncate text-[0.98rem] tracking-[-0.02em] text-stone-600/88 transition-colors duration-200 group-hover:text-stone-700">
                        {siblings.previous.title}
                      </p>
                    ) : null}
                  </div>
                </div>
              </Link>

              <Link
                href={isLastProject ? "/" : siblings.next.href}
                className="group flex min-h-24 items-center justify-end py-5 transition-colors duration-200 hover:text-stone-700 md:min-h-28 md:pl-6"
              >
                <div className="flex max-w-full items-center gap-2.5">
                  <div className="min-w-0 text-right">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-stone-600/42">
                      {isLastProject ? "Back to Home" : "Next Project"}
                    </p>
                    {!isLastProject ? (
                      <p className="mt-1.5 truncate text-[0.98rem] tracking-[-0.02em] text-stone-600/88 transition-colors duration-200 group-hover:text-stone-700">
                        {siblings.next.title}
                      </p>
                    ) : null}
                  </div>
                  <ChevronRight
                    className="size-3.5 shrink-0 text-stone-600/58 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-stone-700"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </main>
    </div>
  );
}
