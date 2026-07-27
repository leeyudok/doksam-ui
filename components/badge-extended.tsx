import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { badgeVariants } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const badgeExtendedVariants = cva(badgeVariants({ variant: "outline" }), {
  variants: {
    variant: {
      success: "border-transparent bg-success/10 text-success dark:bg-success/20",
      warning: "border-transparent bg-warning/10 text-warning dark:bg-warning/20",
      danger: "border-transparent bg-destructive/10 text-destructive dark:bg-destructive/20",
    },
  },
  defaultVariants: {
    variant: "success",
  },
})

export interface BadgeExtendedProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeExtendedVariants> {}

/**
 * shadcn Badge 확장 — success/warning/danger 시맨틱 상태 variant 추가.
 * components/ui/badge.tsx 원본은 건드리지 않고 그 base recipe(badgeVariants)만
 * 재사용하는 커스텀 패턴(#21). 색상은 항상 시맨틱 토큰(--success/--warning/--destructive)만
 * 사용한다 — 하드코딩된 팔레트 색(green-100 등)을 직접 넣지 않는다.
 */
function BadgeExtended({ className, variant = "success", ...props }: Readonly<BadgeExtendedProps>) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeExtendedVariants({ variant }), className)}
      {...props}
    />
  )
}

export { BadgeExtended, badgeExtendedVariants }
