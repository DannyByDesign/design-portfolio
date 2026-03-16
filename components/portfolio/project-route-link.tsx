"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type ProjectRouteLinkProps = Omit<ComponentProps<typeof Link>, "scroll">;

export function ProjectRouteLink({ onClick, ...props }: ProjectRouteLinkProps) {
  return <Link {...props} onClick={onClick} />;
}
