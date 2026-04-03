import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-glass border border-[var(--card-border)] rounded-lg p-6",
        className
      )}
      {...props}
    />
  )
}

export {
  Card
}
