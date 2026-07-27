"use client"

import * as React from "react"
import { FileDashedIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import { NODES, NODE_TYPES, type OntologyNode } from "../_data/graph"
import { Highlight, matchesQuery } from "./highlight"

/**
 * 사전 탭 — 타입별 섹션으로 묶인 지식 노드 카드 목록. 검색어 매칭 구간을
 * <mark> 하이라이트하고, 비활성 타입 섹션과 미매칭 카드는 감춘다. 카드를
 * 클릭하면 해당 노드를 선택하고 그래프 탭에서 이어볼 수 있다.
 */
export function DictionaryView({
  query,
  activeTypes,
  selectedId,
  onSelect,
}: Readonly<{
  query: string
  activeTypes: ReadonlySet<string>
  selectedId: string | null
  onSelect: (id: string) => void
}>) {
  const sections = NODE_TYPES.filter((t) => activeTypes.has(t.id))
    .map((t) => ({
      type: t,
      nodes: NODES.filter((n) => n.type === t.id && matchesQuery(n, query)),
    }))
    .filter((s) => s.nodes.length > 0)

  if (sections.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
        <FileDashedIcon className="size-8" aria-hidden />
        <p className="text-sm">검색 결과가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {sections.map(({ type, nodes }) => (
        <section key={type.id} className="flex flex-col gap-3" aria-label={type.label}>
          <h3 className="flex items-center gap-2 border-b border-border pb-2 text-sm font-semibold">
            <span className={cn("size-2 rounded-xs", type.dot)} aria-hidden />
            {type.label}
            <Badge variant="secondary" className="px-1.5 text-[10px]">
              {nodes.length}
            </Badge>
          </h3>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {nodes.map((node) => (
              <DictionaryCard
                key={node.id}
                node={node}
                query={query}
                selected={node.id === selectedId}
                onSelect={onSelect}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

function DictionaryCard({
  node,
  query,
  selected,
  onSelect,
}: Readonly<{
  node: OntologyNode
  query: string
  selected: boolean
  onSelect: (id: string) => void
}>) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(node.id)}
        aria-pressed={selected}
        className={cn(
          "flex h-full w-full flex-col gap-1.5 rounded-lg border bg-card p-4 text-left transition-colors",
          selected ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50",
        )}
      >
        <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-sm font-semibold">
            <Highlight text={node.label} query={query} />
          </span>
          {node.kind ? (
            <Badge variant="outline" className="px-1.5 text-[10px]">
              {node.kind}
            </Badge>
          ) : null}
        </span>
        <span className="font-mono text-[11px] break-all text-muted-foreground">
          <Highlight text={node.path} query={query} />
        </span>
        <span className="text-[13px] leading-relaxed text-muted-foreground">
          <Highlight text={node.description} query={query} />
        </span>
      </button>
    </li>
  )
}
