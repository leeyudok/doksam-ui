"use client"

import * as React from "react"
import { ArrowLeftIcon, ArrowRightIcon, CursorClickIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import { EDGES, NODE_BY_ID, TYPE_BY_ID, type OntologyNode } from "../_data/graph"

/**
 * 그래프 탭 우측 상세 패널 — 선택 노드의 타입 배지·경로·설명과 참조(→)/피참조(←)
 * 목록을 보여준다. 참조 pill 클릭 시 그 노드로 선택을 옮겨 그래프를 항해한다.
 */
export function NodeDetailPanel({
  node,
  onSelect,
}: Readonly<{
  node: OntologyNode | null
  onSelect: (id: string) => void
}>) {
  if (!node) {
    return (
      <aside className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card p-6 text-center text-muted-foreground">
        <CursorClickIcon className="size-6" aria-hidden />
        <p className="text-[13px] leading-relaxed">
          노드를 클릭하면
          <br />
          상세 설명과 연결 문서가 표시됩니다.
        </p>
      </aside>
    )
  }

  const type = TYPE_BY_ID[node.type]
  const outgoing = EDGES.filter((e) => e.from === node.id).map((e) => NODE_BY_ID[e.to])
  const incoming = EDGES.filter((e) => e.to === node.id).map((e) => NODE_BY_ID[e.from])

  return (
    <aside className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4" aria-label="노드 상세">
      <div className="flex flex-col gap-1.5">
        <Badge variant="secondary" className="w-fit gap-1.5 text-[10px]">
          <span className={cn("size-1.5 rounded-xs", type.dot)} aria-hidden />
          {type.label}
          {node.kind ? ` · ${node.kind}` : ""}
        </Badge>
        <h3 className="text-base font-semibold">{node.label}</h3>
        <p className="font-mono text-[11px] break-all text-muted-foreground">{node.path}</p>
      </div>
      <p className="text-[13px] leading-relaxed text-muted-foreground">{node.description}</p>

      <RelationList label="참조" icon={<ArrowRightIcon className="size-3" aria-hidden />} nodes={outgoing} onSelect={onSelect} />
      <RelationList label="피참조" icon={<ArrowLeftIcon className="size-3" aria-hidden />} nodes={incoming} onSelect={onSelect} />
    </aside>
  )
}

function RelationList({
  label,
  icon,
  nodes,
  onSelect,
}: Readonly<{
  label: string
  icon: React.ReactNode
  nodes: OntologyNode[]
  onSelect: (id: string) => void
}>) {
  if (nodes.length === 0) return null
  return (
    <div className="flex flex-col gap-1.5">
      <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
        {icon}
        {label} {nodes.length}건
      </span>
      <ul className="flex flex-wrap gap-1.5">
        {nodes.map((n) => (
          <li key={n.id}>
            <button
              type="button"
              onClick={() => onSelect(n.id)}
              className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs transition-colors hover:border-primary hover:text-foreground"
            >
              <span className={cn("size-1.5 rounded-xs", TYPE_BY_ID[n.type].dot)} aria-hidden />
              {n.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
