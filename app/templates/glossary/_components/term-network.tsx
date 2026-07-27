"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { ADJACENCY, CATEGORIES, CATEGORY_BY_ID, EDGES, TERMS, TERM_BY_ID } from "../_data/terms"

const VW = 960
const VH = 720
const CX = VW / 2
const CY = VH / 2
const R_CAT = 250
const RING_GAP = 46

type Point = { x: number; y: number }

/** 각 노드의 연결 차수(허브 판별용). */
const DEGREE: Record<string, number> = Object.fromEntries(TERMS.map((t) => [t.id, ADJACENCY[t.id]?.size ?? 0]))

/**
 * 결정론적 클러스터 방사형 배치 — 물리 시뮬레이션 없이 계산식으로만 좌표를 낸다.
 * 카테고리를 원주에 균등 배치(클러스터 앵커)하고, 각 카테고리 내부는 차수 내림차순
 * 정렬 후 허브를 중심에, 나머지를 동심 링에 슬롯 분배한다. 입력이 상수(TERMS)라
 * 매 렌더 동일 좌표가 나오며 테스트도 안정적이다.
 */
const LAYOUT: Record<string, Point> = (() => {
  const layout: Record<string, Point> = {}
  CATEGORIES.forEach((cat, ci) => {
    const a = (ci / CATEGORIES.length) * Math.PI * 2 - Math.PI / 2
    const cx = CX + Math.cos(a) * R_CAT
    const cy = CY + Math.sin(a) * R_CAT * 0.92
    const members = TERMS.filter((t) => t.category === cat.id).sort(
      (x, y) => DEGREE[y.id] - DEGREE[x.id] || x.id.localeCompare(y.id),
    )
    members.forEach((t, j) => {
      if (j === 0) {
        layout[t.id] = { x: cx, y: cy }
        return
      }
      const k = j - 1
      const ring = 1 + Math.floor(k / 6)
      const slot = k % 6
      // 링마다 절반 슬롯만큼 각도를 어긋내 방사형 겹침을 줄인다.
      const ang = a + Math.PI + (slot / 6) * Math.PI * 2 + (ring % 2) * (Math.PI / 6)
      const rr = ring * RING_GAP
      layout[t.id] = { x: cx + Math.cos(ang) * rr, y: cy + Math.sin(ang) * rr }
    })
  })
  return layout
})()

function nodeRadius(id: string): number {
  return 5 + Math.min(9, DEGREE[id] * 0.8)
}

export interface TermNetworkProps {
  /** 현재 선택된 용어 id. */
  selectedId: string | null
  /** 검색어(약어·풀네임·정의 부분일치). */
  query: string
  /** 활성화된 카테고리 id 집합(여기 없으면 dim + 비활성). */
  activeCategories: Set<string>
  /** 노드 클릭 콜백. */
  onSelect: (id: string) => void
}

/**
 * 순수 SVG 용어 네트워크(#51) — 다크 배경 위 성좌 스타일 지식 그래프.
 * 선택 시 이웃 하이라이트·나머지 dim, 검색 매칭 하이라이트, 카테고리 필터 dim 을
 * 지원한다. 색은 카테고리 토큰 클래스(fill-chart-N·primary)만 쓰고 글로우는
 * currentColor drop-shadow 로 절제 처리하며 prefers-reduced-motion 을 존중한다.
 */
