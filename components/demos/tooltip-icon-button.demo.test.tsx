import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/tooltip-icon-button.demo"

describe("tooltip-icon-button demo", () => {
  it("renders icon buttons with tip text as the accessible name", () => {
    render(demo)
    expect(screen.getByRole("button", { name: "다운로드" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "삭제" })).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("TooltipIconButton")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
