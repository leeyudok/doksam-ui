import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { CatalogSidebar } from "@/components/showcase/catalog-sidebar"

const usePathname = vi.hoisted(() => vi.fn(() => "/components/button"))
vi.mock("next/navigation", () => ({ usePathname }))

const GROUPS = [
  { label: "Form", links: [{ href: "/components/button", label: "Button" }] },
  { label: "Overlay", links: [{ href: "/components/dialog", label: "Dialog" }] },
]

describe("CatalogSidebar", () => {
  it("인덱스 링크·그룹 헤딩·항목 링크를 렌더한다", () => {
    render(<CatalogSidebar indexHref="/components" indexLabel="전체 보기" groups={GROUPS} />)
    expect(screen.getByRole("link", { name: "전체 보기" })).toHaveAttribute("href", "/components")
    expect(screen.getByText("Form")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Dialog" })).toHaveAttribute("href", "/components/dialog")
  })

  it("현재 경로 링크에 aria-current=page 를 단다", () => {
    usePathname.mockReturnValue("/components/button")
    render(<CatalogSidebar indexHref="/components" indexLabel="전체 보기" groups={GROUPS} />)
    expect(screen.getByRole("link", { name: "Button" })).toHaveAttribute("aria-current", "page")
    expect(screen.getByRole("link", { name: "Dialog" })).not.toHaveAttribute("aria-current")
  })

  it("인덱스 경로에서는 인덱스 링크만 활성", () => {
    usePathname.mockReturnValue("/components")
    render(<CatalogSidebar indexHref="/components" indexLabel="전체 보기" groups={GROUPS} />)
    expect(screen.getByRole("link", { name: "전체 보기" })).toHaveAttribute("aria-current", "page")
    expect(screen.getByRole("link", { name: "Button" })).not.toHaveAttribute("aria-current")
  })

  it("빈 그룹은 헤딩을 렌더하지 않는다", () => {
    render(
      <CatalogSidebar
        indexHref="/components"
        indexLabel="전체 보기"
        groups={[{ label: "Empty", links: [] }, ...GROUPS]}
      />,
    )
    expect(screen.queryByText("Empty")).not.toBeInTheDocument()
  })
})
