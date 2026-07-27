import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"

interface PageHeadingProps {
  eyebrow: string
  title: string
  description: string
  action?: ReactNode
}

/** 템플릿 4개 페이지가 공유하는 타이틀 블록 — badge → h1 → 설명(app-shell-samples.tsx 규약). */
export function PageHeading({ eyebrow, title, description, action }: Readonly<PageHeadingProps>) {
  return (
    <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          {eyebrow}
        </Badge>
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h1>
        <p className="max-w-prose text-sm text-muted-foreground">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </section>
  )
}
