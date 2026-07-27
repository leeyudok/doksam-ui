"use client"

import { useState } from "react"
import { FilePdfIcon, ImageIcon, ListIcon, RobotIcon, TableIcon } from "@phosphor-icons/react/dist/ssr"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Attachment, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentMedia, AttachmentTitle } from "@/components/ui/attachment"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent, MessageHeader } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import type { ChatMessage, Conversation, MessageAttachment } from "../_lib/data"
import { Composer } from "./composer"

const ATTACHMENT_KIND_ICON = {
  pdf: FilePdfIcon,
  image: ImageIcon,
  sheet: TableIcon,
} as const

const CANNED_REPLIES = [
  "확인했습니다. 조금 더 살펴보고 다시 정리해서 알려드릴게요.",
  "좋은 지적이에요 — 반영해서 다음 답변에 포함하겠습니다.",
  "네, 그 부분은 첨부 자료를 기준으로 다시 계산해 보겠습니다.",
]

interface ChatMainProps {
  conversation: Conversation | undefined
  initialMessages: ChatMessage[]
  onOpenConversationList?: () => void
}

/** 대화창 — message-scroller 안에 유저/AI 말풍선을 렌더링하고 하단에 입력창을 둔다. */
export function ChatMain({ conversation, initialMessages, onOpenConversationList }: Readonly<ChatMainProps>) {
  const [messages, setMessages] = useState(initialMessages)
  const [replyIndex, setReplyIndex] = useState(0)

  function handleSend({ text, attachments }: { text: string; attachments: MessageAttachment[] }) {
    if (!conversation) return
    const now = new Date().toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" })
    const userMessage: ChatMessage = {
      id: `${conversation.id}-local-${messages.length + 1}`,
      conversationId: conversation.id,
      role: "user",
      content: text || "(첨부 파일)",
      time: now,
      attachments: attachments.length > 0 ? attachments : undefined,
    }
    const assistantMessage: ChatMessage = {
      id: `${conversation.id}-local-${messages.length + 2}`,
      conversationId: conversation.id,
      role: "assistant",
      content: CANNED_REPLIES[replyIndex % CANNED_REPLIES.length],
      time: now,
    }
    setReplyIndex((prev) => prev + 1)
    setMessages((prev) => [...prev, userMessage, assistantMessage])
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex items-center gap-2 lg:hidden">
        <Button type="button" variant="outline" size="icon-sm" aria-label="대화목록 열기" onClick={onOpenConversationList}>
          <ListIcon size={16} weight="regular" />
        </Button>
        <span className="min-w-0 flex-1 truncate text-sm font-medium">
          {conversation?.title ?? "대화를 선택하세요"}
        </span>
      </div>

      <div className="min-h-0 flex-1 rounded-lg border border-border bg-card">
        <MessageScrollerProvider defaultScrollPosition="end">
          <MessageScroller className="h-full">
            <MessageScrollerViewport>
              <MessageScrollerContent className="p-4">
                {messages.length === 0 ? (
                  <p className="p-6 text-center text-sm text-muted-foreground">
                    아직 메시지가 없습니다. 메시지를 입력해 대화를 시작하세요.
                  </p>
                ) : (
                  messages.map((message) => <MessageTurn key={message.id} message={message} />)
                )}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton direction="end" />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>

      <Composer onSend={handleSend} />
    </div>
  )
}

function MessageTurn({ message }: Readonly<{ message: ChatMessage }>) {
  const isUser = message.role === "user"

  return (
    <MessageScrollerItem messageId={message.id}>
      <Message align={isUser ? "end" : "start"}>
        {!isUser && (
          <MessageAvatar>
            <Avatar size="sm">
              <AvatarFallback>
                <RobotIcon size={16} weight="regular" />
              </AvatarFallback>
            </Avatar>
          </MessageAvatar>
        )}
        <MessageContent>
          <MessageHeader className={isUser ? "justify-end" : undefined}>
            {isUser ? "나" : "Atlas"} · {message.time}
          </MessageHeader>
          <Bubble align={isUser ? "end" : "start"} variant={isUser ? "default" : "muted"}>
            <BubbleContent>{message.content}</BubbleContent>
          </Bubble>
          {message.attachments && message.attachments.length > 0 && (
            <AttachmentGroup className={isUser ? "justify-end self-end" : undefined}>
              {message.attachments.map((attachment) => {
                const Icon = ATTACHMENT_KIND_ICON[attachment.kind]
                return (
                  <Attachment key={attachment.id} size="sm" state="done">
                    <AttachmentMedia>
                      <Icon size={16} weight="regular" />
                    </AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>{attachment.name}</AttachmentTitle>
                      <AttachmentDescription>{attachment.size}</AttachmentDescription>
                    </AttachmentContent>
                  </Attachment>
                )
              })}
            </AttachmentGroup>
          )}
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  )
}
