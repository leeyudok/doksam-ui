import { ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface ErrorStateProps {
  /** 에러 메시지. */
  message: string
  /** 표시 방식 — page(카드+재시도) / inline(폼 에러 박스) / simple(텍스트 한 줄). */
  variant?: "page" | "inline" | "simple"
  /** 재시도 핸들러(page 전용). */
  onRetry?: () => void
  className?: string
}

/**
 * 에러 상태 3변형 — page/inline/simple. simple 은 리스트 행·패널 구석처럼
 * 박스를 두를 공간이 없을 때 쓰는 한 줄 변형이다(srope customs/error-state 이식).
 */
export function ErrorState({ message, variant = "page", onRetry, className }: ErrorStateProps) {
  if (variant === "simple") {
    return <p className={cn("text-sm text-destructive", className)}>{message}</p>
  }

  if (variant === "inline") {
    return (
      <div className={cn("rounded border border-destructive/30 bg-destructive/10 p-2 text-sm text-destructive", className)}>
        {message}
      </div>
    )
  }

  return (
    <Card className={cn("border-destructive/50", className)}>
      <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
        <p className="text-sm text-destructive">{message}</p>
        {onRetry ? (
          <Button variant="outline" size="sm" onClick={onRetry}>
            <ArrowsClockwiseIcon aria-hidden />
            다시 시도
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}
