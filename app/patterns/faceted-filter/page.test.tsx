import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import FacetedFilterPatternsPage from "@/app/patterns/faceted-filter/page"
import { FACETED_FILTER_SAMPLES } from "@/components/patterns/faceted-filter-samples"

describe("FacetedFilterPatternsPage", () => {
  it("renders the page heading from the pattern registry", () => {
    render(<FacetedFilterPatternsPage />)
    expect(screen.getByRole("heading", { level: 1, name: "페이스티드 필터 패턴" })).toBeInTheDocument()
  })

  it("renders every faceted-filter sample as a numbered section", () => {
    render(<FacetedFilterPatternsPage />)
    for (const sample of FACETED_FILTER_SAMPLES) {
      expect(screen.getByRole("heading", { level: 2, name: sample.title })).toBeInTheDocument()
      expect(screen.getByText(`#${sample.num}`)).toBeInTheDocument()
    }
  })

  it("renders 1 sample", () => {
    render(<FacetedFilterPatternsPage />)
    expect(FACETED_FILTER_SAMPLES.length).toBe(1)
  })
})
