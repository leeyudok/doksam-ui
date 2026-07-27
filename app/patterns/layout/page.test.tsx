import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import LayoutPatternsPage from "@/app/patterns/layout/page"
import { LAYOUT_SAMPLES } from "@/components/patterns/layout-samples"

describe("LayoutPatternsPage", () => {
  it("renders the page heading from the pattern registry", () => {
    render(<LayoutPatternsPage />)
    expect(screen.getByRole("heading", { level: 1, name: "레이아웃 패턴" })).toBeInTheDocument()
  })

  it("renders every layout sample as a numbered section", () => {
    render(<LayoutPatternsPage />)
    for (const sample of LAYOUT_SAMPLES) {
      expect(screen.getByRole("heading", { level: 2, name: sample.title })).toBeInTheDocument()
      expect(screen.getByText(`#${sample.num}`)).toBeInTheDocument()
    }
  })

  it("renders 5 samples", () => {
    render(<LayoutPatternsPage />)
    expect(LAYOUT_SAMPLES.length).toBe(5)
  })
})
