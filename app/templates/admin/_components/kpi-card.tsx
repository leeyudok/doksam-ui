import { ArrowDownRightIcon, ArrowUpRightIcon, MinusIcon } from "@phosphor-icons/react/dist/ssr"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { KpiMetric } from "../_data/dashboard-data"

const TREND_ICON = {
  up: ArrowUpRightIcon,
  down: ArrowDownRightIcon,
  flat: MinusIcon,
} as const

const TREND_TONE: Record<KpiMetric["trend"], string> = {
  up: "text-success",
  down: "text-destructive",
  flat: "text-muted-foreground",
}

/** 대시보드 상단 KPI 카드 — 값 + 전주 대비 델타(추세 아이콘·색)를 보여준다. */
export function KpiCard({ metric }: Readonly<{ metric: KpiMetric }>) {
  const TrendIcon = TREND_ICON[metric.trend]
  const tone = TREND_TONE[metric.trend]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xs font-medium text-muted-foreground">{metric.label}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1.5">
        <span className="text-2xl font-semibold tracking-tight tabular-nums">{metric.value}</span>
        <span className={cn("flex items-center gap-1 text-xs font-medium", tone)}>
          <TrendIcon size={12} weight="bold" />
          {metric.delta !== 0 ? `${Math.abs(metric.delta)}%` : ""} {metric.deltaLabel}
        </span>
      </CardContent>
    </Card>
  )
}
