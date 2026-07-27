import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import CardsPatternsPage from "@/app/patterns/cards/page"
import { CARDS_SAMPLES } from "@/components/patterns/cards-samples"

describe("CardsPatternsPage", () => {
  it("renders the page heading from the pattern registry", () => {
    render(<CardsPatternsPage />)
    expect(screen.getByRole("heading", { level: 1, name: "카드 패턴" })).toBeInTheDocument()
  })

  it("renders every card sample as a numbered section", () => {
    render(<CardsPatternsPage />)
    for (const sample of CARDS_SAMPLES) {
      expect(screen.getByRole("heading", { level: 2, name: sample.title })).toBeInTheDocument()
      expect(screen.getByText(`#${sample.num}`)).toBeInTheDocument()
    }
  })

  it("renders 5 samples", () => {
    render(<CardsPatternsPage />)
    expect(CARDS_SAMPLES.length).toBe(5)
  })
})
