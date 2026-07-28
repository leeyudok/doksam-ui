"use client"

import { BadgeExtended } from "@/components/badge-extended"

import { getAnswer } from "../_data/answers"
import { CitationPanel } from "./citation-panel"

export interface AnswerViewProps {
  queryId: string
  selectedChunkId: string | null
  onSelectChunk: (chunkId: string) => void
}

/** 신뢰도 구간 → BadgeExtended variant. 시맨틱 토큰 기반 3단계. */
function confidenceVariant(confidence: number) {
  if (confidence >= 0.85) return "success" as const
  if (confidence >= 0.6) return "warning" as const
  return "danger" as const
}

/**
 * 답변 탭 — 좌측은 문장별 인용 배지가 달린 생성 답변, 우측은 선택된 인용의
 * 원문 청크. 인용 배지 클릭이 검색 탭과 공유하는 selectedChunkId 를 바꾼다.
 */
export function AnswerView({ queryId, selectedChunkId, onSelectChunk }: Readonly<AnswerViewProps>) {
  const answer = getAnswer(queryId)
  if (!answer) return null

  const fallbackChunkId = answer.sentences.flatMap((s) => s.citationChunkIds)[0] ?? null
  const shownChunkId = selectedChunkId ?? fallbackChunkId

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <section className="flex min-w-0 flex-col gap-3">
        <div className="flex items-center gap-2">
          <BadgeExtended variant={confidenceVariant(answer.confidence)}>
            신뢰도 {Math.round(answer.confidence * 100)}%
          </BadgeExtended>
          <span className="text-xs text-muted-foreground">{answer.confidenceNote}</span>
        </div>

        <div className="rounded-lg border border-border p-3">
          <p className="text-sm leading-loose text-foreground">
            {answer.sentences.map((sentence) => (
              <span key={sentence.id}>
                {sentence.text}{" "}
                {sentence.citationChunkIds.map((chunkId) => (
                  <button
                    key={chunkId}
                    type="button"
                    aria-pressed={shownChunkId === chunkId}
                    aria-label={`근거 ${chunkId}`}
                    onClick={() => onSelectChunk(chunkId)}
                    className={`mr-1 rounded px-1 font-mono text-[11px] transition-colors ${
                      shownChunkId === chunkId
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-primary/20"
                    }`}
                  >
                    {chunkId}
                  </button>
                ))}
              </span>
            ))}
          </p>
        </div>
      </section>

      <aside className="min-w-0">
        <CitationPanel chunkId={shownChunkId} />
      </aside>
    </div>
  )
}
