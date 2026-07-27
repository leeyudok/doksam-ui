import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import LogViewerPatternsPage from "@/app/patterns/log-viewer/page"
import { LOG_VIEWER_SAMPLES } from "@/components/patterns/log-viewer-samples"

describe("LogViewerPatternsPage", () => {
  it("renders the page heading from the pattern registry", () => {
    render(<LogViewerPatternsPage />)
    expect(screen.getByRole("heading", { level: 1, name: "로그 뷰어 패턴" })).toBeInTheDocument()
  })

  it("renders every log-viewer sample as a numbered section", () => {
    render(<LogViewerPatternsPage />)
    for (const sample of LOG_VIEWER_SAMPLES) {
      expect(screen.getByRole("heading", { level: 2, name: sample.title })).toBeInTheDocument()
      expect(screen.getByText(`#${sample.num}`)).toBeInTheDocument()
    }
  })

  it("renders 1 sample", () => {
    render(<LogViewerPatternsPage />)
    expect(LOG_VIEWER_SAMPLES.length).toBe(1)
  })
})
