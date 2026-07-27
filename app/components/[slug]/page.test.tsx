import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import ComponentPage, { generateStaticParams } from "@/app/components/[slug]/page"
import { TodoNotice } from "@/components/showcase/todo-notice"
import { COMPONENT_REGISTRY } from "@/lib/showcase/registry"

describe("ComponentPage", () => {
  it("renders the live demo, code block, and do/don't lists for a done entry", async () => {
    const jsx = await ComponentPage({ params: Promise.resolve({ slug: "button" }) })
    render(jsx)
    expect(screen.getByRole("heading", { level: 1, name: "Button" })).toBeInTheDocument()
    expect(screen.getByText("저장하기")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /복사/ })).toBeInTheDocument()
    expect(screen.getByText("Do")).toBeInTheDocument()
    expect(screen.getByText("Don't")).toBeInTheDocument()
  })

  it("renders a todo notice for a not-yet-implemented entry", () => {
    // 등록된 항목이 전부 done이라 실제 todo slug 가 없음 — TodoNotice 컴포넌트를 직접 검증.
    render(<TodoNotice title="Card" description="콘텐츠 묶음 컨테이너" />)
    expect(screen.getByText("데모 준비 중")).toBeInTheDocument()
  })

  it("renders a todo notice when the registry entry's status is not 'done'", async () => {
    // 실제 레지스트리는 전부 done 이므로, registry 모듈을 부분 모킹해
    // status !== "done" 분기(page.tsx의 TodoNotice 반환 경로)를 직접 실행시킨다.
    vi.doMock("@/lib/showcase/registry", async () => {
      const actual =
        await vi.importActual<typeof import("@/lib/showcase/registry")>(
          "@/lib/showcase/registry",
        )
      return {
        ...actual,
        getComponentEntry: (slug: string) =>
          slug === "future-widget"
            ? { slug, title: "Future Widget", category: "form", description: "아직 준비 중", status: "todo" }
            : actual.getComponentEntry(slug),
      }
    })
    vi.resetModules()
    const { default: PageWithMockedRegistry } = await import("@/app/components/[slug]/page")

    const jsx = await PageWithMockedRegistry({
      params: Promise.resolve({ slug: "future-widget" }),
    })
    render(jsx)
    expect(screen.getByText("데모 준비 중")).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 1, name: "Future Widget" })).toBeInTheDocument()

    vi.doUnmock("@/lib/showcase/registry")
    vi.resetModules()
  })

  it("throws not-found for an unregistered slug", async () => {
    await expect(
      ComponentPage({ params: Promise.resolve({ slug: "does-not-exist" }) }),
    ).rejects.toThrow()
  })

  it("generateStaticParams returns a { slug } entry for every registered component", () => {
    const params = generateStaticParams()
    expect(params).toEqual(COMPONENT_REGISTRY.map((entry) => ({ slug: entry.slug })))
  })
})
