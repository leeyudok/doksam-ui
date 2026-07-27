import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import JsonTreePatternsPage from "@/app/patterns/json-tree/page"
import { JSON_TREE_SAMPLES } from "@/components/patterns/json-tree-samples"

describe("JsonTreePatternsPage", () => {
  it("renders the page heading from the pattern registry", () => {
    render(<JsonTreePatternsPage />)
    expect(screen.getByRole("heading", { level: 1, name: "JSON 트리 뷰어 패턴" })).toBeInTheDocument()
  })

  it("renders every json-tree sample as a numbered section", () => {
    render(<JsonTreePatternsPage />)
    for (const sample of JSON_TREE_SAMPLES) {
      expect(screen.getByRole("heading", { level: 2, name: sample.title })).toBeInTheDocument()
      expect(screen.getByText(`#${sample.num}`)).toBeInTheDocument()
    }
  })

  it("renders 1 sample", () => {
    render(<JsonTreePatternsPage />)
    expect(JSON_TREE_SAMPLES.length).toBe(1)
  })
})
