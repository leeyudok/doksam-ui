"use client"

import type { ReactNode } from "react"

import { useI18n } from "@/components/i18n-provider"

import { CodeBlock } from "@/components/showcase/code-block"
import { DoDontList } from "@/components/showcase/do-dont-list"
import type { ComponentEntry } from "@/lib/showcase/types"

interface ComponentDetailProps {
  entry: ComponentEntry
  demo: ReactNode
  code: string
  dos: string[]
  donts: string[]
}

/** /components/<slug> 상세 페이지 본문 — 제목·설명 / 라이브 데모 / 코드 / do·don't. */
export function ComponentDetail({ entry, demo, code, dos, donts }: Readonly<ComponentDetailProps>) {
  const { t } = useI18n()

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{entry.title}</h1>
        <p className="text-sm text-muted-foreground">{t(`component.${entry.slug}.description`, entry.description)}</p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">{t("chrome.detail.demo", "데모")}</h2>
        <div className="flex min-h-32 flex-wrap items-center gap-4 rounded-lg border border-border p-6">
          {demo}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">{t("chrome.detail.code", "코드")}</h2>
        <CodeBlock code={code} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">{t("chrome.detail.rules", "사용 규칙")}</h2>
        <DoDontList dos={dos} donts={donts} />
      </section>
    </div>
  )
}
