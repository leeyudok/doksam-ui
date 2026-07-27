import { Badge, type badgeVariants } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { VariantProps } from "class-variance-authority"

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"]

interface Signal {
  name: string
  verdictLabel: string
  verdictVariant: BadgeVariant
  buyPercent: number
  holdPercent: number
  sellPercent: number
  description: string
}

const SIGNALS: Signal[] = [
  {
    name: "삼성전자",
    verdictLabel: "강력매수",
    verdictVariant: "default",
    buyPercent: 70,
    holdPercent: 20,
    sellPercent: 10,
    description: "외인 3일 연속 순매수, 반도체 업황 개선",
  },
  {
    name: "카카오",
    verdictLabel: "보유",
    verdictVariant: "secondary",
    buyPercent: 30,
    holdPercent: 45,
    sellPercent: 25,
    description: "실적 부진이나 광고 매출 반등 기대",
  },
  {
    name: "하이브",
    verdictLabel: "매도",
    verdictVariant: "destructive",
    buyPercent: 10,
    holdPercent: 25,
    sellPercent: 65,
    description: "BTS 공백기, 실적 하향 전망",
  },
]

function SignalScoreBar({ signal }: Readonly<{ signal: Signal }>) {
  return (
    <div className="flex h-2 overflow-hidden rounded-full bg-secondary">
      <div className="bg-success" style={{ width: `${signal.buyPercent}%` }} />
      <div className="bg-warning" style={{ width: `${signal.holdPercent}%` }} />
      <div className="bg-destructive" style={{ width: `${signal.sellPercent}%` }} />
    </div>
  )
}

/** #27 매매 시그널 — verdict 5단계 배지 + 매수/보유/매도 비중 점수 바. */
export function SignalList() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">종합 시그널</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {SIGNALS.map((signal) => (
          <div key={signal.name} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">{signal.name}</span>
              <Badge variant={signal.verdictVariant} className="px-1.5 py-0 text-[9px]">
                {signal.verdictLabel}
              </Badge>
            </div>
            <SignalScoreBar signal={signal} />
            <p className="text-[10px] text-muted-foreground">{signal.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
