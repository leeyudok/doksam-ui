"use client"

import * as React from "react"
import { BookOpenTextIcon, GraphIcon, MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr"

import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

import { NODES, NODE_TYPES } from "../_data/graph"
import { DictionaryView } from "./dictionary-view"
import { GraphView } from "./graph-view"
import { matchesQuery } from "./highlight"

/**
 * 온톨로지 콘솔 상태 소유자 — 검색어·타입 필터·선택 노드를 들고 사전/그래프
 * 두 탭에 같은 상태를 공급한다. 툴바(검색+타입 칩+카운트)는 탭 밖에 두어
 * 어느 탭에서든 같은 필터가 적용되게 한다.
 */
export function OntologyConsole() {
  const [query, setQuery] = React.useState("")
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  // 비활성화(off)된 타입 집합. 나머지가 activeTypes 가 된다.
  const [disabled, setDisabled] = React.useState<ReadonlySet<string>>(() => new Set())

  const activeTypes = React.useMemo(
    () => new Set(NODE_TYPES.filter((t) => !disabled.has(t.id)).map((t) => t.id)),
    [disabled],
  )

  const toggleType = (id: string) => {
    setDisabled((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const shownCount = NODES.filter((n) => activeTypes.has(n.type) && matchesQuery(n, query)).length

  return (
    <div className="flex flex-col gap-4">
      {/* 검색 + 타입 필터 툴바 */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-full max-w-xs">
            <MagnifyingGlassIcon
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="문서 검색 (이름·경로·설명)"
              aria-label="문서 검색"
              className="h-9 pl-8"
            />
          </div>
          <span className="text-xs whitespace-nowrap text-muted-foreground" aria-live="polite">
            {shownCount} / {NODES.length} 문서
          </span>
        </div>

        <ul className="flex flex-wrap gap-1.5" aria-label="타입 필터">
          {NODE_TYPES.map((type) => {
            const active = !disabled.has(type.id)
            return (
              <li key={type.id}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleType(type.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors",
                    active
                      ? "border-border bg-card text-foreground"
                      : "border-transparent bg-muted text-muted-foreground opacity-60",
                  )}
                >
                  <span className={cn("size-2 rounded-xs", type.dot)} aria-hidden />
                  {type.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <Tabs defaultValue="dictionary" className="w-full gap-4">
        <TabsList className="h-9 w-full max-w-xs">
          <TabsTrigger value="dictionary">
            <BookOpenTextIcon aria-hidden />
            사전
          </TabsTrigger>
          <TabsTrigger value="graph">
            <GraphIcon aria-hidden />
            그래프
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dictionary">
          <DictionaryView
            query={query}
            activeTypes={activeTypes}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId(id)}
          />
        </TabsContent>
        <TabsContent value="graph">
          <GraphView
            query={query}
            activeTypes={activeTypes}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
