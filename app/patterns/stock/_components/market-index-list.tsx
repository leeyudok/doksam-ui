import { TrendUpIcon, TrendDownIcon } from "@phosphor-icons/react/dist/ssr"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { rateColor, rateSign } from "@/lib/finance/rate"

const INDICES = [
  { name: "야간선물", price: "351.20", change: 2.15 },
  { name: "KOSPI", price: "2,687.44", change: -0.32 },
  { name: "KOSDAQ", price: "845.12", change: 1.08 },
] as const

/** #26 시장 방향 — 선물/지수 스냅샷, 한국식 상승=빨강/하락=파랑 색상. */
export function MarketIndexList() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">시장 방향</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3">
        {INDICES.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {item.change > 0 ? (
                <TrendUpIcon size={16} weight="bold" className="text-destructive" />
              ) : (
                <TrendDownIcon size={16} weight="bold" className="text-chart-1" />
              )}
              <span className="text-xs font-medium">{item.name}</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold tabular-nums">{item.price}</span>
              <span className={`ml-1 text-[10px] font-semibold tabular-nums ${rateColor(item.change)}`}>
                {rateSign(item.change)}
                {item.change}%
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
