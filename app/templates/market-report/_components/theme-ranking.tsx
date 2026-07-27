import { rateColor, rateText } from "@/lib/finance/rate"
import { THEME_RANKING } from "../_data/weekly"

/**
 * 주간 테마 랭킹(#51) — 주간 등락 배지 + 강도 도트 + 관련 종목 태그.
 * 데스크톱 2열, 모바일 1열로 리플로우. 등락 색은 finance 토큰만 사용.
 */
export function ThemeRanking() {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {THEME_RANKING.map((theme) => (
        <div key={theme.rank} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
          <div className="flex items-start gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-secondary-foreground">
              {theme.rank}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold leading-tight text-foreground">{theme.name}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{theme.sub}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <span className={`text-xs font-bold tabular-nums ${rateColor(theme.changePercent)}`}>
                {rateText(theme.changePercent)}%
              </span>
              <div className="flex gap-1" aria-label={`강도 ${theme.strength}/5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`size-1.5 rounded-full ${i < theme.strength ? "bg-primary" : "bg-border"}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 border-t border-border pt-3">
            {theme.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[0.7rem] font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
