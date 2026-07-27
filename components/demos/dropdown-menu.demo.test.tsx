import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/dropdown-menu.demo"

describe("dropdown-menu demo", () => {
  it("renders the trigger button", () => {
    render(demo)
    expect(screen.getByRole("button", { name: /내 계정/ })).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("<DropdownMenu>")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
