"use client"

import * as React from "react"

import {
  COMPLETED_LESSONS,
  FIRST_INCOMPLETE_INDEX,
  FLAT_LESSONS,
  TOTAL_LESSONS,
} from "../_data/course"
import { CourseSidebar } from "./course-sidebar"
import { LessonPlayer } from "./lesson-player"
import { LessonSummaryDialog } from "./lesson-summary-dialog"

const SPEEDS = [1, 1.25, 1.5, 2] as const
/** 다음 강의 자동 이동까지의 카운트다운 시작 값(초). */
const COUNTDOWN_START = 5

/**
 * 학습 플레이어 상태 소유자 — 사이드바·플레이어·요약 다이얼로그를 조립한다.
 * 현재 강의, 완료 집합, 재생/배속 목업 상태, 자동진행 토글, "다음 강의까지 N초"
 * 카운트다운을 모두 클라이언트 로컬로 관리한다. 실제 타이머는 데모 버튼으로만
 * 트리거되며 영상 재생·진도 전송은 없다(정적 데모).
 * 데스크톱(lg+)은 사이드바 좌 / 플레이어 우 2단, 모바일은 사이드바가 위로 스택된다.
 */
export function ElearningPlayer() {
  const [currentIndex, setCurrentIndex] = React.useState(FIRST_INCOMPLETE_INDEX)
  const [completedIds, setCompletedIds] = React.useState<ReadonlySet<string>>(
    () => new Set(FLAT_LESSONS.filter((l) => l.completed).map((l) => l.id)),
  )
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [speedIndex, setSpeedIndex] = React.useState(0)
  const [autoNext, setAutoNext] = React.useState(true)
  const [countdown, setCountdown] = React.useState<number | null>(null)
  const [summaryOpen, setSummaryOpen] = React.useState(false)

  const currentLesson = FLAT_LESSONS[currentIndex]
  const nextLesson = currentIndex + 1 < TOTAL_LESSONS ? FLAT_LESSONS[currentIndex + 1] : null
  const progress = Math.round((completedIds.size / TOTAL_LESSONS) * 100)

  // 카운트다운 진행 — 1초마다 감소, 1 이하에 닿으면 자동 이동(또는 정지).
  // setState 는 timeout 콜백(비동기) 안에서만 호출해 effect 동기 setState 를 피한다.
  React.useEffect(() => {
    if (countdown === null) return
    const t = setTimeout(() => {
      if (countdown <= 1) {
        setCountdown(null)
        if (autoNext && nextLesson) goToIndex(nextLesson.index)
      } else {
        setCountdown(countdown - 1)
      }
    }, 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown])

  function goToIndex(index: number) {
    setCurrentIndex(index)
    setCountdown(null)
    setIsPlaying(false)
  }

  function markCompleted(id: string) {
    setCompletedIds((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  // 강의 종료 시뮬레이션: 현재 강의 완료 처리 후 카운트다운 시작.
  function simulateEnd() {
    markCompleted(currentLesson.id)
    setIsPlaying(false)
    setCountdown(COUNTDOWN_START)
  }

  function goNext() {
    if (nextLesson) goToIndex(nextLesson.index)
  }

  function toggleAutoNext(checked: boolean) {
    setAutoNext(checked)
    if (!checked) setCountdown(null)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <CourseSidebar
          currentIndex={currentIndex}
          completedIds={completedIds}
          progress={progress}
          onSelect={goToIndex}
        />
        <LessonPlayer
          lesson={currentLesson}
          nextLesson={nextLesson}
          isPlaying={isPlaying}
          speed={SPEEDS[speedIndex]}
          autoNext={autoNext}
          countdown={countdown}
          onTogglePlay={() => setIsPlaying((p) => !p)}
          onCycleSpeed={() => setSpeedIndex((i) => (i + 1) % SPEEDS.length)}
          onToggleAutoNext={toggleAutoNext}
          onSimulateEnd={simulateEnd}
          onCancelCountdown={() => setCountdown(null)}
          onGoNext={goNext}
          onOpenSummary={() => setSummaryOpen(true)}
        />
      </div>

      <p className="text-center text-xs text-muted-foreground">
        완료 {completedIds.size}/{TOTAL_LESSONS} · 초기 진도 {COMPLETED_LESSONS}강 수료 · 가상 데이터 · 데모
      </p>

      <LessonSummaryDialog lesson={currentLesson} open={summaryOpen} onOpenChange={setSummaryOpen} />
    </div>
  )
}
