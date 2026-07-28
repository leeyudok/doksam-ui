"use client"

import { JsonTree } from "@/components/json-tree"

import { getChunk, getDocument } from "../_data/corpus"

export interface CitationPanelProps {
  chunkId: string | null
}

/**
 * 인용 근거 패널 — 선택된 청크의 원문과 출처 메타데이터를 보여준다.
 * 하단 JsonTree 는 이 청크가 검색 결과에서 어떤 형태로 오는지(원시 문서)를
 * 그대로 노출해 디버깅 관점을 제공한다.
 */
export function CitationPanel({ chunkId }: Readonly<CitationPanelProps>) {
  const chunk = chunkId ? getChunk(chunkId) : undefined
  const doc = chunk ? getDocument(chunk.docId) : undefined

  if (!chunk || !doc) {
    return (
      <div className="rounded-lg border border-border p-3">
        <p className="text-xs text-muted-foreground">인용 배지를 누르면 근거 원문이 여기에 열립니다.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border p-3">
      <div>
        <h3 className="text-sm font-medium text-foreground">{doc.title}</h3>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {doc.source} · 청크 {chunk.ordinal}/{doc.chunkIds.length} · {doc.updatedAt} 갱신
        </p>
      </div>
      <p aria-label="인용 원문" className="text-xs leading-relaxed text-foreground">
        {chunk.text}
      </p>
      <JsonTree
        rootLabel={chunk.id}
        data={{
          docId: chunk.docId,
          category: doc.category,
          ordinal: chunk.ordinal,
          tokens: chunk.tokens,
        }}
      />
    </div>
  )
}
