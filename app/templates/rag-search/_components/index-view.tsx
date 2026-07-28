"use client"

import { LogViewer } from "@/components/log-viewer"
import { StageProgressBoard } from "@/components/stage-progress-board"
import { SummaryCard } from "@/components/summary-card"

import { INDEX_FAILURES, INDEX_STAGES, INDEX_STATS } from "../_data/pipeline"

/**
 * 색인 탭 — 수집→변환→청킹→임베딩→색인 파이프라인 진행, 인덱스 통계 타일,
 * 최근 색인 실패 로그. 실패 로그의 문서 id 는 corpus.ts 의 실제 문서를 가리켜
 * 세 탭이 한 시스템으로 읽히게 한다.
 */
export function IndexView() {
  return (
    <div className="flex flex-col gap-4">
      <StageProgressBoard stages={INDEX_STAGES} />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {INDEX_STATS.map((stat) => (
          <SummaryCard key={stat.label} label={stat.label} value={stat.value} unit={stat.unit} />
        ))}
      </div>

      <section className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-foreground">최근 색인 실패</h3>
        <LogViewer entries={INDEX_FAILURES} />
      </section>
    </div>
  )
}
