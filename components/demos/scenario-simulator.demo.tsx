import { ScenarioSimulatorDemo } from "./scenario-simulator.demo.client"

export const demo = <ScenarioSimulatorDemo />

export const code = `import { ScenarioSimulator, type ScenarioParam, type ScenarioResult } from "@/components/scenario-simulator"

const params: ScenarioParam[] = [
  {
    key: "segment",
    label: "시나리오 업종",
    options: [
      { value: "steel", label: "철강" },
      { value: "retail", label: "유통" },
    ],
  },
  {
    key: "shift",
    label: "등급 하락 폭",
    options: [
      { value: "1", label: "1등급 하락" },
      { value: "2", label: "2등급 하락" },
    ],
  },
]

function compute(selection: Record<string, string>) {
  const base = BASE_HIGH_RISK[selection.segment] ?? 0
  const multiplier = SHIFT_MULTIPLIER[selection.shift] ?? 0
  return [
    {
      label: "고위험 여신 익스포저",
      current: base,
      scenario: Math.round(base * (1 + multiplier)),
      format: (v: number) => \`\${v.toLocaleString("ko-KR")}억원\`,
    },
  ]
}

<ScenarioSimulator params={params} compute={compute} title="업종 리스크 시나리오" />`

export const dos = [
  "compute는 selection을 받아 매번 새 결과 배열을 계산하는 순수 함수로 둔다 — 셀렉트가 바뀔 때마다 useMemo로 재호출된다.",
  "값 단위가 원/건수/비율 등으로 다르면 result.format으로 표시 방식을 맞춘다 — 생략 시 toLocaleString만 적용된다.",
  "params 순서가 곧 셀렉트 렌더 순서다 — 사용자가 먼저 고를 조건을 앞에 둔다.",
]

export const donts = [
  "증가분 색을 하드코딩하지 않는다 — lib/finance/rate.ts의 rateColor(gain/loss 시맨틱 토큰)가 자동으로 부호에 맞는 색을 정한다.",
  "compute 안에서 setState 등 부수효과를 쓰지 않는다 — useMemo 의존성으로 재계산되므로 순수 계산만 넣는다.",
  "실제 리스크 모형처럼 신뢰하지 않는다 — 서버 집계를 클라이언트에서 재계산해 보여주는 what-if PoC 골격이다.",
]
