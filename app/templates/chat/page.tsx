import type { Metadata } from "next"

import { CONVERSATIONS, DEFAULT_CONVERSATION_ID, MESSAGES } from "./_lib/data"
import { ChatShell } from "./_components/chat-shell"

export const metadata: Metadata = {
  title: "대화 · Atlas Assistant",
}

/** #29 Chat/AI Assistant 템플릿 — 대화목록 + 메시지 스크롤러 + 입력창. */
export default function ChatPage() {
  return (
    <ChatShell conversations={CONVERSATIONS} messages={MESSAGES} defaultConversationId={DEFAULT_CONVERSATION_ID} />
  )
}
