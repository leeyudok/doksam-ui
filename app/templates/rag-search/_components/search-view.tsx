"use client"

import { useMemo, useState } from "react"

import { CodeBlock } from "@/components/code-block"
import { ContributionBars } from "@/components/contribution-bars"
import { EmptyState } from "@/components/empty-state"
import { MultiSelect } from "@/components/multi-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { getChunk, getDocument } from "../_data/corpus"
import type { RagQuery } from "../_data/queries"
import { HitList } from "./hit-list"

export interface SearchViewProps {
  queries: RagQuery[]
  selectedQueryId: string
  query: RagQuery
  selectedChunkId: string | null
  onSelectQuery: (queryId: string) => void
  onSelectChunk: (chunkId: string) => void
}

/**
 * 검색 탭 — 상단은 질의 선택, 좌측은 패싯 필터 + 히트 목록, 우측은 선택
 * 히트의 점수 분해와 질의 DSL. 점수 분해는 contribution-bars 로, BM25·벡터·
 * rerank 기여도를 같은 축에서 비교해 하이브리드 검색의 재정렬 효과를 드러낸다.
 * 질의 선택 상태는 이 컴포넌트가 아니라 RagConsole 이 소유하며, 여기서는
 * onSelectQuery 콜백으로만 변경을 알린다.
 */
export function SearchView({
  queries,
  selectedQueryId,
  query,
  selectedChunkId,
  onSelectQuery,
  onSelectChunk,
}: Readonly<SearchViewProps>) {
  const categoryFacet = query.facets.find((f) => f.key === "category")
  const [categories, setCategories] = useState<string[]>([])

  const visibleHits = useMemo(() => {
    if (categories.length === 0) return query.hits
    return query.hits.filter((hit) => {
      const chunk = getChunk(hit.chunkId)
      const doc = chunk ? getDocument(chunk.docId) : undefined
      return doc ? categories.includes(doc.category) : false
    })
  }, [query.hits, categories])

  const focused = visibleHits.find((h) => h.chunkId === selectedChunkId) ?? visibleHits[0]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Select value={selectedQueryId} onValueChange={onSelectQuery}>
          <SelectTrigger aria-label="질의 선택" className="w-full max-w-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {queries.map((q) => (
              <SelectItem key={q.id} value={q.id}>
                {q.text}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <section className="flex min-w-0 flex-col gap-3">
          {categoryFacet ? (
            <MultiSelect
              options={categoryFacet.values.map((v) => ({ value: v.value, label: `${v.label} (${v.count})` }))}
              value={categories}
              onValueChange={setCategories}
              placeholder="분류 패싯으로 좁히기"
              searchPlaceholder="분류 검색"
              emptyText="분류 없음"
            />
          ) : null}

          {visibleHits.length > 0 ? (
            <HitList hits={visibleHits} selectedChunkId={selectedChunkId} onSelectChunk={onSelectChunk} />
          ) : (
            <EmptyState
              message="조건에 맞는 청크가 없습니다."
              subtext="패싯 선택을 지우면 전체 히트를 다시 볼 수 있습니다."
              action={{ label: "패싯 초기화", onClick: () => setCategories([]) }}
            />
          )}
        </section>

        <aside className="flex min-w-0 flex-col gap-4">
          <div className="rounded-lg border border-border p-3">
            <h3 className="text-sm font-medium text-foreground">점수 분해</h3>
            {focused ? (
              <>
                <ContributionBars
                  className="mt-3"
                  factors={[
                    { label: "BM25", value: focused.breakdown.bm25 * 100, kind: "lexical" },
                    { label: "벡터", value: focused.breakdown.vector * 100, kind: "semantic" },
                    { label: "rerank", value: focused.breakdown.rerank * 100, kind: "rerank" },
                  ]}
                  kindColors={{ lexical: "bg-chart-1", semantic: "bg-chart-2", rerank: "bg-chart-4" }}
                />
                <p className="mt-3 text-xs text-muted-foreground">
                  rerank 전 {focused.breakdown.rankBefore}위 → 후 {focused.breakdown.rankAfter}위
                </p>
              </>
            ) : (
              <p className="mt-3 text-xs text-muted-foreground">선택된 히트가 없습니다.</p>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="mb-2 text-sm font-medium text-foreground">질의 DSL</h3>
            <CodeBlock code={query.dsl} language="json" />
          </div>
        </aside>
      </div>
    </div>
  )
}
