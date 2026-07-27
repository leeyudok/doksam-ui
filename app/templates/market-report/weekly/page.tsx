import { ThemeRanking } from "../_components/theme-ranking"
import { WeekTimeline } from "../_components/week-timeline"
import { EventCalendar } from "../_components/event-calendar"
import { DisclosureList } from "../_components/disclosure-list"
import { WEEKLY_META } from "../_data/weekly"

/** 섹션 라벨 — 얇은 구분선과 함께 소제목을 표시한다. */
function SectionLabel({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex items-center gap-3 pt-1">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{children}</h2>
      <span className="h-px flex-1 bg-border" aria-hidden />
    </div>
  )
}

/**
 * 주간 마켓 리포트(#51) — 이 페이지만 data 프로필(violet 다크)로 다시 스코프한다.
 * 부모 레이아웃은 service(ocean 라이트)이지만, 루트 div 에 data-theme="violet" +
 * dark 를 부여해 중첩 컨테이너 스코프로 이 서브트리만 다크로 뒤집는다
 * (globals.css 의 [data-theme="violet"].dark 블록이 CSS 변수를 재정의).
 */
export default function MarketReportWeeklyPage() {
  return (
    <div
      data-theme="violet"
      className="dark flex flex-col gap-5 rounded-xl border border-border bg-background p-4 text-foreground sm:p-6"
    >
      <div className="flex flex-col gap-2">
        <span className="text-[0.7rem] font-medium uppercase tracking-widest text-primary">
          {WEEKLY_META.eyebrow}
        </span>
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">주간 증시 테마 분석</h1>
        <p className="text-xs text-muted-foreground">
          {WEEKLY_META.period} · {WEEKLY_META.analyzedNote}
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <SectionLabel>주간 핵심 테마 랭킹</SectionLabel>
        <ThemeRanking />
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabel>주간 흐름 타임라인</SectionLabel>
        <WeekTimeline />
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabel>이벤트 캘린더</SectionLabel>
        <EventCalendar />
      </section>

      <section className="flex flex-col gap-3">
        <SectionLabel>주요 공시</SectionLabel>
        <DisclosureList />
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
