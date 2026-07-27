import * as React from "react"

import { cn } from "@/lib/utils"

/** 기여 요인 1건 — 라벨·기여도(0~100)·종류. */
export interface ContributionFactor {
  /** 요인 이름(예: "매출 감소"). */
  label: string
  /** 기여도, 0~100 사이 값. 트랙바 길이와 퍼센트 표기에 그대로 쓰인다. */
  value: number
  /** 요인 종류. 색 구분·kindColors 매칭 키로 쓰인다. 생략 시 기본 그룹으로 묶인다. */
  kind?: string
}

export interface ContributionBarsProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** 표시할 기여 요인 목록. */
  factors: ContributionFactor[]
  /** kind별 바 색 클래스(예: "bg-chart-2"). 생략한 kind는 chart-1~5 토큰을 등장 순서대로 순환 배정한다. */
  kindColors?: Record<string, string>
  /** true면 value 내림차순으로 정렬해 보여준다. 기본 false(입력 순서 유지). */
  sort?: boolean
}

const DEFAULT_KIND = "__default__"

const CHART_CLASSES = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5"]

/**
 * 요인 기여도 분해 바(#50) — ews `XaiPanel`(SHAP 스타일 기여도 시각화)을 이식.
 * 라벨 · 트랙바 · 퍼센트의 3단 리스트로 각 요인의 기여도를 보여주고,
 * kind(요인 종류)별로 바 색을 구분한다. 상호작용이 없는 순수 프레젠테이션이라
 * 서버 컴포넌트로 동작한다. 구조 색(트랙 배경)은 시맨틱 토큰, 바 색은
 * chart-1~5 토큰만 사용하며 kindColors로 특정 kind의 색만 오버라이드할 수 있다.
 *
 * 원본: ews/web/components/XaiPanel.js
 */
function ContributionBars({
  factors,
  kindColors,
  sort = false,
  className,
  ...props
}: Readonly<ContributionBarsProps>) {
  const list = sort ? [...factors].sort((a, b) => b.value - a.value) : factors

  const kindOrder: string[] = []
  for (const f of factors) {
    const k = f.kind ?? DEFAULT_KIND
    if (!kindOrder.includes(k)) kindOrder.push(k)
  }

  const colorOf = (kind?: string) => {
    const k = kind ?? DEFAULT_KIND
    if (kindColors?.[k]) return kindColors[k]
    const idx = kindOrder.indexOf(k)
    return CHART_CLASSES[idx % CHART_CLASSES.length]
  }

  return (
    <div data-slot="contribution-bars" className={cn("flex flex-col gap-2", className)} {...props}>
      <ul className="flex flex-col gap-2">
        {list.map((f, i) => {
          const pct = Math.round(Math.min(100, Math.max(0, f.value)))
          return (
            <li
              key={`${f.label}-${i}`}
              className="grid grid-cols-[minmax(0,7rem)_1fr_2.75rem] items-center gap-3 text-sm"
            >
              <span className="truncate text-muted-foreground" title={f.label}>
                {f.label}
              </span>
              <span className="relative h-2 overflow-hidden rounded-full bg-muted">
                <span
                  className={cn("absolute inset-y-0 left-0 rounded-full", colorOf(f.kind))}
                  style={{ width: `${pct}%` }}
                />
              </span>
              <span className="text-right font-mono text-xs font-semibold tabular-nums text-foreground">
                {pct}%
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { ContributionBars }
