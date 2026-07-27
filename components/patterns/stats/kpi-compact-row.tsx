import { Card, CardContent } from "@/components/ui/card"
import { rateColor, rateText } from "@/lib/finance/rate"

interface CompactKpi {
  label: string
  value: string
  change: number
}

const COMPACT_KPIS: CompactKpi[] = [
  { label: "체결 건수", value: "12,048", change: 4.2 },
  { label: "평균 처리시간", value: "812ms", change: -8.6 },
  { label: "오류율", value: "0.31%", change: 0 },
  { label: "동시접속", value: "3,204", change: 1.9 },
]

/**
 * #2 압축 KPI 행 — 스파크라인 없이 라벨·값·증감만 한 줄로 배치하는 밀도 높은 변형.
 * 운영 대시보드 상단처럼 지표 개수가 많거나 세로 공간이 좁을 때 KpiCardGrid 대신 쓴다.
 */
export function KpiCompactRow() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {COMPACT_KPIS.map((kpi) => (
        <Card key={kpi.label} size="sm">
          <CardContent className="flex flex-col gap-1">
            <span className="text-[11px] text-muted-foreground">{kpi.label}</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-semibold tabular-nums">{kpi.value}</span>
              <span className={`text-[11px] font-medium tabular-nums ${rateColor(kpi.change)}`}>{rateText(kpi.change)}%</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
