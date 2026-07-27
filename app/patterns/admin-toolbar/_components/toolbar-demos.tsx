"use client"

import * as React from "react"
import { ArrowClockwiseIcon } from "@phosphor-icons/react/dist/ssr"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import { AdminGenToolbar } from "./admin-gen-toolbar"
import { AdminToolbar } from "./admin-toolbar"
import { DataTransferButtons } from "./data-transfer-buttons"

/** 데모용 가짜 비동기 — 800ms 지연 후 완료 토스트. */
function fakeAsync(setBusy: (v: boolean) => void, done: string) {
  setBusy(true)
  setTimeout(() => {
    setBusy(false)
    toast.success(done)
  }, 800)
}

/** #56 데이터 전송 버튼 데모 — export 는 즉시 토스트, import 는 파일 선택 후 지연 완료. */
export function DataTransferDemo() {
  return (
    <DataTransferButtons
      onExport={() => toast.success("demo.json 다운로드 시작")}
      onImport={(file) =>
        new Promise<void>((resolve) =>
          setTimeout(() => {
            toast.success(`${file.name} 업로드 완료`)
            resolve()
          }, 800),
        )
      }
    />
  )
}

/** #57 관리자 툴바 데모 — 기능확인/초기화 진행 상태 + children 슬롯 예시. */
export function AdminToolbarDemo() {
  const [testing, setTesting] = React.useState(false)
  const [resetting, setResetting] = React.useState(false)

  return (
    <AdminToolbar
      onExport={() => toast.success("테이블 JSON 다운로드 시작")}
      onImport={(file) => {
        toast.success(`${file.name} 업로드 완료`)
      }}
      onTest={() => fakeAsync(setTesting, "기능확인 통과")}
      testing={testing}
      onReset={() => fakeAsync(setResetting, "시드 제외 데이터 삭제 완료")}
      resetting={resetting}
    >
      <Button size="sm" variant="ghost">
        <ArrowClockwiseIcon aria-hidden />
        캐시 갱신
      </Button>
    </AdminToolbar>
  )
}

/** #58 생성 툴바 데모 — 건수 스피너 상태를 소유하고 생성/전체삭제 진행 상태를 시뮬레이션. */
export function AdminGenToolbarDemo() {
  const [genCount, setGenCount] = React.useState(1_000)
  const [generating, setGenerating] = React.useState(false)
  const [deleting, setDeleting] = React.useState(false)

  return (
    <AdminGenToolbar
      genCount={genCount}
      onChangeGenCount={setGenCount}
      generating={generating}
      onGenerate={() => fakeAsync(setGenerating, `더미 ${genCount.toLocaleString()}건 생성 완료`)}
      onExport={() => toast.success("사용자 JSON 다운로드 시작")}
      onImport={(file) => {
        toast.success(`${file.name} 업로드 완료`)
      }}
      onDeleteAll={() => fakeAsync(setDeleting, "전체 삭제 완료")}
      deleting={deleting}
    />
  )
}
