import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-sm bg-secondary px-2.5 py-1 text-[0.7rem] font-medium tracking-[0.08em] uppercase text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-secondary text-muted-foreground",
        secondary: "bg-muted text-muted-foreground",
        destructive: "bg-destructive text-background",
        outline: "bg-transparent text-muted-foreground",
        ghost: "bg-transparent text-muted-foreground",
        link: "bg-transparent px-0 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
