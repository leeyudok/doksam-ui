import type { ReactNode } from "react"

import { CodeBlock } from "@/components/showcase/code-block"

/** /patterns/<slug> 페이지의 samples 배열이 공유하는 샘플 1건의 데이터 형태. */
export interface PatternSampleData {
  num: number
  title: string
  description: string
  demo: ReactNode
  code: string
  notes: string[]
}

type PatternSampleProps = PatternSampleData

/**
 * /patterns/<slug> 페이지가 공유하는 샘플 섹션 — 라이브 데모 + 코드 스니펫 + 사용 지침.
 * components/showcase/component-detail.tsx 의 단일 데모 레이아웃을, 페이지당
 * 여러 샘플을 나열하는 패턴 페이지용으로 반복 가능하게 만든 버전이다.
 */
export function PatternSample({ num, title, description, demo, code, notes }: Readonly<PatternSampleProps>) {
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-border p-6">
      <div className="flex items-baseline gap-2">
        <span className="text-xs font-mono text-muted-foreground">#{num}</span>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>

      <div className="rounded-lg border border-border p-6">{demo}</div>

      <CodeBlock code={code} />

      <ul className="flex flex-col gap-1.5">
        {notes.map((note) => (
          <li key={note} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
