import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface SignalCardProps {
  /** 종목명. */
  name: string
  /** 판정 라벨(강력매수·매수·보유·매도 등). */
  verdictLabel: string
  /** 판정 배지 variant — 매수 계열 default, 보유 secondary, 매도 계열 destructive. */
  verdictVariant?: "default" | "secondary" | "destructive"
  /** 매수/보유/매도 비율(합 100). */
  buyPercent: number
  holdPercent: number
  sellPercent: number
  /** 설명 한 줄. */
  description?: string
  className?: string
}

/**
 * 매매 시그널 카드 — 종목명 + verdict 배지 + 매수/보유/매도 3단 점수 바.
 * 점수 바는 매매 판단 색이라 등락색(gain/loss)이 아닌 success/warning/destructive
 * 토큰을 쓴다(srope customs/signal-card 이식, green/yellow/red 하드코딩 치환).
 */
export function SignalCard({
  name,
  verdictLabel,
  verdictVariant = "default",
  buyPercent,
  holdPercent,
  sellPercent,
  description,
  className,
}: SignalCardProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium">{name}</span>
        <Badge variant={verdictVariant} className="px-1.5 py-0 text-[9px]">
          {verdictLabel}
        </Badge>
      </div>
      <div className="flex h-2 overflow-hidden rounded-full bg-secondary">
        <div className="bg-success" style={{ width: `${buyPercent}%` }} />
        <div className="bg-warning" style={{ width: `${holdPercent}%` }} />
        <div className="bg-destructive" style={{ width: `${sellPercent}%` }} />
      </div>
      {description ? <p className="line-clamp-1 text-[10px] text-muted-foreground">{description}</p> : null}
    </div>
  )
}
