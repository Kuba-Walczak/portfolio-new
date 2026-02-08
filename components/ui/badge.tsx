import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        programming:
          "border-transparent bg-sky-500 text-white [a&]:hover:bg-sky-500/90 focus-visible:ring-sky-500/20 dark:focus-visible:ring-sky-500/40 dark:bg-sky-500/70",
        technicalArt:
          "border-transparent bg-violet-500 text-white [a&]:hover:bg-violet-500/90 focus-visible:ring-violet-500/20 dark:focus-visible:ring-violet-500/40 dark:bg-violet-500/70",
        art:
          "border-transparent bg-rose-500 text-white [a&]:hover:bg-rose-500/90 focus-visible:ring-rose-500/20 dark:focus-visible:ring-rose-500/40 dark:bg-rose-500/70",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
