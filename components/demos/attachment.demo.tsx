import { FilePdfIcon, XIcon } from "@phosphor-icons/react/dist/ssr"

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

export const demo = (
  <AttachmentGroup className="w-full max-w-sm">
    <Attachment state="done">
      <AttachmentMedia>
        <FilePdfIcon size={18} weight="regular" />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>2026년_1분기_보고서.pdf</AttachmentTitle>
        <AttachmentDescription>2.4MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="첨부 제거">
          <XIcon size={14} weight="regular" />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment state="uploading">
      <AttachmentMedia>
        <FilePdfIcon size={18} weight="regular" />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>계약서_초안.pdf</AttachmentTitle>
        <AttachmentDescription>업로드 중…</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
    <Attachment state="error">
      <AttachmentMedia>
        <FilePdfIcon size={18} weight="regular" />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>회의록.pdf</AttachmentTitle>
        <AttachmentDescription>업로드 실패 — 파일이 너무 큽니다.</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  </AttachmentGroup>
)

export const code = `<AttachmentGroup>
  <Attachment state="done">
    <AttachmentMedia>
      <FilePdfIcon />
    </AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>2026년_1분기_보고서.pdf</AttachmentTitle>
      <AttachmentDescription>2.4MB</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <AttachmentAction aria-label="첨부 제거">
        <XIcon />
      </AttachmentAction>
    </AttachmentActions>
  </Attachment>
  <Attachment state="uploading">
    <AttachmentMedia>
      <FilePdfIcon />
    </AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>계약서_초안.pdf</AttachmentTitle>
      <AttachmentDescription>업로드 중…</AttachmentDescription>
    </AttachmentContent>
  </Attachment>
</AttachmentGroup>`

export const dos = [
  "state(idle/uploading/processing/error/done)를 실제 업로드 상태와 정확히 동기화한다.",
  "AttachmentAction에는 반드시 aria-label을 붙여 아이콘 전용 버튼에 접근성을 준다.",
  "이미지 첨부는 AttachmentMedia variant='image'로 실제 썸네일을 보여준다.",
]

export const donts = [
  "실패(state='error')인데 성공처럼 보이는 회색 아이콘만 두어 사용자가 재시도 필요를 놓치게 하지 않는다.",
  "파일명이 길다고 AttachmentTitle의 truncate를 없애 레이아웃이 깨지게 하지 않는다.",
]
