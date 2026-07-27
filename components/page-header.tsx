import type * as React from "react"

import { cn } from "@/lib/utils"

export interface PageHeaderProps {
  title: string
  /** 설명 — 문자열이면 muted 문단으로, ReactNode 면 그대로 렌더. */
  description?: React.ReactNode
  /** 타이틀 우측 슬롯(배지·액션 버튼 등). */
  children?: React.ReactNode
  className?: string
}

/**
 * 페이지 상단 헤더 — 타이틀 + 우측 슬롯 + 설명. admin 템플릿 스코프에 있던
 * 페이지 헤딩을 공용 컴포넌트로 승격(srope customs/page-header 이식).
 */
export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-2", className)}>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {children}
      </div>
      {description ? (
        <div className="mt-1 flex items-center gap-2">
          {typeof description === "string" ? <p className="text-sm text-muted-foreground">{description}</p> : description}
        </div>
      ) : null}
    </div>
  )
}
