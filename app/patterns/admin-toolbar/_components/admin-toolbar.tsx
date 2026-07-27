"use client"

import * as React from "react"
import { BroomIcon, FlaskIcon } from "@phosphor-icons/react/dist/ssr"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import { DataTransferButtons } from "./data-transfer-buttons"

export interface AdminToolbarProps {
  onExport?: () => void
  onImport?: (file: File) => Promise<void> | void
  onTest?: () => void
  testing?: boolean
  onReset?: () => void
  resetting?: boolean
  /** 페이지별 추가 버튼 슬롯 — 구분선 뒤에 붙는다. */
  children?: React.ReactNode
}

/**
 * 관리자 범용 툴바 — JSON 내보내기/가져오기 + 기능확인 + 데이터 초기화.
 * dok3node customs/admin-toolbar.tsx 이식 — window.confirm() 대신 AlertDialog 로
 * 파괴적 액션(초기화)을 확인받도록 개선.
 */
export function AdminToolbar({
  onExport,
  onImport,
  onTest,
  testing = false,
  onReset,
  resetting = false,
  children,
}: AdminToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded border bg-muted p-2">
      {onExport && onImport ? (
        <DataTransferButtons onExport={onExport} onImport={onImport} exportLabel="JSON 다운로드" importLabel="JSON 업로드" />
      ) : null}

      {onTest ? (
        <Button size="sm" variant="outline" onClick={onTest} disabled={testing}>
          <FlaskIcon aria-hidden />
          {testing ? "확인 중…" : "기능확인"}
        </Button>
      ) : null}

      {onReset ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="outline" disabled={resetting}>
              <BroomIcon aria-hidden />
              {resetting ? "삭제 중…" : "데이터삭제"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>데이터를 초기화할까요?</AlertDialogTitle>
              <AlertDialogDescription>
                해당 테이블 데이터를 시드값 제외하고 삭제합니다. 삭제 후 복구할 수 없습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction onClick={onReset}>삭제</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : null}

      {children ? (
        <>
          <div className="mx-1 h-5 w-px bg-border" aria-hidden />
          {children}
        </>
      ) : null}
    </div>
  )
}
