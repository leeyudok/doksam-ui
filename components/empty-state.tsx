import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface EmptyStateProps {
  /** 안내 메시지. */
  message: string
  /** 아이콘 ReactNode(Phosphor 등). */
  icon?: React.ReactNode
  /** 보조 텍스트. */
  subtext?: string
  /** 액션 버튼 — 지정 시 outline 버튼이 붙는다. */
  action?: { label: string; onClick: () => void }
  className?: string
}

/**
 * 빈 상태 편의 컴포넌트 — message/icon/subtext/action prop API 한 개로 끝나는 래퍼.
 * 서브컴포넌트 조합이 필요하면 ui/empty 를 직접 쓰고, 리스트·패널 안 간단한
 * 빈 상태는 이걸 쓴다(srope customs/empty-state 이식).
 */
export function EmptyState({ message, icon, subtext, action, className }: EmptyStateProps) {
  return (
    <div className={cn("py-6 text-center text-muted-foreground", className)}>
      {icon ? <div className="mx-auto mb-1 flex justify-center">{icon}</div> : null}
      <p className="text-xs">{message}</p>
      {subtext ? <p className="mt-0.5 text-[11px] text-muted-foreground/70">{subtext}</p> : null}
      {action ? (
        <Button size="sm" variant="outline" className="mt-2 text-xs" onClick={action.onClick}>
          {action.label}
        </Button>
      ) : null}
    </div>
  )
}
