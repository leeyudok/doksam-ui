"use client"

import type { ReactNode } from "react"

import { useI18n } from "@/components/i18n-provider"

import { CodeBlock } from "@/components/showcase/code-block"
import { DoDontList } from "@/components/showcase/do-dont-list"
import { PreviewFrame } from "@/components/showcase/preview-frame"
import { UseBar } from "@/components/showcase/use-bar"
import type { ComponentEntry, DemoExample } from "@/lib/showcase/types"

interface ComponentDetailProps {
  entry: ComponentEntry
  demo: ReactNode
  code: string
  dos: string[]
  donts: string[]
  /** registry.json 편입 여부 — UseBar 설치 버튼 vs 배지 분기. */
  inRegistry: boolean
  /** 있으면 이름 붙은 예제 그리드로 렌더, 없으면 단일 demo 폴백. */
  examples?: DemoExample[]
}

/** /components/<slug> 상세 페이지 본문 — 제목·설명 / 가져다쓰기 바 / 데모 / 코드 / do·don't. */
export function ComponentDetail({
  entry,
  demo,
  code,
  dos,
  donts,
  inRegistry,
  examples,
}: Readonly<ComponentDetailProps>) {
  const { t } = useI18n()
  const description = t(`component.${entry.slug}.description`, entry.description)

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{entry.title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </section>

      <UseBar
        slug={entry.slug}
        title={entry.title}
        description={description}
        code={code}
        dos={dos}
        donts={donts}
        inRegistry={inRegistry}
      />

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">{t("chrome.detail.demo", "데모")}</h2>
        {examples && examples.length > 0 ? (
          <div className="flex flex-col gap-6">
            {examples.map((example) => (
              <div key={example.name} className="flex flex-col gap-2">
                <h3 className="text-xs font-medium text-muted-foreground">{example.name}</h3>
                <PreviewFrame code={example.code}>{example.demo}</PreviewFrame>
              </div>
            ))}
          </div>
        ) : (
          <PreviewFrame code={code}>{demo}</PreviewFrame>
        )}
      </section>

      {examples && examples.length > 0 ? null : (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium text-muted-foreground">{t("chrome.detail.code", "코드")}</h2>
          <CodeBlock code={code} />
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">{t("chrome.detail.rules", "사용 규칙")}</h2>
        <DoDontList dos={dos} donts={donts} />
      </section>
    </div>
  )
}
