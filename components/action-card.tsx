import * as React from "react"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface ActionCardProps {
  /** 카드 제목. */
  title: string
  /** 설명 텍스트. */
  description: string
  /** CTA 버튼 텍스트. */
  actionLabel: string
  icon?: React.ReactNode
  onClick?: () => void
  className?: string
}

/**
 * 액션 카드 — 아이콘 + 제목 + 설명 + CTA 버튼. 바로가기·기능 진입 그리드에 쓴다
 * (srope customs/action-card 이식).
 */
export function ActionCard({ title, description, actionLabel, icon, onClick, className }: ActionCardProps) {
  return (
    <Card className={cn("py-0 transition-colors hover:border-primary/50", className)}>
      <CardContent className="flex flex-col gap-3 p-4">
        {icon ? <div className="flex items-start justify-between">{icon}</div> : null}
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{description}</p>
        </div>
        <Button size="sm" variant="outline" className="w-full text-xs" onClick={onClick}>
          {actionLabel}
          <ArrowRightIcon aria-hidden />
        </Button>
      </CardContent>
    </Card>
  )
}
