import { BadgeExtended } from "@/components/badge-extended"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface StatusCardProps {
  /** 항목 이름. */
  name: string
  /** 상태 텍스트. */
  status: string
  /** 상태 variant — 배지·진행률 바 색을 함께 결정한다. */
  variant: "success" | "warning" | "danger"
  /** 진행률(0~100). */
  percent: number
  /** 진행률 라벨(기본 "가동률"). */
  percentLabel?: string
  className?: string
}

/** variant → 진행률 바 색 토큰(green/amber/red 하드코딩 치환). */
const BAR_COLORS = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-destructive",
} as const

/**
 * 상태 카드 — 이름 + 상태 배지 + 진행률 바. 서버·잡·장비 상태 그리드에 쓴다
 * (srope customs/status-card 이식).
 */
export function StatusCard({ name, status, variant, percent, percentLabel = "가동률", className }: StatusCardProps) {
  return (
    <Card className={cn("py-0", className)}>
      <CardContent className="px-3 py-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold">{name}</span>
          <BadgeExtended variant={variant} className="px-1.5 py-0 text-[9px]">
            {status}
          </BadgeExtended>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>{percentLabel}</span>
            <span className="font-medium tabular-nums">{percent}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary">
            <div className={cn("h-1.5 rounded-full transition-[width]", BAR_COLORS[variant])} style={{ width: `${percent}%` }} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