export function TermNetwork({ selectedId, query, activeCategories, onSelect }: Readonly<TermNetworkProps>) {
  const q = query.trim().toLowerCase()

  const matchIds = React.useMemo(() => {
    if (!q) return null
    return new Set(
      TERMS.filter((t) => `${t.abbr} ${t.full} ${t.description}`.toLowerCase().includes(q)).map((t) => t.id),
    )
  }, [q])

  const selSet = React.useMemo(() => {
    if (!selectedId) return null
    return new Set<string>([selectedId, ...(ADJACENCY[selectedId] ?? [])])
  }, [selectedId])

  const isActive = (id: string) => activeCategories.has(TERM_BY_ID[id].category)

  const isFocused = (id: string): boolean => {
    if (!isActive(id)) return false
    if (selSet) return selSet.has(id)
    if (matchIds) return matchIds.has(id)
    return true
  }

  // 선택/검색이 있을 때만 dim 대비를 준다(둘 다 없으면 전부 또렷).
  const hasFocus = Boolean(selSet || matchIds)

  const stars = React.useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        x: (i * 149) % VW,
        y: (i * 83) % VH,
        r: i % 5 === 0 ? 1.4 : 0.8,
      })),
    [],
  )

  return (
    <div
      data-slot="term-network"
      className="relative w-full overflow-hidden rounded-xl border border-border bg-card"
      style={{ background: "radial-gradient(circle at 50% 42%, color-mix(in oklch, var(--card) 88%, var(--primary)) 0%, var(--card) 72%)" }}
    >
      <style>{TN_CSS}</style>
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="relative block w-full"
        role="img"
        aria-label="SDLC·AI 용어 관계 네트워크"
      >
        {/* 성좌 배경 */}
        {stars.map((s, i) => (
          <circle key={`star-${i}`} cx={s.x} cy={s.y} r={s.r} className="fill-muted-foreground" opacity={0.18} />
        ))}

        {/* 엣지 */}
        <g>
          {EDGES.map((e, i) => {
            const pa = LAYOUT[e.a]
            const pb = LAYOUT[e.b]
            if (!pa || !pb) return null
            const incidentToSel = Boolean(selectedId) && (e.a === selectedId || e.b === selectedId)
            const bothActive = isActive(e.a) && isActive(e.b)
            const highlight = incidentToSel && bothActive
            const dim = (hasFocus && !highlight) || !bothActive
            const cat = CATEGORY_BY_ID[TERM_BY_ID[e.a].category]
            return (
              <line
                key={`edge-${i}`}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                className={cn(highlight ? cat.stroke : "stroke-border")}
                strokeWidth={highlight ? 1.6 : 1}
                strokeOpacity={dim ? 0.06 : highlight ? 0.85 : 0.22}
              />
            )
          })}
        </g>

        {/* 노드 */}
        <g>
          {TERMS.map((t) => {
            const p = LAYOUT[t.id]
            if (!p) return null
            const cat = CATEGORY_BY_ID[t.category]
            const focused = isFocused(t.id)
            const dim = hasFocus ? !focused : !isActive(t.id)
            const selected = t.id === selectedId
            const r = nodeRadius(t.id)
            return (
              <g
                key={t.id}
                className="tn-node cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`${t.abbr} 용어 상세 열기`}
                aria-pressed={selected}
                opacity={dim ? 0.16 : 1}
                onClick={() => onSelect(t.id)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") {
                    ev.preventDefault()
                    onSelect(t.id)
                  }
                }}
              >
                {/* 헤일로 */}
                <circle cx={p.x} cy={p.y} r={r + 5} className={cn(cat.fill)} opacity={selected ? 0.28 : 0.14} />
                {/* 코어(글로우는 currentColor drop-shadow) */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  className={cn(cat.fill, cat.text, "tn-core")}
                  stroke={selected ? "var(--foreground)" : "var(--card)"}
                  strokeWidth={selected ? 2 : 1}
                />
                {/* 하이라이트 스펙큘러 */}
                <circle cx={p.x - r * 0.3} cy={p.y - r * 0.3} r={Math.max(1.3, r * 0.3)} className="fill-background" opacity={0.7} />
                <text
                  x={p.x}
                  y={p.y + r + 12}
                  textAnchor="middle"
                  className={cn("select-none fill-foreground", selected && "font-semibold")}
                  fontSize={DEGREE[t.id] >= 5 ? 12 : 10.5}
                  style={{ paintOrder: "stroke", stroke: "var(--card)", strokeWidth: 3, strokeLinejoin: "round" }}
                >
                  {t.abbr}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

const TN_CSS = `
[data-slot="term-network"] .tn-node{transition:opacity .2s ease}
[data-slot="term-network"] .tn-core{filter:drop-shadow(0 0 4px currentColor)}
[data-slot="term-network"] .tn-node:hover .tn-core{filter:drop-shadow(0 0 7px currentColor)}
[data-slot="term-network"] .tn-node:focus-visible{outline:none}
[data-slot="term-network"] .tn-node:focus-visible .tn-core{filter:drop-shadow(0 0 8px currentColor)}
@media (prefers-reduced-motion:reduce){[data-slot="term-network"] .tn-node{transition:none}}
`
