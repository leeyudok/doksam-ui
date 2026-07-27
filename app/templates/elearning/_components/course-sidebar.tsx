"use client"

import { CheckCircleIcon, PlayCircleIcon } from "@phosphor-icons/react/dist/ssr"

import { CircularProgress } from "@/components/circular-progress"
import { cn } from "@/lib/utils"

import { COURSE, formatDuration } from "../_data/course"

/**
 * 좌측 코스 사이드바 — 챕터 그룹별 강의 리스트. 완료 강의는 체크, 현재 강의는
 * 하이라이트한다. 상단에 원형 진행률(circular-progress 재사용)로 전체 진도를 표기.
 * 모바일(< lg)에서는 플레이어 위로 스택되며 리스트가 스크롤 영역이 된다.
 */
export function CourseSidebar({
  currentIndex,
  completedIds,
  progress,
  onSelect,
}: Readonly<{
  currentIndex: number
  completedIds: ReadonlySet<string>
  progress: number
  onSelect: (index: number) => void
}>) {
  return (
    <aside className="flex min-w-0 flex-col gap-4 rounded-lg border border-border bg-card p-4">
      {/* 코스 헤더 + 원형 진행률 */}
      <div className="flex items-center gap-3">
        <CircularProgress value={progress} size={56} strokeWidth={5} />
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-foreground">{COURSE.title}</h2>
          <p className="truncate text-xs text-muted-foreground">{COURSE.subtitle}</p>
        </div>
      </div>

      {/* 챕터 + 강의 리스트 */}
      <nav aria-label="강의 목록" className="flex max-h-[28rem] flex-col gap-4 overflow-y-auto pr-1 lg:max-h-[60vh]">
        {COURSE.chapters.map((chapter) => (
          <div key={chapter.id} className="flex flex-col gap-1.5">
            <h3 className="px-1 text-xs font-semibold tracking-tight text-muted-foreground">{chapter.title}</h3>
            <ul className="flex flex-col gap-1">
              {chapter.lessons.map((lesson) => {
                const index = lessonIndex(lesson.id)
                const active = index === currentIndex
                const done = completedIds.has(lesson.id)
                return (
                  <li key={lesson.id}>
                    <button
                      type="button"
                      aria-current={active ? "true" : undefined}
                      onClick={() => onSelect(index)}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-md border px-2.5 py-2 text-left transition-colors",
                        active
                          ? "border-primary bg-primary/10"
                          : "border-transparent hover:border-border hover:bg-muted/50",
                      )}
                    >
                      <span className="shrink-0" aria-hidden>
                        {done ? (
                          <CheckCircleIcon weight="fill" className="size-4 text-success" />
                        ) : active ? (
                          <PlayCircleIcon weight="fill" className="size-4 text-primary" />
                        ) : (
                          <span className="ml-0.5 inline-block size-3 rounded-full border border-muted-foreground/40" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block truncate text-xs font-medium",
                            active ? "text-foreground" : "text-foreground/90",
                            done && "text-muted-foreground line-through decoration-muted-foreground/40",
                          )}
                        >
                          {lesson.title}
                        </span>
                      </span>
                      <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                        {formatDuration(lesson.durationSec)}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}

/** 강의 id → 전역 index(플랫 순번). 데이터 순서와 일치. */
function lessonIndex(id: string): number {
  let i = 0
  for (const ch of COURSE.chapters) {
    for (const l of ch.lessons) {
      if (l.id === id) return i
      i += 1
    }
  }
  return -1
}
