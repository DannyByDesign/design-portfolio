import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailPage } from "@/components/portfolio/project-detail-page";
import {
  designEngineeringProjects,
  getDesignEngineeringProject,
  getDesignEngineeringProjectSiblings,
} from "@/lib/portfolio-data";

type DesignEngineeringProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return designEngineeringProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: DesignEngineeringProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getDesignEngineeringProject(slug);

  if (!project) {
    return {
      title: "Design Engineering Project | Danny Wang",
    };
  }

  return {
    title: `${project.title} | Design Engineering | Danny Wang`,
    description: `${project.title} design engineering project gallery.`,
  };
}

export default async function DesignEngineeringProjectPage({
  params,
}: DesignEngineeringProjectPageProps) {
  const { slug } = await params;
  const project = getDesignEngineeringProject(slug);

  if (!project) {
    notFound();
  }

  const siblings = getDesignEngineeringProjectSiblings(project.slug);
  const projectIndex = designEngineeringProjects.findIndex((entry) => entry.slug === project.slug);
  const isFirstProject = projectIndex === 0;
  const isLastProject = projectIndex === designEngineeringProjects.length - 1;

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
