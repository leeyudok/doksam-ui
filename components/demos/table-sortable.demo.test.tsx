import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { code, demo, donts, dos } from "@/components/demos/table-sortable.demo"

describe("table-sortable demo", () => {
  it("renders task rows and status badges", () => {
    render(demo)
    expect(screen.getByText("정렬 헤더 구현")).toBeInTheDocument()
    expect(screen.getByText("김서연")).toBeInTheDocument()
    expect(screen.getByText("완료")).toBeInTheDocument()
  })

  it("renders sortable column headers and the column-visibility toggle", () => {
    render(demo)
    expect(screen.getByRole("button", { name: /작업/ })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "컬럼" })).toBeInTheDocument()
  })

  it("exposes non-empty code and rule lists", () => {
    expect(code).toContain("TableSortable")
    expect(dos.length).toBeGreaterThanOrEqual(2)
    expect(donts.length).toBeGreaterThanOrEqual(2)
  })
})
