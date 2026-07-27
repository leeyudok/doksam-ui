"use client"

import { useState } from "react"
import { CaretDownIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr"

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

const PAGE_SIZE = 20

function typeOf(value: JsonValue): "string" | "number" | "boolean" | "null" | "array" | "object" {
  if (value === null) return "null"
  if (Array.isArray(value)) return "array"
  return typeof value as "string" | "number" | "boolean" | "object"
}

function PrimitiveValue({ value }: Readonly<{ value: JsonValue }>) {
  const kind = typeOf(value)
  if (kind === "string") {
    return <span className="text-chart-1">&quot;{value as string}&quot;</span>
  }
  if (kind === "number") {
    return <span className="text-chart-2">{value as number}</span>
  }
  if (kind === "boolean") {
    return <span className="text-chart-3">{String(value)}</span>
  }
  return <span className="text-muted-foreground">null</span>
}

function JsonNode({
  label,
  value,
  depth,
  defaultExpanded,
}: Readonly<{ label: string; value: JsonValue; depth: number; defaultExpanded: boolean }>) {
  const kind = typeOf(value)
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  if (kind !== "array" && kind !== "object") {
    return (
      <div className="flex items-start gap-1.5 py-0.5 pl-5 font-mono text-xs">
        <span className="text-foreground">{label}</span>
        <span className="text-muted-foreground">:</span>
        <PrimitiveValue value={value} />
      </div>
    )
  }

  const entries = kind === "array" ? (value as JsonValue[]).map((v, i) => [String(i), v] as const) : Object.entries(value as Record<string, JsonValue>)
  const visibleEntries = entries.slice(0, visibleCount)
  const remaining = entries.length - visibleEntries.length
  const bracket = kind === "array" ? ["[", "]"] : ["{", "}"]

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="flex items-center gap-1 py-0.5 font-mono text-xs hover:bg-accent/50"
      >
        {expanded ? (
          <CaretDownIcon size={12} className="shrink-0 text-muted-foreground" />
        ) : (
          <CaretRightIcon size={12} className="shrink-0 text-muted-foreground" />
        )}
        <span className="text-foreground">{label}</span>
        <span className="text-muted-foreground">
          : {bracket[0]}
          {!expanded && `…${bracket[1]}`}
        </span>
        <span className="text-muted-foreground/70">
          {kind === "array" ? `${entries.length}개 항목` : `${entries.length}개 키`}
        </span>
      </button>

      {expanded && (
        <div className="ml-1 flex flex-col border-l border-border">
          {visibleEntries.map(([key, childValue]) => (
            <JsonNode key={key} label={key} value={childValue} depth={depth + 1} defaultExpanded={depth < 1} />
          ))}
          {remaining > 0 && (
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              className="w-fit pl-5 font-mono text-[11px] text-primary hover:underline"
            >
              더 보기 (+{remaining})
            </button>
          )}
          <span className="pl-5 font-mono text-xs text-muted-foreground">{bracket[1]}</span>
        </div>
      )}
    </div>
  )
}

export interface JsonTreeProps {
  /** 렌더링할 JSON 값. */
  data: JsonValue
  /** 루트 노드에 표시할 라벨. */
  rootLabel?: string
}

/**
 * 재귀 JSON 트리 뷰어 — 접기/펼치기, 타입별 색, 대용량 배열은 20개씩 "더 보기"로 분할한다(#26).
 * components/patterns/json-tree/json-tree-demo.tsx 에 묶여있던 재사용 코어를 순수 컴포넌트로
 * 추출해 shadcn 레지스트리 item(json-tree)으로 배포한다.
 */
export function JsonTree({ data, rootLabel = "root" }: Readonly<JsonTreeProps>) {
  return (
    <div className="w-full overflow-x-auto rounded-md border border-border bg-muted/20 p-3">
      <JsonNode label={rootLabel} value={data} depth={0} defaultExpanded />
    </div>
  )
}
