"use client"

import * as React from "react"
import { WarningCircleIcon } from "@phosphor-icons/react/dist/ssr"

import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

/** 스위치가 아닌 일반 컬럼 정의. `@tanstack/react-table` 없이 최소한의 헤더/셀 매핑만 표현한다. */
export interface TableToggleColumn<TData> {
  /** 컬럼 헤더에 표시할 텍스트. */
  header: string
  /** 행 데이터로부터 셀 내용을 렌더링한다. */
  cell: (row: TData) => React.ReactNode
  /** th/td에 적용할 추가 className(정렬·너비 지정 등). */
  className?: string
}

/**
 * 낙관적 토글 1건의 로컬 상태. `data` prop과 별개로 관리되며, 서버 확인 전까지
 * 화면에 즉시 반영할 값(`enabled`)과 진행 상태(`pending`), 실패 사유(`error`)를 담는다.
 * 이 오버라이드가 없는 행은 `getEnabled(row)`로 `data`를 그대로 읽는다.
 */
interface ToggleOverride {
  enabled: boolean
  pending: boolean
  error: string | null
}

export interface TableToggleProps<TData> {
  /** 표시할 행 데이터. 부모가 refetch 등으로 배열을 새로 넘기면 미진행(idle) 행은 즉시 반영된다. */
  data: TData[]
  /** 각 행의 안정적인 고유 ID를 뽑아낸다. */
  getRowId: (row: TData) => string
  /** 행 데이터로부터 현재 on/off 상태를 읽는다. */
  getEnabled: (row: TData) => boolean
  /**
   * 스위치를 조작했을 때 호출되는 비동기 핸들러. reject되면 스위치는 이전 상태로
   * 롤백되고, reject 사유가 해당 행에 표시된다(에러를 삼키지 않는다).
   */
  onToggle: (row: TData, nextEnabled: boolean) => Promise<void>
  /** 스위치 외 일반 컬럼 정의. `@tanstack/react-table` 의존 없이 단순 배열로 표현한다. */
  columns: TableToggleColumn<TData>[]
  /** 스위치의 접근성 이름(aria-label)에 쓸 행 라벨을 만든다. 기본값은 getRowId(row). */
  getRowLabel?: (row: TData) => string
  /** 스위치 컬럼 헤더 텍스트. 기본값 "사용". */
  toggleHeader?: string
  className?: string
}

function rowKeyFor(id: string, suffix: string) {
  return `table-toggle-${id}-${suffix}`
}

/**
 * TableToggle — 행마다 on/off Switch가 붙은 관리자용 테이블(#69). 데이터 수집 소스
 * 활성화/비활성화처럼 각 토글이 네트워크 호출이고 실패할 수 있는 화면을 위해:
 *
 * - 낙관적 업데이트: 스위치를 누르면 비동기 응답을 기다리지 않고 즉시 화면에 반영한다.
 * - 실패 롤백: `onToggle`이 reject되면 스위치를 이전 위치로 되돌리고 실패 사유를
 *   행에 인라인으로 표시한다(에러를 삼키지 않는다).
 * - 행 단위 진행 상태: 토글이 진행 중인 행의 스위치만 비활성화되고, 다른 행은
 *   계속 조작할 수 있다.
 * - `data` 재조정: 진행 중이 아닌(idle) 행은 부모가 새 `data`를 넘기면 그 값을
 *   그대로 따라간다. 진행 중인 행은 재조정으로 인해 낙관적 상태가 덮이지 않는다.
 *
 * 내부 상태는 `data`와 별개인 `overrides`(행 ID → 낙관적 상태) 맵 하나로 관리한다.
 * `data`가 바뀔 때마다 pending이 아닌 오버라이드는 모두 지워 다시 `data` 기준으로
 * 읽게 하고, pending인 오버라이드만 남겨 진행 중인 토글이 재조정에 씹히지 않게 한다.
 */
export function TableToggle<TData>({
  data,
  getRowId,
  getEnabled,
  onToggle,
  columns,
  getRowLabel,
  toggleHeader = "사용",
  className,
}: Readonly<TableToggleProps<TData>>) {
  const [overrides, setOverrides] = React.useState<Record<string, ToggleOverride>>({})

  // data가 새로 들어오면(부모 refetch 등) 진행 중이 아닌 행의 낙관적 상태는 모두
  // 지운다 — 이후 렌더에서 다시 getEnabled(row)로 data를 그대로 읽게 된다. pending인
  // 오버라이드는 그대로 남겨 진행 중인 토글이 덮이지 않게 한다. 렌더 중 이전 data
  // 참조와 비교해 조건부로 setState하는 React 권장 패턴(effect 없이 prop 변경에
  // 맞춰 state를 조정)을 쓴다 — https://react.dev/learn/you-might-not-need-an-effect
  const [prevData, setPrevData] = React.useState(data)
  if (data !== prevData) {
    setPrevData(data)
    setOverrides((prev) => {
      let changed = false
      const next: Record<string, ToggleOverride> = {}
      for (const [id, state] of Object.entries(prev)) {
        if (state.pending) {
          next[id] = state
        } else {
          changed = true
        }
      }
      return changed ? next : prev
    })
  }

  async function handleToggle(row: TData, id: string, currentEnabled: boolean) {
    const nextEnabled = !currentEnabled
    setOverrides((prev) => ({
      ...prev,
      [id]: { enabled: nextEnabled, pending: true, error: null },
    }))

    try {
      await onToggle(row, nextEnabled)
      setOverrides((prev) => ({
        ...prev,
        [id]: { enabled: nextEnabled, pending: false, error: null },
      }))
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err)
      setOverrides((prev) => ({
        ...prev,
        [id]: { enabled: currentEnabled, pending: false, error: reason || "요청이 실패했습니다." },
      }))
    }
  }

  return (
    <div className={cn("overflow-auto rounded-md border", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.header} className={column.className}>
                {column.header}
              </TableHead>
            ))}
            <TableHead className="w-24 text-right">{toggleHeader}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="h-24 text-center text-muted-foreground">
                데이터가 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => {
              const id = getRowId(row)
              const override = overrides[id]
              const enabled = override?.enabled ?? getEnabled(row)
              const pending = override?.pending ?? false
              const error = override?.error ?? null
              const label = getRowLabel?.(row) ?? id
              const errorId = rowKeyFor(id, "error")

              return (
                <TableRow key={id}>
                  {columns.map((column) => (
                    <TableCell key={column.header} className={column.className}>
                      {column.cell(row)}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end gap-1">
                      <Switch
                        checked={enabled}
                        disabled={pending}
                        aria-label={`${label} 사용 여부`}
                        aria-describedby={error ? errorId : undefined}
                        onCheckedChange={() => handleToggle(row, id, enabled)}
                      />
                      {error ? (
                        <span
                          id={errorId}
                          className="flex items-center gap-1 text-xs text-destructive"
                          role="alert"
                        >
                          <WarningCircleIcon size={12} weight="fill" />
                          {error}
                        </span>
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
