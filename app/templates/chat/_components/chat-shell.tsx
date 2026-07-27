"use client"

import { useState } from "react"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import type { ChatMessage, Conversation } from "../_lib/data"
import { ChatMain } from "./chat-main"
import { ConversationList } from "./conversation-list"

interface ChatShellProps {
  conversations: Conversation[]
  messages: ChatMessage[]
  defaultConversationId: string
}

/**
 * 대화 화면 조합 — 데스크톱은 대화목록(좌) + 대화창(우) 2컬럼(사이트 전역
 * SiteSidebar 와 합쳐지면 3분할), 모바일은 대화창 단일 컬럼 + 대화목록을
 * 담은 Sheet 드로어로 반응형 전환한다.
 */
export function ChatShell({ conversations, messages, defaultConversationId }: Readonly<ChatShellProps>) {
  const [selectedId, setSelectedId] = useState(defaultConversationId)
  const [sheetOpen, setSheetOpen] = useState(false)

  const conversation = conversations.find((item) => item.id === selectedId)
  const conversationMessages = messages.filter((message) => message.conversationId === selectedId)

  function selectConversation(id: string) {
    setSelectedId(id)
    setSheetOpen(false)
  }

  return (
    <div className="flex h-full min-h-0 gap-4">
      <aside className="hidden w-72 shrink-0 lg:flex">
        <ConversationList conversations={conversations} selectedId={selectedId} onSelect={selectConversation} className="w-full" />
      </aside>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="left" className="w-72">
          <SheetHeader>
            <SheetTitle>대화 목록</SheetTitle>
          </SheetHeader>
          <ConversationList
            conversations={conversations}
            selectedId={selectedId}
            onSelect={selectConversation}
            className="min-h-0 flex-1 px-4 pb-4"
          />
        </SheetContent>
      </Sheet>

      <div className="min-h-0 min-w-0 flex-1">
        <ChatMain
          key={selectedId}
          conversation={conversation}
          initialMessages={conversationMessages}
          onOpenConversationList={() => setSheetOpen(true)}
        />
      </div>
    </div>
  )
}
