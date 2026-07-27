import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import StatePatternsPage from "@/app/patterns/state/page"
import { STATE_SAMPLES } from "@/components/patterns/state-samples"

describe("StatePatternsPage", () => {
  it("renders the page heading from the pattern registry", () => {
    render(<StatePatternsPage />)
    expect(screen.getByRole("heading", { level: 1, name: "상태 UI 패턴" })).toBeInTheDocument()
  })

  it("renders every state sample as a numbered section", () => {
    render(<StatePatternsPage />)
    for (const sample of STATE_SAMPLES) {
      expect(screen.getByRole("heading", { level: 2, name: sample.title })).toBeInTheDocument()
      expect(screen.getByText(`#${sample.num}`)).toBeInTheDocument()
    }
  })

  it("renders 4 samples", () => {
    render(<StatePatternsPage />)
    expect(STATE_SAMPLES.length).toBe(4)
  })
})
