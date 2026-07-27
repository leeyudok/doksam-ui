"use client"

// 원본 출처: ews 프로젝트 web/components/PortfolioNetworkMap.js 이식 (#50).
// 동심원 위험등급 네트워크 맵 — 위험 tier(5→1)를 중심→외곽 밴드에 배치하고,
// 노드 크기는 weight(익스포저 등 중요도)에 비례시킨다. 고위험(tier≥4) 노드는
// 발광 헤일로와 맥동, 연결 엣지는 베지어(시냅스) 곡선으로 그린다. hover/click 시
// 해당 노드와 이웃만 하이라이트하고 나머지는 흐려진다. 순수 SVG, 외부 그래프
// 라이브러리 없음. 색은 전부 테마 토큰(위험 tier는 destructive→warning→primary
// 개념의 그라데이션), 애니메이션은 relation-network.tsx 와 동일하게 컴포넌트 내
// data-slot 스코프 <style> + keyframes 로 처리하며 prefers-reduced-motion을 존중한다.

import * as React from "react"

import { cn } from "@/lib/utils"

/** 위험 tier — 1(외곽/저위험) ~ 5(중심/고위험). 밴드 배치·색·강조에 쓰인다. */
export type RiskTier = 1 | 2 | 3 | 4 | 5

/** 위험 코어 노드 — 중심(고위험)에서 바깥(저위험)으로 배치되는 대상. */
export interface RiskNode {
  /** 고유 식별자(React key·엣지 매칭·선택 구분용). */
  id: string
  /** 표시 이름. */
  label: string
  /** 1~5 위험등급(5=중심/고위험). 밴드·색을 결정한다. */
  tier: RiskTier
  /** 중요도 가중치(예: 익스포저 금액). 클수록 노드가 크고 안쪽에 놓인다. */
  weight: number
  /** 툴팁·선택 콜백에 실어 보낼 임의 부가 정보. */
  meta?: Record<string, unknown>
}

/** 두 노드를 잇는 연결(무방향). */
export interface RiskEdge {
  /** 출발 노드 id. */
  source: string
  /** 도착 노드 id. */
  target: string
}

export interface RiskCoreMapProps extends Omit<React.ComponentProps<"div">, "children" | "onSelect"> {
  /** 배치할 위험 노드들. */
  nodes: RiskNode[]
  /** 노드 간 연결. source/target 은 노드 id. */
  edges?: RiskEdge[]
  /** SVG 뷰박스 높이(px). 기본 640. */
  height?: number
  /** 노드 클릭 시 호출. 같은 노드를 다시 누르면 선택 해제되어 null이 전달된다. */
  onSelect?: (node: RiskNode | null) => void
}

const W = 900
const HIGH_RISK_TIER = 4
const Y_SQUASH = 0.86 // 가로형 패널에 맞춘 타원 비율
const LABEL_MIN_R = 13 // 이보다 작은 노드는 라벨 숨김(hover/클릭 시 노출)

// tier 5(고위험) → 중심, tier 1(저위험) → 바깥. 밴드마다 시작각을 어긋나게 둬서
// 인접 밴드 노드가 방사선상에 겹치지 않게 한다.
const RING_OFFSET: Record<RiskTier, number> = { 5: 0, 4: 0.35, 3: 0.7, 2: 0.15, 1: 0.5 }

// 위험 tier 색 — destructive(고위험)→warning(관찰)→primary(저위험) 그라데이션 개념.
const TIER_COLOR_VAR: Record<RiskTier, string> = {
  5: "--destructive",
  4: "--destructive",
  3: "--warning",
  2: "--primary",
  1: "--primary",
}

// SSR/클라이언트 hydration 좌표 불일치를 막기 위해 소수 2자리로 고정.
function round2(v: number): number {
  return Math.round(v * 100) / 100
}

interface PlacedNode extends RiskNode {
  x: number
  y: number
  r: number
  colorVar: string
}

interface Guide {
  r: number
}

