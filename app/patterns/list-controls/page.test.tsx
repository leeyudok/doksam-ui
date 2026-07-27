import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import ListControlsPatternsPage from "@/app/patterns/list-controls/page"
import { LIST_CONTROLS_SAMPLES } from "@/components/patterns/list-controls-samples"

describe("ListControlsPatternsPage", () => {
  it("renders the page heading from the pattern registry", () => {
    render(<ListControlsPatternsPage />)
    expect(screen.getByRole("heading", { level: 1, name: "리스트 컨트롤 패턴" })).toBeInTheDocument()
  })

  it("renders every list-controls sample as a numbered section", () => {
    render(<ListControlsPatternsPage />)
    for (const sample of LIST_CONTROLS_SAMPLES) {
      expect(screen.getByRole("heading", { level: 2, name: sample.title })).toBeInTheDocument()
      expect(screen.getByText(`#${sample.num}`)).toBeInTheDocument()
    }
  })

  it("renders 2 samples", () => {
    render(<ListControlsPatternsPage />)
    expect(LIST_CONTROLS_SAMPLES.length).toBe(2)
  })
})
