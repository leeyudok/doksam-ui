"use client"

import { ClockCountdownIcon } from "@phosphor-icons/react/dist/ssr"

import { useI18n } from "@/components/i18n-provider"

interface TodoNoticeProps {
  title: string
  description: string
  /** 있으면 설명을 component.<slug>.description 번역으로 렌더. */
  slug?: string
}

/** 데모가 아직 준비되지 않은 컴포넌트 상세 페이지에서 보여주는 안내. */
export function TodoNotice({ title, description, slug }: Readonly<TodoNoticeProps>) {
  const { t } = useI18n()

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <ClockCountdownIcon size={20} weight="regular" />
        <span className="text-sm">{t("chrome.detail.todo", "데모 준비 중")}</span>
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="max-w-prose text-sm text-muted-foreground">{slug ? t(`component.${slug}.description`, description) : description}</p>
    </div>
  )
}
