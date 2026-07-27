import { LiveIndicator } from "@/components/live-indicator"

import { TickerStrip } from "./_components/ticker-strip"
import { EventFeed } from "./_components/event-feed"
import { MatrixCards } from "./_components/matrix-cards"
import { WatchlistTable } from "./_components/watchlist-table"
import { DAILY_META } from "./_data/daily"

/** 섹션 라벨 — 얇은 구분선과 함께 소제목을 표시한다. */
function SectionLabel({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex items-center gap-3 pt-1">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{children}</h2>
      <span className="h-px flex-1 bg-border" aria-hidden />
    </div>
  )
}

export default function MarketReportDailyPage() {
  return (
    <div className="flex w-full max-w-6xl flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[0.7rem] font-medium uppercase tracking-widest text-primary">
            {DAILY_META.eyebrow}
          </span>
          <LiveIndicator status="live" updatedAt="2026-07-16T08:40:00" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">오늘의 증시 테마 리포트</h1>
        <p className="text-xs text-muted-foreground">
          {DAILY_META.publishedAt} · {DAILY_META.analyzedNote}
        </p>
      </div>

      <TickerStrip />

      <section className="flex flex-col gap-3">
        <SectionLabel>오늘의 이벤트</SectionLabel>
        <EventFeed />
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabel>리스크 · 기회 매트릭스</SectionLabel>
        <MatrixCards />
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabel>워치리스트 — 오늘 주목 종목</SectionLabel>
        <WatchlistTable />
      </section>

      <footer className="rounded-lg border border-border bg-muted/40 px-4 py-3">
        <p className="text-[0.7rem] leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">가상 데이터 · 데모</span> — 본 리포트의 수치·종목명은 전부
          가상으로 합성한 데모 데이터이며 실제 시장과 무관합니다. 투자 판단의 근거로 사용할 수 없습니다.
        </p>
      </footer>
    </div>
  )
}
