import { TrendDownIcon, TrendUpIcon } from "@phosphor-icons/react/dist/ssr"

import { rateColor, rateText } from "@/lib/finance/rate"
import { TICKER_ITEMS, type TickerItem } from "@/app/templates/brokerage/_data/market"

function TickerEntry({ item }: Readonly<{ item: TickerItem }>) {
  const colorClass = rateColor(item.changePercent)

  return (
    <span className="flex shrink-0 items-center gap-2 px-4 text-xs">
      <span className="font-medium text-foreground">{item.label}</span>
      <span className="tabular-nums text-muted-foreground">
        {item.value.toLocaleString(undefined, { maximumFractionDigits: item.value >= 1_000_000 ? 0 : 2 })}
        {item.unit}
      </span>
      <span className={`flex items-center gap-0.5 font-medium tabular-nums ${colorClass}`}>
        {item.changePercent > 0 && <TrendUpIcon size={10} weight="bold" />}
        {item.changePercent < 0 && <TrendDownIcon size={10} weight="bold" />}
        {rateText(item.changePercent)}%
      </span>
    </span>
  )
}

/**
 * 하단 고정 티커 바(#41-A) — S&P500·필라델피아 반도체·VIX 등을 좌→우 무한
 * 스크롤로 노출한다. 목록을 두 벌 이어붙여 CSS 애니메이션으로 이음매 없이
 * 순환시키고(-50% 지점에서 루프), prefers-reduced-motion 사용자는 애니메이션을
 * 끈다. 키프레임은 컴포넌트 스코프 <style> 로 self-contained 하게 정의한다
 * (components/ui/chart.tsx 와 동일한 인라인 스타일 태그 패턴).
 */
export function MarketTicker() {
  return (
    <div className="overflow-hidden border-t border-border bg-card py-1.5" aria-label="시장 티커">
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes brokerage-ticker-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.brokerage-ticker-track {
  animation: brokerage-ticker-scroll 32s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  .brokerage-ticker-track {
    animation: none;
  }
}
`,
        }}
      />
      <div className="flex w-max brokerage-ticker-track">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <TickerEntry key={`${item.id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  )
}
