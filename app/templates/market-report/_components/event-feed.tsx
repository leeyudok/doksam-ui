import { EVENT_FEED, type FeedEvent } from "../_data/daily"

/** 강조 키워드를 볼드 처리해 렌더한다. emphasis 가 본문에 없으면 원문 그대로. */
function renderText(event: FeedEvent) {
  if (!event.emphasis) return event.text
  const idx = event.text.indexOf(event.emphasis)
  if (idx === -1) return event.text
  return (
    <>
      {event.text.slice(0, idx)}
      <strong className="font-semibold text-foreground">{event.emphasis}</strong>
      {event.text.slice(idx + event.emphasis.length)}
    </>
  )
}

/**
 * 오늘의 이벤트 피드(#51) — 출처 태그 + 요약을 세로 리스트로 나열한다.
 * 뉴스 자동 분석 흐름을 모사한 가상 피드.
 */
export function EventFeed() {
  return (
    <ul className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
      {EVENT_FEED.map((event) => (
        <li key={event.id} className="flex gap-3 px-4 py-2.5 text-[0.8rem] leading-relaxed">
          <span className="mt-0.5 shrink-0 rounded bg-secondary px-1.5 py-0.5 text-[0.65rem] font-medium text-secondary-foreground">
            {event.source}
          </span>
          <span className="min-w-0 text-muted-foreground">{renderText(event)}</span>
        </li>
      ))}
    </ul>
  )
}
