import type { Metadata } from "next"

import { SettingsForm } from "../_components/settings-form"

export const metadata: Metadata = {
  title: "설정 · Atlas Assistant",
}

/** #29 Chat/AI Assistant 템플릿 — 모델·프롬프트·톤 설정 화면. */
export default function ChatSettingsPage() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-6 overflow-y-auto">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted-foreground">Atlas Assistant · 설정</span>
        <h2 className="text-lg font-semibold tracking-tight">모델 및 대화 설정</h2>
        <p className="text-sm text-muted-foreground">사용할 모델, 시스템 프롬프트, 응답 톤과 생성 옵션을 관리합니다.</p>
      </div>
      <div className="w-full max-w-2xl">
        <SettingsForm />
      </div>
    </div>
  )
}
