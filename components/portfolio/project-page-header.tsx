"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type PortfolioSection = "home" | "industrial-design" | "design-engineering" | "contact";

const navItems: Array<{ section: PortfolioSection; label: string; href: string }> = [
  { section: "home", label: "Home", href: "/" },
  { section: "industrial-design", label: "Industrial Design", href: "/industrial-design" },
  { section: "design-engineering", label: "Design Engineering", href: "/design-engineering" },
  { section: "contact", label: "Contact", href: "/contact" },
];

function sectionFromPathname(pathname: string): PortfolioSection {
  if (pathname.startsWith("/industrial-design")) {
    return "industrial-design";
  }

  if (pathname.startsWith("/design-engineering")) {
    return "design-engineering";
  }

  if (pathname.startsWith("/contact")) {
    return "contact";
  }

  return "home";
}

export function ProjectPageHeader() {
  const pathname = usePathname();
  const activeSection = sectionFromPathname(pathname ?? "/");

  return (
    <header className="sticky top-0 z-30 h-20 border-b border-stone-600/5 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-full w-full max-w-[1040px] items-center justify-between px-6 md:px-8">
        <Link href="/" className="text-[17px] font-medium tracking-tight text-stone-600/80">
          Danny Wang
        </Link>

        <nav className="hidden items-center gap-5 md:flex lg:gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.section;

            return (
              <Link
                key={item.section}
                href={item.href}
                className={cn(
                  "group relative pb-[6px] text-[13px] font-normal transition-colors",
                  isActive ? "text-stone-600/90" : "text-stone-600/60 hover:text-stone-600/90",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute right-0 -bottom-[3px] left-0 h-px origin-left bg-stone-600/60 transition-transform duration-200",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center text-stone-600/70 transition-colors hover:text-stone-600/90"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 border-stone-600/10">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.section} asChild className="text-[13px]">
                  <Link
                    href={item.href}
                    className={cn(
                      "block w-full",
                      activeSection === item.section ? "text-stone-600/90" : "text-stone-600/65",
                    )}
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
