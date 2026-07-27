import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import ComponentsLayout from "@/app/components/layout"
import { COMPONENT_REGISTRY } from "@/lib/showcase/registry"

vi.mock("next/navigation", () => ({ usePathname: () => "/components" }))

describe("ComponentsLayout", () => {
  it("children 과 레지스트리 전 항목 사이드바 링크를 렌더한다", () => {
    render(
      <ComponentsLayout>
        <div data-testid="content">본문</div>
      </ComponentsLayout>,
    )
    expect(screen.getByTestId("content")).toBeInTheDocument()
    const first = COMPONENT_REGISTRY[0]
    expect(screen.getByRole("link", { name: first.title })).toHaveAttribute(
      "href",
      `/components/${first.slug}`,
    )
    // 인덱스 링크 + 레지스트리 전 항목
    const nav = screen.getByRole("navigation", { name: "섹션 내비게이션" })
    expect(nav.querySelectorAll("a")).toHaveLength(COMPONENT_REGISTRY.length + 1)
  })
})
