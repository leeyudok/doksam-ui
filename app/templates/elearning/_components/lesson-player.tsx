"use client"

import {
  ArrowClockwiseIcon,
  FilmSlateIcon,
  GaugeIcon,
  PauseIcon,
  PlayIcon,
  SkipForwardIcon,
  SparkleIcon,
  SpeakerHighIcon,
} from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

import { formatDuration, type FlatLesson } from "../_data/course"

/**
 * 중앙 플레이어 — 16:9 placeholder(실 video 태그·재생 없음, 정적 데모)와 재생/배속/
 * 볼륨 목업 컨트롤 바. 자동진행 토글과 "다음 강의까지 N초" 카운트다운 UI, AI 요약
 * 버튼을 포함한다. 모든 상태는 상위(ElearningPlayer)가 소유하고 여기선 표시만 한다.
 */
export function LessonPlayer({
  lesson,
  nextLesson,
  isPlaying,
  speed,
  autoNext,
  countdown,
  onTogglePlay,
  onCycleSpeed,
  onToggleAutoNext,
  onSimulateEnd,
  onCancelCountdown,
  onGoNext,
  onOpenSummary,
}: Readonly<{
  lesson: FlatLesson
  nextLesson: FlatLesson | null
  isPlaying: boolean
  speed: number
  autoNext: boolean
  countdown: number | null
  onTogglePlay: () => void
  onCycleSpeed: () => void
  onToggleAutoNext: (checked: boolean) => void
  onSimulateEnd: () => void
  onCancelCountdown: () => void
  onGoNext: () => void
  onOpenSummary: () => void
}>) {
  const counting = countdown !== null

  return (
    <div className="flex min-w-0 flex-col gap-4">
      {/* 강의 제목 + 배속 배지 */}
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="min-w-0 flex-1 truncate text-base font-semibold text-foreground">{lesson.title}</h2>
        <Badge variant="secondary">강의 {lesson.index + 1}</Badge>
        <Badge variant="outline">{formatDuration(lesson.durationSec)}</Badge>
      </div>

      {/* 16:9 플레이어 placeholder — 실제 재생 없음 */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-gradient-to-br from-muted to-muted/40">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <FilmSlateIcon className="size-10 opacity-60" aria-hidden />
          <p className="text-xs">영상 미리보기 (데모 · 실제 재생 없음)</p>
        </div>

        {/* 카운트다운 오버레이 */}
        {counting && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/85 backdrop-blur-sm">
            <p className="text-xs text-muted-foreground">
              {nextLesson ? "다음 강의로 자동 이동" : "코스의 마지막 강의입니다"}
            </p>
            <p className="text-4xl font-bold tabular-nums text-primary" aria-live="polite">
              {countdown}
            </p>
            {nextLesson && <p className="max-w-xs truncate px-4 text-sm text-foreground">{nextLesson.title}</p>}
            <div className="flex gap-2">
              {nextLesson && (
                <Button size="sm" onClick={onGoNext}>
                  <SkipForwardIcon aria-hidden /> 지금 이동
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={onCancelCountdown}>
                취소
              </Button>
            </div>
          </div>
        )}

        {/* 재생/일시정지 중앙 버튼 */}
        {!counting && (
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={isPlaying ? "일시정지" : "재생"}
            className="absolute inset-0 flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-105">
              {isPlaying ? (
                <PauseIcon weight="fill" className="size-6" aria-hidden />
              ) : (
                <PlayIcon weight="fill" className="size-6" aria-hidden />
              )}
            </span>
          </button>
        )}
      </div>

      {/* 컨트롤 바 목업 */}
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3">
        {/* 진행 트랙 목업 */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] tabular-nums text-muted-foreground">0:00</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-1/3 rounded-full bg-primary" />
          </div>
          <span className="text-[11px] tabular-nums text-muted-foreground">{formatDuration(lesson.durationSec)}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="ghost" onClick={onTogglePlay} aria-label={isPlaying ? "일시정지" : "재생"}>
            {isPlaying ? <PauseIcon weight="fill" aria-hidden /> : <PlayIcon weight="fill" aria-hidden />}
          </Button>
          <Button size="sm" variant="ghost" onClick={onCycleSpeed} aria-label="배속 변경">
            <GaugeIcon aria-hidden />
            <span className="tabular-nums">{speed}x</span>
          </Button>
          {/* 볼륨 목업 */}
          <div className="flex items-center gap-2 text-muted-foreground" aria-hidden>
            <SpeakerHighIcon className="size-4" />
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-2/3 rounded-full bg-muted-foreground/60" />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={onOpenSummary}>
              <SparkleIcon weight="fill" aria-hidden /> AI 요약
            </Button>
          </div>
        </div>
      </div>

      {/* 자동진행 토글 + 데모 트리거 */}
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-3">
        <label className="flex items-center gap-2 text-sm">
          <Switch checked={autoNext} onCheckedChange={onToggleAutoNext} aria-label="자동 재생" />
          <span className={cn("font-medium", autoNext ? "text-foreground" : "text-muted-foreground")}>자동 재생</span>
        </label>
        <span className="text-xs text-muted-foreground">
          강의 종료 후 {autoNext ? "다음 강의로 자동 이동합니다" : "멈춥니다"}.
        </span>
        <Button
          size="sm"
          variant="secondary"
          className="ml-auto"
          onClick={onSimulateEnd}
          disabled={counting}
        >
          <ArrowClockwiseIcon aria-hidden /> 강의 종료 시뮬레이션
        </Button>
      </div>
    </div>
  )
}
