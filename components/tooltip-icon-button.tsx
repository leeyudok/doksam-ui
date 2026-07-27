"use client"

import * as React from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { VariantProps } from "class-variance-authority"

type IconButtonSize = Extract<
  NonNullable<VariantProps<typeof buttonVariants>["size"]>,
  "icon" | "icon-xs" | "icon-sm" | "icon-lg"
>

export interface TooltipIconButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "size" | "children"> {
  /** 툴팁 텍스트이자 스크린리더용 접근 라벨. Button의 aria-label로도 그대로 전달된다. */
  tip: string
  /** 버튼 안에 렌더링할 아이콘. */
  icon: React.ReactNode
  size?: IconButtonSize
}

/**
 * 아이콘 전용 버튼 — Tooltip 래핑과 aria-label 을 강제한다(#21).
 * 아이콘만 있고 텍스트 레이블이 없는 버튼은 스크린리더·마우스 사용자 모두에게
 * 의미를 알려줄 방법이 없어지기 쉽다. 이 컴포넌트는 `tip` 하나로 툴팁 텍스트와
 * aria-label 을 동시에 채워서 그 실수를 구조적으로 막는다.
 * TooltipProvider 는 app/layout.tsx 최상단에 이미 있으므로 별도로 감쌀 필요 없다.
 */
function TooltipIconButton({
  tip,
  icon,
  variant = "ghost",
  size = "icon",
  ...props
}: Readonly<TooltipIconButtonProps>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button type="button" variant={variant} size={size} aria-label={tip} {...props}>
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tip}</TooltipContent>
    </Tooltip>
  )
}

export { TooltipIconButton }
