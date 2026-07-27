import { CalendarDotIcon } from "@phosphor-icons/react/dist/ssr"

import { EVENT_CALENDAR } from "../_data/weekly"

/**
 * 이벤트 캘린더(#51) — 주간 요일별 예정 일정을 카드로 나열한다.
 * 데스크톱은 다열, 모바일은 1열로 리플로우.
 */
export function EventCalendar() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {EVENT_CALENDAR.map((col) => (
        <div key={col.date} className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3.5">
          <div className="flex items-center gap-1.5 border-b border-border pb-2">
            <CalendarDotIcon size={14} className="text-primary" />
            <span className="text-xs font-bold text-foreground">{col.date}</span>
            <span className="text-xs text-muted-foreground">{col.day}</span>
          </div>
          <ul className="flex flex-col gap-1.5">
            {col.events.map((event) => (
              <li key={event} className="text-xs leading-snug text-muted-foreground">
                {event}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
