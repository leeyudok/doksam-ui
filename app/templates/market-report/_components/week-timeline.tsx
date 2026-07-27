import { WEEK_TIMELINE, type TimelineDay } from "../_data/weekly"

/** 분위기별 색 — 시맨틱 토큰. */
const MOOD_CLASS: Record<TimelineDay["tone"], string> = {
  up: "text-gain",
  down: "text-loss",
  flat: "text-warning",
}

const DOT_CLASS: Record<TimelineDay["tone"], string> = {
  up: "bg-gain",
  down: "bg-loss",
  flat: "bg-warning",
}

/**
 * 주간 흐름 타임라인(#51) — 요일별 시황을 세로 타임라인으로 나열한다.
 * 좌측 날짜·연결선 + 우측 분위기 배지·요약. 색은 시맨틱 토큰만 사용.
 */
export function WeekTimeline() {
  return (
    <ol className="flex flex-col">
      {WEEK_TIMELINE.map((item, idx) => (
        <li key={item.date} className="flex gap-3">
          <div className="flex w-11 shrink-0 flex-col items-center">
            <span className={`size-2 rounded-full ${DOT_CLASS[item.tone]}`} aria-hidden />
            {idx < WEEK_TIMELINE.length - 1 && <span className="w-px flex-1 bg-border" aria-hidden />}
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tabular-nums text-muted-foreground">
                {item.date} {item.day}
              </span>
              <span className={`text-xs font-bold ${MOOD_CLASS[item.tone]}`}>{item.mood}</span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
