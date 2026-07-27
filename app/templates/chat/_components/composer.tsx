"use client"

import { useId, useState } from "react"
import { FilePdfIcon, ImageIcon, PaperPlaneRightIcon, PaperclipIcon, TableIcon, XIcon } from "@phosphor-icons/react/dist/ssr"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group"
import type { MessageAttachment } from "../_lib/data"

const ATTACHMENT_KIND_ICON = {
  pdf: FilePdfIcon,
  image: ImageIcon,
  sheet: TableIcon,
} as const

/** 첨부 버튼을 누르면 순환으로 붙는 데모용 샘플 파일 — 실제 업로드는 하지 않는다. */
const SAMPLE_ATTACHMENTS: MessageAttachment[] = [
  { id: "sample-pdf", name: "회의록_요약.pdf", size: "184KB", kind: "pdf" },
  { id: "sample-image", name: "화면_캡처.png", size: "620KB", kind: "image" },
  { id: "sample-sheet", name: "지표_정리.xlsx", size: "96KB", kind: "sheet" },
]

interface ComposerProps {
  onSend: (draft: { text: string; attachments: MessageAttachment[] }) => void
}

/** 대화창 하단 입력창 — 텍스트 + 첨부(attachment) 버튼, 전송 버튼으로 구성된다. */
export function Composer({ onSend }: Readonly<ComposerProps>) {
  const [text, setText] = useState("")
  const [attachments, setAttachments] = useState<MessageAttachment[]>([])
  const textareaId = useId()

  const canSend = text.trim().length > 0 || attachments.length > 0

  function addSampleAttachment() {
    const next = SAMPLE_ATTACHMENTS.find((sample) => !attachments.some((a) => a.id === sample.id))
    if (!next) return
    setAttachments((prev) => [...prev, next])
  }

  function removeAttachment(id: string) {
    setAttachments((prev) => prev.filter((attachment) => attachment.id !== id))
  }

  function submitDraft() {
    if (!canSend) return
    onSend({ text: text.trim(), attachments })
    setText("")
    setAttachments([])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    submitDraft()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-t border-border pt-3">
      {attachments.length > 0 && (
        <AttachmentGroup>
          {attachments.map((attachment) => {
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
                <AttachmentActions>
                  <AttachmentAction aria-label={`${attachment.name} 첨부 제거`} onClick={() => removeAttachment(attachment.id)}>
                    <XIcon size={12} weight="regular" />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            )
          })}
        </AttachmentGroup>
      )}
      <InputGroup>
        <InputGroupAddon align="block-start">
          <InputGroupButton
            type="button"
            size="icon-xs"
            aria-label="파일 첨부"
            onClick={addSampleAttachment}
            disabled={attachments.length >= SAMPLE_ATTACHMENTS.length}
          >
            <PaperclipIcon size={14} weight="regular" />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupTextarea
          id={textareaId}
          placeholder="메시지를 입력하세요…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              submitDraft()
            }
          }}
        />
        <InputGroupAddon align="block-end" className="justify-end">
          <InputGroupButton type="submit" size="icon-xs" aria-label="메시지 보내기" disabled={!canSend}>
            <PaperPlaneRightIcon size={14} weight="regular" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}
