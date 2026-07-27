import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/avatar-group.demo"

describe("avatar-group demo", () => {
  it("renders overflow counts for groups that exceed max", () => {
    render(demo)
    expect(screen.getByText("+2")).toBeInTheDocument()
    expect(screen.getByText("+3")).toBeInTheDocument()
  })

  it("renders initials fallback for visible members", () => {
    render(demo)
    expect(screen.getAllByText("김서").length).toBeGreaterThan(0)
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("AvatarGroup")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
