import {
  BroomIcon,
  ClipboardTextIcon,
  ClockIcon,
  FileTextIcon,
  FlaskIcon,
  TagIcon,
} from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

import { LOG_SESSIONS, groupLogsByDate, type SessionKind } from "../_data/logs"

const KIND_ICON: Record<SessionKind, typeof FileTextIcon> = {
  문서: FileTextIcon,
  리뷰: ClipboardTextIcon,
  정리: BroomIcon,
  실험: FlaskIcon,
}

const KIND_STYLE: Record<SessionKind, string> = {
  문서: "border-chart-1/40 bg-chart-1/10 text-chart-1",
  리뷰: "border-chart-4/40 bg-chart-4/10 text-chart-4",
  정리: "border-chart-2/40 bg-chart-2/10 text-chart-2",
  실험: "border-chart-3/40 bg-chart-3/10 text-chart-3",
}

/**
 * 로그 탭 — 날짜별 세션 타임라인. 날짜 구분선(점 + 라벨) 아래에 세로 연결선과
 * 세션 카드(시각 · 요약 · 종류 배지 · 태그)를 얹는다. 원본 담백함을 보완해
 * 종류별 색 배지와 hover 강조를 추가했다.
 */
export function LogsView() {
  const groups = groupLogsByDate(LOG_SESSIONS)

  return (
    <div className="flex flex-col gap-2">
      {groups.map((group) => (
        <section key={group.date} aria-label={group.date}>
          <div className="relative mt-5 mb-3 pl-9 font-mono text-[11px] font-medium tracking-widest text-muted-foreground uppercase first:mt-0">
            <span className="absolute top-1/2 left-2.5 size-3 -translate-y-1/2 rounded-full border-2 border-card bg-primary" />
            {group.date}
          </div>

          <div className="relative flex flex-col gap-3 pl-9 before:absolute before:top-0 before:bottom-0 before:left-[0.9375rem] before:w-px before:bg-border">
            {group.sessions.map((session) => {
              const Icon = KIND_ICON[session.kind]
              return (
                <article key={session.id} className="group relative">
                  <span className="absolute top-3.5 -left-[1.4375rem] size-2.5 rounded-full border-2 border-card bg-muted-foreground/50 transition-colors group-hover:bg-primary" />
                  <div className="flex min-w-0 flex-col gap-1.5 rounded-lg border border-border bg-card p-3.5 transition-colors hover:border-primary/40 hover:shadow-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                        <ClockIcon size={12} aria-hidden />
                        {session.time}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium",
                          KIND_STYLE[session.kind]
                        )}
                      >
                        <Icon size={11} weight="bold" aria-hidden />
                        {session.kind}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                      {session.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-muted-foreground">{session.summary}</p>
                    <div className="flex flex-wrap items-center gap-1 pt-0.5">
                      {session.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 rounded border border-border px-1.5 text-[10px] text-muted-foreground"
                        >
                          <TagIcon size={9} aria-hidden />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
