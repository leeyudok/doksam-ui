import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import ElearningPlayerPage from "@/app/templates/elearning/page"
import { COURSE } from "@/app/templates/elearning/_data/course"

describe("ElearningPlayerPage", () => {
  it("renders the page heading and eyebrow badge", () => {
    render(<ElearningPlayerPage />)
    expect(screen.getByRole("heading", { level: 2, name: "학습 콘텐츠 플레이어" })).toBeInTheDocument()
    expect(screen.getByText("Learning · 콘텐츠 플레이어")).toBeInTheDocument()
  })

  it("renders the course title and every lesson in the sidebar", () => {
    render(<ElearningPlayerPage />)
    // 코스 제목은 사이드바 헤더에 노출.
    expect(screen.getByText(COURSE.title)).toBeInTheDocument()
    // 첫 챕터의 완료 강의(사이드바 버튼)가 보인다.
    expect(screen.getByRole("button", { name: /데이터 분석가의 하루/ })).toBeInTheDocument()
  })

  it("loads the first incomplete lesson into the player by default", () => {
    render(<ElearningPlayerPage />)
    // l1~l3 는 완료, l4 가 첫 미완료 → 플레이어 제목 h2 에 노출.
    expect(screen.getByRole("heading", { level: 2, name: "첫 번째 탐색적 분석 실습" })).toBeInTheDocument()
  })

  it("selecting a sidebar lesson swaps the player heading", () => {
    render(<ElearningPlayerPage />)
    fireEvent.click(screen.getByRole("button", { name: /결측치 처리 전략/ }))
    expect(screen.getByRole("heading", { level: 2, name: "결측치 처리 전략" })).toBeInTheDocument()
  })

  it("opens the AI summary dialog with the current lesson bullets", () => {
    render(<ElearningPlayerPage />)
    fireEvent.click(screen.getByRole("button", { name: /AI 요약/ }))
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByText("AI 강의 요약")).toBeInTheDocument()
    // 기본 강의(l4) 첫 요약 bullet.
    expect(screen.getByText(/가설을 세우고 그룹별 집계로 검증하는 흐름/)).toBeInTheDocument()
  })

  it("shows the auto-advance countdown after the end-of-lesson demo trigger", () => {
    render(<ElearningPlayerPage />)
    fireEvent.click(screen.getByRole("button", { name: /강의 종료 시뮬레이션/ }))
    expect(screen.getByText("다음 강의로 자동 이동")).toBeInTheDocument()
    // "지금 이동" 버튼이 카운트다운 오버레이에 나타난다.
    expect(screen.getByRole("button", { name: /지금 이동/ })).toBeInTheDocument()
  })
})