function nodeRadius(weight: number, maxWeight: number, shrink: number): number {
  const ratio = maxWeight > 0 ? Math.max(weight, 0) / maxWeight : 0
  const v = 14 + Math.sqrt(ratio) * 16 // 14~30
  return round2(Math.max(14, Math.min(v, 30)) * shrink)
}

// 링 1개 고정이 아니라 둘레 용량(노드 지름+간격)을 계산해 넘치는 노드를 바깥
// 서브링으로 밀어낸다. 혼잡한 tier는 노드 반경도 축소한다.
function layoutNodes(nodes: RiskNode[], height: number): { positioned: PlacedNode[]; guides: Guide[] } {
  const cx = W / 2
  const cy = height / 2
  const maxRadius = (height / 2 - 30) / Y_SQUASH
  const maxWeight = nodes.reduce((m, n) => Math.max(m, n.weight), 0)

  const byTier: Record<RiskTier, RiskNode[]> = { 1: [], 2: [], 3: [], 4: [], 5: [] }
  nodes.forEach((n) => {
    const t = ([1, 2, 3, 4, 5] as RiskTier[]).includes(n.tier) ? n.tier : 3
    byTier[t].push(n)
  })

  const positioned: PlacedNode[] = []
  const guides: Guide[] = []
  let bandStart = 52
  ;([5, 4, 3, 2, 1] as RiskTier[]).forEach((tier) => {
    const group = byTier[tier]
    if (group.length === 0) return

    const shrink = group.length > 40 ? 0.42 : group.length > 15 ? 0.65 : 1
    // 가중치 큰 노드가 안쪽에 오도록 정렬 — 시선 우선순위와 일치.
    const remaining = [...group].sort((a, b) => b.weight - a.weight)

    let ringR = bandStart
    let ringIndex = 0
    while (remaining.length > 0) {
      const maxR = remaining.reduce((m, n) => Math.max(m, nodeRadius(n.weight, maxWeight, shrink)), 0)
      const spacing = maxR * 2 + 8
      const capacity = Math.max(6, Math.floor((Math.PI * 2 * ringR * Y_SQUASH) / spacing))
      const ringNodes = remaining.splice(0, capacity)
      const offset = RING_OFFSET[tier] + ringIndex * 0.31
      ringNodes.forEach((n, i) => {
        const angle = Math.PI * 2 * (i / ringNodes.length + offset) - Math.PI / 2
        positioned.push({
          ...n,
          x: round2(cx + Math.cos(angle) * ringR),
          y: round2(cy + Math.sin(angle) * ringR * Y_SQUASH),
          r: nodeRadius(n.weight, maxWeight, shrink),
          colorVar: TIER_COLOR_VAR[tier],
        })
      })
      guides.push({ r: ringR })
      ringR += spacing
      ringIndex++
    }
    bandStart = ringR + 12
  })

  // 서브링 확장으로 뷰박스를 넘치면 중심 기준 전체 축소.
  const usedRadius = bandStart - 12
  if (usedRadius > maxRadius) {
    const scale = maxRadius / usedRadius
    positioned.forEach((n) => {
      n.x = round2(cx + (n.x - cx) * scale)
      n.y = round2(cy + (n.y - cy) * scale)
      n.r = round2(Math.max(5, n.r * scale))
    })
    guides.forEach((g) => {
      g.r = round2(g.r * scale)
    })
  }
  return { positioned, guides }
}

