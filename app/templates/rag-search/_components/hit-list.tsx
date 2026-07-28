"use client"

import { getChunk, getDocument } from "../_data/corpus"
import type { SearchHit } from "../_data/queries"

/** 청크 본문에서 하이라이트 부분 문자열을 <mark> 로 감싼다. */
function highlight(text: string, parts: string[]) {
  if (parts.length === 0) return text
  // 한 하이라이트가 다른 것의 접두사면 긴 쪽이 먼저 매칭돼야 한다.
  const ordered = [...parts].sort((a, b) => b.length - a.length)
  const pattern = ordered.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")
  const segments = text.split(new RegExp(`(${pattern})`, "g"))
  return segments.map((seg, i) =>
    parts.includes(seg) ? (
      <mark key={`${seg}-${i}`} className="rounded-sm bg-warning/25 px-0.5 text-foreground">
        {seg}
      </mark>
    ) : (
      seg
    ),
  )
}

export interface HitListProps {
  hits: SearchHit[]
  selectedChunkId: string | null
  onSelectChunk: (chunkId: string) => void
}

/**
 * 검색 히트 목록 — 청크 본문 하이라이트 · 문서 출처 · 최종 스코어를 한 행으로.
 * 행 클릭이 답변 탭 인용 패널과 공유하는 selectedChunkId 를 바꾼다.
 */
export function HitList({ hits, selectedChunkId, onSelectChunk }: Readonly<HitListProps>) {
  return (
    <ul role="list" aria-label="검색 히트" className="flex flex-col gap-2">
      {hits.map((hit, index) => {
        const chunk = getChunk(hit.chunkId)
        const doc = chunk ? getDocument(chunk.docId) : undefined
        if (!chunk || !doc) return null
        const selected = selectedChunkId === hit.chunkId
        return (
          <li key={hit.chunkId}>
            <button
              type="button"
              aria-pressed={selected}
              onClick={() => onSelectChunk(hit.chunkId)}
              className={`w-full rounded-lg border p-3 text-left transition-colors ${
                selected ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium text-foreground">
                  #{index + 1} {doc.title}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{hit.score.toFixed(2)}</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {highlight(chunk.text, hit.highlights)}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {doc.source} · 청크 {chunk.ordinal}/{doc.chunkIds.length} · {chunk.tokens} tokens
              </p>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
