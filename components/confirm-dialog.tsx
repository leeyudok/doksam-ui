"use client"

import type { ReactNode } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export interface ConfirmDialogProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
  /** 다이얼로그 제목. */
  readonly title: string
  /** 본문 설명(ReactNode 허용 — 강조·줄바꿈 가능). */
  readonly description: ReactNode
  /** 확인 클릭 시 실행(비동기 가능, 에러 처리는 호출부 책임). */
  readonly onConfirm: () => void | Promise<void>
  /** 확인 버튼 레이블(기본 "삭제"). */
  readonly confirmLabel?: string
  readonly cancelLabel?: string
  /** 진행 중 — 확인 버튼 비활성화 + 레이블 "OO 중…" 전환. */
  readonly loading?: boolean
}

/**
 * 확인/취소 전용 AlertDialog 래퍼 — 삭제·초기화 등 되돌릴 수 없는 작업 전 확인.
 * "이 작업은 되돌릴 수 없습니다." 경고 문구를 항상 포함한다(srope customs/alert-dialog-confirm 이식).
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmLabel = "삭제",
  cancelLabel = "취소",
  loading = false,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              <span>{description}</span>
              <br />
              <span>이 작업은 되돌릴 수 없습니다.</span>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await onConfirm()
              onOpenChange(false)
            }}
            disabled={loading}
          >
            {loading ? `${confirmLabel} 중…` : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