// 시냅스 곡선 — 두 노드를 잇는 완만한 베지어. 수직 방향으로 살짝 휘어 직선 격자
// 느낌을 없앤다.
function synapsePath(a: PlacedNode, b: PlacedNode): string {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.sqrt(dx * dx + dy * dy) || 1
  const bow = Math.min(38, len * 0.16)
  const mx = round2((a.x + b.x) / 2 - (dy / len) * bow)
  const my = round2((a.y + b.y) / 2 + (dx / len) * bow)
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`
}

function glowId(colorVar: string): "danger" | "warn" | "safe" {
  if (colorVar === "--destructive") return "danger"
  if (colorVar === "--warning") return "warn"
  return "safe"
}

/**
 * 동심원 위험등급 네트워크 맵(#50) — 위험 tier(5→1)를 중심→외곽 밴드에 배치하고
 * 노드 크기를 weight에 비례시켜 "리스크 코어"를 그린다. 고위험 노드는 발광·맥동,
 * 연결은 베지어 곡선으로 표현하며 hover/click 시 해당 노드와 이웃만 강조한다.
 * 색은 전부 시맨틱 토큰, 데이터 props 전용 프레젠테이션.
 */
function RiskCoreMap({
  nodes,
  edges = [],
  height = 640,
  onSelect,
  className,
  ...props
}: Readonly<RiskCoreMapProps>) {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null)
  const [pinnedId, setPinnedId] = React.useState<string | null>(null)
  const activeId = pinnedId ?? hoveredId

  const cx = W / 2
  const cy = height / 2

  const { positioned, guides } = React.useMemo(() => layoutNodes(nodes, height), [nodes, height])
  const nodeById = React.useMemo(() => {
    const m: Record<string, PlacedNode> = {}
    positioned.forEach((n) => {
      m[n.id] = n
    })
    return m
  }, [positioned])

  const linkEdges = React.useMemo(
    () => edges.filter((e) => nodeById[e.source] && nodeById[e.target]),
    [edges, nodeById],
  )

  const adjacency = React.useMemo(() => {
    const m: Record<string, Set<string>> = {}
    linkEdges.forEach((e) => {
      ;(m[e.source] = m[e.source] || new Set()).add(e.target)
      ;(m[e.target] = m[e.target] || new Set()).add(e.source)
    })
    return m
  }, [linkEdges])

  const activeNeighbors = activeId != null ? adjacency[activeId] ?? new Set<string>() : null

  const handleClick = (n: PlacedNode) => {
    const next = pinnedId === n.id ? null : n.id
    setPinnedId(next)
    onSelect?.(next === null ? null : n)
  }

  if (nodes.length === 0) {
    return (
      <div
        data-slot="risk-core-map"
        className={cn("rounded-xl border bg-card p-6 text-sm text-muted-foreground", className)}
        {...props}
      >
        등록된 노드가 없습니다.
      </div>
    )
  }

  return (
    <div
      data-slot="risk-core-map"
      className={cn("relative w-full overflow-hidden rounded-xl border bg-card", className)}
      {...props}
    >
      <style>{RCM_CSS}</style>
      <svg
        viewBox={`0 0 ${W} ${height}`}
        className="relative w-full"
        role="img"
        aria-label="위험등급 동심원 네트워크 맵"
      >
        <defs>
          <radialGradient id="rcm-glow-danger">
            <stop offset="0%" stopColor="var(--destructive)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--destructive)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rcm-glow-warn">
            <stop offset="0%" stopColor="var(--warning)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--warning)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rcm-glow-safe">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 등급 궤도 가이드 */}
        {guides.map((g, i) => (
          <ellipse
            key={`guide-${i}`}
            cx={cx}
            cy={cy}
            rx={g.r}
            ry={g.r * Y_SQUASH}
            fill="none"
            className="stroke-border"
            strokeWidth={1}
            strokeDasharray="2 7"
            opacity={0.35}
          />
        ))}

        {linkEdges.map((e, i) => {
          const a = nodeById[e.source]
          const b = nodeById[e.target]
          const highRisk = a.tier >= HIGH_RISK_TIER || b.tier >= HIGH_RISK_TIER
          const isActive = activeId != null && (activeId === e.source || activeId === e.target)
          const dimmed = activeId != null && !isActive
          const stroke = isActive
            ? "var(--primary)"
            : highRisk
              ? "var(--destructive)"
              : "var(--border)"
          const d = synapsePath(a, b)
          return (
            <g key={`edge-${i}`} data-rcm-edge="" opacity={dimmed ? 0.1 : 1}>
              <path
                d={d}
                fill="none"
                stroke={stroke}
                strokeWidth={isActive ? 2.2 : highRisk ? 1.6 : 1.1}
                opacity={highRisk || isActive ? 0.5 : 0.35}
              />
              {(highRisk || isActive) && (
                <path
                  className="rcm-impulse"
                  d={d}
                  fill="none"
                  stroke={stroke}
                  strokeWidth={isActive ? 3.4 : 2.8}
                  opacity={0.9}
                />
              )}
            </g>
          )
        })}

        {positioned.map((n) => {
          const dimmed = activeId != null && activeId !== n.id && !activeNeighbors?.has(n.id)
          const isActive = activeId === n.id
          const showLabel = n.r >= LABEL_MIN_R || isActive
          return (
            <g
              key={`node-${n.id}`}
              className="rcm-node"
              opacity={dimmed ? 0.35 : 1}
              role="button"
              tabIndex={0}
              aria-label={n.label}
              onMouseEnter={() => setHoveredId(n.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleClick(n)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") {
                  ev.preventDefault()
                  handleClick(n)
                }
              }}
            >
              {/* 발광 헤일로 — 고위험 코어(tier 5)는 은은하게 맥동 */}
              <circle
                className={n.tier === 5 ? "rcm-halo-core" : undefined}
                cx={n.x}
                cy={n.y}
                r={n.r * 2.1}
                fill={`url(#rcm-glow-${glowId(n.colorVar)})`}
                pointerEvents="none"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill="var(--card)"
                stroke={`var(${n.colorVar})`}
                strokeWidth={isActive ? 2.6 : n.tier >= HIGH_RISK_TIER ? 1.8 : 1.2}
              />
              {/* 코어 점 */}
              <circle
                cx={n.x}
                cy={n.y - (showLabel ? n.r * 0.42 : 0)}
                r={Math.max(2.2, n.r * 0.22)}
                fill={`var(${n.colorVar})`}
                opacity={isActive ? 1 : 0.8}
                pointerEvents="none"
              />
              <title>{`${n.label} · ${n.tier}등급`}</title>
              {showLabel && (
                <text
                  x={n.x}
                  y={n.y + n.r * 0.34}
                  textAnchor="middle"
                  fontSize={Math.min(11, Math.max(9, n.r * 0.5))}
                  className="fill-foreground"
                  fontWeight={700}
                  pointerEvents="none"
                >
                  {n.label}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      <div className="relative flex flex-wrap gap-x-4 gap-y-1.5 px-4 pb-3 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-2 rounded-full" style={{ background: "var(--primary)" }} />
          1~2등급 저위험
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-2 rounded-full" style={{ background: "var(--warning)" }} />
          3등급 관찰
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-2 rounded-full" style={{ background: "var(--destructive)" }} />
          4~5등급 고위험 · 전이 경로 강조
        </span>
      </div>
    </div>
  )
}

const RCM_CSS = `
[data-slot="risk-core-map"] .rcm-node{cursor:pointer;transition:filter .2s ease}
[data-slot="risk-core-map"] .rcm-node:hover,[data-slot="risk-core-map"] .rcm-node:focus-visible{filter:brightness(1.25);outline:none}
[data-slot="risk-core-map"] .rcm-impulse{stroke-dasharray:5 20;animation:rcm-flow 1.6s linear infinite}
[data-slot="risk-core-map"] .rcm-halo-core{animation:rcm-breathe 3.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
@keyframes rcm-flow{to{stroke-dashoffset:-50}}
@keyframes rcm-breathe{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:.85;transform:scale(1.12)}}
@media (prefers-reduced-motion:reduce){[data-slot="risk-core-map"] .rcm-impulse,[data-slot="risk-core-map"] .rcm-halo-core{animation:none}}
`

export { RiskCoreMap }
