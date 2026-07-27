"use client"

// 출처: ews `web/components/RiskSimulator.js` (업종별 등급 하락 리스크 시뮬레이터) 이식 + 일반화 (#50).
// 원본은 "업종 셀렉트 + 등급 하락폭 셀렉트 → 고위험 익스포저 재계산"에 고정된 PoC였다.
// 여기서는 파라미터 구성(params)과 재계산 로직(compute)을 모두 props로 받는 범용 what-if
// 시뮬레이터로 바꿨다 — 셀렉트를 몇 개 두든, KPI를 몇 장 보여주든 호출부가 결정한다.
// "현재 → 시나리오 → 증가분" 3분할 KPI 카드는 useMemo로 셀렉트 변경 시 라이브 재계산된다.

import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { rateColor } from "@/lib/finance/rate"
import { cn } from "@/lib/utils"

/** 시나리오 파라미터 하나 — 셀렉트 하나로 렌더링된다. */
export interface ScenarioParam {
  /** selection 객체의 키. */
  key: string
  /** 셀렉트 위 라벨. */
  label: string
  /** 선택 가능한 값들. */
  options: { value: string; label: string }[]
}

/** compute()가 반환하는 KPI 한 줄 — 현재/시나리오/증가분 카드 3장으로 렌더링된다. */
export interface ScenarioResult {
  /** KPI 이름(카드 상단 라벨). */
  label: string
  /** 현재(기준) 값. */
  current: number
  /** 시나리오 적용 후 값. */
  scenario: number
  /** 값 포맷터. 생략하면 toLocaleString("ko-KR"). */
  format?: (value: number) => string
}

export interface ScenarioSimulatorProps extends Omit<React.ComponentProps<"div">, "children"> {
  /** 상단에 렌더링할 시나리오 파라미터(셀렉트) 목록. */
  params: ScenarioParam[]
  /** 현재 선택값(selection)을 받아 KPI 결과들을 계산한다. 셀렉트가 바뀔 때마다 재호출된다. */
  compute: (selection: Record<string, string>) => ScenarioResult[]
  /** 카드 상단 제목. 생략하면 표시하지 않는다. */
  title?: string
}

function defaultFormat(value: number): string {
  return value.toLocaleString("ko-KR")
}

/**
 * what-if 시나리오 시뮬레이터(#50) — 파라미터 셀렉트를 바꾸면 compute()가 재호출되어
 * "현재 / 시나리오 적용 후 / 증가분" KPI 카드가 즉시 갱신된다. 증가분 색은
 * lib/finance/rate.ts의 rateColor(시맨틱 gain/loss 토큰)로 정하며 하드코딩 색을 쓰지 않는다.
 * 파라미터·계산 로직 모두 데이터 props이므로 업종 리스크·금리·환율 등 어떤 what-if에도 재사용 가능.
 */
function ScenarioSimulator({
  params,
  compute,
  title,
  className,
  ...props
}: Readonly<ScenarioSimulatorProps>) {
  const [selection, setSelection] = React.useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    for (const p of params) {
      if (p.options[0]) initial[p.key] = p.options[0].value
    }
    return initial
  })

  const results = React.useMemo(() => compute(selection), [compute, selection])

  const handleChange = (key: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelection((prev) => ({ ...prev, [key]: e.target.value }))
  }

  return (
    <div data-slot="scenario-simulator" className={cn("flex flex-col gap-4", className)} {...props}>
      {title && <h3 className="font-heading text-base font-medium">{title}</h3>}

      <div className="flex flex-wrap gap-4">
        {params.map((p) => (
          <div key={p.key} className="flex flex-col gap-1.5">
            <label htmlFor={`scenario-${p.key}`} className="text-xs font-medium text-muted-foreground">
              {p.label}
            </label>
            <NativeSelect
              id={`scenario-${p.key}`}
              value={selection[p.key] ?? ""}
              onChange={handleChange(p.key)}
            >
              {p.options.map((opt) => (
                <NativeSelectOption key={opt.value} value={opt.value}>
                  {opt.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {results.map((r) => {
          const format = r.format ?? defaultFormat
          const delta = r.scenario - r.current
          const deltaColor = rateColor(delta)
          const deltaSign = delta > 0 ? "+" : ""
          return (
            <React.Fragment key={r.label}>
              <Card>
                <CardHeader className="pb-1">
                  <CardTitle className="text-xs font-medium text-muted-foreground">
                    현재 {r.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-xl font-semibold tabular-nums tracking-tight">
                    {format(r.current)}
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-1">
                  <CardTitle className="text-xs font-medium text-muted-foreground">
                    시나리오 적용 후
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-xl font-semibold tabular-nums tracking-tight">
                    {format(r.scenario)}
                  </span>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-1">
                  <CardTitle className="text-xs font-medium text-muted-foreground">증가분</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className={cn("text-xl font-semibold tabular-nums tracking-tight", deltaColor)}>
                    {deltaSign}
                    {format(delta)}
                  </span>
                </CardContent>
              </Card>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export { ScenarioSimulator }
