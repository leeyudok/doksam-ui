"use client"

import { useState } from "react"
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"
import { useAutoDismiss } from "@/hooks/use-auto-dismiss"

/**
 * 버튼 클릭 → 성공 메시지 표시 → useAutoDismiss가 4초 후 자동으로 숨긴다.
 * key에 클릭 시각을 넣어 연속 클릭 시에도 타이머가 매번 재시작된다.
 */
export function AutoDismissDemo() {
  const [submittedAt, setSubmittedAt] = useState<number | null>(null)
  const showMessage = useAutoDismiss(submittedAt !== null, submittedAt)

  return (
    <div className="flex flex-col items-start gap-3">
      <Button size="sm" onClick={() => setSubmittedAt(Date.now())}>
        저장
      </Button>

      {showMessage && (
        <p className="flex items-center gap-1.5 text-sm text-success">
          <CheckCircleIcon size={16} weight="regular" />
          저장되었습니다. 4초 후 이 메시지는 자동으로 사라집니다.
        </p>
      )}
    </div>
  )
}
