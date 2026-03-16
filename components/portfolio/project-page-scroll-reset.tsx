"use client";

import { useLayoutEffect } from "react";

export function ProjectPageScrollReset() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const previousInlineScrollBehavior = root.style.scrollBehavior;

    // Force an instant reset for project pages without changing section-route behavior.
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      root.style.scrollBehavior = previousInlineScrollBehavior;
    });

    return () => {
      root.style.scrollBehavior = previousInlineScrollBehavior;
    };
  }, []);

  return null;
}
