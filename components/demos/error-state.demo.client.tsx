"use client"

import { toast } from "sonner"

import { ErrorState } from "@/components/error-state"

export function ErrorStateDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <ErrorState message="시세 조회에 실패했습니다." onRetry={() => toast.success("재시도 요청")} />
      <ErrorState variant="inline" message="종목코드는 6자리 숫자여야 합니다." />
      <ErrorState variant="simple" message="뉴스 조회 실패: 응답 시간 초과" />
    </div>
  )
}
