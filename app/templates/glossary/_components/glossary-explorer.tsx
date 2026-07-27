"use client"

import * as React from "react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { CATEGORIES, TERMS, TERM_BY_ID } from "../_data/terms"
import { TermDetailPanel } from "./term-detail-panel"
import { TermNetwork } from "./term-network"

/**
 * Term Network Explorer 상태 소유자(#51) — 검색어·카테고리 필터·선택 용어를 들고
 * TermNetwork(그래프)와 TermDetailPanel(상세)을 조립한다. 데스크톱(lg+)은 그래프 +
 * 우측 패널 2단, 모바일은 그래프 위 / 패널 아래 스택 배치다.
 */
export function GlossaryExplorer() {
  const [query, setQuery] = React.useState("")
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  // 비활성화(off)된 카테고리 집합. 나머지가 activeCategories 가 된다.
  const [disabled, setDisabled] = React.useState<ReadonlySet<string>>(() => new Set())

  const activeCategories = React.useMemo(
    () => new Set(CATEGORIES.filter((c) => !disabled.has(c.id)).map((c) => c.id)),
    [disabled],
  )

  const toggleCategory = (id: string) => {
    setDisabled((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectedTerm = selectedId ? (TERM_BY_ID[selectedId] ?? null) : null

  return (
    <div className="flex flex-col gap-4">
      {/* 검색 + 범례 필터 */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-xs">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="용어 검색 (약어·풀네임·정의)"
            aria-label="용어 검색"
            className="h-9 pl-8"
          />
        </div>

        <ul className="flex flex-wrap gap-1.5" aria-label="카테고리 필터">
          {CATEGORIES.map((cat) => {
            const off = disabled.has(cat.id)
            const count = TERMS.filter((t) => t.category === cat.id).length
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  aria-pressed={!off}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                    off
                      ? "border-border/60 text-muted-foreground/60"
                      : "border-border text-foreground hover:border-primary",
                  )}
                >
                  <span className={cn("size-2 rounded-full", cat.dot, off && "opacity-40")} aria-hidden />
                  {cat.label}
                  <span className="text-[10px] tabular-nums opacity-60">{count}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* 그래프 + 상세 패널 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <TermNetwork
          selectedId={selectedId}
          query={query}
          activeCategories={activeCategories}
          onSelect={setSelectedId}
        />
        <TermDetailPanel term={selectedTerm} onSelect={setSelectedId} onClose={() => setSelectedId(null)} />
      </div>
    </div>
  )
}
