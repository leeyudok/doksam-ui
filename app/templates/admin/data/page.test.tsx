import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import AdminDataPage from "@/app/templates/admin/data/page"

describe("AdminDataPage", () => {
  it("renders the page heading", () => {
    render(<AdminDataPage />)
    expect(screen.getByRole("heading", { level: 1, name: "사용자 관리" })).toBeInTheDocument()
  })

  it("renders the search filter, team facets, and sortable table", () => {
    render(<AdminDataPage />)
    expect(screen.getByPlaceholderText("이름 또는 이메일로 검색")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /플랫폼/ })).toBeInTheDocument()
    expect(screen.getByText("김도현")).toBeInTheDocument()
    expect(screen.getByRole("columnheader", { name: /이름/ })).toBeInTheDocument()
  })

  it("filters rows by search text", () => {
    render(<AdminDataPage />)
    const search = screen.getByPlaceholderText("이름 또는 이메일로 검색")
    fireEvent.change(search, { target: { value: "도현" } })
    expect(screen.getByText("김도현")).toBeInTheDocument()
    expect(screen.queryByText("이서연")).not.toBeInTheDocument()
  })
})
