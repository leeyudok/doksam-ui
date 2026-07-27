import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { ScenarioSimulator, type ScenarioParam, type ScenarioResult } from "@/components/scenario-simulator"

const params: ScenarioParam[] = [
  {
    key: "segment",
    label: "시나리오 업종",
    options: [
      { value: "steel", label: "철강" },
      { value: "retail", label: "유통" },
    ],
  },
]

function compute(selection: Record<string, string>): ScenarioResult[] {
  const base = selection.segment === "retail" ? 500 : 1000
  return [{ label: "고위험 익스포저", current: base, scenario: base + 200 }]
}

describe("ScenarioSimulator", () => {
  it("초기 선택값으로 compute를 호출해 KPI를 렌더링한다", () => {
    render(<ScenarioSimulator params={params} compute={compute} />)
    expect(screen.getByText("1,000")).toBeInTheDocument()
    expect(screen.getByText("1,200")).toBeInTheDocument()
    expect(screen.getByText("+200")).toBeInTheDocument()
  })

  it("셀렉트를 바꾸면 compute가 재호출되어 KPI가 갱신된다", () => {
    render(<ScenarioSimulator params={params} compute={compute} />)
    fireEvent.change(screen.getByLabelText("시나리오 업종"), { target: { value: "retail" } })

    expect(screen.getByText("500")).toBeInTheDocument()
    expect(screen.getByText("700")).toBeInTheDocument()
    expect(screen.queryByText("1,000")).not.toBeInTheDocument()
  })

  it("compute를 selection과 함께 호출한다", () => {
    const spy = vi.fn(compute)
    render(<ScenarioSimulator params={params} compute={spy} />)
    expect(spy).toHaveBeenCalledWith({ segment: "steel" })

    fireEvent.change(screen.getByLabelText("시나리오 업종"), { target: { value: "retail" } })
    expect(spy).toHaveBeenCalledWith({ segment: "retail" })
  })

  it("title이 주어지면 제목을 렌더링한다", () => {
    render(<ScenarioSimulator params={params} compute={compute} title="업종 리스크 시나리오" />)
    expect(screen.getByText("업종 리스크 시나리오")).toBeInTheDocument()
  })
})
