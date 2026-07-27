"use client"

import { PlusIcon, PushPinIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Conversation } from "../_lib/data"

interface ConversationListProps {
  conversations: Conversation[]
  selectedId: string
  onSelect: (id: string) => void
  className?: string
}

/**
 * 좌측 대화목록 — 데스크톱에서는 chat-shell.tsx 가 상시 노출 컬럼으로,
 * 모바일에서는 같은 컴포넌트를 Sheet 안에 그대로 넣어 재사용한다.
 */
export function ConversationList({ conversations, selectedId, onSelect, className }: Readonly<ConversationListProps>) {
  const pinned = conversations.filter((conversation) => conversation.pinned)
  const rest = conversations.filter((conversation) => !conversation.pinned)

  return (
    <div className={cn("flex h-full min-h-0 flex-col gap-3", className)}>
      <Button type="button" variant="outline" size="sm" className="justify-start" onClick={() => onSelect("new-chat")}>
        <PlusIcon size={14} weight="regular" />
        새 대화
      </Button>
      <ul className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
        {pinned.length > 0 && (
          <li aria-hidden className="px-2 pt-1 pb-0.5 text-xs font-medium text-muted-foreground">
            고정됨
          </li>
        )}
        {pinned.map((conversation) => (
          <ConversationRow
            key={conversation.id}
            conversation={conversation}
            active={conversation.id === selectedId}
            onSelect={onSelect}
          />
        ))}
        {rest.length > 0 && (
          <li aria-hidden className="px-2 pt-3 pb-0.5 text-xs font-medium text-muted-foreground">
            모든 대화
          </li>
        )}
        {rest.map((conversation) => (
          <ConversationRow
            key={conversation.id}
            conversation={conversation}
            active={conversation.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  )
}

function ConversationRow({
  conversation,
  active,
  onSelect,
}: Readonly<{
  conversation: Conversation
  active: boolean
  onSelect: (id: string) => void
}>) {
  return (
    <li>
      <button
        type="button"
        aria-current={active ? "page" : undefined}
        onClick={() => onSelect(conversation.id)}
        className={cn(
          "flex w-full flex-col gap-0.5 rounded-md px-2.5 py-2 text-left transition-colors",
          active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted",
        )}
      >
        <span className="flex items-center gap-1.5 text-sm font-medium">
          {conversation.pinned && (
            <PushPinIcon size={12} weight="fill" className={active ? "text-primary-foreground" : "text-muted-foreground"} />
          )}
          <span className="min-w-0 flex-1 truncate">{conversation.title}</span>
          {conversation.unread && !active && (
            <Badge variant="default" className="size-1.5 shrink-0 rounded-full p-0" aria-label="읽지 않음" />
          )}
        </span>
        <span
          className={cn(
            "flex items-center justify-between gap-2 text-xs",
            active ? "text-primary-foreground/80" : "text-muted-foreground",
          )}
        >
          <span className="min-w-0 flex-1 truncate">{conversation.preview}</span>
          <span className="shrink-0">{conversation.updatedAt}</span>
        </span>
      </button>
    </li>
  )
}
