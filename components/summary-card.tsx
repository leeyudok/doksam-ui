import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface SummaryCardProps {
  /** 카드 라벨. */
  label: string
  /** 표시 값 — 숫자는 toLocaleString 포맷. */
  value: number | string
  /** 단위(원·명·건 등). */
  unit?: string
  icon?: React.ReactNode
  /** 값/아이콘 색 클래스(기본 text-primary — 시맨틱 토큰만). */
  color?: string
  className?: string
}

/**
 * 대시보드 요약 카드 — 아이콘 + 라벨 + 숫자 + 단위 한 타일.
 * cards 패턴 데모에 인라인으로만 있던 것을 독립 컴포넌트로 승격(srope customs/summary-card 이식).
 */
export function SummaryCard({ label, value, unit, icon, color = "text-primary", className }: SummaryCardProps) {
  const displayValue = typeof value === "number" ? value.toLocaleString() : value

  return (
    <Card className={cn("py-0", className)}>
      <CardContent className="px-3 py-2.5">
        <div className="flex items-center justify-between">
          <p className="truncate text-[10px] font-medium text-muted-foreground">{label}</p>
          {icon ? <span className={color}>{icon}</span> : null}
        </div>
        <div className="flex items-baseline gap-0.5">
          <span className={cn("text-base font-black tracking-tight tabular-nums", color)}>{displayValue}</span>
          {unit ? <span className="text-[9px] text-muted-foreground">{unit}</span> : null}
        </div>
      </CardContent>
    </Card>
  )
}
