import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import ConceptExplainerPatternsPage from "@/app/patterns/concept-explainer/page"
import { CONCEPT_EXPLAINER_SAMPLES } from "@/components/patterns/concept-explainer-samples"

describe("ConceptExplainerPatternsPage", () => {
  it("renders the page heading", () => {
    render(<ConceptExplainerPatternsPage />)
    expect(
      screen.getByRole("heading", { level: 1, name: "개념 설명 인포그래픽 패턴" }),
    ).toBeInTheDocument()
  })

  it("renders every sample as a numbered section", () => {
    render(<ConceptExplainerPatternsPage />)
    for (const sample of CONCEPT_EXPLAINER_SAMPLES) {
      expect(screen.getByRole("heading", { level: 2, name: sample.title })).toBeInTheDocument()
      expect(screen.getByText(`#${sample.num}`)).toBeInTheDocument()
    }
  })

  it("renders a concept card with its number, title and equivalent", () => {
    render(<ConceptExplainerPatternsPage />)
    expect(screen.getByRole("heading", { level: 3, name: "Image" })).toBeInTheDocument()
    expect(screen.getByText("≈ 냉동 밀키트")).toBeInTheDocument()
  })

  it("renders the trouble table mapping a symptom to where to look", () => {
    render(<ConceptExplainerPatternsPage />)
    expect(screen.getByText("컨테이너 지우니 데이터 증발")).toBeInTheDocument()
    expect(screen.getByText("Volume")).toBeInTheDocument()
  })
})
