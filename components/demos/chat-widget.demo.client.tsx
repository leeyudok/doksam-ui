"use client"

import { useState } from "react"

import { ChatWidget, type ChatWidgetMessage } from "@/components/chat-widget"

const INITIAL: ChatWidgetMessage[] = [
  { type: "system", content: "채팅방에 입장했습니다", time: "14:02" },
  { type: "chat", from: "dana", name: "다나", content: "배포 끝났어요? 확인 부탁요", time: "14:05" },
  { type: "whisper", from: "dana", name: "다나", content: "지표 이상하면 바로 롤백해요", time: "14:06" },
  { type: "chat", from: "me", name: "나", content: "지금 파이프라인 보고 있어요", time: "14:07" },
]

export function ChatWidgetDemo() {
  const [messages, setMessages] = useState(INITIAL)
  const [unread, setUnread] = useState(2)

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border bg-muted/30">
      <p className="p-4 text-xs text-muted-foreground">
        우하단 런처 버튼을 눌러 위젯을 열어보세요. 데모라 fixed 대신 absolute 로 이 박스 안에 가둬져 있습니다.
      </p>
      <ChatWidget
        className="absolute right-4 bottom-4 z-10"
        messages={messages}
        unread={unread}
        currentUsername="me"
        onOpen={() => setUnread(0)}
        onSend={(content) =>
          setMessages((prev) => [...prev, { type: "chat", from: "me", name: "나", content, time: "지금" }])
        }
      />
    </div>
  )
}
