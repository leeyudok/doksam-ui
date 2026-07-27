"use client"

import { TrayIcon } from "@phosphor-icons/react/dist/ssr"
import { toast } from "sonner"

import { EmptyState } from "@/components/empty-state"

export function EmptyStateDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-lg border">
        <EmptyState message="데이터가 없습니다." />
      </div>
      <div className="rounded-lg border">
        <EmptyState icon={<TrayIcon className="size-6" aria-hidden />} message="수집된 뉴스 없음" subtext="수집 주기: 5분" />
      </div>
      <div className="rounded-lg border">
        <EmptyState
          icon={<TrayIcon className="size-6" aria-hidden />}
          message="등록된 종목이 없습니다."
          action={{ label: "종목 추가", onClick: () => toast.success("종목 추가 클릭") }}
        />
      </div>
    </div>
  )
}
