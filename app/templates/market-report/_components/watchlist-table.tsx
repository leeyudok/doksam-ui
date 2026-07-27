import { WATCHLIST, type WatchItem } from "../_data/daily"

/** 시그널 성격별 배지 색 — 시맨틱 토큰. */
const SIGNAL_CLASS: Record<WatchItem["tone"], string> = {
  buy: "bg-gain/10 text-gain border-gain/30",
  watch: "bg-warning/10 text-warning border-warning/30",
  alert: "bg-loss/10 text-loss border-loss/30",
  check: "bg-primary/10 text-primary border-primary/30",
}

const BAR_CLASS: Record<WatchItem["tone"], string> = {
  buy: "bg-gain",
  watch: "bg-warning",
  alert: "bg-loss",
  check: "bg-primary",
}

/**
 * 워치리스트 테이블(#51) — 오늘 주목 종목 7종을 순위·사유·시그널로 나열한다.
 * 가상 종목이며 색은 시맨틱 토큰만 사용.
 */
export function WatchlistTable() {
  return (
    <ul className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
      {WATCHLIST.map((item) => (
        <li key={item.rank} className="flex items-center gap-3 px-4 py-3">
          <span className="w-5 shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
            {String(item.rank).padStart(2, "0")}
          </span>
          <span className={`h-8 w-0.5 shrink-0 rounded ${BAR_CLASS[item.tone]}`} aria-hidden />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-foreground">{item.name}</div>
            <div className="truncate text-xs text-muted-foreground">{item.theme}</div>
          </div>
          <span
            className={`shrink-0 rounded border px-2.5 py-1 text-[0.65rem] font-bold tracking-wide ${SIGNAL_CLASS[item.tone]}`}
          >
            {item.signal}
          </span>
        </li>
      ))}
    </ul>
  )
}
