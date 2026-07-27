const WEEKS = 20
const DAYS = ["일", "월", "화", "수", "목", "금", "토"]

/** 건수 → 농도 단계. 하드코딩 색 금지 — primary 알파 스케일(빈 날은 muted). */
function levelClass(n: number): string {
  if (n <= 0) return "bg-muted"
  if (n <= 2) return "bg-primary/25"
  if (n <= 5) return "bg-primary/50"
  if (n <= 9) return "bg-primary/75"
  return "bg-primary"
}

/** 결정적 의사난수(시드 고정) — 데모 데이터를 항상 같은 모양으로 재현한다. */
function pseudoCount(week: number, day: number): number {
  const x = Math.sin(week * 12.9898 + day * 78.233) * 43758.5453
  const frac = x - Math.floor(x)
  return Math.floor(frac * 11)
}

interface ActivityCell {
  week: number
  day: number
  count: number
}

/**
 * 활동 히트맵 — GitHub contribution graph 스타일. 주(週) 단위 열 × 요일 행 그리드로
 * 일별 활동 건수를 primary 알파 농도로 표현한다.
 */
export function ActivityHeatmapDemo() {
  const weeks: ActivityCell[][] = []
  for (let w = 0; w < WEEKS; w++) {
    const col: ActivityCell[] = []
    for (let d = 0; d < 7; d++) {
      col.push({ week: w, day: d, count: pseudoCount(w, d) })
    }
    weeks.push(col)
  }
  const total = weeks.flat().reduce((acc, c) => acc + c.count, 0)

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border border-border bg-card p-3">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-xs font-medium text-muted-foreground">최근 20주 활동</span>
        <span className="text-xs tabular-nums text-muted-foreground">총 {total.toLocaleString()}건</span>
      </div>
      <div className="flex gap-[3px] overflow-x-auto" role="img" aria-label="최근 20주 일별 활동 건수 히트맵">
        {weeks.map((col) => (
          <div key={`week-${col[0].week}`} className="flex flex-col gap-[3px]">
            {col.map((cell) => (
              <span
                key={`${cell.week}-${DAYS[cell.day]}`}
                title={`${DAYS[cell.day]}요일 · ${cell.count}건`}
                aria-label={`${DAYS[cell.day]}요일 활동 ${cell.count}건`}
                className={`block h-2.5 w-2.5 rounded-[2px] transition-transform hover:scale-125 ${levelClass(cell.count)}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
        <span>적음</span>
        <span className="h-2.5 w-2.5 rounded-[2px] bg-muted" />
        <span className="h-2.5 w-2.5 rounded-[2px] bg-primary/25" />
        <span className="h-2.5 w-2.5 rounded-[2px] bg-primary/50" />
        <span className="h-2.5 w-2.5 rounded-[2px] bg-primary/75" />
        <span className="h-2.5 w-2.5 rounded-[2px] bg-primary" />
        <span>많음</span>
      </div>
    </div>
  )
}
