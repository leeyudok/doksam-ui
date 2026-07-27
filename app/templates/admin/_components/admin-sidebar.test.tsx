import { fireEvent, render, screen, within } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

const { usePathnameMock } = vi.hoisted(() => ({
  usePathnameMock: vi.fn<() => string>(),
}))

vi.mock("next/navigation", () => ({
  usePathname: usePathnameMock,
}))

import { AdminSidebar } from "@/app/templates/admin/_components/admin-sidebar"

describe("AdminSidebar", () => {
  beforeEach(() => {
    usePathnameMock.mockReturnValue("/templates/admin")
  })

  it("renders every nav item in the desktop (md+) sidebar", () => {
    render(<AdminSidebar />)
    const desktopNav = screen.getByRole("navigation", { name: "Admin 템플릿 내비게이션" })
    for (const label of ["대시보드", "데이터 관리", "로그·관측성", "설정"]) {
      expect(within(desktopNav).getByRole("link", { name: new RegExp(label) })).toBeInTheDocument()
    }
  })

  it("marks the current route active with aria-current in the desktop sidebar", () => {
    usePathnameMock.mockReturnValue("/templates/admin/logs")
    render(<AdminSidebar />)
    const desktopNav = screen.getByRole("navigation", { name: "Admin 템플릿 내비게이션" })
    expect(within(desktopNav).getByRole("link", { name: /로그·관측성/ })).toHaveAttribute("aria-current", "page")
    expect(within(desktopNav).getByRole("link", { name: /대시보드/ })).not.toHaveAttribute("aria-current")
  })

  it("opens a Sheet drawer with the same nav items when the mobile menu trigger is clicked", () => {
    render(<AdminSidebar />)

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "Admin 메뉴 열기" }))

    const dialog = screen.getByRole("dialog")
    for (const label of ["대시보드", "데이터 관리", "로그·관측성", "설정"]) {
      expect(within(dialog).getByRole("link", { name: new RegExp(label) })).toBeInTheDocument()
    }
  })

  it("closes the Sheet drawer after a nav item is clicked", () => {
    render(<AdminSidebar />)

    fireEvent.click(screen.getByRole("button", { name: "Admin 메뉴 열기" }))
    const dialog = screen.getByRole("dialog")
    fireEvent.click(within(dialog).getByRole("link", { name: /데이터 관리/ }))

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })
})
