import { fireEvent, render, screen } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"

import ChatSettingsPage from "@/app/templates/chat/settings/page"
import { CHAT_SETTINGS_DEFAULT, MODEL_OPTIONS, TONE_OPTIONS } from "@/app/templates/chat/_lib/data"

// jsdom 은 ResizeObserver 를 구현하지 않는다 — Slider(radix-ui)가 트랙 크기
// 측정에 사용하므로 최소 스텁을 준다 (app/templates/trading/page.test.tsx 와 동일 패턴).
beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(globalThis as any).ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe("ChatSettingsPage", () => {
  it("renders the page heading", () => {
    render(<ChatSettingsPage />)
    expect(screen.getByRole("heading", { level: 2, name: "모델 및 대화 설정" })).toBeInTheDocument()
  })

  it("renders every form section with default values", () => {
    render(<ChatSettingsPage />)
    // 섹션 제목("모델")은 라벨("모델" select label)과 텍스트가 겹치므로
    // 고유한 CardDescription 문구로 각 섹션의 존재를 확인한다.
    expect(screen.getByText("대화에 사용할 모델과 시스템 프롬프트를 설정합니다.")).toBeInTheDocument()
    expect(screen.getByText("응답의 말투를 선택합니다.")).toBeInTheDocument()
    expect(screen.getByText("응답의 다양성과 길이를 조절합니다.")).toBeInTheDocument()
    expect(screen.getByText("응답 방식과 개인화 옵션을 설정합니다.")).toBeInTheDocument()

    expect(screen.getByText(CHAT_SETTINGS_DEFAULT.systemPrompt)).toBeInTheDocument()
    const defaultModel = MODEL_OPTIONS.find((model) => model.value === CHAT_SETTINGS_DEFAULT.model)
    expect(defaultModel).toBeDefined()
    expect(screen.getByText(defaultModel!.label)).toBeInTheDocument()
    for (const tone of TONE_OPTIONS) {
      expect(screen.getByText(tone.label)).toBeInTheDocument()
    }
  })

  it("saves and shows a confirmation timestamp", () => {
    render(<ChatSettingsPage />)
    fireEvent.click(screen.getByRole("button", { name: "변경사항 저장" }))
    expect(screen.getByText(/저장됨/)).toBeInTheDocument()
  })
})
