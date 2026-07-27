import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { PipelineRail, type PipelineStage } from "@/components/pipeline-rail"

const stages: PipelineStage[] = [
  { key: "ba", label: "BA", sub: "요구사항", subTabs: [{ key: "elicitor", label: "요구사항 도출" }, { key: "srs", label: "SRS" }] },
  { key: "pm", label: "PM", sub: "기획·일정", excluded: true },
  { key: "coder", label: "Coder", sub: "구현", subTabs: [{ key: "code_gen", label: "코드 생성" }] },
]

describe("PipelineRail", () => {
  it("모든 스텝 라벨을 렌더링한다", () => {
    render(<PipelineRail stages={stages} activeStage="ba" onStageChange={vi.fn()} />)
    expect(screen.getByText("BA")).toBeInTheDocument()
    expect(screen.getByText("PM")).toBeInTheDocument()
    expect(screen.getByText("Coder")).toBeInTheDocument()
  })

  it("클릭 가능한 스텝을 클릭하면 onStageChange가 호출된다", () => {
    const onStageChange = vi.fn()
    render(<PipelineRail stages={stages} activeStage="ba" onStageChange={onStageChange} />)
    fireEvent.click(screen.getByText("Coder"))
    expect(onStageChange).toHaveBeenCalledWith("coder")
  })

  it("excluded 스텝은 비활성 상태이며 클릭해도 콜백이 호출되지 않는다", () => {
    const onStageChange = vi.fn()
    render(<PipelineRail stages={stages} activeStage="ba" onStageChange={onStageChange} />)
    expect(screen.getByText("제외")).toBeInTheDocument()
    const pmButton = screen.getByText("PM").closest("button")
    expect(pmButton).toBeDisabled()
    fireEvent.click(screen.getByText("PM"))
    expect(onStageChange).not.toHaveBeenCalled()
  })

  it("activeStage에 해당하는 서브탭만 렌더링한다", () => {
    render(<PipelineRail stages={stages} activeStage="ba" activeTab="elicitor" onStageChange={vi.fn()} />)
    expect(screen.getByText("요구사항 도출")).toBeInTheDocument()
    expect(screen.getByText("SRS")).toBeInTheDocument()
    expect(screen.queryByText("코드 생성")).not.toBeInTheDocument()
  })

  it("서브탭 클릭 시 onTabChange가 호출된다", () => {
    const onTabChange = vi.fn()
    render(<PipelineRail stages={stages} activeStage="ba" activeTab="elicitor" onStageChange={vi.fn()} onTabChange={onTabChange} />)
    fireEvent.click(screen.getByText("SRS"))
    expect(onTabChange).toHaveBeenCalledWith("srs")
  })
})
