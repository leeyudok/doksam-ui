import { fireEvent, render, screen, within } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { KeywordCloud, type KeywordCloudKeyword } from "@/components/keyword-cloud"

const keywords: KeywordCloudKeyword[] = [
  { label: "부도", count: 40, items: [{ title: "A사 부도 위기 보도", meta: "2026-07-01" }] },
  { label: "연체", count: 22, items: [{ title: "B사 대출 연체 발생", meta: "2026-06-28" }] },
  { label: "소송", count: 5, items: [] },
]

describe("KeywordCloud", () => {
  it("tier 미지정 시 count 분위수로 티어를 자동 산정한다", () => {
    render(<KeywordCloud keywords={keywords} />)
    // 최상위(부도)는 진한 pill, 하위(소송)는 옅은 pill 클래스를 갖는다.
    const strong = screen.getByText("부도").closest("button")
    const weak = screen.getByText("소송").closest("button")
    expect(strong).toHaveClass("bg-primary/25")
    expect(weak).toHaveClass("bg-primary/10")
  })

  it("태그를 클릭하면 관련 항목 리스트가 펼쳐지고, 다시 클릭하면 접힌다", () => {
    render(<KeywordCloud keywords={keywords} />)
    const list = screen.getByRole("list", { name: "키워드 빈도" })
    expect(screen.queryByText("A사 부도 위기 보도")).not.toBeInTheDocument()

    fireEvent.click(within(list).getByText("부도"))
    expect(screen.getByText("A사 부도 위기 보도")).toBeInTheDocument()

    fireEvent.click(within(list).getByText("부도"))
    expect(screen.queryByText("A사 부도 위기 보도")).not.toBeInTheDocument()
  })

  it("onSelect가 선택/해제 시 호출된다", () => {
    const onSelect = vi.fn()
    render(<KeywordCloud keywords={keywords} onSelect={onSelect} />)
    const list = screen.getByRole("list", { name: "키워드 빈도" })

    fireEvent.click(within(list).getByText("연체"))
    expect(onSelect).toHaveBeenLastCalledWith(expect.objectContaining({ label: "연체" }))

    fireEvent.click(within(list).getByText("연체"))
    expect(onSelect).toHaveBeenLastCalledWith(null)
  })

  it("items가 비어있으면 안내 문구를 보여준다", () => {
    render(<KeywordCloud keywords={keywords} />)
    fireEvent.click(screen.getByText("소송"))
    expect(screen.getByText("표시할 항목이 없습니다.")).toBeInTheDocument()
  })
})
