import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { RiskCoreMap, type RiskEdge, type RiskNode } from "@/components/risk-core-map"

const nodes: RiskNode[] = [
  { id: "a", label: "가나전자", tier: 5, weight: 1200 },
  { id: "b", label: "다라화학", tier: 4, weight: 800 },
  { id: "c", label: "마바건설", tier: 3, weight: 500 },
  { id: "d", label: "사아물산", tier: 1, weight: 300 },
]

const edges: RiskEdge[] = [
  { source: "a", target: "b" },
  { source: "b", target: "c" },
]

describe("RiskCoreMap", () => {
  it("노드 라벨을 렌더링한다", () => {
    render(<RiskCoreMap nodes={nodes} edges={edges} />)
    expect(screen.getByText("가나전자")).toBeInTheDocument()
    expect(screen.getByText("다라화학")).toBeInTheDocument()
    expect(screen.getByText("사아물산")).toBeInTheDocument()
  })

  it("엣지 개수만큼 연결 path 그룹을 렌더링한다", () => {
    const { container } = render(<RiskCoreMap nodes={nodes} edges={edges} />)
    expect(container.querySelectorAll("[data-rcm-edge]")).toHaveLength(edges.length)
  })

  it("존재하지 않는 노드를 참조하는 엣지는 무시한다", () => {
    const { container } = render(
      <RiskCoreMap nodes={nodes} edges={[...edges, { source: "a", target: "zzz" }]} />,
    )
    expect(container.querySelectorAll("[data-rcm-edge]")).toHaveLength(edges.length)
  })

  it("노드 클릭 시 onSelect가 해당 노드로 호출된다", () => {
    const onSelect = vi.fn()
    render(<RiskCoreMap nodes={nodes} edges={edges} onSelect={onSelect} />)
    fireEvent.click(screen.getByRole("button", { name: "가나전자" }))
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "a", label: "가나전자" }))
  })

  it("같은 노드를 다시 클릭하면 onSelect가 null로 호출된다(선택 해제)", () => {
    const onSelect = vi.fn()
    render(<RiskCoreMap nodes={nodes} edges={edges} onSelect={onSelect} />)
    const node = screen.getByRole("button", { name: "다라화학" })
    fireEvent.click(node)
    fireEvent.click(node)
    expect(onSelect).toHaveBeenLastCalledWith(null)
  })

  it("노드가 없으면 안내 문구를 보여준다", () => {
    render(<RiskCoreMap nodes={[]} />)
    expect(screen.getByText("등록된 노드가 없습니다.")).toBeInTheDocument()
  })
})
