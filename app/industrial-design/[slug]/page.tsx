import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailPage } from "@/components/portfolio/project-detail-page";
import {
  getIndustrialProject,
  getIndustrialProjectSiblings,
  industrialProjects,
} from "@/lib/portfolio-data";

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
    <ProjectDetailPage
      project={project}
      siblings={siblings}
      isFirstProject={isFirstProject}
      isLastProject={isLastProject}
    />
  );
}
