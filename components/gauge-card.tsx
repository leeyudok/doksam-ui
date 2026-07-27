import * as React from "react"

import { BadgeExtended } from "@/components/badge-extended"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface GaugeCardTag {
  label: string
  variant?: "outline" | "default" | "secondary" | "destructive"
}

export interface GaugeCardCause {
  label: string
  /** 원인 태그 색 클래스 — 시맨틱 토큰 틴트(예: "bg-success/15 text-success"). */
  className: string
  description?: string
}

export interface GaugeCardProps {
  /** 카드 이름. */
  name: string
  icon?: React.ReactNode
  /** 활성 여부 — 활성이면 success 틴트 테두리. */
  active?: boolean
  activeLabel?: string
  inactiveLabel?: string
  gaugeLabel?: string
  /** 게이지 값(0~100). */
  gaugeValue: number
  gaugeUnit?: string
  tags?: GaugeCardTag[]
  cause?: GaugeCardCause
  className?: string
}

/** 게이지 값 → 바 색 토큰: 60↑ success / 30↑ warning / 미만 destructive. */
function gaugeColor(value: number): string {
  if (value >= 60) return "bg-success"
  if (value >= 30) return "bg-warning"
  return "bg-destructive"
}

/**
 * 게이지 카드 — 헤더(이름+상태 배지) + 게이지 바 + 태그 목록 + 원인 태그.
 * stock 패턴 페이지 스코프였던 워치리스트 게이지를 독립 컴포넌트로 승격
 * (srope customs/gauge-card 이식, green/yellow 하드코딩 → success/warning 토큰).
 */
export function GaugeCard({
  name,
  icon,
  active = true,
  activeLabel = "활성",
  inactiveLabel = "만료",
  gaugeLabel = "시그널",
  gaugeValue,
  gaugeUnit = "점",
  tags,
  cause,
  className,
}: GaugeCardProps) {
  return (
    <Card className={cn("py-0", active ? "border-success/60" : "border-muted", className)}>
      <CardContent className="px-3 py-2.5">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {icon}
            <span className="text-xs font-semibold">{name}</span>
          </div>
          <BadgeExtended variant={active ? "success" : "warning"} className="px-1.5 py-0 text-[9px]">
            {active ? activeLabel : inactiveLabel}
          </BadgeExtended>
        </div>

        <div className="mb-2 space-y-1.5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">{gaugeLabel}</span>
            <span className="font-medium tabular-nums">
              {gaugeValue}
              {gaugeUnit}
            </span>
          </div>
          <div className="h-1 rounded-full bg-secondary">
            <div className={cn("h-1 rounded-full", gaugeColor(gaugeValue))} style={{ width: `${gaugeValue}%` }} />
          </div>
        </div>

        {tags && tags.length > 0 ? (
          <div className="mb-1.5 flex items-center gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag.label} variant={tag.variant ?? "outline"} className="px-1.5 py-0 text-[9px]">
                {tag.label}
              </Badge>
            ))}
          </div>
        ) : null}

        {cause ? (
          <div className="flex items-center gap-1.5">
            <span className={cn("rounded px-1.5 py-0.5 text-[9px]", cause.className)}>{cause.label}</span>
            {cause.description ? (
              <span className="line-clamp-1 text-[10px] text-muted-foreground">{cause.description}</span>
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
