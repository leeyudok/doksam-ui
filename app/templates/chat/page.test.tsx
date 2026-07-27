import { fireEvent, render, screen } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"

import ChatPage from "@/app/templates/chat/page"
import { CONVERSATIONS, DEFAULT_CONVERSATION_ID, getMessagesForConversation } from "@/app/templates/chat/_lib/data"

// jsdom 은 ResizeObserver 를 구현하지 않는다 — message-scroller(@shadcn/react)가
// 스크롤 위치 계산에 접근할 수 있도록 최소 스텁을 준다. Radix Dialog(Sheet)가
// 쓰는 포인터 캡처 API 도 jsdom 에는 없어 함께 폴리필한다.
beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(globalThis as any).ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(Element.prototype as any).hasPointerCapture ??= () => false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(Element.prototype as any).setPointerCapture ??= () => {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(Element.prototype as any).releasePointerCapture ??= () => {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(Element.prototype as any).scrollIntoView ??= () => {}
})

describe("ChatPage", () => {
  it("renders the default conversation's messages", () => {
    render(<ChatPage />)
    const defaultMessages = getMessagesForConversation(DEFAULT_CONVERSATION_ID)
    for (const message of defaultMessages) {
      expect(screen.getAllByText(message.content).length).toBeGreaterThan(0)
    }
  })

  it("renders every conversation in the sidebar list", () => {
    render(<ChatPage />)
    for (const conversation of CONVERSATIONS) {
      expect(screen.getAllByText(conversation.title).length).toBeGreaterThan(0)
    }
  })

  it("switches conversation when another item is selected", () => {
    render(<ChatPage />)
    const other = CONVERSATIONS.find((c) => c.id !== DEFAULT_CONVERSATION_ID && c.id !== "new-chat")
    if (!other) throw new Error("fixture must contain a second conversation")

    fireEvent.click(screen.getAllByText(other.title)[0])

    const otherMessages = getMessagesForConversation(other.id)
    for (const message of otherMessages) {
      expect(screen.getAllByText(message.content).length).toBeGreaterThan(0)
    }
  })

  it("sends a new message from the composer and shows a reply", () => {
    render(<ChatPage />)
    const textarea = screen.getByPlaceholderText("메시지를 입력하세요…")
    fireEvent.change(textarea, { target: { value: "새로운 질문입니다." } })
    fireEvent.click(screen.getByRole("button", { name: "메시지 보내기" }))

    expect(screen.getAllByText("새로운 질문입니다.").length).toBeGreaterThan(0)
  })
})
