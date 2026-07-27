"use client"

import { ScenarioSimulator, type ScenarioParam, type ScenarioResult } from "@/components/scenario-simulator"

const params: ScenarioParam[] = [
  {
    key: "segment",
    label: "시나리오 업종",
    options: [
      { value: "steel", label: "철강" },
      { value: "shipbuilding", label: "조선" },
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

// 가상 데이터 — 업종별 현재 고위험(4~5등급) 익스포저(억원)와 하락폭별 증가량.
const BASE_HIGH_RISK: Record<string, number> = {
  steel: 1240,
  shipbuilding: 860,
  retail: 2010,
}
const SHIFT_MULTIPLIER: Record<string, number> = {
  "1": 0.18,
  "2": 0.34,
}

function compute(selection: Record<string, string>): ScenarioResult[] {
  const base = BASE_HIGH_RISK[selection.segment] ?? 0
  const multiplier = SHIFT_MULTIPLIER[selection.shift] ?? 0
  const scenario = Math.round(base * (1 + multiplier))
  return [
    {
      label: "고위험 여신 익스포저",
      current: base,
      scenario,
      format: (v) => `${v.toLocaleString("ko-KR")}억원`,
    },
  ]
}


export function ScenarioSimulatorDemo() {
  return <ScenarioSimulator title="업종 스트레스 시나리오" params={params} compute={compute} />
}
