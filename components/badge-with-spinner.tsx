import type * as React from "react"

import { BadgeExtended, type BadgeExtendedProps } from "@/components/badge-extended"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

export interface BadgeWithSpinnerProps {
  children?: React.ReactNode
  /** 배지 상태 variant(기본 warning — 진행 중 의미). */
  variant?: BadgeExtendedProps["variant"]
  className?: string
}

/**
 * 진행 중 스피너 배지 — 배지 좌측에 회전 스피너를 붙여 "처리 중" 상태를 표시한다
 * (srope customs/badge-with-spinner 이식, 기본 variant 를 destructive→warning 으로 조정).
 */
export function BadgeWithSpinner({ children, variant = "warning", className }: BadgeWithSpinnerProps) {
  return (
    <BadgeExtended variant={variant} className={cn("gap-1.5", className)}>
      <Spinner className="size-3" data-icon="inline-start" />
      {children}
    </BadgeExtended>
  )
}
