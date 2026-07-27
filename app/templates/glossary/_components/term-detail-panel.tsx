"use client"

import { GraphIcon, XIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

import { ADJACENCY, CATEGORY_BY_ID, TERM_BY_ID, type Term } from "../_data/terms"

export interface TermDetailPanelProps {
  /** 선택된 용어(없으면 안내 문구). */
  term: Term | null
  /** 관련 용어 pill 클릭 → 해당 용어로 점프. */
  onSelect: (id: string) => void
  /** 패널 닫기(선택 해제). */
  onClose: () => void
}

/**
 * 선택 용어 상세 패널 — 약어·풀네임·카테고리 배지·정의·관련 용어 pill 로 구성.
 * 관련 용어 pill 클릭 시 해당 노드로 점프한다. lg 미만에선 그래프 하단에 스택으로
 * 놓이도록 부모(glossary-explorer)가 배치하고, 여기서는 컨텐츠만 렌더한다.
 */
export function TermDetailPanel({ term, onSelect, onClose }: Readonly<TermDetailPanelProps>) {
  if (!term) {
    return (
      <div className="flex h-full min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card/60 p-8 text-center">
        <GraphIcon className="size-8 text-muted-foreground" weight="duotone" aria-hidden />
        <p className="text-sm leading-relaxed text-muted-foreground">
          노드를 클릭하면
          <br />
          상세 설명과 연결된 용어가 표시됩니다.
        </p>
      </div>
    )
  }

  const cat = CATEGORY_BY_ID[term.category]
  const related = [...(ADJACENCY[term.id] ?? [])]
    .map((id) => TERM_BY_ID[id])
    .filter(Boolean)
    .sort((a, b) => a.abbr.localeCompare(b.abbr))

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card">
      <div className="flex items-start justify-between gap-3 border-b border-border p-5">
        <div className="min-w-0">
          <span
            className={cn(
              "mb-2.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground",
              cat.dot,
            )}
          >
            {cat.label}
          </span>
          <h2 className="text-xl font-bold tracking-tight break-words text-foreground">{term.abbr}</h2>
          {term.full ? <p className={cn("mt-1 text-sm font-medium", cat.text)}>{term.full}</p> : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="상세 패널 닫기"
          className="shrink-0 rounded-md border border-border p-1.5 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
        >
          <XIcon className="size-4" aria-hidden />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground">정의</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/90">{term.description}</p>

        {related.length > 0 ? (
          <div className="mt-6">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">관련 용어 · {related.length}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {related.map((r) => {
                const rc = CATEGORY_BY_ID[r.category]
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => onSelect(r.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/60 px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:bg-muted"
                  >
                    <span className={cn("size-2 shrink-0 rounded-full", rc.dot)} aria-hidden />
                    {r.abbr}
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
