import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-xl font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-l from-primary/80 to-secondary/80 text-[var(--text-primary)] border-[var(--card-border)] hover:from-primary hover:to-secondary rounded-full transition-colors",
        glass: "border-ui-glass bg-glass backdrop-blur-ui hover:bg-white/10 text-4xl",
      },
      size: {
        default: "h-11 px-6 py-3 has-[>svg]:px-5",
        sm: "h-9 gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4 w-max",
        filters: "h-16 rounded-md px-20 text-base has-[>svg]:px-5",
        projectNav: "h-10 rounded-md px-6 text-3xl has-[>svg]:px-5",
        icon: "size-10",
        fit: "w-fit h-fit p-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
