import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { StageProgressBoard, type Stage } from "@/components/stage-progress-board"

const stages: Stage[] = [
  {
    key: "ba",
    label: "요구분석",
    status: "done",
    progress: 100,
    tasks: [
      { label: "요구사항 도출", done: true },
      { label: "SRS 문서", done: true },
    ],
  },
  {
    key: "coder",
    label: "개발",
    status: "active",
    progress: 50,
    tasks: [
      { label: "코드 생성", done: true },
      { label: "코드 리뷰", done: false },
    ],
  },
  {
    key: "sre",
    label: "운영",
    status: "pending",
    progress: 0,
    tasks: [{ label: "런북 작성", done: false }],
  },
]

describe("StageProgressBoard", () => {
  it("각 단계의 상태 배지를 렌더링한다", () => {
    render(<StageProgressBoard stages={stages} />)
    expect(screen.getByText("완료")).toBeInTheDocument()
    expect(screen.getByText("진행중")).toBeInTheDocument()
    expect(screen.getByText("대기")).toBeInTheDocument()
  })

  it("단계별 진행률 퍼센트를 표시한다", () => {
    render(<StageProgressBoard stages={stages} />)
    expect(screen.getByText("100%")).toBeInTheDocument()
    expect(screen.getByText("50%")).toBeInTheDocument()
    expect(screen.getByText("0%")).toBeInTheDocument()
  })

  it("단계별 체크리스트 작업 라벨을 렌더링한다", () => {
    render(<StageProgressBoard stages={stages} />)
    expect(screen.getByText("요구사항 도출")).toBeInTheDocument()
    expect(screen.getByText("코드 리뷰")).toBeInTheDocument()
    expect(screen.getByText("런북 작성")).toBeInTheDocument()
  })

  it("단계 라벨을 렌더링한다", () => {
    render(<StageProgressBoard stages={stages} />)
    expect(screen.getByText("요구분석")).toBeInTheDocument()
    expect(screen.getByText("개발")).toBeInTheDocument()
    expect(screen.getByText("운영")).toBeInTheDocument()
  })
})
