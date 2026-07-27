"use client"

import { SparkleIcon } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import type { FlatLesson } from "../_data/course"

/**
 * AI 요약 다이얼로그 — 현재 강의의 요약 bullet을 모달로 보여준다. 실제 LLM 호출은
 * 없고 데이터에 담긴 정적 요약을 노출하는 데모다(ui/dialog 재사용).
 */
export function LessonSummaryDialog({
  lesson,
  open,
  onOpenChange,
}: Readonly<{
  lesson: FlatLesson | null
  open: boolean
  onOpenChange: (open: boolean) => void
}>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SparkleIcon weight="fill" className="size-4 text-primary" aria-hidden />
            AI 강의 요약
          </DialogTitle>
          <DialogDescription>
            {lesson ? `${lesson.title} 핵심 내용을 3줄로 정리했어요.` : "강의를 선택하면 요약이 표시됩니다."}
          </DialogDescription>
        </DialogHeader>

        {lesson ? (
          <ul className="flex flex-col gap-2.5">
            {lesson.summary.map((point, i) => (
              <li key={i} className="flex gap-2.5 rounded-md border border-border bg-muted/40 p-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-semibold text-primary tabular-nums">
                  {i + 1}
                </span>
                <p className="text-xs leading-relaxed text-foreground">{point}</p>
              </li>
            ))}
          </ul>
        ) : null}

        <p className="text-[11px] text-muted-foreground">가상 데이터 · 실제 자막 분석 결과가 아닙니다.</p>

        <Button variant="outline" size="sm" className="w-full" onClick={() => onOpenChange(false)}>
          닫기
        </Button>
      </DialogContent>
    </Dialog>
  )
}
