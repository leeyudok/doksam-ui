import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/code-block.demo"

describe("code-block demo", () => {
  it("renders the code content and language label", () => {
    render(demo)
    expect(screen.getByText("TypeScript")).toBeInTheDocument()
    expect(screen.getByText("bash")).toBeInTheDocument()
    expect(screen.getByText(/greet/)).toBeInTheDocument()
  })

  it("shows line numbers when enabled", () => {
    render(demo)
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("3")).toBeInTheDocument()
  })

  it("renders a copy button for the code", () => {
    render(demo)
    expect(screen.getAllByRole("button", { name: "복사" }).length).toBeGreaterThan(0)
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("CodeBlock")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
