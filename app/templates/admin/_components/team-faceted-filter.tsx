"use client"

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export interface FacetGroup {
  key: string
  label: string
  /** themes 토큰 접미사(chart-1 등) — 하드코딩 hex 대신 CSS 변수 기반 클래스로 렌더한다. */
  color: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5"
}

const COLOR_CLASS: Record<FacetGroup["color"], { bg: string; border: string }> = {
  "chart-1": { bg: "bg-chart-1", border: "border-chart-1" },
  "chart-2": { bg: "bg-chart-2", border: "border-chart-2" },
  "chart-3": { bg: "bg-chart-3", border: "border-chart-3" },
  "chart-4": { bg: "bg-chart-4", border: "border-chart-4" },
  "chart-5": { bg: "bg-chart-5", border: "border-chart-5" },
}

interface TeamFacetedFilterProps {
  groups: FacetGroup[]
  counts: Record<string, number>
  totalCount: number
  value: string
  onChange: (next: string) => void
}

/**
 * components/patterns/faceted-filter/faceted-filter-demo.tsx를 일반화한 버전 —
 * 원본 데모는 그룹 색을 인라인 hex(style={{backgroundColor}})로 하드코딩했지만,
 * 이 템플릿은 하드코딩색 0 규칙을 지키기 위해 chart-1..5 CSS 변수 기반 유틸리티
 * 클래스만 사용한다(themes/*.ts가 단일 진실원천).
 */
export function TeamFacetedFilter({ groups, counts, totalCount, value, onChange }: Readonly<TeamFacetedFilterProps>) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
      <FacetChip active={value === ""} onClick={() => onChange("")}>
        전체
        <CountBadge active={value === ""}>{totalCount}</CountBadge>
      </FacetChip>
      {groups.map((group) => (
        <FacetChip
          key={group.key}
          active={value === group.key}
          colorClass={COLOR_CLASS[group.color]}
          onClick={() => onChange(group.key)}
        >
          {group.label}
          <CountBadge active={value === group.key}>{counts[group.key] ?? 0}</CountBadge>
        </FacetChip>
      ))}
    </div>
  )
}

function FacetChip({
  active,
  colorClass,
  onClick,
  children,
}: Readonly<{
  active: boolean
  colorClass?: { bg: string; border: string }
  onClick: () => void
  children: ReactNode
}>) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1 text-[12px] font-medium transition-colors",
        active && colorClass
          ? cn(colorClass.bg, colorClass.border, "text-background")
          : active
            ? "border-transparent bg-primary text-primary-foreground"
            : "border-border bg-card text-foreground hover:bg-accent",
      )}
    >
      {children}
    </button>
  )
}

function CountBadge({ active, children }: Readonly<{ active: boolean; children: ReactNode }>) {
  return (
    <span className={cn("font-mono text-[10px]", active ? "text-background/80" : "text-muted-foreground")}>
      {children}
    </span>
  )
}
