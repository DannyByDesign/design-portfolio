"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

type ProjectRouteLinkProps = Omit<ComponentProps<typeof Link>, "scroll">;

function isPlainLeftClick(event: MouseEvent<HTMLAnchorElement>) {
  return !(
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.currentTarget.target === "_blank"
  );
}

function primeProjectPageScroll() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

export function ProjectRouteLink({ onClick, ...props }: ProjectRouteLinkProps) {
  return (
    <Link
      {...props}
      scroll={false}
      onClick={(event) => {
        onClick?.(event);

        if (!isPlainLeftClick(event)) {
          return;
        }

        primeProjectPageScroll();
      }}
    />
  );
}
