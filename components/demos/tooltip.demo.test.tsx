import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/tooltip.demo"

describe("tooltip demo", () => {
  it("renders the trigger with an accessible name", () => {
    render(demo)
    expect(screen.getByRole("button", { name: "설정" })).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("<Tooltip>")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
