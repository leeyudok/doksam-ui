import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/input-group.demo"

describe("input-group demo", () => {
  it("renders the search input with a clear action", () => {
    render(demo)
    expect(screen.getByPlaceholderText("종목명 또는 종목코드 검색")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "검색어 지우기" })).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("<InputGroup>")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
