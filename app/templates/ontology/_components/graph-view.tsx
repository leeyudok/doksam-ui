"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import {
  DEGREE,
  EDGES,
  NODES,
  NODE_BY_ID,
  POSITIONS,
  TYPE_BY_ID,
  VIEW_H,
  VIEW_W,
} from "../_data/graph"
import { matchesQuery } from "./highlight"
import { NodeDetailPanel } from "./node-detail-panel"

/**
 * 그래프 탭 — 결정론적 force 레이아웃(모듈 시점 사전 계산)의 SVG 지식 그래프.
 * 노드 선택 시 이웃 외 노드를 감쇠(dim)하고 인접 엣지를 강조한다. 검색어가
 * 있으면 매칭 노드에 프라이머리 링을 씌우고 나머지를 감쇠한다. 우측(모바일은
 * 아래)에 선택 노드의 참조/피참조 상세 패널을 둔다.
 */
export function GraphView({
  query,
  activeTypes,
  selectedId,
  onSelect,
}: Readonly<{
  query: string
  activeTypes: ReadonlySet<string>
  selectedId: string | null
  onSelect: (id: string | null) => void
}>) {
  const visible = React.useMemo(
    () => new Set(NODES.filter((n) => activeTypes.has(n.type)).map((n) => n.id)),
    [activeTypes],
  )
  const neighbors = React.useMemo(() => {
    if (!selectedId) return null
    const set = new Set([selectedId])
    for (const e of EDGES) {
      if (e.from === selectedId) set.add(e.to)
      if (e.to === selectedId) set.add(e.from)
    }
    return set
  }, [selectedId])
  const q = query.trim()
  const matched = React.useMemo(
    () => (q ? new Set(NODES.filter((n) => matchesQuery(n, q)).map((n) => n.id)) : null),
    [q],
  )

  const selected = selectedId ? (NODE_BY_ID[selectedId] ?? null) : null

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="지식 그래프 네트워크"
        className="h-auto w-full rounded-lg border border-border bg-card"
      >
        {EDGES.map((e, i) => {
          if (!visible.has(e.from) || !visible.has(e.to)) return null
          const a = POSITIONS[e.from]
          const b = POSITIONS[e.to]
          const highlighted = selectedId !== null && (e.from === selectedId || e.to === selectedId)
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className={cn(
                highlighted
                  ? "stroke-primary opacity-90"
                  : e.kind === "issue"
                    ? "stroke-muted-foreground opacity-20"
                    : e.kind === "wiki"
                      ? "stroke-chart-2 opacity-45"
                      : "stroke-muted-foreground opacity-40",
              )}
              strokeWidth={highlighted ? 1.8 : e.kind === "issue" ? 0.7 : 1.1}
            />
          )
        })}
        {NODES.map((node) => {
          if (!visible.has(node.id)) return null
          const pos = POSITIONS[node.id]
          const type = TYPE_BY_ID[node.type]
          const r =
            node.type === "issue" ? 5 : Math.min(14, 7 + (DEGREE[node.id] ?? 0) * 0.7)
          const isSelected = node.id === selectedId
          const dimmed =
            (neighbors !== null && !neighbors.has(node.id)) ||
            (matched !== null && !matched.has(node.id))
          return (
            <g
              key={node.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={node.label}
              onClick={() => onSelect(isSelected ? null : node.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onSelect(isSelected ? null : node.id)
                }
              }}
              className={cn(
                "cursor-pointer outline-none transition-opacity focus-visible:opacity-100",
                dimmed && "opacity-15",
              )}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={r}
                className={cn(
                  type.fill,
                  isSelected ? "stroke-foreground" : "stroke-background",
                  matched?.has(node.id) && "stroke-primary",
                )}
                strokeWidth={isSelected || matched?.has(node.id) ? 2.5 : 1.5}
              />
              <text
                x={pos.x}
                y={pos.y + r + 11}
                textAnchor="middle"
                className={cn(
                  "fill-foreground",
                  node.type === "root" ? "text-[11px] font-bold" : "text-[9px]",
                )}
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>

      <NodeDetailPanel node={selected} onSelect={onSelect} />
    </div>
  )
}
