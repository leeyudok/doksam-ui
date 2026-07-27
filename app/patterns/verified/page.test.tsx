import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import VerifiedPatternsPage from "@/app/patterns/verified/page"
import { VERIFIED_SAMPLES } from "@/components/patterns/verified-samples"

describe("VerifiedPatternsPage", () => {
  it("renders the page heading from the pattern registry", () => {
    render(<VerifiedPatternsPage />)
    expect(screen.getByRole("heading", { level: 1, name: "실전 검증 패턴" })).toBeInTheDocument()
  })

  it("renders every verified sample as a numbered section", () => {
    render(<VerifiedPatternsPage />)
    for (const sample of VERIFIED_SAMPLES) {
      expect(screen.getByRole("heading", { level: 2, name: sample.title })).toBeInTheDocument()
      expect(screen.getByText(`#${sample.num}`)).toBeInTheDocument()
    }
  })

  it("renders 4 samples", () => {
    render(<VerifiedPatternsPage />)
    expect(VERIFIED_SAMPLES.length).toBe(4)
  })
})
