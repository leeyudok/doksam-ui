import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react/dist/ssr"

import { rateColor, rateText } from "@/lib/finance/rate"
import { TICKERS } from "../_data/daily"

/**
 * 상단 티커 스트립(#51) — 지수·환율·원자재 시세를 가로 한 줄로 나열한다.
 * overflow-x-auto 로 스트립 자체가 스크롤되며(페이지 가로 오버플로우 금지 —
 * e2e 불변식 대응) 등락 색은 finance 토큰(gain/loss)만 쓴다.
 */
export function TickerStrip() {
  return (
    <div
      className="flex gap-0 overflow-x-auto rounded-lg border border-border bg-card"
      aria-label="시세 티커"
    >
      {TICKERS.map((item) => {
        const color = rateColor(item.changePercent)
        return (
          <div
            key={item.id}
            className="flex shrink-0 items-center gap-2 border-r border-border px-3.5 py-2 last:border-r-0"
          >
            <span className="text-xs font-medium tracking-tight text-muted-foreground">{item.name}</span>
            <span className="text-xs font-semibold tabular-nums text-foreground">{item.value}</span>
            <span className={`flex items-center gap-0.5 text-[0.7rem] font-bold tabular-nums ${color}`}>
              {item.changePercent > 0 && <CaretUpIcon size={9} weight="fill" />}
              {item.changePercent < 0 && <CaretDownIcon size={9} weight="fill" />}
              {rateText(item.changePercent)}%
            </span>
          </div>
        )
      })}
    </div>
  )
}
