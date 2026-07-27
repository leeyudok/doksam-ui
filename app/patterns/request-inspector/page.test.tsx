import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import RequestInspectorPatternsPage from "@/app/patterns/request-inspector/page"
import { REQUEST_INSPECTOR_SAMPLES } from "@/components/patterns/request-inspector-samples"

describe("RequestInspectorPatternsPage", () => {
  it("renders the page heading from the pattern registry", () => {
    render(<RequestInspectorPatternsPage />)
    expect(screen.getByRole("heading", { level: 1, name: "요청 인스펙터 패턴" })).toBeInTheDocument()
  })

  it("renders every request-inspector sample as a numbered section", () => {
    render(<RequestInspectorPatternsPage />)
    for (const sample of REQUEST_INSPECTOR_SAMPLES) {
      expect(screen.getByRole("heading", { level: 2, name: sample.title })).toBeInTheDocument()
      expect(screen.getByText(`#${sample.num}`)).toBeInTheDocument()
    }
  })

  it("renders 1 sample", () => {
    render(<RequestInspectorPatternsPage />)
    expect(REQUEST_INSPECTOR_SAMPLES.length).toBe(1)
  })
})
