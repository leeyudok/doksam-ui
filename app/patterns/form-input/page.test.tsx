import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import FormInputPatternsPage from "@/app/patterns/form-input/page"
import { FORM_INPUT_SAMPLES } from "@/components/patterns/form-input-samples"

describe("FormInputPatternsPage", () => {
  it("renders the page heading from the pattern registry", () => {
    render(<FormInputPatternsPage />)
    expect(screen.getByRole("heading", { level: 1, name: "폼/입력 패턴" })).toBeInTheDocument()
  })

  it("renders every form-input sample as a numbered section", () => {
    render(<FormInputPatternsPage />)
    for (const sample of FORM_INPUT_SAMPLES) {
      expect(screen.getByRole("heading", { level: 2, name: sample.title })).toBeInTheDocument()
      expect(screen.getByText(`#${sample.num}`)).toBeInTheDocument()
    }
  })

  it("renders 4 samples", () => {
    render(<FormInputPatternsPage />)
    expect(FORM_INPUT_SAMPLES.length).toBe(4)
  })
})
