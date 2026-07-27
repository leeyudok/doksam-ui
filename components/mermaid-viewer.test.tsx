import { render, screen, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

const render_ = vi.hoisted(() => vi.fn())
const initialize = vi.hoisted(() => vi.fn())
vi.mock("mermaid", () => ({
  default: { initialize, render: render_ },
}))

import { MermaidViewer } from "@/components/mermaid-viewer"

describe("MermaidViewer", () => {
  it("```mermaid 코드펜스를 벗기고 render에 넘긴다", async () => {
    render_.mockResolvedValueOnce({ svg: "<svg data-testid='mocked'></svg>" })
    render(<MermaidViewer code={"```mermaid\nflowchart TD\nA-->B\n```"} />)

    await waitFor(() => expect(render_).toHaveBeenCalled())
    const [, code] = render_.mock.calls[0]
    expect(code).toBe("flowchart TD\nA-->B")
  })

  it("securityLevel strict로 initialize를 호출한다", async () => {
    render_.mockResolvedValueOnce({ svg: "<svg></svg>" })
    render(<MermaidViewer code="flowchart TD\nA-->B" />)

    await waitFor(() => expect(initialize).toHaveBeenCalled())
    expect(initialize.mock.calls[0][0]).toMatchObject({ securityLevel: "strict" })
  })

  it("렌더 완료 후 SVG를 표시한다", async () => {
    render_.mockResolvedValueOnce({ svg: "<svg role='img' aria-label='diagram'></svg>" })
    const { container } = render(<MermaidViewer code="flowchart TD\nA-->B" />)

    await waitFor(() => expect(container.querySelector('[data-slot="mermaid-viewer"]')).toBeInTheDocument())
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("render 실패 시 에러 메시지와 원본 코드를 보여준다", async () => {
    render_.mockRejectedValueOnce(new Error("Parse error on line 1"))
    render(<MermaidViewer code="broken code" />)

    await waitFor(() => expect(screen.getByText("Parse error on line 1")).toBeInTheDocument())
    expect(screen.getByText("broken code")).toBeInTheDocument()
  })
})
