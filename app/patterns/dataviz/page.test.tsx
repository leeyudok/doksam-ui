import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import DataVizPatternsPage from "@/app/patterns/dataviz/page"
import { DATAVIZ_SAMPLES } from "@/components/patterns/dataviz-samples"

describe("DataVizPatternsPage", () => {
  it("renders the page heading from the pattern registry", () => {
    render(<DataVizPatternsPage />)
    expect(screen.getByRole("heading", { level: 1, name: "데이터 시각화 패턴" })).toBeInTheDocument()
  })

  it("renders every dataviz sample as a numbered section", () => {
    render(<DataVizPatternsPage />)
    for (const sample of DATAVIZ_SAMPLES) {
      expect(screen.getByRole("heading", { level: 2, name: sample.title })).toBeInTheDocument()
      expect(screen.getByText(`#${sample.num}`)).toBeInTheDocument()
    }
  })

  it("renders 10 samples", () => {
    render(<DataVizPatternsPage />)
    expect(DATAVIZ_SAMPLES.length).toBe(10)
  })

  it("renders the diverging bar sample with success/destructive rows for positive/negative values", () => {
    render(<DataVizPatternsPage />)
    expect(screen.getByText("외국인")).toBeInTheDocument()
    expect(screen.getByText("+1,240")).toBeInTheDocument()
    expect(screen.getByText("-860")).toBeInTheDocument()
  })

  it("renders the activity heatmap sample with an accessible grid label", () => {
    render(<DataVizPatternsPage />)
    expect(screen.getByRole("img", { name: "최근 20주 일별 활동 건수 히트맵" })).toBeInTheDocument()
  })
})
