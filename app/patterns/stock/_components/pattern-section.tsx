import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/showcase/code-block"

interface PatternSectionProps {
  /** 원본 srope UI 표준 문서의 샘플 번호 (이식 출처 표기용). */
  num: number
  title: string
  desc: string
  /** 데모와 동일한 내용을 보여주는 복사용 코드 문자열. */
  code: string
  /** 사용 지침 bullet 목록. */
  usage: string[]
  children: ReactNode
}

/**
 * /patterns/stock, /patterns/pipeline 이 공유하는 섹션 레이아웃 —
 * 번호 배지 + 제목/설명 → 라이브 데모 → 코드 스니펫 → 사용 지침 순.
 */
export function PatternSection({ num, title, desc, code, usage, children }: Readonly<PatternSectionProps>) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-[10px]">
          #{num}
        </Badge>
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
      <p className="text-sm text-muted-foreground">{desc}</p>
      <div className="rounded-lg border border-border p-4">{children}</div>
      <CodeBlock code={code} />
      <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
        {usage.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
